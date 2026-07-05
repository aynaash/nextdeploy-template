import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { project, type ProjectStatus } from "@/db/schema";
import { requireSession } from "@/lib/session";

import { deleteProject, shipProject } from "./actions";
import { ProjectForm } from "./project-form";

const statusStyle: Record<ProjectStatus, string> = {
  building: "bg-[#F5A623]/15 text-[#946200]",
  live: "bg-[#006600]/10 text-[#006600]",
  stopped: "bg-stone-100 text-stone-500",
};

export default async function ProjectsPage() {
  const { user } = await requireSession();

  const projects = await db
    .select()
    .from(project)
    .where(eq(project.userId, user.id))
    .orderBy(desc(project.createdAt));

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Projects
        </h1>
        <p className="text-sm text-stone-500">
          Create a project, then ship it. Every action here writes to your Neon
          Postgres — real full-stack CRUD.
        </p>
      </div>

      {/* Create */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <ProjectForm />
      </section>

      {/* List */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white/50 px-6 py-16 text-center">
          <p className="text-sm font-medium text-stone-700">No projects yet</p>
          <p className="mt-1 text-sm text-stone-500">
            Create your first project above to see it here.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-stone-900">
                    {p.name}
                  </p>
                  <p className="truncate text-sm text-stone-500">
                    {p.domain ?? "no domain set"}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[p.status]}`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400">
                  created {p.createdAt.toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <form action={shipProject}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-[#006600] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#005500]"
                    >
                      Ship
                    </button>
                  </form>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-[#BB0000]"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
