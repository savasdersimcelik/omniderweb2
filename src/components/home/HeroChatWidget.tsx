"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, UserRound, Sparkles, Package, ExternalLink } from "lucide-react";

function ProductThumb({
  image,
  name,
  accent,
  className,
}: {
  image?: string;
  name: string;
  accent?: string;
  className: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local demo asset
      <img src={image} alt={name} className={className} loading="lazy" />
    );
  }
  return (
    <div className={cn(className, "hero-chat__thumb-fallback")} style={accent ? { background: accent } : undefined}>
      <Package className="size-6 opacity-55" />
    </div>
  );
}
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { cn } from "@/lib/utils";

export type HeroChatProduct = {
  id: string;
  name: string;
  price: string;
  listPrice?: string;
  sku?: string;
  description?: string;
  inStock?: boolean;
  image?: string;
  accent?: string;
  features?: Array<{ key: string; value: string }>;
};

export type HeroChatCopy = {
  browserUrl: string;
  inboxTitle: string;
  aiLabel: string;
  agentLabel: string;
  customerName: string;
  deptName: string;
  transferLabel: string;
  typingLabel: string;
  inStockLabel: string;
  outOfStockLabel: string;
  viewProductLabel: string;
  carouselHint: string;
  products: HeroChatProduct[];
  sidebar: Array<{
    name: string;
    preview: string;
    platform: string;
    channel: string;
  }>;
  steps: Array<{
    kind:
      | "customer"
      | "ai"
      | "agent"
      | "transfer"
      | "product_list"
      | "product_detail"
      | "buttons";
    text?: string;
    productIds?: string[];
    productId?: string;
    buttons?: string[];
  }>;
};

type Visible =
  | { id: number; type: "msg"; kind: "customer" | "ai" | "agent"; text: string }
  | { id: number; type: "transfer"; text: string }
  | { id: number; type: "typing" }
  | { id: number; type: "product_list"; text?: string; products: HeroChatProduct[] }
  | { id: number; type: "product_detail"; text?: string; product: HeroChatProduct }
  | { id: number; type: "buttons"; text?: string; buttons: string[] };

const STEP_MS = 1700;
const LOOP_PAUSE_MS = 3000;
const SIDEBAR_TICK_MS = 2400;

