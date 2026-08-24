import { Quote } from "lucide-react";
import { Bento, GlowCard, SectionShell } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/content/testimonials";

/**
 * The customer quote wall — five real testimonials, supplied by Seva and
 * Alexey. The words, the roles and the reason nobody is named all live in
 * content/testimonials.ts; this file only lays them out.
 *
 * FIVE IS THE AWKWARD NUMBER, and it drove the layout. Five cards in a
 * three-column grid leave a hole; in two columns they leave a widow. So this
 * uses the Bento the rest of the page already uses: the six-column grid takes
 * 3 + 3 on the first row and 2 + 2 + 2 on the second, which lands exactly on
 * five tiles with nothing left over.
 *
 * The two wide slots hold the two CEO quotes, which are the ones about the
 * decision to move at all; the three narrower ones hold the people who then had
 * to run it — two training managers and a systems manager. That ordering is
 * also roughly longest-first, so the wide tiles carry the wider text.
 *
 * GlowCard rather than BentoTile: BentoTile is hardcoded `interactive`, and a
 * card that lifts under the cursor reads as clickable. These lead nowhere.
 *
 * MARKUP IS figure / blockquote / figcaption, which is the pairing HTML has for
 * a quotation with an attribution — a screen reader announces the attribution
 * as belonging to the quote rather than as a stray line after it. The decorative
 * quote glyph is aria-hidden so it is not read as punctuation.
 *
 * RENDERED ONCE, shared between sectors, like ValueBand — see the note in
 * content/testimonials.ts for why these are not split by tab.
 */

/* Whole class names, so Tailwind's scanner can see them. Index-matched to
   TESTIMONIALS: two wide, then three narrow. The last tile goes full width at
   the `sm` two-column breakpoint, where five items would otherwise leave it
   sitting alone in a half-width slot. */
const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2 sm:col-span-2",
];

export function Testimonials() {
  return (
    <SectionShell
      id="customers"
      title={TESTIMONIALS_COPY.title}
      lede={TESTIMONIALS_COPY.lede}
      ground="canvas"
    >
      <Bento>
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            key={t.id}
            delay={i * 0.06}
            className={`${SPANS[i]} h-full`}
          >
            <GlowCard tone="ambient" className="h-full p-6 sm:p-7">
              <figure className="flex h-full flex-col">
                <Quote
                  aria-hidden
                  className="size-7 shrink-0 fill-sky text-sky"
                />
                <blockquote className="mt-4 flex-1">
                  <p className="text-pretty text-[17px] leading-relaxed text-navy">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line-soft pt-4">
                  {/* With no approved name, the role carries the line and the
                      organization type sits under it. The moment a name is
                      filled in, it takes the top line and the role joins the
                      organization on the second — no other change needed. */}
                  <span className="block text-[15px] font-bold text-navy">
                    {t.name ?? t.role}
                  </span>
                  <span className="mt-0.5 block text-[14px] text-slate">
                    {t.name ? `${t.role}, ${t.org}` : t.org}
                  </span>
                </figcaption>
              </figure>
            </GlowCard>
          </Reveal>
        ))}
      </Bento>
    </SectionShell>
  );
}
