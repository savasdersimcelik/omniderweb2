import type { Attribution } from "@/lib/attribution/params";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type Locale = "tr" | "en";

function copy(locale: Locale) {
  if (locale === "en") {
    return {
      notProvided: "Not provided",
      adminEyebrow: "Omnider · Admin",
      adminTitle: "New demo / callback request",
      adminIntro:
        "A new lead arrived from the callback form. Please call them soon.",
      statusLabel: "Status: Callback",
      sourceLabel: "Source: webform",
      contactHeading: "Contact details",
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      page: "Form source",
      pageUrl: "Page URL",
      attributionHeading: "Attribution",
      landingUrl: "Landing URL",
      referrer: "Referrer",
      callCta: "Call now",
      createdAt: "Created",
      adminFooter: "© {year} Omnider · Internal use only.",
      userBadge: "Request received",
      userEyebrow: "Demo request",
      userHello: "Hi {name},",
      userBody:
        "We received your form. Our team will call you shortly at <strong style=\"color:#0f172a\">{phone}</strong>. We usually reply within a few hours.",
      summaryHeading: "Your request summary",
      nextHeading: "What’s next?",
      step1Title: "We’ll call you",
      step1Body: "A short call to understand your needs.",
      step2Title: "We’ll prepare your demo",
      step2Body: "Connect your channels and try Omnider on your workflow.",
      step3Title: "Go live",
      step3Body: "Manage WhatsApp, Instagram and more from one panel.",
      exploreCta: "Explore Omnider",
      help:
        'Need anything sooner? Email us at <a href="mailto:info@omnider.com" style="color:#4f46e5;text-decoration:none;font-weight:600;">info@omnider.com</a>',
      userFooter:
        "© {year} Omnider · Sent because you requested a demo.<br>Your details are only used for contact purposes.",
      adminSubject: "New demo / callback request",
      userSubject: "We received your demo request",
    };
  }

  return {
    notProvided: "Belirtilmedi",
    adminEyebrow: "Omnider · Yönetici",
    adminTitle: "Yeni demo / arama talebi",
    adminIntro:
      "Sizi Arayalım formundan yeni bir lead geldi. En kısa sürede aranmalı.",
    statusLabel: "Durum: Arama talebi",
    sourceLabel: "Kaynak: webform",
    contactHeading: "İletişim bilgileri",
    fullName: "Ad Soyad",
    phone: "Telefon",
    email: "E-posta",
    page: "Form kaynağı",
    pageUrl: "Sayfa URL",
    attributionHeading: "Attribution",
    landingUrl: "Landing URL",
    referrer: "Referrer",
    callCta: "Şimdi ara",
    createdAt: "Oluşturulma",
    adminFooter: "© {year} Omnider · Bu e-posta yalnızca iç kullanım içindir.",
    userBadge: "Talebiniz alındı",
    userEyebrow: "Demo talebi",
    userHello: "Merhaba {name},",
    userBody:
      "Formunu aldık. Ekibimiz en kısa sürede <strong style=\"color:#0f172a\">{phone}</strong> numarasından seni arayacak. Genellikle birkaç saat içinde dönüş yapıyoruz.",
    summaryHeading: "Talebinin özeti",
    nextHeading: "Sırada ne var?",
    step1Title: "Seni arayacağız",
    step1Body: "İhtiyaçlarını kısa bir görüşmeyle netleştiririz.",
    step2Title: "Demo hesabını hazırlarız",
    step2Body: "Kanallarını bağlayıp Omnider’ı kendi işinde deneyebilirsin.",
    step3Title: "Canlıya geçiş",
    step3Body:
      "WhatsApp, Instagram ve diğer kanalları tek panelden yönetirsin.",
    exploreCta: "Omnider’ı incele",
    help:
      'Acil bir konu varsa bize yaz: <a href="mailto:info@omnider.com" style="color:#4f46e5;text-decoration:none;font-weight:600;">info@omnider.com</a>',
    userFooter:
      "© {year} Omnider · Bu e-posta demo talebin üzerine gönderildi.<br>Bilgilerin yalnızca iletişim amacıyla kullanılır.",
    adminSubject: "Yeni demo / arama talebi",
    userSubject: "Demo talebinizi aldık",
  };
}

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

