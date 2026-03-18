/** Escape text for HTML email bodies */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const FONTS_LINK = `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Rubik+Wet+Paint&display=swap`;

function luxuryShell(params: {
  logoUrl: string;
  preheader: string;
  title: string;
  innerHtml: string;
}): string {
  const { logoUrl, preheader, title, innerHtml } = params;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>${esc(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONTS_LINK}" rel="stylesheet" />
  <!--[if mso]><style type="text/css">body, table, td { font-family: Arial, sans-serif !important; }</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#050608;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#050608;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(preheader)}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#050608;background-image:radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,201,56,0.12), transparent);">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;border-collapse:separate;border-spacing:0;border-radius:20px;overflow:hidden;border:1px solid rgba(255,201,56,0.28);box-shadow:0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04) inset;background-color:#0c0d10;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, #b8860b, #ffc938, #e0ac19, #ffc938, #b8860b);"></td>
          </tr>
          <tr>
            <td style="padding:40px 36px 28px;text-align:center;">
              <img src="${esc(logoUrl)}" alt="Kraken's Bay Studio" width="88" height="88" style="display:block;margin:0 auto 8px;border-radius:50%;border:2px solid rgba(255,201,56,0.45);box-shadow:0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(255,201,56,0.15);" />
              <p style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:rgba(255,201,56,0.75);">Kraken's Bay Studio</p>
              <p style="margin:4px 0 0;font-family:'Montserrat',Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#6b7280;">Brazilian Jiu-Jitsu</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 36px;font-family:'Montserrat',Arial,sans-serif;color:#e5e5e5;">
              ${innerHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;text-align:center;border-top:1px solid rgba(255,201,56,0.12);">
              <p style="margin:28px 0 0;font-family:'Rubik Wet Paint','Brush Script MT',cursive;font-size:clamp(26px,5vw,34px);line-height:1.2;color:#ffc938;letter-spacing:0.06em;text-shadow:0 2px 12px rgba(0,0,0,0.5);">Death From Below</p>
              <p style="margin:16px 0 0;font-family:'Montserrat',Arial,sans-serif;font-size:11px;color:#6b7280;line-height:1.6;">Este es un correo automático. Si tiene dudas, responda a este mensaje o contáctenos directamente en el estudio.</p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-family:'Montserrat',Arial,sans-serif;font-size:10px;color:#4b5563;text-align:center;">© ${new Date().getFullYear()} Kraken's Bay Studio · Brazilian Jiu-Jitsu</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type PaymentDueEmailParams = {
  logoUrl: string;
  /** Nombre del alumno */
  firstName: string;
  /** Texto legible, ej. "25 de marzo de 2026" */
  dueDateLabel: string;
  /** ej. "$1,200.00 MXN" */
  amountLabel: string;
  /** Opcional: enlace a pago Stripe / portal */
  payUrl?: string;
};

export function buildPaymentDueEmailHtml(p: PaymentDueEmailParams): string {
  const name = esc(p.firstName.trim() || "Atleta");
  const cta = p.payUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:28px auto 0;">
        <tr>
          <td style="border-radius:999px;background:linear-gradient(180deg,#ffc938 0%,#e0ac19 100%);box-shadow:0 8px 24px rgba(255,201,56,0.25);">
            <a href="${esc(p.payUrl)}" target="_blank" style="display:inline-block;padding:14px 36px;font-family:'Montserrat',Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#0a0a0c;">Realizar pago</a>
          </td>
        </tr>
      </table>`
    : "";

  const inner = `
    <h1 style="margin:0 0 12px;font-family:'Montserrat',Arial,sans-serif;font-size:22px;font-weight:600;letter-spacing:0.02em;color:#ffc938;line-height:1.3;">Recordatorio de pago</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#d1d5db;font-weight:400;">Estimado/a <strong style="color:#f5f5f5;font-weight:600;">${name}</strong>,</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#d1d5db;">Le recordamos amablemente que su <strong style="color:#ffc938;">mensualidad</strong> está próxima a vencer. Mantener su pago al día le garantiza acceso continuo al tatami y a todos los beneficios de su plan.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;border-radius:14px;background:rgba(255,201,56,0.06);border:1px solid rgba(255,201,56,0.18);">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,201,56,0.85);">Fecha límite</p>
          <p style="margin:0 0 16px;font-size:17px;font-weight:600;color:#fafafa;">${esc(p.dueDateLabel)}</p>
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,201,56,0.85);">Monto</p>
          <p style="margin:0;font-size:17px;font-weight:600;color:#fafafa;">${esc(p.amountLabel)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:14px;line-height:1.7;color:#9ca3af;">Si ya realizó su pago, puede ignorar este mensaje. De lo contrario, le invitamos a completarlo antes de la fecha indicada para evitar interrupciones.</p>
    ${cta}`;

  return luxuryShell({
    logoUrl: p.logoUrl,
    preheader: `Su pago vence el ${p.dueDateLabel}. Monto: ${p.amountLabel}.`,
    title: "Recordatorio de pago — Kraken's Bay Studio",
    innerHtml: inner,
  });
}

export type PaymentSuccessEmailParams = {
  logoUrl: string;
  firstName: string;
  amountLabel: string;
  /** ej. "17 de marzo de 2026, 14:30" */
  paidAtLabel: string;
};

export function buildPaymentSuccessEmailHtml(p: PaymentSuccessEmailParams): string {
  const name = esc(p.firstName.trim() || "Atleta");
  const inner = `
    <h1 style="margin:0 0 12px;font-family:'Montserrat',Arial,sans-serif;font-size:22px;font-weight:600;letter-spacing:0.02em;color:#ffc938;line-height:1.3;">Pago confirmado</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#d1d5db;font-weight:400;">Estimado/a <strong style="color:#f5f5f5;font-weight:600;">${name}</strong>,</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#d1d5db;">Hemos recibido su pago correctamente. <strong style="color:#a7f3d0;">¡Gracias por su confianza!</strong> Su apoyo mantiene vivo el espíritu del equipo en el tatami.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;border-radius:14px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);">
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#6ee7b7;">Monto abonado</p>
          <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#ecfdf5;">${esc(p.amountLabel)}</p>
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#6ee7b7;">Fecha y hora</p>
          <p style="margin:0;font-size:15px;font-weight:500;color:#fafafa;">${esc(p.paidAtLabel)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:14px;line-height:1.7;color:#9ca3af;">Conserve este correo como comprobante. Nos vemos en el entrenamiento.</p>`;

  return luxuryShell({
    logoUrl: p.logoUrl,
    preheader: `Pago recibido: ${p.amountLabel}. Gracias, ${p.firstName}.`,
    title: "Pago recibido — Kraken's Bay Studio",
    innerHtml: inner,
  });
}

export function paymentDueEmailSubject(): string {
  return "Recordatorio de pago — Kraken's Bay Studio";
}

export function paymentSuccessEmailSubject(): string {
  return "Pago recibido — Kraken's Bay Studio";
}
