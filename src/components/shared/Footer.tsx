"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Leaf, Wave } from "./Decor";
import { LogoMark, Wordmark } from "./Logo";

/** One footer for both layouts — its grid adapts with CSS. */
export function Footer({ logo }: { logo: SiteImage | null }) {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-4 bg-mint text-ink">
      <Wave className="absolute -top-6 left-0 md:-top-10" fill="#EDF5D8" />
      <div className="footer-inner container-site relative">
        <Leaf className="absolute right-4 top-2 h-8 w-8 rotate-12 opacity-90" tone="lime" />
        <div className="flex items-center gap-3">
          <LogoMark logo={logo} size={76} decorative />
          <div>
            <Wordmark className="text-lg" />
            <p className="mt-0.5 text-sm text-ink-soft">{t.footer.tagline}</p>
          </div>
        </div>
        <ul className="footer-contacts">
          <li>
            <MapPin className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            <span>
              {site.city ? `${site.city[lang]}, ` : ""}
              {site.address}
            </span>
          </li>
          <li>
            <Phone className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            <a href={site.phone.href} className="link">
              {site.phone.display}
            </a>
          </li>
          <li>
            <Clock className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            <span>
              {site.workingDays ? `${site.workingDays[lang]}, ` : ""}
              {site.hours.display}
            </span>
          </li>
        </ul>
        <p className="footer-copy" suppressHydrationWarning>
          © {year} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
