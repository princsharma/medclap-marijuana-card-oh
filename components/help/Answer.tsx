import Link from "next/link";
import type { ReactNode } from "react";
import { Tel } from "@/components/sections/ServiceSections";
import s from "./help.module.css";

/** Inline markup: **bold** and [label](href). Bold 911/988 become tappable numbers. */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(/^\d{3}$/.test(m[1]) ? <Tel key={k++} n={m[1]} /> : <strong key={k++}>{inline(m[1])}</strong>);
    else out.push(<Link key={k++} href={m[3]}>{m[2]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Article body: paragraphs plus "- " list lines. */
export function Answer({ lines }: { lines: string[] }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={`l${blocks.length}`} className={s.list}>
          {list.map((l) => (
            <li key={l}>{inline(l)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  for (const l of lines) {
    if (l.startsWith("- ")) list.push(l.slice(2));
    else {
      flush();
      blocks.push(<p key={`p${blocks.length}`}>{inline(l)}</p>);
    }
  }
  flush();
  return <div className={s.answer}>{blocks}</div>;
}

export function CrisisNote() {
  return (
    <div className={s.crisis} role="note">
      <p className={s.crisisTitle}>The Help Center is not an emergency service.</p>
      <p>
        If you are in immediate danger in the United States, call <Tel n="911" />. For mental health crisis support, call or text{" "}
        <Tel n="988" />.
      </p>
    </div>
  );
}
