"use client";

import type { NavId } from "@/config/site";
import { scrollToSection } from "./scroll";

/** In-page link: smooth, header-aware scrolling; a plain anchor if JS is unavailable. */
export function NavLink({
  to,
  className,
  children,
  onNavigate,
  current,
  ...rest
}: {
  to: NavId;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  current?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      {...rest}
      href={`#${to}`}
      className={className}
      aria-current={current ? "true" : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate?.();
        // let a closing menu re-render first
        requestAnimationFrame(() => scrollToSection(to));
      }}
    >
      {children}
    </a>
  );
}
