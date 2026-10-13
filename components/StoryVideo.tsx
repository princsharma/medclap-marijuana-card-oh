'use client';
import { useRef, useState } from 'react';
import { storyVideo, type SiteVideo } from '@/brand/media';
import st from './story.module.css';

// Click-to-play: nothing loads until the visitor presses play, and the video never autoplays with sound.
export function StoryVideo({ video: v = storyVideo, event = 'story_video' }: { video?: SiteVideo; event?: string } = {}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  function play() {
    setPlaying(true);
    if (typeof window !== 'undefined') {
      (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: `${event}_play` });
    }
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  }

  return (
    <figure className={st.figure}>
      <div className={st.frame}>
        {playing ? (
          <video ref={ref} className={st.video} controls playsInline preload="metadata" poster={v.poster}
            onEnded={() => (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: `${event}_complete` })}>
            <source src={v.src} type="video/mp4" />
            <track kind="captions" src={v.captions} srcLang="en" label="English" default />
          </video>
        ) : (
          <button type="button" className={st.poster} onClick={play} aria-label={`Play video, ${v.durationLabel}: ${v.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.poster} alt="" width={1280} height={720} loading="lazy" />
            <span className={st.play} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            </span>
            <span className={st.len} aria-hidden="true">{v.durationLabel}</span>
          </button>
        )}
      </div>
      <figcaption className={st.caption}>
        <span className={st.label}>{v.label}</span> Captions available.
      </figcaption>
      <details className={st.transcript}>
        <summary>Read the transcript</summary>
        {v.transcript.map((line, i) => <p key={i}>{line}</p>)}
      </details>
    </figure>
  );
}
