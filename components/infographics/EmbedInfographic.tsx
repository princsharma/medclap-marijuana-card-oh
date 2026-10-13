'use client';
import { useState } from 'react';
import s from './embed.module.css';

/** "Embed this infographic": copy-paste HTML with a credit link back to the source page. */
export function EmbedInfographic({ code, png, title }: { code: string; png: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* user can select the text */ }
    (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: 'infographic_embed_copy', infographic: title });
  };
  return (
    <details className={s.embed}>
      <summary>Share or embed this infographic</summary>
      <div className={s.body}>
        <p>You’re welcome to use this infographic on your website, blog or newsletter. Please keep the credit link.</p>
        <label className={s.label} htmlFor={`embed-${title}`}>Embed code</label>
        <textarea id={`embed-${title}`} className={s.code} readOnly rows={5} value={code} onFocus={(e) => e.currentTarget.select()} />
        <div className={s.actions}>
          <button type="button" className={s.btn} onClick={copy}><span aria-live="polite">{copied ? 'Copied' : 'Copy embed code'}</span></button>
          <a className={s.link} href={png} download>Download PNG</a>
        </div>
      </div>
    </details>
  );
}
