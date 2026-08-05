"use client";

import { usePathname, useRouter } from "next/navigation";
import { Building2, GraduationCap } from "lucide-react";
import { useSector } from "@/components/SectorProvider";
import { SECTORS } from "@/content/site";

/**
 * The tab pair Alexey asked for.
 *
 * ON THE HOMEPAGE it does not navigate: it flips the data-sector attribute and
 * CSS reveals the other set of panels. That is Alexey's requirement — the tab
 * switches the whole site "without changing the page" — and it must stay.
 *
 * ANYWHERE ELSE it goes to the homepage, because there was nothing for it to
 * switch. `PageShell` renders one route for one sector, so an inner page
 * contains ZERO `[data-sector-panel]` elements and the display:none rule in
 * globals.css has nothing to act on. Clicking Education on
 * /solutions/employee-training/ used to repaint the tab and rewrite the menu
 * from 20 links to 11 while leaving the reader on the same organizations copy,
 * same h1, same URL. Victor asked for the homepage instead, from every inner
 * page — including the six whose sector is "both", so the rule has no
 * per-page exceptions a visitor would have to guess at.
 *
 * WHY THE STORE WRITE, NOT A QUERY STRING. `/?sector=education` looks like the
 * obvious href and it does not work: `readSector()` returns early from a
 * module-level cache that is already populated once the app has booted, so
 * client-side routing never reads the query. Verified — a fresh load of
 * /?sector=education lands in education, a client-side navigation to the same
 * URL lands in organizations. So setSector() has to run here, and the route
 * carries no state.
 *
 * ROLE FOLLOWS BEHAVIOUR. A tablist promises a tabpanel relationship, which
 * only exists on the homepage. Off it, this is a pair of buttons that navigate,
 * so they are announced that way — aria-current rather than aria-selected.
 *
 * Laid out as a 2-column grid rather than an inline flex row, so both tabs are
 * exactly the same width regardless of label length ("Organizations" is a lot
 * longer than "Education").
 */
const SIZES = {
  md: "px-4 py-2 text-[15px]",
  compact: "px-3 py-1.5 text-[14px]",
} as const;

export type SectorTabsSize = keyof typeof SIZES;

/*
 * Named imports, and only the two glyphs. Sections.tsx resolves its icons with
 * `import * as Icons from "lucide-react"`, which pulls the whole library into
 * that chunk; the Header is on every page and already imports its four by name.
 */
const TAB_ICONS = { Building2, GraduationCap } as const;

/*
 * THE THRESHOLD IS A MEASURED CONSTANT AND IT HAS TO BE LITERAL.
 *
 * 442px: below `sm` the hamburger's left edge sits at `viewport − 72`, and the
 * compact text pill is 249px wide ending at x=362, so it needs 442px of viewport
 * to clear the button. Under that the tabs show their glyph instead.
 *
 * These cannot be a prop. Tailwind generates CSS by scanning source text, so an
 * interpolated `${screen}:inline` produces no rule at all — the classes have to
 * appear here spelled out.
 */
const NARROW = {
  word: "hidden min-[442px]:inline",
  glyph: "mx-auto size-5 min-[442px]:hidden",
  /* 40×40 in glyph mode — a squarer tap target than the 32px-tall text cell —
     handing back to the compact text padding at the breakpoint. Axis utilities
     on both sides so neither relies on Tailwind's p-before-px ordering. */
  cell: "px-2.5 py-2.5 min-[442px]:px-3 min-[442px]:py-1.5 text-[14px]",
} as const;

export function SectorTabs({
  className = "",
  size = "md",
  swapWordsForIcons = false,
}: {
  className?: string;
  /**
   * Sizing lives on the inner buttons, which is why this is a prop and not
   * something `className` can reach.
   *
   * `compact` — the sticky header. "Organizations" is long and the grid sizes
   * both cells to it, so `md` runs ~270px; against the nav and the CTA on a
   * 1024px viewport that overflowed the 64px bar.
   */
  size?: SectorTabsSize;
  /**
   * Show each sector's glyph instead of its word below 442px, at full control
   * size, rather than shrinking the type to fit.
   *
   * Only the mobile header copy wants this. An earlier pass solved the same
   * problem with a 12px `tight` size applied across the whole range below `lg`,
   * which shrank the tabs at widths with 100px of room to spare — Victor caught
   * it. Words wherever they fit, glyph only where they cannot.
   */
  swapWordsForIcons?: boolean;
}) {
  const { sector, setSector } = useSector();
  const pathname = usePathname();
  const router = useRouter();

  /* The homepage is the only route that renders both sector panels, so it is the
     only one where switching can happen in place. Compared with the trailing
     slash stripped because every route in content/routes.ts carries one. */
  const onHomepage = (pathname ?? "/").replace(/\/+$/, "") === "";

  const cell = swapWordsForIcons ? NARROW.cell : SIZES[size];

  const choose = (key: (typeof SECTORS)[number]["key"]) => {
    /* Write first, navigate second: the homepage reads the store as it mounts,
       so the order is what makes it arrive in the chosen sector. */
    setSector(key);
    if (!onHomepage) router.push("/");
  };

  return (
    <div
      role={onHomepage ? "tablist" : undefined}
      aria-label="Choose your sector"
      className={`inline-grid grid-cols-2 gap-1 rounded-[var(--radius-pill)] bg-canvas p-1 ring-1 ring-inset ring-line ${className}`}
    >
      {SECTORS.map((s) => {
        const active = s.key === sector;
        const Glyph = TAB_ICONS[s.icon as keyof typeof TAB_ICONS];
        return (
          <button
            key={s.key}
            type="button"
            role={onHomepage ? "tab" : undefined}
            aria-selected={onHomepage ? active : undefined}
            aria-current={!onHomepage && active ? "true" : undefined}
            /* The accessible name is the same sentence in both modes, so the
               glyph is never an unlabelled control. `title` gives the short
               name somewhere to live for anyone who can hover. */
            aria-label={s.aria}
            title={s.tab}
            onClick={() => choose(s.key)}
            className={`w-full rounded-[var(--radius-pill)] ${cell} text-center font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              active
                ? "bg-royal text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)]"
                : "bg-white text-ink-soft ring-1 ring-inset ring-line hover:bg-royal-50 hover:text-royal"
            }`}
          >
            {/* One control, two presentations. Both children are always in the
                DOM and CSS picks; rendering one or the other on a breakpoint
                would need JS to know the viewport, and the active fill,
                aria-selected and the label must not differ between them. */}
            {swapWordsForIcons && Glyph ? (
              <Glyph className={NARROW.glyph} aria-hidden />
            ) : null}
            <span className={swapWordsForIcons ? NARROW.word : undefined}>
              {s.tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
