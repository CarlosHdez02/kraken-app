/**
 * Base URL for absolute links and images in transactional emails.
 * Set `NEXT_PUBLIC_APP_URL` (e.g. https://tudominio.com) so the logo loads in inboxes.
 */
export function getEmailPublicBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/\/$/, "");
    return host.startsWith("http") ? host.replace(/\/$/, "") : `https://${host}`;
  }
  return "http://localhost:3000";
}

export function getKrakenLogoEmailUrl(): string {
  return `${getEmailPublicBaseUrl()}/kraken.png`;
}
