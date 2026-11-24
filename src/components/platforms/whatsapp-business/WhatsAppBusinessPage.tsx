import { AdReferralSection } from "./AdReferralSection";
import { ConnectSection } from "./ConnectSection";
import { HealthSection } from "./HealthSection";
import { InteractiveSection } from "./InteractiveSection";
import { MidCtaSection } from "./MidCtaSection";
import { TemplatesSection } from "./TemplatesSection";
import { TrySection } from "./TrySection";
import { WhatsAppBusinessHero } from "./WhatsAppBusinessHero";

export async function WhatsAppBusinessPage() {
  return (
    <>
      <WhatsAppBusinessHero />
      <ConnectSection />
      <InteractiveSection />
      <MidCtaSection />
      <TemplatesSection />
      <HealthSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
