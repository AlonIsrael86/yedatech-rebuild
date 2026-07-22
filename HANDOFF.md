# Victor Handoff - Yedatech.io Rebuild

## Assignment

Rebuild the Yedatech.io website from zero as a modern, visually exceptional Hebrew B2B education-technology experience. The existing site is old and no longer represents the quality, sophistication, or scale of the company.

The first checkpoint is real project work, not a disposable mockup. However, it is intentionally capped at three hours so Alon can review the visual direction, frontend execution, and working process before authorizing more time.

## Time Boundary

- Initial authorization: three hours maximum.
- Track all work in Apploye project `Yedatech.io Rebuild - Victor` from the moment work begins.
- Stop when Apploye reaches three hours, even if the page is incomplete.
- Push the current state and submit the checkpoint package. Do not continue until Alon explicitly authorizes more hours.
- Do not begin before the explicit start message and do not continue after the three-hour checkpoint without written authorization.

## Access And Ownership

- GitHub owner: `AlonIsrael86`.
- Repository: `https://github.com/AlonIsrael86/yedatech-rebuild`.
- Work directly on `main` for this initial from-zero phase. A branch and pull-request workflow can be introduced after the foundation is accepted.
- Victor has full repository access for this project.
- uPress access is supplied only so Victor can inspect the current WordPress site, content, media, and configuration.
- Do not edit the live WordPress site, install or remove plugins, change Elementor pages, alter DNS, touch forms, or deploy the rebuild during this checkpoint.
- Never place uPress, WordPress, API, form, analytics, or other credentials in GitHub, prompts, screenshots, or chat messages.

## Existing Site

- Production: `https://www.yedatech.io/`
- CMS: WordPress with Elementor and AIOSEO on uPress.
- Canonical host: `www.yedatech.io`.
- Current homepage source page ID: `7`.
- Existing contact details shown publicly: `Info@Yedatech.io` and `074-769-1066`.
- Current homepage capture: `screenshots/current-homepage-2026-07-22.png`.

The current site contains useful business material but has a dated visual system, weak hierarchy, large empty areas, generic illustrations, inconsistent proof, and insufficient product storytelling. Preserve verified meaning and SEO assets, but do not reproduce its layout or style.

## Business Context

Yedatech provides an end-to-end digital-learning ecosystem for colleges, universities, companies, organizations, and independent educators. Its offer combines:

- LMS and LCMS infrastructure.
- Digital and frontal course management.
- Interactive lessons, exercises, tests, presentations, and live broadcasts.
- College and organizational learning management.
- Employee recruitment, onboarding, and training.
- Digital course production, studio filming, and educational content development.
- Marketing and distribution support for courses.
- Related Yeda offerings currently presented as Yeda College, Yeda Hub, Yeda Org, Yeda Tech, and Yeda Labs.

The website must make this broad offer understandable. It should feel like one coherent platform and service partner, not a collection of disconnected legacy products.

## Primary Audiences

1. College, university, and training-center leaders who need an LMS and operational control.
2. HR and learning-and-development teams that need employee training and onboarding.
3. Organizations that need digital-course production and interactive educational content.
4. Independent experts or educators who want to create, manage, and sell courses.

The homepage should help each audience recognize itself quickly without turning the first viewport into a list of every feature.

## Homepage Direction

Build a complete, responsive homepage direction, not only a hero screenshot. Prioritize the following structure:

1. **Header and hero** - immediately identify Yeda and the literal offer: a complete platform for creating, managing, and growing digital learning. Use one clear primary CTA for a demo and one secondary path to explore the platform.
2. **Credibility layer** - real customer or partner logos, real proof, or verified capability statements only. Do not invent metrics, testimonials, awards, or customer relationships.
3. **Audience paths** - structured routes for educational institutions, organizations and HR teams, and course creators.
4. **Platform capabilities** - present LMS management, content creation, assessment, live learning, learner operations, analytics, and integrations as a coherent system.
5. **Product experience** - show real or clearly labeled conceptual interface views. The site should reveal the product, not rely only on decorative stock photography.
6. **Content-production capability** - explain the combination of platform, studio production, instructional design, and launch support.
7. **How engagement works** - a concise process from discovery and setup through content, launch, measurement, and ongoing improvement.
8. **Proof or use cases** - use only evidence that can be traced to the existing site or supplied source materials.
9. **Strong final CTA and footer** - demo request, phone/email, key service routes, legal/accessibility links, and clear company identity.

This is a direction, not a rigid wireframe. Victor is expected to exercise visual judgment and improve the structure where a better solution is clear.

## Visual Standard

