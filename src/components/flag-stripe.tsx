// The Kenyan flag as a thin accent bar: black · white · red · white · green.
export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1.5 w-full overflow-hidden ${className}`}>
      <span className="flex-1 bg-black" />
      <span className="w-1 bg-white" />
      <span className="flex-[2] bg-[#BB0000]" />
      <span className="w-1 bg-white" />
      <span className="flex-1 bg-[#006600]" />
    </div>
  );
}

// Maasai shield mark — the brand glyph.
export function Shield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" className={className} aria-hidden fill="none">
      <path
        d="M12 1.5 21 5v9c0 6.2-4.2 10.4-9 12.5C7.2 24.4 3 20.2 3 14V5l9-3.5Z"
        className="fill-black"
      />
      <path d="M4.5 9h15v6.5h-15z" className="fill-[#BB0000]" />
      <path
        d="M12 6.5 15.5 12H8.5L12 6.5Zm0 11-3.5-5.5h7L12 17.5Z"
        className="fill-white"
      />
    </svg>
  );
}
