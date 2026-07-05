// A stylized Nairobi skyline silhouette — the cylindrical KICC tower at centre,
// Times Tower, UAP, and the CBD blocks. Purely decorative.
export function NairobiSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      {/* left CBD blocks */}
      <rect x="40" y="120" width="46" height="80" />
      <rect x="96" y="96" width="34" height="104" />
      <rect x="140" y="140" width="40" height="60" />
      <rect x="190" y="108" width="30" height="92" />
      {/* Times Tower (tall, tapered) */}
      <path d="M250 200V70l16-18 16 18v130z" />
      <rect x="262" y="40" width="8" height="14" />
      {/* mid blocks */}
      <rect x="320" y="130" width="44" height="70" />
      <rect x="374" y="104" width="30" height="96" />
      <rect x="416" y="150" width="50" height="50" />
      {/* KICC — cylindrical tower with the helipad crown */}
      <rect x="560" y="60" width="80" height="140" />
      <ellipse cx="600" cy="60" rx="40" ry="9" />
      <ellipse cx="600" cy="52" rx="48" ry="8" />
      <rect x="596" y="30" width="8" height="20" />
      {/* right blocks */}
      <rect x="680" y="120" width="40" height="80" />
      <rect x="728" y="96" width="34" height="104" />
      {/* UAP-ish glass tower */}
      <path d="M800 200V80l20-24 20 24v120z" />
      <rect x="870" y="130" width="44" height="70" />
      <rect x="922" y="110" width="30" height="90" />
      <rect x="962" y="146" width="46" height="54" />
      <rect x="1016" y="118" width="34" height="82" />
      <rect x="1060" y="140" width="50" height="60" />
      <rect x="1120" y="126" width="40" height="74" />
    </svg>
  );
}
