'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { noTrackingPaths } from '@/brand/legal';

/**
 * Google Tag Manager (which loads GA4 and Microsoft Clarity), production only.
 *
 * Privacy Policy promise: GA4, Clarity and any ad pixel never run on pages where visitors answer health questions,
 * book or pay, or on condition pages (noTrackingPaths). Because GTM keeps running once loaded in a single-page app:
 *  1. GTM is never loaded on a no-tracking page.
 *  2. Once loaded, any link to a no-tracking page becomes a full page load, so the new page starts without GTM.
 *  3. Back/forward or programmatic navigation into one reloads the page for the same reason.
 *  4. GA4 page views come from our own `virtual_page_view` event, sent only on allowed pages.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const ENABLED = Boolean(GTM_ID) && process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export const isNoTrack = (path: string) =>
  noTrackingPaths.some((p) => (p.endsWith('/') ? path.startsWith(p) : path === p || path.startsWith(`${p}/`)));

type W = Window & { dataLayer?: Record<string, unknown>[]; __mcohGtm?: boolean };

function loadGtm(w: W) {
  if (w.__mcohGtm || !GTM_ID) return;
  w.__mcohGtm = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(s);

  // Leaving for a no-tracking page: do a full load instead of a client-side route change.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !isNoTrack(url.pathname)) return;
    e.preventDefault();
    e.stopPropagation();
    location.assign(url.href);
  }, true);
}

export function Analytics() {
  const path = usePathname() ?? '/';
  useEffect(() => {
    if (!ENABLED) return;
    const w = window as W;
    if (isNoTrack(path)) {
      if (w.__mcohGtm) location.reload(); // reached without a click (back button, router.push): start clean
      return;
    }
    loadGtm(w);
    w.dataLayer!.push({ event: 'virtual_page_view', page_path: path, page_location: location.origin + path, page_title: document.title });
  }, [path]);
  return null;
}
