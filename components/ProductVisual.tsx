import {
  LayoutDashboard,
  FolderTree,
  PlaySquare,
  Award,
  Settings,
  ClipboardCheck,
} from "lucide-react";
import { PRODUCT } from "@/content/site";
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
        <Wordmark className="text-royal" />
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
