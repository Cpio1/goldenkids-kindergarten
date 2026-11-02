"use client";

import { useId } from "react";
import { Baby, Languages, Users } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { Wave } from "@/components/shared/Decor";
import { GroupsArt } from "@/components/shared/GroupsArt";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

const factIcons = [Users, Baby, Languages];

export function MobileGroups() {
  const { t, lang } = useLanguage();
  const titleId = useId();

  return (
    <Section id="groups" labelledBy={titleId}>
      <Wave fill="#EDF5D8" />
      <div className="bg-mint py-10">
        <div className="container-mobile">
          <Reveal>
            <SectionTitle id={titleId} eyebrow={t.groups.eyebrow} title={t.groups.title} />
          </Reveal>

          <div className="mt-6 flex items-center gap-4">
            <Reveal className="shrink-0">
              <GroupsArt size={150} />
            </Reveal>
            <ul className="m-0 grid min-w-0 list-none gap-2 p-0">
              {t.groups.facts.map((fact, i) => {
                const Icon = factIcons[i];
                return (
                  <Reveal as="li" key={fact} delay={i * 60}>
                    <span className="flex items-center gap-2 text-[0.95rem] font-bold leading-snug">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun text-ink" aria-hidden="true">
                        <Icon className="h-4 w-4" />
                      </span>
                      {fact}
                    </span>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {site.groups.length > 0 && (
            <ul className="m-0 mt-5 grid list-none gap-2 p-0">
              {site.groups.map((group) => (
                <li key={group.id} className="rounded-[18px] bg-white px-4 py-3">
                  <p className="m-0 font-extrabold">{group.name[lang]}</p>
                  {group.ages && (
                    <p className="m-0 text-sm text-ink-soft">
                      {t.groups.agesLabel}: {group.ages[lang]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          <Reveal>
            <div className="mt-6 rounded-[24px_24px_24px_8px] border-2 border-dashed border-lime/60 bg-white p-4">
              <p className="m-0 font-semibold leading-snug">{t.groups.note}</p>
              <CallButton variant="sun" label={t.groups.button} ariaLabel={t.groups.buttonLabel} className="mt-3 w-full" />
            </div>
          </Reveal>
        </div>
      </div>
      <Wave fill="#EDF5D8" flip />
    </Section>
  );
}
