"use client";

import { cn } from "./cn";
import { Apple, Blob, Carrot, Leaf, Pear, PlateSpoon } from "./Decor";

/** Plate, spoon and a few fruits on a soft blob — decoration only, not a menu. */
export function MealsArt({ className, size }: { className?: string; size: number }) {
  return (
    <div className={cn("relative aspect-[5/4]", className)} style={{ width: size, maxWidth: "100%" }} aria-hidden="true">
      <Blob className="absolute inset-0 h-full w-full" fill="#FDF3C8" variant={1} />
      <PlateSpoon className="absolute left-[14%] top-[20%] w-[62%]" />
      <Apple className="float-slow absolute right-[6%] top-[6%] w-[19%]" />
      <Pear className="absolute bottom-[6%] right-[12%] w-[17%] rotate-12" />
      <Carrot className="absolute bottom-[4%] left-[4%] w-[18%]" />
      <Leaf className="sway absolute left-[6%] top-[6%] w-[11%]" tone="lime" />
    </div>
  );
}

/** Five soft dots for «5 times a day» — no meal names or times are claimed. */
export function FiveDots({ label, className }: { label: string; className?: string }) {
  const colors = ["#08783E", "#9DBB2D", "#F5D65B", "#9DBB2D", "#08783E"];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="flex gap-1.5" aria-hidden="true">
        {colors.map((c, i) => (
          <span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold"
            style={{ background: c, color: c === "#F5D65B" ? "#263C2D" : "#fff" }}
          >
            {i + 1}
          </span>
        ))}
      </span>
      <span className="font-bold text-ink">{label}</span>
    </div>
  );
}
