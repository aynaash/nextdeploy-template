"use client";

import { useActionState, useEffect, useRef } from "react";

import { createProject, type ActionState } from "./actions";

export function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<ActionState, FormData>(
    createProject,
    undefined,
  );

  // Clear the inputs after a successful create (no error came back).
  useEffect(() => {
    if (!pending && state === undefined) formRef.current?.reset();
  }, [pending, state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-stone-700">Project name</span>
        <input
          name="name"
          required
          maxLength={60}
          placeholder="pesameza"
          className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/20"
        />
      </label>
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-stone-700">
          Domain <span className="text-stone-400">(optional)</span>
        </span>
        <input
          name="domain"
          maxLength={120}
          placeholder="pesameza.com"
          className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/20"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Creating…" : "New project"}
      </button>
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 sm:hidden">
          {state.error}
        </p>
      )}
    </form>
  );
}
