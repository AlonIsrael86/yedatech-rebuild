import type { Sector } from "@/content/routes";

/**
 * Client logos, from yedalms.io.
 *
 * WHAT THIS IS, AND WHAT IT IS NOT
 * --------------------------------
 * These are real Yeda clients that Yeda already publishes on its own live site,
 * so the relationship is not invented and the "never invent customers" rule is
 * not in play. What it is: twenty-two other companies' trademarks, committed to
 * a PUBLIC repository and shown on a NEW domain as a customer wall.
 *
 * This file used to be gated behind `CLIENTS_APPROVED = false` pending Alexey.
 * Victor took the call on 2026-08-06 and it is on. Two earlier trademark
 * overrides (Zoom/Teams/Meet, Google/Outlook) were nominative use inside a
 * screenshot — a claim about integrations, not about who the customers are, so
 * this one is a bigger step and is in the Alexey brief as reversible: set
 * CLIENTS_APPROVED back to false and the strip disappears, no other change.
 *
 * NAMES ARE READ OFF THE MARKS, NEVER OFF THE FILENAMES
 * ----------------------------------------------------
 * Three filenames on yedalms.io point at a completely different company than
 * the logo they hold — `just-music.png` is HackerU, `Вести.png` is April,
 * `green-course.png` is Allen Carr. WordPress file reuse. Every `alt` on this
 * site is a real organization's name, so each of these was opened and read.
 * The `alt` attributes were no help either: all thirty are just the filename.
 *
 * EIGHT OF THE THIRTY ARE DELIBERATELY ABSENT. Their marks carry no Latin text
 * at all, so naming them in English would be transliteration — a guess — and a
 * misspelled client name on a live site is worse than one fewer logo. They are,
 * by their yedalms.io filename: התאחדות-הסטודנטים, gomegevim, KOLHAMAS, Tiltan,
 * מרכז-ינר, Group-1000002436, logo82934, Calcalist. If Victor supplies the
 * English spellings they drop straight in.
 *
 * SECTORS come from yedalms.io's own two groups — מוסדות לימוד (educational
 * institutions) and חברות וארגונים (companies and organizations) — which map
 * onto our two tabs, so a visitor sees customers who look like them.
 *
 * THE SOURCE FILES ARE NOT LOGOS ON WHITE. Each is a mark sitting on a pale
 * blue rounded tile, rgb(227,236,253), baked into the PNG — dropped in as-is
 * they render as faint tinted boxes and the mark itself comes out around 14px
 * tall. So each file has its tile repainted white and is then cropped to the
 * mark's own bounding box with a small even margin. The dimensions below are
 * those crops, measured, and the ratios are genuinely uneven — 0.82 for INT
 * against 8.47 for Elevation — which is why LogoStrip gives every logo one
 * fixed box and lets `object-contain` fit the mark inside it.
 */

export type ClientLogo = {
  slug: string;
  /** The organization's own English spelling, read off its logo. Never guessed. */
  name: string;
  file: string;
  width: number;
  height: number;
  /** Which of yedalms.io's two groups it sits in. */
  sector: Sector;
};

/** Set to false to take every client logo off the site in one edit. */
export const CLIENTS_APPROVED = true;

const C = "/media/clients";

export const CLIENT_LOGOS: readonly ClientLogo[] = [
  // מוסדות לימוד — educational institutions
  { slug: "hackeru", name: "HackerU", file: `${C}/hackeru.png`, width: 235, height: 49, sector: "education" },
  { slug: "success-college", name: "Success College", file: `${C}/success-college.png`, width: 166, height: 126, sector: "education" },
  { slug: "ipc", name: "IPC", file: `${C}/ipc.png`, width: 229, height: 100, sector: "education" },
  { slug: "highq", name: "HighQ", file: `${C}/highq.png`, width: 104, height: 43, sector: "education" },
  { slug: "jolt", name: "Jolt", file: `${C}/jolt.png`, width: 114, height: 73, sector: "education" },
  { slug: "int", name: "INT", file: `${C}/int.png`, width: 92, height: 112, sector: "education" },
  { slug: "jumpin", name: "Jumpin", file: `${C}/jumpin.png`, width: 198, height: 76, sector: "education" },
  { slug: "orin-shpalter", name: "Orin Shpalter", file: `${C}/orin-shpalter.png`, width: 136, height: 100, sector: "education" },

  // חברות וארגונים — companies and organizations
  { slug: "malamteam", name: "MalamTeam", file: `${C}/malamteam.png`, width: 240, height: 93, sector: "organizations" },
  { slug: "thrivedx", name: "ThriveDX", file: `${C}/thrivedx.png`, width: 255, height: 52, sector: "organizations" },
  { slug: "global-university-systems", name: "Global University Systems", file: `${C}/global-university-systems.png`, width: 127, height: 58, sector: "organizations" },
  { slug: "alljobs", name: "AllJobs", file: `${C}/alljobs.png`, width: 200, height: 54, sector: "organizations" },
  { slug: "allen-carr", name: "Allen Carr", file: `${C}/allen-carr.png`, width: 244, height: 73, sector: "organizations" },
  { slug: "tefen", name: "Tefen", file: `${C}/tefen.png`, width: 219, height: 87, sector: "organizations" },
  { slug: "israel-canada", name: "Israel Canada", file: `${C}/israel-canada.png`, width: 222, height: 101, sector: "organizations" },
  { slug: "fischer", name: "Fischer", file: `${C}/fischer.png`, width: 184, height: 76, sector: "organizations" },
  { slug: "lastminute", name: "lastminute.co.il", file: `${C}/lastminute.png`, width: 223, height: 62, sector: "organizations" },
  { slug: "golan", name: "Golan", file: `${C}/golan.png`, width: 197, height: 71, sector: "organizations" },
  { slug: "regba", name: "Regba", file: `${C}/regba.png`, width: 144, height: 62, sector: "organizations" },
  { slug: "movement", name: "Movement", file: `${C}/movement.png`, width: 288, height: 68, sector: "organizations" },
  { slug: "elevation", name: "Elevation", file: `${C}/elevation.png`, width: 305, height: 36, sector: "organizations" },
  { slug: "april", name: "April", file: `${C}/april.png`, width: 164, height: 71, sector: "organizations" },
];

export const CLIENTS_INTRO = "Learning teams already building on Yeda";

/** The logos for one sector, in order. */
export const logosFor = (sector: Sector) =>
  CLIENT_LOGOS.filter((c) => c.sector === sector);

/**
 * Per-sector, not global: if one sector ends up with nothing to show, that
 * panel renders nothing while the other still does.
 */
export const clientsReady = (sector: Sector) =>
  CLIENTS_APPROVED && logosFor(sector).length > 0;
