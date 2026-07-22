"use client";

import { AccessibilityMenu } from "@/components/AccessibilityMenu";

// Brand glyphs as inline SVGs (monochrome, currentColor). The social links are
// PLACEHOLDERS (href="#") — real TikTok/WhatsApp destinations are pending and
// tracked as a pre-launch item; nothing here points at a fabricated account.
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.6c-1.3.1-2.5-.3-3.5-1v6.1c0 3.4-2.6 5.9-5.9 5.9C7.4 20.5 5 18 5 14.9c0-3 2.3-5.5 5.3-5.6v2.7c-.3.1-.6.2-.9.4-1.2.6-1.8 2-1.4 3.3.3 1.2 1.5 2 2.7 1.8 1.2-.2 2-1.2 2-2.5V3h2.8z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5 0-.7-.3-1.4-.6-2-1.3-.5-.5-.8-1-.9-1.2-.1-.2 0-.4.1-.5l.4-.4c.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z" />
    </svg>
  );
}

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-center gap-2.5 print:hidden">
      {/* Social — placeholder destinations (#) until real links are provided */}
      <a
        href="#"
        aria-label="TikTok (בקרוב)"
        className="grid size-11 place-items-center rounded-full bg-navy text-white shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
      >
        <TikTokIcon className="size-5" />
      </a>
      <a
        href="#"
        aria-label="WhatsApp (בקרוב)"
        className="grid size-11 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="size-6" />
      </a>
      <AccessibilityMenu />
    </div>
  );
}
