"use client";

import { useId } from "react";
import { FolderOpen } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DocumentsButton } from "@/components/shared/Actions";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";

export function MobileDocuments() {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <Section id="documents" labelledBy={titleId} className="py-10">
      <div className="container-mobile">
        <Reveal>
          <div className="rounded-[32px_32px_32px_10px] border border-mint-strong bg-white p-5">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[38%_62%_46%_54%/52%_40%_60%_48%] bg-sun text-ink"
                aria-hidden="true"
              >
                <FolderOpen className="h-7 w-7" />
              </span>
              <h2 id={titleId} className="m-0 text-[1.45rem] font-extrabold leading-tight">
                {t.documents.title}
              </h2>
            </div>
            <p className="lead m-0 mt-3">{site.documentsUrl ? t.documents.textReady : t.documents.text}</p>
            <DocumentsButton className="mt-4 w-full" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
