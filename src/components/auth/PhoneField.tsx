"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  type ParsedCountry,
} from "react-international-phone";
import "react-international-phone/style.css";

type Props = {
  id: string;
  value: string;
  onChange: (phone: string, country: ParsedCountry) => void;
  required?: boolean;
};

/** PhoneInput uses Date.now() — mount only after hydration to avoid prerender block. */
export function PhoneField({ id, value, onChange, required }: Props) {
  const locale = useLocale();
  const [ready, setReady] = useState(false);

  const defaultCountry = useMemo(() => {
    const preferred = locale === "tr" ? "tr" : "us";
    const exists = defaultCountries.some((entry) => {
      const parsed = parseCountry(entry);
      return parsed.iso2 === preferred;
    });
    return exists ? preferred : "tr";
  }, [locale]);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        className="h-11 w-full animate-pulse rounded-xl border border-border bg-muted/60"
        aria-hidden
      />
    );
  }

  return (
    <PhoneInput
      defaultCountry={defaultCountry}
      value={value}
      onChange={(next, meta) => {
        onChange(next, meta.country);
      }}
      forceDialCode
      inputProps={{
        id,
        required,
        autoComplete: "tel",
        name: "phone",
      }}
      className="auth-phone-input"
    />
  );
}
