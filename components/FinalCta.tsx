import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { Reveal } from "@/components/Reveal";
import { FINAL_CTA, FINAL_CTA_BY_SECTOR, CONTACT } from "@/content/site";
import type { Sector } from "@/content/routes";

/**
 * Rewritten for the new design: a navy panel floating on a sky-tinted wash and
 * lifted by a royal glow, rather than the checkpoint's flat royal slab sitting
 * flush on white.
 *
 * `sector` is optional on purpose. The homepage passes it so the closing line
 * changes with the tab; PageShell renders the same component on all 21 inner
 * pages with no sector, and those keep the neutral line.
 */
export function FinalCta({ sector }: { sector?: Sector }) {
  const subtitle = sector
    ? FINAL_CTA_BY_SECTOR[sector].subtitle
    : FINAL_CTA.subtitle;

  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[40px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(196,216,253,0.55), transparent 76%)",
              }}
            />
            <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-navy px-6 py-14 text-center text-white shadow-[var(--shadow-hero)] sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(680px 340px at 78% -24%, rgba(10,89,235,0.65), transparent 62%)",
                }}
              />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
                  {FINAL_CTA.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
                  {subtitle}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <DemoButton
                    variant="secondary"
                    className="bg-white text-royal ring-0 hover:bg-sky"
                    withArrow
                  >
                    {FINAL_CTA.primaryCta}
                  </DemoButton>
                </div>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] text-white/80">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Mail className="size-4" aria-hidden />
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="size-4" aria-hidden />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
