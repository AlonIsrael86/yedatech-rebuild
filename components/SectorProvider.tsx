"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_SECTOR } from "@/content/site";
import type { Sector } from "@/content/routes";

/**
 * Alexey: clicking a tab switches the WHOLE site between the two sectors
 * "не меняя страницу" — without changing the page.
 *
 * So both sectors' content is rendered server-side and one is hidden with CSS,
 * rather than swapped in on the client. That is the only approach that
 * satisfies him and Alon's crawlability requirement at the same time:
 *   - a crawler (and a JS-disabled visitor) receives BOTH sectors in the HTML;
 *   - a visitor gets an instant switch with no navigation and no refetch.
 *
 * The visibility rule itself lives in globals.css, keyed off the data-sector
 * attribute this provider writes.
 *
 * The stored/`?sector=` preference lives in a module-level store read through
 * useSyncExternalStore rather than an effect: the server snapshot is always
 * DEFAULT_SECTOR so hydration matches, and React swaps in the real preference
 * immediately afterwards without a cascading setState-in-effect render.
 */

const STORAGE_KEY = "yeda-sector";

const isSector = (v: unknown): v is Sector =>
  v === "organizations" || v === "education";

let cached: Sector | null = null;
const listeners = new Set<() => void>();

/** Resolve once per page load: ?sector= wins, then localStorage, then default. */
function readSector(): Sector {
  if (cached) return cached;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("sector");
    if (isSector(fromUrl)) {
      cached = fromUrl;
      return cached;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSector(stored)) {
      cached = stored;
      return cached;
    }
  } catch {
    // private mode / storage disabled — the default is fine
  }
  cached = DEFAULT_SECTOR;
  return cached;
}

function writeSector(next: Sector) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const serverSector = () => DEFAULT_SECTOR;

type SectorContextValue = {
  sector: Sector;
  setSector: (s: Sector) => void;
};

const SectorContext = createContext<SectorContextValue>({
  sector: DEFAULT_SECTOR,
  setSector: () => {},
});

export const useSector = () => useContext(SectorContext);

export function SectorProvider({ children }: { children: ReactNode }) {
  const sector = useSyncExternalStore(subscribe, readSector, serverSector);
  const setSector = useCallback((next: Sector) => writeSector(next), []);

  return (
    <SectorContext.Provider value={{ sector, setSector }}>
      <div data-sector={sector} className="contents">
        {children}
      </div>
    </SectorContext.Provider>
  );
}

/**
 * Wraps content belonging to one sector. Server component — the copy inside is
 * server-rendered for both sectors and CSS decides which one is visible.
 */
export function SectorPanel({
  sector,
  children,
}: {
  sector: Sector;
  children: ReactNode;
}) {
  return <div data-sector-panel={sector}>{children}</div>;
}
