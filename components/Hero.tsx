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
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Ambient brand light rather than a solid navy block. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 460px at 70% -12%, rgba(10,89,235,0.16), transparent 62%), radial-gradient(620px 380px at 0% 8%, rgba(196,216,253,0.42), transparent 60%)",
        }}
      />

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-[1.02fr_1fr] lg:py-24">
        <div>
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-royal-50 px-3.5 py-1.5 text-[13px] font-semibold text-royal ring-1 ring-inset ring-royal-100"
          >
            <span className="size-1.5 rounded-full bg-royal" aria-hidden />
            {copy.eyebrow}
          </motion.span>

          <motion.h1
            {...rise(0.07)}
            className="mt-6 text-balance text-4xl font-bold leading-[1.08] text-navy sm:text-5xl lg:text-[3.5rem]"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            {...rise(0.14)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate"
          >
            {copy.subtitle}
          </motion.p>

          <motion.div {...rise(0.21)} className="mt-9 flex flex-wrap gap-3">
            <DemoButton variant="primary" withArrow>
              {HERO_CTA.primary}
            </DemoButton>
            <Button href="#platform" variant="secondary">
              {HERO_CTA.secondary}
            </Button>
          </motion.div>

          <motion.ul
            {...rise(0.28)}
            className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
          >
            {copy.chips.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[15px] text-ink-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-royal" aria-hidden />
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
          <div className="overflow-hidden rounded-[var(--radius-media)] bg-white/70 p-2 shadow-[var(--shadow-hero)] ring-1 ring-inset ring-white/60 backdrop-blur-xl">
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
          <figcaption className="mt-4 text-[14px] leading-relaxed text-slate">
            An interactive module with practice built into the learning unit —
            not bolted on afterwards.
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
