import { Suspense } from "react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ForgotPasswordScreen } from "@/components/auth/ForgotPasswordScreen";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "forgotPassword",
    pathname: "/forgot-password",
    locale,
    robots: { index: false, follow: false },
  });
}

export default async function ForgotPasswordPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.forgot");

  return (
    <Suspense fallback={null}>
      <ForgotPasswordScreen />
    </Suspense>
  );
}
