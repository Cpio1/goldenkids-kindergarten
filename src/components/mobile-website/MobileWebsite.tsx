"use client";

import type { SiteMedia } from "@/lib/images";
import { Footer } from "@/components/shared/Footer";
import { useSectionId } from "@/components/shared/layout";
import { MobileAbout } from "./MobileAbout";
import { MobileContacts } from "./MobileContacts";
import { MobileDocuments } from "./MobileDocuments";
import { MobileGallery } from "./MobileGallery";
import { MobileGroups } from "./MobileGroups";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileMeals } from "./MobileMeals";

/** Website for phones and tablets (< 1080 px) — its own composition, not a scaled-down desktop. */
export function MobileWebsite({ logo, heroImage, aboutImage, aboutVideo, gallery }: SiteMedia) {
  const mainId = useSectionId("main");
  return (
    <>
      <MobileHeader logo={logo} />
      <main id={mainId} tabIndex={-1} className="outline-none">
        <MobileHero logo={logo} image={heroImage} />
        <MobileAbout image={aboutImage} video={aboutVideo} />
        <MobileGroups />
        <MobileMeals />
        <MobileGallery items={gallery} />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <Footer logo={logo} />
    </>
  );
}
