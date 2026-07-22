# ChinaFreeWeight daily multilingual content operations

This directory stores research evidence, cost/cache state, daily run documents, deferred candidates, and the human-approved publication catalog for `https://www.chinafreeweight.com`.

The workflow reads public locales from `i18n/locale-registry.ts`. It never hardcodes the locale count. A run may propose at most five blog themes and five solution themes, localized only where the evidence and language quality gates pass.

## Commands

- `npm run content:init` creates the Beijing-date run directory. Set `OPEN_DAILY_CONTENT_PR` when a previous daily PR is still unresolved; the manifest switches to research-only mode.
- `npm run content:inventory` snapshots the production sitemap and the current repository content index for gap and duplicate checks.
- `npm run content:analytics` snapshots configured GSC and GA4 exports into the run evidence directory.
- `npm run content:research` executes budgeted, cached DataForSEO research requests prepared for the run.
- `npm run content:qa` validates every run document and writes `qa-report.json`.
- `CONTENT_RUN_DATE=YYYY-MM-DD npm run content:stage` imports only explicitly human-approved, fully passing documents into the site catalog.
- `npm run content:test` runs the automation unit tests.

The scheduled task may create only a Draft PR and a Vercel Preview. It must never merge, stage unapproved documents, deploy production, add budget, or modify product page structure.
