# Workspace Audit Backup — 2026-09-07

This document records the pre-cleanup workspace state. It is an internal Git recovery record and is not imported or rendered by the website.

## Recovery baseline

- Original branch: `codex/fix-ga-head-loader`
- Original HEAD: `a11664d09cf931949408b5d58bab824d7f235f72`
- Origin main: `199c0e9fb17f205dbe3a1342e5da17973996ed1a`
- Merge base: `b0ce514a36b80ea0ad22a2620cdef5a177575f0b`
- Archive branch: `archive/pre-workspace-cleanup-2026-09-07`
- Status entries: 94 modified, 3 deleted, 104 untracked
- Expanded untracked files: approximately 948
- Files at least 50 MB outside ignored build/dependency directories: none

## Audit classification

### Confirmed online but incompletely tracked in Git

- OEM page and its RFQ form, imagery, and Free Sample CTA
- Compact Chrome Dumbbell Case
- Ten multilingual buyer guides and their WebP/AVIF assets
- Commercial Growth Blogs
- Arabic locale publication
- Shared schema, sitemap/lastmod, homepage, Factory, Products, Header/MegaMenu, GA and image-delivery changes

### Complete but not online

- Custom Logo Fitness Chain Case: 13 localized URLs, five real customer images in WebP/AVIF, project listing, CTA, metadata, hreflang and schema integration

### Valuable incomplete/supporting material

- Shipping imagery
- Mixed-weight MOQ research
- Guide research and audit/verify scripts
- Quality-gate and search-engine submission tooling
- B2B keyword workbook and lessons learned
- B2B lead report
- Source/customer project images in `.codex_work`

### Confirmed temporary material

- Homepage/OEM/local preview PNG files
- Temporary screenshots, duplicate QA captures, stdout/stderr logs and PID files
- Unreferenced deferred GA and hero-video experiments

## Exact pre-archive Git status

