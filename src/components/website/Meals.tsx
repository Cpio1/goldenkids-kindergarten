"use client";

import { useId } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FiveDots, MealsArt } from "@/components/shared/MealsArt";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";

export function Meals() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="meals" labelledBy={titleId} className="py-20">
      <div className="container-site grid grid-cols-[1.1fr_0.9fr] items-center gap-14">
        <div>
          <Reveal>
            <p className="eyebrow">{t.meals.eyebrow}</p>
            <div className="flex items-center gap-6">
              <span
                className="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-[42%_58%_52%_48%/50%_44%_56%_50%] bg-sun font-[family-name:var(--font-heading)] text-[3.6rem] font-black leading-none text-ink"
                aria-hidden="true"
              >
                {site.mealsPerDay}
              </span>
              <h2 id={titleId} className="section-title">
                {t.meals.title}
              </h2>
            </div>
            <p className="lead mt-6 max-w-[560px]">{t.meals.text}</p>
            <FiveDots label={t.meals.timesLabel} className="mt-7" />
          </Reveal>
        </div>
        <Reveal className="flex justify-center" delay={120}>
          <MealsArt size={400} />
        </Reveal>
      </div>
    </Section>
  );
}
