import { sql } from "drizzle-orm";

import { db } from "@/db";

// Health check for the VPS: `nextdeploy ship` polls this before flipping traffic
// to a new release, so it must reflect real readiness — including the database.
// Always dynamic; never cached.
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = performance.now();

  try {
    await db.execute(sql`select 1`);
  } catch (error) {
    return Response.json(
      {
        status: "error",
        database: "unreachable",
        message: error instanceof Error ? error.message : "unknown error",
      },
      { status: 503 },
    );
  }

  return Response.json(
    {
      status: "ok",
      database: "ok",
      uptime: Math.round(process.uptime()),
      latencyMs: Math.round(performance.now() - startedAt),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
