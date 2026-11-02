"use client";

import { useId, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { GalleryItem } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/components/shared/cn";
import { Cloud } from "@/components/shared/Decor";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { GalleryTile, itemNumbers, tileShapes } from "@/components/shared/GalleryTile";
import { useGallery } from "@/components/shared/hooks";
import { Lightbox } from "@/components/shared/Lightbox";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

const LIMIT = 6;

export function Gallery({ items }: { items: GalleryItem[] }) {
  const { t } = useLanguage();
  const titleId = useId();
  const gridId = useId();
  const g = useGallery(items.length, LIMIT);
  const numbers = useMemo(() => itemNumbers(items), [items]);
  const hasVideo = items.some((item) => item.kind === "video");

  return (
    <Section id="gallery" ref={g.sectionRef} labelledBy={titleId} className="bg-white py-20">
      <Cloud className="float-slow absolute right-[6%] top-10 w-28" />
      <div className="container-site">
        <Reveal className="mb-10 flex items-end justify-between gap-8">
          <SectionTitle id={titleId} eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
          <p className="lead m-0 max-w-[380px]">{hasVideo ? t.gallery.textWithVideo : t.gallery.text}</p>
        </Reveal>

        {items.length === 0 ? (
          <GalleryEmpty className="mx-auto max-w-[560px]" />
        ) : (
          <ul id={gridId} className="m-0 grid list-none grid-cols-3 gap-5 p-0">
            {items.slice(0, g.visible).map((item, i) => (
              <Reveal as="li" key={item.src} delay={(i % 3) * 70}>
                <GalleryTile
                  ref={i === LIMIT ? g.firstExtraRef : undefined}
                  item={item}
                  index={i}
                  number={numbers[i]}
                  sizes="(min-width: 1240px) 380px, 31vw"
                  className={cn("aspect-[4/3]", tileShapes[i % tileShapes.length])}
                  onOpen={g.setActive}
                />
              </Reveal>
            ))}
          </ul>
        )}

        {g.hasMore && (
          <div className="mt-10 flex justify-center">
            <button type="button" className="btn btn-secondary" aria-expanded={g.expanded} aria-controls={gridId} onClick={g.toggle}>
              <span>{g.expanded ? t.gallery.less : t.gallery.more}</span>
              {g.expanded ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>
      <Lightbox items={items} index={g.active} onChange={g.setActive} onClose={g.close} />
    </Section>
  );
}
