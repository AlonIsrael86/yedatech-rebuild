import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { DemoButton } from "@/components/DemoButton";
import { Reveal } from "@/components/Reveal";
import { FINAL_CTA, CONTACT } from "@/content/site";

export function FinalCta() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-royal px-6 py-14 text-center text-white sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(680px 340px at 80% -20%, rgba(255,255,255,0.18), transparent 60%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                {FINAL_CTA.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
                {FINAL_CTA.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <DemoButton
                  variant="secondary"
                  className="bg-white text-royal hover:bg-white/90"
                  withArrow
                >
                  {FINAL_CTA.primaryCta}
                </DemoButton>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] text-white/90">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail className="size-4" aria-hidden />
                  <span className="ltr">{CONTACT.email}</span>
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="size-4" aria-hidden />
                  <span className="ltr">{CONTACT.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
