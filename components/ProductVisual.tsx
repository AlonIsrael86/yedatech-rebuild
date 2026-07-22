import {
  LayoutDashboard,
  FolderTree,
  PlaySquare,
  Award,
  Settings,
  ClipboardCheck,
  Play,
  UserRound,
  Check,
  ChevronDown,
  Lightbulb,
  Code2,
} from "lucide-react";
import { PRODUCT, AVATAR, SURFACES } from "@/content/site";
import { Wordmark } from "@/components/Brand";

const { dashboard } = PRODUCT;

/** Donut built from the legend segments (conceptual — values from Figma mock). */
function Donut() {
  const segs = dashboard.donut.legend;
  const total = segs.reduce((s, x) => s + x.value, 0);
  const R = 42;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="size-[132px] -rotate-90" aria-hidden>
      <circle cx="60" cy="60" r={R} fill="none" stroke="var(--color-line)" strokeWidth="14" />
      {segs.map((s, i) => {
        const len = (s.value / total) * C;
        const el = (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

/**
 * Conceptual LMS dashboard, coded (not a screenshot) and clearly labeled.
 * Recreates the product frame from Alexey's Figma with the design tokens.
 */
export function ProductDashboard() {
  const navItems = [
    { icon: LayoutDashboard, label: "לוח בקרה", active: true },
    { icon: FolderTree, label: "קטגוריות" },
    { icon: PlaySquare, label: "קורסים" },
    { icon: Award, label: "תעודות" },
    { icon: ClipboardCheck, label: "מבחנים" },
    { icon: Settings, label: "הגדרות" },
  ];
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[var(--radius-media)] bg-white shadow-[var(--shadow-pop)] ring-1 ring-line"
    >
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-royal" />
          <span className="text-[15px] font-semibold text-navy">{dashboard.title}</span>
        </div>
        <Wordmark className="h-5 w-auto text-royal" />
      </div>

      <div className="grid grid-cols-[1fr_128px]">
        {/* main */}
        <div className="min-w-0 p-4">
          {/* KPI tiles */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {dashboard.kpis.map((k) => (
              <div key={k.label} className="rounded-[var(--radius-card)] border border-line bg-white p-3">
                <div className="ltr text-2xl font-bold text-navy">{k.value}</div>
                <div className="mt-1 text-[11px] leading-tight text-slate">{k.label}</div>
              </div>
            ))}
          </div>
          {/* donut block */}
          <div className="mt-3 rounded-[var(--radius-card)] border border-line bg-royal-50/40 p-4">
            <div className="mb-1 text-[13px] font-semibold text-navy">
              {dashboard.donut.title}
            </div>
            <div className="flex items-center justify-between gap-3">
              <ul className="space-y-2">
                {dashboard.donut.legend.map((l) => (
                  <li key={l.label} className="flex items-center gap-2 text-[12px] text-ink-soft">
                    <span className="size-2.5 rounded-full" style={{ background: l.color }} />
                    <span className="ltr font-semibold text-navy">{l.value}</span>
                    <span>{l.label}</span>
                  </li>
                ))}
              </ul>
              <div className="relative grid place-items-center">
                <Donut />
                <span className="ltr absolute text-xl font-bold text-navy">
                  {dashboard.donut.total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* side nav */}
        <aside className="border-r border-line bg-white p-2">
          <ul className="space-y-1">
            {navItems.map((n) => (
              <li key={n.label}>
                <span
                  className={`flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-[12px] ${
                    n.active
                      ? "bg-royal-50 font-semibold text-royal"
                      : "text-slate"
                  }`}
                >
                  <n.icon className="size-4 shrink-0" aria-hidden />
                  <span className="truncate">{n.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/**
 * Conceptual avatar-based learning module (coded, labeled). Shows the real
 * capability Alexey emphasized: an avatar presenter combined with a slide and
 * an in-module practice question — "avatars with other formats" in one unit.
 */
export function AvatarModulePanel() {
  const { panel } = AVATAR;
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[var(--radius-media)] bg-white shadow-[var(--shadow-pop)] ring-1 ring-line"
    >
      {/* presenter + slide stage */}
      <div className="relative aspect-[16/9] bg-gradient-to-tl from-royal/25 via-navy to-navy p-3">
        {/* slide */}
        <div className="absolute inset-3 rounded-[8px] bg-white/95 p-3 shadow-sm">
          <div className="text-[12px] font-semibold text-navy">
            {panel.slideTitle}
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-11/12 rounded bg-line" />
            <div className="h-2 w-3/4 rounded bg-line" />
            <div className="h-2 w-4/5 rounded bg-line-soft" />
          </div>
          <div className="mt-3 flex gap-1.5">
            <div className="h-9 flex-1 rounded bg-royal-50" />
            <div className="h-9 flex-1 rounded bg-royal-100" />
            <div className="h-9 flex-1 rounded bg-sand-soft/70" />
          </div>
        </div>
        {/* avatar presenter, bottom-start corner */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="grid size-14 place-items-center rounded-full bg-sand ring-4 ring-white/90">
            <UserRound className="size-7 text-navy" aria-hidden />
          </span>
          <span className="rounded-[var(--radius-pill)] bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-sm">
            {panel.presenterTag}
          </span>
        </div>
        {/* play control */}
        <span className="absolute left-4 top-4 grid size-8 place-items-center rounded-full bg-white/95 text-royal shadow-sm">
          <Play className="size-4 translate-x-[1px]" aria-hidden />
        </span>
      </div>

      {/* in-module quiz */}
      <div className="p-4">
        <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-royal-50 px-2.5 py-1 text-[11px] font-semibold text-royal">
          <ClipboardCheck className="size-3.5" aria-hidden />
          {panel.quiz.tag}
        </span>
        <p className="mt-2.5 text-[14px] font-semibold text-navy">
          {panel.quiz.question}
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {panel.quiz.options.map((opt, i) => {
            const correct = i === panel.quiz.correctIndex;
            return (
              <li
                key={opt}
                className={`flex items-center justify-between gap-2 rounded-[8px] border px-3 py-2 text-[13px] ${
                  correct
                    ? "border-ok/40 bg-ok/[0.06] font-medium text-navy"
                    : "border-line bg-white text-ink-soft"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`grid size-4 place-items-center rounded-full border ${
                      correct ? "border-ok bg-ok text-white" : "border-line"
                    }`}
                  >
                    {correct ? <Check className="size-3" aria-hidden /> : null}
                  </span>
                  {opt}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Conceptual HTML learning module (coded, labeled). */
export function HtmlModulePanel() {
  const s = SURFACES.html;
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[var(--radius-media)] bg-white shadow-[var(--shadow-pop)] ring-1 ring-line"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="ms-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-slate">
          <Code2 className="size-3.5 text-royal" aria-hidden />
          HTML
        </span>
      </div>
      <div className="p-4">
        <div className="text-[13px] font-semibold text-navy">{s.unit}</div>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-2.5 w-full rounded bg-line" />
          <div className="h-2.5 w-5/6 rounded bg-line" />
          <div className="h-2.5 w-2/3 rounded bg-line-soft" />
        </div>
        {/* interactive accordion row */}
        <div className="mt-3 flex items-center justify-between rounded-[8px] border border-line bg-royal-50/50 px-3 py-2.5">
          <span className="text-[13px] font-medium text-navy">{s.accordion}</span>
          <ChevronDown className="size-4 text-royal" aria-hidden />
        </div>
        {/* media + text two-up */}
        <div className="mt-3 grid grid-cols-[1fr_1.2fr] gap-2.5">
          <div className="aspect-square rounded-[8px] bg-gradient-to-tl from-royal/20 to-royal-100" />
          <div className="space-y-1.5 pt-1">
            <div className="h-2 w-full rounded bg-line" />
            <div className="h-2 w-11/12 rounded bg-line" />
            <div className="h-2 w-3/4 rounded bg-line-soft" />
            <div className="h-2 w-4/5 rounded bg-line-soft" />
          </div>
        </div>
        {/* callout */}
        <div className="mt-3 flex items-center gap-2 rounded-[8px] bg-sand-soft/60 px-3 py-2 text-[12.5px] text-navy">
          <Lightbulb className="size-4 shrink-0 text-navy/70" aria-hidden />
          {s.callout}
        </div>
      </div>
    </div>
  );
}

/** Conceptual video player with an embedded question (coded, labeled). */
export function VideoQuizPanel() {
  const s = SURFACES.video;
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[var(--radius-media)] bg-white shadow-[var(--shadow-pop)] ring-1 ring-line"
    >
      {/* video stage */}
      <div className="relative aspect-video bg-gradient-to-tl from-royal/30 via-navy to-navy">
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-white/95 text-royal shadow-md">
            <Play className="size-5 translate-x-[1px]" aria-hidden />
          </span>
        </span>
        {/* progress bar */}
        <div className="absolute inset-x-3 bottom-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/90">
            <span className="ltr">{s.time}</span>
            <span className="relative h-1 flex-1 rounded-full bg-white/25">
              <span className="absolute inset-y-0 right-0 w-1/4 rounded-full bg-white" />
            </span>
            <span className="ltr">{s.duration}</span>
          </div>
        </div>
      </div>
      {/* embedded question */}
      <div className="p-4">
        <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-royal-50 px-2.5 py-1 text-[11px] font-semibold text-royal">
          <ClipboardCheck className="size-3.5" aria-hidden />
          שאלה משובצת
        </span>
        <p className="mt-2.5 text-[14px] font-semibold text-navy">{s.question}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {s.options.map((opt, i) => (
            <span
              key={opt}
              className={`rounded-[8px] border px-3 py-2 text-center text-[13px] ${
                i === 0
                  ? "border-royal bg-royal-50 font-medium text-royal"
                  : "border-line text-ink-soft"
              }`}
            >
              {opt}
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-start">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-royal px-4 py-1.5 text-[13px] font-semibold text-white">
            {s.cta}
          </span>
        </div>
      </div>
    </div>
  );
}
