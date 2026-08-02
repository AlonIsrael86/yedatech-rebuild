import type { MetadataRoute } from "next";

const SITE = "https://www.yedatech.io";

/**
 * Alon's brief requires the site be highly crawlable by search engines AND AI
 * systems, so nothing is disallowed and no AI crawler is singled out.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
