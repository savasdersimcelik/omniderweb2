import { colors } from "./colors";

export const seoConfig = {
  siteName: "Omnider",
  titleSeparator: " · ",
  themeColor: colors.theme,
  defaultOgImage: "/logo-horizontal.png",
  twitterCard: "summary_large_image" as const,
  defaultRobots: {
    index: true,
    follow: true,
  },
  localeMap: {
    tr: "tr_TR",
    en: "en_US",
  } as const,
  organization: {
    name: "Omnider",
    legalName: "Omnider",
    logoPath: "/branding/omnider_logo_full.png",
    /** Add verified social profiles when ready */
    sameAs: [] as string[],
  },
} as const;
