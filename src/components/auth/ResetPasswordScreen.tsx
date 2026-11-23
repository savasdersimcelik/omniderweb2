"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { OmniderAuthMark } from "@/components/auth/OmniderAuthMark";
import { NexusAuthShell } from "@/components/ui/nexus-3d-animated-login-futuristic-authentication-ui";
import { colors } from "@/config/colors";
import { Link, useRouter } from "@/i18n/navigation";
import { authFetch, messageFromAuth } from "@/lib/auth/api";
import { cn } from "@/lib/utils";

export function ResetPasswordScreen() {
  const t = useTranslations("Auth.reset");
  const tc = useTranslations("Auth.common");
  const tb = useTranslations("Auth.brand");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading || success) return;

    setError("");
    setSuccess("");

    if (!token) {
      setError(tc("errorTokenMissing"));
      return;
    }
    if (password.length < 8) {
      setError(tc("errorPasswordShort"));
      return;
    }
    if (password !== passwordConfirm) {
      setError(tc("errorPasswordMismatch"));
      return;
    }

    setLoading(true);
    try {
      const { ok, json } = await authFetch("/auth/reset-password", {
        body: { token, password },
      });

      if (ok && json?.success) {
        setSuccess(messageFromAuth(json, t("success")));
        setTimeout(() => {
          router.push("/login");
        }, 1600);
        return;
      }

      setError(messageFromAuth(json, tc("errorGeneric")));
    } catch {
      setError(tc("errorNetwork"));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-border bg-background px-3.5 pr-11 text-sm outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15";

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
          <label htmlFor="reset-password" className="text-sm font-medium">
            {tc("password")}
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? tc("hidePassword") : tc("showPassword")}
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" aria-hidden />
              ) : (
                <Eye className="size-[18px]" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reset-password-confirm" className="text-sm font-medium">
            {tc("passwordConfirm")}
          </label>
          <div className="relative">
            <input
              id="reset-password-confirm"
              type={showPasswordConfirm ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm((v) => !v)}
              aria-label={
                showPasswordConfirm ? tc("hidePassword") : tc("showPassword")
              }
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPasswordConfirm ? (
                <EyeOff className="size-[18px]" aria-hidden />
              ) : (
                <Eye className="size-[18px]" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
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
