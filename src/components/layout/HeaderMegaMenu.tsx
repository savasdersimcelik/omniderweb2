"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BoxesIcon,
  Building2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  HexagonIcon,
  LayoutGridIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { NavMega } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { NavIcon } from "./NavIcon";

type HeaderMegaMenuProps = {
  entry: NavMega;
  open: boolean;
  onOpen: () => void;
};

export function HeaderMegaMenu({ entry, open, onOpen }: HeaderMegaMenuProps) {
  const t = useTranslations("Nav");

  return (
    <li className="relative">
      <button
        type="button"
        className={cn(
          "header-nav-link inline-flex items-center gap-1",
          open && "is-active",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onMouseEnter={onOpen}
        onFocus={onOpen}
        onClick={onOpen}
      >
        {t(entry.key)}
        <ChevronDownIcon
          className={cn(
            "h-3.5 w-3.5 opacity-55 transition-transform duration-200",
            open && "rotate-180 opacity-100",
          )}
        />
      </button>
    </li>
  );
}

type MegaPanelProps = {
  entry: NavMega;
};

export function MegaPanel({ entry }: MegaPanelProps) {
  const t = useTranslations("Nav");

  return (
    <div className="header-mega absolute inset-x-0 top-full z-50 pt-0">
      <div className="header-mega-panel container-header overflow-hidden">
        <div
          className={
            entry.layout === "platforms" ||
            entry.layout === "products" ||
            entry.layout === "industries" ||
            entry.layout === "resources"
              ? "p-0"
              : "px-4 py-6 sm:px-6 lg:px-8 lg:py-7"
          }
        >
          {entry.layout === "products" ? (
            <ProductsLayout entry={entry} t={t} />
          ) : null}
          {entry.layout === "industries" ? (
            <IndustriesLayout entry={entry} t={t} />
          ) : null}
          {entry.layout === "platforms" ? (
            <PlatformsLayout entry={entry} t={t} />
          ) : null}
          {entry.layout === "resources" ? (
            <ResourcesLayout entry={entry} t={t} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

type TNav = ReturnType<typeof useTranslations<"Nav">>;

function ProductsLayout({ entry, t }: { entry: NavMega; t: TNav }) {
  const platformGroup = entry.groups?.find((group) => group.key === "platform");
  const servicesGroup = entry.groups?.find((group) => group.key === "services");
  const appsGroup = entry.groups?.find((group) => group.key === "apps");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <BoxesIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {t("productsBrand")}
            </p>
            <p className="text-xs leading-5 text-ink-subtle lg:whitespace-nowrap">
              {t("productsTagline")}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
          <ZapIcon className="h-3.5 w-3.5" />
          {t("productsBadge")}
        </span>
      </div>

      <div className="grid gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(14rem,0.85fr)_minmax(0,1.35fr)] lg:gap-6 lg:py-5">
        {entry.featured ? (
          <div className="relative min-h-56 overflow-hidden rounded-2xl ring-1 ring-brand-100 lg:min-h-full">
            <Image
              src={entry.featured.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 360px"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/88 to-white/35" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase shadow-sm">
                <SparklesIcon className="h-3 w-3" />
                {t("featured")}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {t(`items.${entry.featured.key}`)}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-5 text-ink-subtle">
                  {t(`items.${entry.featured.descriptionKey}`)}
                </p>
                <span className="mt-4 inline-flex w-fit cursor-default items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_10px_30px_-12px_rgba(79,70,229,0.95)]">
                  {entry.featured.ctaKey
                    ? t(entry.featured.ctaKey)
                    : t("exploreProduct")}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="min-w-0 space-y-5">
          {platformGroup ? (
            <div>
              <p className="mega-label pb-2.5">
                {t(`groups.${platformGroup.key}`)}
              </p>
              <div className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
                {platformGroup.items.map((item) => (
                  <div
                    key={item.key}
                    className="group/item flex cursor-default items-start gap-3 rounded-xl px-1.5 py-2.5 transition hover:bg-surface-subtle"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <NavIcon name={item.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-sm font-semibold text-ink transition group-hover/item:text-brand-700">
                        {t(`items.${item.key}`)}
                      </span>
                      {item.descriptionKey ? (
                        <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
                          {t(`items.${item.descriptionKey}`)}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {servicesGroup ? (
            <div>
              <p className="mega-label pb-2.5">
                {t(`groups.${servicesGroup.key}`)}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {servicesGroup.items.map((item) => (
                  <div
                    key={item.key}
                    className="group/item flex cursor-default items-start gap-2.5 rounded-xl px-3 py-2.5 ring-1 ring-line transition hover:bg-surface-subtle hover:ring-brand-100"
                  >
                    <NavIcon
                      name={item.icon}
                      className="h-7 w-7 text-brand-600 transition group-hover/item:text-brand-700"
                    />
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-sm font-semibold text-ink transition group-hover/item:text-brand-700">
                        {t(`items.${item.key}`)}
                      </span>
                      {item.descriptionKey ? (
                        <span className="mt-0.5 block text-xs leading-4 text-ink-subtle">
                          {t(`items.${item.descriptionKey}`)}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {appsGroup ? (
        <div className="flex flex-col gap-4 border-t border-line bg-surface-subtle/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-line">
              <LayoutGridIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">
                {t(`groups.${appsGroup.key}`)}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-ink-subtle">
                {t("groups.appsDesc")}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:justify-end">
            {appsGroup.items.map((item) => (
              <div
                key={item.key}
                className="flex w-14 flex-col items-center gap-1.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white ring-1 ring-line shadow-sm">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px] object-contain"
                      unoptimized
                    />
                  ) : (
                    <NavIcon
                      name={item.icon}
                      className="h-7 w-7 text-ink-muted"
                    />
                  )}
                </span>
                <span className="text-[11px] font-medium text-ink-subtle">
                  {t(`items.${item.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function IndustriesLayout({ entry, t }: { entry: NavMega; t: TNav }) {
  const sectors = entry.sectors ?? [];
  const [activeKey, setActiveKey] = useState(sectors[0]?.key ?? "");

  useEffect(() => {
    if (!sectors.some((sector) => sector.key === activeKey)) {
      setActiveKey(sectors[0]?.key ?? "");
    }
  }, [sectors, activeKey]);

  const active = sectors.find((sector) => sector.key === activeKey) ?? sectors[0];

  if (!active) return null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Building2Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {t("industriesBrand")}
            </p>
            <p className="text-xs leading-5 text-ink-subtle lg:whitespace-nowrap">
              {t("industriesTagline")}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
          <ZapIcon className="h-3.5 w-3.5" />
          {t("industriesBadge")}
        </span>
      </div>

      <div className="grid gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[13.5rem_minmax(0,1fr)_minmax(12rem,0.72fr)] lg:gap-8 lg:py-5">
        <div>
          <p className="mega-label pb-3">{t("sectorsLabel")}</p>
          <div className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {sectors.map((sector) => {
              const selected = sector.key === active.key;
              return (
                <button
                  key={sector.key}
                  type="button"
                  className={cn(
                    "flex min-w-max items-center justify-between gap-2 px-1 py-2.5 text-left text-sm font-semibold transition",
                    selected
                      ? "text-brand-700"
                      : "text-ink-muted hover:text-ink",
                  )}
                  onMouseEnter={() => setActiveKey(sector.key)}
                  onFocus={() => setActiveKey(sector.key)}
                  onClick={() => setActiveKey(sector.key)}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <NavIcon
                      name={sector.icon}
                      className={cn(
                        "h-8 w-8",
                        selected ? "text-brand-700" : "text-ink-faint",
                      )}
                    />
                    {t(`sectors.${sector.key}`)}
                  </span>
                  <ChevronRightIcon
                    className={cn(
                      "hidden h-4 w-4 shrink-0 lg:block",
                      selected ? "text-brand-600" : "text-transparent",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mega-label pb-3">{t(`sectors.${active.key}`)}</p>
          <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-2">
            {active.items.map((item) => (
              <div
                key={item.key}
                className="flex cursor-default items-center gap-2.5 px-1 py-2 transition hover:text-brand-700"
              >
                <NavIcon name={item.icon} className="h-7 w-7 text-ink-subtle" />
                <span className="text-sm font-semibold text-ink">
                  {t(`items.${item.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {active.image ? (
          <div className="relative hidden min-h-[18rem] overflow-hidden rounded-2xl lg:block">
            <Image
              key={active.image}
              src={active.image}
              alt=""
              fill
              className="object-cover"
              sizes="280px"
              unoptimized
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-5 pt-20">
              <p className="text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase">
                {t("sectorsLabel")}
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {t(`sectors.${active.key}`)}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PlatformsLayout({ entry, t }: { entry: NavMega; t: TNav }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <HexagonIcon className="h-4 w-4 fill-brand-600/15" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {t("platformsBrand")}
            </p>
            <p className="text-xs leading-5 text-ink-subtle lg:whitespace-nowrap">
              {t("platformsTagline")}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
          <ZapIcon className="h-3.5 w-3.5" />
          {t("platformsBadge")}
        </span>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(15rem,0.78fr)] lg:gap-7 lg:py-6">
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
            {entry.items?.map((item) => (
              <div
                key={item.key}
                className="group/item flex cursor-default items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface-subtle"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-line shadow-sm">
                  <NavIcon name={item.icon} className="h-7 w-7" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-sm font-semibold text-ink transition group-hover/item:text-brand-700">
                    {t(`items.${item.key}`)}
                  </span>
                  {item.descriptionKey ? (
                    <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
                      {t(`items.${item.descriptionKey}`)}
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>

          <span className="mt-5 inline-flex cursor-default items-center gap-1.5 text-sm font-semibold text-brand-700">
            {t("viewAllChannels")}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>

        {entry.featured ? (
          <div className="relative hidden min-h-full overflow-hidden rounded-2xl ring-1 ring-brand-100 lg:block">
            <Image
              src={entry.featured.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="320px"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/88 to-white/35" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase shadow-sm">
                <SparklesIcon className="h-3 w-3" />
                {t("featured")}
              </span>
              <div>
                <h4 className="text-2xl font-semibold tracking-tight text-ink">
                  {t("platformsSpotlightLead")}{" "}
                  <span className="text-brand-600">
                    {t("platformsSpotlightAccent")}
                  </span>
                </h4>
                <p className="mt-1.5 text-sm leading-5 text-ink-subtle">
                  {t(`items.${entry.featured.descriptionKey}`)}
                </p>
                <span className="mt-4 inline-flex w-fit cursor-default items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_10px_30px_-12px_rgba(79,70,229,0.9)]">
                  {entry.featured.ctaKey
                    ? t(entry.featured.ctaKey)
                    : t("viewAllPlatforms")}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ResourcesLayout({ entry, t }: { entry: NavMega; t: TNav }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <BookOpenIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {t("resourcesBrand")}
            </p>
            <p className="text-xs leading-5 text-ink-subtle lg:whitespace-nowrap">
              {t("resourcesTagline")}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
          <ZapIcon className="h-3.5 w-3.5" />
          {t("resourcesBadge")}
        </span>
      </div>

      <div className="grid gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(14rem,0.85fr)_minmax(0,1.35fr)] lg:gap-6 lg:py-5">
        {entry.featured ? (
          <div className="relative min-h-56 overflow-hidden rounded-2xl ring-1 ring-brand-100 lg:min-h-full">
            <Image
              src={entry.featured.image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 360px"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/75 to-white/15" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase shadow-sm">
                <SparklesIcon className="h-3 w-3" />
                {t("featured")}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {t(`items.${entry.featured.key}`)}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-5 text-ink-subtle">
                  {t(`items.${entry.featured.descriptionKey}`)}
                </p>
                <span className="mt-4 inline-flex w-fit cursor-default items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_10px_30px_-12px_rgba(79,70,229,0.95)]">
                  {entry.featured.ctaKey
                    ? t(entry.featured.ctaKey)
                    : t("openDocs")}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="min-w-0 grid gap-5 sm:grid-cols-2">
          {entry.groups?.map((group) => (
            <div key={group.key}>
              <p className="mega-label pb-2.5">{t(`groups.${group.key}`)}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="group/item flex cursor-default items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface-subtle"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <NavIcon name={item.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-ink transition group-hover/item:text-brand-700">
                          {t(`items.${item.key}`)}
                        </span>
                        {item.badgeKey ? (
                          <span className="text-[10px] font-bold tracking-wide text-brand-600 uppercase">
                            {t(item.badgeKey)}
                          </span>
                        ) : null}
                      </span>
                      {item.descriptionKey ? (
                        <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
                          {t(`items.${item.descriptionKey}`)}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
