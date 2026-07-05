// Public base URL of the deployment. Set BETTER_AUTH_URL to https://your-domain
// in production; falls back to localhost in dev. Used for metadata, sitemap, etc.
export const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "NextDeploy",
  title: "NextDeploy 🇰🇪 — from the Silicon Savannah",
  description:
    "Kujenga. Kupeleka. Kumiliki. Next.js + better-auth + Neon Postgres, deployed to a VPS you own with one command. Built in Nairobi.",
} as const;
