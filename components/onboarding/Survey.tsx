'use client';
/**
 * Onboarding survey (multistep). CRO notes:
 * - Easy first question (one tap), auto-advance on single choice, progress bar, "about 2 minutes".
 * - Value before contact details: an encouraging fit screen comes before the contact step.
 * - Prefill from the URL: ?type=renewal, ?condition=<slug>; UTM/referrer captured for attribution.
 * Compliance: never says "you qualify" or promises approval. The physician decides.
 * Privacy: answers live in memory only (no browser storage). Analytics events carry no health data.
 * Submits to /api/onboarding, which forwards to the EHR when EHR_WEBHOOK_URL is set.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { conditions } from '@/brand/conditions';
import { pricing } from '@/brand/site';
import { Icon } from '@/components/ui/Icon';
import s from './survey.module.css';

type VisitType = 'new' | 'renewal';
type Answers = {
  visitType?: VisitType; ohio?: boolean; dob: string; conditions: string[]; notSure: boolean;
  diagnosed?: 'yes' | 'no' | 'unsure'; records?: 'have' | 'can-get' | 'none'; expires?: 'expired' | '30-days' | '1-3-months' | 'later' | 'unsure';
  firstName: string; lastName: string; email: string; phone: string; zip: string; smsOptIn: boolean;
  consentTelehealth: boolean; consentTerms: boolean; heardFrom: string;
};
type StepId = 'type' | 'ohio' | 'dob' | 'condition' | 'history' | 'fit' | 'contact' | 'consent';
type Exit = 'not-ohio' | 'under-18' | null;

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
const track = (event: string, data: Record<string, unknown> = {}) => { try { (window.dataLayer = window.dataLayer || []).push({ event, ...data }); } catch { /* no-op */ } };

const ageFrom = (dob: string) => {
  const m = dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if (!m) return null;
  const [mm, dd, yy] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(yy, mm - 1, dd); if (d.getMonth() !== mm - 1 || d.getDate() !== dd || yy < 1900) return null;
  const now = new Date(); let a = now.getFullYear() - yy; if (now.getMonth() < mm - 1 || (now.getMonth() === mm - 1 && now.getDate() < dd)) a--;
  return a;
};
const maskDob = (v: string) => { const d = v.replace(/\D/g, '').slice(0, 8); return [d.slice(0, 2), d.slice(2, 4), d.slice(4)].filter(Boolean).join('/'); };
const maskPhone = (v: string) => { const d = v.replace(/\D/g, '').replace(/^1/, '').slice(0, 10); return d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d; };
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

