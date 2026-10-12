"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AssistantReply } from "@/app/api/help-assistant/route";
import { Icon } from "@/components/ui/Icon";
import { helpPaths } from "@/content/help";
import { showPending } from "@/lib/site";
import { CrisisNote } from "./Answer";
import s from "./help.module.css";

type Turn = { id: number; q: string; reply?: AssistantReply; error?: string; feedback?: "yes" | "no" };

export function AiHelp({ placeholder, disclaimer, suggestions }: { placeholder: string; disclaimer: string; suggestions: string[] }) {
  const [q, setQ] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    const id = ++idRef.current;
    setTurns((t) => [{ id, q: text }, ...t]);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch("/api/help-assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      setTurns((t) => t.map((x) => (x.id === id ? (res.ok ? { ...x, reply: data } : { ...x, error: data.error ?? "Something went wrong." }) : x)));
    } catch {
      setTurns((t) => t.map((x) => (x.id === id ? { ...x, error: "We couldn’t reach Instant AI Help. Check your connection and try again." } : x)));
    } finally {
      setBusy(false);
    }
  }

  // A question handed over from Knowledge Base search (/help?q=…) is asked once on arrival.
  const askedFromUrl = useRef(false);
  useEffect(() => {
    if (askedFromUrl.current) return;
    askedFromUrl.current = true;
    const fromUrl = new URLSearchParams(window.location.search).get("q");
    if (fromUrl) ask(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(q);
  };
  const setFeedback = (id: number, v: "yes" | "no") => setTurns((t) => t.map((x) => (x.id === id ? { ...x, feedback: v } : x)));

  return (
    <div className={s.ai}>
      <form className={s.askBox} onSubmit={submit} role="search">
        <label htmlFor="ai-question" className="visually-hidden">
          Ask a question
        </label>
        <textarea
          id="ai-question"
          ref={inputRef}
          className={s.askInput}
          placeholder={placeholder}
          value={q}
          maxLength={500}
          rows={3}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(q);
            }
          }}
        />
        <button type="submit" className={s.askSend} disabled={busy || !q.trim()} aria-label="Send question">
          <Icon name="arrow-right" />
        </button>
      </form>
      <p className={s.disclaimer}>{disclaimer}</p>

      <div className={s.suggest}>
        <span className="small muted">Try:</span>
        {suggestions.map((x) => (
          <button key={x} type="button" className={s.chip} onClick={() => ask(x)} disabled={busy}>
            {x}
          </button>
        ))}
      </div>

      <div className={s.thread} aria-live="polite">
        {turns.map((t) => (
          <div key={t.id} className={s.turn}>
            <p className={s.bubble}>{t.q}</p>
            {t.reply?.kind === "crisis" ? (
              <div className={s.answerCard}>
                <CrisisNote />
                <p className="body">
                  If you are not in danger but want to talk to someone, the 988 Suicide &amp; Crisis Lifeline is available 24/7 by
                  call or text.
                </p>
                <SourceList sources={t.reply.sources} />
              </div>
            ) : t.reply ? (
              <div className={s.answerCard}>
                <p className={s.answerLabel}>
                  <Icon name="sparkle" size={18} /> {t.reply.kind === "answer" ? "Instant answer" : "No exact answer"}
                </p>
                <p className="body">{t.reply.answer}</p>
                {showPending && t.reply.mode === "match" ? (
                  <p className={s.pendingNote}>Staging: AI model not connected, so this answer was matched from Help Center articles.</p>
                ) : null}
                <SourceList sources={t.reply.sources} />
                <div className={s.feedback}>
                  {t.feedback === "yes" ? (
                    <p className="small">Thanks for letting us know.</p>
                  ) : t.feedback === "no" ? (
                    <p className="small">
                      Sorry about that. <Link href={helpPaths.contact}>Contact our team</Link> or{" "}
                      <Link href={helpPaths.kb}>browse the Knowledge Base</Link>.
                    </p>
                  ) : (
                    <>
                      <span className="small muted">Did this answer your question?</span>
                      <button type="button" className={s.smallBtn} onClick={() => setFeedback(t.id, "yes")}>
                        Yes
                      </button>
                      <button type="button" className={s.textBtn} onClick={() => setFeedback(t.id, "no")}>
                        No, contact us <Icon name="arrow-right" size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : t.error ? (
              <div className={s.answerCard}>
                <p className="body">{t.error}</p>
              </div>
            ) : (
              <div className={`${s.answerCard} ${s.loading}`}>
                <span className={s.dots} aria-label="Finding an answer">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceList({ sources }: { sources: { href: string; question: string }[] }) {
  if (!sources.length) return null;
  return (
    <div className={s.sources}>
      <p className="small muted">From our Help Center</p>
      <ul>
        {sources.map((x) => (
          <li key={x.href}>
            <Icon name="book-open" size={16} />
            <Link href={x.href}>{x.question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
