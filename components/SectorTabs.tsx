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
 */
export function SectorTabs({ className = "" }: { className?: string }) {
  const { sector, setSector } = useSector();

  return (
    <div
      role="tablist"
      aria-label="Choose your sector"
      className={`inline-grid grid-cols-2 gap-1 rounded-[var(--radius-pill)] bg-canvas p-1 ring-1 ring-inset ring-line ${className}`}
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
            className={`w-full rounded-[var(--radius-pill)] px-4 py-2 text-center text-[15px] font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
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
