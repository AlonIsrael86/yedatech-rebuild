"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { HERO } from "@/content/site";
import { ProductDashboard } from "@/components/ProductVisual";

/**
 * Man/woman presenter flanking the product. Desktop: hover raises the character
 * and reveals a "speaking" bubble. Mobile / touch: tap toggles the bubble.
 * Reduced motion: no transform, bubble still available on tap.
 */
function HeroCharacter({
  img,
  alt,
  line,
  side,
  reduce,
}: {
  img: string;
  alt: string;
  line: string;
  side: "left" | "right";
  reduce: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const isLeft = side === "left";
  // Characters flank the card only where the 2-column layout leaves room; below
  // lg the card is full-width, so hide them to keep the mock legible.
  return (
    <div className={`group absolute hidden -bottom-6 z-20 lg:block ${isLeft ? "lg:-left-10" : "lg:-right-10"}`}>
      {/* speaking bubble — hover (desktop) or tap (mobile) */}
      <div
        className={`pointer-events-none absolute bottom-full mb-3 w-max max-w-[10.5rem] rounded-2xl bg-white px-3.5 py-2 text-[13px] font-medium leading-snug text-navy shadow-[var(--shadow-pop)] transition duration-300 ${
          isLeft ? "left-0" : "right-0"
        } ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"} group-hover:translate-y-0 group-hover:opacity-100`}
      >
        {line}
        <span
          className={`absolute top-full -mt-1.5 size-3 rotate-45 bg-white ${isLeft ? "left-6" : "right-6"}`}
        />
      </div>

      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={line} className="block">
        <div className={isLeft ? "" : "[transform:scaleX(-1)]"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={alt}
            width={312}
            height={652}
            draggable={false}
            className={`h-auto w-24 select-none drop-shadow-[0_12px_26px_rgba(0,6,40,0.4)] sm:w-28 lg:w-32 ${
              reduce ? "" : "transition-transform duration-300 group-hover:-translate-y-2.5"
            }`}
          />
        </div>
      </button>
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

        {/* product visual flanked by the man/woman presenters */}
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
          {/* small horizontal inset only — characters overlap the card's outer
              edges (decorative), so the dashboard itself stays large */}
          <div className="px-4 sm:px-7">
            <ProductDashboard />
          </div>
          <HeroCharacter
            side="left"
            img={HERO.characters.woman.src}
            alt={HERO.characters.woman.alt}
            line={HERO.characters.woman.line}
            reduce={reduce}
          />
          <HeroCharacter
            side="right"
            img={HERO.characters.man.src}
            alt={HERO.characters.man.alt}
            line={HERO.characters.man.line}
            reduce={reduce}
          />
        </motion.div>
      </Container>
    </section>
  );
}
