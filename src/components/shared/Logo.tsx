"use client";

import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";
import { Blob, Leaf, Sun } from "./Decor";

/**
 * The original logo — public/images/logo.png (round, transparent outside the green ring).
 * Never redrawn, recoloured, cropped or stretched: `object-contain`, square box, no overflow clipping.
 * If the file is missing, nothing pretends to be the logo — only the name is shown.
 */

/** Small logo for the header and footer, on a light round pad. */
export function LogoMark({
  logo,
  size,
  className,
  decorative = false,
  eager = false,
}: {
  logo: SiteImage | null;
  /** rendered square size in px */
  size: number;
  className?: string;
  /** true when the name is shown right next to it */
  decorative?: boolean;
  eager?: boolean;
}) {
  const { t } = useLanguage();
  if (!logo) return null;
  const pad = Math.max(2, Math.round(size * 0.04));
  return (
    <span
      className={cn("logo-pad inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size, padding: pad }}
    >
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={decorative ? "" : t.a11y.logoAlt}
        sizes={`${size}px`}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/**
 * The large logo on the first screen — shown whole (tree, children, lettering, round frame),
 * with a few light nature shapes around it that never overlap the ring.
 */
export function LogoFeature({
  logo,
  className,
  sizes,
  compact = false,
}: {
  logo: SiteImage;
  className?: string;
  /** `sizes` for the responsive image */
  sizes: string;
  /** phone variant: smaller decor */
  compact?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className={cn("relative aspect-square", className)}>
      <Blob className="absolute inset-[-5%] h-[110%] w-[110%]" fill="#EDF5D8" variant={0} />
      <Sun className={cn("spin-slow absolute", compact ? "-right-3 -top-3 h-12 w-12" : "-right-6 -top-4 h-20 w-20")} />
      <Leaf className={cn("sway absolute", compact ? "-left-2 bottom-4 h-8 w-8" : "-left-4 bottom-10 h-11 w-11")} tone="lime" />
      <Leaf className={cn("absolute rotate-[-20deg]", compact ? "-bottom-1 right-6 h-7 w-7" : "-bottom-2 right-12 h-10 w-10")} tone="forest" />
      {/* light pad behind the transparent corners keeps the logo on a light background */}
      <div className="logo-feature absolute inset-[4%] rounded-full bg-white">
        <Image
          src={logo.src}
          alt={t.a11y.logoAlt}
          fill
          sizes={sizes}
          loading="lazy"
          fetchPriority="high"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function Wordmark({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <span className={cn("wordmark", className)}>
      {stacked ? (
        <>
          <span className="block">Golden Kids</span>
          <span className="block text-forest">World</span>
        </>
      ) : (
        <>
          Golden Kids <span className="text-forest">World</span>
        </>
      )}
    </span>
  );
}
