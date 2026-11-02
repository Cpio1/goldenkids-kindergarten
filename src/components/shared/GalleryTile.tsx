"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/** A thumbnail button that opens the photo in the lightbox. Lazy-loaded, cropped with object-cover. */
export const GalleryTile = forwardRef<
  HTMLButtonElement,
  { image: SiteImage; index: number; sizes: string; className?: string; onOpen: (index: number) => void }
>(function GalleryTile({ image, index, sizes, className, onOpen }, ref) {
  const { t } = useLanguage();
  return (
    <button
      ref={ref}
      type="button"
      className={cn("tile", className)}
      onClick={() => onOpen(index)}
      aria-label={t.gallery.open(index + 1)}
      aria-haspopup="dialog"
    >
      <Image
        src={image.src}
        alt={t.gallery.photoAlt(index + 1)}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover"
        style={{ objectPosition: "50% 35%" }}
      />
    </button>
  );
});

/** Repeating set of shapes, so the gallery isn't a wall of identical rectangles. */
export const tileShapes = ["shape-leaf", "shape-arch-sm", "shape-leaf-alt", "shape-round", "shape-leaf-alt", "shape-leaf"];
