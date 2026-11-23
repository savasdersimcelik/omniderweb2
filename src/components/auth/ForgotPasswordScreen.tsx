"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { OmniderAuthMark } from "@/components/auth/OmniderAuthMark";
import { NexusAuthShell } from "@/components/ui/nexus-3d-animated-login-futuristic-authentication-ui";
import { colors } from "@/config/colors";
import { Link } from "@/i18n/navigation";
import { authFetch, messageFromAuth } from "@/lib/auth/api";
import { cn } from "@/lib/utils";

export function ForgotPasswordScreen() {
  const t = useTranslations("Auth.forgot");
  const tc = useTranslations("Auth.common");
  const tb = useTranslations("Auth.brand");
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { ok, json } = await authFetch("/auth/forgot-password", {
        body: { email: email.trim() },
      });

      if (ok && json?.success) {
        setSuccess(messageFromAuth(json, t("success")));
        return;
      }

      setError(messageFromAuth(json, tc("errorGeneric")));
    } catch {
      setError(tc("errorNetwork"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <NexusAuthShell
      brandName="Omnider"
      logo={<OmniderAuthMark />}
      title={t("title")}
      description={t("subtitle")}
      eyebrow={tb("eyebrow")}
      headline={tb("headline")}
      tagline={tb("tagline")}
      accentColor={colors.brand[600]}
      footer={
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="font-semibold text-[var(--nx-accent)] hover:underline"
          >
            ← {t("backToLogin")}
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {success ? (
          <p
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-700"
            role="status"
          >
            {success}
          </p>
        ) : null}

        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="text-sm font-medium">
            {tc("email")}
          </label>
          <input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15"
            placeholder={tc("emailPlaceholder")}
          />
        </div>

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
      </form>
    </NexusAuthShell>
  );
}
