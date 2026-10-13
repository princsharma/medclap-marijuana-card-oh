/**
 * Blog posts: one JSON file per post in content/posts/<slug>.json, so drafts on separate branches never conflict.
 * Same rules as every page (brand/content-system.md): primary sources only, dated, and no author or medical-review
 * byline until that person has actually approved the post.
 * Body uses light markup: "## " headings, "- " list lines, **bold**, [label](href).
 * Server-only (read from disk at build time).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { SiteImage } from '@/brand/images';

export type Post = {
  slug: string;            // must equal the file name
  title: string;
  metaTitle: string;       // <= 60 characters
  description: string;     // 50 to 160 characters
  published: string;       // YYYY-MM-DD
  updated?: string;
  authorApprovedOn: string | null;
  medicallyReviewedOn: string | null;
  keyTakeaways: string[];  // 3 to 5 short points shown above the article
  body: string[];
  sources: [string, string][];
  related?: string[];      // slugs of other posts; the section shows only when at least one exists
  image?: SiteImage;       // hero/OG image (2048x1152)
};

const DIR = path.join(process.cwd(), 'content', 'posts');

export const posts: Post[] = fs.readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => {
    const p = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Post;
    if (`${p.slug}.json` !== f) throw new Error(`content/posts/${f}: slug "${p.slug}" must match the file name`);
    return p;
  })
  .sort((a, b) => b.published.localeCompare(a.published));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
