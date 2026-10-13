import type { IgIcon, Infographic as Ig } from '@/content/infographics';
import { brand } from '@/brand/site';
import s from './infographic.module.css';

const P: Record<IgIcon, string> = {
  check: 'M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M8.5 12l2.5 2.5 4.5-5',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z M14 3v5h5 M9 13h6 M9 17h4',
  video: 'M16 10l5-3v10l-5-3 M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z',
  send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4Z',
  mail: 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M22 7l-10 7L2 7',
  card: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M6 10h4v5H6Z M13 11h6 M13 14h4',
  store: 'M3 9l1.5-5h15L21 9 M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z M5 13v8h14v-8 M10 21v-5h4v5',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M16 3v4 M8 3v4 M3 11h18',
  repeat: 'M17 2l4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3',
  alert: 'M12 3l10 18H2Z M12 10v5 M12 18h.01',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4',
  briefcase: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2 M3 13h18',
  car: 'M5 17h14v-5l-2-5H7l-2 5Z M5 12h14 M7 17v2 M17 17v2 M7.5 14.5h.01 M16.5 14.5h.01',
  home: 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
  lock: 'M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z M8 11V7a4 4 0 0 1 8 0v4',
  scale: 'M12 3v18 M7 21h10 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0Z M19 7l-3 7a3 3 0 0 0 6 0Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  folder: 'M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z',
  phone: 'M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z M11 18h2',
  person: 'M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1',
};

function I({ name, size = 26 }: { name: IgIcon; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={P[name]} />
    </svg>
  );
}

function Mark() {
  return (
    <svg width="30" height="30" viewBox="8 8 84 84" aria-hidden="true" focusable="false">
      <path d="M45 45 C20 44 11 27 13 10 C31 8 46 19 45 45 Z M45 55 C20 54 9 71 10 89 C29 91 45 79 45 55 Z M55 55 C54 80 71 91 89 90 C91 71 79 55 55 55 Z" fill="var(--teal-600)" />
      <path d="M55 45 C54 20 71 9 89 10 C91 29 79 45 55 45 Z" fill="var(--sun-400)" />
    </svg>
  );
}

/** artboard: fixed 1200px layout used for the PNG export. */
export function Infographic({ ig, artboard = false, headingLevel = 2 }: { ig: Ig; artboard?: boolean; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <figure className={`${s.ig} ${artboard ? s.artboard : ''}`} aria-labelledby={`ig-${ig.slug}`}>
      <header className={s.top}>
        <p className={s.brand}><Mark /> {brand.name}</p>
        <H id={`ig-${ig.slug}`} className={s.title}>{ig.title}</H>
        <p className={s.subtitle}>{ig.subtitle}</p>
      </header>

      {ig.kind === 'steps' && (
        <>
          <ol className={s.steps}>
            {ig.steps.map((st, i) => (
              <li key={st.title} className={s.step}>
                <span className={s.num} aria-hidden="true">{i + 1}</span>
                <span className={s.icon}><I name={st.icon} /></span>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
          {ig.facts?.length ? <ul className={s.facts}>{ig.facts.map((f) => <li key={f}><I name="check" size={18} /> {f}</li>)}</ul> : null}
        </>
      )}

      {ig.kind === 'compare' && (
        <div className={s.compareWrap}>
          <table className={s.compare}>
            <thead><tr><th scope="col"><span className="visually-hidden">Topic</span></th><th scope="col" className={s.colA}>{ig.columns[0]}</th><th scope="col" className={s.colB}>{ig.columns[1]}</th></tr></thead>
            <tbody>
              {ig.rows.map((r) => (
                <tr key={r.label} className={r.same ? s.same : ''}>
                  <th scope="row">{r.label}</th>
                  <td className={s.colA}>{r.a}</td>
                  <td className={s.colB}>{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.legend}><span className={s.sameSwatch} aria-hidden="true" /> Shaded rows are the same either way</p>
        </div>
      )}

      {ig.kind === 'checklist' && (
        <div className={s.groups}>
          {ig.groups.map((g) => (
            <section key={g.title} className={s.group}>
              <h3 className={s.groupTitle}><span className={s.icon}><I name={g.icon} /></span>{g.title}</h3>
              <ul>{g.items.map((it) => <li key={it}><I name="check" size={18} /> <span>{it}</span></li>)}</ul>
            </section>
          ))}
        </div>
      )}

      {ig.kind === 'tiles' && (
        <ul className={s.tiles}>
          {ig.tiles.map((t) => (
            <li key={t.title} className={s.tile}>
              <span className={s.icon}><I name={t.icon} /></span>
              <h3 className={s.stepTitle}>{t.title}</h3>
              <p className={`${s.verdict} ${s[t.verdict]}`}>{t.verdictLabel}</p>
              <p className={s.stepText}>{t.text}</p>
            </li>
          ))}
        </ul>
      )}

      <figcaption className={s.foot}>
        <span>{'note' in ig && ig.note ? `${ig.note} ` : ''}Sources: {ig.sources}. Checked {ig.checked}.</span>
        <span className={s.domain}>{brand.domain}</span>
      </figcaption>
    </figure>
  );
}
