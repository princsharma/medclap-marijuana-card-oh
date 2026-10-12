import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader } from '@/components/PageParts';
import { posts } from '@/content/blog';
import s from '@/components/page.module.css';

export const metadata: Metadata = { title: 'Blog', description: 'News and plain-language explainers about Ohio’s medical marijuana program.', alternates: { canonical: '/blog' } };

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Blog() {
  const list = [...posts].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Blog', '/blog']]} />
      <PageHeader eyebrow="Blog" title="Ohio medical marijuana news and explainers" lead="Changes to Ohio’s rules and what they mean for patients, checked against Ohio law and dated." />
      <section className={s.grid2} aria-label="Posts">
        {list.map((p) => (
          <article key={p.slug} className={s.panel}>
            <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}><time dateTime={p.published}>{fmt(p.published)}</time></p>
            <h2 className="type-h3"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
            <p className="type-body">{p.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
