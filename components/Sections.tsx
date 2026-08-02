import * as Icons from "lucide-react";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import {
  CREDIBILITY,
  AUDIENCES,
  CAPABILITIES,
  CAPABILITY_LIBRARY,
  PRODUCTION,
  PROCESS,
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

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-slate">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* ── Credibility ─────────────────────────────────────────────────────── */
export function Credibility({ sector }: { sector: Sector }) {
  const c = CREDIBILITY[sector];
  return (
    <section className="border-b border-line bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHead title={c.title} subtitle={c.subtitle} />
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {c.statements.map((s) => (
              <li
                key={s}
                className="rounded-[var(--radius-pill)] border border-line bg-canvas px-5 py-2.5 text-[16px] font-medium text-navy"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Audiences ───────────────────────────────────────────────────────── */
export function Audiences({ sector }: { sector: Sector }) {
  const a = AUDIENCES[sector];
  return (
    <section id="solutions" className="bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={a.title} subtitle={a.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.items.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.06}>
              <article className="h-full rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-float)]">
                <span className="inline-grid size-12 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Capabilities ────────────────────────────────────────────────────── */
export function Capabilities({ sector }: { sector: Sector }) {
  const c = CAPABILITIES[sector];
  return (
    <section id="platform" className="border-y border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={c.title} subtitle={c.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {c.keys.map((key, i) => {
            const cap = CAPABILITY_LIBRARY[key];
            if (!cap) return null;
            return (
              <Reveal key={key} delay={(i % 3) * 0.06}>
                <div className="flex gap-4">
                  <span className="mt-0.5 inline-grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-navy text-white">
                    <Icon name={cap.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-bold text-navy">{cap.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-slate">
                      {cap.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Capability grid reused by solution / industry / product pages. */
export function CapabilityGrid({ keys }: { keys: readonly string[] }) {
  return (
    <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      {keys.map((key, i) => {
        const cap = CAPABILITY_LIBRARY[key];
        if (!cap) return null;
        return (
          <Reveal key={key} delay={(i % 2) * 0.06}>
            <div className="flex gap-4">
              <span className="mt-0.5 inline-grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-navy text-white">
                <Icon name={cap.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-[18px] font-bold text-navy">{cap.title}</h3>
                <p className="mt-1.5 text-[16px] leading-relaxed text-slate">
                  {cap.body}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ── Content production (Yeda Labs) ──────────────────────────────────── */
export function Production() {
  return (
    <section id="production" className="border-y border-line bg-navy py-16 text-white sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[14px] font-semibold text-sand">
              {PRODUCTION.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {PRODUCTION.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              {PRODUCTION.subtitle}
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTION.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-card)] bg-white/[0.06] p-6 ring-1 ring-inset ring-white/10">
                <span className="inline-grid size-12 place-items-center rounded-[var(--radius-card)] bg-white/10 text-sand">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-white/70">
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

/* ── Process ─────────────────────────────────────────────────────────── */
export function Process() {
  return (
    <section id="process" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={PROCESS.title} subtitle={PROCESS.subtitle} />
        </Reveal>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="h-full rounded-[var(--radius-card)] border border-line bg-canvas p-5">
                <span className="block text-3xl font-bold text-royal/25">{s.n}</span>
                <h3 className="mt-2 text-[18px] font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ── Product family ──────────────────────────────────────────────────── */
export function Family() {
  return (
    <section id="products" className="border-t border-line bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={FAMILY.title} subtitle={FAMILY.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILY.items.map((f, i) => {
            const body = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-navy">{f.name}</h3>
                  <p className="text-[15px] text-slate">{f.body}</p>
                </div>
              </>
            );
            const shell =
              "flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-card)]";
            return (
              <Reveal key={f.name} delay={(i % 3) * 0.06}>
                {f.href ? (
                  <Link
                    href={f.href}
                    className={`${shell} transition-shadow hover:shadow-[var(--shadow-float)]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={shell}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
