import { CatalogSection } from "./CatalogSection";
import { ConnectSection } from "./ConnectSection";
import { RichMessagesSection } from "./RichMessagesSection";
import { SessionSection } from "./SessionSection";
import { SharedContactsSection } from "./SharedContactsSection";
import { TrySection } from "./TrySection";
import { WhatsAppPersonalHero } from "./WhatsAppPersonalHero";

export async function WhatsAppPersonalPage() {
  return (
    <>
      <WhatsAppPersonalHero />
      <ConnectSection />
      <RichMessagesSection />
      <CatalogSection />
      <SharedContactsSection />
      <SessionSection />
      <TrySection />
    </>
  );
}
