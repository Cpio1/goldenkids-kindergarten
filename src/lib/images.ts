import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * All site media is read from `public` at build time (top level of the folders below):
 * - logo.*       → logo (header, first screen, footer)
 * - main-page.*  → first screen (only when there is no logo)
 * - main-page2.* → «About» section: a video (mp4, webm, mov, m4v) takes priority over a photo
 * - image1.*, image2.*, …  → gallery photos   (jpg, jpeg, png, webp)
 * - video1.*, video2.*, …  → gallery videos   (mp4, webm, mov, m4v)
 *   optional preview frame: videoN-poster.* or an image with the same name (videoN.jpg)
 * Gallery items are sorted by their number (image6, video7, image10…); photo before video on a tie.
 * Names are matched case-insensitively; byte-identical copies are skipped.
 * Add or replace files and rebuild — no code changes needed.
 */
export type SiteImage = { src: string; width: number; height: number };
export type GalleryPhoto = SiteImage & { kind: "image" };
export type GalleryVideo = {
  kind: "video";
  src: string;
  /** MIME type for <source>; omitted for .mov so every browser can try it */
  type?: string;
  /** preview frame image, if one was provided next to the video */
  poster: string | null;
  /** display size read from the file (mp4/mov/m4v), used to reserve space before the video loads */
  width?: number;
  height?: number;
};
export type GalleryItem = GalleryPhoto | GalleryVideo;

type Found = { dir: string; file: string };
type ImageFile = SiteImage & { hash: string };

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MEDIA_DIRS = ["images", "videos", "video", "gallery", "."];
const IMAGE_EXT = [".webp", ".jpg", ".jpeg", ".png"]; // also the preference order for duplicates
const VIDEO_TYPES: Record<string, string | undefined> = { ".mp4": "video/mp4", ".m4v": "video/mp4", ".webm": "video/webm", ".mov": undefined };
const GALLERY_IMAGE = /^image(\d+)$/i;
const GALLERY_VIDEO = /^video(\d+)$/i;

const ext = (file: string) => path.extname(file).toLowerCase();
const baseName = (file: string) => path.basename(file, path.extname(file));
const publicUrl = ({ dir, file }: Found) =>
  "/" + [...(dir === "." ? [] : [dir]), file].map(encodeURIComponent).join("/");
const strip = ({ src, width, height }: ImageFile): SiteImage => ({ src, width, height });

function listFiles(): Found[] {
  const found: Found[] = [];
  for (const dir of MEDIA_DIRS) {
    try {
      for (const entry of fs.readdirSync(path.join(PUBLIC_DIR, dir), { withFileTypes: true })) {
        if (!entry.isFile() || entry.name.startsWith(".")) continue;
        const e = ext(entry.name);
        if (IMAGE_EXT.includes(e) || e in VIDEO_TYPES) found.push({ dir, file: entry.name });
      }
    } catch {
      // folder doesn't exist — fine
    }
  }
  return found;
}

const fullPath = ({ dir, file }: Found) => path.join(PUBLIC_DIR, dir, file);

function readImage(found: Found): ImageFile | null {
  try {
    const buffer = fs.readFileSync(fullPath(found));
    const { width, height, orientation } = imageSize(buffer);
    if (!width || !height) return null;
    // EXIF orientations 5–8: the photo is displayed rotated by 90°
    const rotated = orientation !== undefined && orientation >= 5 && orientation <= 8;
    return {
      src: publicUrl(found),
      width: rotated ? height : width,
      height: rotated ? width : height,
      hash: createHash("sha1").update(buffer).digest("hex"),
    };
  } catch {
    return null; // unreadable or corrupt — skip instead of rendering a broken image
  }
}

