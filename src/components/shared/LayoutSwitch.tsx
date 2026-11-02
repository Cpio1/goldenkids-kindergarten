"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { scrollToSection } from "./scroll";
import { DESKTOP_QUERY, LayoutContext, TreeContext, type LayoutState } from "./layout";

let lastSection: string | null = null;

function currentSection() {
  let id: string | null = null;
  for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) id = section.id;
  }
  return id;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getSnapshot = (): LayoutState => (window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile");
const getServerSnapshot = (): LayoutState => "both";

/**
 * Chooses the website (desktop) or the mobile website by screen width.
 * - The server renders both trees; CSS media queries show one (no hydration mismatch, no flash).
 * - After hydration the other tree is unmounted: one menu, one set of ids, nothing hidden in the tab order.
 * - Crossing the breakpoint swaps trees and keeps the reader on the same section.
 */
export function LayoutSwitch({ website, mobile }: { website: React.ReactNode; mobile: React.ReactNode }) {
  const layout = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const first = useRef(true);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => (lastSection = currentSection()));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (layout === "both") return;
    document.documentElement.dataset.layout = layout;
    let target = first.current ? null : lastSection;
    // On first load the hash may point to a section the browser couldn't find before hydration.
    if (first.current && window.location.hash.length > 1) target = decodeURIComponent(window.location.hash.slice(1));
    first.current = false;
    if (target) scrollToSection(target, { instant: true, focus: false });
  }, [layout]);

  return (
    <LayoutContext.Provider value={layout}>
      {layout !== "mobile" && (
        <TreeContext.Provider value="desktop">
          <div className="website-root">{website}</div>
        </TreeContext.Provider>
      )}
      {layout !== "desktop" && (
        <TreeContext.Provider value="mobile">
          <div className="mobile-root">{mobile}</div>
        </TreeContext.Provider>
      )}
    </LayoutContext.Provider>
  );
}
