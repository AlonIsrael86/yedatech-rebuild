"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { HERO, HERO_CTA } from "@/content/site";
import { HERO_SLIDES } from "@/content/media";
import type { Shot } from "@/content/media";
import type { Sector } from "@/content/routes";

const ROTATE_MS = 6000;

/**
 * The hero's six-slide image rotation.
 *
 * ONE FIXED FRAME, `object-contain`, FOR EVERY SLIDE. The twelve exports run
 * from 1.393 to 1.778 in aspect ratio, so a frame sized per slide would change
 * the hero's height six times a minute under the reader. A fixed 3:2 box plus
 * `contain` means the height never moves and — the part that matters for these
 * assets — nothing is ever cropped. They are pre-composed designs; cutting into
 * them is not a trade worth making for a tighter fit.
 *
 * CHROME COMES FROM THE ASSET. Ten of the twelve draw their own rounded frame
 * and shadow on a transparent surround, so wrapping those in the hero's white
 * card produced a frame inside a frame, two radii a few pixels apart. Those go
 * straight onto the navy; the two flat opaque screenshots keep the card, because
 * without one they meet the navy with a bare grey edge.
 *
 * STOPPABLE, BECAUSE IT HAS TO BE. WCAG 2.2.2 applies to anything that moves on
 * its own for more than five seconds: there must be a way to pause, stop or hide
 * it. So touching any dot stops the rotation for good, hover and keyboard focus
 * pause it, and a reduced-motion preference means it never starts. The dots are
 * real buttons rather than decoration, which is also what makes the stop
 * mechanism discoverable.
 */
function HeroSlider({ slides }: { slides: readonly Shot[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Set once a person takes control, and never cleared. This is the "stop" half
     of WCAG 2.2.2 — pausing on hover alone would not satisfy it, because a
     touch-only visitor can never hover. */
  const [stopped, setStopped] = useState(false);

  const goTo = useCallback((next: number) => {
    setStopped(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    if (reduce || stopped || paused || slides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, stopped, paused, slides.length]);

  const shot = slides[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <figure>
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[36px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(10,89,235,0.20), transparent 78%)",
          }}
        />

        {/* The frame. Fixed 3:2 for every slide, and `relative` so each slide can
            be absolutely positioned inside it and cross-fade without the two
            ever affecting layout. */}
        <div className="relative aspect-[3/2] w-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={shot.id}
              className="absolute inset-0"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: "easeInOut" }}
            >
              {shot.selfFramed ? (
                <Image
                  src={shot.file as string}
                  alt={shot.alt}
                  fill
                  /* Only the first slide of each panel is eager. Both sector
                     panels render server-side, so that is two priority images
                     page-wide — the same count as before this became a slider. */
                  priority={index === 0}
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-contain"
                />
              ) : (
                /* The two flat, opaque, full-page screenshots. They have no frame
                   of their own, so they get the card the pre-framed ones no
                   longer need. */
                <div className="flex h-full w-full items-center">
                  <div className="w-full overflow-hidden rounded-[var(--radius-media)] bg-white/90 p-2 shadow-[var(--shadow-hero)] ring-1 ring-inset ring-white/40 backdrop-blur-xl">
                    <div
                      className="relative w-full overflow-hidden rounded-[16px]"
                      style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                    >
                      <Image
                        src={shot.file as string}
                        alt={shot.alt}
                        fill
                        /* Same eager rule as the branch above, and it has to be
                           on BOTH. It used to live only there because every
                           first slide happened to be self-framed; the moment
                           education opened on a flat screenshot instead, its
                           LCP image silently went lazy. */
                        priority={index === 0}
                        sizes="(max-width: 1024px) 92vw, 560px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed two-line height, so the tallest caption in the set does not
            shift the dots and everything under them each time it comes round. */}
        <figcaption className="mt-4 min-h-[3.25rem] text-[14px] leading-relaxed text-white/70">
          {shot.caption}
        </figcaption>
      </figure>

      {slides.length > 1 ? (
        <div className="mt-2 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === index}
              /* Named by what it shows, not "slide 3 of 6". The label is the one
                 thing telling a screen-reader user what they would be switching
                 to, and a number tells them nothing. */
              aria-label={`Show ${s.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
          <span className="sr-only" aria-live="polite">
            {`${shot.label} — ${index + 1} of ${slides.length}`}
          </span>
        </div>
      ) : null}
    </div>
  );
}

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

        {/* Six real platform screens, rotating. This was one hardcoded image —
            `interactiveModule`, with its path, alt and aspect ratio typed
            straight into this file even though the manifest already held all
            three. That image is also slide 15 of the organizations carousel, so
            it appeared twice on the page; it is now in neither place here. The
            slides come from HERO_SLIDES in content/media.ts. */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 26 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative"
        >
          <HeroSlider slides={HERO_SLIDES[sector]} />
        </motion.div>
      </Container>
    </section>
  );
}
