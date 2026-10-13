# Content system — Marijuana Card OH

Step 10 of the build. Writers and AI reviewers read this file before every page. Facts live in `brand/site.ts`; keywords in `brand/keyword-map.csv`. Approved source documents: Compliance Scope, Positioning, Keyword Map & Sitemap (Claude Docs, 12–13 Oct 2026).

## 1. Page templates

Figma holds one design per template (desktop 1440, tablet 768, mobile 390), not one per page. Every page uses one template.

| Template | Used by | Required sections, in order |
| --- | --- | --- |
| Home | `/` | Hero (tagline, price line, 2 buttons, review byline) · How it works (3 steps) · Doctors · Pricing cards · Conditions teaser · Registry/renewal teasers · FAQ (5) · Important information |
| Core | how-it-works, pricing, renewals, eligibility, book | Badge + H1 + 2-sentence answer · body sections · FAQ (3–6) · CTA · Important information |
| Guide | 4 guides, registry guide | H1 + direct answer in first 2 sentences · "Last reviewed" + author + reviewer · sections · Sources list · Important information |
| Condition | 21 condition pages | H1 "Medical marijuana for [condition] in Ohio" · Is it a qualifying condition (statute wording) · What the evidence says (cited) · What records help · FAQ · Sources · Important information (+ crisis note for PTSD, pain) |
| City | 6 city pages + hub | H1 · ≥5 dated local facts (see Keyword Map doc) · How telehealth works from here · local FAQ · Sources · Important information |
| Doctor | doctors hub + 2 profiles | Name, credential, role · Ohio license/CTR + NPI + eLicense link · education (source record only) · pages reviewed |
| Legal | refund, privacy, notice of privacy practices, terms, telehealth consent, contact | Plain-language summary first, then the full text. Dated. |

Every page: one H1, meta title ≤ 60 characters with the main keyword, meta description ≤ 155 characters, canonical URL, breadcrumb, JSON-LD (see §6).

## 2. Voice (from Positioning)

- Calm, plain, exact. 7th–8th grade reading level. Short sentences.
- No em dashes (—) anywhere on the site. Use a comma, colon, full stop or brackets instead. En dashes in ranges (6–12 months) are fine.
- Say: medical marijuana, recommendation, evaluation, visit, registry card, "if you qualify", "your physician".
- Don't say: prescription, script, approval (say "recommendation"), guaranteed approval, risk-free, weed/pot (except to match a search phrase in a title, H2 or FAQ question).
- Name the doctor when we can. Use Ohio's terms: Division of Cannabis Control, State Medical Board of Ohio, Certificate to Recommend.

## 3. Sourcing policy

- Primary sources only for facts: Ohio Revised Code and Administrative Code (codes.ohio.gov), Division of Cannabis Control (com.ohio.gov), State Medical Board of Ohio (med.ohio.gov), federal agencies (NIH, NCCIH, CDC, FDA, FTC, HHS), peer-reviewed research and National Academies reports.
- Never cite competitors, card-mill guides, dispensary blogs or AI-generated pages.
- Each source is logged with URL and the date checked, and listed at the end of the page.
- Medical evidence is described with its limits ("limited evidence", "moderate evidence") in line with the source's own wording.

## 4. Claims policy (from the approved Compliance Scope)

Fails review if a page:
- Promises approval, an approval rate, or a card "in minutes", or says when the state issues the card.
- Mentions the guarantee without "if you don't qualify" and a link to /refund-policy.
- Calls marijuana a cure or a treatment that works, gives dosing advice, or compares it as safer than medication.
- Promotes products, strains, dispensaries or deals; names competitors.
- Shows patient counts, review counts, ratings or media logos we cannot prove.
- Says "HIPAA certified", or shows the HIPAA line before vendor BAAs are signed.
- States facts about other states or federal legality beyond "remains federally controlled".
- Adds credentials, certifications or years not on the source record in `brand/site.ts`.

## 5. Authors and review

- **Author:** Carrie L. Gessler, RN, MSN, ANP-BC (all guides, condition and city pages). Drafts are AI-written; her byline appears **only after she has read, edited and approved the page**, recorded with a date in `brand/page-status.json`. Until then the page has no author byline.
- **Medical reviewer:** Dr. Johnathan Miller, MD, Medical Director. The byline "Medically reviewed by … · Last reviewed [date]" appears **only after he has reviewed that page**, with the date he did. Until then the page shows no review byline and stays on staging.
- **Legal reviewer:** the AI legal and compliance reviewer; Prince approves.

Review chain per page (step 12): AI SEO / AI search / conversion / expertise review → AI medical accuracy review → AI legal review → one summary to Prince → Dr. Miller signs off regulated pages → page status "Ready to publish".

## 6. Structured data

- Site: `MedicalOrganization` (name, url, areaServed: Ohio, email). No address markup (telehealth only, no public office).
- Doctor pages: `Physician` with `identifier` (NPI), `medicalSpecialty` only where on record.
- Guides and condition pages: `MedicalWebPage` with `author`, `reviewedBy`, `lastReviewed` (only once reviewed).
- FAQ blocks: `FAQPage`. Breadcrumbs: `BreadcrumbList`.
- Pricing: `Offer` price 149 / 129 USD.

## 7. Page status

Tracked in `brand/page-status.json`: `planned → drafted → ai-reviewed → prince-approved → medically-reviewed → ready → live`. Nothing goes live while the site is noindex; go-live is step 19.

## 8. Re-review

Medical and legal pages are re-checked every 6–12 months, and immediately when Ohio law changes (step 27). "Last reviewed" dates update only after a real review.

## 9. Images and video (Prince, 13 Oct 2026)

**Where images go**
- Blog posts: where an image helps understanding (a step, a comparison, a scene), not as decoration on every paragraph.
- Brand pages: home, about, doctors, locations hub.
- Product pages: how it works, pricing, renewals, get started.
- Card imagery is on-brand: we sell evaluations for a card, so cards are a good visual subject.

**Rules**
- Card images use our own design (Marijuana Card OH colors, Four-Leaf Cross, "sample" text). Never copy or imitate the official Ohio registry card, the state seal, state logos, or real names and numbers.
- No AI-generated person is ever presented as our physician or a real patient. Real doctors appear only from real photos or video, with their consent. No AI avatars or voice clones of real people.
- No smoking, vaping or consumption scenes (Ohio bans smoking medical marijuana), no minors, no dispensary or product brand names or logos, no cure or approval claims in on-screen text.
- Story videos and lifestyle scenes are dramatizations: label them "Dramatization. Actors are AI-generated." in the caption or end card.
- Every image: descriptive alt text, served through next/image (AVIF/WebP), sized for its slot. Every video: captions, a poster image, no autoplay with sound, loads only when played.
- Tools: Higgsfield (video, image), Magnific (image, upscale, voiceover, video edits). Keep generated originals in the brand folder of each tool.
