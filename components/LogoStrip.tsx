import Image from "next/image";
import { clientsReady, logosFor } from "@/content/clients";
import type { Sector } from "@/content/routes";

/**
 * The rolling client-logo strip Alexey pointed at on yedalms.io — "логотипы,
 * которые катаются".
 *
 * PER SECTOR, as of 2026-08-06. yedalms.io groups its own customers into
 * educational institutions and companies, which maps onto our two tabs, so the
 * Education panel shows colleges and the Organizations panel shows employers.
 * `logosFor` owns that split; this component just renders what it is handed.
 *
 * Renders NOTHING while the logos are unapproved — see content/clients.ts. The
 * guard lives in the data layer, so mounting this component can never leak an
 * unapproved client name, and one flag takes every logo off the site.
 *
 *  - IN FULL COLOUR. These were greyscale at 70% and coloured up on hover,
 *    which is the usual way to keep a logo wall quiet. Victor asked for colour,
 *    and it matters more here than it would lower down: the strip now sits
 *    directly under the navy hero, where a row of grey marks read as washed
 *    out rather than restrained. Hover no longer changes anything, so the
 *    transition went with it.
 *  - ONE FIXED BOX PER LOGO, and `object-contain` fits the mark inside it.
 *    The marks are cropped to their own bounds, so their ratios run from 0.82
 *    (INT) to 8.47 (Elevation); on `w-auto` that is a 26px logo sitting beside
 *    a 271px one. A fixed box gives every client the same slot, which is the
 *    point of a customer strip, and the widest wordmarks simply sit shorter
 *    inside it. The box is 160x44, up from 132x36 — the ratio is held at ~3.65
 *    so nothing reflows inside it, and globals.css lengthens the loop to match
 *    the longer track;
 *  - the track holds the list twice and shifts by exactly -50%, so the loop is
 *    seamless with no visible jump;
 *  - the second pass is aria-hidden, so a screen reader hears each client once;
 *  - `.marquee-track` in globals.css owns the animation, pauses it on hover,
 *    and is already covered by the global prefers-reduced-motion rule.
 */
export function LogoStrip({ sector }: { sector: Sector }) {
  if (!clientsReady(sector)) return null;

  const shown = logosFor(sector);

  return (
    /* The eyebrow that sat here — CLIENTS_INTRO, "Learning teams already
       building on Yeda" — is gone at Victor's request. It carried the section's
       only accessible name, so `aria-label` takes that job: a bare row of 22
       marks is announced as a labelled region rather than an anonymous list.
       Invisible, and it keeps the alt text on each logo doing what it should. */
    <section
      aria-label="Yeda clients"
      className="border-y border-line-soft bg-white py-10"
    >
      <div className="relative overflow-hidden">
        {/* Soft edges so logos fade out rather than being clipped mid-mark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
        />

        <ul className="marquee-track flex w-max items-center">
          {shown.map((logo) => (
            <li
              key={logo.slug}
              className="flex shrink-0 items-center justify-center px-8"
            >
              <Image
                src={logo.file}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-11 w-[160px] object-contain"
              />
            </li>
          ))}
          {/* Second pass exists only to make the loop seamless. */}
          {shown.map((logo) => (
            <li
              key={`dup-${logo.slug}`}
              aria-hidden
              className="flex shrink-0 items-center justify-center px-8"
            >
              {/* aria-hidden on the <li> already removes this from the
                  accessibility tree, so the alt is never announced twice —
                  keeping it non-empty preserves the site-wide "no empty alt"
                  invariant we verify against. */}
              <Image
                src={logo.file}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-11 w-[160px] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
