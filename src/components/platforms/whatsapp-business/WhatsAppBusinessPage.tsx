import { AdReferralSection } from "./AdReferralSection";
import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { CampaignsSection } from "./CampaignsSection";
import { ChatflowSection } from "./ChatflowSection";
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
      <ChatflowSection />
      <HealthSection />
      <TemplatesSection />
      <CampaignsSection />
      <AdReferralSection />
      <AnalyticsSection />
      <TrySection />
    </div>
  );
}
