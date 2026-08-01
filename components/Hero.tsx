"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui";
import { HERO } from "@/content/site";
import { BannerCarousel } from "@/components/BannerCarousel";

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
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-24">
        {/* copy (left) */}
        <div>
          <motion.h1
            {...rise(0.08)}
            className="text-balance text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-[3.4rem]"
          >
            {HERO.title}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {HERO.subtitle}
          </motion.p>
        </div>

        {/* banner photo carousel (right) */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <BannerCarousel slides={HERO.banner.slides} />
        </motion.div>
      </Container>
    </section>
  );
}
