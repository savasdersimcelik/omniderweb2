"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Tabs } from "radix-ui";
import { CircleHelp, ClipboardList, MessageCircle, Search, Send, ShoppingBag, Truck } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

const tabs = [
  { id: "chat", Icon: MessageCircle },
  { id: "faq", Icon: CircleHelp },
  { id: "products", Icon: ShoppingBag },
  { id: "orders", Icon: ClipboardList },
] as const;
const faqIds = ["shipping", "returns", "payment"] as const;
const sampleOrder = "100245";

export type DemoProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
};

export function WidgetDemo({ products }: { products: DemoProduct[] }) {
  const t = useTranslations("PlatformWebchat.widgetDemo");
  const locale = useLocale();
  const focusComposer = useRef(false);
  const [tab, setTab] = useState<string>("chat");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(sampleOrder);
  const [orderResult, setOrderResult] = useState<"found" | "missing" | null>(null);
  const search = query.trim().toLocaleLowerCase(locale);
  const faqs = faqIds.filter((id) =>
    `${t(`faq.${id}.question`)} ${t(`faq.${id}.answer`)}`.toLocaleLowerCase(locale).includes(search),
  );

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;
    setMessages((previous) => [...previous, message]);
    setDraft("");
  }

  function askAboutProduct(name: string) {
    focusComposer.current = true;
    setDraft(t("productQuestion", { name }));
    setTab("chat");
  }

  return (
    <Tabs.Root className="wc-widget" value={tab} onValueChange={setTab}>
      <div className="wc-widget-header">
        <MessageCircle aria-hidden="true" size={23} />
        <div>
          <p className="wc-widget-title">{t("support")}</p>
          <p className="wc-widget-subtitle">{t("sampleStore")}</p>
        </div>
        <span className="wc-widget-demo-label">{t("demo")}</span>
      </div>
      <Tabs.List className="wc-widget-tabs" aria-label={t("tabsLabel")}>
        {tabs.map(({ id, Icon }) => (
          <Tabs.Trigger key={id} value={id}>
            <Icon size={18} aria-hidden="true" />
            {t(`tabs.${id}`)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="chat" className="wc-widget-panel">
        <div className="wc-widget-conversation" role="log" aria-label={t("tabs.chat")} ref={(element) => {
          if (element) element.scrollTop = element.scrollHeight;
        }}>
          <p className="wc-widget-bubble">{t("greeting")}</p>
          {messages.map((message, index) => (
            <div className="wc-widget-exchange" key={index}>
              <p className="wc-widget-bubble wc-widget-bubble-out">{message}</p>
              <p className="wc-widget-bubble">{t("demoReply")}</p>
            </div>
          ))}
        </div>
        <form className="wc-widget-form" onSubmit={sendMessage}>
          <input
            aria-label={t("message")}
            placeholder={t("message")}
            value={draft}
            maxLength={300}
            onChange={(event) => setDraft(event.target.value)}
            ref={(element) => {
              if (element && focusComposer.current) {
                element.focus();
                focusComposer.current = false;
              }
            }}
          />
          <button type="submit" className="wc-feature-button" aria-label={t("send")} disabled={!draft.trim()}>
            <Send size={18} aria-hidden="true" />
          </button>
        </form>
      </Tabs.Content>

      <Tabs.Content value="faq" className="wc-widget-panel">
        <label className="wc-widget-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{t("faq.search")}</span>
          <input type="search" placeholder={t("faq.search")} value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="wc-widget-faq">
          {faqs.map((id) => (
            <details key={id}>
              <summary>{t(`faq.${id}.question`)}</summary>
              <p>{t(`faq.${id}.answer`)}</p>
            </details>
          ))}
          {faqs.length === 0 && <p role="status">{t("faq.empty")}</p>}
        </div>
      </Tabs.Content>

      <Tabs.Content value="products" className="wc-widget-panel">
        <ul className="wc-widget-products">
          {products.map((product) => (
            <li key={product.id}>
              <Image src={product.image} width={68} height={68} alt="" className="wc-widget-product-photo" />
              <div className="min-w-0">
                <p className="wc-widget-title">{product.name}</p>
                <p className="wc-widget-meta">{product.price} · {t(product.inStock ? "inStock" : "outOfStock")}</p>
                <button type="button" className="wc-widget-product-action" onClick={() => askAboutProduct(product.name)}>{t("askProduct")}</button>
              </div>
            </li>
          ))}
        </ul>
      </Tabs.Content>

      <Tabs.Content value="orders" className="wc-widget-panel">
        <form onSubmit={(event) => {
          event.preventDefault();
          setOrderResult(order.trim() === sampleOrder ? "found" : "missing");
        }}>
          <label htmlFor="wc-demo-order" className="wc-widget-title block">{t("orderNumber")}</label>
          <p id="wc-demo-order-hint" className="wc-widget-meta mt-1 mb-3">{t("orderHint", { number: sampleOrder })}</p>
          <div className="wc-widget-form">
            <input id="wc-demo-order" aria-describedby="wc-demo-order-hint" inputMode="numeric" value={order} required onChange={(event) => {
              setOrder(event.target.value);
              setOrderResult(null);
            }} />
            <button type="submit" className="wc-feature-button">{t("lookup")}</button>
          </div>
        </form>
        <div aria-live="polite">
          {orderResult === "found" && (
            <div className="wc-widget-order">
              <Truck size={23} aria-hidden="true" />
              <div>
                <p className="wc-widget-title">{t("orderFound", { number: sampleOrder })}</p>
                <p className="wc-widget-meta">{t("orderStatus")}</p>
              </div>
            </div>
          )}
          {orderResult === "missing" && <p className="mt-4">{t("orderMissing")}</p>}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
