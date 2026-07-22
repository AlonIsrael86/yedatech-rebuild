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
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:end-4 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-royal focus:px-4 focus:py-2 focus:text-[15px] focus:font-semibold focus:text-white focus:shadow-[var(--shadow-float)]"
      >
        דלג לתוכן
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Credibility />
        <Audiences />
        <Capabilities />
        <FeatureBlocks />
        <Production />
        <Process />
        <Family />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
