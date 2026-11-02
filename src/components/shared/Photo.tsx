"use client";

import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";
import { PhotoPlaceholderArt } from "./Decor";

/**
 * A framed photo. The frame's aspect ratio follows the real photo within [minRatio, maxRatio],
 * so very little is cropped; the focal point sits slightly above centre to keep faces in frame.
 * Without a photo, a soft illustration with a caption is shown instead.
 */
export function FramedPhoto({
  image,
  alt,
  sizes,
  shapeClassName,
  className,
  minRatio = 0.8,
  maxRatio = 1.5,
  fallbackRatio = 1.25,
  priority = false,
}: {
  image: SiteImage | null;
  alt: string;
  sizes: string;
  shapeClassName: string;
  className?: string;
  minRatio?: number;
  maxRatio?: number;
  fallbackRatio?: number;
  /** above the fold: fetched with high priority (still lazy, so the hidden layout never downloads it) */
  priority?: boolean;
}) {
  const { t } = useLanguage();
  const ratio = image ? Math.min(maxRatio, Math.max(minRatio, image.width / image.height)) : fallbackRatio;

  return (
    <div className={cn("photo-frame relative overflow-hidden", shapeClassName, className)} style={{ aspectRatio: ratio }}>
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
      ) : (
        <>
          <PhotoPlaceholderArt className="absolute inset-0" />
          <span className="absolute inset-x-0 bottom-4 mx-auto w-fit max-w-[85%] rounded-full bg-white px-4 py-1.5 text-center text-sm font-semibold text-ink shadow-sm">
            {t.photoSoon}
          </span>
        </>
      )}
    </div>
  );
}
