import type { Metadata } from 'next';
import { IMG } from '@/brand/images';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Breadcrumbs, PageHeader, JsonLd } from '@/components/PageParts';
import { Checker } from './Checker';
import s from '@/components/page.module.css';
import { pageNode } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Check If You Qualify',
  description: 'Three quick questions to see whether you may qualify for an Ohio medical marijuana card. Nothing you enter is stored.',
  alternates: { canonical: '/eligibility' },
};

export default function Eligibility() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Check if you qualify', '/eligibility']]} />
      <PageHeader image={IMG.eligibility} eyebrow="Check if you qualify" title="Do you qualify for an Ohio medical marijuana card?"
        lead="Answer three questions. This is a quick guide, not a diagnosis: your physician makes the decision. Nothing you enter here is stored or sent." />
      <Checker />
      <ImportantInfo />
      <JsonLd data={pageNode({ type: 'MedicalWebPage', path: '/eligibility', name: 'Do you qualify for an Ohio medical marijuana card?', description: metadata.description as string, image: IMG.eligibility.src })} />
    </main>
  );
}
