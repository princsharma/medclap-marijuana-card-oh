/** Four-Leaf Cross — official mark (brand/logo/4-four-leaf-cross-*.svg, chosen 13 Oct 2026). */
const TL = 'M45 45 C20 44 11 27 13 10 C31 8 46 19 45 45 Z';
const TR = 'M55 45 C54 20 71 9 89 10 C91 29 79 45 55 45 Z';
const BL = 'M45 55 C20 54 9 71 10 89 C29 91 45 79 45 55 Z';
const BR = 'M55 55 C54 80 71 91 89 90 C91 71 79 55 55 55 Z';

export function LeafMark({ size = 40, inverse = false }: { size?: number; inverse?: boolean }) {
  const leaf = inverse ? 'var(--teal-50)' : 'var(--teal-600)';
  return (
    <svg width={size} height={size} viewBox="8 8 84 84" aria-hidden="true" focusable="false">
      <path d={`${TL} ${BL} ${BR}`} fill={leaf} />
      <path d={TR} fill="var(--sun-400)" />
    </svg>
  );
}
