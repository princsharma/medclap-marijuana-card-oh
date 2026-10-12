/** Ohio Leaf Check — official mark (brand/logo/1-ohio-leaf-check-*.svg, chosen 13 Oct 2026). */
const LEAF = 'M18 13 L49 13 L56 20 L68 17 L82 27 L79 53 L72 60 L69 78 L55 88 L42 82 L31 87 L22 77 L18 60 L13 51 L16 34 Z';
const CHECK = 'M25 54 L41 68 L72 32';

export function LeafMark({ size = 40, inverse = false }: { size?: number; inverse?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="10 10 75 81" aria-hidden="true" focusable="false">
      <path d={LEAF} fill={inverse ? 'var(--teal-50)' : 'var(--teal-600)'} />
      <path d={CHECK} fill="none" stroke={inverse ? 'var(--teal-600)' : 'var(--sun-400)'} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
