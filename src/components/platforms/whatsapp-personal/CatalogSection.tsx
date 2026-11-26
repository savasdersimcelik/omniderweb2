import Image from "next/image";
import {
  PackageIcon,
  RefreshCwIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";

const PRODUCT_IMAGE = "/images/platforms/instagram/comment-post.jpg";

const POINTS = [
  { id: "sync" as const, Icon: RefreshCwIcon },
  { id: "product" as const, Icon: PackageIcon },
  { id: "order" as const, Icon: ShoppingBagIcon },
];

type OrderLine = {
  name: string;
  price: string;
  qty: string;
};

export async function CatalogSection() {
  const t = await getTranslations("PlatformWhatsAppPersonal.catalog");
  const orderLines = (t.raw("widget.orderLines") as OrderLine[]).slice(0, 2);

  return (
    <section
      id="catalog"
      className="wap-catalog border-t border-line"
      aria-labelledby="wap-catalog-title"
    >
      <Container className="section">
        <div className="wap-catalog__layout">
          <div className="wap-catalog__copy">
            <p className="wa-section-label">
              <PackageIcon aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 id="wap-catalog-title" className="heading-section mt-3 text-balance">
              {t("title")}
            </h2>
            <p className="text-body mt-3 text-pretty">{t("subtitle")}</p>

            <ul className="wap-catalog__points">
              {POINTS.map(({ id, Icon }) => (
                <li key={id}>
                  <span className="wap-catalog__point-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.85} />
                  </span>
                  <div>
                    <p>{t(`items.${id}.title`)}</p>
                    <span>{t(`items.${id}.body`)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="wap-catalog__note">{t("note")}</p>
          </div>

          <aside className="wap-catalog__stage" aria-label={t("widget.title")}>
            <div className="wap-catalog__stage-bar">
              <span>{t("widget.synced")}</span>
              <span>{t("widget.orderRef")}</span>
            </div>

            <article className="wap-catalog__product">
              <div className="wap-catalog__product-media">
                <Image
                  src={PRODUCT_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                  unoptimized
                />
              </div>
              <div className="wap-catalog__product-copy">
                <p>{t("widget.productName")}</p>
                <span>
                  {t("widget.price")} · {t("widget.stock")}
                </span>
              </div>
              <span className="wap-catalog__product-cta">{t("widget.cta")}</span>
            </article>

            <p className="wap-catalog__bridge">{t("bridge")}</p>

            <article className="wap-catalog__order">
              <header className="wap-catalog__order-head">
                <div>
                  <p>{t("widget.orderTitle")}</p>
                  <span>{t("widget.orderCount")}</span>
                </div>
                <strong>{t("widget.orderTotal")}</strong>
              </header>

              <ul className="wap-catalog__order-list">
                {orderLines.map((line) => (
                  <li key={line.name}>
                    <span>{line.name}</span>
                    <span>
                      {line.qty} · {line.price}
                    </span>
                  </li>
                ))}
              </ul>

              <footer className="wap-catalog__order-foot">
                <span>{t("widget.orderTotalLabel")}</span>
                <strong>{t("widget.orderTotal")}</strong>
                <em>{t("widget.orderCta")}</em>
              </footer>
            </article>
          </aside>
        </div>
      </Container>
    </section>
  );
}
