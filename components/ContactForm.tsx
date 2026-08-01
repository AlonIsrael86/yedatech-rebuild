"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CONTACT_FORM, CONTACT } from "@/content/site";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputBase =
  "w-full rounded-[var(--radius-card)] border bg-white px-4 py-3 text-[15px] text-navy placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-royal/30";

/**
 * Bottom contact form — replaces the FinalCta band (keeps id="contact"). Adapted
 * from the Yeda Figma contact section. Hand-rolled validation (name + email),
 * mirroring DemoForm. UI-only this checkpoint: submit validates then shows a
 * success state — no transport yet. TODO: wire an API route / email service.
 */
export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", phone: "", role: "", interest: "" });
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);
  const set =
    (k: keyof typeof v) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setV((s) => ({ ...s, [k]: e.target.value }));

  const nameErr = v.name.trim() === "";
  const emailErr = !emailRe.test(v.email);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (nameErr || emailErr) {
      setShowErrors(true);
      return;
    }
    // TODO: wire real delivery (API route / email service). UI-only for now.
    setSent(true);
  }

  return (
    <section id="contact" className="bg-royal-50 py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl">
            {/* copy + form */}
            <div>
              <h2 className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {CONTACT_FORM.title}
              </h2>
              <p className="mt-2 text-lg leading-relaxed text-slate">{CONTACT_FORM.subtitle}</p>

              {sent ? (
                <div className="mt-8 rounded-[var(--radius-media)] border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-royal-50 text-royal">
                    <Check className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-navy">{CONTACT_FORM.success.title}</h3>
                  <p className="mt-2 text-slate">{CONTACT_FORM.success.body}</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[14px] font-medium text-ink-soft">
                        {CONTACT_FORM.fields.name}
                      </span>
                      <input
                        type="text"
                        value={v.name}
                        onChange={set("name")}
                        aria-invalid={showErrors && nameErr}
                        className={`${inputBase} ${showErrors && nameErr ? "border-err" : "border-line"}`}
                        placeholder={CONTACT_FORM.fields.name}
                      />
                      {showErrors && nameErr && (
                        <span className="mt-1 block text-[13px] text-err">{CONTACT_FORM.required}</span>
                      )}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-[14px] font-medium text-ink-soft">
                        {CONTACT_FORM.fields.email}
                      </span>
                      <input
                        type="email"
                        value={v.email}
                        onChange={set("email")}
                        aria-invalid={showErrors && emailErr}
                        className={`${inputBase} ${showErrors && emailErr ? "border-err" : "border-line"}`}
                        placeholder="you@company.com"
                      />
                      {showErrors && emailErr && (
                        <span className="mt-1 block text-[13px] text-err">{CONTACT_FORM.invalidEmail}</span>
                      )}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-[14px] font-medium text-ink-soft">
                        {CONTACT_FORM.fields.phone}
                      </span>
                      <input
                        type="tel"
                        value={v.phone}
                        onChange={set("phone")}
                        className={`${inputBase} border-line`}
                        placeholder={CONTACT_FORM.fields.phone}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-[14px] font-medium text-ink-soft">
                        {CONTACT_FORM.fields.role}
                      </span>
                      <select value={v.role} onChange={set("role")} className={`${inputBase} border-line`}>
                        <option value="">—</option>
                        {CONTACT_FORM.roleOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-[14px] font-medium text-ink-soft">
                      {CONTACT_FORM.fields.interest}
                    </span>
                    <select value={v.interest} onChange={set("interest")} className={`${inputBase} border-line`}>
                      <option value="">—</option>
                      {CONTACT_FORM.interestOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-royal px-6 py-3 text-[16px] font-semibold text-white shadow-[var(--shadow-float)] transition-colors hover:bg-royal-600"
                    >
                      {CONTACT_FORM.submit}
                      <ArrowRight className="size-[18px]" aria-hidden />
                    </button>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-slate">
                      <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-royal">
                        <Mail className="size-4" aria-hidden />
                        <span className="ltr">{CONTACT.email}</span>
                      </a>
                      <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1.5 hover:text-royal">
                        <Phone className="size-4" aria-hidden />
                        <span className="ltr">{CONTACT.phone}</span>
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
