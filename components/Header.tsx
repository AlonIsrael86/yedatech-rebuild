"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { Wordmark } from "@/components/Brand";
import { SectorTabs } from "@/components/SectorTabs";
import { useSector } from "@/components/SectorProvider";
import { HERO_CTA, UI } from "@/content/site";
import { SOLUTIONS, INDUSTRIES, PRODUCTS, type RouteEntry } from "@/content/routes";

/**
 * Navigation is generated from content/routes.ts, so a page cannot be added
 * without also becoming reachable and indexable.
 *
 * Entries whose `sector` is a specific sector are filtered against the active
 * tab — the menu follows the same switch as the page body.
 */
const GROUPS: { id: string; label: string; routes: readonly RouteEntry[] }[] = [
  { id: "solutions", label: "Solutions", routes: SOLUTIONS },
  { id: "industries", label: "Industries", routes: INDUSTRIES },
  { id: "products", label: "Products", routes: PRODUCTS },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { sector } = useSector();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the desktop menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
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
      onMouseLeave={() => setOpenGroup(null)}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Sector choice sits at the START of the bar — it is context you set
            before reading anything else, and it keeps the two royal pills at
            opposite ends of the header instead of touching. It stays inside
            the sticky bar so the switch is still reachable after scrolling,
            which a *global* switch has to be. */}
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={UI.homeAriaLabel} className="shrink-0">
            <Wordmark className="h-7 w-auto text-navy" />
          </Link>
          <div className="hidden lg:block">
            <SectorTabs compact />
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={UI.primaryNav}>
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setOpenGroup((v) => (v === g.id ? null : g.id))}
              onMouseEnter={() => setOpenGroup(g.id)}
              aria-expanded={openGroup === g.id}
              className="inline-flex items-center gap-1 text-[16px] text-ink-soft transition-colors hover:text-royal"
            >
              {g.label}
              <ChevronDown
                className={`size-4 transition-transform ${openGroup === g.id ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          ))}
          <Link
            href="/#platform"
            className="text-[16px] text-ink-soft transition-colors hover:text-royal"
          >
            Platform
          </Link>
        </nav>

        <div className="hidden lg:block">
          <DemoButton variant="primary" size="sm">
            {HERO_CTA.primary}
          </DemoButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-[12px] text-navy ring-1 ring-inset ring-line lg:hidden"
          aria-label={mobileOpen ? UI.closeMenu : UI.openMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Desktop dropdown panel */}
      {openGroup ? (
        <div className="hidden border-t border-line-soft bg-white shadow-[var(--shadow-ambient)] lg:block">
          <Container className="py-6">
            <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {visible(
                GROUPS.find((g) => g.id === openGroup)?.routes ?? [],
              ).map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    onClick={() => setOpenGroup(null)}
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
          </Container>
        </div>
      ) : null}

      {/* Mobile */}
      {mobileOpen ? (
        <nav aria-label={UI.mobileNav} className="border-t border-line-soft bg-white lg:hidden">
          {/* Centred rather than left-aligned — the drawer reads as a menu
              rather than a stray sidebar on a narrow screen. */}
          <Container className="flex flex-col items-center gap-4 py-4 text-center">
            <SectorTabs />
            {GROUPS.map((g) => (
              <div key={g.id} className="w-full">
                <p className="text-[13px] font-bold uppercase tracking-wide text-navy">
                  {g.label}
                </p>
                <ul className="mt-1.5">
                  {visible(g.routes).map((r) => (
                    <li key={r.path}>
                      <Link
                        href={r.path}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-[12px] px-3 py-2 text-[15px] text-ink-soft transition-colors hover:bg-royal-50 hover:text-royal"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <DemoButton variant="primary" className="w-full">
              {HERO_CTA.primary}
            </DemoButton>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
