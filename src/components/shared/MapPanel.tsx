"use client";

import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { TwoGisButton } from "./Actions";
import { cn } from "./cn";
import { Cloud, Leaf, Sun } from "./Decor";

/**
 * Embedded map only when a verified `mapEmbedUrl` is configured; otherwise a calm address block.
 * No coordinates are ever guessed.
 */
export function MapPanel({ className }: { className?: string }) {
  const { t, lang } = useLanguage();
  const address = `${site.city ? `${site.city[lang]}, ` : ""}${site.address}`;

  if (site.mapEmbedUrl) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <div className="overflow-hidden rounded-[36px_36px_36px_12px] border border-mint-strong bg-white">
          <iframe
            src={site.mapEmbedUrl}
            title={t.contacts.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[340px] w-full border-0"
          />
        </div>
        <TwoGisButton className="self-start" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[44px_44px_44px_14px] bg-mint px-6 py-10 text-center",
        className,
      )}
    >
      <Sun className="spin-slow absolute right-5 top-5 h-12 w-12" />
      <Cloud className="absolute left-4 top-6 w-20" />
      <Leaf className="absolute bottom-4 right-6 h-8 w-8" tone="lime" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-forest text-white shadow-[0_12px_26px_-14px_rgba(8,120,62,0.9)]" aria-hidden="true">
        <MapPin className="h-8 w-8" />
      </span>
      <p className="relative m-0 font-[family-name:var(--font-heading)] text-2xl font-extrabold">{address}</p>
      <p className="relative m-0 text-sm font-semibold text-ink-soft">{site.name}</p>
      {site.twoGisUrl ? <TwoGisButton className="relative" /> : <p className="relative m-0 text-sm text-ink-soft">{t.contacts.mapSoon}</p>}
    </div>
  );
}
