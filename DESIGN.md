# DESIGN.md — Yedatech.io homepage

## Visual concept

A confident, editorial B2B education-technology homepage: **deep-navy authority**
paired with **one decisive royal blue**, warm sand accents for the human/AI
touch, and a restrained red reserved for emphasis. The page is built around the
product itself — the LMS is *shown*, not described with decorative stock art.

Intended brand impression: a serious, modern platform partner that colleges,
organizations, and course creators can trust with their entire learning
operation — "one coherent platform," not a bundle of legacy products.

## Relationship to the Figma

The visual language starts from Alexey's 2024 Figma (file
`wOn70IJSQEuBjf342BYmmR`, frames `199:14942` desktop / `282:4603` mobile) and is
modernized, not copied. Extracted directly from the file and carried forward:

- **Palette** (pulled from the Figma fill styles): navy `#000f61`, royal
  `#0a59eb`, red `#d01e25`, sand `#ffe1b9`, lavender wash `#e8eaf5`, slate
  `#8b8ea4` (darkened to `#6a6f85` here for AA contrast on white).
- **Typeface**: Rubik — confirmed as the Figma type family.
- **Signature motif**: real/coded product UI inside cards, floating "module"
  cards (video, dashboard, price, AI course-builder), and the numbered feature
  rhythm.

What was elevated: tighter type hierarchy, a single coherent section system with
purposeful whitespace (not the Figma's large empty areas), a coded conceptual
LMS dashboard rather than flat screenshots, and disciplined 8px card radii.

## Audience & hierarchy decisions

First viewport states the literal offer in one sentence and shows the product.
Order below it moves from *what it is* → *who it's for* → *how it works as one
system* → *seeing the product* → *how content gets produced* → *how engagement
works* → *the Yeda family* → *convert*. Four audiences (institutions, HR/L&D,
organizations/creators, independent educators) each get a compact card so every
visitor self-identifies without the hero becoming a feature list.

## Color, type, spacing, imagery, motion

- **Color**: tokens in `app/globals.css` (`@theme`). Navy grounds hero +
  production; white and `--color-canvas` (#f6f7fc) alternate to segment the page;
  royal drives every primary action and the final CTA band.
- **Type**: Rubik 300–700, vendored locally (Hebrew + Latin variable woff2) so
  the build never fetches at runtime and Hebrew never falls back. Fluid sizes,
  balanced headings, generous line-height for Hebrew.
- **Spacing**: 1200px max container; section rhythm ~64–96px vertical.
- **Imagery**: the product is drawn in code (conceptual LMS dashboard with KPI
  tiles + donut, recreated from the Figma product frame) and clearly labeled
  "המחשה של ממשק המערכת". No decorative stock photography was used in this
  checkpoint (see "unfinished").
- **Motion**: one restrained rise+fade on scroll (`components/Reveal.tsx`,
  Framer Motion), fully disabled under `prefers-reduced-motion`.

## RTL

Genuinely RTL: `<html dir="rtl" lang="he">`, logical layout throughout, the
forward CTA arrow points left, and Latin runs (brand name, email, phone) are
isolated with a `.ltr` utility so they render correctly inside Hebrew text.

## References studied

- **The Figma** — primary source for palette, type, and the product-card motif.
- **yedatech.io (live)** — verified capabilities, product names, contact details.
- **dscope.ai** — polish/confidence benchmark only (not layout or palette).

## What was kept original

The section system, the coded LMS dashboard component, the hero composition, the
numbered-process treatment, and the token system are all original work built for
this rebuild. The Figma provided the graphic language; the implementation and
structure are new.

## Assets

- **Wordmark**: the real `yeda` logotype, extracted from the Figma (node
  `199:15118`) as a single monochrome path and recolored via `currentColor`
  (`components/Brand.tsx` + `public/brand/yeda-logo.svg`) — navy on light
  grounds, white on dark.

## Assets to add before launch

- **Photography**: the hero/production sections are intentionally product-led;
  real Yeda studio/course photography can be added where it reveals the service.
