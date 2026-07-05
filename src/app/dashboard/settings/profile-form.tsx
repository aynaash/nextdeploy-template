"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export function ProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<
    { type: "ok" | "error"; text: string } | null
  >(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const result = await authClient.updateUser({ name: name.trim() });
    setPending(false);

    if (result.error) {
      setMessage({
        type: "error",
        text: result.error.message ?? "Could not save changes",
      });
      return;
    }

    setMessage({ type: "ok", text: "Saved" });
    router.refresh();
  }

  const dirty = name.trim() !== initialName && name.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-stone-700">Display name</span>
        <input
          type="text"
          required
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/20"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || !dirty}
          className="inline-flex items-center justify-center rounded-lg bg-[#006600] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#005500] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {message && (
          <span
            className={`text-sm ${message.type === "ok" ? "text-[#006600]" : "text-red-600"}`}
          >
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
