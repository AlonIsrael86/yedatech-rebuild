"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useDemoForm } from "@/components/DemoFormProvider";

// Mirrors the visual variants of `ui.tsx` Button, but opens the demo dialog
// instead of navigating.
export function DemoButton({
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  withArrow?: boolean;
}) {
  const { open } = useDemoForm();
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 text-[16px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles = {
    primary: "bg-royal text-white shadow-[var(--shadow-float)] hover:bg-royal-600",
    secondary: "bg-white text-navy ring-1 ring-inset ring-line hover:bg-royal-50",
  }[variant];
  return (
    <button type="button" onClick={open} className={`${base} ${styles} ${className}`}>
      {children}
      {withArrow ? <ArrowLeft className="size-[18px]" aria-hidden /> : null}
    </button>
  );
}
