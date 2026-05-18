# Deploying to Netlify

Step-by-step guide to get your portfolio live on Netlify.

---

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup) (free tier is enough)
- Your code pushed to a GitHub repository
- [Node.js 20+](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed locally (for local testing only)

---

## Step 1 — Push to GitHub

If you haven't already, push this project to a GitHub repository.

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## Step 2 — Connect to Netlify (UI method)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose **GitHub** and authorize Netlify to access your repositories.
4. Select your repository from the list.

---

## Step 3 — Configure the build settings

On the build settings screen, enter the following:

| Field | Value |
|---|---|
| **Base directory** | *(leave blank)* |
| **Build command** | `npm install -g pnpm && pnpm install --frozen-lockfile && PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run build` |
| **Publish directory** | `artifacts/portfolio/dist/public` |

> The `netlify.toml` file already included in this repo fills these in automatically — you may not need to type them at all.

---

## Step 4 — Set environment variables

In the Netlify UI go to **Site configuration → Environment variables** and add:

| Key | Value |
|---|---|
| `PORT` | `3000` |
| `BASE_PATH` | `/` |
| `NODE_VERSION` | `20` |

> These are also pre-set in `netlify.toml`, but adding them here makes them visible in the Netlify dashboard.

---

## Step 5 — Deploy

Click **"Deploy site"**. Netlify will:

1. Clone your repository.
2. Install pnpm and workspace dependencies.
3. Build the portfolio with Vite.
4. Publish the static output from `artifacts/portfolio/dist/public`.

The first deploy typically takes 2–4 minutes.

---

## Step 6 — Set a custom domain (optional)

1. In your Netlify site, go to **Domain management → Add a domain**.
2. Enter your domain (e.g. `yznmoh.com`).
3. Follow the DNS instructions — add the CNAME or A record your domain registrar requires.
4. Netlify provisions a free TLS certificate automatically within a few minutes.

---

## Step 7 — Enable automatic deploys

By default, every push to your `main` branch triggers a new deploy. You can control this under **Site configuration → Build & deploy → Continuous deployment**.

---

## Local build test (optional)

Before pushing, verify the build works locally:

```bash
# Install dependencies
pnpm install

# Build the portfolio
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run build

# Preview the output
pnpm --filter @workspace/portfolio run serve
```

Then open `http://localhost:3000` to confirm everything looks right.

---

## Netlify CLI method (alternative to the UI)

```bash
# Install the CLI
npm install -g netlify-cli

# Log in
netlify login

# Build and deploy (from repo root)
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run build
netlify deploy --dir=artifacts/portfolio/dist/public --prod
```

---

## What gets deployed

This is a fully static React SPA — there is no server or database required.

- All portfolio content (projects, skills, experience) is bundled at build time.
- The admin panel (`/admin`) runs entirely in the browser and stores changes in `localStorage`.
- No backend, no database connection, no environment secrets needed beyond `PORT` and `BASE_PATH`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with `PORT is required` | Make sure `PORT=3000` is set as an env variable in Netlify |
| Build fails with `BASE_PATH is required` | Make sure `BASE_PATH=/` is set as an env variable in Netlify |
| Page returns 404 on refresh | Confirm the redirect rule `/* → /index.html` is in `netlify.toml` |
| `pnpm: command not found` | The build command starts with `npm install -g pnpm` — this installs it first |
| Admin changes reset after redeploy | Expected — admin data is stored in `localStorage`, not a database |
