import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { DemoButton } from "@/components/DemoButton";
import { VALUE_BAND } from "@/content/site";

/**
 * The full-width gradient band, migrated from yedalabs.ai's "innovation that
 * brings measurable value" section. It closes the product story — carousel,
 * then the five steps, then this.
 *
 * WHAT USED TO BE HERE. This file was PresenterStage: the woman/man figures
 * flanking a static product screenshot, with this band beneath. The figures
 * moved into MediaCarousel, where Figma "Home page 1.4" §4 actually puts them —
 * around the product carousel, not around a still.
 *
 * Two pieces of copy went with the move rather than following the figures.
 * "Guided from both sides of the screen" and its lede described Yeda's learning
 * agents sitting alongside the interface and answering from the organization's
 * own material. Whether those agent characters exist is still an open question
 * for Alexey; the merged section is headed by the gallery's own title, which
 * describes what is on the screen. Two headings in one section would have been
 * wrong either way, and this is the one that is verifiable.
 *
 * Rendered ONCE, shared between sectors, so the band's copy appears a single
 * time in the HTML rather than duplicated into both panels.
 */
export function ValueBand() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <div
            className="rounded-[var(--radius-media)] px-6 py-10 text-center text-white sm:px-12"
            style={{
              background:
                "linear-gradient(73.29deg, #004EE9 1.59%, #083A9E 65.54%)",
            }}
          >
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              {VALUE_BAND.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">
              {VALUE_BAND.body}
            </p>
            <div className="mt-7 flex justify-center">
              <DemoButton
                variant="secondary"
                className="bg-white text-royal ring-0 hover:bg-sky"
                withArrow
              >
                {VALUE_BAND.cta}
              </DemoButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