export function Survey() {
  const [a, setA] = useState<Answers>({ dob: '', conditions: [], notSure: false, firstName: '', lastName: '', email: '', phone: '', zip: '', smsOptIn: false, consentTelehealth: false, consentTerms: false, heardFrom: '' });
  const [i, setI] = useState(0);
  const [exit, setExit] = useState<Exit>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ forwarded: boolean } | null>(null);
  const attribution = useRef<Record<string, string>>({});
  const ohioZips = useRef<Record<string, unknown> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const steps: StepId[] = useMemo(() => ['type', 'ohio', 'dob', 'condition', 'history', 'fit', 'contact', 'consent'], []);
  const step = steps[i];
  const isRenewal = a.visitType === 'renewal';
  const set = (p: Partial<Answers>) => { setA((x) => ({ ...x, ...p })); setError(''); };

  // Prefill and attribution from the URL.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('type'); const c = q.get('condition');
    const pre: Partial<Answers> = {};
    if (t === 'renewal' || t === 'new') pre.visitType = t;
    if (c && conditions.some((x) => x.slug === c)) pre.conditions = [c];
    if (Object.keys(pre).length) setA((x) => ({ ...x, ...pre }));
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((k) => { const v = q.get(k); if (v) attribution.current[k] = v.slice(0, 200); });
    if (document.referrer) attribution.current.referrer = document.referrer.slice(0, 300);
    attribution.current.landing = window.location.pathname;
  }, []);

  // Move focus to the question on each step; fire a step event (no health data).
  useEffect(() => {
    if (!started.current) { started.current = true; track('onboarding_view'); return; }
    headingRef.current?.focus();
    track('onboarding_step', { step_index: i + 1, step_name: step, visit_type: a.visitType ?? '' });
  }, [i, exit, done]); // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => { setError(''); setI((n) => Math.min(n + 1, steps.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const back = () => { setError(''); if (exit) { setExit(null); return; } setI((n) => Math.max(n - 1, 0)); };

  const choose = <K extends keyof Answers>(k: K, v: Answers[K], after?: () => void) => { set({ [k]: v } as Partial<Answers>); setTimeout(after ?? next, 180); };

  const validate = async (): Promise<boolean> => {
    switch (step) {
      case 'dob': {
        const age = ageFrom(a.dob);
        if (age === null) { setError('Enter your date of birth as MM/DD/YYYY.'); return false; }
        if (age < 18) { setExit('under-18'); track('onboarding_exit', { reason: 'under-18' }); return false; }
        if (age > 120) { setError('Please check the year.'); return false; }
        return true;
      }
      case 'condition':
        if (!a.conditions.length && !a.notSure) { setError('Choose at least one condition, or “I’m not sure”.'); return false; }
        return true;
      case 'history':
        if (isRenewal ? !a.expires : (!a.diagnosed || !a.records)) { setError('Please answer both questions.'); return false; }
        return true;
      case 'contact': {
        if (!a.firstName.trim() || !a.lastName.trim()) { setError('Enter your first and last name.'); return false; }
        if (!emailOk(a.email)) { setError('Enter a valid email address.'); return false; }
        if (a.phone.replace(/\D/g, '').length !== 10) { setError('Enter a 10-digit phone number.'); return false; }
        if (!/^\d{5}$/.test(a.zip)) { setError('Enter your 5-digit ZIP code.'); return false; }
        try {
          if (!ohioZips.current) ohioZips.current = (await (await fetch('/data/ohio-places.json')).json()).zips;
          if (ohioZips.current && !ohioZips.current[a.zip]) { setError('That ZIP code isn’t in Ohio. Our physicians can only see Ohio residents.'); return false; }
        } catch { /* if the lookup fails, let the server and physician verify */ }
        return true;
      }
      case 'consent':
        if (!a.consentTelehealth || !a.consentTerms) { setError('Please tick both required boxes to continue.'); return false; }
        return true;
      default: return true;
    }
  };

  const onContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!(await validate())) return;
    if (step === 'consent') return submit();
    if (step === 'contact') track('onboarding_lead', { visit_type: a.visitType ?? '' });
    next();
  };

  const submit = async () => {
    setSending(true); setError('');
    try {
      const res = await fetch('/api/onboarding', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...a, attribution: attribution.current }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) throw new Error(j.error || 'failed');
      track('onboarding_complete', { visit_type: a.visitType ?? '' });
      setDone({ forwarded: Boolean(j.forwarded) });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(`Something went wrong sending your answers. Please try again, or email us and we’ll help you book.`);
    } finally { setSending(false); }
  };

  const total = steps.length;
  const pct = done ? 100 : Math.round(((exit ? i : i) / total) * 100);
  const chosenNames = a.conditions.map((sl) => conditions.find((c) => c.slug === sl)?.name).filter(Boolean) as string[];
  const shown = conditions.filter((c) => c.name.toLowerCase().includes(filter.trim().toLowerCase()));

  const Choice = ({ selected, onClick, title, hint, icon }: { selected: boolean; onClick: () => void; title: string; hint?: string; icon?: Parameters<typeof Icon>[0]['name'] }) => (
    <button type="button" className={`${s.choice} ${selected ? s.selected : ''}`} aria-pressed={selected} onClick={onClick}>
      {icon ? <span className={s.choiceIcon}><Icon name={icon} /></span> : null}
      <span className={s.choiceText}><span className={s.choiceTitle}>{title}</span>{hint ? <span className={s.choiceHint}>{hint}</span> : null}</span>
      <span className={s.radio} aria-hidden="true" />
    </button>
  );

  const H = ({ children }: { children: React.ReactNode }) => <h1 ref={headingRef} tabIndex={-1} className={s.q}>{children}</h1>;

  let body: React.ReactNode;
  if (done) {
    body = (
      <div className={s.done}>
        <span className={s.doneIcon}><Icon name="check-circle" size={32} /></span>
        <H>You’re on your way, {a.firstName.trim()}.</H>
        {done.forwarded ? (
          <p className={s.lead}>We’ve sent your answers to our care team. Check {a.email.trim()} for a link to choose your video visit time.</p>
        ) : (
          <p className={s.notice}><strong>Staging:</strong> the survey isn’t connected to the EHR yet, so nothing was sent. Once it is, this screen confirms the booking link was emailed.</p>
        )}
        <h2 className={s.h2}>Before your visit</h2>
        <ul className={s.prep}>
          <li><Icon name="user-check" size={18} /> Have a photo ID ready.</li>
          <li><Icon name="list-checks" size={18} /> Gather any records that name your diagnosis. <Link href="/guides/medical-records">What helps</Link></li>
          <li><Icon name="map-pin" size={18} /> Be somewhere private and physically in Ohio for the video call.</li>
          <li><Icon name="receipt" size={18} /> If your physician finds you don’t qualify, you get a full refund.</li>
        </ul>
        <p className={s.small}>Questions? Visit the <Link href="/help">Help Center</Link>.</p>
      </div>
    );
  } else if (exit === 'not-ohio') {
    body = (<div><H>We can only see Ohio residents</H><p className={s.lead}>Our physicians are licensed in Ohio and Ohio’s program is for Ohio residents. If you’ve moved to Ohio or are about to, you’re welcome back once you live here.</p><button type="button" className={s.ghost} onClick={back}>Go back</button></div>);
  } else if (exit === 'under-18') {
    body = (<div><H>Our service is for adults 18 and older</H><p className={s.lead}>Ohio lets patients under 18 register only with a parent or guardian as their caregiver, and we see adults only. A pediatric physician with a Certificate to Recommend can help.</p><button type="button" className={s.ghost} onClick={back}>Go back</button></div>);
  } else if (step === 'type') {
    body = (<>
      <p className={s.kicker}>Takes about 2 minutes</p>
      <H>What can we help you with?</H>
      <div className={s.choices}>
        <Choice icon="compass" title="Get a new Ohio medical card" hint={`$${pricing.newEvaluation} evaluation`} selected={a.visitType === 'new'} onClick={() => choose('visitType', 'new')} />
        <Choice icon="repeat" title="Renew my Ohio medical card" hint={`$${pricing.renewalEvaluation} evaluation`} selected={a.visitType === 'renewal'} onClick={() => choose('visitType', 'renewal')} />
      </div>
    </>);
  } else if (step === 'ohio') {
    body = (<>
      <H>Do you live in Ohio?</H>
      <p className={s.why}>Ohio’s program is for Ohio residents, and our physicians are licensed in Ohio.</p>
      <div className={s.choices}>
        <Choice title="Yes, I live in Ohio" selected={a.ohio === true} onClick={() => choose('ohio', true)} />
        <Choice title="No" selected={a.ohio === false} onClick={() => { set({ ohio: false }); setExit('not-ohio'); track('onboarding_exit', { reason: 'not-ohio' }); }} />
      </div>
    </>);
  } else if (step === 'dob') {
    body = (<>
      <H>What’s your date of birth?</H>
      <p className={s.why}>You need to be 18 or older. Your physician confirms it with your photo ID.</p>
      <label className={s.label} htmlFor="dob">Date of birth</label>
      <input id="dob" className={s.input} inputMode="numeric" autoComplete="bday" placeholder="MM/DD/YYYY" value={a.dob} onChange={(e) => set({ dob: maskDob(e.target.value) })} aria-invalid={Boolean(error)} aria-describedby={error ? 'q-err' : undefined} />
    </>);
  } else if (step === 'condition') {
    body = (<>
      <H>{isRenewal ? 'Which condition is your card for?' : 'Which condition would you like to be evaluated for?'}</H>
      <p className={s.why}>These are Ohio’s 21 qualifying conditions. Choose all that apply; your physician confirms the diagnosis.</p>
      <label className="visually-hidden" htmlFor="cond-filter">Search conditions</label>
      <input id="cond-filter" className={s.input} placeholder="Search conditions" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className={s.chips} role="group" aria-label="Qualifying conditions">
        {shown.map((c) => {
          const on = a.conditions.includes(c.slug);
          return <button key={c.slug} type="button" aria-pressed={on} className={`${s.chip} ${on ? s.chipOn : ''}`}
            onClick={() => set({ conditions: on ? a.conditions.filter((x) => x !== c.slug) : [...a.conditions, c.slug], notSure: false })}>{on ? '✓ ' : ''}{c.name}</button>;
        })}
        {!shown.length ? <p className={s.small}>No match. Choose “I’m not sure” and your physician will help.</p> : null}
      </div>
      <button type="button" aria-pressed={a.notSure} className={`${s.chip} ${s.notSure} ${a.notSure ? s.chipOn : ''}`} onClick={() => set({ notSure: !a.notSure, conditions: [] })}>{a.notSure ? '✓ ' : ''}I’m not sure which applies</button>
    </>);
  } else if (step === 'history') {
    body = isRenewal ? (<>
      <H>When does your current card expire?</H>
      <p className={s.why}>You can renew in the registry within 30 days before it expires.</p>
      <div className={s.choices}>
        {([['expired', 'It has already expired'], ['30-days', 'Within 30 days'], ['1-3-months', 'In 1 to 3 months'], ['later', 'More than 3 months away'], ['unsure', 'I’m not sure']] as const).map(([v, t]) =>
          <Choice key={v} title={t} selected={a.expires === v} onClick={() => choose('expires', v)} />)}
      </div>
    </>) : (<>
      <H>Has a doctor diagnosed this condition?</H>
      <div className={s.choicesRow}>
        {([['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure']] as const).map(([v, t]) =>
          <Choice key={v} title={t} selected={a.diagnosed === v} onClick={() => set({ diagnosed: v })} />)}
      </div>
      <h2 className={s.q2}>Can you share medical records?</h2>
      <p className={s.why}>Records help but aren’t always required. Photos or PDFs from a patient portal are fine.</p>
      <div className={s.choices}>
        {([['have', 'Yes, I have them'], ['can-get', 'I can get them'], ['none', 'I don’t have records']] as const).map(([v, t]) =>
          <Choice key={v} title={t} selected={a.records === v} onClick={() => { set({ records: v }); if (a.diagnosed) setTimeout(next, 180); }} />)}
      </div>
    </>);
  } else if (step === 'fit') {
    body = (<>
      <span className={s.doneIcon}><Icon name="check-circle" size={28} /></span>
      <H>{a.notSure ? 'Good news: a physician can help you find out' : 'Good news: you may be a good fit for an evaluation'}</H>
      <p className={s.lead}>{a.notSure
        ? 'Your physician will review your history and tell you whether one of Ohio’s qualifying conditions applies.'
        : <>Based on your answers{chosenNames.length ? <> about <strong>{chosenNames.slice(0, 2).join(' and ')}{chosenNames.length > 2 ? ` and ${chosenNames.length - 2} more` : ''}</strong></> : null}, the next step is a video visit with an Ohio-licensed physician, who decides whether you qualify.</>}</p>
      <ul className={s.prep}>
        <li><Icon name="video" size={18} /> Video visit from home, anywhere in Ohio</li>
        <li><Icon name="receipt" size={18} /> ${isRenewal ? pricing.renewalEvaluation : pricing.newEvaluation} evaluation, no state fee, full refund if you don’t qualify</li>
        <li><Icon name="clock" size={18} /> If you qualify, your recommendation is submitted to the Ohio registry right after your visit</li>
      </ul>
      {!isRenewal && a.records === 'none' ? <p className={s.notice}>No records? You can still book. Your physician may ask for them before deciding. <Link href="/guides/medical-records">How to get your records</Link></p> : null}
      {isRenewal && a.expires === 'expired' ? <p className={s.notice}>Your card can’t be used while it’s expired. Once your physician submits a new recommendation, the Renew Card button appears in your registry account.</p> : null}
    </>);
  } else if (step === 'contact') {
    body = (<>
      <H>Where should we send your booking link?</H>
      <p className={s.why}>We use this only for your visit and registration. No spam, and we never sell your information.</p>
      <div className={s.grid2}>
        <div><label className={s.label} htmlFor="fn">First name</label><input id="fn" className={s.input} autoComplete="given-name" value={a.firstName} onChange={(e) => set({ firstName: e.target.value })} /></div>
        <div><label className={s.label} htmlFor="ln">Last name</label><input id="ln" className={s.input} autoComplete="family-name" value={a.lastName} onChange={(e) => set({ lastName: e.target.value })} /></div>
      </div>
      <label className={s.label} htmlFor="em">Email</label>
      <input id="em" className={s.input} type="email" autoComplete="email" inputMode="email" value={a.email} onChange={(e) => set({ email: e.target.value })} />
      <div className={s.grid2}>
        <div><label className={s.label} htmlFor="ph">Mobile phone</label><input id="ph" className={s.input} type="tel" autoComplete="tel-national" inputMode="tel" placeholder="(555) 555-5555" value={a.phone} onChange={(e) => set({ phone: maskPhone(e.target.value) })} /></div>
        <div><label className={s.label} htmlFor="zp">ZIP code</label><input id="zp" className={s.input} autoComplete="postal-code" inputMode="numeric" maxLength={5} value={a.zip} onChange={(e) => set({ zip: e.target.value.replace(/\D/g, '').slice(0, 5) })} /></div>
      </div>
      <label className={s.check}><input type="checkbox" checked={a.smsOptIn} onChange={(e) => set({ smsOptIn: e.target.checked })} />
        <span>Text me appointment reminders. Optional. Message and data rates may apply; reply STOP to opt out.</span></label>
    </>);
  } else if (step === 'consent') {
    body = (<>
      <H>Last step: review and confirm</H>
      <dl className={s.review}>
        <div><dt>Visit</dt><dd>{isRenewal ? `Renewal evaluation, $${pricing.renewalEvaluation}` : `New card evaluation, $${pricing.newEvaluation}`}</dd></div>
        <div><dt>Condition</dt><dd>{a.notSure ? 'Not sure yet' : chosenNames.join(', ')}</dd></div>
        <div><dt>Contact</dt><dd>{a.firstName} {a.lastName}, {a.email}, {a.phone}</dd></div>
      </dl>
      <label className={s.check}><input type="checkbox" checked={a.consentTelehealth} onChange={(e) => set({ consentTelehealth: e.target.checked })} />
        <span>I’m 18 or older, I’ll be in Ohio for my visit, and I agree to the <Link href="/telehealth-consent" target="_blank">telehealth consent</Link>. <em className={s.req}>Required</em></span></label>
      <label className={s.check}><input type="checkbox" checked={a.consentTerms} onChange={(e) => set({ consentTerms: e.target.checked })} />
        <span>I agree to the <Link href="/terms" target="_blank">terms of use</Link> and have read the <Link href="/privacy" target="_blank">privacy policy</Link> and <Link href="/notice-of-privacy-practices" target="_blank">notice of privacy practices</Link>. <em className={s.req}>Required</em></span></label>
      <label className={s.label} htmlFor="heard">How did you hear about us? <span className={s.opt}>Optional</span></label>
      <select id="heard" className={s.input} value={a.heardFrom} onChange={(e) => set({ heardFrom: e.target.value })}>
        <option value="">Choose one</option>
        {['Google search', 'AI assistant (ChatGPT, Gemini, etc.)', 'Friend or family', 'My doctor', 'Social media', 'Dispensary', 'Other'].map((o) => <option key={o}>{o}</option>)}
      </select>
    </>);
  }

  const singleTap = step === 'type' || step === 'ohio' || (step === 'history' && isRenewal);
  const showNav = !done && !exit;

  return (
    <div className={s.shell}>
      <div className={s.main}>
        {!done ? (
          <div className={s.progress} aria-label={`Step ${Math.min(i + 1, total)} of ${total}`}>
            <div className={s.bar}><span style={{ width: `${Math.max(pct, 6)}%` }} /></div>
            <p className={s.stepOf}>Step {Math.min(i + 1, total)} of {total}</p>
          </div>
        ) : null}
        <form className={s.card} onSubmit={onContinue} noValidate>
          {body}
          {error ? <p id="q-err" className={s.error} role="alert">{error}</p> : null}
          {showNav ? (
            <div className={s.nav}>
              {i > 0 ? <button type="button" className={s.ghost} onClick={back}>Back</button> : <span />}
              {!singleTap ? (
                <button type="submit" className={s.primary} disabled={sending}>
                  {step === 'consent' ? (sending ? 'Sending…' : 'Submit and choose a time') : step === 'fit' ? 'Continue: 2 quick steps' : 'Continue'}
                  <Icon name="arrow-right" size={18} />
                </button>
              ) : null}
            </div>
          ) : null}
          {step === 'consent' && !done ? <p className={s.guarantee}><Icon name="shield-check" size={16} /> 100% money-back guarantee if you don’t qualify.</p> : null}
        </form>
      </div>

    </div>
  );
}
