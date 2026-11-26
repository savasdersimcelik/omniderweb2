import { AdReferralSection } from "./AdReferralSection";
import { AiAutomationSection } from "./AiAutomationSection";
import { ConnectSection } from "./ConnectSection";
import { HealthSection } from "./HealthSection";
import { InteractiveSection } from "./InteractiveSection";
import { TemplatesSection } from "./TemplatesSection";
import { TrySection } from "./TrySection";
import { WhatsAppBusinessHero } from "./WhatsAppBusinessHero";
import { WhatsAppInboxSection } from "./WhatsAppInboxSection";

export async function WhatsAppBusinessPage() {
  return (
    <div className="wa-page-atmosphere wa-biz-page">
      <WhatsAppBusinessHero />
      <WhatsAppInboxSection namespace="PlatformWhatsAppBusiness" />
      <ConnectSection />
      <InteractiveSection />
      <AiAutomationSection />
      <HealthSection />
      <TemplatesSection />
      <AdReferralSection />
      <TrySection />
    </div>
  );
}
