# Site factory

This repo is the **source site** for the network: the latest proven build (marijuanacardoh.com, launched 14 Oct 2026).
A new site starts as a copy of its engine, then every word, fact, image and design token is rebuilt for its own
location from primary-source research. The `site-factory` skill runs the whole process; this file is its map.

## The rule that protects the network

Google treats many near-identical sites aimed at different places as **doorways** (spam policy) and mass-produced
pages as **scaled content abuse**. Every site must therefore stand on its own:

| Guard | Enforced by |
|---|---|
| Own research: law, fees, registry steps, local rules, each fact dated with its primary source | Research gates in the skill (min. facts per page type) |
| Only physicians licensed in this state, verified on the state board site | Intake check, blocks the build |
| No shared text with any sibling (≤15% per page, ≤5% site-wide, 8-word shingles) | `npm run qa:unique` against `qa/siblings/*` |
| No leftovers from the source brand | `factory/forbidden-terms.txt` + `npm run qa:audit` |
| Own identity: name, logo, palette, type, voice, image style | Identity step, owner picks 1 of 3 |
| No links between network sites, no shared GTM container | Skill rule |

## Engine vs per-site

**Engine (keep, improve once, every site benefits):** `components/**` logic, `lib/**`, `scripts/**`, `app/api/**`,
`app/layout.tsx`, `next.config.ts`, `vercel.json`, Help Center, blog, exit intent, infographics, reviews, analytics
guard, schema graph, IndexNow, llms.txt generator, QA suite.

**Per site (always rebuilt):** `brand/**` (facts, legal, conditions, registry, tokens, images, media, content system,
keyword map, page status), `content/**`, all page copy in `app/**/page.tsx`, `public/**` assets, logo and icons.
`factory/REWRITE.md` (made by `new_site.py`) lists every file and line that still carries source text.

Location-dependent features are decided by research, not copied:
dispensary locator only if the state publishes a dataset; city pages only where ≥5 dated government facts exist
(≥3 city-specific); condition pages follow the state's own qualifying-condition list.

## Commands

| Step | Command |
|---|---|
| Start a site | `python3 factory/new_site.py --to ../<repo> --domain <domain> --keep "<shared doctor surnames>"` |
| Design tokens → CSS | `npm run tokens` |
| Full QA (build, audit, schema, screenshots, tracking guard) | `npm run qa` |
| Leftover/placeholder/SEO audit only | `npm run qa:audit` |
| schema.org validation | `npm run qa:schema` |
| Uniqueness vs siblings | `npm run build && python3 scripts/qa/uniqueness.py --start --against qa/siblings/<file>.json.gz …` |
| Save this site's fingerprint (after every content change) | `python3 scripts/qa/uniqueness.py --start --export qa/fingerprint.json.gz` |
| Infographic PNGs + checklist PDF | `node scripts/export-infographics.mjs` |
| Resubmit all pages to IndexNow | `GET /api/indexnow?mode=all&token=$INDEXNOW_TOKEN` |

## Environment variables (production only unless noted)

`NEXT_PUBLIC_SITE_ENV=production`, `ALLOW_INDEXING=true`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID`,
`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `CRON_SECRET`, `INDEXNOW_TOKEN` (new key file per site),
`EHR_WEBHOOK_URL` + `EHR_WEBHOOK_SECRET`, `CONTACT_WEBHOOK_URL`, `LEADS_WEBHOOK_URL` + `LEADS_WEBHOOK_SECRET`.
`NEXT_PUBLIC_*` values are baked in at build time: redeploy after changing them.

## Lessons carried forward (from the 54-step build record)

- Verify clinicians: practice profile → state board → NPI (identity only). NPI often omits second-state licenses.
- Read current statute text with its effective date; agency FAQs and remembered law go stale (SB 56 rewrote Ohio's law in 2026).
- State sites often block bots: try the parent agency domain, then the built-in browser, then ask the owner.
- Use Semrush for keywords and SERPs from the start; plain web search misleads.
- Never write or carry over reviews; never put a person's name on AI text until they approve it; never fake urgency.
- Guarantee wording always carries its condition. HIPAA claims only after BAAs are signed.
- Forms fail closed in production when their webhook is unset. Tracking never runs on health, booking or condition pages.
- Telehealth-only brands risk Google Business Profile suspension; record the owner's decision.
- QA scripts start and stop their own server; a stale server once served old CSS.
- Gate media slots on data presence; real recordings only for real people.
