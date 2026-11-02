"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { GalleryItem, GalleryVideo } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/** "Photo 3", "video 2": each kind is numbered on its own. */
export function itemNumbers(items: GalleryItem[]) {
  const count = { image: 0, video: 0 };
  return items.map((item) => ++count[item.kind]);
}

/** Accessible name of an item in the viewer. */
export function useItemLabel() {
  const { t } = useLanguage();
  return (item: GalleryItem, n: number) => (item.kind === "image" ? t.gallery.photoAlt(n) : t.gallery.videoLabel(n));
}

/** A tile that opens the item in the viewer. Photos: lazy next/image, object-cover. Videos: preview frame + play badge. */
export const GalleryTile = forwardRef<
  HTMLButtonElement,
  { item: GalleryItem; index: number; number: number; sizes: string; className?: string; onOpen: (index: number) => void }
>(function GalleryTile({ item, index, number, sizes, className, onOpen }, ref) {
  const { t } = useLanguage();
  const isVideo = item.kind === "video";
  return (
    <button
      ref={ref}
      type="button"
      className={cn("tile", isVideo && "tile--video", className)}
      onClick={() => onOpen(index)}
      aria-label={isVideo ? t.gallery.openVideo(number) : t.gallery.open(number)}
      aria-haspopup="dialog"
    >
      {item.kind === "image" ? (
        <Image
          src={item.src}
          alt={t.gallery.photoAlt(number)}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
      ) : (
        <>
          <VideoPreview video={item} sizes={sizes} />
          <span className="tile__play" aria-hidden="true">
            <Play className="h-6 w-6 translate-x-[1px] fill-current" />
          </span>
          <span className="tile__badge" aria-hidden="true">
            {t.gallery.videoBadge}
          </span>
        </>
      )}
    </button>
  );
});

/**
 * Preview frame of a video: the provided poster image, or a frame taken from the video itself
 * (`#t=0.1`, metadata only). The <video> is created only when the tile approaches the viewport,
 * so nothing is downloaded up front; it never plays here.
 */
function VideoPreview({ video, sizes }: { video: GalleryVideo; sizes: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (video.poster) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video.poster]);

  if (video.poster) {
    return <Image src={video.poster} alt="" fill sizes={sizes} loading="lazy" className="object-cover" />;
  }
  return (
    <span ref={ref} className="absolute inset-0 block bg-mint">
      {near && (
        <video
          className="pointer-events-none h-full w-full object-cover"
          src={`${video.src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
        />
      )}
    </span>
  );
}

/** Repeating set of shapes, so the gallery isn't a wall of identical rectangles. */
export const tileShapes = ["shape-leaf", "shape-arch-sm", "shape-leaf-alt", "shape-round", "shape-leaf-alt", "shape-leaf"];
