import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Brand";
import { FOOTER, CONTACT } from "@/content/site";

// Brand glyphs (lucide dropped brand icons) — simple-icons paths, viewBox 0 0 24 24.
const SOCIAL_PATHS: Record<string, string> = {
  TikTok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  WhatsApp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
};

function SocialIcon({ name }: { name: string }) {
  const d = SOCIAL_PATHS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        {/* brand + social */}
        <div className="max-w-xs">
          <Wordmark className="h-7 w-auto text-white" />
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">{FOOTER.tagline}</p>
          <div className="mt-5 flex gap-3">
            {FOOTER.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full text-white/80 ring-1 ring-white/25 transition-colors hover:bg-white/10 hover:text-white"
              >
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>

        {/* link columns */}
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* contact */}
        <div>
          <h3 className="text-[14px] font-bold uppercase tracking-wide text-white">Contact</h3>
          <div className="mt-4 space-y-2.5 text-[15px]">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white"
            >
              <Mail className="size-4" aria-hidden />
              <span className="ltr">{CONTACT.email}</span>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 text-white/70 hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              <span className="ltr" dir="ltr">{CONTACT.phone}</span>
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-5 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="ltr">© {new Date().getFullYear()} Yeda</span> — All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER.legal.map((l) => (
              <Link key={l.label} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
