"use client";

import { useSector } from "@/components/SectorProvider";
import { SECTORS, SECTOR_PROMPT } from "@/content/site";

/**
 * The tab pair Alexey asked for. Switching does not navigate — it flips the
 * data-sector attribute and CSS reveals the other set of panels.
 *
 * Styled as a labelled segmented control rather than a quiet pill pair: the
 * active tab is filled royal with a glow and the inactive one is outlined, so
 * it reads as a live choice instead of decoration. Still a real tablist, so
 * keyboard and screen-reader users get the same affordance.
 */
export function SectorTabs({
  className = "",
  showPrompt = true,
}: {
  className?: string;
  showPrompt?: boolean;
}) {
  const { sector, setSector } = useSector();

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showPrompt ? (
        <span className="hidden text-[13px] font-medium text-slate xl:inline">
          {SECTOR_PROMPT}
        </span>
      ) : null}

      <div
        role="tablist"
        aria-label="Choose your sector"
        className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-canvas p-1 ring-1 ring-inset ring-line"
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
              className={`rounded-[var(--radius-pill)] px-4 py-2 text-[15px] font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
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
    </div>
  );
}
