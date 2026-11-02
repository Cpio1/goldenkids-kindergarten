"use client";

import { useId } from "react";
import { Baby, Clock, Languages, MapPin } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Leaf } from "@/components/shared/Decor";
import { FramedPhoto } from "@/components/shared/Photo";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

export function MobileAbout({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const titleId = useId();
  const f = t.about.facts;
  const facts = [
    { icon: Baby, ...f.age },
    { icon: Languages, ...f.language },
    { icon: Clock, ...f.hours },
    { icon: MapPin, ...f.address },
  ];

  return (
    <Section id="about" labelledBy={titleId} className="py-12">
      <div className="container-mobile">
        <Reveal>
          <SectionTitle id={titleId} eyebrow={t.about.eyebrow} title={t.about.title} />
        </Reveal>

        <Reveal className="relative mx-auto mt-6 max-w-[360px]">
          <Leaf className="sway absolute -left-2 top-10 z-10 h-9 w-9" tone="lime" />
          <div className="photo-ring shape-arch relative !p-1.5">
            <FramedPhoto
              image={image}
              alt={t.about.photoAlt}
              sizes="360px"
              shapeClassName="shape-arch"
              minRatio={0.85}
              maxRatio={1.1}
              fallbackRatio={0.95}
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="lead mt-6">{t.about.text}</p>
        </Reveal>

        <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-2.5 p-0 min-[480px]:grid-cols-2">
          {facts.map(({ icon: Icon, label, value }, i) => (
            <Reveal as="li" key={label} delay={i * 50}>
              <div className="flex items-center gap-3 rounded-[20px] border border-mint-strong bg-white px-4 py-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${i % 2 ? "bg-sun-soft text-ink" : "bg-mint text-forest"}`}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="m-0 text-sm text-ink-soft">{label}</p>
                  <p className="m-0 font-bold leading-snug">{value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
