"use client";

import { useId } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton, InstagramButton, WhatsAppButton } from "@/components/shared/Actions";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { MapPanel } from "@/components/shared/MapPanel";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

export function Contacts() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="contacts" labelledBy={titleId} className="pb-24 pt-10">
      <div className="container-site grid grid-cols-2 items-stretch gap-12">
        <Reveal className="flex flex-col justify-center">
          <SectionTitle id={titleId} eyebrow={t.contacts.eyebrow} title={t.contacts.title} />
          <p className="lead mt-4 max-w-[480px]">{t.contacts.text}</p>
          <p className="m-0 mt-6 font-[family-name:var(--font-heading)] text-xl font-extrabold text-forest">{site.name}</p>
          <ContactDetails className="mt-4" />
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <WhatsAppButton />
            <InstagramButton />
          </div>
        </Reveal>
        <Reveal delay={120} className="flex">
          <MapPanel className="w-full" />
        </Reveal>
      </div>
    </Section>
  );
}
