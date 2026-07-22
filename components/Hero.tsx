"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Play, Sparkles } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { HERO } from "@/content/site";
import { ProductDashboard } from "@/components/ProductVisual";

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
      {/* depth: soft royal glow + faint grid, no decorative blobs */}
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
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white ring-1 ring-inset ring-white/15"
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
            <Button href="#contact" variant="primary" withArrow>
              {HERO.primaryCta}
            </Button>
            <Button
              href="#platform"
              variant="secondary"
              className="bg-white/10 text-white ring-white/20 hover:bg-white/15"
            >
              {HERO.secondaryCta}
            </Button>
          </motion.div>

          <motion.ul
            {...rise(0.32)}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5"
          >
            {HERO.chips.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[14px] text-white/80">
                <Check className="size-4 text-sand" aria-hidden />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* product visual + floating cards */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative"
        >
          <ProductDashboard />

          {/* floating video-module card */}
          <div className="absolute -top-5 -left-4 hidden w-52 rounded-[var(--radius-card)] bg-white p-2.5 shadow-[var(--shadow-pop)] ring-1 ring-line sm:block">
            <div className="relative overflow-hidden rounded-[6px] bg-navy">
              <div className="aspect-video bg-gradient-to-tl from-royal/40 to-navy" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-9 place-items-center rounded-full bg-white/95 text-royal">
                  <Play className="size-4 translate-x-[1px]" aria-hidden />
                </span>
              </span>
            </div>
            <div className="px-1 pb-0.5 pt-2">
              <div className="h-2 w-3/4 rounded bg-line" />
              <div className="mt-1.5 h-2 w-1/2 rounded bg-line-soft" />
            </div>
          </div>

          {/* floating "record" pill (Figma's red accent) */}
          <div className="absolute -bottom-3 right-6 hidden items-center gap-2 rounded-[var(--radius-pill)] bg-red px-3.5 py-2 text-[13px] font-semibold text-white shadow-[var(--shadow-pop)] sm:inline-flex">
            <span className="size-2 rounded-full bg-white" />
            הקלטת וידאו
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
