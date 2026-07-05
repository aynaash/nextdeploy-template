export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#faf8f3]">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-[#006600]"
        aria-label="Loading"
      />
    </div>
  );
}
