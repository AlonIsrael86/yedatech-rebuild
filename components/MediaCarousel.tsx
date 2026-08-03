"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Container } from "@/components/ui";
import { PRESENTER_FIGURES } from "@/content/media";
import type { Gallery, PresenterFigure, Shot } from "@/content/media";
import type { Sector } from "@/content/routes";

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
 *
 * EVERY SLIDE IS TITLED BY WHAT IT SHOWS, not by its category. The caption used
 * to lead with the category, and 15 categories across a 16-slide panel repeat
 * by construction — three slides headed "Settings", two adjacent ones headed
 * "Integrations". They read as duplicated slides. `Shot.label` is required in
 * content/media.ts precisely so this cannot come back, and a dev-only guard
 * there catches two slides in one gallery sharing a title.
 *
 * THE FIGURES CAME HERE FROM PresenterStage. Figma "Home page 1.4" §4 draws one
 * product screen with the woman and the man flanking it and arrows at the
 * sides; we had that composition in a separate section wrapped around a static
 * screenshot, and this track sitting somewhere else entirely. The composition
 * is the design's, the track is Alexey's — the design puts a single image
 * behind three dots, and he asked for the opposite ("many more pictures, each
 * with its explanation"), so the layout is adopted and the set is kept.
 *
 * The figures cost horizontal room, which is the one thing this section spends.
 * They are therefore `xl`-and-up only, capped narrow, and below that the layout
 * is unchanged: full-bleed track, figures beneath it side by side.
 */

/*
 * Decorative, and captioned by nothing on purpose — the design gives them no
 * caption and they illustrate nothing specific. The concept SVGs that preceded
 * them had captions written for them, which is exactly how the site ended up
 * describing pictures that did not show what the words claimed.
 */
function Figure({
  figure,
  side,
}: {
  figure: PresenterFigure;
  side: "left" | "right";
}) {
  // Lean toward the centre: the left figure tilts right, the right one left.
  const lean =
    side === "left"
      ? "xl:group-hover:translate-x-1.5 xl:group-hover:-rotate-1"
      : "xl:group-hover:-translate-x-1.5 xl:group-hover:rotate-1";

  return (
    <div className="group flex h-full items-end justify-center">
      <Image
        src={figure.file}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        sizes="150px"
        className={`h-auto w-full max-w-[150px] object-contain transition-transform duration-300 motion-reduce:transform-none ${lean}`}
      />
    </div>
  );
}

/*
 * The pending card carries its title on its face, because it has no picture to
 * be told apart by. Its category is deliberately NOT printed here — the title
 * sits immediately below the card in the caption, so a category line above it
 * put the same idea on one card twice.
 */
function Placeholder({ shot }: { shot: Shot }) {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-tl from-sky/50 to-royal-50">
      <div className="px-5 text-center">
        <ImageIcon className="mx-auto size-6 text-royal/45" aria-hidden />
        <p className="mt-2 text-[14px] font-semibold leading-snug text-royal/85">
          {shot.label}
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
        <span className="font-semibold text-navy">{shot.label}.</span>{" "}
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

export function MediaCarousel({
  gallery,
  sector,
}: {
  gallery: Gallery;
  /**
   * Present only on the homepage, and it carries two things: the anchor has to
   * be sector-scoped because both panels render, and the flanking figures are
   * that page's §4 composition. The 21 inner pages render this component as a
   * plain gallery — a pair of decorative people either side of, say, the
   * integrations tour would be composition borrowed from a section that page
   * does not have.
   */
  sector?: Sector;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [index, setIndex] = useState(0);

  const total = gallery.shots.length;

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const starts = slideStarts(el);

    /*
     * "At the start" is the FIRST SLIDE'S offset, not zero.
     *
     * The track is padded (px-5, sm:px-8) and snaps mandatorily, so the browser
     * parks it on the first snap point — which sits one padding-width in.
     * Measured at 390px: scrollLeft rests at 20, never 0. Comparing against
     * zero therefore reported "not at the start" the moment the page loaded,
     * and the Previous arrow was live before anyone had paged anywhere. Only
     * xl and up escaped it, because there the padding is 0.
     */
    setAtStart(el.scrollLeft <= (starts[0] ?? 0) + 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    // Last slide whose left edge has reached the viewport edge.
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
    "absolute z-10 grid size-10 place-items-center rounded-full bg-white text-navy shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-all hover:bg-royal-50 disabled:opacity-0 disabled:pointer-events-none";
  /* Vertically centred on the picture band, not on the whole card: the card
     adds 0.5rem of padding above an image that is exactly --slide-h tall, and
     the caption below would otherwise drag the arrows down past it. */
  const arrowY = "top-[calc(0.5rem+var(--slide-h)/2)] -translate-y-1/2";

  const { left: figureLeft, right: figureRight } = PRESENTER_FIGURES;

  return (
    /* Sector-scoped, because this section renders once per sector and the
       inactive copy is only hidden with display:none — a bare id resolves to
       whichever copy comes first in the document, which may be the hidden one.
       The old unscoped `#agents` on PresenterStage is retired; nothing linked
       to it. */
    <section
      id={sector ? `agents-${sector}` : undefined}
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        {/* Centred on the homepage, left-ragged on inner pages. The stage below
            is symmetric there — figure, track, figure — and a left-aligned
            heading over it produced three different left edges: the figure in
            the gutter, the heading at the container, the track inset past both.
            Inner pages have no figures and no such problem. */}
        <div className={sector ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
          {/* A real heading, not the pill this used to be. It was the only
              thing naming the section, so dropping the eyebrow treatment
              had to promote it rather than delete it — and the section had
              no heading element at all until now. */}
          <h2 className="text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            {gallery.subtitle}
          </p>
        </div>
      </Container>

      {/* The design's composition. At `xl` the figures take a narrow column on
          each side and the track runs between them; below that they drop under
          the track, side by side, and the track goes back to full bleed.

          --slide-h lives here rather than on the track so the arrows can read
          it — they are positioned against the picture band's height. */}
      <div
        /* grid-cols-1 is load-bearing, not tidying. An implicit grid column is
           sized to max-content, and the track is a flex row of 16 slides — so
           without an explicit minmax(0,1fr) column the column grew to fit all
           of them, the track stopped overflowing, and it silently stopped
           scrolling at every width below xl. */
        className={`mt-8 grid grid-cols-1 gap-4 [--slide-h:150px] sm:[--slide-h:200px] lg:[--slide-h:262px] ${
          sector
            ? "xl:grid-cols-[minmax(0,150px)_minmax(0,1fr)_minmax(0,150px)] xl:items-end xl:gap-6 xl:px-8"
            : ""
        }`}
      >
        {/* The figures exist to flank something. Below xl there is nothing to
            flank — the track goes full-bleed edge to edge — so rather than
            stack them underneath it they are not rendered at all. Measured at
            390px they were 313px tall side by side: two thirds of a phone
            screen given to decoration that had lost its job. */}
        {sector ? (
          <div className="hidden xl:block">
            <Figure figure={figureLeft} side="left" />
          </div>
        ) : null}

        <div className="relative min-w-0">
          {/* Full-bleed below xl so slides run to the edge, but the page itself
              never scrolls horizontally. */}
          <div
            ref={trackRef}
            tabIndex={0}
            role="group"
            onKeyDown={onKeyDown}
            aria-label={`${gallery.title} — ${total} images, scrollable gallery`}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-8 xl:px-0 [scrollbar-width:thin]"
          >
            {gallery.shots.map((shot) => (
              <Slide key={`${gallery.id}-${shot.id}`} shot={shot} />
            ))}
            {/* trailing spacer so the last caption clears the viewport edge */}
            <div aria-hidden className="w-1 shrink-0" />
          </div>

          {/* Arrows at the track's edges, as the design draws them. They sit
              over the slides, so they fade out entirely at the ends rather than
              dimming — a 35%-opacity disc parked on top of a screenshot reads
              as an artefact, not as a disabled control. */}
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Previous image"
            className={`${arrow} ${arrowY} left-2 sm:left-4 xl:-left-5`}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Next image"
            className={`${arrow} ${arrowY} right-2 sm:right-4 xl:-right-5`}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          {/* Where the design puts three dots. A counter instead, because the
              whole point of this set is that it is much larger than three —
              dots would either lie about the size or produce sixteen of them.
              Announced politely: the number changes on every page, and a terse
              "3 / 16" read out mid-scroll is noise, not help. */}
          <p
            aria-live="polite"
            aria-atomic
            className="mt-4 text-center text-[15px] font-semibold tabular-nums text-slate"
          >
            <span className="text-navy">{index + 1}</span> / {total}
          </p>
        </div>

        {sector ? (
          <div className="hidden xl:block">
            <Figure figure={figureRight} side="right" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
