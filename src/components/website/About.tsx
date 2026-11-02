"use client";

import { useId } from "react";
import { Baby, Clock, Languages, MapPin } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Leaf, Sun } from "@/components/shared/Decor";
import { FramedPhoto } from "@/components/shared/Photo";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

export function About({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const titleId = useId();
  const f = t.about.facts;
  const facts = [
    { icon: Baby, ...f.age, tone: "bg-mint text-forest" },
    { icon: Languages, ...f.language, tone: "bg-sun-soft text-ink" },
    { icon: Clock, ...f.hours, tone: "bg-sun-soft text-ink" },
    { icon: MapPin, ...f.address, tone: "bg-mint text-forest" },
  ];

  return (
    <Section id="about" labelledBy={titleId} className="py-20">
      <div className="container-site grid grid-cols-[0.85fr_1.15fr] items-center gap-16">
        <Reveal className="relative mx-auto w-full max-w-[420px]">
          <Blob className="absolute -left-8 top-10 h-[86%] w-[86%]" fill="#FDF3C8" variant={0} />
          <Sun className="spin-slow absolute -left-6 -top-4 z-10 h-14 w-14" />
          <Leaf className="sway absolute -right-3 bottom-16 z-10 h-10 w-10" tone="lime" />
          <div className="photo-ring shape-arch relative">
            <FramedPhoto
              image={image}
              alt={t.about.photoAlt}
              sizes="420px"
              shapeClassName="shape-arch"
              minRatio={0.78}
              maxRatio={1.05}
              fallbackRatio={0.85}
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionTitle id={titleId} eyebrow={t.about.eyebrow} title={t.about.title} />
            <p className="lead mt-5 max-w-[580px]">{t.about.text}</p>
          </Reveal>
          <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-4 p-0">
            {facts.map(({ icon: Icon, label, value, tone }, i) => (
              <Reveal as="li" key={label} delay={i * 70}>
                <div
                  className={`flex h-full items-center gap-4 border border-mint-strong bg-white px-5 py-4 ${
                    i % 2 ? "rounded-[22px_40px_22px_22px]" : "rounded-[40px_22px_22px_22px]"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone}`} aria-hidden="true">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-sm text-ink-soft">{label}</p>
                    <p className="m-0 font-[family-name:var(--font-heading)] text-lg font-extrabold leading-snug">{value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
