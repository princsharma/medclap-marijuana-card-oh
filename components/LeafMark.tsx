export function LeafMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g transform="rotate(35 32 32)">
        <path d="M32 4 C50 18 52 42 32 60 C12 42 14 18 32 4 Z" fill="var(--teal-600)" />
        <rect x="29" y="20" width="6" height="22" rx="2" fill="var(--sun-400)" />
        <rect x="21" y="28" width="22" height="6" rx="2" fill="var(--sun-400)" />
      </g>
    </svg>
  );
}
