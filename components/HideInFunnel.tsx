'use client';
import { usePathname } from 'next/navigation';

/** Hides site-wide chrome (header, footer) on funnel pages so visitors have no exit points. */
export const FUNNEL_PATHS = ['/get-started'];
export function HideInFunnel({ children }: { children: React.ReactNode }) {
  const p = usePathname() ?? '';
  return FUNNEL_PATHS.some((f) => p === f || p.startsWith(`${f}/`)) ? null : <>{children}</>;
}
