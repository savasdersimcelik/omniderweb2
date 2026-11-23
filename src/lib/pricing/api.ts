import { getOmniderApiUrl } from "@/lib/site";
import { sortPackages } from "./format";
import type {
  BillingInterval,
  PackageComparePayload,
  PricingPackage,
  PricingQuery,
} from "./types";

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  message?: string | null;
};

function buildQuery({ billingInterval }: PricingQuery) {
  const params = new URLSearchParams({
    billing_interval: billingInterval,
    ai_credits_included: "true",
  });
  return params.toString();
}

async function fetchPricingJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const base = getOmniderApiUrl();
  const response = await fetch(`${base}${path}`, {
    headers: { Accept: "application/json", ...(init?.headers || {}) },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Pricing request failed (${response.status})`);
  }

  const json = (await response.json()) as ApiEnvelope<T>;
  if (!json || json.data === undefined) {
    throw new Error("Pricing response missing data");
  }
  return json.data;
}

function catalogInit(server: boolean): RequestInit | undefined {
  if (!server) return undefined;
  return { next: { revalidate: 60 } } as RequestInit;
}

export async function fetchPackages(
  query: PricingQuery,
  options: { server?: boolean } = {},
): Promise<PricingPackage[]> {
  const data = await fetchPricingJson<PricingPackage[]>(
    `/pricing/packages?${buildQuery(query)}`,
    catalogInit(options.server !== false && typeof window === "undefined"),
  );
  return sortPackages(Array.isArray(data) ? data : []);
}

export async function fetchPackageCompare(
  query: PricingQuery,
  options: { server?: boolean } = {},
): Promise<PackageComparePayload> {
  const data = await fetchPricingJson<PackageComparePayload>(
    `/pricing/packages/compare?${buildQuery(query)}`,
    catalogInit(options.server !== false && typeof window === "undefined"),
  );
  return {
    ...data,
    packages: sortPackages(data.packages || []),
  };
}

export async function fetchPricingCatalog(
  query: PricingQuery,
  options: { server?: boolean } = {},
) {
  const [packages, compare] = await Promise.all([
    fetchPackages(query, options),
    fetchPackageCompare(query, options).catch(() => null),
  ]);
  return { packages, compare };
}

export function registerHref(
  packageCode: string,
  billingInterval: BillingInterval,
) {
  const params = new URLSearchParams({
    package_code: packageCode,
    billing_interval: billingInterval,
    ai_credits_included: "true",
  });
  return `/register?${params.toString()}`;
}
