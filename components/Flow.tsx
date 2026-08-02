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
 *  - The oversized numeral is decorative; the accessible number lives in the
 *    small solid badge beside the heading, so it is announced once, not twice.
 *  - Steps alternate sides at lg. Below that everything is one column with the
 *    copy first, because a phone reading order should not zig-zag.
 *  - Every screen is a <figure> with a <figcaption>. `Shot.caption` is
 *    non-optional in content/media.ts, so a captionless image cannot compile.
 */

function Step({
  step,
  index,
  last,
}: {
  step: { n: string; shot: string; title: string; body: string };
  index: number;
  last: boolean;
}) {
  const shot = FLOW_SHOTS[step.shot];
  if (!shot) return null;

  // Even steps put the copy on the left, odd steps flip it.
  const flip = index % 2 === 1;

  return (
    <li className="relative">
      {/* Connecting rail. Stops at the last step so the sequence has an end. */}
      {!last ? (
        <span
          aria-hidden
          className="absolute left-[27px] top-14 hidden w-px bg-gradient-to-b from-royal/30 to-royal-100 lg:block"
          style={{ bottom: "-3.5rem" }}
        />
      ) : null}

      <Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className={flip ? "lg:order-2" : ""}>
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-royal text-[17px] font-bold text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)]">
                {step.n}
              </span>
              <span
                aria-hidden
                className="select-none text-[64px] font-bold leading-none tracking-tight text-royal-100 sm:text-[80px]"
              >
                {step.n}
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-bold leading-tight text-navy sm:text-[28px]">
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
            <Step
              key={step.n}
              step={step}
              index={i}
              last={i === f.steps.length - 1}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
