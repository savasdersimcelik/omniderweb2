"use client";

import {
  ATTRIBUTION_PARAMS,
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_TTL_MS,
  type Attribution,
} from "./params";

type StoredAttribution = Attribution & {
  expires_at: number;
};

function readStored(): StoredAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed?.expires_at || Date.now() > parsed.expires_at) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStored(attribution: Attribution) {
  const payload: StoredAttribution = {
    ...attribution,
    expires_at: Date.now() + ATTRIBUTION_TTL_MS,
  };

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(payload));
}

function extractFromSearch(search: string): Partial<Attribution> {
  const params = new URLSearchParams(search);
  const result: Partial<Attribution> = {};

  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key)?.trim();
    if (value) {
      result[key] = value.slice(0, 200);
    }
  }

  return result;
}

/**
 * Capture first-touch UTM / click IDs once, keep for ATTRIBUTION_TTL_MS.
 * Later navigations with new UTMs do not overwrite (same as omniderweb session).
 */
export function captureAttributionFromLocation() {
  if (typeof window === "undefined") return;

  const existing = readStored();
  if (existing) return;

  const fromQuery = extractFromSearch(window.location.search);
  const hasMarketing = ATTRIBUTION_PARAMS.some((key) => Boolean(fromQuery[key]));

  const attribution: Attribution = {
    ...Object.fromEntries(ATTRIBUTION_PARAMS.map((key) => [key, fromQuery[key] ?? null])),
    landing_url: window.location.href.slice(0, 2000),
    referrer: document.referrer ? document.referrer.slice(0, 2000) : null,
    captured_at: new Date().toISOString(),
  };

  // Always capture first page as landing, even without UTM params.
  // If there are no marketing params and no referrer, still store for conversion_url pairing.
  if (!hasMarketing && !attribution.referrer) {
    writeStored(attribution);
    return;
  }

  writeStored(attribution);
}

export function getAttribution(): Attribution | null {
  const stored = readStored();
  if (!stored) return null;

  const { expires_at: _expires, ...attribution } = stored;
  return attribution;
}

export function getAttributionForSubmit(): Attribution {
  const stored = getAttribution();
  if (stored) return stored;

  // Fallback: capture current page if nothing stored yet
  captureAttributionFromLocation();
  return (
    getAttribution() || {
      landing_url: typeof window !== "undefined" ? window.location.href : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      captured_at: new Date().toISOString(),
    }
  );
}
