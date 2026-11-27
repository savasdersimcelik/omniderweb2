import "./telegram-colors.css";

import { AiAutomationSection } from "./AiAutomationSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ChatflowSection } from "./ChatflowSection";
import { ConnectSection } from "./ConnectSection";
import { InboxSection } from "./InboxSection";
import { InteractiveSection } from "./InteractiveSection";
import { ModesSection } from "./ModesSection";
import { TelegramHero } from "./TelegramHero";
import { TrySection } from "./TrySection";

export async function TelegramPage() {
  return (
    <div className="tg-page-atmosphere tg-page">
      <TelegramHero />
      <InboxSection />
      <ConnectSection />
      <ModesSection />
      <InteractiveSection />
      <AiAutomationSection />
      <ChatflowSection />
      <AnalyticsSection />
      <TrySection />
    </div>
  );
}
