import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { LoginVerifyEmailForm } from "@/components/auth/LoginVerifyEmailForm";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "verifyEmail",
    pathname: "/login/verify-email",
    locale,
    robots: { index: false, follow: false },
  });
}

type Search = Promise<{ email?: string | string[] }>;

export default async function LoginVerifyEmailPage({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.verifyLogin");

  const params = searchParams ? await searchParams : {};
  const raw = params.email;
  const initialEmail = Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";

  return <LoginVerifyEmailForm initialEmail={initialEmail} />;
}
