import { CatalogSection } from "./CatalogSection";
import { ConnectSection } from "./ConnectSection";
import { MidCtaSection } from "./MidCtaSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { SharedContactsSection } from "./SharedContactsSection";
import { StatsSection } from "./StatsSection";
import { TrySection } from "./TrySection";
import { WhatsAppInboxSection } from "../whatsapp-business/WhatsAppInboxSection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <>
      <WhatsAppPersonalHero />
      <WhatsAppInboxSection
        namespace="PlatformWhatsAppPersonal"
        platformIcon="/icons/platforms/whatsapp-personal.png"
      />
      <ConnectSection />
      <StatsSection
        id="personal-stats"
        namespace="PlatformWhatsAppPersonal.stats"
      />
      <RichMessagesSection />
      <MidCtaSection />
      <CatalogSection />
      <SharedContactsSection />
      <TrySection />
    </>
  );
}
