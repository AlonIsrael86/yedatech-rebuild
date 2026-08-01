"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { NAV, HERO } from "@/content/site";
import { Wordmark } from "@/components/Brand";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate the sticky header once the page scrolls past the hero's top edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-b border-line shadow-[0_1px_16px_-6px_rgba(10,26,110,0.25)]"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="#top" aria-label="Yeda — home" className="shrink-0">
            <Wordmark className="h-7 w-auto text-navy" />
          </Link>
          {/* "To home page" back-link (Figma node 213-8616) — left side of the header */}
          <Link
            href="#top"
            className="hidden items-center gap-1.5 rounded-[12px] border border-line bg-white px-3.5 py-2 text-[14px] font-semibold text-navy shadow-[0_2px_10px_-3px_rgba(1,15,96,0.15)] transition-colors hover:border-royal/40 hover:text-royal sm:inline-flex"
          >
            <ChevronLeft className="size-[18px]" aria-hidden />
            To home page
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[16px] text-ink-soft transition-colors hover:text-royal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <DemoButton variant="primary">{HERO.primaryCta}</DemoButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-[8px] text-navy ring-1 ring-inset ring-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <nav aria-label="Primary (mobile)" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[16px] text-ink-soft hover:bg-royal-50 hover:text-royal"
              >
                {item.label}
              </Link>
            ))}
            <DemoButton variant="primary" className="mt-2 w-full">
              {HERO.primaryCta}
            </DemoButton>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
