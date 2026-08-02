import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Brand";
import { FOOTER, CONTACT } from "@/content/site";
import { SOLUTIONS, INDUSTRIES, PRODUCTS } from "@/content/routes";

/**
 * The footer lists every route unfiltered by sector — this is the guarantee
 * that no page is orphaned from the link graph, whichever tab a crawler
 * happens to land on.
 */
const COLUMNS = [
  { title: "Solutions", routes: SOLUTIONS },
  { title: "Industries", routes: INDUSTRIES },
  { title: "Products", routes: PRODUCTS },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-canvas">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
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
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 text-ink-soft hover:text-royal"
            >
              <Phone className="size-4" aria-hidden />
              {CONTACT.phone}
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-navy">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.routes.map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    className="text-[15px] text-slate transition-colors hover:text-royal"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-line-soft">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-[14px] text-slate sm:flex-row">
          <p>
            © {new Date().getFullYear()} Yeda — {FOOTER.legal}
          </p>
          <p>{FOOTER.strapline}</p>
        </Container>
      </div>
    </footer>
  );
}
