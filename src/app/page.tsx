import { headers } from "next/headers";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";
import { NairobiSkyline } from "@/components/nairobi-skyline";
import { auth } from "@/lib/auth";

const stats = [
  { value: "1", label: "command to ship" },
  { value: "0s", label: "downtime deploys" },
  { value: "$5", label: "VPS a month is plenty" },
  { value: "100%", label: "yours — no lock-in" },
];

const features = [
  {
    title: "Auth included",
    body: "better-auth with email + password and sessions in Postgres. Wired, not stubbed.",
    accent: "bg-black",
  },
  {
    title: "Serverless Postgres",
    body: "Neon + Drizzle ORM. Typed schema, one-command migrations with db:push.",
    accent: "bg-[#BB0000]",
  },
  {
    title: "Deploy to your VPS",
    body: "One committed nextdeploy.yml. Zero-downtime ships, instant rollbacks, HTTPS via Caddy.",
    accent: "bg-[#006600]",
  },
];

const ecosystem = [
  "Silicon Savannah",
  "Konza Technopolis",
  "iHub",
  "Nairobi CBD",
  "M-Pesa scale",
];

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <FlagStripe />

      {/* Nav */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <Shield className="h-7 w-6" />
          <span>
            NextDeploy{" "}
            <span className="align-middle text-xs font-normal text-stone-400">
              🇰🇪
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-stone-800"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 font-medium text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-900"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-[#006600] px-4 py-2 font-medium text-white transition hover:bg-[#005500]"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-8 pt-14 text-center sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#006600]" />
          Built in the Silicon Savannah · Nairobi, Kenya
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-6xl">
          Deploy full-stack apps{" "}
          <span className="bg-gradient-to-r from-[#BB0000] via-black to-[#006600] bg-clip-text text-transparent">
            from the Silicon Savannah.
          </span>
        </h1>

        <p className="max-w-xl text-lg text-stone-600">
          A Next.js starter with auth and Postgres already wired — shipped to a
          server <strong className="text-stone-900">you own</strong> with a
          single command. Mobile-first, built for Nairobi and beyond.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={session ? "/dashboard" : "/sign-up"}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800"
          >
            {session ? "Open dashboard" : "Get started free"}
            <span className="transition group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="https://github.com/aynaash/nextdeploy-template"
            className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Skyline band */}
      <div className="relative mx-auto max-w-6xl px-6">
        <NairobiSkyline className="h-24 w-full text-stone-900/10 sm:h-32" />
      </div>

      {/* One-command terminal */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="overflow-hidden rounded-xl border border-stone-800 bg-stone-950 shadow-xl">
          <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#BB0000]" />
            <span className="h-3 w-3 rounded-full bg-[#F5A623]" />
            <span className="h-3 w-3 rounded-full bg-[#006600]" />
            <span className="ml-2 text-xs text-stone-500">
              nairobi — nextdeploy
            </span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed text-stone-300">
            <code>
              <span className="text-stone-500">
                # provision your VPS — once
              </span>
              {"\n"}
              <span className="text-[#F5A623]">$</span> nextdeploy prepare{"\n"}
              <span className="text-stone-500"># load your secrets</span>
              {"\n"}
              <span className="text-[#F5A623]">$</span> nextdeploy secrets load
              .env.production{"\n"}
              <span className="text-stone-500">
                # build + ship, zero downtime
              </span>
              {"\n"}
              <span className="text-[#F5A623]">$</span> nextdeploy ship{"  "}
              <span className="text-[#006600]">✓ live at your domain</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 text-center">
              <dt className="text-3xl font-semibold text-stone-900">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-stone-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className={`h-1 w-full ${f.accent}`} />
              <div className="p-6">
                <h3 className="font-semibold text-stone-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem strip */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
          Made for Africa&apos;s fastest-growing tech scene
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-stone-500">
          {ecosystem.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      {/* Harambee banner */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-black px-8 py-12 text-center sm:py-16">
          <FlagStripe className="absolute inset-x-0 top-0" />
          <p className="text-2xl font-semibold text-white sm:text-3xl">
            Harambee — pull together 🤝
          </p>
          <p className="mx-auto mt-3 max-w-lg text-stone-300">
            Kenya&apos;s spirit of pulling together, in your stack: own your
            server, own your data, own your deploy. No platform lock-in, no
            surprise bills.
          </p>
          <Link
            href={session ? "/dashboard" : "/sign-up"}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-stone-200"
          >
            {session ? "Open dashboard" : "Create a free account"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-stone-500">
            <Shield className="h-5 w-4" />
            Built with the NextDeploy template · from Nairobi 🇰🇪
          </p>
          <a
            href="https://hersitech.com/talks/nextdeploy"
            className="text-sm text-stone-600 underline-offset-2 hover:underline"
          >
            about the talk
          </a>
        </div>
      </footer>
    </div>
  );
}
