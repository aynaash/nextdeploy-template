import { requireSession } from "@/lib/session";

import { ProfileForm } from "./profile-form";

export default async function SettingsPage() {
  const { user } = await requireSession();

  const memberSince = user.createdAt.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Settings
        </h1>
        <p className="text-sm text-stone-500">
          Manage your profile and account.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-stone-900">Profile</h2>
        <p className="mt-1 text-sm text-stone-500">
          Your display name is stored in Postgres via better-auth.
        </p>
        <div className="mt-5">
          <ProfileForm initialName={user.name} />
        </div>
      </section>

      {/* Account */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-stone-900">Account</h2>
        <dl className="mt-4 divide-y divide-stone-100 text-sm">
          <div className="flex items-center justify-between py-3">
            <dt className="text-stone-500">Email</dt>
            <dd className="font-medium text-stone-900">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-stone-500">Email verified</dt>
            <dd>
              {user.emailVerified ? (
                <span className="rounded-full bg-[#006600]/10 px-2 py-0.5 text-xs font-medium text-[#006600]">
                  verified
                </span>
              ) : (
                <span className="rounded-full bg-[#F5A623]/15 px-2 py-0.5 text-xs font-medium text-[#946200]">
                  not verified
                </span>
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-stone-500">User ID</dt>
            <dd className="font-mono text-xs text-stone-500">{user.id}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-stone-500">Member since</dt>
            <dd className="font-medium text-stone-900">{memberSince}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
