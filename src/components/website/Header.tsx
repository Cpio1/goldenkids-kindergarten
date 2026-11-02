"use client";

import { navIds } from "@/config/site";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { useActiveSection, useScrolled } from "@/components/shared/hooks";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { LogoMark, Wordmark } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";

export function Header({ logo }: { logo: SiteImage | null }) {
  const { t } = useLanguage();
  const scrolled = useScrolled();
  const active = useActiveSection();

  return (
    <header className="site-header" data-site-header data-scrolled={scrolled}>
      <div className="container-site flex h-full items-center gap-4">
        <NavLink to="home" aria-label={t.a11y.home} className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-2xl no-underline">
          <LogoMark logo={logo} size={50} decorative eager />
          <Wordmark className="text-[1.05rem]" stacked={!!logo} />
        </NavLink>

        <nav aria-label={t.a11y.mainNav} className="ml-auto">
          <ul className="m-0 flex list-none items-center gap-0.5 p-0">
            {navIds.map((id) => (
              <li key={id}>
                <NavLink to={id} className="nav-link" current={active === id}>
                  {t.nav[id]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitch className="shrink-0" />
        <CallButton className="hidden min-h-11 shrink-0 px-4 xl:inline-flex" />
        <CallButton className="shrink-0 xl:hidden" iconOnly />
      </div>
    </header>
  );
}
