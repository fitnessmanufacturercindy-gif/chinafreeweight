## What changed

- Render all 122 Indonesian routes with the localized page-family layouts.
- Remove large English product-copy fallbacks and normalize procurement terminology into natural Indonesian.
- Preserve localized metadata, canonical URLs, hreflang, schema, images, and internal links for independent Google indexing.
- Extend Indonesian infrastructure and browser smoke coverage.
- Exclude local audit artifacts from Vercel uploads.

## Why

The Indonesian product pages were still rendering several English source fields and some unnatural mixed-language procurement phrases.

## Validation

- Production build passed.
- TypeScript check passed.
- Indonesian language audit: 122 pages, 0 flagged pages.
- Indonesian browser smoke: 122 SSR pages plus metadata, schema, language switcher, sitemaps, robots, and 404 passed.
- Desktop and mobile local previews checked.
