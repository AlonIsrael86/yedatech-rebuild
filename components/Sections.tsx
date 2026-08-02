import * as Icons from "lucide-react";
import Link from "next/link";
import {
  Bento,
  BentoTile,
  Container,
  GlowCard,
  SectionShell,
} from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import {
  AUDIENCES,
  BENTO,
  CAPABILITY_LIBRARY,
  PRODUCTION,
  FAMILY,
} from "@/content/site";
import type { Sector } from "@/content/routes";

type IconName = keyof typeof Icons;
function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons[name as IconName] ?? Icons.Circle) as React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  return <C className={className} aria-hidden />;
}

/* ── Capability bento ────────────────────────────────────────────────────
   Replaces the checkpoint's even card grid AND its numbered feature blocks.
   The lead tile is wider and carries the ingestion story. */
export function CapabilityBento({ sector }: { sector: Sector }) {
  const b = BENTO[sector];
  return (
    <SectionShell
      id="platform"
      ground="canvas"
      eyebrow={b.eyebrow}
      title={b.title}
      lede={b.lede}
    >
      <Bento>
        {b.tiles.map((tile, i) => {
          const cap = CAPABILITY_LIBRARY[tile.key];
          if (!cap) return null;
          const lead = i === 0;
          return (
            <BentoTile
              key={tile.key}
              span={tile.span}
              tone={lead ? "glow" : "ambient"}
            >
              <span
                className={`inline-grid place-items-center rounded-[12px] ${
                  lead
                    ? "size-14 bg-royal text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)]"
                    : "size-11 bg-royal-50 text-royal"
                }`}
              >
                <Icon name={cap.icon} className={lead ? "size-7" : "size-5"} />
              </span>
              <h3
                className={`font-bold text-navy ${
                  lead ? "mt-6 text-2xl" : "mt-5 text-[18px]"
                }`}
              >
                {cap.title}
              </h3>
              <p
                className={`mt-2.5 leading-relaxed text-slate ${
                  lead ? "max-w-lg text-[17px]" : "text-[15px]"
                }`}
              >
                {cap.body}
              </p>
            </BentoTile>
          );
        })}
      </Bento>
    </SectionShell>
  );
}

/* ── Audiences ───────────────────────────────────────────────────────── */
export function Audiences({ sector }: { sector: Sector }) {
  const a = AUDIENCES[sector];
  return (
    <SectionShell id="solutions" title={a.title} lede={a.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {a.items.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.06}>
            <GlowCard tone="lift" interactive className="h-full p-6">
              <span className="inline-grid size-11 place-items-center rounded-[12px] bg-sky/50 text-navy">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-[18px] font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">
                {item.body}
              </p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/** Capability list reused by solution / industry / product pages. */
export function CapabilityGrid({ keys }: { keys: readonly string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {keys.map((key, i) => {
        const cap = CAPABILITY_LIBRARY[key];
        if (!cap) return null;
        return (
          <Reveal key={key} delay={(i % 2) * 0.06}>
            <GlowCard tone="ambient" className="h-full p-6">
              <span className="inline-grid size-11 place-items-center rounded-[12px] bg-royal-50 text-royal">
                <Icon name={cap.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-[18px] font-bold text-navy">{cap.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">
                {cap.body}
              </p>
            </GlowCard>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ── Yeda Labs — content production ──────────────────────────────────── */
export function Production() {
  return (
    <section id="production" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 400px at 88% -10%, rgba(10,89,235,0.55), transparent 62%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-[var(--radius-pill)] bg-white/10 px-3 py-1 text-[13px] font-semibold text-sky ring-1 ring-inset ring-white/15">
              {PRODUCTION.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.15] sm:text-4xl">
              {PRODUCTION.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              {PRODUCTION.subtitle}
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTION.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-card)] bg-white/[0.07] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-sm">
                <span className="inline-grid size-11 place-items-center rounded-[12px] bg-white/10 text-sky">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-[18px] font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* Process lived here. It described the sales engagement, not the product, and
   competed with the new numbered Flow — see components/Flow.tsx. */

/* ── Product family ──────────────────────────────────────────────────── */
export function Family() {
  return (
    <SectionShell id="products" title={FAMILY.title} lede={FAMILY.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILY.items.map((f, i) => {
          const inner = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-royal-50 text-royal">
                <Icon name={f.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-navy">{f.name}</h3>
                <p className="mt-0.5 text-[15px] text-slate">{f.body}</p>
              </div>
            </>
          );
          return (
            <Reveal key={f.name} delay={(i % 3) * 0.06}>
              {f.href ? (
                <Link href={f.href} className="block h-full">
                  <GlowCard
                    tone="lift"
                    interactive
                    className="flex h-full items-center gap-4 p-5"
                  >
                    {inner}
                  </GlowCard>
                </Link>
              ) : (
                <GlowCard tone="ambient" className="flex h-full items-center gap-4 p-5">
                  {inner}
                </GlowCard>
              )}
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
