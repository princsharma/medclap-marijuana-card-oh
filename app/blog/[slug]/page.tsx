import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Body } from '@/components/Rich';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, JsonLd, ReviewByline, Sources } from '@/components/PageParts';
import { getPost, posts } from '@/content/blog';
import { author, brand, medicalReviewer } from '@/brand/site';
import s from '@/components/page.module.css';

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getPost(slug);
  return p ? { title: { absolute: p.metaTitle }, description: p.description, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: 'article', title: p.title, description: p.description } } : {};
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getPost(slug);
  if (!p) notFound();
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Blog', '/blog'], [p.title, `/blog/${p.slug}`]]} />
      <article className={s.section}>
        <header className={s.pageHeader}>
          <h1 className="type-h1">{p.title}</h1>
          <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}>Published <time dateTime={p.published}>{fmt(p.published)}</time>{p.updated ? <> · Updated <time dateTime={p.updated}>{fmt(p.updated)}</time></> : null}</p>
          <ReviewByline authorApprovedOn={p.authorApprovedOn} reviewedOn={p.medicallyReviewedOn} />
        </header>
        <div className={`${s.prose} type-body`}><Body lines={p.body} /></div>
      </article>
      <Sources checked={fmt(p.updated ?? p.published)} items={p.sources} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.description, datePublished: p.published, dateModified: p.updated ?? p.published,
        publisher: { '@type': 'MedicalOrganization', name: brand.name },
        ...(p.authorApprovedOn ? { author: { '@type': 'Person', name: `${author.name}, ${author.credentials}` } } : {}),
        ...(p.medicallyReviewedOn ? { reviewedBy: { '@type': 'Person', name: `${medicalReviewer.name}, ${medicalReviewer.credential}` } } : {}) }} />
    </main>
  );
}
