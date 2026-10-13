import type { MetadataRoute } from 'next';
import { conditions } from '@/brand/conditions';
import { physicians } from '@/brand/site';
import { cities } from '@/content/locations';
import { guides } from '@/content/guides';
import { posts } from '@/content/blog';
import { articles, kbCategories, helpPaths } from '@/content/help';
import { IMG, cityImage, conditionImage, guideImage, postImage, type SiteImage } from '@/brand/images';
import { infographics, infographicPng } from '@/content/infographics';
import { siteUrl } from '@/lib/site';

// Indexable pages only. Left out on purpose: /get-started (funnel, noindex),
// /help/contact/* (forms, noindex), /book (redirect), /design-system (noindex).
const UPDATED = '2026-10-13';

type Entry = [path: string, priority: number, image?: SiteImage, lastModified?: string];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ['/', 1, IMG.stepQuestions],
    ['/how-it-works', 0.9, IMG.howItWorks],
    ['/pricing', 0.9, IMG.pricing],
    ['/eligibility', 0.8, IMG.eligibility],
    ['/conditions', 0.9, IMG.conditions],
    ['/renewals', 0.8, IMG.renewals],
    ['/doctors', 0.8],
    ['/locations', 0.8, IMG.locations],
    ['/dispensaries', 0.7],
    ['/faq', 0.7, IMG.faq],
    ['/about', 0.6, IMG.about],
    ['/refund-policy', 0.5, IMG.pricing],
    ['/editorial-policy', 0.4],
    ['/contact', 0.4],
    ['/blog', 0.6],
    ['/guides/ohio-medical-marijuana-registry', 0.7, IMG.guideRegistry],
    ['/help', 0.5],
    [helpPaths.kb, 0.5],
    ['/privacy', 0.2],
    ['/notice-of-privacy-practices', 0.2],
    ['/terms', 0.2],
    ['/telehealth-consent', 0.2],
    ...conditions.map((c): Entry => [`/conditions/${c.slug}`, 0.8, conditionImage[c.slug]]),
    ...physicians.map((p): Entry => [`/doctors/${p.slug}`, 0.6]),
    ...cities.filter((c) => c.published).map((c): Entry => [`/locations/${c.slug}`, 0.7, cityImage[c.slug]]),
    ...guides.map((g): Entry => [`/guides/${g.slug}`, 0.7, guideImage[g.slug]]),
    ...posts.map((p): Entry => [`/blog/${p.slug}`, 0.6, postImage[p.slug], p.updated ?? p.published]),
    ...kbCategories.map((c): Entry => [helpPaths.category(c.id), 0.4]),
    ...articles.map((a): Entry => [helpPaths.article(a.slug), 0.4, undefined, a.updated]),
  ];
  return entries.map(([path, priority, image, lastModified]) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified: lastModified ?? UPDATED,
    changeFrequency: priority >= 0.8 ? 'weekly' : 'monthly',
    priority,
    ...((() => { const imgs = [image?.src, ...infographics.filter((i) => i.page === path).map((i) => `${siteUrl}${infographicPng(i.slug)}`)].filter(Boolean) as string[]; return imgs.length ? { images: imgs } : {}; })()),
  }));
}
