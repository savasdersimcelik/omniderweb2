import Image from "next/image";
import { PackageIcon, ShoppingBagIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const PRODUCT_IMAGE = "/images/platforms/instagram/comment-post.jpg";

type OrderLine = {
  name: string;
  price: string;
  qty: string;
};

export async function CatalogSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.catalog");
  const orderLines = t.raw("widget.orderLines") as OrderLine[];

  return (
    <section
      id="catalog"
      className="wap-catalog border-t border-line bg-surface-subtle/40"
      aria-labelledby="wap-catalog-title"
    >
      <Container className="section">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center justify-center gap-2 text-[var(--wa-teal)]">
            <PackageIcon className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </p>
          <h2 id="wap-catalog-title" className="heading-section mt-3">
            {t("title")}
          </h2>
          <p className="text-body mt-4">{t("subtitle")}</p>
        </header>

        <div className="wap-catalog__grid mt-10">
          <article className="wap-catalog__card">
            <div className="wap-catalog__card-copy">
              <p className="wap-catalog__badge">
                <PackageIcon className="h-3.5 w-3.5" />
                {t("items.product.title")}
              </p>
              <h3 className="wap-catalog__card-title">
                {t("items.product.title")}
              </h3>
              <p className="wap-catalog__card-desc">{t("items.product.body")}</p>
            </div>

            <div className="wap-catalog__panel">
              <div className="overflow-hidden rounded-xl ring-1 ring-line">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image
                    src={PRODUCT_IMAGE}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                    unoptimized
                  />
                </div>
                <div className="bg-white p-3">
                  <p className="text-sm font-semibold text-ink">
                    {t("widget.productName")}
                  </p>
                  <p className="mt-1 text-sm text-ink-subtle">
                    {t("widget.price")} · {t("widget.stock")}
                  </p>
                  <span className="mt-3 inline-flex rounded-lg bg-[color-mix(in_srgb,var(--wa-green)_12%,white)] px-3 py-1.5 text-xs font-bold text-[var(--wa-teal)]">
                    {t("widget.cta")}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-[var(--wa-teal)]">
                {t("widget.synced")}
              </p>
            </div>
          </article>

          <article className="wap-catalog__card">
            <div className="wap-catalog__card-copy">
              <p className="wap-catalog__badge">
                <ShoppingBagIcon className="h-3.5 w-3.5" />
                {t("items.order.title")}
              </p>
              <h3 className="wap-catalog__card-title">
                {t("items.order.title")}
              </h3>
              <p className="wap-catalog__card-desc">{t("items.order.body")}</p>
            </div>

            <div className="wap-catalog__panel">
              <div className="wap-catalog__order">
                <div className="wap-catalog__order-head">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {t("widget.orderTitle")}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">
                      {t("widget.orderRef")}
                    </p>
                  </div>
                  <span className="wap-catalog__order-pill">
                    {t("widget.orderCount")}
                  </span>
                </div>

                <ul className="wap-catalog__order-list">
                  {orderLines.map((line) => (
                    <li key={line.name} className="wap-catalog__order-row">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={PRODUCT_IMAGE}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">
                          {line.name}
                        </p>
                        <p className="text-xs text-ink-subtle">
                          {line.qty} · {line.price}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-ink">
                        {line.price}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="wap-catalog__order-foot">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-ink-faint">
                      {t("widget.orderTotalLabel")}
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {t("widget.orderTotal")}
                    </span>
                  </div>
                  <span className="wap-catalog__order-cta">
                    {t("widget.orderCta")}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">{t("note")}</p>
      </Container>
    </section>
  );
}
