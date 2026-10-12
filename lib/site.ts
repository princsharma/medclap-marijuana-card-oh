import { brand } from '@/brand/site';
/** Staging shows placeholder slots for unconfirmed details; production never does. */
export const showPending = process.env.NEXT_PUBLIC_SITE_ENV !== 'production';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`).replace(/\/$/, '');
export const siteName = brand.name;
