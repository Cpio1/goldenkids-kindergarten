"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // tells the failsafe in layout.tsx that the app is alive (reveal animations may stay on)
    (window as unknown as { __gkReady?: boolean }).__gkReady = true;
  }, []);
  return <LanguageProvider>{children}</LanguageProvider>;
}
