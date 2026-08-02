"use client";

import { useSector } from "@/components/SectorProvider";
import { SECTORS } from "@/content/site";

/**
 * The tab pair Alexey asked for. Switching does not navigate — it flips the
 * data-sector attribute and CSS reveals the other set of panels.
 *
 * Rendered as a real tablist so keyboard and screen-reader users get the same
 * affordance as mouse users.
 */
export function SectorTabs({ className = "" }: { className?: string }) {
  const { sector, setSector } = useSector();

  return (
    <div
      role="tablist"
      aria-label="Choose your sector"
      className={`inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-canvas p-1 ring-1 ring-inset ring-line ${className}`}
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
            className={`rounded-[var(--radius-pill)] px-3.5 py-1.5 text-[14px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
              active
                ? "bg-royal text-white"
                : "text-ink-soft hover:text-royal"
            }`}
          >
            {s.tab}
          </button>
        );
      })}
    </div>
  );
}
