# SEO Engine Setup Required

The SEO Engine can run in restricted mode without paid SEO APIs. Restricted mode creates reports, content recommendations, approval records, logs, and GitHub Issues when GitHub credentials are available. It does not invent search volume, ranking, traffic, or keyword difficulty.

## Required Configuration

| Purpose | Environment variable | How to get it | Paid? | Without it |
|---|---|---|---|---|
| GitHub automation | `GITHUB_TOKEN` or GitHub Actions `${{ github.token }}` | Built into GitHub Actions, or create a fine-scoped PAT | No | Reports are still saved locally, but Issues/PR comments are skipped |
| Repository context | `GITHUB_REPOSITORY` | Built into GitHub Actions | No | GitHub Issue automation is skipped |
| Website URL | `NEXT_PUBLIC_SITE_URL` | Existing site config | No | Defaults to `https://www.chinafreeweight.com` |

## Optional API Configuration

| Purpose | Environment variable | How to get it | Paid? | Without it |
|---|---|---|---|---|
| SERP data | `SERP_API_PROVIDER`, `SERP_API_KEY` | Approved SERP provider dashboard | Often paid | Ranking domains, SERP features, AI Overview evidence, and keyword movement are unavailable |
| Google Search Console | `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL` | Google Cloud service account with Search Console access | No | Real query, click, impression, and ranking data are unavailable |
| GA4 | `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, `GA4_PRIVATE_KEY` | Google Analytics Data API credentials | No | Landing page engagement and conversion signals are unavailable |
| Vercel | `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID` | Vercel account settings | No | Preview deployment lookup and production deployment checks are unavailable |
| Approved SEO tool | `SEO_TOOL_API_KEY` | Ahrefs, Semrush, DataForSEO, or approved provider | Usually paid | Search volume, keyword difficulty, backlink and traffic estimates remain unavailable |

## Existing Site Environment

Keep the existing website variables:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_WEBHOOK_URL`

## Security Rules

- Do not commit real API keys, cookies, browser profiles, or passwords.
- Store secrets in GitHub Secrets and Vercel Environment Variables.
- Do not bypass captcha, login walls, robots restrictions, or platform limits.
- Mark unavailable data as `Unavailable`, `Estimated`, or `Inferred`.
