"use client";

import { forwardRef } from "react";
import type { NavId } from "@/config/site";
import { cn } from "./cn";
import { useSectionId } from "./layout";

type Props = {
  id: NavId;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
};

/** A page section reachable from the menu (focusable for screen readers after a menu jump). */
export const Section = forwardRef<HTMLElement, Props>(function Section({ id, labelledBy, className, children }, ref) {
  const sectionId = useSectionId(id);
  return (
    <section ref={ref} id={sectionId} aria-labelledby={labelledBy} tabIndex={-1} className={cn("site-section", className)}>
      {children}
    </section>
  );
});

/** Small label + h2 used at the top of sections. */
export function SectionTitle({
  id,
  eyebrow,
  title,
  className,
  align = "left",
}: {
  id: string;
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
    </div>
  );
}
