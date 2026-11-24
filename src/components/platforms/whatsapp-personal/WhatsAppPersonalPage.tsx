import { CatalogSection } from "./CatalogSection";
import { ConnectSection } from "./ConnectSection";
import { MidCtaSection } from "./MidCtaSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { SharedContactsSection } from "./SharedContactsSection";
import { StatsSection } from "./StatsSection";
import { TrySection } from "./TrySection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <>
      <WhatsAppPersonalHero />
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
