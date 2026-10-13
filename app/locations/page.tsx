import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { DoctorCard } from '@/components/DoctorCard';
import { PriceCard } from '@/components/PriceCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { ArticleEnd, ArticleTop, KeyTakeaways, ShareArticle } from '@/components/ArticleExtras';
import { Breadcrumbs, Faq, JsonLd, PageHeader, Section, Sources } from '@/components/PageParts';
import { brand, physicians, pricing } from '@/brand/site';
import { cities, DISPENSARY_LIST, DISPENSARY_MAP, ohioFigures as f } from '@/content/locations';
import s from '@/components/page.module.css';
import u from '@/components/ui.module.css';

const PATH = '/locations';
const TITLE = 'Ohio medical marijuana cards, wherever you live in Ohio';

export const metadata: Metadata = {
  title: { absolute: 'Ohio Locations: Medical Marijuana Card by Telehealth' },
  description: `Get evaluated for an Ohio medical marijuana card by video from anywhere in Ohio. Same Ohio physicians and same $${pricing.newEvaluation} price in every city and county.`,
  alternates: { canonical: PATH },
};

const faq: [string, string][] = [
  ['Do I need to visit an office?', 'No. Your visit is a video call with an Ohio-licensed physician, which Ohio law allows for medical marijuana evaluations. You can join from home on a phone or computer.'],
  ['Is the price different in my city?', `No. It’s $${pricing.newEvaluation} for a new evaluation and $${pricing.renewalEvaluation} to renew anywhere in Ohio, with a full refund if you don’t qualify.`],
  ['Can I get a card if I live in a small town or rural county?', 'Yes. We serve every part of Ohio by telehealth. You need to be an Ohio resident aged 18 or older with a qualifying condition.'],
  ['Where can I find a dispensary near me?', 'Use our Ohio dispensary locator, which lists every licensed dispensary from the state’s data, or the Division of Cannabis Control’s official map. We don’t rank, recommend or partner with any dispensary.'],
  ['Can my city ban dispensaries?', 'Yes. Under Ohio law, a city, village or township can prohibit or limit the number of cannabis dispensaries within its borders. It can’t stop you from registering as a patient.'],
];

