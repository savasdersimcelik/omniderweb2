import { getLocale } from "next-intl/server";
import { PricingAdvantages } from "@/components/pricing/PricingAdvantages";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingIncluded } from "@/components/pricing/PricingIncluded";
import { PricingPackagesSection } from "@/components/pricing/PricingPackagesSection";
import "@/components/pricing/pricing.css";
import type { Locale } from "@/i18n/routing";
import { fetchPricingCatalog } from "@/lib/pricing/api";
import type { PackageComparePayload, PricingPackage } from "@/lib/pricing/types";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;

  return buildPageMetadata({
    pageKey: "pricing",
    pathname: "/pricing",
    locale,
  });
}

export default async function PricingPage() {
  let initialPackages: PricingPackage[] = [];
  let initialCompare: PackageComparePayload | null = null;
  let initialError = false;

  try {
    const catalog = await fetchPricingCatalog(
      { billingInterval: "monthly" },
      { server: true },
    );
    initialPackages = catalog.packages;
    initialCompare = catalog.compare;
  } catch {
    initialError = true;
  }

  return (
    <div className="pricing-page">
      <PricingHero />
      <PricingPackagesSection
        initialPackages={initialPackages}
        initialCompare={initialCompare}
        initialError={initialError}
      />
      <PricingAdvantages />
      <PricingIncluded />
    </div>
  );
}
