import { Suspense } from "react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ResetPasswordScreen } from "@/components/auth/ResetPasswordScreen";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "resetPassword",
    pathname: "/reset-password",
    locale,
    robots: { index: false, follow: false },
  });
}

export default async function ResetPasswordPage() {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.reset");

  return (
    <Suspense fallback={null}>
      <ResetPasswordScreen />
    </Suspense>
  );
}
