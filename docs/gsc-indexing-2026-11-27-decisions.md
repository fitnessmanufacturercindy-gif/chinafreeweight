# GSC indexing fixes 2026-11-27 — owner decisions

## /ar options (from step 2 analysis)

The locale registry enables public Arabic under `/ar`. The repository has 70 Arabic articles and two case studies in the sitemap. It has no published Arabic homepage, products index, or Arabic racks category or product records. Neither GSC export contains an Arabic rack path. There is no verified Arabic rack mapping or same-language products destination to add.

1. **Build a real Arabic homepage.** Add an approved Arabic `home` version in `content/i18n/` and wire it into `multilingual-manifest.ts`. The existing `app/[locale]/[[...segments]]/page.tsx` route and localized metadata can serve it. Update the published switcher/header if the owner wants Arabic in global navigation and add infrastructure tests for routing, hreflang, and publication. Roughly 2–4 files for a localized template page, plus editorial review, around 1–2 engineering days. It would make `/ar` eligible for sitemap and homepage hreflang while preserving the 72 Arabic URLs. An Arabic catalog index would be a separate content deliverable if required.
2. **Temporarily hide Arabic from discovery.** Keep the public route policy so Arabic deep links can still resolve. Apply a shared discovery filter in the sitemap eligibility and metadata alternate builders, and use it in language switchers and repository-backed internal link builders as applicable. Likely changes in `lib/seo/sitemap-eligibility.ts`, `lib/seo/metadata.ts`, `lib/seo/english-alternates.ts`, `app/components/i18n/`, and the infrastructure tests and sitemap guard, roughly 6–9 files and 1 engineering day plus rendered link QA. It would remove 72 URLs from sitemap discovery and omit Arabic hreflang and internal discovery links. Existing indexed URLs could remain indexed while accessible.


## Temporary long-tail blog sitemap proposal

The counts come from the filtered `sitemapEntriesFor("blog")` output. They count individual blog posts and exclude blog index pages. The discovery counts come from diagnosis §4.1, which summarizes the 1,000 exported URLs out of 1,046 total. The two columns describe different snapshots.

| Language | Blog posts in generated sitemap | Discovered, currently not indexed in GSC export | Proposal |
|---|---:|---:|---|
| English (en) | 93 | 47 | Keep |
| Portuguese (pt-BR) | 97 | 57 | Keep |
| Spanish (es) | 97 | 47 | Keep |
| German (de) | 90 | 47 | Keep |
| Polish (pl) | 95 | 67 | Pilot |
| Dutch (nl) | 95 | 66 | Pilot |
| Korean (ko) | 89 | 60 | Pilot |
| Swedish (sv) | 85 | 60 | Pilot |
| Vietnamese (vi) | 85 | 60 | Pilot |
| Italian (it) | 85 | 57 | Consider after the pilot |
| French (fr) | 85 | 51 | Consider after the pilot |
| Indonesian (id) | 95 | 48 | Consider after the pilot |
| Arabic (ar) | 70 | 44 | Consider after the pilot |
| **Total** | **1,161** | **711** | |

Start with long-tail posts in Polish, Dutch, Korean, Swedish, and Vietnamese. These locales account for 313 of the 664 non-English blog URLs in the discovery export. Diagnosis §10 A1 identifies English, Portuguese, Spanish, and German as the priority languages based on existing impressions. Within each pilot locale, intersect the GSC export with the current sitemap, and curate an explicit URL set of posts with no recent impressions or inquiry value. Keep blog indexes and retain commercially important guides, including localized import and sourcing guides. Use the same selection criteria for a second cohort after reviewing changes in GSC.

## Proposed switch

Prepare a reviewed `pilotBlogPaths` set from that intersection. In `lib/seo/sitemap.ts`, apply the following condition within the published-content loop after reading `entity` and `version`, before adding a sitemap entry. Build eligible hreflang clusters from the full published set before applying this submission-only switch. An omitted post is still a valid alternate while its page remains live and indexable.

```ts
const pausedBlogLocales: ReadonlySet<InternalLocale> = new Set(); // Enable with ["pl", "nl", "ko", "sv", "vi"].
if (entity.type === "blog" && pausedBlogLocales.has(version.locale) && pilotBlogPaths.has(version.publicPath)) continue;
```

Enable or roll back the pilot by editing the locale list on one line. The legacy blog sitemap and image sitemap derive their page URLs from the main sitemap and would pick up the same removal. Update the regression guard to accept the exact selected URLs for the pilot. Step 1 leaves all 1,161 posts in the sitemap.
