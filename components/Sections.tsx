import * as Icons from "lucide-react";
import { Container, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Presenter } from "@/components/Presenters";
import { AiAgentPanel } from "@/components/ProductVisual";
import {
  HERO,
  CREDIBILITY,
  AUDIENCES,
  CAPABILITIES,
  AI_LEARNING,
  INTEGRATIONS,
  CUSTOM_SOLUTIONS,
  RESOURCES,
  CASE_STUDY,
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
  nowrap = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  nowrap?: boolean;
}) {
  return (
    <div className={`${nowrap ? "max-w-none" : "max-w-2xl"} ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl ${
          nowrap ? "lg:whitespace-nowrap" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg leading-relaxed text-slate ${nowrap ? "mx-auto max-w-2xl" : ""}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* ── Credibility strip ───────────────────────────────────────────────── */
export function Credibility() {
  return (
    <section id="platform" className="border-b border-line bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHead title={CREDIBILITY.title} subtitle={CREDIBILITY.subtitle} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-2xl">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {CREDIBILITY.statements.map((s) => (
                <li
                  key={s}
                  className="flex items-center justify-center rounded-[var(--radius-card)] border border-line bg-canvas px-5 py-5 text-center text-[16px] font-semibold text-navy"
                >
                  {s}
                </li>
              ))}
            </ul>
            {/* woman-left / man-right presenters flanking the 2x2 */}
            <Presenter
              side="left"
              offset="lg:-left-24"
              img={HERO.characters.woman.src}
              alt={HERO.characters.woman.alt}
              line={HERO.characters.woman.line}
            />
            <Presenter
              side="right"
              offset="lg:-right-24"
              img={HERO.characters.man.src}
              alt={HERO.characters.man.alt}
              line={HERO.characters.man.line}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Audiences (four cards) ──────────────────────────────────────────── */
export function Audiences() {
  return (
    <section id="audiences" className="bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead nowrap title={AUDIENCES.title} subtitle={AUDIENCES.subtitle} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.items.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.06}>
              <article className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-float)]">
                <span className="inline-grid size-12 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{a.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Platform overview (capabilities) ────────────────────────────────── */
export function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={CAPABILITIES.eyebrow}
            title={CAPABILITIES.title}
            subtitle={CAPABILITIES.subtitle}
          />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.items.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="flex gap-4">
                <span className="mt-0.5 inline-grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-navy text-white">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-navy">{c.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-slate">
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

/* ── AI-powered learning ─────────────────────────────────────────────── */
export function AiLearning() {
  return (
    <section id="ai" className="border-y border-line bg-navy py-16 text-white sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="text-[14px] font-semibold tracking-[0.02em] text-sand">
                {AI_LEARNING.eyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {AI_LEARNING.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                {AI_LEARNING.subtitle}
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {AI_LEARNING.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span className="mt-0.5 inline-grid size-10 shrink-0 place-items-center rounded-[var(--radius-card)] bg-white/10 text-sand">
                      <Icon name={f.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold">{f.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-white/70">
                        {f.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button
                  href="#contact"
                  variant="secondary"
                  withArrow
                  className="bg-white text-navy hover:bg-white/90"
                >
                  {AI_LEARNING.cta}
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[440px]">
              <AiAgentPanel />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ── Integrations ────────────────────────────────────────────────────── */
export function Integrations() {
  return (
    <section id="integrations" className="bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={INTEGRATIONS.eyebrow}
            title={INTEGRATIONS.title}
            subtitle={INTEGRATIONS.subtitle}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-[16px] font-bold text-navy">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-[var(--radius-pill)] border border-line bg-canvas px-3 py-1.5 text-[14px] font-medium text-ink-soft"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-[14px] text-slate">{INTEGRATIONS.note}</p>
            <Button href="#contact" variant="secondary" withArrow>
              {INTEGRATIONS.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Custom solutions & services (folds in the production studio) ─────── */
export function CustomSolutions() {
  return (
    <section id="custom" className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <Eyebrow>{CUSTOM_SOLUTIONS.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {CUSTOM_SOLUTIONS.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                {CUSTOM_SOLUTIONS.subtitle}
              </p>
              <div className="mt-8">
                <Button href="#contact" variant="primary" withArrow>
                  {CUSTOM_SOLUTIONS.cta}
                </Button>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <ul className="grid gap-4 sm:grid-cols-2">
                {CUSTOM_SOLUTIONS.items.map((it) => (
                  <li
                    key={it.title}
                    className="flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-canvas p-4"
                  >
                    <span className="inline-grid size-10 shrink-0 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                      <Icon name={it.icon} className="size-5" />
                    </span>
                    <span className="text-[15px] font-semibold text-navy">{it.title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* production studio — "our team builds it with you" */}
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-[var(--radius-media)] border border-line bg-navy p-6 text-white sm:p-8">
                <span className="text-[14px] font-semibold text-sand">
                  {PRODUCTION.eyebrow}
                </span>
                <h3 className="mt-2 text-xl font-bold">{PRODUCTION.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  {PRODUCTION.subtitle}
                </p>
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {PRODUCTION.steps.map((s, i) => (
                    <li
                      key={s.title}
                      className="rounded-[var(--radius-card)] bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10"
                    >
                      <span className="ltr text-[13px] font-semibold text-sand">
                        {`0${i + 1}`}
                      </span>
                      <h4 className="mt-1 text-[15px] font-bold">{s.title}</h4>
                      <p className="mt-1 text-[14px] leading-relaxed text-white/70">
                        {s.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Customer success story — hidden until a real, named case exists ─── */
export function CaseStudy() {
  if (!CASE_STUDY) return null;
  const c = CASE_STUDY;
  return (
    <section id="case-study" className="border-t border-line bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[var(--radius-media)] border border-line bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
            <span className="text-[14px] font-semibold text-royal">{c.customerType}</span>
            <blockquote className="mt-4 text-2xl font-bold leading-snug text-navy">
              “{c.quote}”
            </blockquote>
            <p className="mt-3 text-[15px] text-slate">{c.attribution}</p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                ["Challenge", c.challenge],
                ["Solution", c.solution],
                ["Result", c.result],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[13px] font-semibold uppercase tracking-wide text-slate">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button href={c.href} variant="secondary" withArrow>
                Read the Case Study
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Resources — honest teaser (topics now, articles when supplied) ──── */
export function Resources() {
  const hasArticles = RESOURCES.items.length > 0;
  return (
    <section id="resources" className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={RESOURCES.eyebrow}
            title={RESOURCES.title}
            subtitle={RESOURCES.subtitle}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasArticles
            ? RESOURCES.items.map((r, i) => (
                <Reveal key={r.title} delay={(i % 3) * 0.06}>
                  <a
                    href={r.href}
                    className="group flex h-full flex-col rounded-[var(--radius-media)] border border-line bg-canvas p-6 transition-shadow hover:shadow-[var(--shadow-float)]"
                  >
                    <span className="text-[13px] font-semibold uppercase tracking-wide text-royal">
                      {r.kind}
                    </span>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-navy group-hover:text-royal">
                      {r.title}
                    </h3>
                    {r.excerpt ? (
                      <p className="mt-2 text-[15px] leading-relaxed text-slate">{r.excerpt}</p>
                    ) : null}
                  </a>
                </Reveal>
              ))
            : RESOURCES.topics.map((t, i) => (
                <Reveal key={t.title} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-[var(--radius-media)] border border-line bg-canvas p-6">
                    <span className="inline-grid size-11 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                      <Icon name={t.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">{t.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{t.body}</p>
                  </div>
                </Reveal>
              ))}
        </div>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <Button href="#" variant="secondary" withArrow>
              {RESOURCES.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Content production (Yeda Labs) — retained for a future internal page ─ */
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

/* ── Process — retained for a future internal page ("How it works") ───── */
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

/* ── Company / product family ────────────────────────────────────────── */
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
                <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-card)] bg-royal-50 text-royal">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="ltr text-[17px] font-bold text-navy">{f.name}</h3>
                  <p className="text-[15px] text-slate">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
