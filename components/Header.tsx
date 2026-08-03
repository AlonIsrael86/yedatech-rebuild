"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { Wordmark } from "@/components/Brand";
import { SectorTabs } from "@/components/SectorTabs";
import { useSector } from "@/components/SectorProvider";
import { CONTACT, HERO_CTA, UI } from "@/content/site";
import { SOLUTIONS, INDUSTRIES, PRODUCTS, type RouteEntry } from "@/content/routes";

/**
 * Logo, phone, Solutions / Industries / Products, sector tabs, CTA. Below `lg`
 * the triggers collapse into a hamburger, as Figma "Home page 1.4" has it.
 *
 * ONE PANEL, NOT ONE PER GROUP. Every trigger opens the same full-width sheet
 * attached directly beneath the bar, showing all three groups at once. The
 * previous mega-menu revealed one group per hover, so seeing the whole site
 * meant three separate hovers and the panel height jumped each time.
 *
 * WHY THIS IS NOT AN SEO LOSS, WHICH IS THE OBVIOUS OBJECTION.
 * The mega-menu used to mount its links only on hover (`{openGroup ? … }`), so
 * none of them existed in the prerendered HTML. Measured on the deployed page:
 * 21 internal links, every one of them from the Footer and the Family section,
 * zero from the header. Deleting the desktop dropdown removes no crawlable link
 * because there were none to remove.
 *
 * The panel below then goes further: it is always in the DOM and hidden with the
 * `hidden` attribute rather than conditionally mounted, so its links are in the
 * prerendered HTML whether or not anyone opens it. Header links go from 0 to 18.
 *
 * EIGHTEEN, NOT ALL 22. An earlier version of this comment claimed the header
 * statically links all of routes.ts; the build disproves it. `visible()` below
 * filters by the active sector, and the server always renders DEFAULT_SECTOR, so
 * the three `sector: "education"` routes are absent from the prerendered header.
 * That filter is deliberate — the point of the tabs is that the other sector's
 * pages are not the visitor's business. Nothing is orphaned by it: the Footer
 * lists all 22 unfiltered, which is where the crawl guarantee actually lives.
 *
 * The human cost is real and worth naming: nav behind a hamburger on a 1440px
 * screen is less discoverable than a visible bar. It is softened by the panel
 * showing all three groups at once, where the old menu revealed one group per
 * hover.
 *
 * The dark floating pill from the design is deliberately NOT here yet — it only
 * works over the dark hero, which does not exist. This change is structure; the
 * shell restyle lands with the hero.
 *
 * Navigation is still generated from content/routes.ts, so a page cannot be
 * added without also becoming reachable and indexable. Entries whose `sector` is
 * a specific sector are filtered against the active tab.
 */
const GROUPS: { id: string; label: string; routes: readonly RouteEntry[] }[] = [
  { id: "solutions", label: "Solutions", routes: SOLUTIONS },
  { id: "industries", label: "Industries", routes: INDUSTRIES },
  { id: "products", label: "Products", routes: PRODUCTS },
];

