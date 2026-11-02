"use client";

import { useId } from "react";
import { ArrowDown } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { Blob, Cloud, Leaf, Sun } from "@/components/shared/Decor";
import { LogoFeature } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { FramedPhoto } from "@/components/shared/Photo";
import { Section } from "@/components/shared/Section";

export function MobileHero({ logo, image }: { logo: SiteImage | null; image: SiteImage | null }) {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="home" labelledBy={titleId} className="overflow-hidden pb-10 pt-[calc(var(--header-h)+20px)]">
      <Blob className="absolute -right-24 top-10 h-64 w-64 opacity-80" variant={1} />
      <Cloud className="float-slow absolute right-4 top-[calc(var(--header-h)+8px)] w-16" />

      <div className="container-mobile relative">
        <p className="enter m-0 mb-3 inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-sm font-bold text-forest">
          <Leaf className="h-4 w-4" tone="forest" />
          {t.hero.eyebrow}
        </p>
        <h1
          id={titleId}
          className="enter m-0 text-[clamp(1.85rem,1.2rem+3.2vw,2.6rem)] font-black leading-[1.12] tracking-[-0.01em]"
          style={{ "--enter-delay": "60ms" } as React.CSSProperties}
        >
          {t.hero.title}
        </h1>
        <p className="lead enter mt-3" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
          {t.hero.text}
        </p>

        <div className="enter mt-5 flex flex-wrap gap-2.5" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
          <CallButton className="flex-auto px-4" />
          <NavLink to="about" className="btn btn-secondary flex-auto px-4">
            <span>{t.hero.about}</span>
            <ArrowDown className="h-[1.05em] w-[1.05em] shrink-0" aria-hidden="true" />
          </NavLink>
        </div>

        {logo ? (
          <div className="enter mt-8 flex justify-center" style={{ "--enter-delay": "220ms" } as React.CSSProperties}>
            <LogoFeature logo={logo} sizes="260px" className="w-[min(260px,72vw)]" compact />
          </div>
        ) : (
          <div className="enter relative mt-8" style={{ "--enter-delay": "220ms" } as React.CSSProperties}>
            <Sun className="spin-slow absolute -right-2 -top-6 z-10 h-14 w-14" />
            <Leaf className="absolute -bottom-2 right-8 z-10 h-8 w-8 -rotate-12" tone="forest" />
            <div className="photo-ring shape-soft relative !p-1.5">
              <FramedPhoto
                image={image}
                alt={t.hero.photoAlt}
                sizes="(min-width: 680px) 640px, 100vw"
                shapeClassName="shape-soft"
                minRatio={1.05}
                maxRatio={1.5}
                fallbackRatio={1.3}
                priority
              />
            </div>
          </div>
        )}

        <dl aria-label={t.hero.statsLabel} className="m-0 mt-9 grid grid-cols-2 gap-2.5">
          {t.hero.stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col-reverse justify-center px-4 py-3 ${
                i === 0 || i === 3 ? "rounded-[22px_22px_22px_6px] bg-mint" : "rounded-[22px_22px_6px_22px] bg-sun-soft"
              }`}
            >
              <dt className="text-sm leading-snug text-ink-soft">{stat.label}</dt>
              <dd className="m-0 font-[family-name:var(--font-heading)] text-[1.2rem] font-extrabold leading-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
