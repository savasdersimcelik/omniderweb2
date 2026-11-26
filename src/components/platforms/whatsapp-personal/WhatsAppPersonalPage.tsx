import { CatalogSection } from "./CatalogSection";
import { ConnectSection } from "./ConnectSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { SharedContactsSection } from "./SharedContactsSection";
import { TrySection } from "./TrySection";
import { WhatsAppInboxSection } from "../whatsapp-business/WhatsAppInboxSection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <div className="wa-page-atmosphere">
      <WhatsAppPersonalHero />
      <WhatsAppInboxSection
        namespace="PlatformWhatsAppPersonal"
        platformIcon="/icons/platforms/whatsapp-personal.png"
      />
      <ConnectSection />
      <RichMessagesSection />
      <CatalogSection />
      <SharedContactsSection />
      <TrySection />
    </div>
  );
}
