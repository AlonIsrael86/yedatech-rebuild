/**
 * Client logos.
 *
 * WHY THIS IS GATED
 * -----------------
 * Alexey pointed at yedalms.io and asked for the rolling logo strip and the
 * logos in the footer. The twelve organizations below are the ones Yeda already
 * publishes on its own site, yedalabs.ai — so they are real relationships, not
 * invented ones.
 *
 * But they are other companies' trademarks, this repository is public, and
 * showing a client on a NEW domain is a commercial decision that belongs to
 * Alexey and Alon, not to us. So:
 *
 *   - CLIENTS_APPROVED is false, and LogoStrip renders nothing while it is.
 *   - No logo file is committed. `file` stays null until approval.
 *
 * Turning it on is: get Alexey's yes, download the twelve files from
 * yedalabs.ai/logos/ into public/media/clients/, fill in `file`, flip the flag.
 *
 * `slug` is the exact filename stem on yedalabs.ai. `name` is only filled in
 * where the organization's own English spelling is certain — the rest are
 * deliberately left null rather than guessed, because a misspelled client name
 * on a live site is worse than no logo at all.
 */

export type ClientLogo = {
  slug: string;
  /** null → the English name is not yet verified. Never guess one. */
  name: string | null;
  /** null → awaiting approval; nothing is committed or rendered. */
  file: string | null;
  width: number;
  height: number;
};

/**
 * Flip to true ONLY after Alexey confirms, in writing, that these clients may
 * appear on yedatech.io.
 */
export const CLIENTS_APPROVED = false;

export const CLIENT_LOGOS: readonly ClientLogo[] = [
  { slug: "hackeru", name: "HackerU", file: null, width: 160, height: 48 },
  { slug: "ipc", name: "IPC", file: null, width: 160, height: 48 },
  { slug: "success-college", name: "Success College", file: null, width: 160, height: 48 },
  { slug: "allencarr", name: "Allen Carr", file: null, width: 160, height: 48 },
  { slug: "os", name: null, file: null, width: 160, height: 48 },
  { slug: "calcalist", name: "Calcalist", file: null, width: 160, height: 48 },
  { slug: "kol-hamas", name: null, file: null, width: 160, height: 48 },
  { slug: "highq", name: "HighQ", file: null, width: 160, height: 48 },
  { slug: "malamteam", name: "MalamTeam", file: null, width: 160, height: 48 },
  { slug: "tiltan", name: "Tiltan", file: null, width: 160, height: 48 },
  { slug: "movement", name: null, file: null, width: 160, height: 48 },
  { slug: "april", name: null, file: null, width: 160, height: 48 },
];

export const CLIENTS_INTRO = "Learning teams already building on Yeda";

/** True only when the strip has approval AND something real to show. */
export const clientsReady = () =>
  CLIENTS_APPROVED && CLIENT_LOGOS.some((c) => c.file && c.name);
