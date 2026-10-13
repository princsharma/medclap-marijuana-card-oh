"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { callTimes, usStates } from "@/content/help";
import { showPending } from "@/lib/site";
import s from "./help.module.css";

/** Live chat turns on once a chat provider is connected (NEXT_PUBLIC_CHAT_ENABLED=true + its widget script). */
const chatEnabled = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";
/** Public support line, shown once confirmed. */
const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "";

type Errors = Partial<Record<"name" | "phone" | "state" | "time" | "consent" | "topic", string>>;

export function ContactOptions({ topic, topicTitle }: { topic: string; topicTitle: string }) {
  return (
    <div className={s.options}>
      {chatEnabled || showPending ? <ChatCard topicTitle={topicTitle} /> : null}
      <CallbackCard topic={topic} />
    </div>
  );
}

function ChatCard({ topicTitle }: { topicTitle: string }) {
  const [started, setStarted] = useState(false);
  return (
    <section className={`${s.optCard} ${s.chatCard}`} aria-labelledby="chat-title">
      <span className={s.optIcon}>
        <Icon name="message-square" size={24} />
      </span>
      <h2 id="chat-title" className={s.optTitle}>
        Live chat
      </h2>
      <p className="body">Chat with our team about booking, fees and using the platform. Please don’t share health details in chat.</p>
      {showPending && !chatEnabled ? (
        <p className={s.pendingNote}>Expected wait time: [shown live from the chat system]</p>
      ) : null}
      {started ? (
        <div className={s.chatNotice} role="status">
          {chatEnabled ? (
            <p className="small">Connecting you to the team about “{topicTitle}”…</p>
          ) : (
            <p className="small">
              <strong>Staging:</strong> live chat isn’t connected yet. Once a chat provider is chosen, this button opens the chat window
              with the “{topicTitle}” category attached.
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          className={s.primaryBtn}
          onClick={() => {
            setStarted(true);
            // A connected chat widget is opened here, e.g. window.Intercom?.("show").
            window.dispatchEvent(new CustomEvent("help:start-chat", { detail: { topic: topicTitle } }));
          }}
        >
          Start a chat <Icon name="arrow-right" size={18} />
        </button>
      )}
    </section>
  );
}

function CallbackCard({ topic }: { topic: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "demo" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = {
      topic,
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      state: String(f.get("state") ?? ""),
      time: String(f.get("time") ?? ""),
      consent: f.get("consent") === "on",
      company: String(f.get("company") ?? ""),
    };
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (res.status === 422) {
        setErrors(data.errors ?? {});
        setStatus("idle");
      } else if (!res.ok || !data.ok) {
        setMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else setStatus(data.delivered ? "sent" : "demo");
    } catch {
      setMsg("We couldn’t send your request. Check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`cb-${k}-err`} className={s.fieldError}>
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `cb-${k}-err` } : {});

  return (
    <section className={s.optCard} aria-labelledby="call-title">
      <div className={s.callHead}>
        <span className={s.optIcon}>
          <Icon name="phone" size={22} />
        </span>
        <div>
          <h2 id="call-title" className={s.optTitle}>
            Request a call back
          </h2>
          {supportPhone ? (
            <p className="small">
              Or call us: <a href={`tel:${supportPhone.replace(/[^\d+]/g, "")}`}>{supportPhone}</a>
            </p>
          ) : showPending ? (
            <p className={s.pendingNote}>Or call us: [support phone number]</p>
          ) : null}
        </div>
      </div>

      {status === "sent" ? (
        <div className={s.formDone} role="status">
          <Icon name="check-circle" size={22} />
          <p className="body">Thanks, your request has been received. A member of our team will call you at the time you chose.</p>
        </div>
      ) : status === "demo" ? (
        <div className={s.formDone} role="status">
          <Icon name="check-circle" size={22} />
          <p className="body">
            {showPending ? (
              <>
                <strong>Staging:</strong> the form works, but nothing was sent. Connect a helpdesk or email service
                (CONTACT_WEBHOOK_URL) to receive call-back requests.
              </>
            ) : (
              "We couldn’t send your request online right now. Please try again later."
            )}
          </p>
        </div>
      ) : (
        <form className={s.form} onSubmit={submit} noValidate data-clarity-mask="True">
          <div className={s.field}>
            <label htmlFor="cb-name">Full name</label>
            <input id="cb-name" name="name" autoComplete="name" placeholder="Your name" required {...aria("name")} />
            {err("name")}
          </div>
          <div className={s.field}>
            <label htmlFor="cb-phone">Phone number</label>
            <input id="cb-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 000-0000" required {...aria("phone")} />
            {err("phone")}
          </div>
          <div className={s.field}>
            <label htmlFor="cb-state">State you’re in</label>
            <select id="cb-state" name="state" defaultValue="" required {...aria("state")}>
              <option value="" disabled>
                Select your state
              </option>
              {usStates.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            {err("state")}
          </div>
          <div className={s.field}>
            <label htmlFor="cb-time">Best time to call</label>
            <select id="cb-time" name="time" defaultValue="Weekday afternoon" {...aria("time")}>
              {callTimes.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            {err("time")}
          </div>
          <div className={s.hp} aria-hidden="true">
            <label htmlFor="cb-company">Company</label>
            <input id="cb-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className={s.consent}>
            <input id="cb-consent" name="consent" type="checkbox" {...aria("consent")} />
            <label htmlFor="cb-consent">I agree to be contacted by phone about my question. I won’t include health details.</label>
          </div>
          {err("consent")}
          {err("topic")}
          {status === "error" ? (
            <p className={s.fieldError} role="alert">
              {msg}
            </p>
          ) : null}
          <button type="submit" className={s.secondaryBtn} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request a call"} <Icon name="arrow-right" size={18} />
          </button>
        </form>
      )}
    </section>
  );
}
