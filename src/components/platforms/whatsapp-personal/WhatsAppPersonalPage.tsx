import { CatalogSection } from "./CatalogSection";
import { ConnectSection } from "./ConnectSection";
import { MidCtaSection } from "./MidCtaSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { SharedContactsSection } from "./SharedContactsSection";
import { TrySection } from "./TrySection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <>
      <WhatsAppPersonalHero />
      <ConnectSection />
      <RichMessagesSection />
      <MidCtaSection />
      <CatalogSection />
      <SharedContactsSection />
      <TrySection />
    </>
  );
}
