# NextDeploy Template

A full-stack **Next.js** starter — auth and Postgres included — that deploys to
a VPS **you own** with one command.

- **Next.js 15** (App Router, Server Components, Server Actions, TypeScript strict)
- **[better-auth](https://better-auth.com)** — email + password, sessions in Postgres
- **[Neon](https://neon.tech)** — serverless Postgres (free tier is plenty)
- **[Drizzle ORM](https://orm.drizzle.team)** — typed schema, `db:push` migrations
- **[zod](https://zod.dev)** — validated env (`src/lib/env.ts`) and Server Action inputs
- **Tailwind CSS v4**
- **[`nextdeploy.yml`](./nextdeploy.yml)** — the whole deploy, one committed file

### What's wired

- **Auth** — sign up / in / out, protected `/dashboard/*`, `?redirect=` handling
- **A data-driven dashboard** — Overview, Projects (full CRUD via Server Actions),
  and Settings, all reading/writing real rows in Postgres (no mock JSON)
- **`GET /api/health`** — DB-checked readiness probe for zero-downtime deploys
- **Edge middleware** — optimistic auth redirect + baseline security headers
- **SEO & PWA assets** — generated `robots`, `sitemap`, `manifest`, favicon, and a
  dynamic OpenGraph image (all code, no binaries to commit)
- **`Dockerfile`** — minimal multi-stage image from Next's standalone output

From the talk **“NextDeploy — deploying full-stack apps, made easier”**
→ slides at [hersitech.com/talks/nextdeploy](https://hersitech.com/talks/nextdeploy)

## Quickstart (local)

```bash
# 1. grab it
git clone https://github.com/aynaash/nextdeploy-template
cd nextdeploy-template
bun install          # or: pnpm / npm install

# 2. configure
cp .env.example .env
#    DATABASE_URL       → from https://console.neon.tech (create a free project)
#    BETTER_AUTH_SECRET → openssl rand -base64 32

# 3. create the auth tables in Neon
bun run db:push

# 4. run
bun run dev          # → http://localhost:3000
```

Sign up at `/sign-in`, and you have working sessions backed by Postgres.

## Deploy to your own VPS

Edit `nextdeploy.yml` (your domain + VPS IP), then:

```bash
nextdeploy prepare                          # provision the VPS — once
nextdeploy secrets load .env.production     # DATABASE_URL, BETTER_AUTH_SECRET,
                                            # BETTER_AUTH_URL=https://your-domain.com
nextdeploy ship                             # build + deploy
```

Point the DNS record `ship` writes into `dns.md` (an `A` record to your VPS)
and Caddy provisions the Let's Encrypt cert automatically. A $5/mo box is
enough — 512 MB+ RAM, Ubuntu 20.04+.

Every deploy after that is just `nextdeploy ship` — zero-downtime (the new
release is health-checked before traffic flips to it), with instant rollbacks:

```bash
nextdeploy status              # active release, port, uptime, memory
nextdeploy logs                # tail the app
nextdeploy rollback --steps 1  # revert to the previous release
```

Secrets live on the VPS (mode 0600) and hot-reload the app when set — never
commit them.

## Run with Docker

The included `Dockerfile` builds a minimal image from Next's standalone output:

```bash
docker build -t nextdeploy-app .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://…" \
  -e BETTER_AUTH_SECRET="…" \
  -e BETTER_AUTH_URL="https://your-domain.com" \
  nextdeploy-app
```

It ships with a `HEALTHCHECK` that hits `/api/health` (which pings Postgres).

## Project layout

```
src/
  middleware.ts                    # edge: auth redirect + security headers
  app/
    layout.tsx                     # root metadata (OpenGraph, sitemap base)
    loading.tsx / error.tsx / not-found.tsx
    robots.ts / sitemap.ts / manifest.ts / icon.tsx / opengraph-image.tsx
    api/
      auth/[...all]/route.ts       # better-auth handler (all auth endpoints)
      health/route.ts              # DB-checked readiness probe for deploys
    sign-in/ sign-up/              # email + password auth pages
    dashboard/
      layout.tsx                   # auth guard + top bar + tab nav
      page.tsx                     # Overview — live stats from Postgres
      projects/                    # full CRUD (page + Server Actions + form)
      settings/                    # profile update via better-auth
  components/                      # flag-stripe, nav, auth form, skyline, …
  db/
    schema.ts                      # auth tables + app tables (project, deployment)
    index.ts                       # Drizzle + Neon client
  lib/
    env.ts                         # zod-validated environment
    auth.ts / auth-client.ts       # better-auth server + React client
    session.ts                     # getSession() / requireSession() helpers
    site.ts                        # public URL + site metadata
nextdeploy.yml                     # the deploy, in git
Dockerfile                         # standalone container image
```

## License

MIT — take it, ship it.
