import { AdReferralSection } from "./AdReferralSection";
import { ConnectSection } from "./ConnectSection";
import { HealthSection } from "./HealthSection";
import { InteractiveSection } from "./InteractiveSection";
import { MidCtaSection } from "./MidCtaSection";
import { PerformanceSection } from "./PerformanceSection";
import { TemplatesSection } from "./TemplatesSection";
import { TrySection } from "./TrySection";
import { WhatsAppBusinessHero } from "./WhatsAppBusinessHero";
import { WhatsAppInboxSection } from "./WhatsAppInboxSection";

export async function WhatsAppBusinessPage() {
  return (
    <>
      <WhatsAppBusinessHero />
      <WhatsAppInboxSection namespace="PlatformWhatsAppBusiness" />
      <ConnectSection />
      <PerformanceSection />
      <InteractiveSection />
      <HealthSection />
      <MidCtaSection />
      <TemplatesSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
