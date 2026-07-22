# PROCESS.md — Yedatech.io homepage checkpoint

## Tools & models

- **Claude Code** (agentic CLI) driving the whole build — file authoring,
  Figma extraction, build/verify loop.
- **Model**: Claude (Fable-class) as the primary coding/design model; used with
  sub-task delegation for research vs. implementation.
- **Figma REST API** (`api.figma.com/v1`) with a read-only personal-access token
  to extract the palette, type styles, section structure, and section renders
  from Alexey's file — chosen over an MCP server for a zero-setup, reliable
  extraction in this environment.
- **Framework**: Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind
  CSS v4 (`@theme` tokens).
- **UI libraries**: `lucide-react` (icons), `framer-motion` (restrained reveals).
- **Fonts**: Rubik variable woff2 (Hebrew + Latin) vendored from Google Fonts
  into `app/fonts/` and served via `next/font/local`.
- **Verification**: Playwright + Chromium (headless) for multi-width screenshots,
  horizontal-overflow measurement, and console-error capture.

## What each part did

- Figma REST API → ground-truth palette (`#000f61`, `#0a59eb`, `#d01e25`,
  `#ffe1b9`, `#e8eaf5`), Rubik confirmation, and the LMS-dashboard product frame
  that the coded `ProductVisual` recreates.
- Claude Code → all component code, Hebrew content curation, token system, RTL
  layout, and the build/screenshot verification loop.

## AI-generated vs. manual

- **AI-generated**: component implementation, the token system, and a first draft
  of the Hebrew copy (derived strictly from verified yedatech.io content + the
  HANDOFF business context).
- **Reviewed/curated by hand**: every visible Hebrew sentence was read for
  meaning and RTL correctness; all claims were constrained to verified
  capabilities (no invented metrics, testimonials, logos, pricing, or features);
  contact details kept exact (`Info@Yedatech.io`, `074-769-1066`).
- **No image generation** was used in this checkpoint — the product is drawn in
  code and clearly labeled as an illustration.

## Image sources

Photos in the numbered feature blocks were extracted from **Alexey's Figma**
(file `wOn70IJSQEuBjf342BYmmR`) via the Figma REST `/v1/images` endpoint and
committed to `public/media/`:

- `professional-laptop.png` — Figma node `199:15074`
- `training-room.png` — Figma node `199:15236`
- `learning.png` (transparent cutout) — Figma node `199:15497`

These are the design's own assets (the HANDOFF authorizes downloading approved
Figma assets into the repo). **Licensing note:** some may be licensed stock the
client purchased — final license confirmation with Yeda is a pre-launch item.

## Content sourcing

All copy traces to the live site (yedatech.io) and the HANDOFF business context.
Real capabilities emphasized per Alexey's correction: LMS/LCMS, **HTML learning
modules**, **avatar-based modules**, blended learning, interactive tests,
college/organization management, and course production (Yeda Labs). Presentation-
creation is intentionally *not* a headline capability.

## Time by phase (matches Apploye)

- Phase 0 — Figma extraction + direction lock (palette, type, structure): ~0:25
- Phase 1 — scaffold, RTL layout, vendored fonts, `content/site.ts`: ~0:20
- Phase 2 — all homepage sections + coded product dashboard: ~1:15
- Phase 3 — responsive/RTL/a11y verification (4 widths): ~0:15
- Phase 4 — docs, deploy, screenshots, push: ~0:20

## Verification results

- Horizontal overflow at **1440 / 768 / 390 / 360** = **0px** at every width.
- **Zero** browser console errors.
- Production build compiles clean (TypeScript strict).

## Interactions added (this checkpoint)

- **Demo-request form**: native multi-step wizard (role → interest → contact),
  opened from the header/hero/final CTAs. No backend — submit opens a prefilled
  `mailto:Info@Yedatech.io`, so nothing is silently captured.
- **Floating widgets**: TikTok + WhatsApp buttons and a native accessibility
  menu. **Social links are placeholders (`href="#"`)** — real destinations are
  pending (see below); nothing points at a fabricated account.
- **Accessibility menu**: native basic aids (text size, high contrast, highlight
  links, readable spacing) persisted in `localStorage`. This is **not** a
  certified IS-5568 solution — a starting aid only.

## Accessibility hardening (WCAG 2.1 AA-oriented)

Informed by a verified research pass on IS-5568 (Israeli law = WCAG 2.0 AA;
2.1 AA targeted as best practice). Homepage-scoped, verified, no content changes:
skip-to-content link, `<main id>` landmark, a `<nav aria-label>` on the mobile
menu, semantic heading order (h1→h2→h3, audited: no skipped levels), accessible
names on all icon-only controls, and a contrast pass. Audited with Playwright:
0 images without alt, 0 controls without an accessible name, no heading gaps,
first-Tab focus reaches the skip link. **Not yet compliant:** a full Hebrew
accessibility statement + coordinator and a certified widget remain pre-launch
legal items.

## Known unfinished / next 3–7 hours

- **Real TikTok/WhatsApp links** for the floating buttons (placeholders now).
- **Certified accessibility solution** (IS-5568 / תקן 5568) + accessibility
  statement — legal requirement before launch.
- Real photography where it reveals the service.
- Content review pass with Yeda on exact product-family scope wording.
- Wire the demo form to a real CRM/endpoint when one is available.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
# production check:
npm run build && npm start
```

## Deployment

Public preview deployed with the Vercel CLI (`npx vercel`) from this repo under
the builder's own Vercel account. No GitHub↔Vercel integration was connected and
no production domain/DNS was touched. Preview URL is in the checkpoint note.
