# ChinaFreeWeight AI SEO Competitive Intelligence & Content Expansion Engine

This module runs a guarded B2B SEO workflow for `www.chinafreeweight.com`. It discovers keyword opportunities, records competitor intelligence, produces daily/weekly/monthly reports, creates GitHub Issues for approval, and only generates drafts or prepares PR work after explicit approval states.

## How To Run

```bash
npm run seo:daily
npm run seo:weekly
npm run seo:monthly
npm run seo:draft
npm run seo:commit
npm run seo:publish
```

## First Setup

1. Review `seo-engine/config/engine.config.json`.
2. Add required GitHub and optional SEO API variables from `SETUP_REQUIRED.md`.
3. Add GitHub Secrets for any real API keys.
4. Run `npm run seo:daily` locally.
5. Check `seo-engine/reports/daily/<date>/`.

## Approval States

Allowed states:

- `discovered`
- `recommended`
- `approved_for_draft`
- `draft_generated`
- `approved_for_commit`
- `pull_request_created`
- `approved_for_publish`
- `published`
- `rejected`

GitHub Issue labels are the primary approval mechanism:

- `seo-recommended`
- `approved-for-draft`
- `draft-generated`
- `approved-for-commit`
- `pull-request-created`
- `approved-for-publish`
- `hold`
- `rejected`
- `published`
- `failed`

Without approval, the engine stops after reporting and recommendations.

## Reports

Reports are saved as JSON and Markdown:

- Daily: `seo-engine/reports/daily/<date>/`
- Weekly: `seo-engine/reports/weekly/<date>/`
- Monthly: `seo-engine/reports/monthly/<date>/`

Every report includes execution start time, end time, timezone, successful items, failed items, skipped items, competitor evidence limits, and data gaps.

## Draft Generation

Draft briefs are generated only for items marked `approved_for_draft` in `seo-engine/data/approval-statuses.json` or a future synced GitHub Issue approval source.

Generated briefs are saved in:

```text
seo-engine/drafts/
```

Drafts do not automatically enter the website.

## Commit And PR Guardrail

`npm run seo:commit` only prepares a manifest unless an item is explicitly marked `approved_for_commit`. Website writes, branch creation, commit, push, and PR creation must pass project validation first:

```bash
npm run typecheck
npm run build
```

The engine never merges to production by default.

## Publishing Guardrail

`npm run seo:publish` does nothing unless `SEO_ENGINE_AUTO_PUBLISH=true` is set and the content has explicit approval. The recommended production path is still manual PR review and merge by an administrator.

## Pause Or Resume Scheduled Tasks

Pause by disabling the SEO Engine GitHub Actions workflows in GitHub or by commenting out the `schedule` block. Resume by re-enabling the workflow.

## Failure Handling

Failures are written to:

```text
seo-engine/logs/
```

The engine stops dangerous operations after missing approvals, failed validation, unavailable credentials, or failed publish checks.
