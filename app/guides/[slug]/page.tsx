import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Body } from '@/components/Rich';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, Faq, JsonLd, PageHeader, ReviewByline, Sources } from '@/components/PageParts';
import { getGuide, guides } from '@/content/guides';
import { brand } from '@/brand/site';
import s from '@/components/page.module.css';

export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const g = getGuide(slug);
  return g ? { title: { absolute: g.metaTitle }, description: g.description, alternates: { canonical: `/guides/${g.slug}` } } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const g = getGuide(slug);
  if (!g) notFound();
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[[g.title, `/guides/${g.slug}`]]} />
      <PageHeader eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
      <ReviewByline authorApprovedOn={g.authorApprovedOn} reviewedOn={g.medicallyReviewedOn} />
      <article className={`${s.section} ${s.prose} type-body`}><Body lines={g.body} /></article>
      <div><Button href="/eligibility">Check if you qualify</Button></div>
      <Faq items={g.faq} />
      <Sources checked={g.checked} items={g.sources} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: g.title, description: g.description, url: `https://${brand.domain}/guides/${g.slug}`, audience: 'Patient' }} />
    </main>
  );
}
