import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Split-screen shell for the auth pages: a savannah-at-dusk brand panel on the
// left (hidden on mobile) and the form on the right.
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-black lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* savannah sunset glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#F5A623]/40 via-[#BB0000]/20 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#006600]/25 blur-3xl"
        />

        <Link
          href="/"
          className="relative z-10 inline-flex w-fit items-center gap-2.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <Shield className="h-7 w-6" />
          NextDeploy 🇰🇪
        </Link>

        <div className="relative z-10 flex flex-col gap-4">
          <p className="text-3xl font-medium leading-snug text-white">
            Build it. Ship it. Own it.
          </p>
          <p className="max-w-sm text-white/60">
            Full-stack Next.js on a server that&apos;s yours — deployed with one
            command from the Silicon Savannah.
          </p>
          <p className="text-sm text-white/40">
            Next.js · better-auth · Neon Postgres · your VPS
          </p>
        </div>

        <FlagStripe className="absolute inset-x-0 bottom-0" />
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </main>
  );
}
