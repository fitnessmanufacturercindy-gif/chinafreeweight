## [ERR-20260713-001] patch-context-encoding-mismatch

**Logged**: 2026-07-13T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
A multi-file patch failed because an existing mojibake separator in the footer did not match the patch context reliably.

### Error
```text
apply_patch verification failed: Failed to find expected lines in app/components/SiteFooter.tsx
```

### Context
- Task attempted: add Portuguese navigation and footer labels
- Command/tool/API: apply_patch
- Environment: Windows PowerShell, UTF-8 TypeScript source with pre-existing mojibake

### Suspected Cause
The patch depended on context containing incorrectly decoded characters.

### Suggested Fix
Replace the small file as a whole or anchor patches only on stable ASCII context.

### Metadata
- Reproducible: yes
- Related files: app/components/SiteFooter.tsx
- Tags: encoding, patch, windows

## [ERR-20260713-002] powershell-inline-node-quoting

**Logged**: 2026-07-13T00:05:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
An inline Node statistics command lost nested quotes when passed through PowerShell.

### Error
```text
SyntaxError: Unexpected end of input
```

### Context
- Task attempted: count Portuguese page words and meta-description characters
- Command/tool/API: node -e through PowerShell
- Environment: Windows PowerShell

### Suspected Cause
Single-quoted outer command content did not preserve nested JavaScript quotes through the command transport.

### Suggested Fix
Use a PowerShell double-quoted outer expression with JavaScript single-quoted literals.

### Metadata
- Reproducible: yes
- Related files: app/pt/content.ts, app/pt/businessContent.ts
- Tags: powershell, node, quoting

### Follow-up
PowerShell also parsed regex tokens inside a double-quoted `node -e` command. The durable fix is a checked-in `.mjs` validation script instead of complex inline JavaScript.

## [ERR-20260713-003] playwright-cli-not-global

**Logged**: 2026-07-13T00:15:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The Playwright CLI executable was not installed globally.

### Error
```text
playwright-cli: The term 'playwright-cli' is not recognized
```

### Context
- Task attempted: visual QA of local Portuguese pages
- Command/tool/API: playwright-cli
- Environment: Windows PowerShell

### Suspected Cause
The project includes Playwright libraries but not a global CLI shim.

### Suggested Fix
Use `npx --no-install playwright-cli` when available, then fall back to the existing `playwright-core` library without installing packages.

### Metadata
- Reproducible: yes
- Related files: package.json
- Tags: playwright, cli, windows

### Follow-up
`npx --no-install playwright-cli` was also unavailable. Visual QA used the installed `playwright-core` package with the local Edge executable instead.

## [ERR-20260713-004] pt-mobile-overflow-and-resource-404

**Logged**: 2026-07-13T00:25:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Rendered Portuguese pages passed desktop QA but showed horizontal overflow at 390px; the home route also logged one missing resource.

### Error
```text
mobile /pt/: overflow=true
console: Failed to load resource: 404
```

### Context
- Task attempted: desktop and mobile visual QA
- Command/tool/API: scripts/visual-qa-pt.mjs with playwright-core
- Environment: Next.js dev server, Edge headless

### Suspected Cause
A shared responsive component has a fixed or intrinsic minimum width; the missing resource may be a root-layout preload that is not requested successfully in development.

### Suggested Fix
Identify elements whose bounding boxes exceed the viewport, inspect failed requests, patch responsive CSS or asset reference, and rerun the same QA script.

### Resolution
The off-screen mobile header CTA was hidden at the existing 900px navigation breakpoint, and `app/icon.png` was added to satisfy the favicon request. The full desktop/mobile QA suite then passed.

### Metadata
- Reproducible: yes
- Related files: app/globals.css, app/layout.tsx, app/pt/PtSeoPage.tsx
- Tags: responsive, overflow, 404, visual-qa

## [ERR-20260713-005] powershell-rg-alternation-quoting

**Logged**: 2026-07-13T00:35:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
A final read-only `rg` command for built HTML metadata was split at a regex alternation character by PowerShell.

### Error
```text
rg: IO error for operation on rel=\alternate...
```

### Context
- Task attempted: inspect generated canonical and alternate link tags
- Command/tool/API: rg with an alternation regex
- Environment: Windows PowerShell

### Suspected Cause
The shell interpreted the regex pipe instead of passing the complete expression.

### Suggested Fix
Rely on the browser QA DOM assertions already covering canonical and hreflang, or use separate fixed-string searches on Windows.

### Metadata
- Reproducible: yes
- Related files: .next/server/app/pt.html
- Tags: powershell, rg, quoting

## [ERR-20260713-006] commit-proceeded-after-diff-warning

**Logged**: 2026-07-13T00:40:00+08:00
**Priority**: low
**Status**: resolved
**Area**: docs

### Summary
The commit command ran after `git diff --cached --check` reported trailing whitespace because the commands were separated with a semicolon.

### Error
```text
reports/portuguese-seo-implementation-2026-07-13.md: trailing whitespace
```

### Context
- Task attempted: final commit
- Command/tool/API: git diff --cached --check; git commit
- Environment: PowerShell

### Suspected Cause
The command separator did not make the commit conditional on a clean diff check.

### Suggested Fix
Remove the trailing spaces, stage the correction, verify again, and amend the same commit. In future, run the check and commit as separate tool calls.

### Metadata
- Reproducible: yes
- Related files: reports/portuguese-seo-implementation-2026-07-13.md
- Tags: git, whitespace, commit
