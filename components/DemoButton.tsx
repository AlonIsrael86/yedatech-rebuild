"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useDemoForm } from "@/components/DemoFormProvider";

/**
 * Mirrors the visual variants of `ui.tsx` Button, but opens the demo dialog
 * instead of navigating.
 *
 * `size="sm"` exists for the sticky header, where the full-size CTA read as an
 * oversized blob against a 64px bar.
 */
export function DemoButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  withArrow?: boolean;
}) {
  const { open } = useDemoForm();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";
  const sizes = {
    sm: "px-4 py-2 text-[14px]",
    md: "px-6 py-3 text-[16px]",
  }[size];
  const styles = {
    primary:
      "bg-royal text-white shadow-[0_8px_24px_rgba(10,89,235,0.35)] hover:bg-royal-600 hover:shadow-[0_14px_30px_-12px_rgba(10,89,235,0.5)]",
    secondary:
      "bg-white text-navy ring-1 ring-inset ring-line hover:bg-royal-50 hover:ring-royal-100",
  }[variant];

  return (
    <button
      type="button"
      onClick={open}
      className={`${base} ${sizes} ${styles} ${className}`}
    >
      {children}
      {/* LTR: forward is rightward. This rendered ArrowLeft until now — an
          RTL leftover that pointed the CTA backwards. */}
      {withArrow ? (
        <ArrowRight className={size === "sm" ? "size-4" : "size-[18px]"} aria-hidden />
      ) : null}
    </button>
  );
}
