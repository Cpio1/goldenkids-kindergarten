"use client";

import { langs } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/** ҚАЗ / РУС segmented switch. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.a11y.langSwitch} className={cn("lang-switch", className)}>
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          aria-label={t.a11y.langNames[code]}
          onClick={() => setLang(code)}
          className="lang-switch__btn"
        >
          {t.langShort[code]}
        </button>
      ))}
    </div>
  );
}
