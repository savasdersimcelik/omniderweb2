"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ParsedCountry } from "react-international-phone";
import { OmniderAuthMark } from "@/components/auth/OmniderAuthMark";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { PhoneField } from "@/components/auth/PhoneField";
import { NexusAuthShell } from "@/components/ui/nexus-3d-animated-login-futuristic-authentication-ui";
import { colors } from "@/config/colors";
import { Link, useRouter } from "@/i18n/navigation";
import {
  authFetch,
  messageFromAuth,
  resolvePartnerFromBrowser,
  startOAuth,
} from "@/lib/auth/api";
import { cn } from "@/lib/utils";

function waitForNavigation() {
  return new Promise<void>(() => {});
}

function splitPhone(e164: string, country: ParsedCountry | null) {
  const dial = country?.dialCode?.trim() ?? "";
  if (!dial) return { dial: "", national: "" };
  const digits = e164.replace(/\D/g, "");
  const dialDigits = dial.replace(/\D/g, "");
  const national = digits.startsWith(dialDigits)
    ? digits.slice(dialDigits.length)
    : digits;
  return { dial: dialDigits, national };
}

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15";

export function RegisterScreen() {
  const t = useTranslations("Auth.register");
  const tc = useTranslations("Auth.common");
  const tb = useTranslations("Auth.brand");
  const locale = useLocale();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<ParsedCountry | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthBusy, setOauthBusy] = useState<"google" | "facebook" | null>(
    null,
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    if (password.length < 8) {
      setError(tc("errorPasswordShort"));
      return;
    }

    const { dial, national } = splitPhone(phone, phoneCountry);

    if (!national || !dial) {
      setError(tc("errorPhoneInvalid"));
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        phone: national,
        password,
        phone_prefix: `+${dial}`,
        language_code: locale,
        currency_code: locale === "tr" ? "TRY" : "USD",
      };

      const partnerRef = resolvePartnerFromBrowser();
      if (partnerRef) {
        payload.ref = partnerRef;
      }

      const { ok, json } = await authFetch("/auth/register", { body: payload });

      if (ok && json?.success) {
        router.push(
          `/register/verify-email?email=${encodeURIComponent(email.trim())}`,
        );
        return waitForNavigation();
      }

      setError(messageFromAuth(json, tc("errorGeneric")));
    } catch {
      setError(tc("errorNetwork"));
    } finally {
      setLoading(false);
    }
  }

  async function onOAuth(provider: "google" | "facebook") {
    setOauthBusy(provider);
    startOAuth(provider);
    return waitForNavigation();
  }

  return (
    <NexusAuthShell
      brandName="Omnider"
      brandLabel={t("title")}
      brandSubtitle={t("subtitle")}
      logo={<OmniderAuthMark />}
      eyebrow={tb("eyebrow")}
      headline={tb("headline")}
      tagline={tb("tagline")}
      accentColor={colors.brand[600]}
      show3DScene
      footer={
        <p className="text-center text-sm text-muted-foreground">
          {t("haveAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--nx-accent)] hover:underline"
          >
            {t("loginLink")}
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="text-sm font-medium">
            {tc("name")}
          </label>
          <input
            id="reg-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder={tc("namePlaceholder")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="text-sm font-medium">
            {tc("email")}
          </label>
          <input
            id="reg-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={tc("emailPlaceholder")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reg-phone" className="text-sm font-medium">
            {tc("phone")}
          </label>
          <PhoneField
            id="reg-phone"
            value={phone}
            required
            onChange={(next, country) => {
              setPhone(next);
              setPhoneCountry(country);
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reg-password" className="text-sm font-medium">
            {tc("password")}
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(inputClass, "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? tc("hidePassword") : tc("showPassword")}
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" aria-hidden />
              ) : (
                <Eye className="size-[18px]" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {t.rich("termsNote", {
            terms: (chunks) => (
              <a
                href="/terms-of-use"
                className="font-semibold text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
            privacy: (chunks) => (
              <a
                href="/privacy-policy"
                className="font-semibold text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "btn-primary w-full justify-center py-3.5",
            loading && "pointer-events-none opacity-70",
          )}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {tc("loading")}
            </span>
          ) : (
            t("submit")
          )}
        </button>

        <OAuthButtons
          googleLabel={tc("google")}
          facebookLabel={tc("facebook")}
          dividerLabel={tc("orEmail")}
          loading={loading}
          busy={oauthBusy}
          onGoogle={() => void onOAuth("google")}
          onFacebook={() => void onOAuth("facebook")}
        />
      </form>
    </NexusAuthShell>
  );
}
