/** Marketing / click-id params — keep in sync with omniderweb UtmAttributionService */
export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_device",
  "utm_network",
  "gclid",
  "fbclid",
  "gad_source",
  "gad_campaignid",
  "msclkid",
  "ttclid",
] as const;

export type AttributionParam = (typeof ATTRIBUTION_PARAMS)[number];

export type Attribution = {
  [K in AttributionParam]?: string | null;
} & {
  landing_url?: string | null;
  referrer?: string | null;
  captured_at?: string | null;
};

/** First-touch window: 30 days (survives navigation + return visits) */
export const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const ATTRIBUTION_STORAGE_KEY = "omnider.attribution.v1";
