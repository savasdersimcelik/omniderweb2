import { ConnectSection } from "./ConnectSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { ModesSection } from "./ModesSection";
import { TeamSection } from "./TeamSection";
import { TelegramHero } from "./TelegramHero";
import { TrySection } from "./TrySection";

export async function TelegramPage() {
  return (
    <div className="tg-page-atmosphere">
      <TelegramHero />
      <InboxSection />
      <ModesSection />
      <InteractiveSection />
      <ConnectSection />
      <TeamSection />
      <TrySection />
    </div>
  );
}
