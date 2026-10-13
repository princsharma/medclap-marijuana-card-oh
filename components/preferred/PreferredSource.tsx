import { brand } from '@/brand/site';
import s from './preferred.module.css';

/**
 * Google "preferred sources" deeplink (developers.google.com/search/docs/appearance/preferred-sources).
 * Uses the no-JavaScript link, not Google's publisher.js button, so no third-party script loads on our pages
 * (Privacy Policy). Readers who add us see our pages more often in Top Stories, AI Mode and AI Overviews.
 */
export const PREFERRED_SOURCE_URL = `https://www.google.com/preferences/source?q=${brand.domain}`;

export function PreferredSource({ variant = 'button' }: { variant?: 'button' | 'link' }) {
  return (
    <a className={variant === 'button' ? s.btn : s.link} href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener"
      aria-label={`Add ${brand.name} as a preferred source on Google (opens in a new tab)`}>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
      <span>Add us as a preferred source on Google</span>
    </a>
  );
}
