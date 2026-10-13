import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Staging and previews: block everything (pages also carry noindex).
// Production (ALLOW_INDEXING=true): open to search engines and AI answer engines,
// so the site can be cited in Google AI Overviews, ChatGPT search, Claude, Perplexity and Grok.
export default function robots(): MetadataRoute.Robots {
  if (process.env.ALLOW_INDEXING !== 'true') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  const privatePaths = ['/api/', '/design-system'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privatePaths },
      // Named explicitly so a future blanket rule never shuts out answer engines.
      {
        userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'],
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
