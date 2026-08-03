"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
 * Saved settings live in a module-level store read through useSyncExternalStore
 * rather than hydrated by an effect. getSnapshot must return a stable
 * reference, hence the cache — and the server snapshot is always DEFAULTS so
 * hydration matches. The only effect left is the one that pushes the settings
 * onto <html>, which is a genuine external-system sync.
 */
let cached: Settings | null = null;
const listeners = new Set<() => void>();

function readSettings(): Settings {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(KEY);
    cached = raw ? ({ ...DEFAULTS, ...JSON.parse(raw) } as Settings) : DEFAULTS;
  } catch {
    cached = DEFAULTS;
  }
  return cached;
}

function writeSettings(next: Settings) {
  cached = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribeSettings(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const serverSettings = () => DEFAULTS;

/**
 * Native, basic accessibility aids (text size, high contrast, highlight links,
 * readable spacing). NOT a certified IS-5568 solution — a starting aid; a full
 * compliant widget is a documented pre-launch item.
 */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const s = useSyncExternalStore(subscribeSettings, readSettings, serverSettings);
  const panelRef = useRef<HTMLDivElement>(null);

  // Push the current settings onto <html> — a real external-system sync.
  useEffect(() => {
    apply(s);
  }, [s]);

  const update = (patch: Partial<Settings>) => {
    writeSettings({ ...s, ...patch });
  };

  const reset = () => {
    writeSettings(DEFAULTS);
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
          aria-label="Accessibility settings"
          /* dir="rtl" removed — Hebrew-build leftover on an English page. */
          className="absolute bottom-14 left-0 w-64 rounded-[12px] border border-line bg-white p-3 shadow-[var(--shadow-pop)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[15px] font-bold text-navy">Accessibility</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
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
                aria-label="Increase text size"
              >
                <AArrowUp className="size-4" aria-hidden /> Larger text
              </button>
              <button
                onClick={() => update({ font: Math.max(0, s.font - 1) as 0 | 1 | 2 })}
                className={`${rowBtn} ${idle} flex-1 justify-center`}
                aria-label="Decrease text size"
              >
                <AArrowDown className="size-4" aria-hidden /> Smaller text
              </button>
            </div>

            <button
              onClick={() => update({ contrast: !s.contrast })}
              aria-pressed={s.contrast}
              className={`${rowBtn} w-full ${s.contrast ? active : idle}`}
            >
              <Contrast className="size-4" aria-hidden /> High contrast
            </button>
            <button
              onClick={() => update({ links: !s.links })}
              aria-pressed={s.links}
              className={`${rowBtn} w-full ${s.links ? active : idle}`}
            >
              <Link2 className="size-4" aria-hidden /> Highlight links
            </button>
            <button
              onClick={() => update({ spacing: !s.spacing })}
              aria-pressed={s.spacing}
              className={`${rowBtn} w-full ${s.spacing ? active : idle}`}
            >
              <AlignJustify className="size-4" aria-hidden /> Readable spacing
            </button>

            <button
              onClick={reset}
              className={`${rowBtn} w-full justify-center border-transparent text-slate hover:text-navy`}
            >
              <RotateCcw className="size-4" aria-hidden /> Reset
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] leading-snug text-slate">
            Basic accessibility tools. A full accessibility statement will follow.
          </p>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open accessibility menu"
        className="grid size-12 place-items-center rounded-full bg-royal text-white shadow-[var(--shadow-float)] transition-colors hover:bg-royal-600"
      >
        <Accessibility className="size-6" aria-hidden />
      </button>
    </div>
  );
}
