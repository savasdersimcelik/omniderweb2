import type { Metadata } from "next";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { AttributionCapture } from "@/components/attribution/AttributionCapture";
import {
  DemoModalProvider,
  DemoRequestModal,
} from "@/components/demo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { colors } from "@/config/colors";
import { seoConfig } from "@/config/seo";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import "@/app/globals.css";

const RECAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY?.trim();

const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

const WEBCHAT_KEY = "0e974af2-9d2a-43d2-af13-1c588c554c15";
const webchatSrc = isProduction
  ? `https://api.omnider.com/webchat/widget.js?key=${WEBCHAT_KEY}`
  : `http://localhost:3000/webchat/widget.js?key=${WEBCHAT_KEY}`;

const analytics: {
  websiteId: string;
  src: string;
  apiHost?: string;
} = isProduction
  ? {
      websiteId: "a2125f72-595e-4a4e-869d-e1db07b5d282",
      src: "https://analytics.omnider.com/trackers/analytics.min.js",
    }
  : {
      websiteId: "5bab23a0-bff9-4160-9828-0867dcb6eb30",
      src: "http://localhost:8096/trackers/analytics.min.js",
      apiHost: "http://localhost:8097",
    };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-brand",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: seoConfig.siteName,
  title: {
    default: seoConfig.siteName,
    template: `%s${seoConfig.titleSeparator}${seoConfig.siteName}`,
  },
  robots: seoConfig.defaultRobots,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    siteName: seoConfig.siteName,
  },
  twitter: {
    card: seoConfig.twitterCard,
  },
  themeColor: colors.theme,
};

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <DemoModalProvider>
            <Suspense fallback={null}>
              <AttributionCapture />
            </Suspense>
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
            <DemoRequestModal />
          </DemoModalProvider>
        </NextIntlClientProvider>
        <Script src={webchatSrc} strategy="afterInteractive" />
        <Script
          src={analytics.src}
          strategy="lazyOnload"
          data-website-id={analytics.websiteId}
          {...(analytics.apiHost
            ? { "data-api-host": analytics.apiHost }
            : {})}
        />
        <SiteAnalytics />
        {RECAPTCHA_SITEKEY ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITEKEY}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
