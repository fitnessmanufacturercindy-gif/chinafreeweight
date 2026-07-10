# Site Health Check Guide

This project has a daily browser-based health check for chinafreeweight.com. It is designed to protect uptime, indexing, conversion paths, SEO/GEO/AI-search readiness, and multilingual quality without directly changing `main`.

## What It Checks

- URLs from `sitemap.xml`, with fallback discovery from app routes and internal links.
- Homepage, product category pages, product detail pages, resources, projects, factory, contact, navigation, footer, and internal links.
- HTTP status, redirect chains, blank pages, visible content, console errors, failed images, broken links, mobile layout overflow, desktop/mobile navigation, contact form input/submit behavior, WhatsApp/email/phone/CTA links.
- `sitemap.xml`, `robots.txt`, canonical, `noindex`, title, meta description, H1, JSON-LD schema, and minor-language pages when language-prefixed URLs exist.
- Load time signals that are obviously abnormal.

## Manual Commands

Run these after starting the site locally:

```bash
npm run site:health
npm run test:site-health
```

Run safe auto-fix handling:

```bash
npm run site:fix-safe
```

The safe-fix command only works from a clean Git working tree. It skips changes when the tree is dirty, so existing human work is not mixed into an automated branch.

## Reports

Each run writes:

```text
reports/daily-site-health/YYYY-MM-DD-site-health-report.md
reports/daily-site-health/YYYY-MM-DD-site-health-report.json
```

The report includes checked URL totals, normal and abnormal pages, severity counts, 404/500 pages, broken images, broken internal links, multilingual issues, SEO issues, schema issues, form/button/navigation issues, auto-fix candidates, PR status, human-review items, and next recommendations.

## Daily GitHub Action

The workflow lives at:

```text
.github/workflows/daily-site-health.yml
```

It runs every day at 13:00 China time, which is `05:00 UTC`, and also supports manual `workflow_dispatch`.

The workflow:

1. Installs dependencies.
2. Builds the Next.js project.
3. Starts the production preview server.
4. Runs the full browser health check.
5. Runs the Playwright pass/fail assertion.
6. Uploads Markdown and JSON reports as artifacts.
7. Creates a GitHub Issue when Critical or High issues exist.
8. Creates a safe-fix branch and Pull Request only when a narrow, safe source-level fix can be applied.

## Auto-Fix Guardrails

Allowed automatic fixes stay narrow, such as missing image alt text or clearly safe static asset/link issues when the source location is unambiguous.

The system does not automatically rewrite product core information, prices, models, brand names, contact details, SEO titles at scale, H1s at scale, canonical/hreflang structures, full minor-language pages, page design structure, indexed URLs, or live business logic.

All automated source changes must go through a separate branch and Pull Request. Nothing is merged into `main` automatically.
