"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles, Bot } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { HERO } from "@/content/site";
import { ProductDashboard } from "@/components/ProductVisual";

/**
 * Hero product composition (coded, labeled — not a screenshot). The admin
 * dashboard is the anchor; a small AI-learning-agent card overlaps a corner to
 * hint the AI capability. No presenter characters (dropped 2026-07-27).
 */
function ProductComposition() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* soft ground behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-2 inset-y-6 -z-10 rounded-[var(--radius-media)] bg-gradient-to-tl from-royal-100/50 to-white/5"
      />
      <ProductDashboard />

      {/* AI learning agent accent — coded illustration of the AI capability */}
      <div className="pointer-events-none absolute -bottom-5 -left-5 hidden w-56 rounded-2xl bg-white p-3.5 shadow-[var(--shadow-pop)] ring-1 ring-line sm:block">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-royal text-white">
            <Bot className="size-4" aria-hidden />
          </span>
          <span className="text-[13px] font-semibold text-navy">AI learning agent</span>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-slate">
          I can walk you through this task, step by step.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      {/* depth: soft royal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 520px at 85% -8%, rgba(10,89,235,0.42), transparent 60%), radial-gradient(760px 420px at 5% 110%, rgba(10,89,235,0.20), transparent 60%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        {/* copy */}
        <div>
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/10 px-3.5 py-1.5 text-[14px] font-medium text-white ring-1 ring-inset ring-white/15"
          >
            <Sparkles className="size-4 text-sand" aria-hidden />
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-[3.4rem]"
          >
            {HERO.title}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
            <DemoButton variant="primary" withArrow>
              {HERO.primaryCta}
            </DemoButton>
            <Button
              href="#platform"
              variant="secondary"
              className="bg-white/10 text-white ring-white/20 hover:bg-white/15"
            >
              {HERO.secondaryCta}
            </Button>
          </motion.div>

          <motion.ul {...rise(0.32)} className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
            {HERO.chips.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[15px] text-white/80">
                <Check className="size-4 text-sand" aria-hidden />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* product composition */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
        >
          <ProductComposition />
        </motion.div>
      </Container>
    </section>
  );
}
