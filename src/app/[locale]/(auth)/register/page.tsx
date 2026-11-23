import { Suspense } from "react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { RegisterScreen } from "@/components/auth/RegisterScreen";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "register",
    pathname: "/register",
    locale,
    robots: { index: false, follow: false },
  });
}

export default async function RegisterPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.register");

  return (
    <Suspense fallback={null}>
      <RegisterScreen />
    </Suspense>
  );
}
