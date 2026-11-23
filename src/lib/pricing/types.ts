export type BillingInterval = "monthly" | "yearly";

export type PackagePricing = {
  currency: string;
  monthly_minor: number;
  monthly_no_ai_minor?: number;
  yearly_minor: number;
  yearly_no_ai_minor?: number;
  yearly_discount_percent?: number;
};

export type PackageLimits = {
  channels?: number;
  marketplaces?: number;
  virtual_numbers?: number;
  conversation_history_days?: number;
  storage_gb?: number;
  [key: string]: number | undefined;
};

export type PackageFeatures = Record<string, boolean>;

export type PackageServiceBlock = {
  enabled?: boolean;
  platforms?: string[];
  features?: Record<string, boolean>;
};

export type PackageServices = {
  shortener?: PackageServiceBlock;
  analytics?: PackageServiceBlock;
  marketplace?: PackageServiceBlock;
};

export type PricingPackage = {
  code: string;
  sort_order?: number;
  is_featured?: boolean;
  badge_slug?: string | null;
  currency?: string;
  pricing: PackagePricing;
  usage?: {
    included_messages?: number;
    included_ai_credits?: number;
    included_outbound_call_seconds?: number;
    included_verification_credits?: number;
  };
  limits?: PackageLimits;
  features?: PackageFeatures;
  services?: PackageServices;
  selected_price_minor: number;
  selected_ai_credits_included?: boolean;
  selected_billing_interval?: BillingInterval;
  selected_included_messages?: number;
  selected_included_ai_credits?: number;
  selected_included_outbound_call_seconds?: number;
  selected_included_verification_credits?: number;
  public_metadata?: {
    theme_slug?: string;
    recommended_for_slug?: string;
  };
};

export type CompareLimitRow = {
  limit_key: string;
  packages: Record<string, number>;
};

export type CompareFeatureRow = {
  feature_key: string;
  packages: Record<string, boolean | number | null | undefined>;
};

export type PackageComparePayload = {
  packages: PricingPackage[];
  billing_interval?: BillingInterval;
  comparison?: {
    limits?: CompareLimitRow[];
    features?: CompareFeatureRow[];
  };
};

export type PricingQuery = {
  billingInterval: BillingInterval;
};
