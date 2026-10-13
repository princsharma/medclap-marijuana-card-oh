import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader, Section } from '@/components/PageParts';
import { brand } from '@/brand/site';
import s from '@/components/page.module.css';

export const metadata: Metadata = { title: 'Contact Us', description: 'Email Marijuana Card OH about booking, your visit, fees, refunds or the Ohio registry. Please don’t send medical details by email; your physician covers them.', alternates: { canonical: '/contact' } };

export default function Contact() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Contact', '/contact']]} />
      <PageHeader eyebrow="Contact" title="Contact us" lead={<>Email <strong>{brand.email}</strong>. Please don’t send medical details by email; your physician will go over them in your visit.</>} />
      <Section title="Before you write" id="before">
        <ul>
          <li>Questions about cost, eligibility or renewal: <Link href="/faq">see the FAQ</Link>.</li>
          <li>Problems activating your state registration: <Link href="/guides/ohio-medical-marijuana-registry">read the registry guide</Link>.</li>
        </ul>
      </Section>
      <Section title="In an emergency" id="emergency">
        <p>We can’t help with emergencies. Call 911, or call or text 988 if you’re in crisis.</p>
      </Section>
    </main>
  );
}
