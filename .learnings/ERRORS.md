# Error Log

## [ERR-20260714-001] npm-windows-node-modules-lock

**Logged**: 2026-07-14T20:03:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: infra

### Summary

Installing development tooling on Windows ended with a transient `node_modules` directory cleanup failure even though the requested packages were added.

### Error

```text
npm error ENOTEMPTY: directory not empty, rmdir 'node_modules\language-subtag-registry\data\json'
```

### Context

- Task attempted: Add ESLint and TypeScript test tooling for the i18n infrastructure phase.
- Command/tool/API: `npm install --save-dev eslint@9 eslint-config-next@15.5.20 tsx@4.23.1`
- Inputs: Existing npm lockfile and populated `node_modules`.
- Environment: Windows PowerShell, Node.js 24.18.0, npm 11.16.0.

### Suspected Cause

A scanner or another process briefly held files while npm replaced package directories.

### Suggested Fix

Verify `package.json`, the lockfile, and `npm ls` first. Retry a normal `npm install` only if reconciliation is needed; do not delete the entire dependency directory unless explicitly authorized.

Resolved by reconciling the lockfile with `npm install --package-lock-only --ignore-scripts` and confirming all four packages with `npm ls`.

### Metadata

- Reproducible: unknown
- Related files: `package.json`, `package-lock.json`
- Tags: npm, windows, file-lock, dependencies

## [ERR-20260714-002] regression-test-hardcoded-origin

**Logged**: 2026-07-14T20:12:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary

The first English sitemap regression test failed because it hardcoded the production origin instead of using the project's environment-aware `siteUrl`.

### Error

```text
AssertionError: assert.ok(urls.includes(`${siteUrl}/`))
```

### Context

- Task attempted: Verify that the multilingual infrastructure does not remove English sitemap routes.
- Command/tool/API: `npm test`
- Inputs: Sitemap generated with the existing runtime site URL configuration.
- Environment: Next.js test executed through `tsx --test`.

### Suspected Cause

The test mixed a fixed public origin with an application setting that intentionally supports `NEXT_PUBLIC_SITE_URL`.

### Suggested Fix

Use the exported application `siteUrl` for English regression assertions while retaining a fixed test origin for isolated SEO engine unit tests.

### Metadata

- Reproducible: yes
- Related files: `tests/i18n/infrastructure.test.ts`, `app/site.ts`
- Tags: tests, sitemap, environment

## [ERR-20260714-003] eslint-transitive-package-incomplete

**Logged**: 2026-07-14T20:15:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: infra

### Summary

ESLint could not start because the earlier interrupted npm extraction left `language-subtag-registry` without its JSON index.

### Error

```text
Cannot find module 'language-subtag-registry/data/json/index.json'
```

### Context

- Task attempted: Run the newly configured Next.js ESLint checks.
- Command/tool/API: `npm run lint`
- Inputs: Dependency tree after a Windows `ENOTEMPTY` install error.
- Environment: Windows PowerShell, npm 11.16.0.

### Suspected Cause

The package directory was only partially replaced when npm encountered the file lock.

### Suggested Fix

Resolve and validate the exact package path inside the workspace, remove only that incomplete package directory, then run a normal npm reconciliation.

Resolved after validating the absolute target path, replacing only the incomplete package, and reconciling dependencies with `npm install --ignore-scripts`.

### Metadata

- Reproducible: yes
- Related files: `node_modules/language-subtag-registry`, `package-lock.json`
- Tags: eslint, npm, windows, incomplete-install

## [ERR-20260714-004] legacy-lint-baseline

**Logged**: 2026-07-14T20:18:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary

Enabling a repository-wide ESLint command surfaced 414 pre-existing errors in English pages and copied files under `tmp`, outside the phase-two change scope.

### Error

```text
✖ 545 problems (414 errors, 131 warnings)
```

### Context

- Task attempted: Add and run the missing project lint command.
- Command/tool/API: `npm run lint`
- Inputs: Entire repository including legacy English TSX and temporary deployment copies.
- Environment: ESLint 9 with Next.js core web vitals and TypeScript rules.

### Suspected Cause

The project had no lint script, so existing `<a>`, `<img>`, unescaped entity, and temporary-copy issues had never been part of an enforced baseline.

### Suggested Fix

For this architecture-only implementation, lint all new i18n infrastructure and directly modified files. Track legacy English cleanup separately because changing it would violate the no-English-content/no-design-change boundary.

### Metadata

- Reproducible: yes
- Related files: `package.json`, `eslint.config.mjs`, legacy `app/**`, `tmp/**`
- Tags: eslint, legacy, scope, regression