- The result must feel like a current premium B2B SaaS and education-technology company.
- Avoid a generic blue-only software template, oversized empty sections, nested cards, decorative gradient blobs, and stock imagery that does not reveal the service.
- Build a confident editorial hierarchy with strong typography, restrained surfaces, purposeful color, high-quality product/interface imagery, and polished responsive composition.
- Cards, where genuinely useful, should remain compact with an 8px maximum radius.
- Stock images are allowed when they are relevant, high quality, and legally usable. Record their source URLs in `PROCESS.md`.
- Existing Yeda assets may be reused only after checking quality and relevance.
- Dscope (`https://dscope.ai`) may be used as a quality benchmark for polish and visual confidence, not as a layout or palette to copy.
- `https://yeda.tech/` is a separate current Yeda property and may be reviewed for brand context, but do not merge its claims or copy its design blindly.

## Hebrew, RTL, And Content Rules

- The page is Hebrew-first and must be genuinely RTL, including navigation, icons, forms, lists, and responsive behavior.
- Use natural Hebrew copy derived from verified Yedatech material. AI assistance is welcome, but review every visible sentence for meaning and directionality.
- Do not use placeholder lorem ipsum or untranslated English interface labels in the checkpoint.
- Preserve the public company name, email, and phone exactly unless a verified source says otherwise.
- Do not invent pricing, statistics, client logos, certifications, integrations, or product functionality.

## Technical Direction

Use the current repository as a clean implementation. Recommended baseline:

- Next.js App Router.
- TypeScript in strict mode.
- Tailwind CSS.
- shadcn/ui only where it improves accessible controls and structure.
- Lucide icons rather than hand-drawn interface SVGs.
- A maintainable component structure and centralized content/data objects.

If Victor chooses another stack, `PROCESS.md` must explain why it is materially better for this project. The checkpoint must still run locally with one documented command and be deployable as a public preview.

## Required Process Evidence

Create and maintain:

### `DESIGN.md`

- Visual concept and intended brand impression.
- Audience and hierarchy decisions.
- Color, typography, spacing, imagery, and motion rules.
- References studied and what was learned from each.
- Explicit notes on what was kept original.

### `PROCESS.md`

- Exact tools used, including Claude Code, Codex, other models, design tools, libraries, and image sources.
- Model names and which parts each model handled.
- Important prompts or prompt summaries.
- What was generated by AI versus changed manually.
- Time spent by phase, matching Apploye.
- Decisions, failed approaches, and known unfinished work.
- Local run and deployment instructions.

Use Claude Code, Codex, subagents, image generation, design research, and other modern tools where they improve the result. The evaluation includes how intelligently those tools are used, not how much manual work is performed.

## Three-Hour Checkpoint Deliverables

At the hard stop, provide all of the following:

1. Source pushed to `main` in the owned repository.
2. A working public preview URL, preferably Vercel.
3. A meaningful responsive homepage implementation, even if some lower sections remain incomplete.
4. `DESIGN.md` and `PROCESS.md` with honest process evidence.
5. A short checkpoint note stating what is complete, what is incomplete, and what Victor would do in the next three to seven hours.
6. Desktop and mobile screenshots of the current result.
7. Confirmation that no production WordPress content or configuration was changed.

## Checkpoint Quality Gates

- The page works at 1440px, 768px, 390px, and 360px without incoherent overlap or horizontal overflow.
- The hero clearly communicates the business within the first viewport.
- Visible content is polished Hebrew and correctly RTL.
- Images load and are relevant to the actual product or service.
- Navigation and CTA controls work.
- Basic accessibility is present: semantic headings, keyboard-visible controls, alt text, labels, and sufficient contrast.
- The browser console has no application errors.
- The repository contains no credentials or private exports.
- The result demonstrates original visual judgment rather than an unmodified template.

## Existing URL And SEO Safety

The current WordPress estate includes important published routes such as:

- `/about/`
- `/contact-us/`
- `/lessons-photography/`
- `/blog/`
- `/prices/`
- `/yeda-college/`
- `/yeda-hub/`
- `/yeda-tech/`
- `/yeda-org/`
- `/yedalabs/`

No URL migration, redirect plan, metadata replacement, analytics change, form replacement, or production switch is part of the first three hours. Later phases must inventory all indexed URLs and protect existing SEO before any launch.

## Explicit Non-Goals For This Checkpoint

- No production deployment or domain change.
- No WordPress edits.
- No full-site migration.
- No backend, CRM, payment, or LMS integration.
- No unverified marketing claims.
- No work beyond three tracked hours without written authorization.
