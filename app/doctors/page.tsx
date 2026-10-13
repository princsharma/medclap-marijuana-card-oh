import type { Metadata } from 'next';
import Link from 'next/link';
import { DoctorCard } from '@/components/DoctorCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, PageHeader, Section, JsonLd } from '@/components/PageParts';
import { physicians, licenseLookupUrl } from '@/brand/site';
import s from '@/components/page.module.css';
import { pageNode, physicianList } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Our Ohio Medical Marijuana Doctors',
  description: 'Meet the Ohio-licensed physicians who see Marijuana Card OH patients, with their Certificate to Recommend numbers so you can verify them.',
  alternates: { canonical: '/doctors' },
};

export default function Doctors() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Our doctors', '/doctors']]} />
      <PageHeader eyebrow="Our doctors" title="Our Ohio medical marijuana doctors"
        lead="Every patient sees one of these physicians. Each holds an active Ohio license and a Certificate to Recommend from the State Medical Board of Ohio, and you can check both yourself." />
      <section className={s.grid2} aria-label="Physicians">
        {physicians.map((p) => (
          <div key={p.npi} className={s.stack}>
            <DoctorCard doctor={{ name: `${p.name}, ${p.credential}`, role: p.role, license: p.ohioLicense, npi: p.npi, photo: p.photo }} />
            <Link href={`/doctors/${p.slug}`}>Full profile</Link>
          </div>
        ))}
      </section>
      <Section title="How to check a doctor’s license" id="verify">
        <ol>
          <li>Open the State of Ohio’s <a href={licenseLookupUrl} target="_blank" rel="noopener noreferrer">License Look-Up</a>.</li>
          <li>Search by the license number shown on the doctor’s card, for example 35.141126CTR.</li>
          <li>Check that the license is active and that the record shows a Certificate to Recommend.</li>
        </ol>
        <p>Dr. Johnathan Miller, MD is our Medical Director. He interviews the physicians who see our patients and reviews our medical content.</p>
      </Section>
      <ImportantInfo />
      <JsonLd data={pageNode({ type: 'CollectionPage', path: '/doctors', name: 'Our Ohio medical marijuana doctors', description: metadata.description as string, mainEntity: physicianList() })} />
    </main>
  );
}
