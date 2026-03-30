/**
 * Vercel / .env.local — primary names:
 *   PASSWORD     — passphrase users enter on /login.html
 *   CLIENT_KEY   — secret used to sign the session cookie (HMAC); falls back to PASSWORD if unset
 *
 * Legacy aliases (still supported):
 *   DECK_PASSWORD, DECK_AUTH_SECRET
 */
export function getDeckPassword(): string | undefined {
  const p = process.env.PASSWORD?.trim() || process.env.DECK_PASSWORD?.trim();
  return p || undefined;
}

export function getAuthSecret(deckPassword: string): string {
  return (
    process.env.CLIENT_KEY?.trim() ||
    process.env.DECK_AUTH_SECRET?.trim() ||
    deckPassword
  ).trim();
}
