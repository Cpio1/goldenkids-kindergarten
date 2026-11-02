"use client";

import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/**
 * The original logo file from public/images/logo.* — never redrawn, recoloured or cropped:
 * `object-contain` on a light pad, no overflow clipping, so the round frame and sun stay whole.
 * If the file is missing, nothing pretends to be the logo — only the name is shown.
 */
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
  const pad = Math.max(3, Math.round(size * 0.06));
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
