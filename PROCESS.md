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

## Known unfinished / next 3–7 hours

- Real photography and the official `yeda` logo SVG (currently product-led +
  styled wordmark).
- A working demo-request form (currently the CTA links to phone/email).
- Second product panel (avatar-module interactive preview) and micro-interactions.
- Content review pass with Yeda on exact product-family scope wording.
- Accessibility deepening (full keyboard audit, aria on the dashboard figure).

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
