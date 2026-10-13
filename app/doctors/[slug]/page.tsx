import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, JsonLd, PageHeader, Section } from '@/components/PageParts';
import { brand, physicians, licenseLookupUrl } from '@/brand/site';
import Image from 'next/image';
import { StoryVideo } from '@/components/StoryVideo';
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
      {p.video ? (
        <Section title={`Meet ${p.name.replace(' Chance', '').replace(/ [A-Z]\. /, ' ')}`} id="intro">
          <StoryVideo video={p.video} event="doctor_video" />
        </Section>
      ) : null}
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
      {p.video ? <JsonLd data={{ '@context': 'https://schema.org', '@type': 'VideoObject', name: p.video.title, description: p.video.description,
        thumbnailUrl: new URL(p.video.poster, `https://${brand.domain}`).href, contentUrl: new URL(p.video.src, `https://${brand.domain}`).href,
        uploadDate: p.video.uploadDate, duration: p.video.durationIso, transcript: p.video.transcript.join(' '),
        about: { '@id': `https://${brand.domain}/doctors/${p.slug}#physician` } }} /> : null}
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `https://${brand.domain}/doctors/${p.slug}#webpage`, url: `https://${brand.domain}/doctors/${p.slug}`,
        isPartOf: { '@id': `https://${brand.domain}/#website` }, mainEntity: { '@id': `https://${brand.domain}/doctors/${p.slug}#physician` } }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': ['Person', 'IndividualPhysician'], '@id': `https://${brand.domain}/doctors/${p.slug}#physician`,
        name: p.name.replace(/^Dr\. /, ''), honorificPrefix: 'Dr.', honorificSuffix: p.credential, jobTitle: p.isMedicalDirector ? 'Medical Director' : 'Physician',
        identifier: [{ '@type': 'PropertyValue', propertyID: 'NPI', value: p.npi }, { '@type': 'PropertyValue', propertyID: 'Ohio Certificate to Recommend', value: p.ohioLicense }],
        hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'Ohio medical license with Certificate to Recommend', identifier: p.ohioLicense,
          recognizedBy: { '@type': 'GovernmentOrganization', name: 'State Medical Board of Ohio' } },
        alumniOf: p.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.replace(/^(MD|DO|[A-Za-z ]+residency),\s*/, '').replace(/,\s*\d{4}(–\d{4})?$/, '') })),
        worksFor: { '@id': `https://${brand.domain}/#organization` }, memberOf: { '@id': `https://${brand.domain}/#organization` },
        areaServed: { '@type': 'State', name: 'Ohio' }, ...(p.photo ? { image: `https://${brand.domain}${p.photo}` } : {}), url: `https://${brand.domain}/doctors/${p.slug}` }} />
    </main>
  );
}
