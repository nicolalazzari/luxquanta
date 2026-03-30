# LuxQuanta AI Strategy — static site

Single-page HTML decks for Vercel (static hosting, no build step).

| URL | Content |
|-----|---------|
| `/` | English deck (`index.html`) |
| `/it.html` | Italian deck |

## Use your personal account (not MVF)

Deploy and own this project under **Nicola’s** accounts — **not** the MVF / agency Vercel team or org.

### GitHub

- Log in at [github.com](https://github.com) as the profile tied to **`nicolalazzari@gmail.com`** (or whichever GitHub user is personal).
- Create the empty repo under **your user** (or a personal org), not under the MVF GitHub org.

### Vercel

1. Log out of Vercel if you’re in the wrong session, then log in with **`nicolalazzari@gmail.com`** (e.g. **Continue with Google** using that address).
2. In the Vercel dashboard, check the **team switcher** (top left): select **Hobby** / your **personal** team — **not** “MVF” or any client team.
3. **Add New Project** → import the GitHub repo. The project is created in whichever team is currently selected; it must be the personal team before you click Import.

If GitHub was only connected to the MVF Vercel team, open **Vercel → Settings → Git** (under your personal account) and ensure your GitHub user is linked there too.

### Git commits in this folder (local repo)

This repository is configured so commits use:

- **Email:** `nicolalazzari@gmail.com`

(Only affects this repo, not your global Git config.)

## Deploy on Vercel (new GitHub repository)

1. Create an empty repository on GitHub under your **personal** account (e.g. `luxquanta-ai-strategy`).
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

3. In [Vercel](https://vercel.com), with **personal team** selected: **Add New Project** → Import the GitHub repo.
4. Leave defaults: **Framework Preset** “Other”, **Root Directory** `.`, **Build Command** empty, **Output Directory** empty (Vercel serves static files from the repo root).

Preview deployments run on every push; production follows your main branch (or as configured in Vercel).

## Optional: Vercel CLI

```bash
npm i -g vercel
cd luxquanta-ai-strategy-vercel
vercel login   # complete login as nicolalazzari@gmail.com if prompted
vercel         # when asked, scope/link to your personal Hobby team, not MVF
```

## Updating the decks

Replace `index.html` and/or `it.html` with new exports from your main LuxQuanta project, then commit and push.

## Privacy

These pages are **public** unless you enable [Deployment Protection](https://vercel.com/docs/security/deployment-protection) on the Vercel project (recommended if the deck is confidential).
