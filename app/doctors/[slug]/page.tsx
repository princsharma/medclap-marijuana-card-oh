import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, JsonLd, PageHeader, Section } from '@/components/PageParts';
import { brand, physicians, licenseLookupUrl } from '@/brand/site';
import s from '@/components/page.module.css';

export function generateStaticParams() { return physicians.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = physicians.find((d) => d.slug === slug);
  if (!p) return {};
  const short = p.name.replace(' Chance', '');
  return { title: { absolute: `${short}, ${p.credential} | Ohio Medical Marijuana Doctor` }, description: `${p.name}, ${p.credential}: Ohio license ${p.ohioLicense}, NPI ${p.npi}. ${p.role}.`, alternates: { canonical: `/doctors/${p.slug}` } };
}

export default async function DoctorProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = physicians.find((d) => d.slug === slug);
  if (!p) notFound();
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Our doctors', '/doctors'], [`${p.name}, ${p.credential}`, `/doctors/${p.slug}`]]} />
      <PageHeader eyebrow={p.isMedicalDirector ? 'Medical Director' : 'Physician'} title={`${p.name}, ${p.credential}`} lead={p.role} />
      <Section title="Ohio license" id="license">
        <div className={s.panel}>
          <p><strong>Ohio license / Certificate to Recommend:</strong> {p.ohioLicense}</p>
          <p><strong>NPI:</strong> {p.npi}</p>
          <p><a href={licenseLookupUrl} target="_blank" rel="noopener noreferrer">Verify on Ohio License Look-Up →</a></p>
        </div>
      </Section>
      <Section title="Education and training" id="education">
        <ul>{p.education.map((e) => <li key={e}>{e}</li>)}</ul>
      </Section>
      {p.isMedicalDirector ? (
        <Section title="Role at Marijuana Card OH" id="role">
          <p>As Medical Director, Dr. Miller interviews the physicians who see our patients and medically reviews the information on this site. Each page he reviews shows the date of his review.</p>
        </Section>
      ) : null}
      <div><Button href="/get-started">Book a visit</Button></div>
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Physician', name: `${p.name}, ${p.credential}`, identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: p.npi },
        memberOf: { '@type': 'MedicalOrganization', name: brand.name }, areaServed: 'Ohio', url: `https://${brand.domain}/doctors/${p.slug}` }} />
    </main>
  );
}
