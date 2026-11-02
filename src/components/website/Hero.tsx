"use client";

import { useId } from "react";
import { ArrowDown, Baby, Clock, Users, Utensils } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { Blob, Cloud, Leaf, Sun } from "@/components/shared/Decor";
import { LogoMark } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { FramedPhoto } from "@/components/shared/Photo";
import { Section } from "@/components/shared/Section";

const statIcons = [Baby, Users, Utensils, Clock];

export function Hero({ logo, image }: { logo: SiteImage | null; image: SiteImage | null }) {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="home" labelledBy={titleId} className="overflow-hidden pb-14 pt-[calc(var(--header-h)+36px)]">
      {/* background decor */}
      <Blob className="absolute -left-40 top-20 h-[420px] w-[420px] opacity-70" variant={1} />
      <Cloud className="float-slow absolute left-[44%] top-[calc(var(--header-h)+20px)] w-24" />
      <Leaf className="sway absolute bottom-24 left-[3%] h-9 w-9" tone="lime" />

      <div className="container-site relative grid grid-cols-[1.02fr_0.98fr] items-center gap-12">
        <div className="max-w-[560px]">
          <p className="enter mb-4 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-[0.95rem] font-bold text-forest">
            <Leaf className="h-4 w-4" tone="forest" />
            {t.hero.eyebrow}
          </p>
          <h1
            id={titleId}
            className="enter m-0 text-[clamp(2.3rem,1.2rem+2.2vw,3.35rem)] font-black leading-[1.08] tracking-[-0.015em]"
            style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          >
            {t.hero.title}
          </h1>
          <p className="lead enter mt-5 max-w-[500px]" style={{ "--enter-delay": "160ms" } as React.CSSProperties}>
            {t.hero.text}
          </p>
          <div className="enter mt-7 flex flex-wrap gap-3" style={{ "--enter-delay": "240ms" } as React.CSSProperties}>
            <CallButton />
            <NavLink to="about" className="btn btn-secondary">
              <span>{t.hero.about}</span>
              <ArrowDown className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
            </NavLink>
          </div>
        </div>

        <div className="enter relative mx-auto w-full max-w-[540px]" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
          <Blob className="absolute -right-8 top-6 h-[96%] w-[96%]" fill="#DCEBB5" variant={0} />
          <Sun className="spin-slow absolute -right-4 -top-8 z-10 h-20 w-20" />
          <Leaf className="absolute -bottom-3 right-10 z-10 h-10 w-10 -rotate-12" tone="forest" />
          <div className="photo-ring shape-hero relative">
            <FramedPhoto
              image={image}
              alt={t.hero.photoAlt}
              sizes="(min-width: 1240px) 540px, 45vw"
              shapeClassName="shape-hero"
              minRatio={1.1}
              maxRatio={1.45}
              fallbackRatio={1.2}
              priority
            />
          </div>
          {logo && (
            <div className="absolute -bottom-4 -left-5 z-10 rounded-[32%] bg-white p-1.5 shadow-[0_14px_30px_-16px_rgba(38,60,45,0.55)]">
              <LogoMark logo={logo} size={104} eager />
            </div>
          )}
        </div>
      </div>

      <div className="container-site relative mt-12">
        <dl
          aria-label={t.hero.statsLabel}
          className="m-0 grid grid-cols-4 overflow-hidden rounded-[28px] border border-mint-strong bg-white shadow-[0_18px_40px_-34px_rgba(38,60,45,0.6)]"
        >
          {t.hero.stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div key={i} className="flex items-center gap-3.5 border-mint-strong px-6 py-4 [&:not(:first-child)]:border-l">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${i % 2 ? "bg-sun-soft text-ink" : "bg-mint text-forest"}`}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-col-reverse">
                  <dt className="text-sm leading-snug text-ink-soft">{stat.label}</dt>
                  <dd className="m-0 font-[family-name:var(--font-heading)] text-[1.35rem] font-extrabold leading-tight text-ink">
                    {stat.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </Section>
  );
}
