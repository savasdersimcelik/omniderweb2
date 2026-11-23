import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/config/sitemap-routes";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, route.href),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: languageAlternates(route.href),
      },
    })),
  );
}
