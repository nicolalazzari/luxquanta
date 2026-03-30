# LuxQuanta AI Strategy — static site (Next.js + password gate)

The decks live in `public/`. A small **Next.js** shell adds **Edge Middleware** and **`/api/unlock`** so you can protect the site with a password stored only in Vercel environment variables.

| URL | Content |
|-----|---------|
| `/` | Redirects to `/index.html` (avoids Edge rewrite issues on Vercel) |
| `/index.html` | English deck |
| `/it.html` | Italian deck |
| `/login.html` | Password form (always public) |

## Password wall

1. In the Vercel project: **Settings → Environment Variables** add:
   - **`DECK_PASSWORD`** — the passphrase people use on `/login.html` (Production + Preview as needed).
   - Optional **`DECK_AUTH_SECRET`** — long random string used to sign the session cookie (defaults to `DECK_PASSWORD` if omitted).

2. Redeploy after adding variables.

**If `DECK_PASSWORD` is not set**, the site stays **fully public** (no login) — useful for local dev and optional open deploys.

The session cookie is **HttpOnly** and holds an **HMAC** derived from `DECK_AUTH_SECRET` (or the password); the plain password is never stored in the cookie.

## Local development

```bash
npm install
# optional: echo 'DECK_PASSWORD=test' > .env.local
npm run dev
```

Open `http://localhost:3000` — with `DECK_PASSWORD` set you should be redirected to `/login.html`.

## Deploy on Vercel

1. Repository: **[github.com/nicolalazzari/luxquanta](https://github.com/nicolalazzari/luxquanta)**.
2. Import the repo; Vercel should detect **Next.js** (framework preset **Next.js**, build `next build`, output managed by Next).
3. Add **`DECK_PASSWORD`** in environment variables, then redeploy.

## Use your personal account (not MVF)

Deploy under **`nicolalazzari@gmail.com`** / your **Hobby** team — not the MVF Vercel team. See earlier sections in this file for Git / Vercel login notes.

## Updating the decks

Replace `public/index.html` and/or `public/it.html`, commit, and push.

## Privacy

Even with this gate, anyone with the password can share access. For stricter control, use [Vercel Deployment Protection](https://vercel.com/docs/security/deployment-protection) in addition.
