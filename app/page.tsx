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
import { ValueBand } from "@/components/ValueBand";
import { LogoStrip } from "@/components/LogoStrip";
import { ContactSection } from "@/components/ContactSection";
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
 * SIX of the nine sections change with the tab: Hero, CapabilityBento,
 * Audiences, MediaCarousel, Flow and the contact section. It used to be three,
 * all of them above the fold, which is why clicking a tab lower down the page
 * looked like it did nothing. The cross-fade that makes the change legible
 * lives in globals.css, keyed off data-sector-switched.
 *
 * The carousel points at the per-sector galleries in content/media.ts — the
 * employee portal for organizations, the student view for institutions —
 * rather than one shared gallery.
 *
 * ORDER FOLLOWS FIGMA "Home page 1.4": hero, then the product carousel with
 * the two figures flanking it (§4), then the numbered steps (§5), then the
 * inline contact form (§6) and the footer (§7). Flow used to run before the
 * carousel, which had the steps explaining a product nobody had been shown
 * yet. §3, the brand-card row, is deliberately absent — Victor closed it.
 *
 * ValueBand is the one shared block in the middle. It renders once rather than
 * per sector, so its copy appears a single time in the HTML.
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

        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={`mid-${sector}`} sector={sector}>
            <Audiences sector={sector} />
            <MediaCarousel
              gallery={GALLERIES[SECTOR_GALLERY[sector]]}
              sector={sector}
            />
            <Flow sector={sector} />
          </SectorPanel>
        ))}

        {/* Shared: reads the same for both sectors, so it is rendered once
            between the sector blocks rather than duplicated into each. */}
        <ValueBand />

        {/* Per sector, unlike ValueBand above it. yedalms.io groups its own
            customers into educational institutions and companies, and that
            grouping maps onto our two tabs — so the Education panel shows
            colleges and the Organizations panel shows employers. */}
        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={`logos-${sector}`} sector={sector}>
            <LogoStrip sector={sector} />
          </SectorPanel>
        ))}

        <Production />
        <Family />

        {SECTOR_KEYS.map((sector) => (
          <SectorPanel key={`cta-${sector}`} sector={sector}>
            <ContactSection sector={sector} />
          </SectorPanel>
        ))}
      </main>
      <Footer />
    </>
  );
}
