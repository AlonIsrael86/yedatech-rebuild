"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
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
 *    number of pixels — one slide, not one page of three, so nothing ever jumps
 *    past you unseen — and the position counter makes the size of the set
 *    visible, the whole point being that there are many images now.
 *  - The caption is a real <figcaption>, not a tooltip, and `caption` is
 *    non-optional in content/media.ts so a slot cannot exist without one.
 *
 * UNIFORM WIDTH, DERIVED HEIGHT — and it used to be the other way round.
 *
 * Slides shared one fixed height and took their width from each shot's own
 * ratio, so how many landed on screen was whatever the arithmetic produced:
 * about 2.5 at 1440px, a different ragged fraction at every other width, and a
 * half slide hanging off a phone. Nothing scaled with the viewport, which is
 * what Victor meant by "doesn't look like a responsive one".
 *
 * Height-first existed for exactly one reason: a 720×1560 PORTRAIT PHONE FRAME
 * in the set, which at any shared width renders 910px tall beside a 262px
 * landscape card. That frame is gone. All 25 shots now run 1.351 to 2.000 —
 * every one landscape — so the constraint that forced it no longer exists.
 *
 * Slides are now a fraction of the track: 1 up on a phone, 2 from `sm`, 3 from
 * `lg`. The percentages resolve against the track's CONTENT box, so its
 * px-5 / sm:px-8 padding is already subtracted and the count is exact.
 *
 * ONE FRAME RATIO PER GALLERY, and it is the median of that gallery's own
 * shots — 1.407 for organizations, 1.860 for education. A uniform width with
 * per-shot ratios would give every slide a different height and a ragged row,
 * so the band needs a single ratio; taking it from the set keeps the letterbox
 * bars small and follows the set if it changes.
 *
 * `object-contain`, NEVER `cover`. Every crop in content/media.ts was measured
 * by hand — the admin dashboard was recentred twice — and cover would quietly
 * cut into that work. Contain letterboxes instead, and the bars are white on a
 * white card, so they are invisible.
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