## [ERR-20260714-005] next-build-enforces-new-legacy-lint

**Logged**: 2026-07-14T20:22:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: config

### Summary

The production build compiled but failed when Next.js automatically applied the newly introduced ESLint configuration to legacy English pages.

### Error

```text
Failed to compile: @next/next/no-html-link-for-pages and react/no-unescaped-entities in existing English TSX
```

### Context

- Task attempted: Run the required production build after adding i18n infrastructure.
- Command/tool/API: `npm run build`
- Inputs: New ESLint configuration plus unchanged legacy English pages.
- Environment: Next.js 15.5 production build.

### Suspected Cause

The pre-existing site had no ESLint baseline; Next.js began enforcing all newly enabled rules during build.

### Suggested Fix

Keep full linting for the new infrastructure, ignore temporary copies, and add a narrow compatibility override only for explicitly listed legacy English paths. Do not modify English page content during this phase.

### Metadata

- Reproducible: yes
- Related files: `eslint.config.mjs`, legacy `app/**`
- Tags: next-build, eslint, legacy, compatibility

## [ERR-20260714-006] local-production-port-in-use

**Logged**: 2026-07-14T20:27:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary

The local production server could not bind to the default port because another process already owned port 3000.

### Error

```text
EADDRINUSE: address already in use 127.0.0.1:3000
```

### Context

- Task attempted: Run production-mode HTTP regression checks.
- Command/tool/API: `npm start`
- Environment: Windows local workspace.

### Suspected Cause

An unrelated local service was already listening on the default Next.js port.

### Suggested Fix

Do not terminate an unknown process; run the regression server on an unused alternate port.

### Metadata

- Reproducible: yes
- Related files: none
- Tags: port, next-start, local-test

## [ERR-20260714-007] preview-http-egress-timeout

**Logged**: 2026-07-14T20:40:00+08:00
**Priority**: low
**Status**: pending
**Area**: infra

### Summary

The Vercel Preview completed and reported Ready, but this local environment timed out when making an outbound HTTP request to its `vercel.app` URL.

### Error

```text
curl: (28) Connection timed out after 12010 milliseconds
```

### Context

- Task attempted: Perform post-deploy HTTP regression against the Preview URL.
- Command/tool/API: `curl` against the generated Vercel Preview.
- Environment: Local Windows execution environment.

### Suspected Cause

Outbound access to the Vercel Preview domain is unavailable or filtered in the current execution environment.

### Suggested Fix

Use Vercel deployment inspection to confirm build readiness and open the Preview from a normal browser/network for final visual confirmation. Keep the completed local production HTTP regression as the route-level verification record.

### Metadata

- Reproducible: yes
- Related files: none
- Tags: vercel, preview, network, timeout

## 2026-07-14 — apply_patch context mismatch after route moves

- **Failure:** A multi-file patch could not match `app/(en)/layout.tsx` after earlier route moves and mixed line-ending/encoding changes.
- **Impact:** The patch was atomic and made no changes.
- **Prevention:** For already-moved files with unstable context, replace the complete file with `apply_patch` instead of relying on a large contextual hunk.

## 2026-07-14 — stale Next.js generated route types after route-group migration

- **Failure:** `npm run typecheck` read `.next/types` generated before English pages were moved into `app/(en)` and reported missing old route modules.
- **Impact:** The check could not yet evaluate the current route graph reliably.
- **Prevention:** Regenerate Next.js route types with a fresh build after structural App Router moves, then rerun the standalone typecheck.

## 2026-07-14 — PowerShell regex quoting split an rg pattern

- **Failure:** A double-quoted alternation pattern was split by PowerShell and treated as invalid filenames.
- **Impact:** Only the diagnostic search failed; no files changed.
- **Prevention:** Use `Select-String` with literal PowerShell quoting or separate `rg` patterns when paths/patterns contain quotes and pipes.

## 2026-07-14 — local production server port already occupied

- **Failure:** `next start` could not bind to `127.0.0.1:3000` (`EADDRINUSE`).
- **Impact:** No user process was stopped and no site state changed.
- **Prevention:** Start isolated verification servers on an explicitly selected alternate port, such as 3100.

## 2026-07-14 — mobile language switcher hidden by inherited navigation rule

- **Failure:** Browser smoke testing found `.topbar nav { display: none }` also hid the language selector at widths below 900px.
- **Impact:** Desktop switching worked, but mobile users could not see English/Português.
- **Prevention:** Give utility navigation inside the top bar an explicit responsive override and keep a mobile viewport assertion in the browser smoke test.
