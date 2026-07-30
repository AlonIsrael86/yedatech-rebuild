"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Man/woman presenter cutout that flanks a product card. Desktop: hover raises
 * the character and reveals a "speaking" bubble. Mobile / touch: tap toggles it.
 * Self-contained (owns its reduced-motion check) so it can drop into any
 * section. Hidden below lg — flanking only works where the layout leaves gutter
 * room; the woman/man cutouts are a mirrored pair, so neither is flipped.
 */
export function Presenter({
  img,
  alt,
  line,
  side,
  offset,
}: {
  img: string;
  alt: string;
  line: string;
  side: "left" | "right";
  /** Tailwind horizontal-offset class (e.g. "lg:-left-24"); defaults per side. */
  offset?: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const isLeft = side === "left";
  const edge = offset ?? (isLeft ? "lg:-left-10" : "lg:-right-10");
  return (
    <div className={`group absolute hidden -bottom-6 z-20 lg:block ${edge}`}>
      {/* speaking bubble — hover (desktop) or tap (mobile) */}
      <div
        className={`pointer-events-none absolute bottom-full mb-3 w-max max-w-[10.5rem] rounded-2xl bg-white px-3.5 py-2 text-[13px] font-medium leading-snug text-navy shadow-[var(--shadow-pop)] transition duration-300 ${
          isLeft ? "left-0" : "right-0"
        } ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"} group-hover:translate-y-0 group-hover:opacity-100`}
      >
        {line}
        <span
          className={`absolute top-full -mt-1.5 size-3 rotate-45 bg-white ${isLeft ? "left-6" : "right-6"}`}
        />
      </div>

      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={line} className="block">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={alt}
            width={312}
            height={652}
            draggable={false}
            className={`h-auto w-24 select-none drop-shadow-[0_12px_26px_rgba(0,6,40,0.4)] sm:w-28 lg:w-32 ${
              reduce ? "" : "transition-transform duration-300 group-hover:-translate-y-2.5"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
