"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigation, type NavMega } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DemoRequestButton } from "@/components/demo";
import { HeaderMegaMenu, MegaPanel } from "./HeaderMegaMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavIcon } from "./NavIcon";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMega) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMega(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMega]);

  const megaEntries = navigation.filter(
    (entry): entry is NavMega => entry.kind === "mega",
  );
  const activeMega = megaEntries.find((entry) => entry.key === openMega);

  return (
    <>
      <header
        className={cn(
          "site-header sticky top-0 z-50",
          scrolled && "is-scrolled",
          openMega && "is-mega-open",
        )}
      >
        <div
          className="relative"
          onMouseLeave={() => setOpenMega(null)}
        >
          <nav
            className="container-header flex h-14 items-center justify-between gap-3 lg:h-[4.25rem]"
            aria-label={t("main")}
          >
            <div className="flex min-w-0 items-center gap-6 xl:gap-8">
              <Link
                href="/"
                className="header-brand inline-flex shrink-0 items-center gap-2.5"
                aria-label="Omnider"
              >
                <Image
                  src="/icons/icon-192.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                  priority
                />
                <span className="header-wordmark">Omnider</span>
              </Link>

              <ul className="hidden items-center gap-0.5 xl:flex">
                {navigation.map((entry) => {
                  if (entry.kind === "mega") {
                    return (
                      <HeaderMegaMenu
                        key={entry.key}
                        entry={entry}
                        open={openMega === entry.key}
                        onOpen={() => setOpenMega(entry.key)}
                      />
                    );
                  }

                  return (
                    <li key={entry.key}>
                      <Link
                        href={entry.href}
                        className="header-nav-link"
                        onMouseEnter={() => setOpenMega(null)}
                      >
                        {t(entry.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <LanguageSwitcher className="hidden sm:flex" />

              <a
                href="#"
                className="header-cta-ghost hidden lg:inline-flex"
                onMouseEnter={() => setOpenMega(null)}
              >
                {t("login")}
              </a>
              <DemoRequestButton
                source="header"
                className="header-cta-primary hidden md:inline-flex"
                onMouseEnter={() => setOpenMega(null)}
              >
                {t("startFree")}
              </DemoRequestButton>

              <Sheet
                open={open}
                onOpenChange={(next) => {
                  setOpen(next);
                  if (!next) setMobileSub(null);
                }}
              >
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="header-menu-btn inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink ring-1 ring-line transition hover:bg-surface-subtle xl:hidden"
                    aria-label={t("openMenu")}
                  >
                    <MenuIcon className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[min(100%,22rem)] gap-0 p-0"
                >
                  <SheetHeader className="border-b border-line px-4 py-4 text-left">
                    <SheetTitle>{t("menu")}</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 overflow-y-auto px-3 py-3">
                    <nav
                      className="flex flex-col gap-0.5"
                      aria-label={t("main")}
                    >
                      {navigation.map((entry) => {
                        if (entry.kind === "link") {
                          return (
                            <Button
                              key={entry.key}
                              asChild
                              variant="ghost"
                              className="justify-start"
                              onClick={() => setOpen(false)}
                            >
                              <Link href={entry.href}>{t(entry.key)}</Link>
                            </Button>
                          );
                        }

                        const expanded = mobileSub === entry.key;

                        return (
                          <div key={entry.key}>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink hover:bg-surface-subtle"
                              aria-expanded={expanded}
                              onClick={() =>
                                setMobileSub(expanded ? null : entry.key)
                              }
                            >
                              {t(entry.key)}
                              <ChevronDownIcon
                                className={cn(
                                  "h-4 w-4 text-ink-subtle transition",
                                  expanded && "rotate-180 text-brand-600",
                                )}
                              />
                            </button>
                            {expanded ? (
                              <div className="ml-1 space-y-3 border-l border-line-subtle py-1 pl-3">
                                {entry.featured ? (
                                  <div className="rounded-xl bg-brand-50/80 px-3 py-3 ring-1 ring-brand-100">
                                    <p className="text-[11px] font-bold tracking-wider text-brand-700 uppercase">
                                      {t("spotlight")}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-ink">
                                      {t(`items.${entry.featured.key}`)}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-ink-subtle">
                                      {t(
                                        `items.${entry.featured.descriptionKey}`,
                                      )}
                                    </p>
                                  </div>
                                ) : null}
                                {entry.tabs
                                  ? entry.tabs.map((tab) => (
                                      <div
                                        key={tab.key}
                                        className="space-y-1"
                                      >
                                        <p className="px-2 text-[11px] font-bold tracking-wider text-ink-faint uppercase">
                                          {t(`tabs.${tab.key}`)}
                                        </p>
                                        <p className="px-2 pb-1 text-xs leading-5 text-ink-subtle">
                                          {t(`tabs.${tab.key}Desc`)}
                                        </p>
                                        {tab.items.map((item) => (
                                          <MobileItem
                                            key={item.key}
                                            title={t(`items.${item.key}`)}
                                            description={
                                              item.descriptionKey
                                                ? t(
                                                    `items.${item.descriptionKey}`,
                                                  )
                                                : undefined
                                            }
                                            icon={item.icon}
                                          />
                                        ))}
                                      </div>
                                    ))
                                  : entry.sectors
                                    ? entry.sectors.map((sector) => (
                                        <div
                                          key={sector.key}
                                          className="space-y-1"
                                        >
                                          <p className="px-2 text-[11px] font-bold tracking-wider text-ink-faint uppercase">
                                            {t(`sectors.${sector.key}`)}
                                          </p>
                                          {sector.items.map((item) => (
                                            <MobileItem
                                              key={item.key}
                                              title={t(`items.${item.key}`)}
                                              icon={item.icon}
                                            />
                                          ))}
                                        </div>
                                      ))
                                    : entry.groups
                                      ? entry.groups.map((group) => (
                                          <div
                                            key={group.key}
                                            className="space-y-1"
                                          >
                                            <p className="px-2 text-[11px] font-bold tracking-wider text-ink-faint uppercase">
                                              {t(`groups.${group.key}`)}
                                            </p>
                                            {group.items.map((item) => (
                                              <MobileItem
                                                key={item.key}
                                                title={t(`items.${item.key}`)}
                                                description={
                                                  item.descriptionKey
                                                    ? t(
                                                        `items.${item.descriptionKey}`,
                                                      )
                                                    : undefined
                                                }
                                                icon={item.icon}
                                              />
                                            ))}
                                          </div>
                                        ))
                                      : entry.items?.map((item) => (
                                          <MobileItem
                                            key={item.key}
                                            title={t(`items.${item.key}`)}
                                            icon={item.icon}
                                          />
                                        ))}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </nav>
                    <div className="space-y-2 border-t border-line pt-3">
                      <a
                        href="#"
                        className="btn-secondary w-full"
                        onClick={() => setOpen(false)}
                      >
                        {t("login")}
                      </a>
                      <DemoRequestButton
                        source="header-mobile"
                        className="btn-primary w-full"
                        onClick={() => setOpen(false)}
                      >
                        {t("startFree")}
                      </DemoRequestButton>
                    </div>
                    <LanguageSwitcher />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>

          {activeMega ? <MegaPanel entry={activeMega} /> : null}
        </div>
      </header>

      {openMega ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]"
          aria-label={t("closeMenu")}
          onClick={() => setOpenMega(null)}
        />
      ) : null}
    </>
  );
}

function MobileItem({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: string;
}) {
  return (
    <div className="flex cursor-default items-start gap-3 rounded-lg px-2 py-2">
      <NavIcon name={icon} className="h-8 w-8" />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{title}</span>
        {description ? (
          <span className="mt-0.5 block text-xs leading-5 text-ink-subtle">
            {description}
          </span>
        ) : null}
      </span>
    </div>
  );
}
