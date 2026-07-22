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
      <Header />
      <main className="flex-1">
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
