# LuxQuanta AI Strategy — static site (Next.js + password gate)

The decks live in `public/`. A small **Next.js** shell adds **Edge Middleware** and **`/api/unlock`** so you can protect the site with a password stored only in Vercel environment variables.

| URL | Content |
|-----|---------|
| `/` | Redirects to `/index.html` (avoids Edge rewrite issues on Vercel) |
| `/index.html` | English deck |
| `/it.html` | Italian deck |
| `/login.html` | Password form (always public) |

## Password wall

In **Vercel → Settings → Environment Variables** (Production / Preview as you prefer):

| Variable | Required | Purpose |
|----------|----------|---------|
| **`PASSWORD`** | To enable the wall | Passphrase users enter on `/login.html`. |
| **`CLIENT_KEY`** | Optional | Secret used to **sign** the session cookie (HMAC). If omitted, `PASSWORD` is used for signing too. |

**Legacy names** (still work): `DECK_PASSWORD` instead of `PASSWORD`, `DECK_AUTH_SECRET` instead of `CLIENT_KEY`.

Redeploy after changing variables.

**If neither `PASSWORD` nor `DECK_PASSWORD` is set**, the site stays **fully public** (no login).

The session cookie is **HttpOnly** and stores only an **HMAC** derived from `CLIENT_KEY` (or `PASSWORD`); the plain password is not put in the cookie.

## Local development

```bash
npm install
# optional:
# printf 'PASSWORD=test\nCLIENT_KEY=optional-long-secret\n' > .env.local
npm run dev
```

Open `http://localhost:3000` — with `PASSWORD` set you should be redirected to `/login.html`.

## Deploy on Vercel

1. Repository: **[github.com/nicolalazzari/luxquanta](https://github.com/nicolalazzari/luxquanta)**.
2. Import the repo; Vercel should detect **Next.js** (framework preset **Next.js**, build `next build`, output managed by Next).
3. Add **`PASSWORD`** (and optionally **`CLIENT_KEY`**) in environment variables, then redeploy.

### If you see `500` / `MIDDLEWARE_INVOCATION_FAILED` or `/api/unlock` returns 404

The project **must** be built as **Next.js**, not as a plain static site. This repo includes `vercel.json` with `"framework": "nextjs"` so Vercel runs `npm run build`. In the Vercel dashboard, open **Settings → General → Framework Preset** and set it to **Next.js** if it still shows **Other**, then **Redeploy**.

## Use your personal account (not MVF)

Deploy under **`nicolalazzari@gmail.com`** / your **Hobby** team — not the MVF Vercel team. See earlier sections in this file for Git / Vercel login notes.

## Updating the decks

Replace `public/index.html` and/or `public/it.html`, commit, and push.

## Privacy

Even with this gate, anyone with the password can share access. For stricter control, use [Vercel Deployment Protection](https://vercel.com/docs/security/deployment-protection) in addition.
