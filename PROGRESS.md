# PROGRESS.md — build timeline

A transparent, timestamped record of how the homepage reached its current
state. **Every timestamp below is the real git commit time** (`git log %cI`,
Asia/Jerusalem, +03:00) — not hand-authored or backdated. Each milestone is a
self-contained commit that builds green, so the git history *is* the
progression, and each has a matching visual snapshot in `screenshots/progress/`.

## Timeline

| # | Time (IDT) | Commit | Milestone | Snapshot |
|---|-----------|--------|-----------|----------|
| — | 22:29:18 | `1775582` | **Checkpoint 1** — complete Hebrew RTL homepage from zero (hero + all sections, deployed) | `screenshots/checkpoint-*` |
| 1 | 23:02:18 | `802ff93` | **Avatar-based learning section** — dedicated section + coded `AvatarModulePanel` (presenter + slide + in-module quiz) for the headline capability | `progress/01-avatar-*` |
| 2 | 23:08:08 | `d7071ee` | **Two more product surfaces** — coded `HtmlModulePanel` + `VideoQuizPanel` replace the duplicated dashboard; three distinct surfaces across the page | `progress/02-surfaces-*` |
| 3 | 23:13:05 | `80be437` | **Real `yeda` logotype** — extracted from Figma (node `199:15118`), recolored via `currentColor`, vendored at `public/brand/yeda-logo.svg` | `progress/03-logo-*` |
| 4 | 23:16:33 | `b7c784a` | **Hero + header polish** — floating video card no longer occludes any KPI tile; scroll-triggered sticky-header elevation | `progress/04-hero-*` |

Round-2 work (milestones 1–4) began **2026-07-22 22:56** and is within the
initial 3-hour authorization (a ceiling, not a target). Checkpoint 1 landed as
a single commit and cannot be truthfully split into per-phase stamps; its
internal phase breakdown in `PROCESS.md` is therefore labeled **approximate**,
while every milestone above carries an exact commit time.

## What changed, in one line each

1. Gave avatar-based learning — the capability Alexey named first — its own
   section with a coded module that literally shows avatar + slide + practice
   combined ("avatars with other formats").
2. Stopped reusing one dashboard; now each product moment reveals a *different*
   real surface (LMS dashboard in the hero, HTML module, video-with-question).
3. Swapped the placeholder wordmark for the genuine Yeda logo from the Figma.
4. Fixed the one rough edge in the hero composition and added depth on scroll.

## Verification at each step

Every milestone was built (`npm run build`, clean) and checked with Playwright
at 1440 / 768 / 390 / 360 px: **0 horizontal overflow, no console errors** at
every width, every time. All new copy is verified from yedatech.io / the
handoff; product panels are labeled illustrations ("המחשה"); no invented
customers, metrics, testimonials, or capabilities.
