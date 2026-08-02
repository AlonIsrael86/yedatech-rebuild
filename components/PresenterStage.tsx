import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { DemoButton } from "@/components/DemoButton";
import { PRESENTER } from "@/content/site";
import { PRESENTER_FIGURES, PRESENTER_SCREEN, type Shot } from "@/content/media";

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
 *  - Not ours: the characters. Alexey's widget/agent platform supplies them, so
 *    the figures are slots filled with Yeda's own published illustrations.
 *  - Deliberately absent: any play button, voice, or speaking behaviour. The
 *    handoff forbids inventing those. `PRESENTER.attach` marks where the agent
 *    will bind instead of faking that it already has.
 *
 * Hover leans the figure inward on desktop. Touch has no hover, so below `lg`
 * the effect is dropped rather than approximated and the grid stacks with the
 * interface first.
 */

function Figure({ shot, side }: { shot: Shot; side: "left" | "right" }) {
  // Lean toward the centre: the left figure tilts right, the right one left.
  const lean =
    side === "left"
      ? "lg:group-hover:translate-x-1.5 lg:group-hover:-rotate-1"
      : "lg:group-hover:-translate-x-1.5 lg:group-hover:rotate-1";

  return (
    <figure
      className={`group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-shadow duration-300 lg:row-span-2 lg:hover:shadow-[var(--shadow-hero)]`}
    >
      <div className="relative mx-auto flex w-full flex-1 items-end justify-center">
        <Image
          src={shot.file as string}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className={`h-auto w-full max-w-[210px] object-contain transition-transform duration-300 motion-reduce:transform-none ${lean}`}
        />
      </div>
      <figcaption className="mt-5 text-[14px] leading-relaxed text-slate">
        {shot.caption}
      </figcaption>
      <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] bg-royal-50 px-2.5 py-1 text-[12px] font-semibold text-royal ring-1 ring-inset ring-royal-100">
        <span className="size-1.5 rounded-full bg-royal" aria-hidden />
        {PRESENTER.attach}
      </span>
    </figure>
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
            <Eyebrow>{PRESENTER.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
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
              <Figure shot={left} side="left" />
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
              <Figure shot={right} side="right" />
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
