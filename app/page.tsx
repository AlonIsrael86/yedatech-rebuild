import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Credibility,
  Audiences,
  Capabilities,
  AvatarLearning,
  ProductExperience,
  Production,
  Process,
  Family,
} from "@/components/Sections";
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
        <AvatarLearning />
        <ProductExperience />
        <Production />
        <Process />
        <Family />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
