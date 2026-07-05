import { headers } from "next/headers";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";
import { NairobiSkyline } from "@/components/nairobi-skyline";
import { auth } from "@/lib/auth";

const specs = [
  { k: "Framework", v: "Next.js 15 · RSC" },
  { k: "Auth", v: "better-auth" },
  { k: "Database", v: "Neon + Drizzle" },
  { k: "Runtime", v: "Node · your VPS" },
  { k: "TLS", v: "Caddy · auto-HTTPS" },
];

const stats = [
  { value: "1", label: "command to ship" },
  { value: "0s", label: "downtime deploys" },
  { value: "$5", label: "vps a month" },
  { value: "100%", label: "yours" },
];

const features = [
  {
    n: "01",
    title: "Auth, wired not stubbed",
    body: "better-auth with email + password and sessions persisted in Postgres. Sign-up, sessions, sign-out — working on first run.",
    accent: "bg-black",
  },
  {
    n: "02",
    title: "Serverless Postgres",
    body: "Neon + Drizzle ORM. A typed schema and one-command migrations with db:push. Real full-stack CRUD out of the box.",
    accent: "bg-[#BB0000]",
  },
  {
    n: "03",
    title: "Deploy to your VPS",
    body: "One committed nextdeploy.yml. Zero-downtime ships that health-check before the traffic flips, instant rollbacks, HTTPS via Caddy.",
    accent: "bg-[#006600]",
  },
];

