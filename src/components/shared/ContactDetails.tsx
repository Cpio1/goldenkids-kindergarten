"use client";

import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/** Address / phone / hours (+ city and working days once confirmed in config). */
export function ContactDetails({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t, lang } = useLanguage();
  const rows = [
    {
      icon: MapPin,
      label: t.contacts.address,
      value: `${site.city ? `${site.city[lang]}, ` : ""}${site.address}`,
    },
    { icon: Phone, label: t.contacts.phone, value: site.phone.display, href: site.phone.href },
    { icon: Clock, label: t.contacts.hours, value: site.hours.display },
    ...(site.workingDays ? [{ icon: CalendarDays, label: t.contacts.days, value: site.workingDays[lang] }] : []),
  ];

  return (
    <dl className={cn("m-0 grid", compact ? "gap-3" : "gap-4", className)}>
      {rows.map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="flex items-center gap-4">
          <span
            className={cn("flex shrink-0 items-center justify-center rounded-full bg-mint text-forest", compact ? "h-11 w-11" : "h-12 w-12")}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <dt className="text-sm text-ink-soft">{label}</dt>
            <dd className="m-0 text-[1.1rem] font-bold leading-snug">
              {href ? (
                <a href={href} className="link">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
