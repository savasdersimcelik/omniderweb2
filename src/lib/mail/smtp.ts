import nodemailer from "nodemailer";
import type { Attribution } from "@/lib/attribution/params";
import {
  buildAdminLeadEmail,
  buildUserLeadConfirmationEmail,
  escapeHtml,
} from "@/lib/mail/templates";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  locale?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

export function createMailTransport() {
  const port = Number(process.env.MAIL_PORT || 465);

  return nodemailer.createTransport({
    host: requireEnv("MAIL_HOST"),
    port,
    secure: process.env.MAIL_SECURE !== "false" && port === 465,
    auth: {
      user: requireEnv("MAIL_USERNAME"),
      pass: requireEnv("MAIL_PASSWORD").replace(/^"|"$/g, ""),
    },
  });
}

export async function sendContactEmail(payload: ContactPayload) {
  const transport = createMailTransport();
  const to = requireEnv("CONTACT_MAIL_TO");
  const fromAddress = requireEnv("MAIL_FROM_ADDRESS");
  const fromName = process.env.MAIL_FROM_NAME?.trim() || "Omnider";
  const notProvided =
    payload.locale === "en" ? "Not provided" : "Belirtilmedi";

  const subjectPrefix =
    payload.locale === "en"
      ? "New contact form message"
      : "Yeni iletişim formu mesajı";

  const text = [
    `${subjectPrefix}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || notProvided}`,
    `Company: ${payload.company || notProvided}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");

  const html = `
    <h2>${subjectPrefix}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:6px 0;font-weight:600">Name</td><td>${escapeHtml(payload.name)}</td></tr>
      <tr><td style="padding:6px 0;font-weight:600">Email</td><td>${escapeHtml(payload.email)}</td></tr>
      <tr><td style="padding:6px 0;font-weight:600">Phone</td><td>${escapeHtml(payload.phone || notProvided)}</td></tr>
      <tr><td style="padding:6px 0;font-weight:600">Company</td><td>${escapeHtml(payload.company || notProvided)}</td></tr>
      <tr><td style="padding:6px 0;font-weight:600">Subject</td><td>${escapeHtml(payload.subject)}</td></tr>
    </table>
    <p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `;

  await transport.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject: `${subjectPrefix} — ${payload.subject}`,
    text,
    html,
  });
}

export type LeadPayload = {
  fullName: string;
  phone: string;
  email?: string;
  pageName?: string;
  pageUrl?: string;
  locale?: string;
  attribution?: Attribution;
  ip?: string | null;
};

export async function sendLeadEmail(payload: LeadPayload) {
  const transport = createMailTransport();
  const to = requireEnv("CONTACT_MAIL_TO");
  const fromAddress = requireEnv("MAIL_FROM_ADDRESS");
  const fromName = process.env.MAIL_FROM_NAME?.trim() || "Omnider";

  const admin = buildAdminLeadEmail({
    ...payload,
    createdAt: new Date(),
  });

  await transport.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    ...(payload.email
      ? { replyTo: `"${payload.fullName}" <${payload.email}>` }
      : {}),
    subject: admin.subject,
    text: admin.text,
    html: admin.html,
  });

  if (payload.email) {
    const user = buildUserLeadConfirmationEmail(payload);
    await transport.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: payload.email,
      subject: user.subject,
      text: user.text,
      html: user.html,
    });
  }
}
