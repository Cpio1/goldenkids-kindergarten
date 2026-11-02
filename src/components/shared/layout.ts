"use client";

import { createContext, useContext } from "react";

/** Keep in sync with the breakpoint in globals.css (`@media (min-width: 1080px)`). */
export const DESKTOP_QUERY = "(min-width: 1080px)";

export type Layout = "desktop" | "mobile";
/** "both" — server render / hydration, before the screen width is known. */
export type LayoutState = Layout | "both";

export const LayoutContext = createContext<LayoutState>("both");
/** Which tree a component belongs to. */
export const TreeContext = createContext<Layout>("desktop");

/**
 * Section ids must be unique. While both trees are in the HTML (server render, before hydration),
 * only the desktop tree carries them; once the layout is known only one tree exists.
 */
export function useSectionId(id: string) {
  const layout = useContext(LayoutContext);
  const tree = useContext(TreeContext);
  return layout === "both" && tree === "mobile" ? undefined : id;
}
