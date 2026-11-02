"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, dictionaries, isLang, type Dictionary, type Lang } from "./translations";

const STORAGE_KEY = "goldenkids-lang";

type LanguageContextValue = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server render and the first client render both use Kazakh, so hydration always matches;
  // the saved choice is applied right after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved) && saved !== DEFAULT_LANG) setLangState(saved);
    } catch {
      // storage unavailable (private mode) — keep the default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dictionaries[lang].meta.description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // the choice simply won't persist
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
