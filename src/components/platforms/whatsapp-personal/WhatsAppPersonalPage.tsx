import "./whatsapp-personal-colors.css";
import "./whatsapp-personal-ai-chatflow.css";

import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { CatalogSection } from "./CatalogSection";
import { ChatflowSection } from "./ChatflowSection";
import { ConnectSection } from "./ConnectSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { TrySection } from "./TrySection";
import { WhatsAppInboxSection } from "../whatsapp-business/WhatsAppInboxSection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <div className="wa-page-atmosphere wa-personal-page">
      <WhatsAppPersonalHero />
      <WhatsAppInboxSection
        namespace="PlatformWhatsAppPersonal"
        platformIcon="/icons/platforms/whatsapp-personal.png"
      />
      <ConnectSection />
      <RichMessagesSection />
      <AiAutomationSection />
      <ChatflowSection />
      <CatalogSection />
      <AnalyticsSection />
      <TrySection />
    </div>
  );
}
