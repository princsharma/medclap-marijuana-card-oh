import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Answer, CrisisNote } from "@/components/help/Answer";
import { CopyLink, Helpful, Summarize } from "@/components/help/ArticleTools";
import { KbBand } from "@/components/help/KbBand";
import s from "@/components/help/help.module.css";
import { Breadcrumb } from "@/components/sections/ServiceSections";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { articles, getArticle, getCategory, helpPaths, related } from "@/content/help";
import { breadcrumbLd, ldScript } from "@/lib/helpJsonLd";
import { siteName, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

const desc = (t: string) => (t.length > 158 ? `${t.slice(0, 155).replace(/\s+\S*$/, "")}…` : t);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  // Keep titles within ~60 characters: add the brand only when it fits.
  const title = a.question.length <= 40 ? `${a.question} | ${siteName}` : a.question;
  const url = helpPaths.article(a.slug);
  return {
    title: { absolute: title },
    description: desc(a.text),
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: desc(a.text), url, modifiedTime: a.updated },
  };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const cat = getCategory(a.category)!;
  const url = `${siteUrl}${helpPaths.article(a.slug)}`;
  const crumbs = [
    { label: "Help Center", href: helpPaths.ai },
    { label: "Knowledge Base", href: helpPaths.kb },
    { label: cat.title, href: helpPaths.category(cat.id) },
    { label: a.question, href: helpPaths.article(a.slug) },
  ];
  const rel = related(a);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript([
          breadcrumbLd(crumbs),
          {
            "@type": "Article",
            headline: a.question,
            description: desc(a.text),
            articleSection: cat.title,
            dateModified: a.updated,
            url,
            mainEntityOfPage: url,
            publisher: { "@type": "Organization", name: siteName, url: siteUrl },
          },
        ])}
      />
      <KbBand slim>
        <p className={s.kbHeadingSmall}>Knowledge Base</p>
      </KbBand>

      <div className={`container ${s.body}`}>
        <article className={s.article} aria-labelledby="article-title">
          <Breadcrumb items={crumbs} />
          <h1 id="article-title" className={s.articleTitle}>
            {a.question}
          </h1>
          <div className={s.meta}>
            <Summarize url={url} title={a.question} />
            <p className={s.updated}>
              Last updated <time dateTime={a.updated}>{fmtDate(a.updated)}</time> · {a.readMinutes} min read
            </p>
          </div>

          <Answer lines={a.answer} />

          {a.callout ? (
            <div className={s.callout} role="note">
              <Icon name="shield-check" />
              <p className="body">
                <strong>Important:</strong> {a.callout}
              </p>
            </div>
          ) : null}

          <Helpful />

          <div className={s.share}>
            <p className={s.shareLabel}>Share this article</p>
            <CopyLink url={url} />
          </div>

          {rel.length ? (
            <section className={s.panel} aria-labelledby="related-title">
              <h2 id="related-title" className={s.panelTitle}>
                Related articles
              </h2>
              <ul className={s.linkList}>
                {rel.map((r) => (
                  <li key={r.slug}>
                    <Icon name="book-open" size={16} />
                    <Link href={helpPaths.article(r.slug)}>{r.question}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className={s.stillHelp}>
            <div>
              <p className={s.panelTitle}>Still need help?</p>
              <p className="small muted">Ask Instant AI Help or contact our team.</p>
            </div>
            <div className={s.stillBtns}>
              <Button href={helpPaths.ai} arrow>
                Ask Instant AI Help
              </Button>
              <Button href={helpPaths.contact} variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>

          <CrisisNote />
        </article>
      </div>
    </>
  );
}
