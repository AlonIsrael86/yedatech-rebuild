"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { DemoForm } from "@/components/DemoForm";

type Ctx = { open: () => void; close: () => void };
const DemoFormContext = createContext<Ctx | null>(null);

export function useDemoForm(): Ctx {
  const ctx = useContext(DemoFormContext);
  if (!ctx) throw new Error("useDemoForm must be used within DemoFormProvider");
  return ctx;
}

export function DemoFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DemoFormContext.Provider value={{ open, close }}>
      {children}
      <DemoForm isOpen={isOpen} onClose={close} />
    </DemoFormContext.Provider>
  );
}
