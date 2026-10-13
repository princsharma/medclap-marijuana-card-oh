import type { Metadata } from 'next';
import { IMG } from '@/brand/images';
import Link from 'next/link';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, PageHeader, Section, JsonLd } from '@/components/PageParts';
import { author, brand } from '@/brand/site';
import s from '@/components/page.module.css';
import { pageNode, ORG } from '@/lib/schema';

export const metadata: Metadata = { title: 'About Our Ohio Telehealth Service', description: 'Marijuana Card OH is an Ohio-only telehealth service that connects adults with Ohio-licensed physicians for medical marijuana evaluations.', alternates: { canonical: '/about' } };

export default function About() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['About us', '/about']]} />
      <PageHeader image={IMG.about} eyebrow="About us" title="Ohio only, doctor-led, and open about who we are"
        lead="Marijuana Card OH connects Ohio adults with Ohio-licensed physicians for medical marijuana evaluations by telehealth. We serve Ohio and nowhere else, so everything on this site is about Ohio’s rules." />
      <Section title="Who you’ll see" id="who">
        <p>Every evaluation is done by a physician with an active Ohio license and a Certificate to Recommend from the State Medical Board of Ohio. We show each physician’s license number so you can check it. <Link href="/doctors">Meet our doctors</Link>.</p>
        <p>Our Medical Director, Dr. Johnathan Miller, MD, interviews the physicians who see our patients and reviews the medical information we publish.</p>
      </Section>
      <Section title="What we promise, and what we don’t" id="promise">
        <ul>
          <li>We promise a real evaluation with a named Ohio physician, and a full refund if you don’t qualify.</li>
          <li>We don’t promise that you’ll qualify. That is your physician’s medical decision.</li>
          <li>We don’t sell or promote cannabis products or dispensaries.</li>
        </ul>
      </Section>
      <Section title="Who writes our content" id="content">
        <p>Our guides are edited and approved by {author.name}, {author.credentials}. {author.bio} A page shows her name only after she has approved it, and a medical review date only after Dr. Miller has reviewed it. <Link href="/editorial-policy">How we write and review</Link>.</p>
      </Section>
      <Section title="Contact" id="contact">
        <p>Email {brand.email}. <Link href="/contact">More ways to reach us</Link>.</p>
      </Section>
      <ImportantInfo />
      <JsonLd data={pageNode({ type: 'AboutPage', path: '/about', name: 'About Marijuana Card OH', description: metadata.description as string, image: IMG.about.src, about: ORG, mainEntity: ORG })} />
    </main>
  );
}
