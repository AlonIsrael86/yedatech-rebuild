"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { DEMO_FORM, CONTACT } from "@/content/site";
import { Wordmark } from "@/components/Brand";

const STEPS = DEMO_FORM.steps;
const UI = DEMO_FORM.ui;

type Answers = {
  role?: string;
  interest?: string;
  name?: string;
  email?: string;
  phone?: string;
  note?: string;
};

function buildMailto(a: Answers): string {
  const lines = [
    `עיסוק: ${a.role ?? ""}`,
    `תחום עניין: ${a.interest ?? ""}`,
    `שם: ${a.name ?? ""}`,
    `אימייל: ${a.email ?? ""}`,
    `טלפון: ${a.phone ?? ""}`,
    a.note ? `הודעה: ${a.note}` : "",
  ].filter(Boolean);
  const params = new URLSearchParams({
    subject: DEMO_FORM.mailSubject,
    body: lines.join("\n"),
  });
  return `mailto:${CONTACT.email}?${params.toString()}`;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function DemoForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const total = STEPS.length;
  const current = STEPS[step];

  // Reset to a clean state whenever the dialog is (re)opened.
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setAnswers({});
      setSubmitted(false);
      setShowErrors(false);
    }
  }, [isOpen]);

  // Body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Esc to close + focus the dialog on open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const stepValid = useMemo(() => {
    if (current.type === "single") {
      return current.key === "role" ? !!answers.role : !!answers.interest;
    }
    // contact step
    return !!answers.name?.trim() && !!answers.email && emailOk(answers.email);
  }, [current, answers]);

  const isLast = step === total - 1;

  function next() {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (isLast) {
      // open the prefilled mail draft, then show the success state
      window.location.href = buildMailto(answers);
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }
  function prev() {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  const pick = (key: "role" | "interest", value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={reduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? {} : { opacity: 0 }}
        >
          {/* backdrop */}
          <button
            aria-label={UI.close}
            onClick={onClose}
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-form-title"
            tabIndex={-1}
            dir="rtl"
            className="relative z-10 flex max-h-[92vh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-[var(--shadow-pop)] outline-none sm:rounded-3xl"
            initial={reduce ? {} : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? {} : { y: 24, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* header */}
            <div className="relative bg-royal px-6 pb-5 pt-6 text-white">
              <button
                onClick={onClose}
                aria-label={UI.close}
                className="absolute end-4 top-4 grid size-8 place-items-center rounded-full text-white/90 hover:bg-white/15"
              >
                <X className="size-5" aria-hidden />
              </button>
              <Wordmark className="h-7 w-auto text-white" />
              {!submitted ? (
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-white/90">
                  {DEMO_FORM.intro}
                </p>
              ) : null}
            </div>

            {/* body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              {submitted ? (
                <div className="py-6 text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-ok/10 text-ok">
                    <Check className="size-7" aria-hidden />
                  </span>
                  <h2
                    id="demo-form-title"
                    className="mt-4 text-xl font-bold text-navy"
                  >
                    {DEMO_FORM.success.title}
                  </h2>
                  <p className="mx-auto mt-2 max-w-[36ch] text-[15px] leading-relaxed text-slate">
                    {DEMO_FORM.success.body}
                  </p>
                </div>
              ) : (
                <>
                  <h2
                    id="demo-form-title"
                    className="text-lg font-bold text-navy"
                  >
                    {current.title}
                  </h2>

                  {current.type === "single" ? (
                    <div
                      role="radiogroup"
                      aria-label={current.title}
                      className="mt-4 space-y-2.5"
                    >
                      {current.options.map((opt) => {
                        const key = current.key as "role" | "interest";
                        const checked = answers[key] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            onClick={() => pick(key, opt)}
                            className={`flex w-full items-center justify-between gap-3 rounded-[8px] border px-4 py-3 text-start text-[15px] transition-colors ${
                              checked
                                ? "border-royal bg-royal-50 font-medium text-navy"
                                : "border-line bg-white text-ink-soft hover:border-royal/40 hover:bg-royal-50/40"
                            }`}
                          >
                            {opt}
                            <span
                              className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                                checked
                                  ? "border-royal bg-royal text-white"
                                  : "border-line"
                              }`}
                            >
                              {checked ? <Check className="size-3" aria-hidden /> : null}
                            </span>
                          </button>
                        );
                      })}
                      {showErrors && !stepValid ? (
                        <p className="pt-1 text-[13px] text-error">{UI.pickOne}</p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3.5">
                      {current.fields.map((f) => {
                        const val = (answers[f.name as keyof Answers] as string) ?? "";
                        const emailBad =
                          f.name === "email" && showErrors && val !== "" && !emailOk(val);
                        const missing =
                          showErrors && f.required && !val.trim();
                        return (
                          <label key={f.name} className="block">
                            <span className="mb-1 block text-[13px] font-medium text-ink-soft">
                              {f.label}
                              {f.required ? (
                                <span className="text-error"> *</span>
                              ) : null}
                            </span>
                            {f.inputType === "textarea" ? (
                              <textarea
                                value={val}
                                dir="rtl"
                                rows={3}
                                onChange={(e) =>
                                  setAnswers((a) => ({ ...a, [f.name]: e.target.value }))
                                }
                                className="w-full resize-none rounded-[8px] border border-line bg-white px-3 py-2.5 text-[15px] text-navy outline-none focus:border-royal"
                              />
                            ) : (
                              <input
                                type={f.inputType}
                                value={val}
                                dir={f.inputType === "email" || f.inputType === "tel" ? "ltr" : "rtl"}
                                onChange={(e) =>
                                  setAnswers((a) => ({ ...a, [f.name]: e.target.value }))
                                }
                                className={`w-full rounded-[8px] border bg-white px-3 py-2.5 text-[15px] text-navy outline-none focus:border-royal ${
                                  emailBad || missing ? "border-error" : "border-line"
                                }`}
                              />
                            )}
                            {missing ? (
                              <span className="mt-1 block text-[12px] text-error">
                                {UI.required}
                              </span>
                            ) : emailBad ? (
                              <span className="mt-1 block text-[12px] text-error">
                                {UI.invalidEmail}
                              </span>
                            ) : null}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* footer / controls */}
            {!submitted ? (
              <div className="border-t border-line px-6 py-4">
                {/* progress */}
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-[12px] font-medium text-slate">
                    {UI.stepLabel(step + 1, total)}
                  </span>
                  <div className="flex flex-1 gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i <= step ? "bg-royal" : "bg-line"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-royal px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-royal-600"
                  >
                    {isLast ? UI.submit : UI.next}
                    {!isLast ? <ArrowLeft className="size-[18px]" aria-hidden /> : null}
                  </button>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] px-4 py-2.5 text-[15px] font-medium text-slate hover:text-navy"
                    >
                      <ArrowRight className="size-[18px]" aria-hidden />
                      {UI.prev}
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="border-t border-line px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center rounded-[var(--radius-pill)] bg-royal px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-royal-600"
                >
                  {UI.close}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