```text
 M .learnings/ERRORS.md
 M .vercelignore
 M app/(en)/factory/page.tsx
 M app/(en)/layout.tsx
 M app/(en)/manufacturer/weight-plate-manufacturer/page.tsx
 M app/(en)/page.tsx
 M app/(en)/products/dumbbells/page.tsx
 M app/(en)/products/gym-accessories/[slug]/page.tsx
 M app/(en)/products/gym-accessories/page.tsx
 M app/(en)/products/page.tsx
 D app/(en)/products/racks-benches/[slug]/page.tsx
 D app/(en)/products/racks-benches/page.tsx
 M app/(en)/products/weight-plates/[slug]/page.tsx
 M app/(en)/products/weight-plates/page.tsx
 M app/(en)/projects/page.tsx
 M app/(en)/resources/[slug]/page.tsx
 M app/(en)/resources/page.tsx
 M app/components/DeferredHeroVideo.tsx
 M app/components/LazyHeroVideo.tsx
 M app/components/MegaMenu.tsx
 M app/components/RootDocument.tsx
 M app/components/SiteHeader.tsx
 M app/components/i18n/IndonesianMirrorPage.module.css
 M app/components/i18n/IndonesianMirrorPage.tsx
 M app/components/i18n/LocalizedPageTemplate.tsx
 M app/components/i18n/LocalizedSiteHeader.tsx
 M app/components/i18n/RouteLanguageSwitcherClient.tsx
 M app/globals.css
 M app/products/dumbbells/productData.ts
 D app/products/racks-benches/productData.ts
 M app/resources/blogData.ts
 M app/robots.ts
 M app/seo-data.ts
 M app/site.ts
 M app/sitemap.ts
 M app/sitemaps/blogs.xml/route.ts
 M app/sitemaps/products.xml/route.ts
 M app/sitemaps/sitemap-utils.ts
 M build_b2b_freeweight_keyword_workbook.mjs
 M content/i18n/commercial-completion-a.ts
 M content/i18n/commercial-completion-bc.ts
 M content/i18n/commercial-completion-c.ts
 M content/i18n/dutch-manifest.ts
 M content/i18n/french-core-pages.ts
 M content/i18n/french-guides.ts
 M content/i18n/french-products.ts
 M content/i18n/german-core-pages.ts
 M content/i18n/german-guides.ts
 M content/i18n/german-products.ts
 M content/i18n/indonesian-manifest.ts
 M content/i18n/italian-manifest.ts
 M content/i18n/korean-manifest.ts
 M content/i18n/multilingual-manifest.ts
 M content/i18n/polish-manifest.ts
 M content/i18n/product-localization-batch-1-es.ts
 M content/i18n/pt-br-commercial-pages.ts
 M content/i18n/pt-br-existing-growth.ts
 M content/i18n/pt-br-growth-blogs-a.ts
 M content/i18n/pt-br-growth-blogs-b.ts
 M content/i18n/pt-br-pilot.ts
 M content/i18n/seo-expansion-es.ts
 M content/i18n/seo-expansion-pt.ts
 M content/i18n/spanish-blog-intent-sections.ts
 M content/i18n/spanish-blogs-a.ts
 M content/i18n/spanish-blogs-b.ts
 M content/i18n/spanish-pages.ts
 M content/i18n/swedish-core-pages.ts
 M content/i18n/swedish-guides.ts
 M content/i18n/swedish-products.ts
 M content/i18n/vietnamese-core-pages.ts
 M content/i18n/vietnamese-guides.ts
 M content/i18n/vietnamese-products.ts
 M content/manufacturer/rubber-hex-dumbbells-manufacturer.md
 M content/multilingual-blogs/en/free-weight-reorder-batch-consistency.md
 M content/multilingual-blogs/en/oem-free-weight-sample-approval-process.md
 M content/multilingual-blogs/es/aprobar-muestra-oem-peso-libre.md
 M content/multilingual-blogs/es/consistencia-lotes-peso-libre.md
 M content/multilingual-blogs/pt-BR/aprovar-amostra-oem-pesos-livres.md
 M content/multilingual-blogs/pt-BR/reposicao-pesos-livres-padrao-lotes.md
 M content/resources/why-is-it-called-a-dumbbell.md
 M eslint.config.mjs
 M i18n/locale-registry.ts
 M lib/seo/schema.ts
 M next.config.mjs
 M package.json
 M public/assets/case-showroom.avif
 M public/assets/hero-poster-mobile.avif
 M public/assets/hero-poster-mobile.webp
 M public/assets/homepage-concept.webp
 M public/assets/products/racks-benches/compact-cable-power-rack.webp
 M public/assets/projects/commercial-dumbbell-rack-zone.avif
 M scripts/audit-multilingual-blog-expansion.ts
 M scripts/quality-gate.mjs
 M scripts/site-health-check.js
 M scripts/submit-search-engines.mjs
 M tests/i18n/commercial-completion-c-browser-smoke.ts
 M tests/i18n/infrastructure.test.ts
?? .artifacts/
?? .codex_work/
?? app/(en)/oem/OemInquiryForm.tsx
?? app/(en)/oem/OemPage.module.css
?? app/(en)/oem/page.tsx
?? app/(en)/projects/compact-chrome-dumbbell-set/
?? app/(en)/projects/custom-logo-dumbbells-weight-plates-fitness-chain/
?? app/components/DeferredGoogleAnalytics.tsx
?? app/components/FreeSampleCTA.tsx
?? content/i18n/barbell-finish-guide-copy-apac.json
?? content/i18n/barbell-finish-guide-copy-eu.json
?? content/i18n/barbell-finish-guide-copy.json
?? content/i18n/barbell-finish-guide.ts
?? content/i18n/barbell-knurling-guide-copy-apac.json
?? content/i18n/barbell-knurling-guide-copy-eu.json
?? content/i18n/barbell-knurling-guide-copy.json
?? content/i18n/barbell-knurling-guide.ts
?? content/i18n/cable-attachment-compatibility-guide.ts
?? content/i18n/commercial-growth-blogs.ts
?? content/i18n/commercial-olympic-barbell-guide.ts
?? content/i18n/compact-chrome-dumbbell-case-expansions.ts
?? content/i18n/compact-chrome-dumbbell-case.ts
?? content/i18n/custom-logo-fitness-chain-case.ts
?? content/i18n/dumbbell-head-retention-copy.json
?? content/i18n/dumbbell-head-retention-guide.ts
?? content/i18n/fixed-vs-adjustable-dumbbells-copy.json
?? content/i18n/fixed-vs-adjustable-dumbbells-guide.ts
?? content/i18n/kg-lb-free-weight-units-copy.json
?? content/i18n/kg-lb-free-weight-units-guide.ts
?? content/i18n/plate-bar-fit-guide-copy-apac.json
?? content/i18n/plate-bar-fit-guide-copy-eu.json
?? content/i18n/plate-bar-fit-guide-copy.json
?? content/i18n/plate-bar-fit-guide.ts
?? content/i18n/steel-dumbbell-oem-blog.ts
?? content/i18n/weight-plate-tolerance-guide.ts
?? docs/research/barbell-finish-buyer-research-2026-09-05.md
?? docs/research/barbell-knurling-buyer-research-2026-09-07.md
?? docs/research/cable-attachment-buyer-research-2026-08-29.md
?? docs/research/commercial-olympic-barbell-buyer-research-2026-09-01.md
?? docs/research/compact-chrome-dumbbell-case-research-2026-07-27.md
?? docs/research/dumbbell-head-retention-buyer-research-2026-09-02.md
?? docs/research/fixed-vs-adjustable-dumbbells-buyer-research-2026-09-04.md
?? docs/research/kg-lb-free-weight-buyer-research-2026-09-03.md
?? docs/research/olympic-plate-bar-fit-buyer-research-2026-09-06.md
?? docs/research/weight-plate-tolerance-buyer-research-2026-08-31.md
?? homepage-exhibition-buyer-module-desktop.png
?? homepage-exhibition-buyer-module-mobile.png
?? homepage-exhibition-buyer-module.png
?? homepage-local-preview-desktop.png
?? homepage-local-preview-mobile.png
?? homepage-preview-1440x2400.png
?? homepage-product-menu-preview.png
?? oem-local-preview-desktop.png
?? oem-local-preview-mobile.png
?? public/assets/oem/
?? public/assets/projects/compact-chrome-dumbbell-set-detail.avif
?? public/assets/projects/compact-chrome-dumbbell-set-detail.webp
?? public/assets/projects/compact-chrome-dumbbell-set.avif
?? public/assets/projects/compact-chrome-dumbbell-set.webp
?? public/assets/projects/custom-logo-fitness-chain/
?? public/assets/resources/barbell-finishes/
?? public/assets/resources/barbell-knurling/
?? public/assets/resources/cable-attachments/
?? public/assets/resources/dumbbell-head-retention/
?? public/assets/resources/fixed-vs-adjustable-dumbbells/
?? public/assets/resources/kg-lb-units/
?? public/assets/resources/olympic-barbell-buying/
?? public/assets/resources/plate-bar-fit/
?? public/assets/resources/steel-dumbbells/
?? public/assets/resources/weight-plate-tolerance/
?? public/assets/shipping/
?? scripts/audit-barbell-finish-guide.ts
?? scripts/audit-barbell-knurling-guide.ts
?? scripts/audit-cable-attachment-guide.ts
?? scripts/audit-commercial-growth-blogs.ts
?? scripts/audit-commercial-olympic-barbell-guide.ts
?? scripts/audit-customer-visible-copy.mjs
?? scripts/audit-dumbbell-head-retention.ts
?? scripts/audit-fixed-vs-adjustable-dumbbells.ts
?? scripts/audit-kg-lb-free-weight-units.ts
?? scripts/audit-plate-bar-fit-guide.ts
?? scripts/audit-steel-dumbbell-blog.ts
?? scripts/audit-weight-plate-tolerance-guide.ts
?? scripts/verify-barbell-finish-rendering.mjs
?? scripts/verify-barbell-knurling-rendering.mjs
?? scripts/verify-cable-attachment-rendering.mjs
?? scripts/verify-commercial-olympic-barbell-rendering.mjs
?? scripts/verify-dumbbell-head-retention-rendering.mjs
?? scripts/verify-fixed-vs-adjustable-dumbbells-rendering.mjs
?? scripts/verify-kg-lb-free-weight-units-rendering.mjs
?? scripts/verify-plate-bar-fit-rendering.mjs
?? scripts/verify-steel-dumbbell-rendering.mjs
?? scripts/verify-weight-plate-tolerance-rendering.mjs
?? seomator.toml
?? tmp-home-3001-desktop.png
?? tmp-home-3001-mobile.png
?? tmp-home-3002-desktop.png
?? tmp-home-3002-mobile.png
?? tmp-home-desktop.png
?? tmp-home-mobile.png
?? tmp-localhost-debug.png
?? tmp-localhost-mid.png
?? tmp-open-check-3000.png
?? tmp-open-check-3001.png
```

