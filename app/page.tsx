import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Audiences,
  CapabilityBento,
  Production,
  Family,
} from "@/components/Sections";
import { Flow } from "@/components/Flow";
import { MediaCarousel } from "@/components/MediaCarousel";
import { PresenterStage } from "@/components/PresenterStage";
import { LogoStrip } from "@/components/LogoStrip";
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
 * SIX of the nine sections now change with the tab: Hero, CapabilityBento,
 * Audiences, Flow, MediaCarousel and FinalCta. It used to be three, all of them
 * above the fold, which is why clicking a tab lower down the page looked like
 * it did nothing. The cross-fade that makes the change legible lives in
 * globals.css, keyed off data-sector-switched.
 *
 * The carousel now points at the per-sector galleries that already existed in
 * content/media.ts — the employee portal for organizations, the student view
 * for institutions — rather than one shared gallery.
 *
 * Not mounted yet: client logos. LogoStrip is mounted but returns null until
 * Alexey approves the twelve organizations in content/clients.ts.
 */
const SECTOR_KEYS: Sector[] = ["organizations", "education"];

const SECTOR_GALLERY: Record<Sector, string> = {
  organizations: "organizations-platform",
  education: "education-platform",
};

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
          <SectorPanel key={`top-${sector}`} sector={sector}>
            <Hero sector={sector} />
            <CapabilityBento sector={sector} />
          </SectorPanel>
        ))}

        {/* Shared: the composition reads the same for both sectors, so it is
            rendered once between the two sector blocks rather than duplicated. */}
        <PresenterStage />

        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={`mid-${sector}`} sector={sector}>
            <Audiences sector={sector} />
            <Flow sector={sector} />
            <MediaCarousel gallery={GALLERIES[SECTOR_GALLERY[sector]]} />
          </SectorPanel>
        ))}

        <LogoStrip />
        <Production />
        <Family />

        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={`cta-${sector}`} sector={sector}>
            <FinalCta sector={sector} />
          </SectorPanel>
        ))}
      </main>
      <Footer />
    </>
  );
}
