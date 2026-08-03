"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { HERO, HERO_CTA } from "@/content/site";
import type { Sector } from "@/content/routes";

/**
 * Rebuilt from zero for the yedalabs.ai-anchored design.
 *
 * Gone: the navy slab with a coded fake dashboard bolted to the right. Alexey
 * rejected invented product imagery, so the hero now carries a REAL platform
 * screen in a glass frame lifted by a royal glow — the elevation signature of
 * Yeda's current site — on a light ground rather than a dark one.
 */
export function Hero({ sector }: { sector: Sector }) {
  const copy = HERO[sector];
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    /* Anchor ids are sector-scoped. The homepage renders BOTH sector panels and
       hides one with display:none, so a shared id appeared twice and the browser
       resolved it to the first match — which, on the Education tab, is inside
       the hidden panel. scrollIntoView on a display:none element does nothing,
       which is exactly why "See the platform" did nothing there. */
    <section
      id={`top-${sector}`}
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Sampled from Figma "Home page 1.4": the ground is flat #000f61 —
          already our `navy` token — lifting to #03278d in the bottom-left
          corner and nowhere else. That reads as roughly 32% royal at the
          brightest point, so one radial from the lower left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(820px 560px at 4% 100%, rgba(10,89,235,0.45), transparent 65%)",
        }}
      />

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-[1.02fr_1fr] lg:py-24">
        <div>
          {/* The h1 leads. The pill that used to sit above it is gone, so the
              stagger starts here rather than 70ms in. */}
          <motion.h1
            {...rise(0)}
            className="text-balance text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            {...rise(0.07)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {copy.subtitle}
          </motion.p>

          <motion.div {...rise(0.14)} className="mt-9 flex flex-wrap gap-3">
            <DemoButton variant="primary" withArrow>
              {HERO_CTA.primary}
            </DemoButton>
            {/* Same dark-ground treatment PageShell already uses for the
                secondary button on its navy hero. */}
            <Button
              href={`#platform-${sector}`}
              variant="secondary"
              className="bg-white/10 text-white ring-white/20 hover:bg-white/15 hover:ring-white/30"
            >
              {HERO_CTA.secondary}
            </Button>
          </motion.div>

          <motion.ul
            {...rise(0.21)}
            className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
          >
            {copy.chips.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[15px] text-white/80">
                <Check className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Real platform screen — yedalabs.ai, not an invented panel. */}
        <motion.figure
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 26 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[36px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(10,89,235,0.20), transparent 78%)",
            }}
          />
          {/* A light card, as the design floats over its hero photo. Tried a
              translucent frame first and it failed for a reason specific to
              this asset: the screenshot is itself a dark navy slide, so on a
              navy ground with a 10% frame the whole thing sank into the
              background. It needs a light card to read at all.

              Which is another argument for replacing this image. It is the
              first thing anyone sees, it is Hebrew, and it is dark-on-dark. */}
          <div className="overflow-hidden rounded-[var(--radius-media)] bg-white/90 p-2 shadow-[var(--shadow-hero)] ring-1 ring-inset ring-white/40 backdrop-blur-xl">
            <div className="relative aspect-[1191/678] w-full overflow-hidden rounded-[16px] ring-1 ring-line-soft">
              <Image
                src="/media/platform/yeda-interactive-module-drag-and-drop.png"
                alt="Yeda interactive HTML learning module with a drag-and-drop exercise"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover object-top"
              />
            </div>
          </div>
          <figcaption className="mt-4 text-[14px] leading-relaxed text-white/70">
            An interactive module with practice built into the learning unit —
            not bolted on afterwards.
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
