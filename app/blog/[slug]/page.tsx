import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Body } from '@/components/Rich';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Summarize, Helpful, CopyLink } from '@/components/help/ArticleTools';
import { Icon } from '@/components/ui/Icon';
import { ArticleHero, Breadcrumbs, JsonLd, ReviewByline, Sources } from '@/components/PageParts';
import { getPost, posts } from '@/content/blog';
import { author, brand, medicalReviewer } from '@/brand/site';
import { siteUrl } from '@/lib/site';
import { postImage } from '@/brand/images';
import s from '@/components/page.module.css';
import h from '@/components/help/help.module.css';

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getPost(slug);
  return p ? { title: { absolute: p.metaTitle }, description: p.description, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: 'article', title: p.title, description: p.description, ...(postImage[p.slug] ? { images: [{ url: postImage[p.slug].src, width: 2048, height: 1152, alt: postImage[p.slug].alt }] } : {}) } } : {};
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getPost(slug);
  if (!p) notFound();
  const url = `${siteUrl}/blog/${p.slug}`;
  const minutes = Math.max(1, Math.ceil([...p.keyTakeaways, ...p.body].join(' ').split(/\s+/).length / 200));
  // Related posts appear only once other posts exist.
  const related = (p.related ?? []).map(getPost).filter((x): x is NonNullable<typeof x> => !!x && x.slug !== p.slug);
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Blog', '/blog'], [p.title, `/blog/${p.slug}`]]} />
      <article className={s.section}>
        <header className={s.pageHeader}>
          <h1 className="type-h1">{p.title}</h1>
          <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}>
            Published <time dateTime={p.published}>{fmt(p.published)}</time>
            {p.updated ? <> · Updated <time dateTime={p.updated}>{fmt(p.updated)}</time></> : null} · {minutes} min read
          </p>
          <ReviewByline authorApprovedOn={p.authorApprovedOn} reviewedOn={p.medicallyReviewedOn} />
        </header>

        {postImage[p.slug] ? <ArticleHero image={postImage[p.slug]} /> : null}

        <Summarize url={url} title={p.title} source={brand.name} />

        <div className={h.share}>
          <p className={h.shareLabel}>Share this article</p>
          <CopyLink url={url} />
        </div>

        <aside className={s.callout} aria-labelledby="takeaways">
          <h2 id="takeaways" className="type-h3">Key takeaways</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 'var(--space-sm)' }}>
            {p.keyTakeaways.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </aside>

        <div className={`${s.prose} type-body`}><Body lines={p.body} /></div>

        <Helpful />

        {related.length ? (
          <section className={h.panel} aria-labelledby="related-title">
            <h2 id="related-title" className={h.panelTitle}>Related articles</h2>
            <ul className={h.linkList}>
              {related.map((r) => <li key={r.slug}><Icon name="book-open" size={16} /><Link href={`/blog/${r.slug}`}>{r.title}</Link></li>)}
            </ul>
          </section>
        ) : null}
      </article>
      <Sources checked={fmt(p.updated ?? p.published)} items={p.sources} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.description, datePublished: p.published, dateModified: p.updated ?? p.published,
        publisher: { '@type': 'MedicalOrganization', name: brand.name }, mainEntityOfPage: url,
        ...(p.authorApprovedOn ? { author: { '@type': 'Person', name: `${author.name}, ${author.credentials}` } } : {}),
        ...(p.medicallyReviewedOn ? { reviewedBy: { '@type': 'Person', name: `${medicalReviewer.name}, ${medicalReviewer.credential}` } } : {}) }} />
    </main>
  );
}
