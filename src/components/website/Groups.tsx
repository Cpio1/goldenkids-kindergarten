"use client";

import { useId } from "react";
import { Baby, Languages, Phone, Users } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { Wave } from "@/components/shared/Decor";
import { GroupsArt } from "@/components/shared/GroupsArt";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

const factIcons = [Users, Baby, Languages];

export function Groups() {
  const { t, lang } = useLanguage();
  const titleId = useId();

  return (
    <Section id="groups" labelledBy={titleId} className="mt-6">
      <Wave fill="#EDF5D8" />
      <div className="bg-mint py-16">
        <div className="container-site grid grid-cols-[0.9fr_1.1fr] items-center gap-14">
          <Reveal className="flex justify-center">
            <GroupsArt size={340} />
          </Reveal>

          <div>
            <Reveal>
              <SectionTitle id={titleId} eyebrow={t.groups.eyebrow} title={t.groups.title} />
            </Reveal>
            <ul className="m-0 mt-7 flex list-none flex-wrap gap-3 p-0">
              {t.groups.facts.map((fact, i) => {
                const Icon = factIcons[i];
                return (
                  <Reveal as="li" key={fact} delay={i * 80}>
                    <span className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-5 font-bold shadow-[0_10px_24px_-20px_rgba(38,60,45,0.6)]">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun text-ink" aria-hidden="true">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      {fact}
                    </span>
                  </Reveal>
                );
              })}
            </ul>

            {site.groups.length > 0 && (
              <ul className="m-0 mt-6 grid list-none grid-cols-3 gap-3 p-0">
                {site.groups.map((group) => (
                  <li key={group.id} className="rounded-[24px] bg-white px-5 py-4">
                    <p className="m-0 font-[family-name:var(--font-heading)] text-lg font-extrabold">{group.name[lang]}</p>
                    {group.ages && (
                      <p className="m-0 text-sm text-ink-soft">
                        {t.groups.agesLabel}: {group.ages[lang]}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <Reveal delay={120}>
              <div className="mt-8 flex max-w-[600px] items-center gap-5 rounded-[28px_28px_28px_8px] border-2 border-dashed border-lime/60 bg-white/70 p-5">
                <Phone className="h-6 w-6 shrink-0 text-forest" aria-hidden="true" />
                <p className="m-0 flex-1 font-semibold leading-snug">{t.groups.note}</p>
                <CallButton variant="sun" label={t.groups.button} ariaLabel={t.groups.buttonLabel} className="shrink-0" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <Wave fill="#EDF5D8" flip />
    </Section>
  );
}
