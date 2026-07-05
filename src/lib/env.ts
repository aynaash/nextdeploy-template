import { z } from "zod";

// Fail fast on misconfiguration: validate the environment once, at import time,
// so a missing secret is a clear startup error instead of a mysterious 500.
const schema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "required — your Neon/Postgres connection string"),
  BETTER_AUTH_SECRET: z
    .string()
    .min(1, "required — generate with: openssl rand -base64 32"),
  // Optional in dev (better-auth infers it); set to https://your-domain.com in prod.
  BETTER_AUTH_URL: z.string().url().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(
    `Invalid environment variables:\n${issues}\n\nCopy .env.example to .env and fill these in.`,
  );
}

export const env = parsed.data;
