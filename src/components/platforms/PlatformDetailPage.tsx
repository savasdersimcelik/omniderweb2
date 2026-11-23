import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import {
  platformNavKeyBySlug,
  type PlatformPageSlug,
} from "@/config/platform-pages";

type PlatformDetailPageProps = {
  slug: PlatformPageSlug;
};

export async function PlatformDetailPage({ slug }: PlatformDetailPageProps) {
  const t = await getTranslations("PlatformDetailPage");
  const tNav = await getTranslations("Nav");
  const title = tNav(`items.${platformNavKeyBySlug[slug]}`);

  return (
    <Container as="section" className="section">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="heading-page">{title}</h1>
        <p className="text-body">{t("comingSoon")}</p>
      </header>
    </Container>
  );
}
