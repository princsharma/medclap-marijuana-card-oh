import Link from 'next/link';
import { Fragment } from 'react';

/** Renders light markup used in content files: **bold** and [label](href). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((p, i) => {
    const b = p.match(/^\*\*(.+)\*\*$/); if (b) return <strong key={i}>{b[1]}</strong>;
    const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/); if (l) return l[2].startsWith('/') ? <Link key={i} href={l[2]}>{l[1]}</Link> : <a key={i} href={l[2]} target="_blank" rel="noopener noreferrer">{l[1]}</a>;
    return <Fragment key={i}>{p}</Fragment>;
  })}</>;
}

/** Turns body lines into headings, lists and paragraphs. */
export function Body({ lines }: { lines: string[] }) {
  const out: React.ReactNode[] = []; let list: string[] = [];
  const flush = () => { if (list.length) { out.push(<ul key={`u${out.length}`}>{list.map((l) => <li key={l}><Rich text={l} /></li>)}</ul>); list = []; } };
  lines.forEach((l, i) => {
    if (l.startsWith('- ')) { list.push(l.slice(2)); return; }
    flush();
    if (l.startsWith('## ')) out.push(<h2 key={i} className="type-h2">{l.slice(3)}</h2>);
    else out.push(<p key={i}><Rich text={l} /></p>);
  });
  flush();
  return <>{out}</>;
}
