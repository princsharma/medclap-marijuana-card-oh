import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { DoctorCard } from '@/components/DoctorCard';
import { PriceCard } from '@/components/PriceCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { ArticleEnd, ArticleTop, KeyTakeaways, ShareArticle } from '@/components/ArticleExtras';
import { Breadcrumbs, Faq, JsonLd, PageHeader, ReviewByline, Section, Sources } from '@/components/PageParts';
import { brand, physicians, pricing } from '@/brand/site';
import { cities, DISPENSARY_LIST, DISPENSARY_LIST_DATE, DISPENSARY_MAP, getCity, SB56, type Fact } from '@/content/locations';
import s from '@/components/page.module.css';
import u from '@/components/ui.module.css';

export function generateStaticParams() { return cities.filter((c) => c.published).map((c) => ({ city: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params; const c = getCity(city); if (!c) return {};
  return {
    title: { absolute: `Medical Marijuana Card in ${c.name}, Ohio by Telehealth` },
    description: `Get evaluated for an Ohio medical marijuana card from home in ${c.name}. Ohio-licensed physicians by video, $${pricing.newEvaluation}, full refund if you don’t qualify. Local rules, checked.`,
    alternates: { canonical: `/locations/${c.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const c = getCity(city);
  if (!c || !c.facts || !c.dispensaries || !c.court) notFound();
  const path = `/locations/${c.slug}`;
  const title = `Get your medical marijuana card in ${c.name}`;

  const facts: Fact[] = [
    { title: 'Licensed dispensaries', date: `State list dated ${DISPENSARY_LIST_DATE}`,
      text: `${c.county} had ${c.dispensaries.county} dispensaries licensed to sell both medical and adult-use cannabis, ${c.dispensaries.city} of them in ${c.name}. Our dispensary locator lists them all from state data. We don’t rank, recommend or partner with any dispensary.`,
      source: ['Division of Cannabis Control: dispensary licenses', DISPENSARY_LIST] },
    ...c.facts,
    { title: 'Clearing an old possession conviction', date: 'Since 20 March 2026',
      text: `Ohio now lets you apply to the court that sentenced you to expunge an old minor misdemeanor marijuana possession conviction. For most ${c.name} cases that is ${c.court[0]}. The filing fee is $50 unless you can’t afford it, and the court holds a hearing within 45 to 90 days.`,
      source: SB56 },
  ];

  return (
    <main className={`container ${s.main}`}>
      <Breadcrumbs trail={[['Locations', '/locations'], [c.name, path]]} />
      <PageHeader eyebrow={`${c.name}, ${c.county}`} title={title}
        lead={<>See an Ohio-licensed physician by video from home in {c.name}. It’s ${pricing.newEvaluation} for a new evaluation, the same as everywhere in Ohio, and you get a full refund if you don’t qualify.</>}>
        <Button href="/get-started">Check if you qualify</Button>
      </PageHeader>
      <ReviewByline />
      <ArticleTop path={path} title={title} updated="2026-10-13" readMinutes={3} />
      <ShareArticle path={path} />
      <KeyTakeaways items={[
        `You don’t need to travel to an office: your visit is by video from anywhere in ${c.name}.`,
        `${c.county} had ${c.dispensaries.county} dispensaries licensed for medical and adult-use sales on the state’s ${DISPENSARY_LIST_DATE} list, ${c.dispensaries.city} of them in ${c.name}.`,
        (([x]) => `${x.charAt(0).toUpperCase()}${x.slice(1).replace(/\.$/, '')}.`)([c.facts[0].text.split('. ')[0]]),
        `Old minor misdemeanor possession convictions can now be expunged through ${c.court[0]} for a $50 fee, unless you can’t afford it.`,
      ]} />

      <section className={`${s.section} ${s.wide}`} aria-labelledby="facts">
        <h2 id="facts" className="type-h2">{c.name}: what to know locally</h2>
        <p className="type-body" style={{ maxWidth: '48rem' }}>Every fact below comes from a government source and is dated. Sources are listed at the bottom of the page.</p>
        <div className={s.grid2}>
          {facts.map((f) => (
            <article key={f.title} className={u.card}>
              <h3 className="type-h3">{f.title}</h3>
              <p className={`type-small ${u.muted}`}>{f.date}</p>
              <p className="type-body">{f.text}</p>
            </article>
          ))}
        </div>
        <p>Find a licensed dispensary near you in our <Link href={`/dispensaries`}>Ohio dispensary locator</Link>, or on the Division of Cannabis Control’s <a href={DISPENSARY_MAP} target="_blank" rel="noopener noreferrer">official map</a>.</p>
      </section>

      <Section title={`How your visit works from ${c.name}`} id="how">
        <ol>
          <li><Link href="/get-started">Answer a few questions</Link> and book a time with one of our physicians.</li>
          <li>Join your video visit from home on a phone or computer. Your physician reviews your history and records and checks Ohio’s prescription monitoring report.</li>
          <li>If you qualify, your physician submits your recommendation to the state registry right after your visit. You activate it by email and download your card. <Link href="/guides/ohio-medical-marijuana-registry">Registry guide</Link>.</li>
        </ol>
      </Section>

      <Section title="Using medical marijuana in Ohio" id="use">
        <ul>
          <li>Smoking medical marijuana isn’t allowed. Vaporizing it is allowed only on private property used mainly as a home or farm, and not where a lease bans it.</li>
          <li>Nobody may smoke or vape marijuana in a public place or at work.</li>
          <li>Driving while impaired is illegal for everyone, patients included.</li>
        </ul>
        <p>These are Ohio rules (Revised Code 3796.06, as amended from 20 March 2026). <Link href="/guides/what-a-medical-card-means">What a medical card means for work, driving and housing</Link>.</p>
      </Section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="doctors">
        <h2 id="doctors" className="type-h2">Physicians who see patients in {c.name}</h2>
        <div className={s.grid2}>
          {physicians.map((p) => (
            <DoctorCard key={p.npi} doctor={{ name: `${p.name}, ${p.credential}`, role: p.role, license: p.ohioLicense, npi: p.npi }} />
          ))}
        </div>
        <p><Link href="/doctors">Meet our doctors</Link></p>
      </section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="price">
        <h2 id="price" className="type-h2">Same price as everywhere in Ohio</h2>
        <div className={s.grid2}><PriceCard type="new" /><PriceCard type="renewal" /></div>
        <p><Link href="/pricing">See what’s included</Link></p>
      </section>

      <ArticleEnd relatedTitle="More Ohio locations" related={[
        ['All Ohio locations', '/locations'],
        ...cities.filter((x) => x.published && x.slug !== c.slug).map((x) => [`Medical marijuana card in ${x.name}`, `/locations/${x.slug}`] as [string, string]),
        ['The Ohio Medical Marijuana Registry, explained', '/guides/ohio-medical-marijuana-registry'],
      ]} />

      <Faq items={c.faq ?? []} />
      <Sources checked="13 Oct 2026" items={[
        ...facts.map((f) => f.source),
        [`${c.court[0]}`, c.court[1]],
        ['Ohio Revised Code 3796.06: where marijuana may be used', 'https://codes.ohio.gov/ohio-revised-code/section-3796.06'],
        ['Division of Cannabis Control: Cannabis dispensary map', DISPENSARY_MAP],
      ]} />
      <ImportantInfo />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: title, url: `https://${brand.domain}${path}`,
        about: { '@type': 'Service', name: 'Ohio medical marijuana card evaluation by telehealth', provider: { '@type': 'MedicalOrganization', name: brand.name },
          areaServed: { '@type': 'City', name: `${c.name}, Ohio` } } }} />
    </main>
  );
}
