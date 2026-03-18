/**
 * One-off: send payment-due + payment-success sample emails.
 * Usage: pnpm exec tsx scripts/send-sample-payment-emails.ts
 * Requires RESEND_API_KEY in .env — set NEXT_PUBLIC_APP_URL for logo in inbox.
 */
import { config } from "dotenv";
import { resolve } from "node:path";
import { Resend } from "resend";
import {
  buildPaymentDueEmailHtml,
  buildPaymentSuccessEmailHtml,
  paymentDueEmailSubject,
  paymentSuccessEmailSubject,
} from "../src/emails/luxury-kraken-templates";
import { getKrakenLogoEmailUrl } from "../src/lib/email-public-url";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const TO = "carloshinzunza2@gmail.com";

function from(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Kraken's Bay <onboarding@resend.dev>"
  );
}

async function main() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Missing RESEND_API_KEY");
    process.exit(1);
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
    console.warn("NEXT_PUBLIC_APP_URL unset — using http://localhost:3000 for logo (may not load in Gmail).");
  }

  const logoUrl = getKrakenLogoEmailUrl();
  const resend = new Resend(key);

  const dueHtml = buildPaymentDueEmailHtml({
    logoUrl,
    firstName: "Carlos",
    dueDateLabel: "31 de marzo de 2026",
    amountLabel: "$1,200.00 MXN",
    payUrl: "https://example.com/pagar",
  });

  const successHtml = buildPaymentSuccessEmailHtml({
    logoUrl,
    firstName: "Carlos",
    amountLabel: "$1,200.00 MXN",
    paidAtLabel: "18 de marzo de 2026, 14:30",
  });

  const r1 = await resend.emails.send({
    from: from(),
    to: TO,
    subject: paymentDueEmailSubject(),
    html: dueHtml,
  });
  if (r1.error) {
    console.error("Payment due:", r1.error);
  } else {
    console.log("Payment due sent:", r1.data?.id);
  }

  const r2 = await resend.emails.send({
    from: from(),
    to: TO,
    subject: paymentSuccessEmailSubject(),
    html: successHtml,
  });
  if (r2.error) {
    console.error("Payment success:", r2.error);
  } else {
    console.log("Payment success sent:", r2.data?.id);
  }
}

main();
