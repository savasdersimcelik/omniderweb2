import type { MetadataRoute } from "next";

export type SitemapRoute = {
  /** Locale-agnostic path (e.g. `/`, `/platforms`) */
  href: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

/**
 * Central list of public URLs for sitemap.xml.
 * Add routes here as pages are created — pages do not need to exist yet.
 */
export const sitemapRoutes: SitemapRoute[] = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.7 },
];
