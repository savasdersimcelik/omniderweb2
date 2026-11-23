import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { VerifyEmailPendingForm } from "@/components/auth/VerifyEmailPendingForm";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "verifyEmail",
    pathname: "/register/verify-email",
    locale,
    robots: { index: false, follow: false },
  });
}

type Search = Promise<{ email?: string | string[] }>;

export default async function RegisterVerifyEmailPage({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.verifyRegister");

  const params = searchParams ? await searchParams : {};
  const raw = params.email;
  const initialEmail = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");

  return (
    <VerifyEmailPendingForm initialEmail={initialEmail} variant="register" />
  );
}
