"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import s from "./help.module.css";

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * "Summarize this article with:" — opens the assistant with a ready-made prompt.
 * Gemini has no prompt-in-URL support, so the prompt is copied and Gemini opens for pasting.
 * Names only (no third-party logos).
 */
export function Summarize({ url, title, source = "Marijuana Card OH Help Center" }: { url: string; title: string; source?: string }) {
  const [note, setNote] = useState("");
  const prompt = `Summarize this article from ${source} in plain language: "${title}" — ${url}`;
  const q = encodeURIComponent(prompt);
  const tools: { name: string; href: string; copyFirst?: boolean }[] = [
    { name: "ChatGPT", href: `https://chatgpt.com/?q=${q}` },
    { name: "Claude", href: `https://claude.ai/new?q=${q}` },
    { name: "Gemini", href: "https://gemini.google.com/app", copyFirst: true },
    { name: "Grok", href: `https://grok.com/?q=${q}` },
    { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
  ];
  return (
    <div className={s.summarize}>
      <p className={s.summarizeLabel} id="summarize-label">
        Summarize this article with:
      </p>
      <ul className={s.aiChips} aria-labelledby="summarize-label">
        {tools.map((t) => (
          <li key={t.name}>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.aiChip}
              onClick={
                t.copyFirst
                  ? async () => {
                      const ok = await copy(prompt);
                      setNote(ok ? "Prompt copied — paste it into Gemini." : "Copy this prompt into Gemini: " + prompt);
                    }
                  : undefined
              }
            >
              <Icon name="sparkle" size={14} />
              {t.name}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={`small ${s.copied}`} role="status">
        {note}
      </p>
    </div>
  );
}

export function Helpful() {
  const [v, setV] = useState<"yes" | "no" | null>(null);
  return (
    <div className={s.helpful}>
      {v ? (
        <p className="body" role="status">
          {v === "yes" ? "Thanks for your feedback." : "Thanks — we’ll use this to improve the article. You can also ask Instant AI Help or contact us below."}
        </p>
      ) : (
        <>
          <p className={s.helpfulQ}>Was this article helpful?</p>
          <button type="button" className={s.smallBtn} onClick={() => setV("yes")}>
            Yes
          </button>
          <button type="button" className={s.smallBtn} onClick={() => setV("no")}>
            No
          </button>
        </>
      )}
    </div>
  );
}

export function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={s.textBtn}
      onClick={async () => {
        if (await copy(url)) {
          setDone(true);
          setTimeout(() => setDone(false), 2500);
        }
      }}
    >
      <Icon name="link" size={16} />
      <span aria-live="polite">{done ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
