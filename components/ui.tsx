import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Eyebrow / section kicker. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[13px] font-semibold tracking-[0.02em] text-royal">
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
};

// RTL note: the arrow points left (ArrowLeft) — the forward direction in Hebrew.
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles = {
    primary: "bg-royal text-white shadow-[var(--shadow-float)] hover:bg-royal-600",
    secondary:
      "bg-white text-navy ring-1 ring-inset ring-line hover:bg-royal-50",
    ghost: "text-navy hover:text-royal",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {withArrow ? <ArrowLeft className="size-[18px]" aria-hidden /> : null}
    </Link>
  );
}
