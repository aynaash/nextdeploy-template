import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#faf8f3] px-6">
      <FlagStripe className="absolute inset-x-0 top-0" />
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <Shield className="h-12 w-10" />
        <p className="text-5xl font-semibold tracking-tight text-stone-900">
          404
        </p>
        <p className="text-sm text-stone-500">
          This page took a matatu somewhere else. Let&apos;s get you back.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
