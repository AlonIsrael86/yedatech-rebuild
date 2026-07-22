"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  X,
  AArrowUp,
  AArrowDown,
  Contrast,
  Link2,
  AlignJustify,
  RotateCcw,
} from "lucide-react";

type Settings = {
  font: 0 | 1 | 2;
  contrast: boolean;
  links: boolean;
  spacing: boolean;
};
const DEFAULTS: Settings = { font: 0, contrast: false, links: false, spacing: false };
const KEY = "yeda-a11y";

function apply(s: Settings) {
  const el = document.documentElement;
  if (s.font > 0) el.setAttribute("data-a11y-font", String(s.font));
  else el.removeAttribute("data-a11y-font");
  el.toggleAttribute("data-a11y-contrast", s.contrast);
  el.toggleAttribute("data-a11y-links", s.links);
  el.toggleAttribute("data-a11y-spacing", s.spacing);
}

/**
 * Native, basic accessibility aids (text size, high contrast, highlight links,
 * readable spacing). NOT a certified IS-5568 solution — a starting aid; a full
 * compliant widget is a documented pre-launch item.
 */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<Settings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load saved settings on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setS(parsed);
        apply(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const update = (patch: Partial<Settings>) => {
    setS((prev) => {
      const next = { ...prev, ...patch };
      apply(next);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const reset = () => {
    setS(DEFAULTS);
    apply(DEFAULTS);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  };

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const rowBtn =
    "flex items-center gap-2.5 rounded-[8px] border px-3 py-2.5 text-[15px] font-medium transition-colors";
  const active = "border-royal bg-royal-50 text-royal";
  const idle = "border-line bg-white text-ink-soft hover:bg-royal-50/50";

  return (
    <div className="relative">
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="הגדרות נגישות"
          dir="rtl"
          className="absolute bottom-14 left-0 w-64 rounded-[12px] border border-line bg-white p-3 shadow-[var(--shadow-pop)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[15px] font-bold text-navy">נגישות</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגירה"
              className="grid size-7 place-items-center rounded-full text-slate hover:bg-line-soft"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="space-y-2">
            {/* text size */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => update({ font: Math.min(2, s.font + 1) as 0 | 1 | 2 })}
                className={`${rowBtn} ${idle} flex-1 justify-center`}
                aria-label="הגדלת טקסט"
              >
                <AArrowUp className="size-4" aria-hidden /> טקסט גדול
              </button>
              <button
                onClick={() => update({ font: Math.max(0, s.font - 1) as 0 | 1 | 2 })}
                className={`${rowBtn} ${idle} flex-1 justify-center`}
                aria-label="הקטנת טקסט"
              >
                <AArrowDown className="size-4" aria-hidden /> טקסט קטן
              </button>
            </div>

            <button
              onClick={() => update({ contrast: !s.contrast })}
              aria-pressed={s.contrast}
              className={`${rowBtn} w-full ${s.contrast ? active : idle}`}
            >
              <Contrast className="size-4" aria-hidden /> ניגודיות גבוהה
            </button>
            <button
              onClick={() => update({ links: !s.links })}
              aria-pressed={s.links}
              className={`${rowBtn} w-full ${s.links ? active : idle}`}
            >
              <Link2 className="size-4" aria-hidden /> הדגשת קישורים
            </button>
            <button
              onClick={() => update({ spacing: !s.spacing })}
              aria-pressed={s.spacing}
              className={`${rowBtn} w-full ${s.spacing ? active : idle}`}
            >
              <AlignJustify className="size-4" aria-hidden /> מרווח קריא
            </button>

            <button
              onClick={reset}
              className={`${rowBtn} w-full justify-center border-transparent text-slate hover:text-navy`}
            >
              <RotateCcw className="size-4" aria-hidden /> איפוס
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] leading-snug text-slate">
            כלי נגישות בסיסי. הצהרת נגישות מלאה תתווסף בהמשך.
          </p>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="פתיחת תפריט נגישות"
        className="grid size-12 place-items-center rounded-full bg-royal text-white shadow-[var(--shadow-float)] transition-colors hover:bg-royal-600"
      >
        <Accessibility className="size-6" aria-hidden />
      </button>
    </div>
  );
}
