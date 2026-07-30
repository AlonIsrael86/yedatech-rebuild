import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Credibility,
  Audiences,
  Capabilities,
  AiLearning,
  Integrations,
  CustomSolutions,
  CaseStudy,
  Resources,
  Family,
} from "@/components/Sections";
import { FeatureBlocks } from "@/components/FeatureBlocks";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:end-4 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-royal focus:px-4 focus:py-2 focus:text-[16px] focus:font-semibold focus:text-white focus:shadow-[var(--shadow-float)]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Approved structure (English): hero → credibility → two audiences →
            platform overview → product showcase → AI → integrations → custom
            solutions → [case study] → company → [resources] → final CTA.
            CaseStudy and Resources render only when real content exists. */}
        <Hero />
        <Credibility />
        <Audiences />
        <Capabilities />
        <FeatureBlocks />
        <AiLearning />
        <Integrations />
        <CustomSolutions />
        <CaseStudy />
        <Family />
        <Resources />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
