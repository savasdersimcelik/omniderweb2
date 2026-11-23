import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { VerifyEmailTokenScreen } from "@/components/auth/VerifyEmailTokenScreen";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "verifyEmail",
    pathname: "/verify-email",
    locale,
    robots: { index: false, follow: false },
  });
}

type Params = Promise<{ token: string }>;

export default async function VerifyEmailTokenPage({
  params,
}: {
  params: Params;
}) {
  const locale = await getLocale();
  setRequestLocale(locale);
  await getTranslations("Auth.verify");

  const { token } = await params;

  return <VerifyEmailTokenScreen token={token} />;
}