const ticker = [
  "Silicon Savannah",
  "Konza Technopolis",
  "iHub",
  "Nairobi CBD",
  "M-Pesa scale",
  "Own your server",
  "No lock-in",
  "No surprise bills",
];

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-900">
      <FlagStripe />

      {/* Nav */}
      <header className="border-b-2 border-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Shield className="h-8 w-7" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
              NextDeploy
            </span>
            <span className="text-xs">🇰🇪</span>
          </Link>
          <nav className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.15em]">
            {session ? (
              <Link
                href="/dashboard"
                className="border-2 border-stone-900 bg-stone-900 px-4 py-2 text-[#faf8f3] transition hover:bg-transparent hover:text-stone-900"
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden px-4 py-2 text-stone-500 transition hover:text-stone-900 sm:block"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="border-2 border-stone-900 bg-stone-900 px-4 py-2 text-[#faf8f3] transition hover:bg-transparent hover:text-stone-900"
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b-2 border-stone-900">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          {/* Left — the pitch */}
          <div className="border-stone-900 px-5 py-12 lg:col-span-7 lg:border-r-2 lg:py-20 lg:pl-8 lg:pr-12">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
              <span className="bg-stone-900 px-2 py-1 text-[#faf8f3]">
                01 / Deploy
              </span>
              <span>01°17′S · 36°49′E — Nairobi</span>
            </div>

            <h1 className="mt-8 text-[2.6rem] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Ship full-stack
              <br />
              apps to a box
              <br />
              you{" "}
              <span className="box-decoration-clone bg-[#006600] px-2 text-[#faf8f3]">
                actually own.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-stone-600">
              Next.js, auth and Postgres — wired, not stubbed — shipped to your
              own VPS with a single command. No platform in the middle, no
              lock-in, no surprise bill.
            </p>

            <div className="mt-9 flex flex-wrap">
              <Link
                href={session ? "/dashboard" : "/sign-up"}
                className="border-2 border-stone-900 bg-stone-900 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[#faf8f3] transition hover:bg-transparent hover:text-stone-900"
              >
                {session ? "Open dashboard →" : "Get started free →"}
              </Link>
              <a
                href="https://github.com/aynaash/nextdeploy-template"
                className="-ml-0.5 border-2 border-stone-900 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-stone-900 hover:text-[#faf8f3]"
              >
                Source ↗
              </a>
            </div>
          </div>

          {/* Right — the manifest */}
          <div className="flex flex-col justify-between bg-stone-900 px-5 py-12 text-[#faf8f3] lg:col-span-5 lg:p-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
                {"// the stack"}
              </p>
              <dl className="mt-6 divide-y divide-white/10 font-mono text-sm">
                {specs.map((s) => (
                  <div
                    key={s.k}
                    className="flex items-center justify-between py-3.5"
                  >
                    <dt className="uppercase tracking-widest text-stone-500">
                      {s.k}
                    </dt>
                    <dd className="text-right">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <NairobiSkyline className="mt-10 h-16 w-full text-white/15" />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b-2 border-stone-900 bg-[#BB0000]">
        <div className="flex w-max animate-marquee py-2.5">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-white"
            >
              {ticker.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="px-6">{item}</span>
                  <span className="text-white/50">◆</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="border-b-2 border-stone-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-stone-900 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#faf8f3] px-5 py-9 lg:px-8">
              <div className="font-mono text-4xl font-bold tracking-tight lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b-2 border-stone-900">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between px-5 py-6 lg:px-8">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
              {"// what you get"}
            </h2>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-400">
              03 · included
            </span>
          </div>
          <ul>
            {features.map((f) => (
              <li
                key={f.n}
                className="grid items-start gap-4 border-t-2 border-stone-900 px-5 py-8 lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-8"
              >
                <div className="flex items-center gap-4 lg:col-span-2">
                  <span className={`h-3 w-3 ${f.accent}`} />
                  <span className="font-mono text-sm text-stone-400">{f.n}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight lg:col-span-4 lg:text-3xl">
                  {f.title}
                </h3>
                <p className="max-w-xl leading-relaxed text-stone-600 lg:col-span-6">
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Terminal */}
      <section className="border-b-2 border-stone-900 bg-stone-950 text-stone-100">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
            {"// the whole deploy"}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight lg:text-5xl">
            Three commands. Then it&rsquo;s just{" "}
            <span className="text-[#4ade80]">nextdeploy ship</span>.
          </h2>

          <div className="mt-10 max-w-3xl border-2 border-stone-700 bg-black">
            <div className="flex items-center gap-2 border-b-2 border-stone-800 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#BB0000]" />
              <span className="h-3 w-3 rounded-full bg-[#F5A623]" />
              <span className="h-3 w-3 rounded-full bg-[#006600]" />
              <span className="ml-2 font-mono text-xs text-stone-500">
                ubuntu@nairobi — nextdeploy
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-stone-300">
              <code>
                <span className="text-stone-500">
                  # provision your VPS — once
                </span>
                {"\n"}
                <span className="text-[#F5A623]">$</span> nextdeploy prepare
                {"\n\n"}
                <span className="text-stone-500"># load your secrets</span>
                {"\n"}
                <span className="text-[#F5A623]">$</span> nextdeploy secrets load
                .env.production{"\n\n"}
                <span className="text-stone-500">
                  # build + ship, zero downtime
                </span>
                {"\n"}
                <span className="text-[#F5A623]">$</span> nextdeploy ship{"   "}
                <span className="text-[#4ade80]">✓ live at your domain</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Harambee CTA */}
      <section className="border-b-2 border-stone-900 bg-[#006600] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-12 lg:items-end lg:px-8">
          <div className="lg:col-span-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
              {"// harambee — pull together"}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[0.95] tracking-tight lg:text-6xl">
              Own your server.
              <br />
              Own your data.
              <br />
              Own your deploy.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/80">
              Kenya&rsquo;s spirit of pulling together, in your stack. Built in
              the Silicon Savannah — for Nairobi and beyond.
            </p>
            <Link
              href={session ? "/dashboard" : "/sign-up"}
              className="mt-6 inline-block border-2 border-white bg-white px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[#006600] transition hover:bg-transparent hover:text-white"
            >
              {session ? "Open dashboard →" : "Create an account →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 font-mono text-xs uppercase tracking-[0.15em] text-stone-500 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2.5 text-stone-700">
            <Shield className="h-5 w-4" />
            NextDeploy · Nairobi 🇰🇪
          </span>
          <a
            href="https://hersitech.com/talks/nextdeploy"
            className="underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            About the talk ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
