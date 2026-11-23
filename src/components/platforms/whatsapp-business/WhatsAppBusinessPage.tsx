import { AdReferralSection } from "./AdReferralSection";
import { HealthSection } from "./HealthSection";
import { InteractiveSection } from "./InteractiveSection";
import { TemplatesSection } from "./TemplatesSection";
import { TrySection } from "./TrySection";
import { WhatsAppBusinessHero } from "./WhatsAppBusinessHero";

export async function WhatsAppBusinessPage() {
  return (
    <>
      <WhatsAppBusinessHero />
      <TemplatesSection />
      <InteractiveSection />
      <HealthSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