export function Header() {
  /*
   * Two controls, so two pieces of state. They were one boolean, and that was
   * the bug: every desktop trigger toggled it, so pressing "Solutions" rotated
   * the Industries and Products chevrons too and opened a panel whose contents
   * were the same whichever you pressed.
   */
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { sector } = useSector();

  const anyOpen = mobileOpen || openGroup !== null;
  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = (routes: readonly RouteEntry[]) =>
    routes.filter((r) => r.sector === "both" || r.sector === sector);

  /*
   * At rest the bar is the design's floating pill — #0c1b69, which is navy with
   * about 5% white over it, so `bg-white/[0.07]` over navy reproduces it.
   *
   * The header itself takes `bg-navy` rather than going transparent. A sticky
   * element occupies space rather than overlaying, so a transparent header sat
   * on the page's white body above the hero and the white pill text vanished
   * into it. Painting the header navy makes it continuous with the hero
   * beneath, which looks the same as the design's overlay without needing the
   * hero to slide under a fixed bar.
   *
   * It can only be dark because every page opens on a dark hero: the homepage
   * after this change, and every PageShell route already. Once you scroll off
   * that hero the pill would be white-on-white, so it hands over to the solid
   * light bar. Opening the panel does the same, since the panel is a light
   * sheet and a dark bar sitting on it would read as two separate objects.
   */
  const dark = !scrolled && !anyOpen;

  return (
    <header
      /* Leaving the header closes a desktop group. Without it a panel opened by
         click can only be dismissed by pressing the same trigger again — the
         old mega-menu had this and I dropped it. Mobile is untouched: the
         drawer should not vanish when a thumb drifts off it. */
      onMouseLeave={() => setOpenGroup(null)}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        dark
          ? "bg-navy"
          : "border-b border-line-soft bg-white/85 shadow-[0_8px_28px_rgba(0,15,97,0.08)] backdrop-blur-md"
      }`}
    >
      {/* `pt-3` in BOTH states. Only the pill needs the inset, but applying it
          conditionally changed the header's height from 76px to 64px the moment
          you scrolled, so the whole page jumped under you. */}
      <Container className="pt-3">
        {/* The gap and the pill's inset both tighten below `sm`, and the
            wordmark drops a size. That is not cosmetic — it is where the room
            for the sector tabs comes from. Budget at 360px in the at-rest dark
            state, which is the tighter of the two: 320px of container, less
            24px of pill inset, less a 65px wordmark and a 40px button, less the
            gaps, leaves about 175px. The tabs need 164px at `tight`. At `px-6`,
            `gap-4` and `h-7` the same sum comes to 124px and the row wraps. */}
        <div
          className={`flex h-16 items-center justify-between gap-2 transition-all duration-300 sm:gap-4 ${
            dark
              ? "rounded-[var(--radius-pill)] bg-white/[0.07] px-3 ring-1 ring-inset ring-white/15 backdrop-blur-md sm:px-6"
              : ""
          }`}
        >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" aria-label={UI.homeAriaLabel} className="shrink-0">
            <Wordmark
              className={`h-6 w-auto sm:h-7 ${dark ? "text-white" : "text-navy"}`}
            />
          </Link>

          {/* Sector switching used to live only in the desktop bar and inside
              the hamburger drawer, so on a phone the site's single most
              important control was one tap out of reach. It sits in the row
              now, next to the wordmark.

              Full-size words from 442px up — where the 249px pill clears the
              hamburger — and each sector's glyph below that, at the same control
              size. An earlier pass shrank the type to 12px across the whole
              range instead, including widths with 100px of room going spare.

              No width gate on the wrapper any more: the glyph pill is 92px, so
              it fits inside the 135px available even at 320px. That is why the
              drawer no longer needs a fallback copy. */}
          {/* `shrink-0` is load-bearing. Without it flex treated the pill as the
              slack in the row: at 640px, where the phone and the CTA appear, the
              left group overran and the tabs were quietly compressed from 252px
              to 160px with their labels spilling past the pill. The row's
              scrollWidth check passed the whole time, because the shrink is what
              absorbed the overflow. Nothing here may compress — if the row runs
              out of room it must be visible, and the fix must be to drop an
              element rather than to squash a control. */}
          <div className="shrink-0 lg:hidden">
            <SectorTabs size="compact" swapWordsForIcons />
          </div>
          {/* The design puts the number in the bar. It is a real line, so it
              dials rather than decorating.

              Now `xl` and up only. It used to appear from 640px, drop out at
              1024 where the nav triggers arrive, and return at 1280. That middle
              band is no longer the only pressure point: the sector tabs are in
              this row from 320px up, so from 640 — where the CTA also appears —
              logo + tabs + phone + CTA + hamburger overran the container and the
              tabs were the flex item that gave way.

              Between the number and the site's primary mode switch, the switch
              wins. The number is still one tap away in the footer, the closing
              contact panel and every inner page's CTA, and it is a `tel:` link in
              all of them. Below `sm` it was already hidden, matching the design's
              mobile header. */}
          <a
            href={CONTACT.phoneHref}
            className={`hidden items-center gap-1.5 text-[15px] font-semibold transition-colors xl:inline-flex ${
              dark ? "text-white hover:text-sky" : "text-navy hover:text-royal"
            }`}
          >
            <Phone className="size-4" aria-hidden />
            {CONTACT.phone}
          </a>
        </div>

        {/* Each trigger governs its own group and its own chevron, and points
            aria-controls at the block it actually opens rather than the whole
            sheet. */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={UI.primaryNav}
        >
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() =>
                setOpenGroup((v) => (v === g.id ? null : g.id))
              }
              /* Hover-open only for an actual mouse.
                 This was `onMouseEnter`, and it made the whole desktop nav
                 unreachable by tap: a touch device fires the compatibility
                 mouseenter first, which opened the group, and then the click
                 landed and toggled it straight back shut. The panel flickered
                 and nothing opened — on a Surface, a touch laptop or an iPad in
                 landscape, where these triggers are the only nav because the
                 hamburger is `lg:hidden`.
                 With pointerType gated, a tap skips the open and the click does
                 it instead; a mouse behaves exactly as before. */
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setOpenGroup(g.id);
              }}
              aria-expanded={openGroup === g.id}
              aria-controls={`nav-${g.id}`}
              className={`inline-flex items-center gap-1 text-[16px] transition-colors ${
                dark
                  ? "text-white/85 hover:text-white"
                  : "text-ink-soft hover:text-royal"
              }`}
            >
              {g.label}
              <ChevronDown
                className={`size-4 transition-transform ${
                  openGroup === g.id ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Desktop keeps its copy here beside the CTA; below `lg` the tabs are
              in the left-hand group next to the wordmark instead. */}
          <div className="hidden lg:block">
            <SectorTabs size="compact" />
          </div>
          <div className="hidden sm:block">
            <DemoButton variant="primary" size="sm">
              {HERO_CTA.primary}
            </DemoButton>
          </div>
          {/* Below lg the triggers are gone, so the hamburger is the only way in. */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`inline-flex size-10 items-center justify-center rounded-[12px] ring-1 ring-inset transition-colors lg:hidden ${
              dark ? "text-white ring-white/25" : "text-navy ring-line"
            }`}
            aria-label={mobileOpen ? UI.closeMenu : UI.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        </div>
      </Container>

      {/*
        Always rendered, hidden with the `hidden` attribute rather than unmounted.
        That is the whole point of this change: these links are in the static
        HTML whether or not anyone opens the panel.
      */}
      <nav
        id="site-nav"
        hidden={!anyOpen}
        aria-label={UI.primaryNav}
        className="border-t border-line-soft bg-white shadow-[var(--shadow-ambient)]"
      >
        <Container className="py-6">
          {GROUPS.map((g) => (
            <div
              key={g.id}
              id={`nav-${g.id}`}
              /* Hidden, never unmounted. The header's links are in the static
                 HTML only because of this — render just the open group and the
                 count goes straight back to zero, which is the whole reason
                 this structure exists.

                 Desktop shows the one group you pressed; the hamburger shows
                 all three stacked. */
              hidden={!mobileOpen && openGroup !== g.id}
              /* Carries the name the heading below used to give it, since that
                 heading is gone on desktop. */
              aria-label={g.label}
              className="not-last:mb-6 lg:not-last:mb-0"
            >
              {/* Drawer only. On desktop this panel is opened BY a control
                  labelled "Solutions", so heading it "SOLUTIONS" said the same
                  word twice a few pixels apart. In the drawer all three groups
                  stack at once and the headings are the only thing separating
                  them, so there they stay. */}
              <p className="text-[13px] font-bold uppercase tracking-wide text-navy lg:hidden">
                {g.label}
              </p>
              {/* The group spreads across the columns on its own rather than
                  sitting in one narrow strip with two empty ones beside it.
                  `mt-2` clears the heading, so it goes where the heading does. */}
              <ul className="mt-2 grid gap-x-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3">
                {visible(g.routes).map((r) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      onClick={closeAll}
                      className="block rounded-[12px] px-3 py-2.5 transition-colors hover:bg-royal-50"
                    >
                      <span className="block text-[15px] font-semibold text-navy">
                        {r.label}
                      </span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-slate">
                        {r.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Below sm the CTA has no room in the bar, so it lives here.

              The sector tabs used to be here too, which is why switching sector
              on a phone meant opening the menu first. They are in the bar at
              every width now — glyphs where the words will not fit — so there is
              no copy here at all. Two of the same control on one screen is worse
              than one in the right place. */}
          <div className="mt-6 flex flex-col items-center gap-4 border-t border-line-soft pt-6 lg:hidden">
            <DemoButton variant="primary" className="w-full sm:w-auto">
              {HERO_CTA.primary}
            </DemoButton>
          </div>
        </Container>
      </nav>
    </header>
  );
}
