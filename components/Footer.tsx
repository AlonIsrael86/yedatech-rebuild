import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Brand";
import { FOOTER, CONTACT, TOPBAR } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="max-w-xs sm:col-span-2">
          <Wordmark className="h-7 w-auto text-navy" />
          <p className="mt-4 text-[15px] leading-relaxed text-slate">
            {FOOTER.tagline}
          </p>
          <div className="mt-5 space-y-2 text-[15px]">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-ink-soft hover:text-royal"
            >
              <Mail className="size-4" aria-hidden />
              <span className="ltr">{CONTACT.email}</span>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 text-ink-soft hover:text-royal"
            >
              <Phone className="size-4" aria-hidden />
              <span className="ltr" dir="ltr">{CONTACT.phone}</span>
            </a>
          </div>
        </div>

        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-navy">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-slate transition-colors hover:text-royal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-5 text-[14px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              <span className="ltr">© {new Date().getFullYear()} Yeda</span> — All
              rights reserved.
            </p>
            {FOOTER.legal.map((l) => (
              <Link key={l.label} href={l.href} className="transition-colors hover:text-royal">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Language">
            {TOPBAR.languages.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                title={l.label}
                aria-current={l.active ? "true" : undefined}
                className={
                  l.active
                    ? "font-semibold text-navy"
                    : "text-slate transition-colors hover:text-royal"
                }
              >
                {l.code}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
