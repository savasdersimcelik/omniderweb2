import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import {
  AppointmentWidget,
  type AppointmentSlot,
} from "./AppointmentWidget";

export async function AppointmentSection() {
  const t = await getTranslations("HomePage.appointments");
  const nav = await getTranslations("Nav");
  const slots = t.raw("slots") as AppointmentSlot[];
  const weekdays = t.raw("weekdays") as string[];

  return (
    <section id="appointments" className="home-section--plain">
      <Container className="section">
        <div className="appointment-layout">
          <div className="appointment-copy">
              <p className="appointment-copy__eyebrow">
                <span className="appointment-copy__mark">
                  <CalendarDays className="size-3.5" />
                </span>
                {t("eyebrow")}
              </p>
              <h2 className="heading-section appointment-copy__title">
                <span className="text-ink">{t("title")}</span>
                <span className="appointment-copy__accent block text-ink-subtle">
                  {t("titleAccent")}
                </span>
              </h2>
              <p className="text-body appointment-copy__desc">{t("description")}</p>
              <div className="appointment-copy__actions">
                <DemoRequestButton
                  source="home-appointments"
                  className="btn-primary"
                >
                  {t("ctaPrimary")}
                  <ArrowUpRight className="size-4" aria-hidden />
                </DemoRequestButton>
                <Link href="/register" id="cta-register" className="btn-secondary">
                  {nav("startFree")}
                </Link>
              </div>
            </div>

            <AppointmentWidget
              monthLabel={t("monthLabel")}
              weekdays={weekdays}
              selectedWeekday={t("selectedWeekday")}
              selectedDate={t("selectedDate")}
              bookLabel={t("bookLabel")}
              slots={slots}
            />
        </div>
      </Container>
    </section>
  );
}
