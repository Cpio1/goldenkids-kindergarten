"use client";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Smoothly brings a section into view under the fixed header.
 * Short sections are centred in the space below the header; tall ones start right under it.
 */
export function scrollToSection(id: string, { instant = false, focus = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 0;
  const rect = el.getBoundingClientRect();
  const available = window.innerHeight - header;

  let top = window.scrollY + rect.top - header;
  if (id !== "home" && rect.height < available) top -= (available - rect.height) / 2;
  if (id === "home") top = 0;
  top = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));

  window.scrollTo({ top, behavior: instant || prefersReducedMotion() ? "instant" : "smooth" });
  if (focus) el.focus({ preventScroll: true });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}
