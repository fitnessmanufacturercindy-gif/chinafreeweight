# ChinaFreeWeight Multilingual Blog Launch Report

Launch date: 2026-07-18

Production: https://www.chinafreeweight.com

Public preview: https://preview-blog.chinafreeweight.com

Vercel production deployment: `dpl_FgUjicsaBKewbzWwrhvNHcdp6tC5`

Implementation commit: `aee6486`

## Outcome

Thirty B2B buying guides are live: ten English, ten Brazilian Portuguese, and ten Spanish pages. All 30 production URLs return HTTP 200 and passed rendered-page checks for language, H1, metadata, canonical, hreflang, BlogPosting, FAQ and Breadcrumb schemas, images, internal links, and sitemap coverage.

## Production URLs

### English

1. https://www.chinafreeweight.com/resources/commercial-free-weight-rfq-checklist
2. https://www.chinafreeweight.com/resources/plan-commercial-dumbbell-set
3. https://www.chinafreeweight.com/resources/landed-cost-wholesale-free-weights
4. https://www.chinafreeweight.com/resources/pre-shipment-inspection-dumbbells-weight-plates
5. https://www.chinafreeweight.com/resources/oem-free-weight-sample-approval-process
6. https://www.chinafreeweight.com/resources/custom-logo-options-dumbbells-weight-plates
7. https://www.chinafreeweight.com/resources/training-vs-competition-bumper-plates
8. https://www.chinafreeweight.com/resources/cast-iron-rubber-urethane-weight-plates
9. https://www.chinafreeweight.com/resources/export-packaging-dumbbells-weight-plates
10. https://www.chinafreeweight.com/resources/free-weight-reorder-batch-consistency

### Portuguese (Brazil)

1. https://www.chinafreeweight.com/pt/blog/como-pedir-cotacao-pesos-livres
2. https://www.chinafreeweight.com/pt/blog/montar-conjunto-halteres-academia
3. https://www.chinafreeweight.com/pt/blog/custo-posto-halteres-anilhas-importados
4. https://www.chinafreeweight.com/pt/blog/inspecao-pre-embarque-halteres-anilhas
5. https://www.chinafreeweight.com/pt/blog/aprovar-amostra-oem-pesos-livres
6. https://www.chinafreeweight.com/pt/blog/aplicar-logo-halteres-anilhas
7. https://www.chinafreeweight.com/pt/blog/anilha-bumper-treino-vs-competicao
8. https://www.chinafreeweight.com/pt/blog/anilha-ferro-emborrachada-pu
9. https://www.chinafreeweight.com/pt/blog/embalagem-halteres-anilhas-importacao
10. https://www.chinafreeweight.com/pt/blog/reposicao-pesos-livres-padrao-lotes

### Spanish

1. https://www.chinafreeweight.com/es/blog/solicitud-cotizacion-peso-libre
2. https://www.chinafreeweight.com/es/blog/rango-mancuernas-gimnasio-profesional
3. https://www.chinafreeweight.com/es/blog/calcular-coste-puesto-pesas-importadas
4. https://www.chinafreeweight.com/es/blog/inspeccion-preembarque-mancuernas-discos
5. https://www.chinafreeweight.com/es/blog/aprobar-muestra-oem-peso-libre
6. https://www.chinafreeweight.com/es/blog/logo-personalizado-mancuernas-discos
7. https://www.chinafreeweight.com/es/blog/discos-bumper-entrenamiento-vs-competicion
8. https://www.chinafreeweight.com/es/blog/discos-hierro-caucho-pu
9. https://www.chinafreeweight.com/es/blog/embalaje-exportacion-mancuernas-discos
10. https://www.chinafreeweight.com/es/blog/consistencia-lotes-peso-libre

## QA and SEO results

- Source audit: 30/30 passed; 10 complete multilingual topic clusters.
- Automated tests: 21/21 passed.
- TypeScript: passed.
- Production build: passed; 247 static pages generated.
- Production rendered audit: 30/30 URLs returned 200.
- Every page has one H1, localized title and description, self-canonical, reciprocal `en`, `pt-BR`, `es`, and `x-default` hreflang, BlogPosting schema, FAQ schema, Breadcrumb schema, three optimized images with descriptive filenames and alt text, relevant internal links, FAQ, and CTA.
- Sitemap: all 30 URLs appear in the blog sitemap and the existing sitemap index remains available.
- Existing-page protection sample: home, products, dumbbells, weight plates, an existing article, factory, and contact all returned 200 after launch.
- Lint: no errors; 70 pre-existing warnings remain, primarily legacy raw-image warnings outside this launch scope.

## Performance sample

Mobile Lighthouse production samples:

| Locale | Performance | SEO | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| English | 98 | 100 | 1.5 s | 1.9 s | 0 | 110 ms |
| Portuguese | 100 | 100 | 1.4 s | 1.4 s | 0.014 | 60 ms |
| Spanish | 99 | 100 | 1.2 s | 1.3 s | 0 | 140 ms |

## Content, keyword, and image inventory

The 30-row title, primary keyword, search intent, AI question, commercial value, competition level, and URL map is maintained in `docs/research/multilingual-blog-keyword-research-2026-07.md`. Each article's three-image inventory is declared in its corresponding file under `content/multilingual-blogs/{en,pt-BR,es}/`; the production audit confirmed that all 90 image references load successfully and contain localized alt text and captions.

## Google Search Console recommendation

Submit or refresh `https://www.chinafreeweight.com/sitemap.xml`, confirm Google can fetch the sitemap index and blog sitemap, then request indexing for representative English, Portuguese, and Spanish URLs first. Monitor Page indexing, Core Web Vitals, hreflang/canonical signals, impressions, and query localization for two to four weeks before making structural changes.

## Issues found and resolved

- Repaired invalid image references and ensured every localized article uses three live images.
- Corrected localized internal links and prevented links to unpublished locale routes.
- Fixed FAQ parsing so the conclusion and CTA remain customer-visible after the FAQ section.
- Added the multilingual pages to the blog sitemap and enforced complete three-language publication groups.
- Made the preview alias public so stakeholders can review it without a Vercel login.

No product-page structure, existing content, or existing SEO settings were removed or rewritten.
