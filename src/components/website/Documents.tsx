"use client";

import { useId } from "react";
import { FolderOpen } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DocumentsButton } from "@/components/shared/Actions";
import { Leaf } from "@/components/shared/Decor";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";

export function Documents() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="documents" labelledBy={titleId} className="py-16">
      <div className="container-site">
        <Reveal>
          <div className="relative mx-auto flex max-w-[860px] items-center gap-7 overflow-hidden rounded-[48px_48px_48px_14px] border border-mint-strong bg-white px-9 py-8 shadow-[0_24px_50px_-40px_rgba(38,60,45,0.6)]">
            <Leaf className="absolute -right-2 -top-2 h-12 w-12 rotate-90" tone="mint" />
            <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[38%_62%_46%_54%/52%_40%_60%_48%] bg-sun text-ink" aria-hidden="true">
              <FolderOpen className="h-9 w-9" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="m-0 text-[1.6rem] font-extrabold leading-tight">
                {t.documents.title}
              </h2>
              <p className="lead m-0 mt-1">{site.documentsUrl ? t.documents.textReady : t.documents.text}</p>
            </div>
            <DocumentsButton className="shrink-0" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
