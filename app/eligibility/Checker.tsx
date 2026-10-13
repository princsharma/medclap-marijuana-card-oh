'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { conditions } from '@/brand/conditions';
import s from '@/components/page.module.css';

type Answer = 'yes' | 'no' | '';

// Runs entirely in the browser. Nothing is stored or sent anywhere.
export function Checker() {
  const [age, setAge] = useState<Answer>('');
  const [ohio, setOhio] = useState<Answer>('');
  const [condition, setCondition] = useState('');
  const done = age && ohio && condition;

  const radio = (name: string, value: Answer, set: (v: Answer) => void, label: string) => (
    <label style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 44 }}>
      <input type="radio" name={name} checked={value === (label === 'Yes' ? 'yes' : 'no')} onChange={() => set(label === 'Yes' ? 'yes' : 'no')} /> {label}
    </label>
  );

  let result: React.ReactNode = null;
  if (done) {
    if (age === 'no') result = <><h2 className="type-h3">We can’t see patients under 18</h2><p>Ohio patients under 18 need a parent’s consent and a registered caregiver. We see adults only. An Ohio physician who treats children can help.</p></>;
    else if (ohio === 'no') result = <><h2 className="type-h3">Ohio residents only</h2><p>Ohio’s registry is for Ohio residents with a valid photo ID. If you’re moving to Ohio, come back once you have an Ohio address.</p></>;
    else if (condition === 'none') result = <><h2 className="type-h3">Your condition may not be on Ohio’s list</h2><p>Ohio only allows the 21 listed conditions. If you also have one of them, such as chronic and severe pain or PTSD, a physician can evaluate you for it. <Link href="/conditions">See the list</Link>.</p></>;
    else result = <><h2 className="type-h3">{condition === 'unsure' ? 'A physician can help you find out' : 'You may qualify'}</h2><p>Book a telehealth visit and your Ohio physician will decide. Have your photo ID and any medical records ready. If you don’t qualify, we refund your fee in full.</p><div><Button href={condition && condition !== 'unsure' ? `/get-started?condition=${condition}` : '/get-started'}>Book your evaluation</Button></div></>;
  }

  return (
    <form className={s.panel} onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '40rem', minWidth: 0, width: '100%' }}>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="type-h3">1. Are you 18 or older?</legend>
        {radio('age', age, setAge, 'Yes')}{radio('age', age, setAge, 'No')}
      </fieldset>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="type-h3">2. Do you live in Ohio and have a valid photo ID?</legend>
        {radio('ohio', ohio, setOhio, 'Yes')}{radio('ohio', ohio, setOhio, 'No')}
      </fieldset>
      <div style={{ display: 'grid', gap: 8 }}>
        <label htmlFor="condition" className="type-h3">3. Which condition were you diagnosed with?</label>
        <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: '100%', maxWidth: '100%', minWidth: 0, minHeight: 44, font: 'inherit', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border-strong)' }}>
          <option value="">Choose one</option>
          {conditions.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          <option value="unsure">I’m not sure</option>
          <option value="none">None of these</option>
        </select>
      </div>
      <div aria-live="polite" className={s.callout} hidden={!done}>{result}</div>
    </form>
  );
}