export function HeroChatWidget({ copy }: { copy: HeroChatCopy }) {
  const [visible, setVisible] = useState<Visible[]>([]);
  const [step, setStep] = useState(0);
  const [activeThread, setActiveThread] = useState(0);
  const [order, setOrder] = useState(() => copy.sidebar.map((_, i) => i));
  const [freshIndex, setFreshIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const bumpCursor = useRef(0);
  const activeThreadRef = useRef(activeThread);
  const msgId = useRef(0);
  const runGen = useRef(0);

  activeThreadRef.current = activeThread;

  const productMap = new Map(copy.products.map((p) => [p.id, p]));

  const active =
    copy.sidebar[activeThread] ??
    copy.sidebar[0] ?? {
      name: copy.customerName,
      preview: "",
      platform: "whatsapp-business",
      channel: "WhatsApp",
    };

  const bumpThread = (index: number) => {
    setOrder((prev) => [index, ...prev.filter((i) => i !== index)]);
    setFreshIndex(index);
  };

  useEffect(() => {
    if (freshIndex === null) return;
    const t = setTimeout(() => setFreshIndex(null), 1200);
    return () => clearTimeout(t);
  }, [freshIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".hero-chat__thread").forEach((el) => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, [visible]);

  useEffect(() => {
    if (copy.sidebar.length < 2) return;

    const tick = () => {
      const len = copy.sidebar.length;
      bumpCursor.current = (bumpCursor.current + 1) % len;
      let next = bumpCursor.current;
      if (next === activeThreadRef.current) {
        next = (next + 1) % len;
      }
      bumpThread(next);
    };

    const id = setInterval(tick, SIDEBAR_TICK_MS);
    return () => clearInterval(id);
  }, [copy.sidebar]);

  useEffect(() => {
    const gen = ++runGen.current;
    let timer: ReturnType<typeof setTimeout>;
    setVisible([]);

    const alive = () => gen === runGen.current;

    const run = (index: number) => {
      if (!alive()) return;

      if (index >= copy.steps.length) {
        timer = setTimeout(() => {
          if (!alive()) return;
          setVisible([]);
          setStep(0);
          setActiveThread((t) => {
            const next = (t + 1) % Math.max(copy.sidebar.length, 1);
            bumpThread(next);
            return next;
          });
          run(0);
        }, LOOP_PAUSE_MS);
        return;
      }

      const item = copy.steps[index];
      setStep(index);

      const afterDelay = (ms: number, fn: () => void) => {
        timer = setTimeout(() => {
          if (!alive()) return;
          fn();
        }, ms);
      };

      if (item.kind === "ai" || item.kind === "agent") {
        const replyKind = item.kind;
        const replyText = item.text ?? "";
        setVisible((prev) => [
          ...prev.filter((v) => v.type !== "typing"),
          { id: ++msgId.current, type: "typing" },
        ]);
        afterDelay(900, () => {
          setVisible((prev) => [
            ...prev.filter((v) => v.type !== "typing"),
            {
              id: ++msgId.current,
              type: "msg",
              kind: replyKind,
              text: replyText,
            },
          ]);
          afterDelay(STEP_MS, () => run(index + 1));
        });
        return;
      }

      if (item.kind === "product_list" || item.kind === "product_detail") {
        setVisible((prev) => [
          ...prev.filter((v) => v.type !== "typing"),
          { id: ++msgId.current, type: "typing" },
        ]);
        afterDelay(1000, () => {
          if (item.kind === "product_list") {
            const products = (item.productIds ?? [])
              .map((id) => productMap.get(id))
              .filter(Boolean) as HeroChatProduct[];
            setVisible((prev) => [
              ...prev.filter((v) => v.type !== "typing"),
              {
                id: ++msgId.current,
                type: "product_list",
                text: item.text,
                products,
              },
            ]);
          } else {
            const product = productMap.get(item.productId ?? "");
            if (product) {
              setVisible((prev) => [
                ...prev.filter((v) => v.type !== "typing"),
                {
                  id: ++msgId.current,
                  type: "product_detail",
                  text: item.text,
                  product,
                },
              ]);
            }
          }
          afterDelay(STEP_MS + 400, () => run(index + 1));
        });
        return;
      }

      if (item.kind === "buttons") {
        setVisible((prev) => [
          ...prev.filter((v) => v.type !== "typing"),
          {
            id: ++msgId.current,
            type: "buttons",
            text: item.text,
            buttons: item.buttons ?? [],
          },
        ]);
        afterDelay(STEP_MS, () => run(index + 1));
        return;
      }

      if (item.kind === "transfer") {
        setVisible((prev) => [
          ...prev.filter((v) => v.type !== "typing"),
          { id: ++msgId.current, type: "transfer", text: item.text ?? "" },
        ]);
        afterDelay(STEP_MS, () => run(index + 1));
        return;
      }

      setVisible((prev) => [
        ...prev.filter((v) => v.type !== "typing"),
        {
          id: ++msgId.current,
          type: "msg",
          kind: "customer",
          text: item.text ?? "",
        },
      ]);
      bumpThread(activeThreadRef.current);
      afterDelay(STEP_MS, () => run(index + 1));
    };

    timer = setTimeout(() => run(0), 0);
    return () => {
      runGen.current += 1;
      clearTimeout(timer);
    };
  }, [copy.steps, copy.sidebar, copy.products]);

  function renderThread(keyPrefix: string) {
    return (
      <div className="hero-chat__thread">
        {visible.map((item) => {
          if (item.type === "typing") {
            return (
              <div
                key={`${keyPrefix}-typing-${item.id}`}
                className="hero-chat__row hero-chat__row--out"
              >
                <div className="hero-chat__bubble hero-chat__bubble--ai hero-chat__typing">
                  <span />
                  <span />
                  <span />
                  <span className="sr-only">{copy.typingLabel}</span>
                </div>
                <span className="hero-chat__avatar hero-chat__avatar--ai">
                  <Bot className="size-3.5" />
                </span>
              </div>
            );
          }

          if (item.type === "transfer") {
            return (
              <div
                key={`${keyPrefix}-xfer-${item.id}`}
                className="hero-chat__transfer"
              >
                <span>{item.text}</span>
              </div>
            );
          }

          if (item.type === "product_list") {
            return (
              <div
                key={`${keyPrefix}-plist-${item.id}`}
                className="hero-chat__row hero-chat__row--out hero-chat__row--rich"
              >
                <div className="hero-chat__bubble hero-chat__bubble--ai hero-chat__bubble--rich">
                  <span className="hero-chat__who">{copy.aiLabel}</span>
                  {item.text ? <p>{item.text}</p> : null}
                  <div className="hero-chat__product-carousel">
                    {item.products.map((p) => (
                      <div key={p.id} className="hero-chat__product-card">
                        <ProductThumb
                          image={p.image}
                          name={p.name}
                          accent={p.accent}
                          className="hero-chat__product-thumb"
                        />
                        <div className="hero-chat__product-body">
                          <p className="hero-chat__product-name">{p.name}</p>
                          <p className="hero-chat__product-price">
                            {p.price}
                            {p.listPrice ? (
                              <span className="hero-chat__product-strike">
                                {p.listPrice}
                              </span>
                            ) : null}
                          </p>
                          {p.inStock !== undefined ? (
                            <span
                              className={cn(
                                "hero-chat__stock",
                                p.inStock
                                  ? "hero-chat__stock--ok"
                                  : "hero-chat__stock--out",
                              )}
                            >
                              {p.inStock
                                ? copy.inStockLabel
                                : copy.outOfStockLabel}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="hero-chat__carousel-hint">
                    {copy.carouselHint.replace(
                      "{count}",
                      String(item.products.length),
                    )}
                  </p>
                </div>
                <span className="hero-chat__avatar hero-chat__avatar--ai">
                  <Bot className="size-3.5" />
                </span>
              </div>
            );
          }

          if (item.type === "product_detail") {
            const p = item.product;
            return (
              <div
                key={`${keyPrefix}-pdetail-${item.id}`}
                className="hero-chat__row hero-chat__row--out hero-chat__row--rich"
              >
                <div className="hero-chat__bubble hero-chat__bubble--ai hero-chat__bubble--rich">
                  <span className="hero-chat__who">{copy.aiLabel}</span>
                  {item.text ? <p>{item.text}</p> : null}
                  <div className="hero-chat__product-detail">
                    <ProductThumb
                      image={p.image}
                      name={p.name}
                      accent={p.accent}
                      className="hero-chat__product-detail-thumb"
                    />
                    <div className="hero-chat__product-detail-body">
                      <p className="hero-chat__product-detail-name">{p.name}</p>
                      {p.sku ? (
                        <p className="hero-chat__product-sku">SKU {p.sku}</p>
                      ) : null}
                      <p className="hero-chat__product-price hero-chat__product-price--lg">
                        {p.price}
                        {p.listPrice ? (
                          <span className="hero-chat__product-strike">
                            {p.listPrice}
                          </span>
                        ) : null}
                      </p>
                      {p.inStock !== undefined ? (
                        <span
                          className={cn(
                            "hero-chat__stock",
                            p.inStock
                              ? "hero-chat__stock--ok"
                              : "hero-chat__stock--out",
                          )}
                        >
                          {p.inStock
                            ? copy.inStockLabel
                            : copy.outOfStockLabel}
                        </span>
                      ) : null}
                      {p.description ? (
                        <p className="hero-chat__product-desc">{p.description}</p>
                      ) : null}
                      {p.features?.length ? (
                        <div className="hero-chat__product-features">
                          {p.features.map((f) => (
                            <div key={f.key} className="hero-chat__feature-row">
                              <span>{f.key}</span>
                              <strong>{f.value}</strong>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <span className="hero-chat__product-cta">
                        <ExternalLink className="size-3.5" />
                        {copy.viewProductLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="hero-chat__avatar hero-chat__avatar--ai">
                  <Bot className="size-3.5" />
                </span>
              </div>
            );
          }

          if (item.type === "buttons") {
            return (
              <div
                key={`${keyPrefix}-btns-${item.id}`}
                className="hero-chat__row hero-chat__row--out hero-chat__row--rich"
              >
                <div className="hero-chat__bubble hero-chat__bubble--ai hero-chat__bubble--rich">
                  <span className="hero-chat__who">{copy.aiLabel}</span>
                  {item.text ? <p>{item.text}</p> : null}
                  <div className="hero-chat__action-buttons">
                    {item.buttons.map((label) => (
                      <span key={label} className="hero-chat__action-btn">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hero-chat__avatar hero-chat__avatar--ai">
                  <Bot className="size-3.5" />
                </span>
              </div>
            );
          }

          /* Inbox görünümü: müşteri sol (gelen), AI/temsilci sağ (giden) */
          const isOut = item.kind === "ai" || item.kind === "agent";
          return (
            <div
              key={`${keyPrefix}-msg-${item.id}`}
              className={cn(
                "hero-chat__row",
                isOut ? "hero-chat__row--out" : "hero-chat__row--in",
              )}
            >
              {isOut ? (
                <>
                  <div
                    className={cn(
                      "hero-chat__bubble",
                      item.kind === "ai" && "hero-chat__bubble--ai",
                      item.kind === "agent" && "hero-chat__bubble--agent",
                    )}
                  >
                    <span className="hero-chat__who">
                      {item.kind === "ai" ? copy.aiLabel : copy.agentLabel}
                    </span>
                    <p>{item.text}</p>
                  </div>
                  <span
                    className={cn(
                      "hero-chat__avatar",
                      item.kind === "ai"
                        ? "hero-chat__avatar--ai"
                        : "hero-chat__avatar--agent",
                    )}
                  >
                    {item.kind === "ai" ? (
                      <Bot className="size-3.5" />
                    ) : (
                      <UserRound className="size-3.5" />
                    )}
                  </span>
                </>
              ) : (
                <div className="hero-chat__bubble hero-chat__bubble--customer">
                  <p>{item.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="hero-chat" aria-hidden="true">
      <div className="hero-chat__phone lg:hidden">
        <div className="hero-chat__phone-notch" />
        <div className="hero-chat__phone-bar">
          <PlatformIcon
            name={active.platform}
            size={16}
            frameClassName="h-5 w-5"
          />
          <div className="min-w-0 text-left">
            <p className="truncate text-[13px] font-semibold text-ink">
              {active.name}
            </p>
            <p className="truncate text-[11px] text-ink-subtle">
              {active.channel}
            </p>
          </div>
          <span className="hero-chat__live">
            <Sparkles className="size-3" />
            AI
          </span>
        </div>
        {renderThread("phone")}
      </div>

      <div className="hero-chat__browser hidden w-full lg:flex">
        <div className="hero-chat__chrome">
          <span className="hero-chat__dot hero-chat__dot--r" />
          <span className="hero-chat__dot hero-chat__dot--y" />
          <span className="hero-chat__dot hero-chat__dot--g" />
          <div className="hero-chat__url">{copy.browserUrl}</div>
        </div>

        <div className="hero-chat__desk">
          <aside className="hero-chat__sidebar">
            <p className="hero-chat__sidebar-title">{copy.inboxTitle}</p>
            <ul className="hero-chat__list">
              {order.map((idx) => {
                const row = copy.sidebar[idx];
                if (!row) return null;
                return (
                  <li
                    key={`${row.platform}-${row.name}`}
                    className={cn(
                      "hero-chat__list-item",
                      idx === activeThread && "is-active",
                      idx === freshIndex && "is-fresh",
                    )}
                  >
                    <PlatformIcon
                      name={row.platform}
                      size={14}
                      frameClassName="h-6 w-6 rounded-full bg-white"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="hero-chat__list-name">{row.name}</span>
                      <span className="hero-chat__list-preview">
                        {row.preview}
                      </span>
                    </span>
                    {idx === freshIndex ? (
                      <span className="hero-chat__unread" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="hero-chat__main">
            <div className="hero-chat__main-bar">
              <div className="flex min-w-0 items-center gap-2.5">
                <PlatformIcon
                  name={active.platform}
                  size={18}
                  frameClassName="h-8 w-8"
                />
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-semibold text-ink">
                    {active.name}
                  </p>
                  <p className="truncate text-xs text-ink-subtle">
                    {active.channel} · {copy.deptName}
                  </p>
                </div>
              </div>
              <span className="hero-chat__live">
                <Sparkles className="size-3.5" />
                {copy.aiLabel}
              </span>
            </div>
            {renderThread("desk")}
            <div className="hero-chat__composer">
              <span className="hero-chat__composer-fake">
                {copy.typingLabel}…
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Demo conversation step {step + 1} of {copy.steps.length}
      </span>
    </div>
  );
}
