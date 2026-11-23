import type { PricingPackage } from "./types";

const HIGHLIGHT_FEATURES = [
  "crm",
  "knowledge_base",
  "campaigns",
  "appointments",
  "marketplace",
  "api_access",
  "priority_support",
] as const;

export function formatMoney(
  minor: number,
  currency = "USD",
  locale = "en",
): string {
  const amount = (Number(minor) || 0) / 100;
  try {
    return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
  }
}

/** Always show a monthly figure; yearly billing divides the period total by 12. */
export function monthlyDisplayMinor(
  selectedPriceMinor: number,
  billing: "monthly" | "yearly",
): number {
  const minor = Number(selectedPriceMinor) || 0;
  if (billing !== "yearly") return minor;
  return Math.round(minor / 12);
}

export function formatQuota(value: number | null | undefined): string {
  if (value == null) return "—";
  if (Number(value) === -1) return "∞";
  return new Intl.NumberFormat("en-US").format(Number(value));
}

function readLimit(pkg: PricingPackage, key: string): number {
  const raw = Number(pkg.limits?.[key]);
  return Number.isFinite(raw) ? raw : 0;
}

export function packageQuotas(pkg: PricingPackage) {
  const outboundSeconds =
    pkg.selected_included_outbound_call_seconds ??
    pkg.usage?.included_outbound_call_seconds ??
    0;

  return {
    channels: readLimit(pkg, "channels"),
    messages:
      pkg.selected_included_messages ?? pkg.usage?.included_messages ?? 0,
    aiCredits:
      pkg.selected_included_ai_credits ??
      pkg.usage?.included_ai_credits ??
      0,
    verificationCredits:
      pkg.selected_included_verification_credits ??
      pkg.usage?.included_verification_credits ??
      0,
    outboundCallMinutes: Math.floor(Number(outboundSeconds) / 60) || 0,
    virtualNumbers: readLimit(pkg, "virtual_numbers"),
    maxProducts: readLimit(pkg, "max_products"),
    maxOrdersMonth: readLimit(pkg, "max_orders_month"),
    storageGb: readLimit(pkg, "storage_gb"),
    conversationHistoryDays: readLimit(pkg, "conversation_history_days"),
    storageHistoryDays: readLimit(pkg, "storage_history_days"),
    maxLinks: readLimit(pkg, "max_links"),
    maxClicks: readLimit(pkg, "max_clicks"),
    maxQr: readLimit(pkg, "max_qr"),
    maxBio: readLimit(pkg, "max_bio"),
    maxWebsites: readLimit(pkg, "max_websites"),
    maxEventsMonth: readLimit(pkg, "max_events_month"),
    maxReplays: readLimit(pkg, "max_replays"),
    retentionDays: readLimit(pkg, "retention_days"),
  };
}

export type PackageQuotaKey = keyof ReturnType<typeof packageQuotas>;

export function isQuotaVisible(
  key: PackageQuotaKey,
  quotas: ReturnType<typeof packageQuotas>,
): boolean {
  const value = quotas[key];
  return value != null && Number(value) !== 0;
}

export function formatQuotaWithUnit(
  value: number | null | undefined,
  unit?: string | null,
): string {
  const formatted = formatQuota(value);
  if (!unit || formatted === "—" || formatted === "∞") return formatted;
  return `${formatted} ${unit}`;
}

export function highlightFeatures(pkg: PricingPackage): string[] {
  const features = pkg.features || {};
  return HIGHLIGHT_FEATURES.filter((key) => features[key] === true);
}

export function yearlyDiscountPercent(packages: PricingPackage[]): number {
  const first = packages.find(
    (pkg) => (pkg.pricing?.yearly_discount_percent ?? 0) > 0,
  );
  return first?.pricing?.yearly_discount_percent ?? 20;
}

export function sortPackages(packages: PricingPackage[]): PricingPackage[] {
  return [...packages].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
}

