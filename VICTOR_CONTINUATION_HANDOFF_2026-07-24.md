# Victor Continuation Handoff - Yedatech Figma Alignment

**Date:** 2026-07-24  
**Status:** Planning and Alexey alignment are authorized and must be logged in Apploye. Do not begin implementation until Alon confirms implementation hours and Alexey confirms the plan.

## Authority And Scope

This document is the authoritative brief for the next Yedatech phase. It supersedes any conflicting language, audience, or positioning in the original `HANDOFF.md`, especially Hebrew-first delivery and creator-focused positioning.

The current project remains Yedatech. Do not start a different website or a separate Yeda project in this phase.

## Required First Step

Before changing code:

1. Read this handoff and inspect the current implementation.
2. Connect the official remote Figma MCP plugin to Claude Code:
   - Run `claude plugin install figma@claude-plugins-official`.
   - Restart Claude Code if necessary.
   - Open `/plugin`, authorize the Figma plugin, and verify that it shows as connected.
3. Use Figma MCP to inspect the specified file and frames. Do not rely only on screenshots or visual memory.
4. Prepare a concise written implementation plan covering design, content, responsive behavior, interaction, assets, and open questions.
5. Send the plan to Alexey and confirm that you are fully aligned with him.
6. Post the agreed plan and Alexey's confirmation in the project WhatsApp group.
7. Log this planning and alignment work in Apploye. This is the only currently authorized work.
8. Wait for Alon's written authorization of implementation hours before changing code.

## Figma Source

- File: `https://www.figma.com/design/wOn70IJSQEuBjf342BYmmR/yedatech.io?node-id=3-2`
- Main desktop reference: Home page 1.4, node `199:14942`.
- Main mobile reference: Home page 1.4 mobile, node `282:4603`.

The Figma is an older visual source, not an approved current content specification. Do not copy its text or layouts mechanically. Use and modernize its strongest branded elements:

- Human illustrations and photography.
- Product screens and product tabs.
- Desktop and mobile compositions.
- Widget and interaction concepts.
- Visual hierarchy, brand colors, and interface language.
- Relevant internal-page concepts where useful for planning.

The goal is a current premium implementation based on Yeda's established graphic world, not an unrelated redesign and not a literal reproduction of a two-year-old file.

Before selecting assets or treating a frame as final, confirm with Alexey which 2026 revisions and frame he approves. Confirm that Yeda owns or is licensed to use every selected Figma image or asset.

## Specific Visual Correction From Alexey

The current homepage does not use enough of the branded human imagery from the Figma.

Alexey specifically referenced the composition around the product interface:

- A woman appears on the left.
- A man appears on the right.
- The people support an interactive agent or widget experience.
- On desktop hover, the character should react toward the user and expose a polished play or speaking interaction.

Plan this first as a responsive frontend interaction. Define a sensible mobile fallback because hover does not exist on touch devices. Do not invent the final media, voice, agent behavior, or backend integration. Confirm those details directly with Alexey before implementation.

## Language And Market

- Build Yedatech in natural English first.
- A Hebrew experience may follow later as a separately written market-specific experience.
- Do not treat the Hebrew version as a direct translation of the English site.

## Target Audience

The site is for organizations and educational institutions only:

- Companies and enterprises.
- Government organizations.
- Universities and colleges.
- Schools and other educational institutions.

Organizational use cases include employee training, supplier training, end-customer training, organizational learning, and knowledge management.

## Remove From The Current Direction

- Independent course creators.
- Creator plans or creator pricing.
- Course resale or marketplace positioning.
- Unrelated presentation-creation positioning.
- Any subject or claim not supported by the real Yeda products.

## Capabilities To Emphasize

- Organizational learning and knowledge management.
- Employee, supplier, and end-customer training.
- Organizational portals.
- LMS, LXP, and LCMS capabilities.
- AI learning agents and software-training agents.
- Avatar-based learning.
- Simulations and interactive learning.
- Learning schedules and live learning.
- Zoom, Microsoft Teams, and Google synchronization.
- CRM integrations.
- Yeda Labs content-production capabilities where factually relevant.
- Review the current Yeda Data product/site for additional relevant capabilities Alexey expects to include.
- If pricing is included, source and confirm it from the current Yeda LMS offer. Do not reuse creator-oriented pricing.

All product claims and screenshots must be verified against current Yeda products. Ask Alexey when uncertain rather than guessing.

## Plan Deliverable

Before implementation, submit a short plan containing:

1. Current-page elements to keep, change, or remove.
2. Figma nodes and assets to use.
3. Proposed English homepage structure and messaging.
4. Man/woman interaction behavior on desktop and mobile.
5. Product screenshots and claims that require verification.
6. Responsive implementation approach.
7. Accessibility considerations, including keyboard and reduced-motion behavior.
8. Estimated hours by milestone.
9. Questions for Alexey.

The first milestone remains the homepage. Do not expand into a full-site rebuild until the homepage direction is approved.

## Reporting And Approval Gates

- Keep a short daily checklist of completed work, remaining work, blockers, and decisions needed.
- Coordinate directly with Alexey on product requirements.
- Alexey must confirm the plan before implementation begins.
- Planning and Alexey alignment must be logged in Apploye.
- Alon must separately confirm implementation hours before any code changes begin.
- Do not modify production WordPress during this phase.
- Work only in the existing Yedatech repository and preview deployment unless Alon explicitly changes the scope.

## Definition Of Ready

Implementation may begin only when all six conditions are true:

1. Figma MCP is connected and the referenced frames were inspected.
2. Victor submitted the written implementation plan.
3. Alexey confirmed that the plan matches his direction.
4. Alexey confirmed the approved current frame and any relevant 2026 revisions.
5. Usage rights were confirmed for every selected Figma asset.
6. Alon authorized implementation hours in writing.
