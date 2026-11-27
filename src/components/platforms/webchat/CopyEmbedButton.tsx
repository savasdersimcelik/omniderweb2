"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function CopyEmbedButton({ code }: { code: string }) {
  const t = useTranslations("PlatformWebchat.install");
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button type="button" onClick={copy}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === "copied" ? t("copied") : t("copy")}
      </button>
      <span role="status" className={status === "failed" ? "w-full font-normal text-indigo-200" : "sr-only"}>
        {status === "copied" && t("copied")}
        {status === "failed" && t("copyFailed")}
      </span>
    </>
  );
}
