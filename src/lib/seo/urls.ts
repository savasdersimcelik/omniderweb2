import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

export function localizedPath(locale: Locale, href: string) {
  const pathname = getPathname({ locale, href });
  return pathname === "/" ? "" : pathname;
}

export function absoluteUrl(locale: Locale, href: string) {
  return `${getSiteUrl()}${localizedPath(locale, href)}`;
}

export function languageAlternates(href: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, href);
  }

  languages["x-default"] = absoluteUrl(routing.defaultLocale, href);

  return languages;
}
