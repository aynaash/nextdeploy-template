"use client";

import { useEffect } from "react";

import { FlagStripe } from "@/components/flag-stripe";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire this to your error tracker (Sentry, etc.).
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-[#faf8f3] px-6">
      <FlagStripe className="absolute inset-x-0 top-0" />
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold text-stone-900">
          Something went wrong
        </h1>
        <p className="text-sm text-stone-500">
          An unexpected error occurred. You can try again — if it keeps
          happening, check the server logs with{" "}
          <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">
            nextdeploy logs
          </code>
          .
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-stone-400">
            digest: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
