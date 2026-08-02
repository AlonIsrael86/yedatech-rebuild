import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Audiences,
  CapabilityBento,
  Production,
  Process,
  Family,
} from "@/components/Sections";
import { MediaCarousel } from "@/components/MediaCarousel";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { SectorPanel } from "@/components/SectorProvider";
import { UI } from "@/content/site";
import { GALLERIES } from "@/content/media";
import type { Sector } from "@/content/routes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Sector-varying sections render once per sector and CSS reveals the active
 * one — a crawler receives both, and switching tabs never navigates.
 *
 * Order rebuilt for the new design. The checkpoint's
 * Hero → Credibility → Audiences → Capabilities → FeatureBlocks rhythm is gone;
 * the bento now carries the capability story that Credibility, Capabilities and
 * FeatureBlocks used to split between them.
 *
 * Not mounted yet: the client-logo strip. The four logos on yedalabs.ai are
 * verified as Yeda's own, but they need Alexey's yes before appearing here.
 */
const SECTOR_KEYS: Sector[] = ["organizations", "education"];

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:end-4 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-royal focus:px-4 focus:py-2 focus:text-[16px] focus:font-semibold focus:text-white focus:shadow-[var(--shadow-float)]"
      >
        {UI.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={sector} sector={sector}>
            <Hero sector={sector} />
            <CapabilityBento sector={sector} />
            <Audiences sector={sector} />
          </SectorPanel>
        ))}

        <MediaCarousel gallery={GALLERIES.homepage} />

        <Production />
        <Process />
        <Family />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