function row(label: string, value: string, last = false) {
  const border = last ? "" : "border-bottom:1px solid #e2e8f0;";
  return `
    <tr>
      <td style="padding:14px 16px;background:#f8fafc;width:38%;font-size:13px;font-weight:600;color:#64748b;${border}">${escapeHtml(label)}</td>
      <td style="padding:14px 16px;font-size:14px;color:#0f172a;${border}">${value}</td>
    </tr>
  `;
}

function shell(content: string, footer: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          ${content}
        </table>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;">${footer}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type LeadEmailData = {
  fullName: string;
  phone: string;
  email?: string;
  pageName?: string;
  pageUrl?: string;
  locale?: string;
  attribution?: Attribution;
  createdAt?: Date;
  ip?: string | null;
};

export function buildAdminLeadEmail(data: LeadEmailData) {
  const locale: Locale = data.locale === "tr" ? "tr" : "en";
  const t = copy(locale);
  const year = String(new Date().getFullYear());
  const notProvided = t.notProvided;
  const attribution = data.attribution || {};

  const marketingKeys: Array<[string, string | null | undefined]> = [
    ["utm_source", attribution.utm_source],
    ["utm_medium", attribution.utm_medium],
    ["utm_campaign", attribution.utm_campaign],
    ["utm_term", attribution.utm_term],
    ["utm_content", attribution.utm_content],
    ["gclid", attribution.gclid],
    ["fbclid", attribution.fbclid],
    [t.landingUrl, attribution.landing_url],
    [t.referrer, attribution.referrer],
  ];

  const filledMarketing = marketingKeys.filter(
    ([, value]) => typeof value === "string" && value.trim(),
  );

  const phoneHref = `tel:${data.phone.replace(/\s+/g, "")}`;
  const createdLabel = (data.createdAt || new Date()).toLocaleString(
    locale === "en" ? "en-GB" : "tr-TR",
    { dateStyle: "short", timeStyle: "short" },
  );

  const content = `
    <tr>
      <td style="background:linear-gradient(135deg,#4f46e5 0%,#4338ca 100%);padding:28px 32px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);">${escapeHtml(t.adminEyebrow)}</p>
        <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">${escapeHtml(t.adminTitle)}</h1>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.85);">${escapeHtml(t.adminIntro)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 0;">
        <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#eef2ff;color:#4338ca;font-size:12px;font-weight:700;">${escapeHtml(t.statusLabel)}</span>
        <span style="display:inline-block;margin-left:8px;padding:6px 12px;border-radius:999px;background:#f1f5f9;color:#475569;font-size:12px;font-weight:600;">${escapeHtml(t.sourceLabel)}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 8px;">
        <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${escapeHtml(t.contactHeading)}</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          ${row(t.fullName, `<strong>${escapeHtml(data.fullName)}</strong>`)}
          ${row(t.phone, `<a href="${escapeHtml(phoneHref)}" style="color:#4f46e5;text-decoration:none;font-weight:600;">${escapeHtml(data.phone)}</a>`)}
          ${row(
            t.email,
            data.email
              ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#4f46e5;text-decoration:none;">${escapeHtml(data.email)}</a>`
              : escapeHtml(notProvided),
          )}
          ${row(t.page, escapeHtml(data.pageName || notProvided))}
          ${row(
            t.pageUrl,
            data.pageUrl
              ? `<a href="${escapeHtml(data.pageUrl)}" style="color:#4f46e5;text-decoration:none;word-break:break-all;">${escapeHtml(data.pageUrl)}</a>`
              : escapeHtml(notProvided),
            true,
          )}
        </table>
      </td>
    </tr>
    ${
      filledMarketing.length
        ? `<tr>
      <td style="padding:16px 32px 8px;">
        <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${escapeHtml(t.attributionHeading)}</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          ${filledMarketing
            .map(([label, value], index) =>
              row(
                label,
                escapeHtml(String(value)),
                index === filledMarketing.length - 1,
              ),
            )
            .join("")}
        </table>
      </td>
    </tr>`
        : ""
    }
    <tr>
      <td style="padding:24px 32px 8px;" align="center">
        <a href="${escapeHtml(phoneHref)}" style="display:inline-block;padding:14px 28px;border-radius:12px;background:#4f46e5;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">${escapeHtml(t.callCta)} · ${escapeHtml(data.phone)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 28px;">
        <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">
          ${escapeHtml(t.createdAt)}: ${escapeHtml(createdLabel)}${data.ip ? ` · IP: ${escapeHtml(data.ip)}` : ""}
        </p>
      </td>
    </tr>
  `;

  const text = [
    t.adminTitle,
    "",
    `${t.fullName}: ${data.fullName}`,
    `${t.phone}: ${data.phone}`,
    `${t.email}: ${data.email || notProvided}`,
    `${t.page}: ${data.pageName || notProvided}`,
    `${t.pageUrl}: ${data.pageUrl || notProvided}`,
    ...filledMarketing.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return {
    subject: `${t.adminSubject} — ${data.fullName}`,
    html: shell(content, t.adminFooter.replace("{year}", year)),
    text,
  };
}

export function buildUserLeadConfirmationEmail(data: LeadEmailData) {
  const locale: Locale = data.locale === "tr" ? "tr" : "en";
  const t = copy(locale);
  const year = String(new Date().getFullYear());
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://omnider.com";
  const name = firstName(data.fullName);

  const content = `
    <tr>
      <td style="padding:28px 32px 12px;background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><p style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.03em;color:#0f172a;">Omnider</p></td>
            <td align="right"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#ecfdf5;color:#047857;font-size:12px;font-weight:700;">${escapeHtml(t.userBadge)}</span></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px;">
        <div style="border-radius:14px;background:linear-gradient(180deg,#eef2ff 0%,#ffffff 100%);border:1px solid #e0e7ff;padding:28px 24px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4f46e5;">${escapeHtml(t.userEyebrow)}</p>
          <h1 style="margin:0 0 10px;font-size:26px;line-height:1.2;font-weight:700;color:#0f172a;">${escapeHtml(t.userHello.replace("{name}", name))}</h1>
          <p style="margin:0;font-size:15px;line-height:1.65;color:#334155;">${t.userBody.replace("{phone}", escapeHtml(data.phone))}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 8px;">
        <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${escapeHtml(t.summaryHeading)}</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          ${row(t.fullName, `<strong>${escapeHtml(data.fullName)}</strong>`)}
          ${row(t.phone, escapeHtml(data.phone))}
          ${row(t.email, escapeHtml(data.email || t.notProvided), true)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 8px;">
        <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${escapeHtml(t.nextHeading)}</h2>
        ${[1, 2, 3]
          .map((step) => {
            const title =
              step === 1 ? t.step1Title : step === 2 ? t.step2Title : t.step3Title;
            const body =
              step === 1 ? t.step1Body : step === 2 ? t.step2Body : t.step3Body;
            return `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:10px;">
                <tr>
                  <td style="width:48px;padding:14px 0 14px 14px;vertical-align:top;">
                    <div style="width:28px;height:28px;border-radius:999px;background:#4f46e5;color:#fff;font-size:13px;font-weight:700;line-height:28px;text-align:center;">${step}</div>
                  </td>
                  <td style="padding:14px 16px 14px 8px;">
                    <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">${escapeHtml(title)}</p>
                    <p style="margin:0;font-size:13px;line-height:1.5;color:#64748b;">${escapeHtml(body)}</p>
                  </td>
                </tr>
              </table>
            `;
          })
          .join("")}
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 8px;" align="center">
        <a href="${escapeHtml(siteUrl)}" style="display:inline-block;padding:14px 28px;border-radius:12px;background:#4f46e5;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">${escapeHtml(t.exploreCta)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px 28px;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;text-align:center;">${t.help}</p>
      </td>
    </tr>
  `;

  const text = [
    t.userHello.replace("{name}", name),
    "",
    t.userBody.replace(/<[^>]+>/g, "").replace("{phone}", data.phone),
    "",
    `${t.fullName}: ${data.fullName}`,
    `${t.phone}: ${data.phone}`,
    `${t.email}: ${data.email || t.notProvided}`,
  ].join("\n");

  return {
    subject: t.userSubject,
    html: shell(content, t.userFooter.replaceAll("{year}", year)),
    text,
  };
}
