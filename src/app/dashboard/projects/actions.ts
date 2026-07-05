"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { deployment, project } from "@/db/schema";
import { requireSession } from "@/lib/session";

export type ActionState = { error?: string } | undefined;

const createSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Give your project a name")
    .max(60, "Keep the name under 60 characters"),
  domain: z
    .string()
    .trim()
    .max(120, "Domain looks too long")
    .optional(),
});

// A fake-but-plausible short commit SHA so the activity feed reads like the real
// thing. Replace with your VCS ref when you wire this to a real pipeline.
function shortSha() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 7);
}

export async function createProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user } = await requireSession();

  const parsed = createSchema.safeParse({
    name: formData.get("name"),
    domain: (formData.get("domain") as string) || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const [created] = await db
    .insert(project)
    .values({
      name: parsed.data.name,
      domain: parsed.data.domain,
      userId: user.id,
    })
    .returning({ id: project.id });

  await db.insert(deployment).values({
    projectId: created.id,
    userId: user.id,
    commit: shortSha(),
    message: "Initial deploy",
    status: "building",
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  return undefined;
}

// "Ship" a project: record a new deployment and flip the project live. This is
// the write path a real deploy webhook would call.
export async function shipProject(formData: FormData): Promise<void> {
  const { user } = await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Ownership check — never trust the id from the client alone.
  const [owned] = await db
    .select({ id: project.id })
    .from(project)
    .where(and(eq(project.id, id), eq(project.userId, user.id)))
    .limit(1);
  if (!owned) return;

  await db.insert(deployment).values({
    projectId: id,
    userId: user.id,
    commit: shortSha(),
    message: "Manual ship from dashboard",
    status: "live",
  });
  await db
    .update(project)
    .set({ status: "live", updatedAt: new Date() })
    .where(eq(project.id, id));

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const { user } = await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await db
    .delete(project)
    .where(and(eq(project.id, id), eq(project.userId, user.id)));

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
}
