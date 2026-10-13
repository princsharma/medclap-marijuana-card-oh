import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Rich } from '@/components/Rich';
import { ArticleBottom, ArticleTop, readMinutes } from '@/components/ArticleExtras';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { ArticleHero, Breadcrumbs, Faq, JsonLd, PageHeader, ReviewByline, Section, Sources } from '@/components/PageParts';
import { conditions } from '@/brand/conditions';
import { conditionPages, EVIDENCE_SOURCES, SAFETY, TAKEAWAYS } from '@/content/condition-pages';
import { brand, pricing } from '@/brand/site';
import { conditionImage } from '@/brand/images';
import s from '@/components/page.module.css';
import { pageNode } from '@/lib/schema';

const find = (slug: string) => {
  const c = conditions.find((x) => x.slug === slug); const p = conditionPages.find((x) => x.slug === slug);
  return c && p ? { ...c, ...p } : null;
};

function related(slug: string): [string, string][] {
  const i = conditions.findIndex((x) => x.slug === slug);
  const near = [1, 2].map((k) => conditions[(i + k) % conditions.length]).map((x) => [x.name, `/conditions/${x.slug}`] as [string, string]);
  return [...near, ['Medical records for your visit', '/guides/medical-records'], ['All 21 qualifying conditions', '/conditions']];
}

export function generateStaticParams() { return conditionPages.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = find(slug); if (!c) return {};
  const n = c.metaShort ?? c.short;
  const tc = n.replace(/\b(\p{L})(\p{L}*)/gu, (w, a, b) => (['or', 'and', 'of'].includes(w) ? w : a.toUpperCase() + b));
  const t = `Medical Marijuana for ${tc} in Ohio`;
  return { title: { absolute: t },
    description: ((d) => d.length <= 160 ? d : `Is ${c.short} a qualifying condition for an Ohio medical card? Research, records that help, and how to get evaluated.`)(`Is ${c.short} a qualifying condition for an Ohio medical marijuana card? What the research says, what records help, and how to get evaluated.`),
    alternates: { canonical: `/conditions/${c.slug}` },
    ...(conditionImage[c.slug] ? { openGraph: { images: [{ url: conditionImage[c.slug].src, width: 2048, height: 1152, alt: conditionImage[c.slug].alt }] } } : {}) };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = find(slug);
  if (!c) notFound();
  const faq: [string, string][] = [
    [`Does ${c.short} qualify for a medical card in Ohio?`, `Yes. Ohio law lists “${c.name}” as a qualifying condition. Your physician confirms the diagnosis during your visit and decides whether you qualify.`],
    ['What records should I bring?', `${c.records.join('; ')}. If you don’t have records, your physician can still examine you and may ask for them.`],
    ['What does it cost?', `$${pricing.newEvaluation} for a new evaluation, with a full refund if you don’t qualify. Ohio charges no state registration fee under the current rule.`],
  ];
  const r0 = c.records[0];
  const takeaways = [
    `“${c.name}” is one of Ohio’s 21 qualifying conditions. Your physician confirms the diagnosis and decides whether you qualify.`,
    ...(TAKEAWAYS[c.slug] ?? []),
    `Bring ${r0.charAt(0).toLowerCase()}${r0.slice(1)} to your visit.`,
  ];
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Qualifying conditions', '/conditions'], [c.name, `/conditions/${c.slug}`]]} />
      <PageHeader eyebrow="Qualifying condition" title={`Medical marijuana for ${c.short} in Ohio`}
        lead={<>“{c.name}” is one of Ohio’s 21 qualifying conditions for a medical marijuana card. An Ohio physician confirms your diagnosis and decides whether you qualify.</>}>
        <Button href={`/get-started?condition=${c.slug}`}>Check if you qualify</Button>
      </PageHeader>
      {conditionImage[c.slug] ? <ArticleHero image={conditionImage[c.slug]} /> : null}
      <ReviewByline />
      <ArticleTop path={`/conditions/${c.slug}`} title={`Medical marijuana for ${c.short} in Ohio`} updated="2026-10-13" readMinutes={readMinutes([...c.evidence, ...c.records, ...SAFETY])} />

      <aside className={`${s.callout} ${s.narrow}`} aria-labelledby="takeaways">
        <h2 id="takeaways" className="type-h3">Key takeaways</h2>
        <ul style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 'var(--space-sm)' }}>
          {takeaways.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </aside>

      <Section title="What the research says" id="evidence">
        {c.evidence.map((e) => <p key={e}><Rich text={e} /></p>)}
      </Section>

      <Section title="What to have ready for your visit" id="records">
        <ul>{c.records.map((r) => <li key={r}>{r}</li>)}</ul>
        <p>If another doctor diagnosed you, your physician can confirm it from your records. <Link href="/guides/medical-records">How to get your records</Link>.</p>
      </Section>

      <Section title="Safety" id="safety">
        <ul>{SAFETY.map((x) => <li key={x}>{x}</li>)}</ul>
        <p>Your physician explains the risks and benefits for you before recommending, as Ohio requires.</p>
      </Section>

      {c.crisisNote ? (
        <aside className={s.callout}><p><strong>If you’re struggling right now:</strong> call or text 988 to reach the Suicide & Crisis Lifeline. In an emergency, call 911.</p></aside>
      ) : null}

      <Faq items={faq} />
      <Sources checked="13 Oct 2026" items={EVIDENCE_SOURCES} />
      <ArticleBottom path={`/conditions/${c.slug}`} related={related(c.slug)} />
      <ImportantInfo />
      <JsonLd data={pageNode({ type: 'MedicalWebPage', path: `/conditions/${c.slug}`, name: `Medical marijuana for ${c.short} in Ohio`, image: conditionImage[c.slug]?.src, dateModified: '2026-10-13',
        about: { '@type': 'MedicalCondition', name: c.name } })} />
    </main>
  );
}
