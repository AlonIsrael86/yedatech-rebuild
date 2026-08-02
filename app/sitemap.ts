import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/content/routes";

const SITE = "https://www.yedatech.io";

/**
 * Generated from content/routes.ts, so the sitemap can never drift from what
 * actually exists. Alexey's rule is that every URL becomes its own page — this
 * is where that gets enforced.
 *
 * The 29 Hebrew article URLs are deliberately absent: they must be migrated
 * with their text and slugs untouched, so until that happens they stay on
 * WordPress and are served from the live site's own sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ALL_ROUTES.map((r) => ({
      url: `${SITE}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Preserved live pages outrank the new ones until the new pages earn it.
      priority: r.preserved ? 0.8 : 0.7,
    })),
  ];
}
