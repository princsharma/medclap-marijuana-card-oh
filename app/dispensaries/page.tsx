import type { Metadata } from 'next';
import Link from 'next/link';
import { Locator } from '@/components/locator/Locator';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Faq, JsonLd, Section, Sources } from '@/components/PageParts';
import { brand, pricing } from '@/brand/site';
import data from '@/content/dispensaries.json';
import s from '@/components/page.module.css';

const PATH = '/dispensaries';
export const metadata: Metadata = {
  title: { absolute: 'Ohio Dispensary Locator: Every Licensed Dispensary' },
  description: `Find any of Ohio’s ${data.count} licensed cannabis dispensaries by city, ZIP or county, on a map, from the state’s official data. No ads or rankings.`,
  alternates: { canonical: PATH },
};

const faq: [string, string][] = [
  ['What do I need to buy at an Ohio dispensary?', 'Patients show their Ohio registry card and a photo ID. Adults 21 and older can buy adult-use cannabis with a photo ID and no card.'],
  ['Do medical patients pay tax at these dispensaries?', 'Medical marijuana isn’t subject to Ohio’s 10% adult-use tax. Every dispensary on this map is licensed to sell to both patients and adult-use customers.'],
  ['Why isn’t a dispensary listed?', 'This map shows the dispensaries in the Division of Cannabis Control’s public map data. A newly licensed dispensary can appear on the state’s license list before it appears in that data.'],
  ['Do you recommend any of these dispensaries?', `No. ${brand.name} doesn’t rank, recommend, sponsor or partner with any dispensary, and your physician won’t steer you to one. The list is A to Z, or by distance when you search.`],
];

export default function Dispensaries() {
  return (
    <>
      <Locator />
      <main className={`container ${s.main}`}>
        <Section title="About this locator" id="about">
          <p>Every dispensary here holds an active Ohio license to sell medical and adult-use cannabis. The list comes from the Division of Cannabis Control’s public dispensary data, checked {new Date(`${data.checked}T12:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}. Hours change, so call ahead.</p>
          <p>We don’t rank, recommend, sponsor or partner with any dispensary. A few map pins are approximate where the state’s data didn’t give an exact location; the directions link always uses the street address.</p>
          <p>Need a card first? It’s ${pricing.newEvaluation} for a video visit with an Ohio-licensed physician, with a full refund if you don’t qualify. <Link href="/how-it-works">How it works</Link>.</p>
        </Section>
        <Faq items={faq} />
        <Sources checked="13 Oct 2026" items={[
          ['Division of Cannabis Control: Cannabis dispensary map', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/what-we-do/cannabis-dispensary-map'],
          ['Division of Cannabis Control: Dispensary licenses', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/dispensaries/dispensary-licenses'],
          ['Map data: OpenStreetMap contributors', 'https://www.openstreetmap.org/copyright'],
        ]} />
        <ImportantInfo />
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Ohio dispensary locator', url: `https://${brand.domain}${PATH}`,
          description: `Map and list of Ohio’s ${data.count} licensed cannabis dispensaries from state data.` }} />
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${brand.domain}/` },
          { '@type': 'ListItem', position: 2, name: 'Dispensary locator', item: `https://${brand.domain}${PATH}` }] }} />
      </main>
    </>
  );
}
