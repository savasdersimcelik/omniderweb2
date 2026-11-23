"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  Check,
  ChevronDown,
  Link2,
  LineChart,
  Minus,
  Sparkles,
  Store,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  formatMoney,
  formatQuota,
  formatQuotaWithUnit,
  isQuotaVisible,
  packageQuotas,
  type PackageQuotaKey,
} from "@/lib/pricing/format";
import type {
  BillingInterval,
  PackageComparePayload,
  PricingPackage,
} from "@/lib/pricing/types";

const MARKETPLACE_KEYS = [
  "amazon",
  "ciceksepeti",
  "hepsiburada",
  "ideasoft",
  "n11",
  "opencart",
  "pazarama",
  "pttavm",
  "shopify",
  "ticimax",
  "trendyol",
  "woocommerce",
] as const;

const SHORTENER_FEATURE_KEYS = [
  "retargeting",
  "deep_links",
  "custom_domains",
  "api",
  "white_label",
] as const;

const ANALYTICS_FEATURE_KEYS = [
  "heatmaps",
  "session_replay",
  "funnels",
  "api",
  "priority",
] as const;

/** Top “dahil kotalar” — mirrors tenantfront INCLUDED_COMPARE_ITEMS */
const INCLUDED_QUOTA_KEYS: PackageQuotaKey[] = [
  "channels",
  "virtualNumbers",
  "aiCredits",
  "outboundCallMinutes",
  "messages",
  "verificationCredits",
  "maxProducts",
  "maxOrdersMonth",
  "maxLinks",
  "maxClicks",
  "maxWebsites",
  "maxEventsMonth",
];

const STORAGE_QUOTA_KEYS: PackageQuotaKey[] = [
  "storageGb",
  "conversationHistoryDays",
  "storageHistoryDays",
];

const SHORTENER_DETAIL_KEYS: PackageQuotaKey[] = ["maxQr", "maxBio"];
const ANALYTICS_DETAIL_KEYS: PackageQuotaKey[] = [
  "maxReplays",
  "retentionDays",
];

const HIDDEN_LIMIT_KEYS = new Set([
  "channels",
  "virtual_numbers",
  "max_products",
  "max_orders_month",
  "conversation_history_days",
  "storage_history_days",
  "storage_gb",
  "max_links",
  "max_clicks",
  "max_qr",
  "max_bio",
  "max_websites",
  "max_events_month",
  "max_replays",
  "retention_days",
]);

const MESSAGING_FEATURE_ORDER = [
  "shared_inbox",
  "crm",
  "knowledge_base",
  "ai_auto_reply",
  "ai_assistant",
  "chatflow",
  "campaigns",
  "appointments",
  "reports",
  "contact_import",
  "contact_export",
  "contact_verification",
  "api_access",
  "webhook_access",
  "priority_support",
  "ios_app",
  "android_app",
  "marketplace",
] as const;

type Props = {
  compareData: PackageComparePayload | null;
  packages: PricingPackage[];
  billing: BillingInterval;
  currency: string;
};

function packageHasMarketplace(pkg: PricingPackage | undefined, key: string) {
  const service = pkg?.services?.marketplace;
  if (Array.isArray(service?.platforms) && service.platforms.length > 0) {
    return service.enabled === true && service.platforms.includes(key);
  }
  return (
    pkg?.features?.marketplace === true &&
    (MARKETPLACE_KEYS as readonly string[]).includes(key)
  );
}

