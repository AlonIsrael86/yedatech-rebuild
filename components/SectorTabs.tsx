"use client";

import { useSector } from "@/components/SectorProvider";
import { SECTORS } from "@/content/site";

/**
 * The tab pair Alexey asked for. Switching does not navigate — it flips the
 * data-sector attribute and CSS reveals the other set of panels.
 *
 * Laid out as a 2-column grid rather than an inline flex row, so both tabs are
 * exactly the same width regardless of label length ("Organizations" is a lot
 * longer than "Education"). Still a real tablist, so keyboard and
 * screen-reader users get the same affordance.
 *
 * `tight` is the one size that gives that up — see the note on it below.
 */
const SIZES = {
  md: "px-4 py-2 text-[15px]",
  compact: "px-3 py-1.5 text-[14px]",
  tight: "px-1.5 py-1 text-[12px]",
} as const;

export type SectorTabsSize = keyof typeof SIZES;

export function SectorTabs({
  className = "",
  size = "md",
}: {
  className?: string;
  /**
   * Sizing lives on the inner buttons, which is why this is a prop and not
   * something `className` can reach.
   *
   * `compact` — the sticky header's desktop copy. "Organizations" is long and
   * the grid sizes both cells to it, so `md` runs ~270px; against the nav and
   * the CTA on a 1024px viewport that overflowed the 64px bar.
   *
   * `tight` — the same header row at mobile widths, where the tabs sit beside
   * the wordmark and the hamburger. The budget there is brutal: at 360px, after
   * the container padding, the floating pill's own padding, a 65px wordmark and
   * a 40px button, about 175px is left. `compact` needs 249px.
   *
   * So `tight` alone drops the equal-width grid for natural widths. Matching
   * "Education" to "Organizations" costs ~35px to no reader's benefit, and 35px
   * is the difference between fitting and not. It is a deliberate exception at
   * one breakpoint, not a change of mind about the layout.
   */
  size?: SectorTabsSize;
}) {
  const { sector, setSector } = useSector();

  const cell = SIZES[size];
  const tight = size === "tight";

  return (
    <div
      role="tablist"
      aria-label="Choose your sector"
      className={`rounded-[var(--radius-pill)] bg-canvas ring-1 ring-inset ring-line ${
        tight
          ? "inline-flex gap-0.5 p-0.5"
          : "inline-grid grid-cols-2 gap-1 p-1"
      } ${className}`}
    >
      {SECTORS.map((s) => {
        const active = s.key === sector;
        return (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={s.aria}
            onClick={() => setSector(s.key)}
            /* `w-full` fills the grid cell; in the tight flex row it would
               instead ask for the whole pill's width, so it goes. */
            className={`rounded-[var(--radius-pill)] ${tight ? "" : "w-full"} ${cell} text-center font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              active
                ? "bg-royal text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)]"
                : "bg-white text-ink-soft ring-1 ring-inset ring-line hover:bg-royal-50 hover:text-royal"
            }`}
          >
            {s.tab}
          </button>
        );
      })}
    </div>
  );
}
