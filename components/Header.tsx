"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { NAV, HERO } from "@/content/site";
import { Wordmark } from "@/components/Brand";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="#top" aria-label="Yeda — לדף הבית" className="shrink-0">
          <Wordmark className="h-7 w-auto text-navy" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="ראשי">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-royal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#contact" variant="primary">
            {HERO.primaryCta}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-[8px] text-navy ring-1 ring-inset ring-line lg:hidden"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[15px] text-ink-soft hover:bg-royal-50 hover:text-royal"
              >
                {item.label}
              </Link>
            ))}
            <Button href="#contact" variant="primary" className="mt-2">
              {HERO.primaryCta}
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
