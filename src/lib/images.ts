import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * All photos come from public/images and are read at build time:
 * - logo.*       → logo (header, first screen, footer)
 * - main-page.*  → first screen
 * - main-page2.* → «About» section
 * - image1.*, image2.*, … (natural order) → gallery
 * Supported: jpg, jpeg, png, webp. Add or replace files and rebuild — no code changes needed.
 */
export type SiteImage = { src: string; width: number; height: number };
type ImageFile = SiteImage & { hash: string };

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const SUPPORTED = [".webp", ".jpg", ".jpeg", ".png"]; // also the preference order for duplicates
const GALLERY = /^image\d+$/i;

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const baseName = (file: string) => path.basename(file, path.extname(file));
const strip = ({ src, width, height }: ImageFile): SiteImage => ({ src, width, height });

function listFiles(): string[] {
  try {
    return fs
      .readdirSync(IMAGES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED.includes(path.extname(name).toLowerCase()));
  } catch {
    return []; // the folder may not exist yet — a valid empty state
  }
}

function readImage(file: string): ImageFile | null {
  try {
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, file));
    const { width, height, orientation } = imageSize(buffer);
    if (!width || !height) return null;
    // EXIF orientations 5–8: the photo is displayed rotated by 90°
    const rotated = orientation !== undefined && orientation >= 5 && orientation <= 8;
    return {
      src: `/images/${encodeURIComponent(file)}`,
      width: rotated ? height : width,
      height: rotated ? width : height,
      hash: createHash("sha1").update(buffer).digest("hex"),
    };
  } catch {
    return null; // unreadable or corrupt — skip instead of rendering a broken image
  }
}

const byExtension = (a: string, b: string) =>
  SUPPORTED.indexOf(path.extname(a).toLowerCase()) - SUPPORTED.indexOf(path.extname(b).toLowerCase());

function findNamed(files: string[], name: string): ImageFile | null {
  for (const file of files.filter((f) => baseName(f).toLowerCase() === name).sort(byExtension)) {
    const image = readImage(file);
    if (image) return image;
  }
  return null;
}

export type SiteMedia = {
  logo: SiteImage | null;
  heroImage: SiteImage | null;
  aboutImage: SiteImage | null;
  gallery: SiteImage[];
};

export function getSiteMedia(): SiteMedia {
  const files = listFiles();
  const logo = findNamed(files, "logo");
  const hero = findNamed(files, "main-page");
  const about = findNamed(files, "main-page2");

  // image1.png and image1.jpg → one photo; byte-identical copies are skipped
  const seen = new Set([hero, about].flatMap((img) => (img ? [img.hash] : [])));
  const names = new Set<string>();
  const gallery: SiteImage[] = [];
  const candidates = files
    .filter((f) => GALLERY.test(baseName(f)))
    .sort((a, b) => collator.compare(baseName(a), baseName(b)) || byExtension(a, b));
  for (const file of candidates) {
    const key = baseName(file).toLowerCase();
    if (names.has(key)) continue;
    const image = readImage(file);
    if (!image || seen.has(image.hash)) continue;
    names.add(key);
    seen.add(image.hash);
    gallery.push(strip(image));
  }

  return {
    logo: logo && strip(logo),
    heroImage: hero && strip(hero),
    aboutImage: about && strip(about),
    gallery,
  };
}
