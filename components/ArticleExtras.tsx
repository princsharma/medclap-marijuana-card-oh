import Link from 'next/link';
import { Summarize, Helpful, CopyLink } from '@/components/help/ArticleTools';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { helpPaths } from '@/content/help';
import { siteUrl } from '@/lib/site';
import h from '@/components/help/help.module.css';
import pg from '@/components/page.module.css';

/** Top of an article: "Summarize this article with:" plus the last-updated line. */
export function ArticleTop({ path, title, updated, readMinutes }: { path: string; title: string; updated: string; readMinutes?: number }) {
  const d = new Date(`${updated}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return (
    <div className={h.meta}>
      <Summarize url={`${siteUrl}${path}`} title={title} source="Marijuana Card OH" />
      <p className={h.updated}>Last updated <time dateTime={updated}>{d}</time>{readMinutes ? ` · ${readMinutes} min read` : ''}</p>
    </div>
  );
}

/** Bottom of an article: helpful vote, share, related articles, still need help. Same parts as Help Center articles. */
export function ArticleBottom({ path, related }: { path: string; related: [string, string][] }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-xl)', maxWidth: '48rem' }}>
      <Helpful />
      <div className={h.share}>
        <p className={h.shareLabel}>Share this article</p>
        <CopyLink url={`${siteUrl}${path}`} />
      </div>
      {related.length ? (
        <section className={h.panel} aria-labelledby="related-title">
          <h2 id="related-title" className={h.panelTitle}>Related articles</h2>
          <ul className={h.linkList}>
            {related.map(([label, href]) => (
              <li key={href}><Icon name="book-open" size={16} /><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className={h.stillHelp}>
        <div>
          <p className={h.panelTitle}>Still need help?</p>
          <p className="small muted">Ask Instant AI Help or contact our team.</p>
        </div>
        <div className={h.stillBtns}>
          <Button href={helpPaths.ai} arrow>Ask Instant AI Help</Button>
          <Button href={helpPaths.contact} variant="secondary">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}

export const readMinutes = (texts: string[]) => Math.max(1, Math.ceil(texts.join(' ').split(/\s+/).length / 200));

/** "Share this article" with a copy-link button. */
export function ShareArticle({ path }: { path: string }) {
  return (
    <div className={h.share} style={{ maxWidth: '48rem' }}>
      <p className={h.shareLabel}>Share this article</p>
      <CopyLink url={`${siteUrl}${path}`} />
    </div>
  );
}

/** Key takeaways box, same look on blog posts, guides and condition pages. */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside className={pg.callout} style={{ maxWidth: '48rem' }} aria-labelledby="takeaways">
      <h2 id="takeaways" className="type-h3">Key takeaways</h2>
      <ul style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 'var(--space-sm)' }}>
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </aside>
  );
}

/** End of an article: helpful vote, then a related list (hidden when empty). */
export function ArticleEnd({ relatedTitle = 'Related articles', related }: { relatedTitle?: string; related: [string, string][] }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-xl)', maxWidth: '48rem' }}>
      <Helpful />
      {related.length ? (
        <section className={h.panel} aria-labelledby="related-title">
          <h2 id="related-title" className={h.panelTitle}>{relatedTitle}</h2>
          <ul className={h.linkList}>
            {related.map(([label, href]) => (
              <li key={href}><Icon name="book-open" size={16} /><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
