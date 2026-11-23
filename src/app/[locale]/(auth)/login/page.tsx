import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { LoginScreen } from "@/components/auth/LoginScreen";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "login",
    pathname: "/login",
    locale,
    robots: { index: false, follow: false },
  });
}

export default async function LoginPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth");

  return <LoginScreen />;
}
