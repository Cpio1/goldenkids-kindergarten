"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { navIds } from "@/config/site";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton } from "@/components/shared/Actions";
import { useActiveSection, useScrolled } from "@/components/shared/hooks";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { LogoMark, Wordmark } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";

export function MobileHeader({ logo }: { logo: SiteImage | null }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes (focus back to the burger); a tap outside the header closes; focus moves into the menu on open.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header" data-site-header data-scrolled={scrolled || open}>
      <div className="container-mobile flex h-full items-center gap-2">
        <NavLink
          to="home"
          aria-label={t.a11y.home}
          onNavigate={() => setOpen(false)}
          className="mr-auto flex min-h-11 min-w-0 items-center gap-2 rounded-xl no-underline"
        >
          <LogoMark logo={logo} size={44} decorative eager />
          <Wordmark className="text-[0.95rem]" stacked />
        </NavLink>

        <LanguageSwitch className="shrink-0" />

        <button
          ref={burgerRef}
          type="button"
          className="burger shrink-0"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div ref={panelRef} id={menuId} className="mobile-menu" hidden={!open}>
        {open && (
          <>
            <nav aria-label={t.a11y.mainNav} className="container-mobile !px-0">
              <ul className="m-0 grid list-none gap-1 p-0">
                {navIds.map((id) => (
                  <li key={id}>
                    <NavLink to={id} className="mobile-menu__link" current={active === id} onNavigate={() => setOpen(false)}>
                      <span>{t.nav[id]}</span>
                      <ChevronRight className="h-5 w-5 text-lime" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container-mobile !px-0 mt-3">
              <CallButton className="w-full" />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
