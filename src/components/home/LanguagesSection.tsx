import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { DemoRequestButton } from "@/components/demo";
import { Container } from "@/components/layout/Container";
import { WorldMap } from "@/components/ui/map";
import { Link } from "@/i18n/navigation";

const CITIES = [
  { key: "new-york", lat: 40.7128, lng: -74.006 },
  { key: "mexico-city", lat: 19.4326, lng: -99.1332 },
  { key: "sao-paulo", lat: -23.5505, lng: -46.6333 },
  { key: "berlin", lat: 52.52, lng: 13.405 },
  { key: "dubai", lat: 25.2048, lng: 55.2708 },
  { key: "tokyo", lat: 35.6762, lng: 139.6503 },
] as const;

const HUB = { lat: 41.0082, lng: 28.9784 };

export async function LanguagesSection() {
  const t = await getTranslations("HomePage.languages");
  const nav = await getTranslations("Nav");
  const hubLabel = t("hub");

  const places = {
    "new-york": t("places.new-york"),
    "mexico-city": t("places.mexico-city"),
    "sao-paulo": t("places.sao-paulo"),
    berlin: t("places.berlin"),
    dubai: t("places.dubai"),
    tokyo: t("places.tokyo"),
  };

  const dots = CITIES.map((city) => ({
    start: {
      lat: city.lat,
      lng: city.lng,
      label: places[city.key],
    },
    end: {
      lat: HUB.lat,
      lng: HUB.lng,
      label: hubLabel,
    },
  }));

  return (
    <section id="languages" className="languages-section home-section--plain">
      <Container className="section">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <span
              className="inline-block size-2 shrink-0 rounded-xs bg-brand-600"
              aria-hidden
            />
            {t("eyebrow")}
          </p>

          <h2 className="languages-title heading-section mt-3 max-w-full text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[clamp(1.65rem,2.15vw,2.55rem)] lg:whitespace-nowrap">
            <span className="text-ink">{t("title")}</span>{" "}
            <span className="text-ink-subtle">{t("titleAccent")}</span>
          </h2>

          <p className="text-body mt-4 max-w-2xl">{t("description")}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <DemoRequestButton source="home-languages" className="btn-primary">
              {t("ctaPrimary")}
              <ArrowUpRight className="size-4" aria-hidden />
            </DemoRequestButton>
            <Link href="/register" className="btn-secondary">
              {nav("startFree")}
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <WorldMap lineColor="#4f46e5" dots={dots} />
          <ul className="mt-4 flex list-none flex-wrap justify-center gap-2 p-0 sm:hidden">
            {CITIES.map((city) => (
              <li
                key={city.key}
                className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink"
              >
                {places[city.key]}
              </li>
            ))}
            <li className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              {hubLabel}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
