"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Slide = { src: string; alt: string; flip?: boolean };

/**
 * Homepage banner carousel — one photo per view, auto-advancing left→right with
 * pagination dots. Lives in the hero's left column (English LTR). Pauses on hover
 * or keyboard focus and respects prefers-reduced-motion (no auto-advance, instant
 * slide changes). Photos are cropped with object-cover so any source aspect works;
 * the `flip` flag mirrors a photo horizontally so the person faces inward (right,
 * toward the copy). Never flip a photo containing readable text — it reverses it.
 */
export function BannerCarousel({ slides }: { slides: readonly Slide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  if (count === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Yeda in action"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* media frame — gradient stage backs the transparent cutout slide; the
          opaque photos cover it completely */}
      <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-gradient-to-b from-royal/25 to-navy shadow-[var(--shadow-pop)] ring-1 ring-white/10">
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reduce
              ? "none"
              : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="relative aspect-[4/3] w-full shrink-0"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 560px, 100vw"
                className={`object-cover ${s.flip ? "scale-x-[-1]" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* pagination */}
      {count > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="group"
          aria-label="Choose slide"
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-sand" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
