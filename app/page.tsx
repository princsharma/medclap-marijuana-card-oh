import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { DoctorCard } from '@/components/DoctorCard';
import { PriceCard } from '@/components/PriceCard';
import { ImportantInfo } from '@/components/ImportantInfo';
import { Faq, Section, Sources } from '@/components/PageParts';
import { brand, physicians, pricing } from '@/brand/site';
import { storyVideo } from '@/brand/media';
import { StoryVideo } from '@/components/StoryVideo';
import st from '@/components/story.module.css';
import { conditions } from '@/brand/conditions';
import s from '@/components/page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Ohio Medical Marijuana Card Online | Marijuana Card OH' },
  description: 'Get your Ohio medical marijuana card by telehealth with an Ohio-licensed physician. $149, no state fee, full refund if you don’t qualify.',
  alternates: { canonical: '/' },
};

const faq: [string, string][] = [
  ['Does Ohio charge a state registration fee?', 'No. Ohio’s current patient registration rule sets no state fee. You pay only our evaluation fee: $149 for a new card or $129 to renew.'],
  ['Can I get my evaluation by telehealth?', 'Yes. Ohio law lets the physician examine you in person or by telehealth. Our visits are all telehealth, so you can do yours from anywhere in Ohio.'],
  ['Who can get an Ohio medical marijuana card?', 'Ohio residents aged 18 or older who are diagnosed with one of Ohio’s 21 qualifying conditions. The physician decides whether you qualify after reviewing your history and examining you.'],
  ['What happens if I don’t qualify?', 'We refund your evaluation fee in full. There are no deductions and no no-show fee.'],
  ['How long does my card last?', 'Your Ohio registration lasts one year. You need a visit with your physician at least once a year to renew it.'],
];

export default function Home() {
  return (
    <main className={`container ${s.main}`}>
      <section className={s.hero}>
        <div className={s.heroText}>
          <Badge>Ohio medical marijuana card</Badge>
          <h1 className="type-display">Your Ohio medical marijuana card, from a doctor you can look up.</h1>
          <p className="type-body-lg">
            Book a telehealth visit with an Ohio-licensed physician who holds a Certificate to Recommend.
            ${pricing.newEvaluation} for a new card, ${pricing.renewalEvaluation} to renew, and Ohio charges no state registration fee.
            If you don’t qualify, we refund you in full.
          </p>
          <div className={s.actions}>
            <Button href="/get-started">Check if you qualify</Button>
            <Button href="/doctors" variant="accent">See our doctors</Button>
          </div>
          <p className="type-small" style={{ color: 'var(--color-text-secondary)' }}>
            Real Ohio doctors. Clear answers. Your money back if you don’t qualify. <Link href="/refund-policy">Refund terms</Link>
          </p>
        </div>
        <PriceCard type="new" />
      </section>

      {storyVideo.ready && (
        <section className={`${s.section} ${s.wide}`} aria-labelledby="story">
          <div className={st.wrap}>
            <div className={st.copy}>
              <Badge>One-minute story</Badge>
              <h2 id="story" className="type-h2">Follow Maya’s path to an Ohio card</h2>
              <p>A short animated story of how the process works from home: a few questions, your records, a video visit with an Ohio physician, then activating your registration.</p>
              <Button href="/get-started">Start your own story</Button>
            </div>
            <StoryVideo />
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'VideoObject',
            name: storyVideo.title, description: storyVideo.description,
            thumbnailUrl: new URL(storyVideo.poster, `https://${brand.domain}`).href,
            contentUrl: new URL(storyVideo.src, `https://${brand.domain}`).href,
            uploadDate: storyVideo.uploadDate, duration: storyVideo.durationIso,
            transcript: storyVideo.transcript.join(' '),
          }) }} />
        </section>
      )}

      <section className={`${s.section} ${s.wide}`} aria-labelledby="how">
        <h2 id="how" className="type-h2">How it works</h2>
        <ol className={s.steps}>
          <li><h3 className="type-h3">Book your visit</h3><p>Pick a time from your physician’s open appointment slots. Have a photo ID and any medical records ready.</p></li>
          <li><h3 className="type-h3">See your physician by video</h3><p>Your Ohio physician reviews your history and medications, checks Ohio’s prescription database, and explains the risks and benefits.</p></li>
          <li><h3 className="type-h3">Get registered if you qualify</h3><p>Your physician submits your recommendation to the Ohio registry right after your visit. The state emails you to activate it.</p></li>
        </ol>
        <p><Link href="/how-it-works">Read the full step-by-step guide</Link></p>
      </section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="doctors">
        <h2 id="doctors" className="type-h2">Meet your Ohio physicians</h2>
        <p className="type-body" style={{ maxWidth: '48rem' }}>
          Both hold an active Ohio license and a Certificate to Recommend from the State Medical Board of Ohio. Check them yourself on Ohio eLicense.
        </p>
        <div className={s.grid2}>
          {physicians.map((p) => (
            <DoctorCard key={p.npi} doctor={{ name: `${p.name}, ${p.credential}`, role: p.role, license: p.ohioLicense, npi: p.npi }} />
          ))}
        </div>
      </section>

      <section className={`${s.section} ${s.wide}`} aria-labelledby="pricing">
        <h2 id="pricing" className="type-h2">One clear price</h2>
        <div className={s.grid2}><PriceCard type="new" /><PriceCard type="renewal" /></div>
        <p><Link href="/pricing">See what’s included</Link></p>
      </section>

      <Section title="Ohio’s 21 qualifying conditions" id="conditions">
        <p>Ohio law lists the conditions that qualify. Your physician confirms your diagnosis during the visit.</p>
        <ul style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', columnGap: 'var(--space-xl)' }}>
          {conditions.map((c) => <li key={c.slug}>{c.name}</li>)}
        </ul>
        <p><Link href="/conditions">Learn about each condition</Link></p>
      </Section>

      <section className={`${s.grid2}`} aria-label="Guides">
        <div className={s.callout}>
          <h2 className="type-h3">Already have a card?</h2>
          <p>Your registration lasts a year. We remind you before it runs out and you can renew with the same physician for ${pricing.renewalEvaluation}.</p>
          <p><Link href="/renewals">How renewal works</Link></p>
        </div>
        <div className={s.callout}>
          <h2 className="type-h3">Confused by the Ohio registry?</h2>
          <p>What the state registry is, how you activate your registration, and what to do if your email never arrives.</p>
          <p><Link href="/guides/ohio-medical-marijuana-registry">Read the registry guide</Link></p>
        </div>
      </section>

      <Faq items={faq} />

      <Sources checked="13 Oct 2026" items={[
        ['Ohio Revised Code 4731.30: recommending medical marijuana', 'https://codes.ohio.gov/ohio-revised-code/section-4731.30'],
        ['Ohio Revised Code 3796.01: qualifying medical conditions', 'https://codes.ohio.gov/ohio-revised-code/section-3796.01'],
        ['Ohio Administrative Code 1301:18-10-01: patient registration', 'https://codes.ohio.gov/ohio-administrative-code/rule-1301:18-10-01'],
        ['Division of Cannabis Control: Obtain medical marijuana', 'https://com.ohio.gov/divisions-and-programs/cannabis-control/patients-caregivers/obtain-medical-marijuana'],
      ]} />

      <ImportantInfo />
    </main>
  );
}
