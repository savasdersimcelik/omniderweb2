import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { AuthPlaceholder } from "@/components/auth/AuthPlaceholder";
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
  const t = await getTranslations("Auth.reset");

  return (
    <AuthPlaceholder
      title={t("title")}
      description={t("placeholder")}
      primaryHref="/login"
      primaryLabel={t("backToLogin")}
      secondaryHref="/"
      secondaryLabel={t("homeLink")}
    />
  );
}
