"use client";

import { useId } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/components/shared/cn";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { GalleryTile, tileShapes } from "@/components/shared/GalleryTile";
import { useGallery } from "@/components/shared/hooks";
import { Lightbox } from "@/components/shared/Lightbox";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionTitle } from "@/components/shared/Section";

const LIMIT = 4;

export function MobileGallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const titleId = useId();
  const gridId = useId();
  const g = useGallery(images.length, LIMIT);

  return (
    <Section id="gallery" ref={g.sectionRef} labelledBy={titleId} className="bg-white py-12">
      <div className="container-mobile">
        <Reveal>
          <SectionTitle id={titleId} eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
          <p className="lead mt-2">{t.gallery.text}</p>
        </Reveal>

        {images.length === 0 ? (
          <GalleryEmpty className="mt-6" />
        ) : (
          <ul id={gridId} className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
            {images.slice(0, g.visible).map((image, i) => (
              <Reveal as="li" key={image.src} delay={(i % 2) * 60}>
                <GalleryTile
                  ref={i === LIMIT ? g.firstExtraRef : undefined}
                  image={image}
                  index={i}
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className={cn("aspect-square", tileShapes[i % tileShapes.length])}
                  onOpen={g.setActive}
                />
              </Reveal>
            ))}
          </ul>
        )}

        {g.hasMore && (
          <button
            type="button"
            className="btn btn-secondary mt-6 w-full"
            aria-expanded={g.expanded}
            aria-controls={gridId}
            onClick={g.toggle}
          >
            <span>{g.expanded ? t.gallery.less : t.gallery.more}</span>
            {g.expanded ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
          </button>
        )}
      </div>
      <Lightbox images={images} index={g.active} onChange={g.setActive} onClose={g.close} />
    </Section>
  );
}
