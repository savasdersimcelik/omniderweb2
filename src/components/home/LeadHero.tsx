import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { HeroTrust } from "@/components/trust";
import { Link } from "@/i18n/navigation";

const floats = [
  { src: "/icons/platforms/whatsapp-business.png", label: "WhatsApp", slot: "nw" },
  { src: "/icons/platforms/instagram.png", label: "Instagram", slot: "ne" },
  { src: "/icons/platforms/linkedin.png", label: "LinkedIn", slot: "sw" },
  { src: "/icons/platforms/messenger.png", label: "Messenger", slot: "se" },
  { src: "/icons/platforms/tiktok.png", label: "TikTok", slot: "n" },
  { src: "/icons/platforms/telegram.png", label: "Telegram", slot: "n3" },
  { src: "/icons/platforms/facebook.svg", label: "Facebook", slot: "s" },
  { src: "/icons/platforms/webchat.svg", label: "Web chat", slot: "s2" },
  { src: "/icons/platforms/gmail.png", label: "Gmail", slot: "w", wide: true },
  { src: "/icons/platforms/email.png", label: "E-posta", slot: "e", wide: true },
  { src: "/icons/platforms/line.png", label: "LINE", slot: "w2", wide: true },
  { src: "/icons/platforms/google-business.png", label: "Google", slot: "e2", wide: true },
];

export async function LeadHero() {
  const t = await getTranslations("HomePage.lead");
  const nav = await getTranslations("Nav");

  return (
    <section className="home-lead" aria-labelledby="home-lead-title">
      <div className="home-lead__field" aria-hidden>
        {floats.map((icon, index) => (
          <span
            key={icon.label}
            className={`home-lead__float home-lead__float--${icon.slot}${icon.wide ? " home-lead__float--wide" : ""}`}
            style={{ animationDelay: `${-index * 0.7}s` }}
          >
            <Image src={icon.src} alt="" width={28} height={28} />
          </span>
        ))}
      </div>
      <Container className="home-lead__layout">
        <div className="home-lead__copy">
          <HeroTrust className="home-lead__trust" />
          <h1 id="home-lead-title" className="home-lead__title">
            <span>{t("titleLine1")}</span>
            <span>{t("titleLine2")}</span>
          </h1>
          <p className="home-lead__body">{t("body")}</p>
          <div className="home-lead__actions">
            <DemoRequestButton source="home-lead" className="btn-primary">
              {t("cta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </DemoRequestButton>
            <Link href="/register" className="home-lead__ghost">
              {nav("startFree")}
            </Link>
          </div>
        </div>

        <div className="home-lead__visual">
          <Image
            src="/images/home/lead-cutout.png"
            alt=""
            width={409}
            height={610}
            priority
            className="home-lead__person"
          />
        </div>
      </Container>
    </section>
  );
}
