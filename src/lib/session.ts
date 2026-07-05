import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

// The current session, or null. Cheap to call in a Server Component — better-auth
// caches the session in a signed cookie (see cookieCache in lib/auth.ts).
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// Same, but bounces to /sign-in when there is no session. Use this in every
// protected route so the redirect logic lives in exactly one place.
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}
