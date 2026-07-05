import Link from "next/link";

import { DashboardNav } from "@/components/dashboard-nav";
import { FlagStripe, Shield } from "@/components/flag-stripe";
import { SignOutButton } from "@/components/sign-out-button";
import { requireSession } from "@/lib/session";

// One place enforces auth for every /dashboard/* route, and renders the shared
// top bar + tab nav so each page only has to render its own content.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireSession();
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <FlagStripe />

      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <Shield className="h-7 w-6" />
            <span>
              NextDeploy{" "}
              <span className="align-middle text-xs font-normal text-stone-400">
                🇰🇪
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-8 w-8 place-items-center rounded-full bg-black text-sm font-medium text-white">
                {initial}
              </div>
            )}
            <SignOutButton />
          </div>
        </div>
        <DashboardNav />
      </header>

      {children}
    </div>
  );
}
