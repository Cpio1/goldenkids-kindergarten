"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { navIds, type NavId } from "@/config/site";
import { LayoutContext } from "./layout";

/** True once the page has scrolled past `offset` px. */
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > offset));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);
  return scrolled;
}

/** The nav item of the section crossing the middle of the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState<NavId>("home");
  const layout = useContext(LayoutContext);
  useEffect(() => {
    // ids are final only once the layout is known (see useSectionId)
    if (layout === "both") return;
    const sections = navIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as NavId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [layout]);
  return active;
}

/** Locks page scroll (used only while the lightbox is open). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.paddingRight;
    };
  }, [locked]);
}

/** Shared gallery state: "show more" and the photo open in the lightbox. */
export function useGallery(total: number, limit: number) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const firstExtraRef = useRef<HTMLButtonElement>(null);
  const focusExtra = useRef(false);

  const close = useCallback(() => setActive(null), []);
  const hasMore = total > limit;
  const visible = expanded ? total : Math.min(total, limit);

  useEffect(() => {
    if (expanded && focusExtra.current) firstExtraRef.current?.focus();
    focusExtra.current = false;
  }, [expanded]);

  const toggle = () => {
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) sectionRef.current?.scrollIntoView({ block: "start" });
    } else {
      focusExtra.current = true;
    }
    setExpanded(!expanded);
  };

  return { expanded, toggle, hasMore, visible, active, setActive, close, sectionRef, firstExtraRef };
}
