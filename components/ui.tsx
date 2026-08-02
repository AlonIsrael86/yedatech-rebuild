import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Presentation primitives.
 *
 * Rewritten from scratch for the yedalabs.ai-anchored design. The checkpoint's
 * flat 8px card on a grey drop shadow is gone; elevation here is built on brand
 * colour, which is what distinguishes Yeda's current-generation look.
 */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius-pill)] bg-royal-50 px-3 py-1 text-[13px] font-semibold tracking-[0.01em] text-royal ring-1 ring-inset ring-royal-100">
      {children}
    </span>
  );
}

/* ── GlowCard ─────────────────────────────────────────────────────────────
   The elevation primitive. `tone` picks how far off the page it sits;
   `glass` adds the backdrop blur used on surfaces that overlap imagery. */

type Tone = "flat" | "ambient" | "lift" | "glow";

const TONE: Record<Tone, string> = {
  flat: "shadow-none ring-1 ring-inset ring-line",
  ambient: "shadow-[var(--shadow-ambient)] ring-1 ring-inset ring-line-soft",
  lift: "shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line-soft",
  glow: "shadow-[var(--shadow-glow)] ring-1 ring-inset ring-royal-100",
};

export function GlowCard({
  children,
  tone = "ambient",
  glass = false,
  interactive = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  glass?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[var(--radius-card)]",
        glass ? "bg-white/70 backdrop-blur-xl" : "bg-white",
        TONE[tone],
        interactive
          ? "transition-shadow duration-300 hover:shadow-[var(--shadow-hero)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/* ── Bento ────────────────────────────────────────────────────────────────
   A 6-column grid whose children declare their own span. This is the
   composition the checkpoint never had — it lets one wide feature tile sit
   beside several small ones instead of an even 4-up card row. */

export function Bento({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 ${className}`}
    >
      {children}
    </div>
  );
}

/** Column spans are expressed as whole classes so Tailwind can see them. */
const SPAN: Record<2 | 3 | 4 | 6, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6 sm:col-span-2",
};

export function BentoTile({
  children,
  span = 2,
  tone = "ambient",
  className = "",
}: {
  children: ReactNode;
  span?: 2 | 3 | 4 | 6;
  tone?: Tone;
  className?: string;
}) {
  return (
    <GlowCard
      tone={tone}
      interactive
      className={`${SPAN[span]} h-full p-6 sm:p-7 ${className}`}
    >
      {children}
    </GlowCard>
  );
}

/* ── SectionShell ─────────────────────────────────────────────────────────
   One place that owns vertical rhythm and the eyebrow/title/lede stack, so
   spacing stops being hand-tuned in every section component. */

export function SectionShell({
  id,
  eyebrow,
  title,
  lede,
  align = "center",
  ground = "white",
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  align?: "center" | "start";
  ground?: "white" | "canvas" | "navy";
  children?: ReactNode;
  className?: string;
}) {
  const grounds = {
    white: "bg-white",
    canvas: "bg-canvas",
    navy: "bg-navy text-white",
  } as const;

  const onNavy = ground === "navy";

  return (
    <section id={id} className={`${grounds[ground]} py-16 sm:py-24 ${className}`}>
      <Container>
        {title ? (
          <div
            className={
              align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
            }
          >
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2
              className={`mt-4 text-3xl font-bold leading-[1.15] sm:text-4xl ${
                onNavy ? "text-white" : "text-navy"
              }`}
            >
              {title}
            </h2>
            {lede ? (
              <p
                className={`mt-4 text-lg leading-relaxed ${
                  onNavy ? "text-white/75" : "text-slate"
                }`}
              >
                {lede}
              </p>
            ) : null}
          </div>
        ) : null}
        {children ? <div className={title ? "mt-12" : ""}>{children}</div> : null}
      </Container>
    </section>
  );
}

/* ── Button ───────────────────────────────────────────────────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
};

// LTR: the arrow points right. Flip to ArrowLeft if the Hebrew Yeda LMS build
// reuses this primitive.
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 text-[16px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles = {
    primary:
      "bg-royal text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)] hover:bg-royal-600 hover:shadow-[0_14px_30px_-12px_rgba(10,89,235,0.5)]",
    secondary:
      "bg-white text-navy ring-1 ring-inset ring-line hover:bg-royal-50 hover:ring-royal-100",
    ghost: "text-navy hover:text-royal",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {withArrow ? <ArrowRight className="size-[18px]" aria-hidden /> : null}
    </Link>
  );
}
