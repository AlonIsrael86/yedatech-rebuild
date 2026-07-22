import * as Icons from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ProductDashboard, AvatarModulePanel } from "@/components/ProductVisual";
import {
  CREDIBILITY,
  AUDIENCES,
  CAPABILITIES,
  PRODUCT,
  AVATAR,
  PRODUCTION,
  PROCESS,
  FAMILY,
} from "@/content/site";

type IconName = keyof typeof Icons;
function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons[name as IconName] ?? Icons.Circle) as React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  return <C className={className} aria-hidden />;
}

function SectionHead({
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
export function Credibility() {
  return (
    <section id="platform" className="border-b border-line bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHead title={CREDIBILITY.title} subtitle={CREDIBILITY.subtitle} />
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {CREDIBILITY.statements.map((s) => (
              <li
                key={s}
                className="rounded-[var(--radius-pill)] border border-line bg-canvas px-5 py-2.5 text-[15px] font-medium text-navy"
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
export function Audiences() {
  return (
    <section id="audiences" className="bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={AUDIENCES.title} subtitle={AUDIENCES.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.items.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.06}>
              <article className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-float)]">
                <span className="inline-grid size-12 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">
                  {a.body}
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
export function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={CAPABILITIES.title} subtitle={CAPABILITIES.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.items.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="flex gap-4">
                <span className="mt-0.5 inline-grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-navy text-white">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-navy">{c.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Avatar-based learning (headline capability) ─────────────────────── */
export function AvatarLearning() {
  return (
    <section id="avatar" className="bg-canvas py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal delay={0.12} className="order-2 lg:order-1">
          <figure>
            <AvatarModulePanel />
            <figcaption className="mt-3 text-center text-[13px] text-slate">
              {AVATAR.panel.caption}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="max-w-lg">
            <Eyebrow>{AVATAR.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {AVATAR.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {AVATAR.subtitle}
            </p>
            <ul className="mt-8 space-y-5">
              {AVATAR.points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-0.5 inline-grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold text-navy">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Product experience (coded dashboard + avatar module) ─────────────── */
export function ProductExperience() {
  return (
    <section className="bg-canvas py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="max-w-lg">
            <Eyebrow>{PRODUCT.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {PRODUCT.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {PRODUCT.subtitle}
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "ניהול קורסים, מסלולים ולומדים",
                "סטטיסטיקות מבחנים ודוחות ביצועים",
                "בקרה ונתונים בזמן אמת",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-royal-50 text-royal">
                    <Icons.Check className="size-3.5" aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <figure>
            <ProductDashboard />
            <figcaption className="mt-3 text-center text-[13px] text-slate">
              {PRODUCT.dashboard.caption}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Content production (Yeda Labs) ──────────────────────────────────── */
export function Production() {
  return (
    <section id="production" className="border-y border-line bg-navy py-16 text-white sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold text-sand">
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
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
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
              <li className="relative h-full rounded-[var(--radius-card)] border border-line bg-canvas p-5">
                <span className="ltr block text-3xl font-bold text-royal/25">
                  {s.n}
                </span>
                <h3 className="mt-2 text-[17px] font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
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
    <section id="family" className="border-t border-line bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead title={FAMILY.title} subtitle={FAMILY.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILY.items.map((f, i) => (
            <Reveal key={f.name} delay={(i % 3) * 0.06}>
              <div className="flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-card)]">
                <span className="ltr grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-[13px] font-bold text-royal">
                  {f.name.replace("Yeda ", "")}
                </span>
                <div>
                  <h3 className="ltr text-[16px] font-bold text-navy">{f.name}</h3>
                  <p className="text-[14px] text-slate">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
