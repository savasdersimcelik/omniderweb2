import type { MetadataRoute } from "next";
import { platformPageSlugs } from "@/config/platform-pages";

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
  { href: "/platforms", changeFrequency: "weekly", priority: 0.8 },
  ...platformPageSlugs.map((slug) => ({
    href: `/platforms/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  { href: "/messaging", changeFrequency: "weekly", priority: 0.8 },
  { href: "/email", changeFrequency: "weekly", priority: 0.8 },
  { href: "/campaigns", changeFrequency: "weekly", priority: 0.8 },
  { href: "/appointments", changeFrequency: "weekly", priority: 0.8 },
  { href: "/ai-calls", changeFrequency: "weekly", priority: 0.8 },
  { href: "/ai-assistant", changeFrequency: "weekly", priority: 0.8 },
  { href: "/link-shortener", changeFrequency: "weekly", priority: 0.8 },
  { href: "/analytics", changeFrequency: "weekly", priority: 0.8 },
  { href: "/marketplace", changeFrequency: "weekly", priority: 0.8 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.7 },
];
