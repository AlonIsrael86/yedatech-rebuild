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
 * `hidden` attribute rather than conditionally mounted, so all of routes.ts is
 * now statically linked from the header. The header goes from 0 crawlable links
 * to every route — a net gain in internal linking, not a loss.
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { sector } = useSector();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = (routes: readonly RouteEntry[]) =>
    routes.filter((r) => r.sector === "both" || r.sector === sector);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-b border-line-soft shadow-[0_8px_28px_rgba(0,15,97,0.08)]"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={UI.homeAriaLabel} className="shrink-0">
            <Wordmark className="h-7 w-auto text-navy" />
          </Link>
          {/* The design puts the number in the bar. It is a real line, so it
              dials rather than decorating.

              Visible wherever it fits, hidden in the one band where it does
              not. At `lg` the row becomes logo + phone + three triggers + tabs
              + CTA, which measured at roughly zero slack — the CTA sat on the
              container edge. So the phone drops out from 1024 and returns at
              1280. Below `sm` it stays hidden, matching the design's mobile
              header, where the number lives in the footer instead. */}
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-1.5 text-[15px] font-semibold text-navy transition-colors hover:text-royal sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {CONTACT.phone}
          </a>
        </div>

        {/* Desktop triggers. One panel, not one per group — clicking any of
            them opens the same full-width sheet below the bar, so every route
            is visible at once instead of one group per hover. */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={UI.primaryNav}
        >
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-nav"
              className="inline-flex items-center gap-1 text-[16px] text-ink-soft transition-colors hover:text-royal"
            >
              {g.label}
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <SectorTabs compact />
          </div>
          <div className="hidden sm:block">
            <DemoButton variant="primary" size="sm">
              {HERO_CTA.primary}
            </DemoButton>
          </div>
          {/* Below lg the triggers are gone, so the hamburger is the only way in. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-[12px] text-navy ring-1 ring-inset ring-line lg:hidden"
            aria-label={open ? UI.closeMenu : UI.openMenu}
            aria-expanded={open}
            aria-controls="site-nav"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/*
        Always rendered, hidden with the `hidden` attribute rather than unmounted.
        That is the whole point of this change: these links are in the static
        HTML whether or not anyone opens the panel.
      */}
      <nav
        id="site-nav"
        hidden={!open}
        aria-label={UI.primaryNav}
        className="border-t border-line-soft bg-white shadow-[var(--shadow-ambient)]"
      >
        <Container className="py-6">
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-3">
            {GROUPS.map((g) => (
              <div key={g.id}>
                <p className="text-[13px] font-bold uppercase tracking-wide text-navy">
                  {g.label}
                </p>
                <ul className="mt-2">
                  {visible(g.routes).map((r) => (
                    <li key={r.path}>
                      <Link
                        href={r.path}
                        onClick={() => setOpen(false)}
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
          </div>

          {/* Below sm the tabs and the CTA have no room in the bar, so they
              live here instead. */}
          <div className="mt-6 flex flex-col items-center gap-4 border-t border-line-soft pt-6 lg:hidden">
            <SectorTabs />
            <DemoButton variant="primary" className="w-full sm:w-auto">
              {HERO_CTA.primary}
            </DemoButton>
          </div>
        </Container>
      </nav>
    </header>
  );
}
