"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * Floating WhatsApp button — rendered only when `site.whatsapp.enabled` is true.
 * The page reserves bottom space for it (`.has-wa-float`) so it never covers the footer text.
 */
export function WhatsAppFloat() {
  const { t } = useLanguage();
  if (!site.whatsapp.enabled) return null;
  return (
    <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label={`${t.contacts.whatsapp} ${t.a11y.newTab}`}>
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export const whatsappFloatEnabled = site.whatsapp.enabled;