/** Cheap fingerprint for (possibly large) videos: size + first 4 MB. */
function videoHash(found: Found): string | null {
  try {
    const fd = fs.openSync(fullPath(found), "r");
    try {
      const { size } = fs.fstatSync(fd);
      if (size < 1024) return null; // empty / placeholder file
      const buffer = Buffer.alloc(Math.min(size, 4 * 1024 * 1024));
      fs.readSync(fd, buffer, 0, buffer.length, 0);
      return `${size}:${createHash("sha1").update(buffer).digest("hex")}`;
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return null;
  }
}

/**
 * Display size of an MP4/MOV: width/height and rotation matrix of the first video track (`tkhd` box).
 * Reads only the box headers; returns null if the file can't be parsed.
 */
function mp4Size(found: Found): { width: number; height: number } | null {
  if (![".mp4", ".m4v", ".mov"].includes(ext(found.file))) return null;
  try {
    const buf = fs.readFileSync(fullPath(found));
    const walk = (start: number, end: number): { width: number; height: number } | null => {
      let i = start;
      while (i + 8 <= end) {
        let size = buf.readUInt32BE(i);
        const type = buf.toString("latin1", i + 4, i + 8);
        let header = 8;
        if (size === 1) {
          size = Number(buf.readBigUInt64BE(i + 8));
          header = 16;
        } else if (size === 0) size = end - i;
        if (size < header || i + size > end) return null;
        const body = i + header;
        if (["moov", "trak"].includes(type)) {
          const found = walk(body, i + size);
          if (found) return found;
        } else if (type === "tkhd") {
          const version = buf.readUInt8(body);
          const matrix = body + (version === 1 ? 52 : 40);
          const width = buf.readUInt32BE(matrix + 36) / 65536;
          const height = buf.readUInt32BE(matrix + 40) / 65536;
          if (width > 0 && height > 0) {
            const rotated = buf.readInt32BE(matrix + 4) !== 0 && buf.readInt32BE(matrix) === 0; // ±90°
            return rotated ? { width: Math.round(height), height: Math.round(width) } : { width: Math.round(width), height: Math.round(height) };
          }
        }
        i += size;
      }
      return null;
    };
    return walk(0, buf.length);
  } catch {
    return null;
  }
}

const byExtension = (a: Found, b: Found) => {
  const order = [...IMAGE_EXT, ...Object.keys(VIDEO_TYPES)];
  return order.indexOf(ext(a.file)) - order.indexOf(ext(b.file));
};

function findNamed(files: Found[], name: string): ImageFile | null {
  const candidates = files.filter((f) => IMAGE_EXT.includes(ext(f.file)) && baseName(f.file).toLowerCase() === name);
  for (const file of candidates.sort(byExtension)) {
    const image = readImage(file);
    if (image) return image;
  }
  return null;
}

export type SiteMedia = {
  logo: SiteImage | null;
  heroImage: SiteImage | null;
  aboutImage: SiteImage | null;
  aboutVideo: GalleryVideo | null;
  gallery: GalleryItem[];
};

/** A real video file named `name.*` (case-insensitive), with an optional `name-poster.*` preview. */
function findVideo(files: Found[], name: string): (GalleryVideo & { hash: string }) | null {
  const candidates = files.filter((f) => ext(f.file) in VIDEO_TYPES && baseName(f.file).toLowerCase() === name).sort(byExtension);
  for (const file of candidates) {
    const hash = videoHash(file);
    if (!hash) continue; // empty or unreadable
    const poster = files
      .filter((p) => IMAGE_EXT.includes(ext(p.file)) && baseName(p.file).toLowerCase() === `${name}-poster`)
      .sort(byExtension)[0];
    return { kind: "video", src: publicUrl(file), type: VIDEO_TYPES[ext(file.file)], poster: poster ? publicUrl(poster) : null, hash, ...mp4Size(file) };
  }
  return null;
}

export function getSiteMedia(): SiteMedia {
  const files = listFiles();
  const logo = findNamed(files, "logo");
  const hero = findNamed(files, "main-page");
  const about = findNamed(files, "main-page2");

  const aboutVideo = findVideo(files, "main-page2");
  // the «About» video is not repeated in the gallery
  const seen = new Set([logo, hero, about, aboutVideo].flatMap((media) => (media ? [media.hash] : [])));
  const names = new Set<string>();
  const entries: { n: number; order: number; item: GalleryItem }[] = [];

  const candidates = files
    .map((f) => {
      const base = baseName(f.file);
      const photo = IMAGE_EXT.includes(ext(f.file)) && GALLERY_IMAGE.exec(base);
      const video = ext(f.file) in VIDEO_TYPES && GALLERY_VIDEO.exec(base);
      const match = photo || video;
      return match ? { f, n: Number(match[1]), kind: photo ? ("image" as const) : ("video" as const) } : null;
    })
    .filter((c): c is NonNullable<typeof c> => !!c)
    .sort((a, b) => a.n - b.n || (a.kind === b.kind ? 0 : a.kind === "image" ? -1 : 1) || byExtension(a.f, b.f));

  for (const { f, n, kind } of candidates) {
    const key = `${kind}${n}`; // image1.png + image1.jpg → one item
    if (names.has(key)) continue;

    if (kind === "image") {
      const image = readImage(f);
      if (!image || seen.has(image.hash)) continue;
      seen.add(image.hash);
      names.add(key);
      entries.push({ n, order: 0, item: { kind: "image", ...strip(image) } });
    } else {
      const hash = videoHash(f);
      if (!hash || seen.has(hash)) continue;
      seen.add(hash);
      names.add(key);
      const base = baseName(f.file).toLowerCase();
      const posterFile = files
        .filter((p) => IMAGE_EXT.includes(ext(p.file)) && [base, `${base}-poster`].includes(baseName(p.file).toLowerCase()))
        .sort(byExtension)[0];
      entries.push({
        n,
        order: 1,
        item: { kind: "video", src: publicUrl(f), type: VIDEO_TYPES[ext(f.file)], poster: posterFile ? publicUrl(posterFile) : null, ...mp4Size(f) },
      });
    }
  }

  return {
    logo: logo && strip(logo),
    heroImage: hero && strip(hero),
    aboutImage: about && strip(about),
    aboutVideo: aboutVideo && {
      kind: "video",
      src: aboutVideo.src,
      type: aboutVideo.type,
      poster: aboutVideo.poster,
      width: aboutVideo.width,
      height: aboutVideo.height,
    },
    gallery: entries.map((e) => e.item),
  };
}
