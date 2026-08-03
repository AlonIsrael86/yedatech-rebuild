"use client";

import { useId, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Brand";
import { useDemoForm } from "@/components/DemoFormProvider";
import { emailOk } from "@/lib/demo";
import {
  DEMO_FORM,
  FINAL_CTA,
  FINAL_CTA_BY_SECTOR,
  HERO_CTA,
  CONTACT,
} from "@/content/site";
import type { Sector } from "@/content/routes";

/**
 * Design "Home page 1.4" §6 — the contact form inline on the page, on navy,
 * behind a giant `ye`. It closes the homepage where `FinalCta` used to; the 21
 * inner pages still end on `FinalCta`, which no design gives a form.
 *
 * WHERE IT SENDS. Nowhere, by itself. There is no backend and the repo is
 * public, so no key can be committed; Victor chose to have the page collect the
 * answers and hand them to the existing modal rather than stand up a second
 * submit path. Pressing the button opens the wizard already filled in and
 * already advanced past the questions it can answer, so the visitor confirms
 * once instead of retyping. The mailto is still built in exactly one place.
 *
 * That is also why the button says "Book a demo" and not "Send". It does not
 * send anything — labelling it Send would be a small lie told at the last step
 * of the funnel.
 *
 * EVERY STRING IS EXISTING COPY. The five fields are the design's five, and
 * both selects are driven by the same option arrays the modal renders — if they
 * ever diverge the handed-over value stops matching a radio and silently
 * arrives unselected.
 */

const ROLE_STEP = DEMO_FORM.steps[0];
const INTEREST_STEP = DEMO_FORM.steps[1];
const [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD] = DEMO_FORM.steps[2].fields;
const UI = DEMO_FORM.ui;

const FIELD =
  "w-full rounded-[8px] border bg-white/10 px-3 py-2.5 text-[16px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/60";

function Label({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[14px] font-medium text-white/80"
    >
      {children}
      {required ? <span className="text-err-soft"> *</span> : null}
    </label>
  );
}

export function ContactSection({ sector }: { sector: Sector }) {
  const { open } = useDemoForm();
  const uid = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [interest, setInterest] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const nameMissing = !name.trim();
  const emailMissing = !email.trim();
  const emailInvalid = !emailMissing && !emailOk(email);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (nameMissing || emailMissing || emailInvalid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    /* Only non-empty values go over. An empty string for `role` would read as
       answered and skip the modal past a question nobody has answered. */
    open({
      name: name.trim(),
      email: email.trim(),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      ...(role ? { role } : {}),
      ...(interest ? { interest } : {}),
    });
  }

  const id = (part: string) => `${uid}-${part}`;

  return (
    <section id={`contact-${sector}`} className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative">
            {/* Same sky wash and royal glow FinalCta closes on, so swapping the
                panel's contents does not change the page's visual language. */}
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[40px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(196,216,253,0.55), transparent 76%)",
              }}
            />
            <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-navy px-6 py-14 text-white shadow-[var(--shadow-hero)] sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(680px 340px at 78% -24%, rgba(10,89,235,0.65), transparent 62%)",
                }}
              />

              {/* The design's giant `ye`. It is the real logotype blown up and
                  cropped by the panel's overflow, not two letters set in some
                  other face — the wordmark is the only correct drawing of those
                  shapes we have.

                  aria-hidden on the wrapper, because Wordmark carries its own
                  role="img" and label; hiding an ancestor takes the whole
                  subtree out of the accessibility tree. */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 -left-[5%] w-[200%] -translate-y-1/2 text-white/[0.06]"
              >
                <Wordmark className="h-auto w-full" />
              </div>

              <div className="relative mx-auto max-w-2xl">
                <div className="text-center">
                  <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
                    {FINAL_CTA.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
                    {FINAL_CTA_BY_SECTOR[sector].subtitle}
                  </p>
                </div>

                <form onSubmit={submit} noValidate className="mt-10 text-start">
                  <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={id("name")} required>
                        {NAME_FIELD.label}
                      </Label>
                      <input
                        id={id("name")}
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={showErrors && nameMissing}
                        className={`${FIELD} ${
                          showErrors && nameMissing
                            ? "border-err-soft"
                            : "border-white/20"
                        }`}
                      />
                      {showErrors && nameMissing ? (
                        <span className="mt-1 block text-[13px] text-err-soft">
                          {UI.required}
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <Label htmlFor={id("email")} required>
                        {EMAIL_FIELD.label}
                      </Label>
                      <input
                        id={id("email")}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={showErrors && (emailMissing || emailInvalid)}
                        className={`${FIELD} ${
                          showErrors && (emailMissing || emailInvalid)
                            ? "border-err-soft"
                            : "border-white/20"
                        }`}
                      />
                      {showErrors && emailMissing ? (
                        <span className="mt-1 block text-[13px] text-err-soft">
                          {UI.required}
                        </span>
                      ) : showErrors && emailInvalid ? (
                        <span className="mt-1 block text-[13px] text-err-soft">
                          {UI.invalidEmail}
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <Label htmlFor={id("phone")}>{PHONE_FIELD.label}</Label>
                      <input
                        id={id("phone")}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`${FIELD} border-white/20`}
                      />
                    </div>

                    {/* Both selects carry explicit option colours. A select
                        styled dark inherits nothing useful for its popup, and
                        the list renders white-on-white in Chrome without
                        this. */}
                    <div>
                      <Label htmlFor={id("role")}>{ROLE_STEP.title}</Label>
                      <select
                        id={id("role")}
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`${FIELD} border-white/20 [&>option]:bg-white [&>option]:text-navy`}
                      >
                        <option value="">{UI.selectPlaceholder}</option>
                        {ROLE_STEP.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor={id("interest")}>
                        {INTEREST_STEP.title}
                      </Label>
                      <select
                        id={id("interest")}
                        name="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className={`${FIELD} border-white/20 [&>option]:bg-white [&>option]:text-navy`}
                      >
                        <option value="">{UI.selectPlaceholder}</option>
                        {INTEREST_STEP.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-white px-6 py-3 text-[16px] font-semibold text-royal transition-colors hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {HERO_CTA.primary}
                    </button>
                  </div>
                </form>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] text-white/80">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Mail className="size-4" aria-hidden />
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="size-4" aria-hidden />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