export default function Locations() {
  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Locations', PATH]]} />
      <PageHeader eyebrow="Locations" title={TITLE}
        lead={<>{brand.name} is a statewide telehealth service. Wherever you live in Ohio, you see the same Ohio-licensed physicians by video, pay the same ${pricing.newEvaluation}, and get a full refund if you don’t qualify.</>}>
        <Button href="/get-started">Check if you qualify</Button>
      </PageHeader>
      <ArticleTop path={PATH} title={TITLE} updated="2026-10-13" readMinutes={3} />
      <ShareArticle path={PATH} />
      <KeyTakeaways items={[
        'Your visit is by video, so you don’t need to travel to an office anywhere in Ohio.',
        `Price and physicians are the same statewide: $${pricing.newEvaluation} new, $${pricing.renewalEvaluation} renewal.`,
        `Ohio had ${f.registeredPatients.value} registered patients as of ${f.registeredPatients.asOf}, according to the Division of Cannabis Control.`,
        'Cities, villages and townships can ban or limit dispensaries, but they can’t stop you from registering as a patient.',
        'Our dispensary locator lists every licensed Ohio dispensary from state data. We don’t rank, recommend or partner with any of them.',
      ]} />

      <Section title="How it works from anywhere in Ohio" id="how">
        <ol>
          <li><Link href="/get-started">Answer a few questions</Link> and book a time with one of our physicians.</li>
          <li>Join your video visit from home. Your physician reviews your history and records and checks Ohio’s prescription monitoring report.</li>
          <li>If you qualify, your physician submits your recommendation to the state registry right after your visit, and you activate it by email.</li>
        </ol>
        <p>Then you can buy at any licensed Ohio dispensary with your registry card and a photo ID. <Link href="/how-it-works">Full step-by-step guide</Link>.</p>
      </Section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="cities">
        <h2 id="cities" className="type-h2">City guides</h2>
        <p className="type-body" style={{ maxWidth: '48rem' }}>Local rules and checked facts from government sources for Ohio’s largest cities. You can book from any of them today, and we add a city guide only once it has at least five dated local facts.</p>
        <div className={s.grid3}>
          {cities.map((c) => (
            <article key={c.slug} className={u.card}>
              <h3 className="type-h3">{c.published ? <Link href={`${PATH}/${c.slug}`}>{c.name}</Link> : c.name}</h3>
              <p className={`type-small ${u.muted}`}>{c.county}</p>
              {c.published ? <p className="type-small"><Link href={`${PATH}/${c.slug}`}>Read the {c.name} guide<span className="visually-hidden"> for medical marijuana cards</span></Link></p> : <p className={`type-small ${u.muted}`}>City guide coming soon</p>}
            </article>
          ))}
        </div>
      </section>

      <Section title="Ohio by the numbers" id="numbers">
        <ul>
          <li><strong>{f.registeredPatients.value}</strong> registered patients, as of {f.registeredPatients.asOf}.</li>
          <li><strong>{f.certificatesToRecommend.value}</strong> physicians with a Certificate to Recommend, as of {f.certificatesToRecommend.asOf}.</li>
          <li><strong>{f.dualUseDispensaries.value}</strong> dispensaries licensed to sell both medical and adult-use cannabis, as of {f.dualUseDispensaries.asOf}.</li>
        </ul>
        <p className="type-small">Figures from the Division of Cannabis Control’s <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer">program update</a>.</p>
      </Section>

      <Section title="What changes from city to city" id="local">
        <ul>
          <li><strong>Dispensaries.</strong> Ohio law lets a city, village or township prohibit or limit the number of cannabis dispensaries, cultivators and processors within its borders (Revised Code 3796.29).</li>
          <li><strong>Where dispensaries can be.</strong> State law keeps new sites at least 500 feet from the property line of a school, church, public library, public playground or public park (Revised Code 3796.30).</li>
          <li><strong>What stays the same everywhere.</strong> Your right to register as a patient, the 21 qualifying conditions, the price of your visit, and the ban on driving while impaired.</li>
        </ul>
        <p>To find a licensed dispensary, use our <Link href="/dispensaries">Ohio dispensary locator</Link>, the Division of Cannabis Control’s <a href={DISPENSARY_MAP} target="_blank" rel="noopener noreferrer">official dispensary map</a>, or its <a href={DISPENSARY_LIST} target="_blank" rel="noopener noreferrer">license list</a>. We don’t recommend, rank or partner with any dispensary.</p>
      </Section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="doctors">
        <h2 id="doctors" className="type-h2">Your physicians serve all of Ohio</h2>
        <div className={s.grid2}>
          {physicians.map((p) => (
            <DoctorCard key={p.npi} doctor={{ name: `${p.name}, ${p.credential}`, role: p.role, license: p.ohioLicense, npi: p.npi }} />
          ))}
        </div>
        <p><Link href="/doctors">Meet our doctors</Link></p>
      </section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="price">
        <h2 id="price" className="type-h2">One price, statewide</h2>
        <div className={s.grid2}><PriceCard type="new" /><PriceCard type="renewal" /></div>
        <p><Link href="/pricing">See what’s included</Link></p>
      </section>

      <ArticleEnd related={[['How to get a medical marijuana card in Ohio', '/how-it-works'], ['The Ohio Medical Marijuana Registry, explained', '/guides/ohio-medical-marijuana-registry'], ['Ohio’s 21 qualifying conditions', '/conditions'], ['Medical card or adult-use? What’s different in Ohio', '/guides/medical-card-vs-adult-use']]} />

      <Faq items={faq} />
      <Sources checked="13 Oct 2026" items={[
        ['Division of Cannabis Control: DCC Update By The Numbers', f.sourceUrl],
        ['Division of Cannabis Control: Cannabis dispensary map', DISPENSARY_MAP],
        ['Division of Cannabis Control: Ohio cannabis FAQ', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/licensee-resources/what-we-do/ohio-cannabis-faq'],
        ['Ohio Revised Code 3796.29: local prohibition or limits', 'https://codes.ohio.gov/ohio-revised-code/section-3796.29'],
        ['Ohio Revised Code 3796.30: distance from schools, churches, libraries, playgrounds and parks', 'https://codes.ohio.gov/ohio-revised-code/section-3796.30'],
        ['Ohio Revised Code 4731.30: physician recommendations, including by telehealth', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
      ]} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: TITLE, url: `https://${brand.domain}${PATH}`,
        about: { '@type': 'Service', name: 'Ohio medical marijuana card evaluation by telehealth', provider: { '@type': 'MedicalOrganization', name: brand.name }, areaServed: { '@type': 'State', name: 'Ohio' } } }} />
    </main>
  );
}