export function PricingCompareTable({
  compareData,
  packages,
  billing,
  currency,
}: Props) {
  const t = useTranslations("PricingPage.packages");
  const locale = useLocale();
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [marketplacesOpen, setMarketplacesOpen] = useState(false);
  const [shortenerOpen, setShortenerOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const pkgList = useMemo(() => {
    const source =
      compareData?.packages?.length ? compareData.packages : packages;
    return [...source].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    );
  }, [compareData, packages]);

  const pkgByCode = useMemo(
    () => Object.fromEntries(packages.map((pkg) => [pkg.code, pkg])),
    [packages],
  );

  const includedQuotaKeys = useMemo(
    () =>
      INCLUDED_QUOTA_KEYS.filter((key) =>
        pkgList.some((pkg) =>
          isQuotaVisible(key, packageQuotas(pkgByCode[pkg.code] || pkg)),
        ),
      ),
    [pkgList, pkgByCode],
  );

  const storageQuotaKeys = useMemo(
    () =>
      STORAGE_QUOTA_KEYS.filter((key) =>
        pkgList.some((pkg) =>
          isQuotaVisible(key, packageQuotas(pkgByCode[pkg.code] || pkg)),
        ),
      ),
    [pkgList, pkgByCode],
  );

  const shortenerDetailKeys = useMemo(
    () =>
      SHORTENER_DETAIL_KEYS.filter((key) =>
        pkgList.some((pkg) =>
          isQuotaVisible(key, packageQuotas(pkgByCode[pkg.code] || pkg)),
        ),
      ),
    [pkgList, pkgByCode],
  );

  const analyticsDetailKeys = useMemo(
    () =>
      ANALYTICS_DETAIL_KEYS.filter((key) =>
        pkgList.some((pkg) =>
          isQuotaVisible(key, packageQuotas(pkgByCode[pkg.code] || pkg)),
        ),
      ),
    [pkgList, pkgByCode],
  );

  const visibleLimits = useMemo(() => {
    const rows = compareData?.comparison?.limits || [];
    return rows.filter(
      (row) =>
        !HIDDEN_LIMIT_KEYS.has(row.limit_key) &&
        pkgList.some((pkg) => (row.packages?.[pkg.code] ?? 0) > 0),
    );
  }, [compareData, pkgList]);

  const messagingFeatures = useMemo(() => {
    const fromApi = (compareData?.comparison?.features || []).map(
      (row) => row.feature_key,
    );
    const ordered = MESSAGING_FEATURE_ORDER.filter((key) =>
      fromApi.includes(key),
    );
    const extras = fromApi.filter(
      (key) =>
        !MESSAGING_FEATURE_ORDER.includes(
          key as (typeof MESSAGING_FEATURE_ORDER)[number],
        ) && key !== "marketplace",
    );
    return [...ordered, ...extras];
  }, [compareData]);

  const featureMap = useMemo(() => {
    const map = new Map<string, Record<string, boolean | number | null | undefined>>();
    for (const row of compareData?.comparison?.features || []) {
      map.set(row.feature_key, row.packages || {});
    }
    return map;
  }, [compareData]);

  const marketplaceKeys = useMemo(() => {
    const fromServices = [
      ...new Set(
        pkgList.flatMap(
          (pkg) =>
            (pkgByCode[pkg.code] || pkg).services?.marketplace?.platforms || [],
        ),
      ),
    ];
    if (fromServices.length > 0) return fromServices;
    const anyMarketplace = pkgList.some((pkg) => {
      const full = pkgByCode[pkg.code] || pkg;
      return (
        full.services?.marketplace?.enabled === true ||
        full.features?.marketplace === true
      );
    });
    return anyMarketplace ? [...MARKETPLACE_KEYS] : [];
  }, [pkgList, pkgByCode]);

  const showShortener = pkgList.some((pkg) => {
    const full = pkgByCode[pkg.code] || pkg;
    return (
      full.services?.shortener?.enabled === true ||
      (full.limits?.max_links ?? 0) > 0
    );
  });

  const showAnalytics = pkgList.some((pkg) => {
    const full = pkgByCode[pkg.code] || pkg;
    return (
      full.services?.analytics?.enabled === true ||
      (full.limits?.max_websites ?? 0) > 0
    );
  });

  if (pkgList.length <= 1) return null;

  const colSpan = pkgList.length + 1;
  const messagingCount =
    storageQuotaKeys.length + visibleLimits.length + messagingFeatures.length;

  return (
    <div className="pricing-compare">
      <div className="pricing-section-head pricing-section-head--center">
        <h3 className="pricing-section-title pricing-section-title--sm">
          {t("compare.title")}
        </h3>
        <p className="pricing-section-subtitle">{t("compare.subtitle")}</p>
      </div>

      <div className="pricing-compare__scroll">
        <table className="pricing-compare__table">
          <thead>
            <tr>
              <th scope="col">{t("compare.featureColumn")}</th>
              {pkgList.map((pkg) => (
                <th
                  key={pkg.code}
                  scope="col"
                  className={pkg.is_featured ? "is-featured" : undefined}
                >
                  <div className="pricing-compare__pkg-head">
                    <span>{t(`names.${pkg.code}` as "names.basic")}</span>
                    <span className="pricing-compare__pkg-price">
                      {formatMoney(pkg.selected_price_minor, currency, locale)}
                      <span>
                        {billing === "yearly"
                          ? t("card.perYear")
                          : t("card.perMonth")}
                      </span>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {includedQuotaKeys.length > 0 ? (
              <>
                <SectionLabel
                  icon={<BarChart3 className="size-3.5" aria-hidden />}
                  label={t("compare.quotasSection")}
                  colSpan={colSpan}
                />
                {includedQuotaKeys.map((key) => (
                  <QuotaRow
                    key={key}
                    label={t(`quotas.${key}`)}
                    unit={
                      key === "storageGb"
                        ? t("quotas.gbUnit")
                        : key === "conversationHistoryDays" ||
                            key === "storageHistoryDays" ||
                            key === "retentionDays"
                          ? t("quotas.dayUnit")
                          : null
                    }
                    packages={pkgList}
                    pkgByCode={pkgByCode}
                    quotaKey={key}
                  />
                ))}
              </>
            ) : null}

            {messagingCount > 0 ? (
              <>
                <CompareSectionToggle
                  icon={<Sparkles className="size-3.5" aria-hidden />}
                  label={t("compare.featuresSection")}
                  open={messagingOpen}
                  onToggle={() => setMessagingOpen((v) => !v)}
                  count={messagingCount}
                  colSpan={colSpan}
                  expandLabel={t("compare.expand")}
                  collapseLabel={t("compare.collapse")}
                />
                {messagingOpen ? (
                  <>
                    {storageQuotaKeys.map((key) => (
                      <QuotaRow
                        key={key}
                        label={t(`quotas.${key}`)}
                        unit={
                          key === "storageGb"
                            ? t("quotas.gbUnit")
                            : t("quotas.dayUnit")
                        }
                        packages={pkgList}
                        pkgByCode={pkgByCode}
                        quotaKey={key}
                      />
                    ))}
                    {visibleLimits.map((row) => (
                      <tr key={row.limit_key}>
                        <th scope="row">
                          {t(`limits.${row.limit_key}` as "limits.order_syncs")}
                        </th>
                        {pkgList.map((pkg) => {
                          const qty = row.packages?.[pkg.code] ?? 0;
                          return (
                            <td
                              key={pkg.code}
                              className={
                                pkg.is_featured ? "is-featured" : undefined
                              }
                            >
                              {qty > 0 ? (
                                <span className="pricing-compare__pill">
                                  {formatQuota(qty)}
                                </span>
                              ) : (
                                <Minus className="pricing-compare__no" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {messagingFeatures.map((feature) => (
                      <FeatureRow
                        key={feature}
                        label={t(`features.${feature}` as "features.crm")}
                        packages={pkgList}
                        included={(pkg) => {
                          const cell = featureMap.get(feature)?.[pkg.code];
                          if (cell != null) return cell === true;
                          return (
                            (pkgByCode[pkg.code] || pkg).features?.[feature] ===
                            true
                          );
                        }}
                      />
                    ))}
                  </>
                ) : null}
              </>
            ) : null}

            {marketplaceKeys.length > 0 ? (
              <>
                <CompareSectionToggle
                  icon={<Store className="size-3.5" aria-hidden />}
                  label={t("compare.marketplacesSection")}
                  open={marketplacesOpen}
                  onToggle={() => setMarketplacesOpen((v) => !v)}
                  count={marketplaceKeys.length}
                  colSpan={colSpan}
                  expandLabel={t("compare.expand")}
                  collapseLabel={t("compare.collapse")}
                />
                {marketplacesOpen
                  ? marketplaceKeys.map((key) => (
                      <FeatureRow
                        key={key}
                        label={t(`marketplaces.${key}` as "marketplaces.shopify")}
                        packages={pkgList}
                        included={(pkg) =>
                          packageHasMarketplace(pkgByCode[pkg.code] || pkg, key)
                        }
                      />
                    ))
                  : null}
              </>
            ) : null}

            {showShortener ? (
              <>
                <CompareSectionToggle
                  icon={<Link2 className="size-3.5" aria-hidden />}
                  label={t("compare.shortenerSection")}
                  open={shortenerOpen}
                  onToggle={() => setShortenerOpen((v) => !v)}
                  count={
                    shortenerDetailKeys.length + SHORTENER_FEATURE_KEYS.length
                  }
                  colSpan={colSpan}
                  expandLabel={t("compare.expand")}
                  collapseLabel={t("compare.collapse")}
                />
                {shortenerOpen ? (
                  <>
                    {shortenerDetailKeys.map((key) => (
                      <QuotaRow
                        key={key}
                        label={t(`quotas.${key}`)}
                        packages={pkgList}
                        pkgByCode={pkgByCode}
                        quotaKey={key}
                      />
                    ))}
                    {SHORTENER_FEATURE_KEYS.map((feature) => (
                      <FeatureRow
                        key={`shortener-${feature}`}
                        label={t(`shortenerFeatures.${feature}`)}
                        packages={pkgList}
                        included={(pkg) => {
                          const full = pkgByCode[pkg.code] || pkg;
                          return (
                            full.services?.shortener?.enabled === true &&
                            full.services?.shortener?.features?.[feature] ===
                              true
                          );
                        }}
                      />
                    ))}
                  </>
                ) : null}
              </>
            ) : null}

            {showAnalytics ? (
              <>
                <CompareSectionToggle
                  icon={<LineChart className="size-3.5" aria-hidden />}
                  label={t("compare.analyticsSection")}
                  open={analyticsOpen}
                  onToggle={() => setAnalyticsOpen((v) => !v)}
                  count={
                    analyticsDetailKeys.length + ANALYTICS_FEATURE_KEYS.length
                  }
                  colSpan={colSpan}
                  expandLabel={t("compare.expand")}
                  collapseLabel={t("compare.collapse")}
                />
                {analyticsOpen ? (
                  <>
                    {analyticsDetailKeys.map((key) => (
                      <QuotaRow
                        key={key}
                        label={t(`quotas.${key}`)}
                        unit={
                          key === "retentionDays" ? t("quotas.dayUnit") : null
                        }
                        packages={pkgList}
                        pkgByCode={pkgByCode}
                        quotaKey={key}
                      />
                    ))}
                    {ANALYTICS_FEATURE_KEYS.map((feature) => (
                      <FeatureRow
                        key={`analytics-${feature}`}
                        label={t(`analyticsFeatures.${feature}`)}
                        packages={pkgList}
                        included={(pkg) => {
                          const full = pkgByCode[pkg.code] || pkg;
                          return (
                            full.services?.analytics?.enabled === true &&
                            full.services?.analytics?.features?.[feature] ===
                              true
                          );
                        }}
                      />
                    ))}
                  </>
                ) : null}
              </>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionLabel({
  icon,
  label,
  colSpan,
}: {
  icon?: ReactNode;
  label: string;
  colSpan: number;
}) {
  return (
    <tr className="pricing-compare__section">
      <td colSpan={colSpan}>
        <span className="pricing-compare__section-label">
          {icon}
          {label}
        </span>
      </td>
    </tr>
  );
}

function CompareSectionToggle({
  icon,
  label,
  open,
  onToggle,
  count,
  colSpan,
  expandLabel,
  collapseLabel,
}: {
  icon?: ReactNode;
  label: string;
  open: boolean;
  onToggle: () => void;
  count: number;
  colSpan: number;
  expandLabel: string;
  collapseLabel: string;
}) {
  return (
    <tr className="pricing-compare__section pricing-compare__section--toggle">
      <td colSpan={colSpan}>
        <button
          type="button"
          className="pricing-compare__toggle"
          onClick={onToggle}
          aria-expanded={open}
        >
          <span className="pricing-compare__section-label">
            {icon}
            {label}
          </span>
          <span className="pricing-compare__toggle-meta">
            <span className="pricing-compare__count">{count}</span>
            <span className="pricing-compare__toggle-text">
              {open ? collapseLabel : expandLabel}
            </span>
            <ChevronDown
              className={`size-4 pricing-compare__chevron${open ? " is-open" : ""}`}
              aria-hidden
            />
          </span>
        </button>
      </td>
    </tr>
  );
}

function QuotaRow({
  label,
  unit,
  packages,
  pkgByCode,
  quotaKey,
}: {
  label: string;
  unit?: string | null;
  packages: PricingPackage[];
  pkgByCode: Record<string, PricingPackage>;
  quotaKey: PackageQuotaKey;
}) {
  return (
    <tr>
      <th scope="row">{label}</th>
      {packages.map((pkg) => {
        const quotas = packageQuotas(pkgByCode[pkg.code] || pkg);
        const value = quotas[quotaKey];
        const show = isQuotaVisible(quotaKey, quotas);
        return (
          <td
            key={pkg.code}
            className={pkg.is_featured ? "is-featured" : undefined}
          >
            {show ? (
              <span className="pricing-compare__pill">
                {formatQuotaWithUnit(value, unit)}
              </span>
            ) : (
              <Minus className="pricing-compare__no" aria-hidden />
            )}
          </td>
        );
      })}
    </tr>
  );
}

function FeatureRow({
  label,
  packages,
  included,
}: {
  label: string;
  packages: PricingPackage[];
  included: (pkg: PricingPackage) => boolean;
}) {
  return (
    <tr>
      <th scope="row">{label}</th>
      {packages.map((pkg) => {
        const on = included(pkg);
        return (
          <td
            key={pkg.code}
            className={pkg.is_featured ? "is-featured" : undefined}
          >
            {on ? (
              <Check className="pricing-compare__yes" aria-label="yes" />
            ) : (
              <Minus className="pricing-compare__no" aria-label="no" />
            )}
          </td>
        );
      })}
    </tr>
  );
}
