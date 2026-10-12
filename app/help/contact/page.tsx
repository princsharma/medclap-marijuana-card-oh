import type { Metadata } from "next";
import Link from "next/link";
import { CrisisNote } from "@/components/help/Answer";
import s from "@/components/help/help.module.css";
import { Icon } from "@/components/ui/Icon";
import { contactTopics, helpPaths } from "@/content/help";

const title = "Contact Us — Help Center | Marijuana Card OH";
const description =
  "Contact Marijuana Card OH about choosing a service, providers and booking, appointments, fees, privacy or website help. Chat with our team or request a call back.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: helpPaths.contact },
  openGraph: { title, description, url: helpPaths.contact },
};

export default function ContactPage() {
  return (
    <div className={`${s.band}`} style={{ paddingBottom: 0 }}>
      <div className={`container ${s.body}`} style={{ paddingTop: 0 }}>
        <div className={s.contactIntro}>
          <h1 className={s.title}>Select a category</h1>
          <p className="lead">
            Choose what your question is about so we can show related answers and the best way to reach us. Our team helps with
            booking, fees and using the platform — not clinical advice.
          </p>
        </div>
        <ul className={s.topicList}>
          {contactTopics.map((t) => (
            <li key={t.id}>
              <Link href={helpPaths.topic(t.id)} className={s.topicRow}>
                <span className={s.topicIcon}>
                  <Icon name={t.icon} />
                </span>
                <span>
                  <span className={s.topicName}>{t.title}</span>
                  <span className={s.topicDesc}>{t.description}</span>
                </span>
                <Icon name="arrow-right" size={18} />
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.gapTop} style={{ maxWidth: 720 }}>
          <CrisisNote />
        </div>
      </div>
    </div>
  );
}
