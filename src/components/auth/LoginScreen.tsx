"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import NexusLogin, {
  type NexusLoginCredentials,
} from "@/components/ui/nexus-3d-animated-login-futuristic-authentication-ui";
import { colors } from "@/config/colors";
import { useRouter } from "@/i18n/navigation";
import {
  authFetch,
  goToPanel,
  messageFromAuth,
  startOAuth,
  type AuthSessionData,
} from "@/lib/auth/api";

function OmniderMark({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/icon-192.png"
      alt="Omnider"
      width={56}
      height={56}
      className={className ?? "h-full w-full object-contain"}
      priority
    />
  );
}

/** Keeps NexusLogin spinner until full-page navigation finishes. */
function waitForNavigation() {
  return new Promise<void>(() => {});
}

export function LoginScreen() {
  const t = useTranslations("Auth");
  const router = useRouter();

  return (
    <NexusLogin
      brandName="Omnider"
      logo={<OmniderMark className="h-full w-full object-contain" />}
      title={t("login.title")}
      description={t("login.subtitle")}
      emailLabel={t("common.email")}
      passwordLabel={t("common.password")}
      emailPlaceholder={t("common.emailPlaceholder")}
      passwordPlaceholder={t("common.passwordPlaceholder")}
      signInText={t("login.submit")}
      signingInText={t("login.submitting")}
      googleButtonText={t("common.google")}
      facebookButtonText={t("common.facebook")}
      rememberMeText={t("login.remember")}
      signupText={t("login.noAccount")}
      signupLinkText={t("login.registerLink")}
      forgotPasswordText={t("login.forgot")}
      dividerText={t("common.orEmail")}
      eyebrow={t("brand.eyebrow")}
      headline={t("brand.headline")}
      tagline={t("brand.tagline")}
      accentColor={colors.brand[600]}
      showSocialLogin
      showRememberMe
      showForgotPassword
      show3DScene
      enableAnimations
      enableMouseParallax
      onSubmit={async ({ email, password }: NexusLoginCredentials) => {
        const { ok, status, json } = await authFetch<AuthSessionData>(
          "/auth/login",
          {
            body: {
              email: email.trim(),
              password,
            },
          },
        );

        if (ok && json?.success && json.data?.token) {
          goToPanel(json.data.token);
          return waitForNavigation();
        }

        if (status === 403 && json?.data?.nextStep === "verify_email") {
          const verifyEmail = encodeURIComponent(
            json.data.email || email.trim(),
          );
          router.push(`/login/verify-email?email=${verifyEmail}`);
          return waitForNavigation();
        }

        throw new Error(
          messageFromAuth(json, t("common.errorGeneric")),
        );
      }}
      onGoogleLogin={async () => {
        startOAuth("google");
        return waitForNavigation();
      }}
      onFacebookLogin={async () => {
        startOAuth("facebook");
        return waitForNavigation();
      }}
      onForgotPassword={async (email) => {
        router.push(
          `/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`,
        );
      }}
      onSignup={() => {
        router.push("/register");
      }}
    />
  );
}
