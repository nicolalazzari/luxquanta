# LuxQuanta AI Strategy — static site

Single-page HTML decks for Vercel (static hosting, no build step).

| URL | Content |
|-----|---------|
| `/` | English deck (`index.html`) |
| `/it.html` | Italian deck |

## Deploy on Vercel (new GitHub repository)

1. Create an empty repository on GitHub (e.g. `luxquanta-ai-strategy`).
2. From this folder:

   ```bash
   cd luxquanta-ai-strategy-vercel
   git init
   git add .
   git commit -m "Initial static deck for Vercel"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/luxquanta-ai-strategy.git
   git push -u origin main
   ```

3. In [Vercel](https://vercel.com): **Add New Project** → Import the GitHub repo.
4. Leave defaults: **Framework Preset** “Other”, **Root Directory** `.`, **Build Command** empty, **Output Directory** empty (Vercel serves static files from the repo root).

Preview deployments run on every push; production follows your main branch (or as configured in Vercel).

## Optional: Vercel CLI

```bash
npm i -g vercel
cd luxquanta-ai-strategy-vercel
vercel
```

## Updating the decks

Replace `index.html` and/or `it.html` with new exports from your main LuxQuanta project, then commit and push.

## Privacy

These pages are **public** unless you enable [Deployment Protection](https://vercel.com/docs/security/deployment-protection) on the Vercel project (recommended if the deck is confidential).
