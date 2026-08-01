import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Capabilities,
  AiLearning,
  Integrations,
  Production,
  Process,
  Family,
  Resources,
} from "@/components/Sections";
import { AudienceTabs } from "@/components/AudienceTabs";
import { FeatureBlocks } from "@/components/FeatureBlocks";
import { ContactForm } from "@/components/ContactForm";
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
        {/* Victor's "old plan" (English): hero (presenters) -> credibility ->
            4 audiences -> platform capabilities -> feature showcase -> AI
            learning agents -> content production -> integrations -> process ->
            product family -> resources -> final CTA. */}
        <Hero />
        <AudienceTabs />
        <FeatureBlocks />
        <Capabilities />
        <AiLearning />
        <Production />
        <Integrations />
        <Process />
        <Family />
        <Resources />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
