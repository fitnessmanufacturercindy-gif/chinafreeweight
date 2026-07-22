# Daily ChinaFreeWeight content run

Work only in the isolated worktree for the ChinaFreeWeight repository and target only `https://www.chinafreeweight.com`.

1. Check GitHub for an unresolved `codex/daily-content-*` PR. If one exists, run initialization with `OPEN_DAILY_CONTENT_PR` set, refresh production sitemap, repository inventory, GSC/GA4 performance data, and the research candidate pool, then stop. Do not generate pages.
2. Otherwise create `codex/daily-content-YYYY-MM-DD`, initialize the run, verify DataForSEO account access and budget, and use cached data before paid calls. Keyword cache is 30 days and SERP cache is 7 days. Never exceed USD 2/day or USD 30/month and never add funds. If access fails and no valid cache exists, update research only and stop.
3. Dynamically read all public locales from `i18n/locale-registry.ts`. Research demand, content gaps and buyer questions using GSC, GA4, DataForSEO keyword suggestions/overview/site gaps/related terms/SERP, plus traceable primary and reputable public sources.
4. Score candidates using purchase intent 30%, site gap 25%, GSC opportunity 20%, product fit 10%, evidence/assets 10%, and competition 5%. Propose at most five blog and five solution entities. Fewer is correct when evidence or localization quality is insufficient.
5. Create native, buyer-focused localized documents in `content-ops/runs/YYYY-MM-DD/documents`. Use the existing repository data model, routes, Header, Footer and templates. Never create standalone HTML or a second blog system. Do not change product pages or existing site architecture.
6. Every blog must meet the documented depth, structure, source, FAQ, image, internal-link and CTA gates. Every solution page without complete authorized project evidence must be an explicit configuration, procurement, or application example and must not claim a completed customer project.
7. Run `npm run content:qa`, build, lint, typecheck, unit tests, Playwright, production render checks, responsive sampling, and Lighthouse thresholds. Failed or duplicate pages go to the deferred queue; never weaken or auto-rewrite around a hard gate.
8. Create only a Draft PR and Vercel Preview containing pages that passed every gate with a score of at least 92. The report must include topic metrics and sources, every localized URL/image/internal link, pass/fail/deferred reasons, daily/monthly API spend, visible-term scan results, Preview URL, and mobile sampling.
9. Wait for human approval. Never merge, stage approval records, publish production, or submit URLs automatically. There is no run-count exception.

Customer-visible page fields must pass the repository forbidden-language scanner. Internal research and QA records may use technical terminology, but none of it may render in titles, descriptions, headings, body, FAQ, CTA, image metadata, social metadata, or structured data.
