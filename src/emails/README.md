# Correos transaccionales (Kraken)

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `RESEND_API_KEY` | API de Resend (obligatorio) |
| `RESEND_FROM_EMAIL` | Remitente verificado, ej. `Kraken's Bay <pagos@tudominio.com>` |
| `NEXT_PUBLIC_APP_URL` | URL pública del sitio (obligatorio para que el **logo** cargue en Gmail, etc.), ej. `https://tudominio.com` |

## Funciones (server actions)

- `sendPaymentDueEmail({ to, firstName, dueDateLabel, amountLabel, payUrl? })` — recordatorio de pago.
- `sendPaymentSuccessEmail({ to, firstName, amountLabel, paidAtLabel })` — pago confirmado.

Plantillas en español, tipografía **Montserrat** en el cuerpo y **Rubik Wet Paint** en el pie **«Death From Below»** (misma familia que el toast de éxito en la app).
