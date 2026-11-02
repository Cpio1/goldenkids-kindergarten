"use client";

import { FolderOpen, Lock, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "sun" | "ghost";
const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  sun: "btn btn-sun",
  ghost: "btn btn-ghost",
};

export function CallButton({
  className,
  variant = "primary",
  label,
  ariaLabel,
  iconOnly = false,
}: {
  className?: string;
  variant?: Variant;
  label?: string;
  ariaLabel?: string;
  iconOnly?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <a
      href={site.phone.href}
      className={cn(variantClass[variant], iconOnly && "btn-icon", className)}
      aria-label={ariaLabel ?? (iconOnly ? t.a11y.callTo : undefined)}
    >
      <Phone className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" />
      {!iconOnly && <span>{label ?? t.call}</span>}
    </a>
  );
}

/** External link that always opens in a new tab safely. Renders nothing without a real URL. */
export function ExternalButton({
  href,
  className,
  children,
}: {
  href: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {t.a11y.newTab}</span>
    </a>
  );
}

export function WhatsAppButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  if (!site.whatsapp.enabled) return null;
  return (
    <ExternalButton href={site.whatsapp.url} className={cn("btn btn-whatsapp", className)}>
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{t.contacts.whatsapp}</span>
    </ExternalButton>
  );
}

export function InstagramButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <ExternalButton href={site.instagramUrl} className={cn("btn btn-secondary", className)}>
      <InstagramIcon className="h-5 w-5 shrink-0" />
      <span>{t.contacts.instagram}</span>
    </ExternalButton>
  );
}

export function TwoGisButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <ExternalButton href={site.twoGisUrl} className={cn("btn btn-secondary", className)}>
      <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{t.contacts.twoGis}</span>
    </ExternalButton>
  );
}

/** Opens the documents folder — or an inactive "coming soon" button while the link is missing. */
export function DocumentsButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  if (!site.documentsUrl) {
    return (
      <button type="button" disabled className={cn("btn btn-disabled", className)}>
        <Lock className="h-[1.05em] w-[1.05em] shrink-0" aria-hidden="true" />
        <span>{t.documents.soon}</span>
      </button>
    );
  }
  return (
    <ExternalButton href={site.documentsUrl} className={cn("btn btn-primary", className)}>
      <FolderOpen className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" />
      <span>{t.documents.open}</span>
    </ExternalButton>
  );
}