function Slide({ shot, ratio }: { shot: Shot; ratio: number }) {
  return (
    /*
     * --slide-w is set once on the grid below and is the same for every slide,
     * which is the whole point: the count per view is fixed rather than falling
     * out of each frame's proportions. An explicit width is also still required
     * for a different reason — a flex item with no width takes its max-content
     * size, and the widest child of this figure is the caption, not the
     * picture, so the card would be sized by prose.
     */
    <figure
      data-slide
      className="group shrink-0 snap-start"
      style={{ width: "var(--slide-w)" }}
    >
      <div className="overflow-hidden rounded-[var(--radius-media)] bg-white p-2 shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft transition-shadow duration-300 group-hover:shadow-[var(--shadow-hero)]">
        {/* One band ratio for the whole gallery, so every slide in the row is
            the same height and the captions start on one line. data-media is
            how the arrows find that height — see `sync`. */}
        <div
          data-media
          className="relative w-full overflow-hidden rounded-[14px]"
          style={{ aspectRatio: ratio }}
        >
          {shot.file ? (
            <Image
              src={shot.file}
              alt={shot.alt}
              fill
              /* Capped at 1600px the widest a slide ever gets is ~380px. */
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 400px"
              className="object-contain"
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

/**
 * The one aspect ratio the whole gallery's picture band is drawn at.
 *
 * The MEDIAN of the set rather than a site-wide constant. The two homepage
 * galleries are genuinely differently shaped — organizations sits between 1.406
 * and 1.686, education between 1.400 and 2.000 — and a single house ratio would
 * have side-barred most of one of them. Median rather than mean so one outlier
 * frame cannot drag the whole band off the shape of the set.
 */
function frameRatio(shots: readonly Shot[]): number {
  const r = shots.map((s) => s.width / s.height).sort((a, b) => a - b);
  return r[Math.floor(r.length / 2)] ?? 16 / 10;
}

/**
 * How far into the track a snapped slide sits.
 *
 * Below `xl` the track is full-bleed and carries its own px-5 / sm:px-8, and
 * scroll-snap aligns to the SNAPPORT — which, with no scroll-padding, is the
 * padding box, i.e. the screen edge. So the browser parked the first slide
 * flush against that edge with the left padding scrolled out of sight, and
 * pulled the slide after it into view. Measured at 768px: slide 1 at 0..340,
 * slide 2 at 364..704 fully visible, slide 3 poking in at 728. Two per view was
 * the intent; three and a bit is what showed.
 *
 * `scroll-p-*` moves the snapport in to match the padding, so a snapped slide
 * rests inside it and the count per view is the count that was asked for. Every
 * scroll position is then offset by that padding, which is why it is read
 * rather than assumed — it changes at two breakpoints and is 0 at `xl`.
 */
function scrollPad(el: HTMLElement): number {
  return parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
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
  /*
   * The picture band's height in pixels, measured. The arrows are centred on
   * it, and it used to be a constant the CSS already knew (--slide-h). It is
   * now an aspect ratio of a percentage width, which CSS cannot hand back: a
   * percentage in `top` resolves against the parent's HEIGHT, so there is no
   * expression that reaches it. Measuring costs nothing here — `sync` already
   * runs on every scroll frame and already reads rects.
   */
  const [bandH, setBandH] = useState(0);

  const total = gallery.shots.length;
  const ratio = frameRatio(gallery.shots);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const starts = slideStarts(el);
    const pad = scrollPad(el);

    const band = el.querySelector<HTMLElement>("[data-media]");
    if (band) setBandH(band.getBoundingClientRect().height);

    /*
     * "At the start" is the first slide's RESTING scroll position — its offset
     * less the scroll padding. Not zero, and not the offset either.
     *
     * Comparing against zero used to report "not at the start" the moment the
     * page loaded, because the browser parks on the first snap point rather
     * than at 0, so the Previous arrow was live before anyone had paged
     * anywhere. Only xl escaped it, where the padding is 0.
     */
    setAtStart(el.scrollLeft <= (starts[0] ?? 0) - pad + 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    // Last slide that has reached its resting position.
    let cur = 0;
    for (let i = 0; i < starts.length; i++) {
      if (starts[i] - pad <= el.scrollLeft + 8) cur = i;
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
    const pad = scrollPad(el);

    /* Compared and scrolled to in RESTING coordinates — a slide's own offset
       less the scroll padding. Scrolling to the raw offset would overshoot by
       one padding width and the snap would drag it back, which reads as a
       bounce. */
    const rest = starts.map((x) => x - pad);
    const target =
      dir === 1
        ? rest.find((x) => x > el.scrollLeft + 8)
        : [...rest].reverse().find((x) => x < el.scrollLeft - 8);

    el.scrollTo({
      left: Math.max(0, target ?? (dir === 1 ? el.scrollWidth : 0)),
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
     adds 0.5rem of padding above the band, and the caption below would
     otherwise drag the arrows down past it. Falls back to the middle of the
     whole column until the first measurement lands. */
  const arrowY: CSSProperties = bandH
    ? { top: `calc(0.5rem + ${bandH / 2}px)` }
    : { top: "50%" };

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

          --slide-w lives here rather than on the track because the figures'
          columns are part of what is left over: it is a percentage, and it has
          to resolve inside the track, which this grid sizes.

          xl:px-8 IS UNCONDITIONAL, and used to be homepage-only. At `xl` the
          track loses its own padding and the arrows sit 20px OUTSIDE it, so on
          the 21 inner pages — which pass no sector and so got no padding — the
          Next arrow hung 20px past the right edge and scrolled the whole
          document sideways. Pre-existing, visible on the deployed build at
          every width from 1280 to 1600; the homepage escaped it because the
          figures' layout brought the padding with it.

          CAPPED AT 1600px. Percentage slides grow without limit otherwise —
          about 700px each on a 27-inch monitor, far larger than anything else
          on the page. At the cap the organizations band lands at ~270px, which
          is where the fixed 262px band sat before this. */}
      <div
        /* grid-cols-1 is load-bearing, not tidying. An implicit grid column is
           sized to max-content, and the track is a flex row of 16 slides — so
           without an explicit minmax(0,1fr) column the column grew to fit all
           of them, the track stopped overflowing, and it silently stopped
           scrolling at every width below xl. */
        className={`mx-auto mt-8 grid max-w-[1600px] grid-cols-1 gap-4 [--slide-w:100%] sm:[--slide-w:calc((100%-2rem)/2)] lg:[--slide-w:calc((100%-4rem)/3)] xl:[--slide-w:calc((100%-3rem)/3)] xl:px-8 ${
          sector
            ? "xl:grid-cols-[minmax(0,150px)_minmax(0,1fr)_minmax(0,150px)] xl:items-end xl:gap-6"
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
            /* Three things are tied together here, and all three have to move
               as one:

                 scroll-p-* mirrors px-* exactly — see scrollPad above. Without
                 it the snapport is the screen edge and an extra slide is
                 dragged into view at every width below xl.

                 gap-* ALSO mirrors px-*, so that where one slide ends and the
                 padding begins, the next slide starts exactly at the viewport
                 edge. When the gap was narrower than the padding — 24 against
                 32 — an 8px strip of the next slide stayed on screen, and at
                 that width it was a strip of CAPTION: sliced letters at the
                 edge, which reads as a rendering fault rather than as a hint
                 that the track scrolls.

                 --slide-w on the grid subtracts these same gaps. Change one,
                 change all three. */
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-p-5 px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-8 sm:scroll-p-8 sm:px-8 xl:gap-6 xl:scroll-p-0 xl:px-0 [scrollbar-width:thin]"
          >
            {gallery.shots.map((shot) => (
              <Slide
                key={`${gallery.id}-${shot.id}`}
                shot={shot}
                ratio={ratio}
              />
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
            style={arrowY}
            className={`${arrow} left-2 -translate-y-1/2 sm:left-4 xl:-left-5`}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Next image"
            style={arrowY}
            className={`${arrow} right-2 -translate-y-1/2 sm:right-4 xl:-right-5`}
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
