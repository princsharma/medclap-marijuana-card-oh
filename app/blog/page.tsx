import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader, JsonLd } from '@/components/PageParts';
import { posts } from '@/content/blog';
import s from '@/components/page.module.css';
import { pageNode, abs } from '@/lib/schema';

export const metadata: Metadata = { title: 'Ohio Medical Marijuana News', description: 'News and plain-language explainers on Ohio’s medical marijuana program: law changes, registry updates and what they mean for patients, checked against Ohio law.', alternates: { canonical: '/blog' } };

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
      <JsonLd data={pageNode({ type: 'CollectionPage', path: '/blog', name: 'Ohio medical marijuana news', description: metadata.description as string, mainEntity: { '@type': 'ItemList', itemListElement: list.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/blog/${x.slug}`), name: x.title })) } })} />
    </main>
  );
}
