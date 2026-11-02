"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";
import { Leaf, Sun } from "./Decor";

/** The big «3» composition: a sunny circle, three small houses for three groups, leaves. Decorative. */
export function GroupsArt({ className, size }: { className?: string; /** rendered width in px */ size: number }) {
  const { t } = useLanguage();
  return (
    <div className={cn("relative aspect-square", className)} style={{ width: size, maxWidth: "100%" }} aria-hidden="true">
      <svg viewBox="0 0 320 320" className="decor absolute inset-0 h-full w-full" focusable="false">
        <circle cx="160" cy="160" r="150" fill="#FFFFFF" />
        <circle cx="160" cy="160" r="150" fill="none" stroke="#9DBB2D" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
        <circle cx="160" cy="150" r="104" fill="#F5D65B" opacity=".35" />
        {/* three little houses — one per group */}
        {[
          { x: 62, y: 222, c: "#08783E" },
          { x: 136, y: 236, c: "#9DBB2D" },
          { x: 210, y: 222, c: "#F5D65B" },
        ].map(({ x, y, c }, i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 22 24 2l24 20v26H0Z" fill={c} />
            <path d="M-4 24 24 0l28 24" stroke="#263C2D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="18" y="30" width="12" height="18" rx="6" fill="#FFFEF7" />
          </g>
        ))}
      </svg>
      <Sun className="spin-slow absolute right-[6%] top-[4%] h-[18%] w-[18%]" />
      <Leaf className="sway absolute left-[6%] top-[14%] h-[11%] w-[11%]" tone="lime" />
      <Leaf className="absolute bottom-[4%] right-[10%] h-[9%] w-[9%] rotate-45" tone="forest" />
      <span className="absolute inset-x-0 top-[17%] text-center font-[family-name:var(--font-heading)] font-black leading-none text-forest">
        <span className="block" style={{ fontSize: Math.round(size * 0.36) }}>
          {site.groupsCount}
        </span>
        <span className="block font-extrabold text-ink" style={{ fontSize: Math.max(16, Math.round(size * 0.055)) }}>
          {t.groups.countWord}
        </span>
      </span>
    </div>
  );
}
