"use client";

import { useId } from "react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton, InstagramButton, WhatsAppButton } from "@/components/shared/Actions";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { MapPanel } from "@/components/shared/MapPanel";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

export function MobileContacts() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="contacts" labelledBy={titleId} className="pb-16 pt-4">
      <div className="container-mobile">
        <Reveal>
          <SectionTitle id={titleId} eyebrow={t.contacts.eyebrow} title={t.contacts.title} />
          <p className="lead mt-2">{t.contacts.text}</p>
          <p className="m-0 mt-4 font-[family-name:var(--font-heading)] text-lg font-extrabold text-forest">{site.name}</p>
          <ContactDetails className="mt-3" compact />
          <div className="mt-6 grid gap-2.5">
            <CallButton className="w-full" />
            <WhatsAppButton className="w-full" />
            <InstagramButton className="w-full" />
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <MapPanel className="!py-8" />
        </Reveal>
      </div>
    </Section>
  );
}
