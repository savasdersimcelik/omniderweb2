"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { PricingCompareTable } from "@/components/pricing/PricingCompareTable";
import {
  AdaptivePricingSection,
  type PricingFeature,
  type PricingTier,
} from "@/components/ui/adaptive-pricing-section";
import {
  fetchPricingCatalog,
  registerHref,
} from "@/lib/pricing/api";
import {
  formatMoney,
  formatQuota,
  monthlyDisplayMinor,
  packageQuotas,
  yearlyDiscountPercent,
} from "@/lib/pricing/format";
import type {
  BillingInterval,
  PackageComparePayload,
  PricingPackage,
} from "@/lib/pricing/types";

type Props = {
  initialPackages: PricingPackage[];
  initialCompare: PackageComparePayload | null;
  initialError?: boolean;
};

export function PricingPackagesSection({
  initialPackages,
  initialCompare,
  initialError = false,
}: Props) {
  const t = useTranslations("PricingPage.packages");
  const locale = useLocale();
  const [billing, setBilling] = useState<BillingInterval>("monthly");
  const [packages, setPackages] = useState(initialPackages);
  const [compare, setCompare] = useState(initialCompare);
  const [error, setError] = useState(initialError);
  const [pending, startTransition] = useTransition();

  const discount = yearlyDiscountPercent(packages);
  const currency =
    packages[0]?.currency || packages[0]?.pricing?.currency || "USD";

  const reload = useCallback((nextBilling: BillingInterval) => {
    startTransition(async () => {
      try {
        const catalog = await fetchPricingCatalog(
          { billingInterval: nextBilling },
          { server: false },
        );
        setPackages(catalog.packages);
        setCompare(catalog.compare);
        setError(false);
      } catch {
        setError(true);
      }
    });
  }, []);

  function onBilling(next: BillingInterval) {
    if (next === billing) return;
    setBilling(next);
    reload(next);
  }

  const tiers: PricingTier[] = useMemo(
    () =>
      packages.map((pkg) => {
        const quotas = packageQuotas(pkg);
        const name = t(`names.${pkg.code}` as "names.basic");
        const description = t(
          `descriptions.${pkg.code}` as "descriptions.basic",
        );
        const badge = pkg.badge_slug
          ? t(`badges.${pkg.badge_slug}` as "badges.most_popular")
          : null;

        const features: PricingFeature[] = [
          {
            icon: "channels",
            text: t("quotas.channels"),
            value: `×${formatQuota(quotas.channels)}`,
            included: quotas.channels > 0,
          },
          {
            icon: "messages",
            text: t("quotas.messages"),
            value: formatQuota(quotas.messages),
            included: quotas.messages > 0,
          },
          {
            icon: "ai",
            text: t("quotas.aiCredits"),
            value: formatQuota(quotas.aiCredits),
            included: quotas.aiCredits > 0,
          },
          {
            icon: "verification",
            text: t("quotas.verificationCredits"),
            value: formatQuota(quotas.verificationCredits),
            included: quotas.verificationCredits > 0,
          },
          {
            icon: "phone",
            text: t("quotas.virtualNumbers"),
            value: `×${formatQuota(quotas.virtualNumbers)}`,
            included: quotas.virtualNumbers > 0,
          },
          {
            icon: "links",
            text: t("quotas.maxLinks"),
            value: formatQuota(quotas.maxLinks),
            included: quotas.maxLinks > 0,
          },
          {
            icon: "analytics",
            text: t("quotas.maxWebsites"),
            value: `×${formatQuota(quotas.maxWebsites)}`,
            included: quotas.maxWebsites > 0,
          },
        ];

        return {
          id: `pkg-${pkg.code}`,
          name,
          subtitle: name,
          price: formatMoney(
            monthlyDisplayMinor(pkg.selected_price_minor, billing),
            currency,
            locale,
          ),
          period: t("card.perMonth"),
          description,
          badge: badge ? { text: badge } : undefined,
          features,
          buttonText: t("card.cta"),
          href: registerHref(pkg.code, billing),
          highlighted: Boolean(pkg.is_featured),
          billedNote:
            billing === "yearly" ? t("card.billedYearly") : undefined,
        };
      }),
    [packages, billing, currency, locale, t],
  );

  const billingControls = (
    <div className="pricing-controls">
      <div className="pricing-controls__group">
        <span className="pricing-controls__label">{t("billing.label")}</span>
        <div
          className="pricing-pill"
          role="group"
          aria-label={t("billing.label")}
        >
          <button
            type="button"
            className={
              !billing || billing === "monthly" ? "is-active" : undefined
            }
            onClick={() => onBilling("monthly")}
          >
            {t("billing.monthly")}
          </button>
          <button
            type="button"
            className={billing === "yearly" ? "is-active" : undefined}
            onClick={() => onBilling("yearly")}
          >
            {t("billing.yearly")}
            <span className="pricing-pill__save">
              {t("billing.save", { percent: discount })}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="packages" className="pricing-packages">
      {pending ? (
        <p className="pricing-packages__status">
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
          {t("card.loading")}
        </p>
      ) : null}

      {error && packages.length === 0 ? (
        <div className="pricing-packages__error" role="alert">
          <h3>{t("card.errorTitle")}</h3>
          <p>{t("card.errorDesc")}</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => reload(billing)}
          >
            <RefreshCw className="size-4" aria-hidden />
            {t("card.retry")}
          </button>
        </div>
      ) : (
        <AdaptivePricingSection
          title={t("title")}
          subtitle={t("subtitle")}
          highlightsLabel={t("card.highlights")}
          tiers={tiers}
          pending={pending}
          controls={billingControls}
          wide
        />
      )}

      <Container>
        <PricingCompareTable
          compareData={compare}
          packages={packages}
          billing={billing}
          currency={currency}
        />
      </Container>
    </section>
  );
}
