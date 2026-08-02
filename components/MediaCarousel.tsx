"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import type { Gallery, Shot } from "@/content/media";

/**
 * Alexey: there should be many more images and they must scroll left to right,
 * spanning far more categories than "courses" — and every image carries its
 * own explanation.
 *
 * So the caption is rendered as a real <figcaption>, not a tooltip, and the
 * type in content/media.ts makes it non-optional. Flow shots are ordered
 * adjacently by the gallery definition so the sequence reads.
 *
 * Slots with `file: null` are awaiting an approved Figma frame and render a
 * labelled placeholder at the correct aspect ratio, so composition can be
 * judged now and the real asset dropped in without reflow.
 */

const CATEGORY_LABEL: Record<Shot["category"], string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  flow: "Flow",
  settings: "Settings",
  "avatar-module": "Avatar module",
  "html-module": "Interactive module",
  "live-session": "Live session",
  integrations: "Integrations",
  mobile: "Mobile",
  concept: "Concept",
};

function Placeholder({ shot }: { shot: Shot }) {
  return (
    <div
      className="grid h-full w-full place-items-center bg-gradient-to-tl from-sky/50 to-royal-50"
      style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
    >
      <div className="px-5 text-center">
        <ImageIcon className="mx-auto size-7 text-royal/45" aria-hidden />
        <p className="mt-2 text-[13px] font-semibold text-royal/80">
          {CATEGORY_LABEL[shot.category]}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-slate">
          Awaiting approved Figma frame
        </p>
      </div>
    </div>
  );
}

function Slide({ shot }: { shot: Shot }) {
  return (
    <figure className="group w-[80vw] max-w-[420px] shrink-0 snap-start sm:w-[420px]">
      <div className="overflow-hidden rounded-[var(--radius-media)] bg-white p-2 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-shadow duration-300 group-hover:shadow-[var(--shadow-hero)]">
        <div
          className="relative w-full overflow-hidden rounded-[14px]"
          style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        >
          {shot.file ? (
            <Image
              src={shot.file}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 80vw, 420px"
              className="object-cover object-top"
            />
          ) : (
            <Placeholder shot={shot} />
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-[15px] leading-relaxed text-slate">
        <span className="font-semibold text-navy">
          {CATEGORY_LABEL[shot.category]}.
        </span>{" "}
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export function MediaCarousel({ gallery }: { gallery: Gallery }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 440), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>{gallery.title}</Eyebrow>
            <p className="mt-3 text-lg leading-relaxed text-slate">
              {gallery.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous images"
              className="grid size-10 place-items-center rounded-full bg-white text-navy shadow-[var(--shadow-ambient)] ring-1 ring-inset ring-line-soft transition-all hover:bg-royal-50 hover:shadow-[var(--shadow-lift)] disabled:opacity-35"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next images"
              className="grid size-10 place-items-center rounded-full bg-white text-navy shadow-[var(--shadow-ambient)] ring-1 ring-inset ring-line-soft transition-all hover:bg-royal-50 hover:shadow-[var(--shadow-lift)] disabled:opacity-35"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Container>

      {/* Full-bleed track so slides run to the edge, but the page itself never
          scrolls horizontally. */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`${gallery.title} — scrollable gallery`}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-8 [scrollbar-width:thin]"
      >
        {gallery.shots.map((shot) => (
          <Slide key={`${gallery.id}-${shot.id}`} shot={shot} />
        ))}
        {/* trailing spacer so the last caption clears the viewport edge */}
        <div aria-hidden className="w-1 shrink-0" />
      </div>
    </section>
  );
}
