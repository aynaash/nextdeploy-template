import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Middleware runs on the Edge runtime, so it must NOT import the DB or the
// better-auth server instance (they pull in Node-only APIs). We do an OPTIMISTIC
// check on the presence of the session cookie only — the real session is still
// verified server-side in requireSession(). This just avoids a flash of a
// protected page for signed-out visitors.
const PROTECTED = ["/dashboard"];

// Baseline hardening applied to every response.
const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control": "on",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const signIn = new URL("/sign-in", request.url);
      signIn.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signIn);
    }
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  // Run on everything except Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|.*\\.[\\w]+$).*)"],
};
