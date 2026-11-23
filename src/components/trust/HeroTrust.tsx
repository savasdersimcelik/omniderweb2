import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { MetaTechProvider } from "./MetaTechProvider";
import { UserTrust } from "./UserTrust";

type HeroTrustProps = {
  className?: string;
  showMeta?: boolean;
  showUserTrust?: boolean;
};

/**
 * Global hero trust row — Meta Tech Provider + user social proof.
 * Reuse on any marketing hero via <HeroTrust />.
 */
export async function HeroTrust({
  className,
  showMeta = true,
  showUserTrust = true,
}: HeroTrustProps) {
  const t = await getTranslations("Trust");

  return (
    <div className={cn("hero-trust", className)}>
      {showMeta ? (
        <MetaTechProvider
          metaLabel={t("metaLabel")}
          providerLabel={t("providerLabel")}
        />
      ) : null}
      {showUserTrust ? (
        <UserTrust
          rating={t("rating")}
          before={t("before")}
          count={t("count")}
          after={t("after")}
        />
      ) : null}
    </div>
  );
}
