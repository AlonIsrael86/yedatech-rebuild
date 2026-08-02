import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Credibility,
  Audiences,
  Capabilities,
  Production,
  Process,
  Family,
} from "@/components/Sections";
import { FeatureBlocks } from "@/components/FeatureBlocks";
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
 * Sector-varying sections are rendered once per sector and CSS reveals the
 * active one — so a crawler receives both, and switching tabs never navigates.
 * Sections that read the same for both sectors are rendered once.
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
            <Credibility sector={sector} />
            <Audiences sector={sector} />
            <Capabilities sector={sector} />
            <FeatureBlocks sector={sector} />
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
