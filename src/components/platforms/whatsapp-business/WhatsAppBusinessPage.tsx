import { AdReferralSection } from "./AdReferralSection";
import { ConnectSection } from "./ConnectSection";
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
      <ConnectSection />
      <InteractiveSection />
      <HealthSection />
      <AdReferralSection />
      <TrySection />
    </>
  );
}
