import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
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

  return (
    <section id="appointments" className="appointment-section home-section--dotted">
      <Container className="section">
        <div className="mx-auto max-w-5xl space-y-5 text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2">
            <span
              className="inline-block size-2 shrink-0 rounded-xs bg-brand-600"
              aria-hidden
            />
            {t("eyebrow")}
          </p>

          <h2 className="home-section-title heading-section text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.45rem]">
            <span className="text-ink">{t("title")}</span>{" "}
            <span className="home-section-title__accent text-ink-subtle">
              {t("titleAccent")}
            </span>
          </h2>

          <p className="text-body mx-auto max-w-2xl">{t("description")}</p>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
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

        <div className="mt-10 lg:mt-14">
          <AppointmentWidget
            calendarTitle={t("calendarTitle")}
            calendarMeta={t("calendarMeta")}
            statusLabel={t("statusLabel")}
            slotsLabel={t("slotsLabel")}
            slotsNote={t("slotsNote")}
            slots={slots}
            chatCustomer={t("chatCustomer")}
            chatReply={t("chatReply")}
            bookedLabel={t("bookedLabel")}
            channelLabel={t("channelLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
