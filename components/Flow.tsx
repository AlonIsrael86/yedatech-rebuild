import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";
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

/**
 * 01 → 05, light to deep, so the colour itself carries the progression.
 *
 * Blue family only: globals.css reserves red for emphasis (record, alerts) and
 * sand for the avatar/AI accent, so neither is available as step decoration.
 * Both stops darken monotonically — sky < periwinkle < royal < royal-600 <
 * navy-700 < navy.
 */
const STEP_GRADIENT = [
  "from-sky to-royal",
  "from-periwinkle to-royal-600",
  "from-royal to-navy-700",
  "from-royal-600 to-navy",
  "from-navy-700 to-navy",
] as const;

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
            <span
              aria-hidden
              className={`flow-numeral block select-none bg-gradient-to-br ${
                STEP_GRADIENT[index] ?? STEP_GRADIENT[STEP_GRADIENT.length - 1]
              } bg-clip-text text-[72px] font-bold leading-none tracking-tight text-transparent drop-shadow-[0_6px_18px_rgba(10,89,235,0.18)] sm:text-[96px]`}
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
              <div
                className="relative w-full overflow-hidden rounded-[14px]"
                style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
              >
                <Image
                  src={shot.file as string}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover object-top"
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
    <section id="how-it-works" className="bg-canvas py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
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
