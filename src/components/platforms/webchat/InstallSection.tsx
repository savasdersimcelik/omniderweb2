import { CodeXml } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { getOmniderApiUrl } from "@/lib/site";
import { CopyEmbedButton } from "./CopyEmbedButton";

const steps = ["create", "embed", "test"] as const;

export async function InstallSection() {
  const t = await getTranslations("PlatformWebchat.install");
  const embed = `<script src="${getOmniderApiUrl()}/webchat/widget.js?key=CHANNEL_UUID" async></script>`;

  return (
    <section id="webchat-install" className="wc-feature border-t border-line" aria-labelledby="wc-install-title">
      <Container className="section wc-feature-grid">
        <div className="wc-feature-copy">
          <h2 id="wc-install-title" className="heading-section text-balance">{t("title")}</h2>
          <ol className="wc-install-steps">
            {steps.map((step) => (
              <li key={step}>
                <strong>{t(`steps.${step}.title`)}</strong>
                <p className="text-body">{t(`steps.${step}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="wc-install-code">
          <div className="wc-install-code-header">
            <div><CodeXml size={20} aria-hidden="true" />{t("codeLabel")}</div>
            <CopyEmbedButton code={embed} />
          </div>
          <pre><code>{embed}</code></pre>
          <p>{t("keyHint")}</p>
        </div>
      </Container>
    </section>
  );
}
