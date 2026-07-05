// Rendered inside the dashboard layout (top bar + tabs stay put) while a
// dashboard page's server data is loading.
export default function DashboardLoading() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <div className="h-7 w-56 animate-pulse rounded-lg bg-stone-200" />
        <div className="h-4 w-80 animate-pulse rounded bg-stone-200/70" />
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white px-5 py-6">
            <div className="h-3 w-16 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-6 w-12 animate-pulse rounded bg-stone-200" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-2xl border border-stone-200 bg-white lg:col-span-2" />
        <div className="h-64 animate-pulse rounded-2xl border border-stone-200 bg-white" />
      </div>
    </main>
  );
}
