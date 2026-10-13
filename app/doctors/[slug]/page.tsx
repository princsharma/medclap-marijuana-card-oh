import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, JsonLd, PageHeader, Section } from '@/components/PageParts';
import { brand, physicians, licenseLookupUrl } from '@/brand/site';
import Image from 'next/image';
import s from '@/components/page.module.css';

export function generateStaticParams() { return physicians.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = physicians.find((d) => d.slug === slug);
  if (!p) return {};
  const short = p.name.replace(' Chance', '');
  return { title: { absolute: `${short}, ${p.credential} | Ohio Medical Marijuana Doctor` }, description: ((d) => d.length <= 160 ? d : `${p.name}, ${p.credential} (${p.role}). Ohio license ${p.ohioLicense}, NPI ${p.npi}. Telehealth card evaluations.`)(`${p.name}, ${p.credential} (${p.role}). Ohio license ${p.ohioLicense}, NPI ${p.npi}. Ohio medical marijuana card evaluations by telehealth.`), alternates: { canonical: `/doctors/${p.slug}` },
    ...(p.photo ? { openGraph: { images: [{ url: p.photo, width: 800, height: 800, alt: `Photo of ${p.name}, ${p.credential}` }] } } : {}) };
}

export default async function DoctorProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = physicians.find((d) => d.slug === slug);
  if (!p) notFound();
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Our doctors', '/doctors'], [`${p.name}, ${p.credential}`, `/doctors/${p.slug}`]]} />
      <div className={s.doctorHead}>
        {p.photo ? <Image className={s.doctorPhoto} src={p.photo} alt={`Photo of ${p.name}, ${p.credential}`} width={240} height={240} priority sizes="240px" /> : null}
        <PageHeader eyebrow={p.isMedicalDirector ? 'Medical Director' : 'Physician'} title={`${p.name}, ${p.credential}`} lead={p.role} />
      </div>
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
        memberOf: { '@id': `https://${brand.domain}/#organization` }, areaServed: 'Ohio', ...(p.photo ? { image: `https://${brand.domain}${p.photo}` } : {}), url: `https://${brand.domain}/doctors/${p.slug}` }} />
    </main>
  );
}
