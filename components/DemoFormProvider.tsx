"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DemoForm } from "@/components/DemoForm";
import { FloatingWidgets } from "@/components/FloatingWidgets";
import type { DemoAnswers } from "@/lib/demo";

/**
 * `open` takes an optional prefill so the inline contact section can hand its
 * five answered fields to the modal rather than making the visitor type them
 * again. Every existing caller passes nothing and behaves exactly as before.
 *
 * CALLERS MUST NOT PASS IT AS AN EVENT HANDLER DIRECTLY. `onClick={open}` hands
 * React's click event in as the first argument, which would land a MouseEvent
 * in the prefill; DemoButton wraps it in an arrow function for that reason.
 */
type Ctx = { open: (prefill?: DemoAnswers) => void; close: () => void };
const DemoFormContext = createContext<Ctx | null>(null);

const EMPTY: DemoAnswers = {};

export function useDemoForm(): Ctx {
  const ctx = useContext(DemoFormContext);
  if (!ctx) throw new Error("useDemoForm must be used within DemoFormProvider");
  return ctx;
}

export function DemoFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<DemoAnswers>(EMPTY);

  const open = useCallback((next: DemoAnswers = EMPTY) => {
    setPrefill(next);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Stable identity: `open` and `close` never change, so the context value
  // should not either — otherwise every consumer re-renders on each open.
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DemoFormContext.Provider value={value}>
      {children}
      <FloatingWidgets />
      <DemoForm isOpen={isOpen} prefill={prefill} onClose={close} />
    </DemoFormContext.Provider>
  );
}
