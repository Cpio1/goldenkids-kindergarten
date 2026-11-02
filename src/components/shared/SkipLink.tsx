"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#main" className="skip-link">
      {t.a11y.skip}
    </a>
  );
}
