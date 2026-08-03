import Image from "next/image";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { FLOW } from "@/content/site";
import { FLOW_SHOTS } from "@/content/media";
import type { Sector } from "@/content/routes";

/**
 * The numbered 01–05 product flow, modelled on yedalabs.io's own numbered
 * sequence — a large numeral, a heading, a description and a real product
 * screenshot per step.
 *
 * This replaces the old Process rail, which was five equal cards with no
 * images. Alexey's instruction was that the flow screens should sit next to
 * each other so a person can understand the platform from the pictures, which
 * a row of small numbered boxes cannot do.
 *
 * Structure notes:
 *  - A real <ol>, so the sequence is a sequence to a screen reader too.
 *  - One numeral per step, not two. There was a solid badge next to the big
 *    numeral carrying the same digits, which read as a mistake. The numeral is
 *    decorative and aria-hidden; the announced number lives in an sr-only span,
 *    so it is still spoken exactly once.
 *  - No connecting rail between steps. There was one, and it was wrong twice
 *    over: pinned to the left while the badge alternates sides, so it lined up
 *    with only half the steps, and its segments abutted across the list gap into
 *    one unbroken stripe down the section. The numerals carry the sequence.
 *  - Steps alternate sides at lg. Below that everything is one column with the
 *    copy first, because a phone reading order should not zig-zag.
 *  - Every screen is a <figure> with a <figcaption>. `Shot.caption` is
 *    non-optional in content/media.ts, so a captionless image cannot compile.
 */

function Step({
  step,
  index,
}: {
  step: { n: string; shot: string; title: string; body: string };
  index: number;
}) {
  const shot = FLOW_SHOTS[step.shot];
  if (!shot) return null;

  // Even steps put the copy on the left, odd steps flip it.
  const flip = index % 2 === 1;

  return (
    <li>
      <Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className={flip ? "lg:order-2" : ""}>
            <span className="sr-only">Step {step.n}</span>
            {/* Pale, not solid royal. Figma "Home page 1.4" draws these numerals
                as background texture behind the step, sampled at #d7e4fc — the
                nearest token is `sky` (#c4d8fd). At full royal they competed
                with the heading beneath them for the same attention. Decorative
                and aria-hidden either way; the announced number is the sr-only
                span above. */}
            <span
              aria-hidden
              className="block select-none text-[72px] font-bold leading-none tracking-tight text-sky sm:text-[96px]"
            >
              {step.n}
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight text-navy sm:text-[28px]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-slate">
              {step.body}
            </p>
          </div>

          <figure className={flip ? "lg:order-1" : ""}>
            <div className="overflow-hidden rounded-[var(--radius-media)] bg-white p-2 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft">
              {/*
               * The frame is the same on every step. What differs is whether the
               * asset brings its own ground: the yedalms.io shots carry a pale
               * plate in the pixels (sampled mid-panel: rgb(197,217,253)), while
               * step 01 is a Figma cut-out whose ground is rgba(0,0,0,0). On the
               * card's white that read as no plate at all and the man floated.
               *
               * `sky` is #c4d8fd — one unit per channel off the baked plate — so
               * supplying it here matches the neighbours rather than approximating
               * them. `Shot.needsSurface` says which assets need it; the choice of
               * surface is this component's.
               */}
              <div
                className={`relative w-full overflow-hidden rounded-[14px] ${
                  shot.needsSurface ? "bg-sky" : ""
                }`}
                style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
              >
                <Image
                  src={shot.file as string}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  /* `contain` for a cut-out. The box's ratio is derived from the
                     shot's own dimensions so the two agree today, but under
                     `cover` a sub-pixel rounding difference crops the top of the
                     figure's head; `contain` letterboxes onto a plate that is now
                     the right colour, which costs nothing. */
                  className={
                    shot.needsSurface
                      ? "object-contain object-bottom"
                      : "object-cover object-top"
                  }
                />
              </div>
            </div>
            <figcaption className="mt-3 text-[15px] leading-relaxed text-slate">
              {shot.caption}
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </li>
  );
}

export function Flow({ sector }: { sector: Sector }) {
  const f = FLOW[sector];

  return (
    <section id={`how-it-works-${sector}`} className="bg-canvas py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
            {f.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">{f.lede}</p>
        </div>

        <ol className="mt-14 space-y-14">
          {f.steps.map((step, i) => (
            <Step key={step.n} step={step} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
