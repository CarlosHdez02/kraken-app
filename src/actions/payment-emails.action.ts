"use server";

import { Resend } from "resend";
import {
  buildPaymentDueEmailHtml,
  buildPaymentSuccessEmailHtml,
  paymentDueEmailSubject,
  paymentSuccessEmailSubject,
} from "@/emails/luxury-kraken-templates";
import { getKrakenLogoEmailUrl } from "@/lib/email-public-url";

function getResendFrom(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Kraken's Bay <onboarding@resend.dev>"
  );
}

export type SendPaymentDueEmailInput = {
  to: string;
  firstName: string;
  dueDateLabel: string;
  amountLabel: string;
  payUrl?: string;
};

export async function sendPaymentDueEmail(
  input: SendPaymentDueEmailInput,
): Promise<{ success: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { success: false, error: "RESEND_API_KEY no configurada" };
  }

  const logoUrl = getKrakenLogoEmailUrl();
  const html = buildPaymentDueEmailHtml({
    logoUrl,
    firstName: input.firstName,
    dueDateLabel: input.dueDateLabel,
    amountLabel: input.amountLabel,
    payUrl: input.payUrl,
  });

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: getResendFrom(),
    to: input.to,
    subject: paymentDueEmailSubject(),
    html,
  });

  if (error) {
    console.error("[sendPaymentDueEmail]", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export type SendPaymentSuccessEmailInput = {
  to: string;
  firstName: string;
  amountLabel: string;
  paidAtLabel: string;
};

export async function sendPaymentSuccessEmail(
  input: SendPaymentSuccessEmailInput,
): Promise<{ success: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { success: false, error: "RESEND_API_KEY no configurada" };
  }

  const logoUrl = getKrakenLogoEmailUrl();
  const html = buildPaymentSuccessEmailHtml({
    logoUrl,
    firstName: input.firstName,
    amountLabel: input.amountLabel,
    paidAtLabel: input.paidAtLabel,
  });

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: getResendFrom(),
    to: input.to,
    subject: paymentSuccessEmailSubject(),
    html,
  });

  if (error) {
    console.error("[sendPaymentSuccessEmail]", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
