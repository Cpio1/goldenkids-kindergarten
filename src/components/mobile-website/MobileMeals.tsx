"use client";

import { useId } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FiveDots, MealsArt } from "@/components/shared/MealsArt";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";

export function MobileMeals() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="meals" labelledBy={titleId} className="py-12">
      <div className="container-mobile">
        <Reveal>
          <p className="eyebrow">{t.meals.eyebrow}</p>
          <div className="flex items-center gap-4">
            <span
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[42%_58%_52%_48%/50%_44%_56%_50%] bg-sun font-[family-name:var(--font-heading)] text-[2.6rem] font-black leading-none"
              aria-hidden="true"
            >
              {site.mealsPerDay}
            </span>
            <h2 id={titleId} className="section-title">
              {t.meals.title}
            </h2>
          </div>
        </Reveal>
        <Reveal className="mt-5 flex items-center gap-4">
          <p className="lead m-0 flex-1">{t.meals.text}</p>
        </Reveal>
        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <FiveDots label={t.meals.timesLabel} />
          <MealsArt size={150} className="ml-auto" />
        </Reveal>
      </div>
    </Section>
  );
}
