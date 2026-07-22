# ChinaFreeWeight daily multilingual content operations

This directory stores research evidence, cost/cache state, daily run documents, deferred candidates, and the human-approved publication catalog for `https://www.chinafreeweight.com`.

The workflow reads public locales from `i18n/locale-registry.ts`. It never hardcodes the locale count. A run may propose at most five blog themes and five solution themes, localized only where the evidence and language quality gates pass.

## Commands

- `npm run content:init` creates the Beijing-date run directory. Set `OPEN_DAILY_CONTENT_PR`, `OPEN_DAILY_CONTENT_BRANCH`, and `OPEN_DAILY_CONTENT_DOCUMENT_COUNT` together only when an unresolved dated content-review PR actually contains complete generated documents; framework and tooling PRs do not count.
- `npm run content:inventory` snapshots the production sitemap and the current repository content index for gap and duplicate checks.
- `npm run content:analytics` snapshots configured GSC and GA4 exports into the run evidence directory.
- `npm run content:research` executes budgeted, cached DataForSEO research requests prepared for the run.
- `npm run content:qa` validates every run document and writes `qa-report.json`.
- `CONTENT_RUN_DATE=YYYY-MM-DD npm run content:stage` imports only explicitly human-approved, fully passing documents into the site catalog.
- `npm run content:test` runs the automation unit tests.

Each fresh run must generate complete pages before it requests review; research cards, outlines and briefs are not article drafts. The scheduled task creates a Draft PR and Vercel Preview, then waits for explicit human approval. Once approval is recorded, it stages the approved documents, merges through the normal repository flow, waits for production deployment and verifies the live URLs. It must never stage or deploy unapproved documents, add budget, or modify product page structure.

## Review and release lifecycle

1. Research and score candidate topics.
2. Generate complete localized pages and run every hard gate.
3. Open one dated Draft PR with a production-style Preview for the passing pages.
4. Keep that PR updated while it waits for review; do not open a second daily batch.
5. Treat only a GitHub approved review or the repository-owner `content-approved` label as durable approval.
6. After approval, recheck, stage, merge, deploy and verify HTTP status plus sitemap inclusion.
