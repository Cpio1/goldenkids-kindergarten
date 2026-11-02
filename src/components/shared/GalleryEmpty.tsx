"use client";

import { Images } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";
import { Leaf, Sun } from "./Decor";

/** Shown while public/images has no gallery photos. */
export function GalleryEmpty({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-3 overflow-hidden rounded-[40px_40px_40px_12px] border-2 border-dashed border-mint-strong bg-white px-6 py-10 text-center",
        className,
      )}
    >
      <Sun className="absolute -right-3 -top-3 h-14 w-14" />
      <Leaf className="absolute bottom-3 left-4 h-8 w-8" tone="lime" />
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-forest" aria-hidden="true">
        <Images className="h-7 w-7" />
      </span>
      <p className="m-0 font-[family-name:var(--font-heading)] text-lg font-extrabold">{t.gallery.empty}</p>
    </div>
  );
}
