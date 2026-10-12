import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrisisNote } from "@/components/help/Answer";
import { ContactOptions } from "@/components/help/ContactOptions";
import s from "@/components/help/help.module.css";
import { Breadcrumb } from "@/components/sections/ServiceSections";
import { Icon } from "@/components/ui/Icon";
import { contactTopics, getArticle, getTopic, helpPaths } from "@/content/help";

export const dynamicParams = false;
export const generateStaticParams = () => contactTopics.map((t) => ({ topic: t.id }));

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTopic((await params).topic);
  if (!t) return {};
  return {
    title: { absolute: `${t.title}: Contact Us | Marijuana Card OH` },
    description: t.description,
    alternates: { canonical: helpPaths.topic(t.id) },
    // Step pages of the contact flow are not search landing pages.
    robots: { index: false, follow: true },
  };
}

export default async function ContactTopicPage({ params }: Props) {
  const t = getTopic((await params).topic);
  if (!t) notFound();
  const suggested = t.suggested.map(getArticle).filter((a) => !!a);
  return (
    <div className={s.band} style={{ paddingBottom: 0 }}>
      <div className={`container ${s.body}`} style={{ paddingTop: 0 }}>
        <Breadcrumb
          items={[
            { label: "Contact Us", href: helpPaths.contact },
            { label: t.title, href: helpPaths.topic(t.id) },
          ]}
        />
        <h1 className={s.title} style={{ marginBlock: "12px 24px" }}>
          {t.title}
        </h1>

        <section className={s.panel} aria-labelledby="suggested-title">
          <h2 id="suggested-title" className={s.panelTitle}>
            These articles may answer your question
          </h2>
          <ul className={s.linkList}>
            {suggested.map((a) => (
              <li key={a.slug}>
                <Icon name="book-open" size={16} />
                <Link href={helpPaths.article(a.slug)}>{a.question}</Link>
              </li>
            ))}
          </ul>
        </section>

        <h2 className={s.reach}>Still need help? Choose how to reach us</h2>
        <ContactOptions topic={t.id} topicTitle={t.title} />
        <div className={s.gapTop} style={{ maxWidth: 720 }}>
          <CrisisNote />
        </div>
      </div>
    </div>
  );
}
