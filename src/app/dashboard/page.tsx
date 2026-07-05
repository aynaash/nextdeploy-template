import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  deployment,
  project,
  session as sessionTable,
  type DeploymentStatus,
} from "@/db/schema";
import { requireSession } from "@/lib/session";

const deployStatusStyle: Record<DeploymentStatus, string> = {
  building: "bg-[#F5A623]/15 text-[#946200]",
  live: "bg-[#006600]/10 text-[#006600]",
  failed: "bg-[#BB0000]/10 text-[#BB0000]",
  "rolled-back": "bg-stone-100 text-stone-500",
};

// Compact relative time — "just now", "3h ago", "2d ago".
function timeAgo(date: Date) {
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function DashboardPage() {
  const { user } = await requireSession();
  const firstName = user.name.split(" ")[0];

  // All dashboard numbers below are read live from Postgres — nothing is mocked.
  const [sessions, projects, [{ value: deployCount }], recentDeploys] =
    await Promise.all([
      db
        .select({
          id: sessionTable.id,
          createdAt: sessionTable.createdAt,
          ipAddress: sessionTable.ipAddress,
          userAgent: sessionTable.userAgent,
        })
        .from(sessionTable)
        .where(eq(sessionTable.userId, user.id)),
      db.select().from(project).where(eq(project.userId, user.id)),
      db
        .select({ value: count() })
        .from(deployment)
        .where(eq(deployment.userId, user.id)),
      db
        .select({
          id: deployment.id,
          commit: deployment.commit,
          message: deployment.message,
          status: deployment.status,
          createdAt: deployment.createdAt,
          projectName: project.name,
          projectDomain: project.domain,
        })
        .from(deployment)
        .innerJoin(project, eq(deployment.projectId, project.id))
        .where(eq(deployment.userId, user.id))
        .orderBy(desc(deployment.createdAt))
        .limit(6),
    ]);

  const liveProjects = projects.filter((p) => p.status === "live").length;
  const current = recentDeploys[0];

  const memberSince = user.createdAt.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const stats = [
    { value: String(projects.length), label: "Projects" },
    { value: String(deployCount), label: "Deployments" },
    { value: String(sessions.length), label: "Active sessions" },
    { value: memberSince, label: "Member since" },
  ];

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm text-stone-500">
          Here&apos;s what&apos;s happening with your deployments on the Silicon
          Savannah.
        </p>
      </div>

      {/* Stat tiles */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-5 py-6">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">
              {s.label}
            </dt>
            <dd className="mt-1.5 text-xl font-semibold text-stone-900">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: current release + activity */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Current release */}
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <h2 className="font-semibold text-stone-900">Current release</h2>
              {current && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${deployStatusStyle[current.status]}`}
                >
                  {current.status === "live" && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#006600]" />
                  )}
                  {current.status}
                </span>
              )}
            </div>
            {current ? (
              <dl className="grid grid-cols-2 gap-y-4 px-6 py-5 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-stone-400">Project</dt>
                  <dd className="mt-0.5 truncate font-medium text-stone-900">
                    {current.projectName}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">Domain</dt>
                  <dd className="mt-0.5 truncate font-medium text-stone-900">
                    {current.projectDomain ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">Commit</dt>
                  <dd className="mt-0.5 font-mono font-medium text-stone-900">
                    {current.commit}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">Shipped</dt>
                  <dd className="mt-0.5 font-medium text-stone-900">
                    {timeAgo(current.createdAt)}
                  </dd>
                </div>
              </dl>
            ) : (
              <div className="px-6 py-10 text-center text-sm text-stone-500">
                No releases yet.{" "}
                <Link
                  href="/dashboard/projects"
                  className="font-medium text-[#006600] underline-offset-2 hover:underline"
                >
                  Create and ship a project →
                </Link>
              </div>
            )}
          </section>

          {/* Deploy activity */}
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <h2 className="font-semibold text-stone-900">Recent deploys</h2>
              <Link
                href="/dashboard/projects"
                className="text-xs font-medium text-stone-400 hover:text-stone-700"
              >
                Manage →
              </Link>
            </div>
            {recentDeploys.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-stone-500">
                Your deploy history will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-stone-100">
                {recentDeploys.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center gap-4 px-6 py-3.5 text-sm"
                  >
                    <span className="font-mono text-xs text-stone-400">
                      {d.commit}
                    </span>
                    <span className="flex-1 truncate text-stone-700">
                      <span className="font-medium text-stone-900">
                        {d.projectName}
                      </span>{" "}
                      · {d.message}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${deployStatusStyle[d.status]}`}
                    >
                      {d.status}
                    </span>
                    <span className="w-16 text-right text-xs text-stone-400">
                      {timeAgo(d.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Right: projects summary + sessions */}
        <div className="flex flex-col gap-6">
          {/* Projects summary */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-stone-900">Projects</h2>
              <Link
                href="/dashboard/projects"
                className="text-xs font-medium text-[#006600] underline-offset-2 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <p className="text-3xl font-semibold text-stone-900">
                  {liveProjects}
                </p>
                <p className="text-xs text-stone-400">live</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-stone-900">
                  {projects.length}
                </p>
                <p className="text-xs text-stone-400">total</p>
              </div>
            </div>
          </section>

          {/* Active sessions */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-stone-900">
              Active sessions ({sessions.length})
            </h2>
            <ul className="mt-3 flex flex-col gap-3">
              {sessions.map((s) => (
                <li key={s.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#006600]" />
                  <div className="min-w-0">
                    <p className="font-medium text-stone-800">
                      {s.ipAddress ?? "unknown IP"}
                    </p>
                    <p className="truncate text-xs text-stone-400">
                      {s.userAgent ?? "unknown device"}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400">
                      started {s.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
