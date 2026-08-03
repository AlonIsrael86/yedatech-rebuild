import Image from "next/image";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { DemoButton } from "@/components/DemoButton";
import { PRESENTER } from "@/content/site";
import {
  PRESENTER_FIGURES,
  PRESENTER_SCREEN,
  type PresenterFigure,
} from "@/content/media";

/**
 * The woman-left / man-right composition around the product interface, required
 * by Alon's message 4 and the handoff.
 *
 * Structure migrated from yedalabs.ai's "innovation that brings measurable
 * value" section: two tall row-span-2 tiles flanking shorter central content,
 * with a full-width gradient band beneath. Here the centre carries the product
 * interface rather than two small tiles, which is what the handoff asks for.
 *
 * WHAT IS OURS AND WHAT IS NOT
 *  - Ours: the composition, the responsive behaviour, the mobile fallback.
 *  - Deliberately absent: any play button, voice, or speaking behaviour. The
 *    handoff forbids inventing those, and that constraint still holds.
 *
 * The figures are now the real ones, exported from Figma at 2×. They stood in
 * as concept SVGs — a person beside a bar chart and a person in front of video
 * tiles — for as long as nobody had the design. Those had captions written for
 * them; these do not, because the design gives them none and they are decorative
 * art. Captioning decorative art is exactly how the stand-ins ended up
 * describing things they did not show.
 *
 * Hover leans the figure inward on desktop. Touch has no hover, so below `lg`
 * the effect is dropped rather than approximated and the grid stacks with the
 * interface first.
 */

function Figure({
  figure,
  side,
}: {
  figure: PresenterFigure;
  side: "left" | "right";
}) {
  // Lean toward the centre: the left figure tilts right, the right one left.
  const lean =
    side === "left"
      ? "lg:group-hover:translate-x-1.5 lg:group-hover:-rotate-1"
      : "lg:group-hover:-translate-x-1.5 lg:group-hover:rotate-1";

  return (
    <div
      className={`group relative flex h-full flex-col justify-end rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-shadow duration-300 lg:row-span-2 lg:hover:shadow-[var(--shadow-hero)]`}
    >
      <Image
        src={figure.file}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        className={`mx-auto h-auto w-full max-w-[210px] object-contain transition-transform duration-300 motion-reduce:transform-none ${lean}`}
      />
    </div>
  );
}

export function PresenterStage() {
  const { left, right } = PRESENTER_FIGURES;
  const screen = PRESENTER_SCREEN;

  return (
    <section id="agents" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
              {PRESENTER.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {PRESENTER.lede}
            </p>
          </div>
        </Reveal>

        {/* Desktop: figure | interface | figure. Below lg the interface comes
            first and the two figures sit beneath it, side by side. */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-6">
            <div className="order-2 lg:order-1">
              <Figure figure={left} side="left" />
            </div>

            <figure className="order-1 col-span-2 lg:order-2 lg:col-span-1">
              <div className="overflow-hidden rounded-[var(--radius-media)] bg-white p-2 shadow-[var(--shadow-hero)] ring-1 ring-inset ring-line-soft">
                <div
                  className="relative w-full overflow-hidden rounded-[14px]"
                  style={{ aspectRatio: `${screen.width} / ${screen.height}` }}
                >
                  <Image
                    src={screen.file as string}
                    alt={screen.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-4 text-center text-[14px] leading-relaxed text-slate">
                {screen.caption}
              </figcaption>
            </figure>

            <div className="order-3">
              <Figure figure={right} side="right" />
            </div>
          </div>
        </Reveal>

        {/* Full-width gradient band, migrated from the same yedalabs.ai section. */}
        <Reveal delay={0.14}>
          <div
            className="mt-6 rounded-[var(--radius-media)] px-6 py-10 text-center text-white sm:px-12"
            style={{
              background:
                "linear-gradient(73.29deg, #004EE9 1.59%, #083A9E 65.54%)",
            }}
          >
            <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
              {PRESENTER.band.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">
              {PRESENTER.band.body}
            </p>
            <div className="mt-7 flex justify-center">
              <DemoButton
                variant="secondary"
                className="bg-white text-royal ring-0 hover:bg-sky"
                withArrow
              >
                {PRESENTER.band.cta}
              </DemoButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
