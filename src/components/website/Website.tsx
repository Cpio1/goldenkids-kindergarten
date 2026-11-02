"use client";

import type { SiteMedia } from "@/lib/images";
import { Footer } from "@/components/shared/Footer";
import { useSectionId } from "@/components/shared/layout";
import { About } from "./About";
import { Contacts } from "./Contacts";
import { Documents } from "./Documents";
import { Gallery } from "./Gallery";
import { Groups } from "./Groups";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Meals } from "./Meals";

/** Website for computers (≥ 1080 px). */
export function Website({ logo, heroImage, aboutImage, gallery }: SiteMedia) {
  const mainId = useSectionId("main");
  return (
    <>
      <Header logo={logo} />
      <main id={mainId} tabIndex={-1} className="outline-none">
        <Hero logo={logo} image={heroImage} />
        <About image={aboutImage} />
        <Groups />
        <Meals />
        <Gallery items={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={logo} />
    </>
  );
}
