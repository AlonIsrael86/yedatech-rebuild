/**
 * Shared between the inline contact section and the modal wizard.
 *
 * These two lived inside DemoForm.tsx while the modal was the only way to ask
 * for a demo. ContactSection now collects the same answers on the page and
 * hands them to the modal, so a second copy of the shape or of the email rule
 * would be two things to keep in step — and the one that drifted would be the
 * validation, silently.
 */
export type DemoAnswers = {
  role?: string;
  interest?: string;
  name?: string;
  email?: string;
  phone?: string;
  note?: string;
};

export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/**
 * Where the modal should open, given what the page already collected.
 *
 * The point of the handoff is that nobody answers the same question twice: a
 * fully filled inline form lands on the contact step with everything in place,
 * so it is one review and Send. A partly filled one lands on the first question
 * still outstanding, and an empty `open()` from any DemoButton lands on step 0
 * exactly as before.
 */
export function firstIncompleteStep(a: DemoAnswers): number {
  if (!a.role) return 0;
  if (!a.interest) return 1;
  return 2;
}
