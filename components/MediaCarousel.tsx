"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import type { Gallery, Shot } from "@/content/media";

/**
 * Alexey: there should be many MORE images, spanning more categories than just
 * courses, and they must page left to right — "imagine you have to explain the
 * platform through the pictures. Each picture has its explanation."
 *
 * MORE, NOT BIGGER. His «картинок должно быть намного больше» is the Russian
 * quantity construction — genitive plural + impersonal neuter «должно быть» —
 * so it reads "there should be many more pictures". Size would need «картинки
 * должны быть». An earlier pass mistranslated «больше» as "bigger" and blew the
 * slides up to 880px; that is reverted here. It also fought the actual request:
 * a 1440px viewport shows ~3 slides at 420px and ~1.5 at 880px, so the smaller
 * slide puts more of the variety on screen at once, which is the whole point.
 *
 * So:
 *  - Slides sit at 420px, as they always did.
 *  - The arrows page by exactly one slide rather than nudging by a fixed
 *    number of pixels, and the position counter makes the size of the set
 *    visible — the whole point being that there are many images now.
 *  - The caption is a real <figcaption>, not a tooltip, and `caption` is
 *    non-optional in content/media.ts so a slot cannot exist without one.
 *
 * UNIFORM HEIGHT, DERIVED WIDTH — not the other way round. This is not part of
 * the reverted enlargement; it is what lets a mixed-orientation set share one
 * track at all. A common width breaks the moment a portrait frame appears: the
 * phone frame is 720×1560, which even at 420px wide renders 910px tall beside a
 * 262px landscape card. Fixing the height instead gives a tidy band.
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
  assessment: "Assessment",
  knowledge: "Knowledge",
  "ai-agent": "AI agent",
  "live-session": "Live session",
  integrations: "Integrations",
  localization: "Languages",
  industry: "Industry",
  mobile: "Mobile",
  concept: "Concept",
};

/*
 * The placeholder names the SLOT, not just its category.
 *
 * It used to render only CATEGORY_LABEL, which made any two pending slots
 * sharing a category pixel-identical — the employee portal and the admin
 * dashboard are both "Dashboard", sat in the same panel, and read as a
 * duplicated slide even though their captions differ. Naming the slot means
 * every future pending slot is distinguishable by construction.
 */
function Placeholder({ shot }: { shot: Shot }) {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-tl from-sky/50 to-royal-50">
      <div className="px-5 text-center">
        <ImageIcon className="mx-auto size-6 text-royal/45" aria-hidden />
        <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-royal/55">
          {CATEGORY_LABEL[shot.category]}
        </p>
        <p className="mt-0.5 text-[14px] font-semibold leading-snug text-royal/85">
          {shot.label ?? CATEGORY_LABEL[shot.category]}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-slate">
          Awaiting approved frame
        </p>
      </div>
    </div>
  );
}

function Slide({ shot }: { shot: Shot }) {
  /*
   * Width is DERIVED from the shared --slide-h rather than left to intrinsic
   * sizing, because intrinsic sizing gets it wrong here.
   *
   * A flex item with no width takes its max-content size, and the widest child
   * of this figure is the caption, not the picture — so the card would end up
   * sized by prose, with the image floating in dead space. Computing the width
   * from the frame's own ratio also lets it be floored, so the 720×1560 phone
   * frame (254px wide beside an 880px landscape one) still gets a caption
   * column wide enough to read.
   */
  const media = `calc(var(--slide-h) * ${shot.width} / ${shot.height})`;

  return (
    <figure
      data-slide
      className="group shrink-0 snap-start"
      style={{ width: `max(260px, calc(${media} + 1rem))` }}
    >
      <div className="overflow-hidden rounded-[var(--radius-media)] bg-white p-2 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-shadow duration-300 group-hover:shadow-[var(--shadow-hero)]">
        {/* Uniform height across the track; width follows the frame's ratio.
            mx-auto centres the narrow portrait frame inside its floored card. */}
        <div
          className="relative mx-auto overflow-hidden rounded-[14px]"
          style={{ height: "var(--slide-h)", width: media }}
        >
          {shot.file ? (
            <Image
              src={shot.file}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 420px"
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

/** Slide start positions in the track's own scroll coordinates. */
function slideStarts(el: HTMLElement): number[] {
  const left = el.getBoundingClientRect().left;
  return Array.from(el.querySelectorAll<HTMLElement>("[data-slide]")).map(
    (s) => s.getBoundingClientRect().left - left + el.scrollLeft,
  );
}

export function MediaCarousel({ gallery }: { gallery: Gallery }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [index, setIndex] = useState(0);

  const total = gallery.shots.length;

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    // Last slide whose left edge has reached the viewport edge.
    const starts = slideStarts(el);
    let cur = 0;
    for (let i = 0; i < starts.length; i++) {
      if (starts[i] <= el.scrollLeft + 8) cur = i;
    }
    setIndex(cur);
  }, []);

  /*
   * A ResizeObserver rather than a window resize listener.
   *
   * The homepage renders one carousel per sector and hides the inactive one
   * with display:none, so that copy measures 0x0, computes atEnd = true, and
   * would come back from a tab switch with its next arrow stuck disabled — no
   * resize event ever fires for a display change. ResizeObserver does report
   * none -> displayed, which is exactly the missing signal, and it still covers
   * ordinary viewport resizes.
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Scroll fires far faster than paint; coalesce the rect reads into one
    // frame so a fast flick does not measure every slide dozens of times.
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(sync);
    };

    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [sync]);

  /** Page by exactly one slide. Widths differ, so measure rather than assume. */
  const page = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const starts = slideStarts(el);
    if (!starts.length) return;

    const target =
      dir === 1
        ? starts.find((s) => s > el.scrollLeft + 8)
        : [...starts].reverse().find((s) => s < el.scrollLeft - 8);

    el.scrollTo({
      left: target ?? (dir === 1 ? el.scrollWidth : 0),
      behavior: "smooth",
    });
  }, []);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    page(e.key === "ArrowRight" ? 1 : -1);
  };

  const arrow =
    "grid size-10 place-items-center rounded-full bg-white text-navy shadow-[var(--shadow-ambient)] ring-1 ring-inset ring-line-soft transition-all hover:bg-royal-50 hover:shadow-[var(--shadow-lift)] disabled:opacity-35";

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
          <div className="flex items-center gap-3">
            {/* Announced politely: the count changes on every page, and a
                terse "3 / 18" read out mid-scroll is noise, not help. */}
            <p
              aria-live="polite"
              aria-atomic
              className="text-[15px] font-semibold tabular-nums text-slate"
            >
              <span className="text-navy">{index + 1}</span> / {total}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label="Previous image"
                className={arrow}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => page(1)}
                disabled={atEnd}
                aria-label="Next image"
                className={arrow}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Full-bleed track so slides run to the edge, but the page itself never
          scrolls horizontally. */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        onKeyDown={onKeyDown}
        aria-label={`${gallery.title} — ${total} images, scrollable gallery`}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 [--slide-h:150px] focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-8 sm:[--slide-h:200px] lg:[--slide-h:262px] [scrollbar-width:thin]"
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
