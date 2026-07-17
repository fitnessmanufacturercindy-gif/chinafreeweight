# Multilingual Content Gap Report

Audit date: 2026-07-17
Baseline: English 125 URLs, Portuguese 28 URLs, Spanish 23 URLs.

## Coverage matrix summary

Coverage is measured against the 125 public English URLs. Portuguese-only and Spanish-only growth articles are counted in the sitemap baseline but are not English-page coverage.

| Page type | English URLs | Missing pt-BR | Missing es |
|---|---:|---:|---:|
| Home | 1 | 0 | 0 |
| Product categories | 3 mapped + 2 unmapped | 2 | 2 |
| Factory / Projects / Contact / Blog index | 4 | 0 | 0 |
| Manufacturer landing page | 1 | 1 | 1 |
| Product detail | 106 | 100 | 102 |
| Blog / buyer guide | 8 | 5 | 7 |
| **Total language gaps** | **125** | **108** | **112** |

Total gap instances: **220**.

## Scoring method

- SEO search value: 40 points
- B2B inquiry value: 30 points
- AI-search citation value: 20 points
- Useful expansion potential: 10 points

Grade A is 90–100, Grade B is 70–89, and Grade C is below 70. Only Grade A pages are implemented in this release to avoid mass-producing low-value localization.

## Grade A — implemented

| English source | Target URL | Type | Target keyword | Intent | Score |
|---|---|---|---|---|---:|
| `/products/racks-benches` | `/pt/produtos/racks-e-bancos` | Category | racks e bancos para academia no atacado | Commercial investigation / RFQ | 95 |
| `/products/racks-benches` | `/es/productos/racks-y-bancos` | Category | racks y bancos de gimnasio al por mayor | Commercial investigation / RFQ | 95 |
| `/products/gym-accessories` | `/pt/produtos/acessorios-de-academia` | Category | acessórios para academia no atacado | Wholesale category / supplier comparison | 90 |
| `/products/gym-accessories` | `/es/productos/accesorios-de-gimnasio` | Category | accesorios de gimnasio al por mayor | Wholesale category / supplier comparison | 90 |
| `/manufacturer/rubber-hex-dumbbell-manufacturer` | `/pt/fabricante/halteres-sextavados-de-borracha` | Manufacturer landing | fabricante de halteres sextavados de borracha | Manufacturer / OEM / import RFQ | 96 |
| `/manufacturer/rubber-hex-dumbbell-manufacturer` | `/es/fabricante/mancuernas-hexagonales-de-goma` | Manufacturer landing | fabricante de mancuernas hexagonales de goma | Manufacturer / private-label RFQ | 96 |
| `/resources/how-to-choose-commercial-dumbbells` | `/es/blog/como-elegir-mancuernas-para-gimnasio-profesional` | Buyer guide | cómo elegir mancuernas para gimnasio profesional | B2B research / specification | 93 |
| `/resources/weight-plates-vs-bumper-plates-b2b-guide` | `/es/blog/discos-de-peso-vs-discos-bumper` | Buyer guide | discos de peso vs discos bumper | Comparison / purchase decision | 92 |

## Grade B — retained for a later approved batch

| Gap group | Target language instances | Typical score | Reason not included now |
|---|---:|---:|---|
| High-intent dumbbell products (cast iron, CPU, TPU, adjustable) | 18 | 74–86 | Requires product-specific evidence and differentiated RFQs |
| High-intent plate products (CPU bumper, grip plate, competition plate) | 22 | 74–88 | Requires model-level technical and use distinctions |
| Core rack / bench products | 20 | 72–85 | Category hubs should establish demand before detail expansion |
| Kettlebell and cable-attachment products | 14 | 70–82 | Commercial value varies by destination and mix |
| Manufacturing buyer guides (`how-are-bumper-plates-made`, `how-are-dumbbells-weighed`) | 4 | 80–88 | Strong AI value, but lower immediate RFQ value than the A batch |

## Grade C — not localized

The remaining long-tail product and consumer-information gaps score below 70. This includes low-differentiation variants, lb duplicates without proven local demand, home-fitness informational articles, name-history content, and low-priority accessories. They remain English-only until traffic, inquiry, or keyword evidence justifies a unique localized page.

## Asset protection decision

- No existing URL, canonical, title, body, or published localization is replaced.
- New pages use new pt-BR and es URLs.
- English source routes remain unchanged and gain alternates only where a real localized version now exists.
- Existing 125 English, 28 Portuguese, and 23 Spanish sitemap URLs remain present.
