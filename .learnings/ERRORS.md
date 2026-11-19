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

## 2026-07-14 — Vercel Preview blocked anonymous public verification

- **Failure:** The Preview URL served Vercel's access-protection page (`html lang=en-US`) to an anonymous browser; an anonymous HTTP request returned no site response.
- **Impact:** The deployment exists, but it cannot yet satisfy the required public Preview gate.
- **Prevention:** Verify deployment protection/share-link settings before treating a Vercel Preview as publicly testable; never infer site success from a protected Preview URL.

## 2026-07-14 — Playwright API request timed out while browser navigation remained healthy

- **Failure:** `APIRequestContext` timed out against the protected Preview after browser navigation had successfully visited every page using the shareable-link cookie.
- **Impact:** The source/XML subcheck stopped despite the browser channel remaining available.
- **Prevention:** For protected Preview verification, read the raw `Response` from the same browser navigation channel that established the shareable-link cookie instead of switching network stacks.

## [ERR-20260724-001] powershell-inline-boolean-parser

**Logged**: 2026-07-24T09:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary

A PowerShell interpolation tried to combine a Git command, `$LASTEXITCODE`, and an inline conditional inside one expression and failed before execution.

### Error

```text
Missing closing ')' in expression.
```

### Context

- Task attempted: Validate a branch and path before creating the daily automation worktree.
- Command/tool/API: PowerShell invoked through the shell tool.
- Inputs: Inline `$(...)` interpolation containing a semicolon and `if` expression.
- Environment: Windows PowerShell in Codex desktop.

### Suspected Cause

The nested command expression was syntactically ambiguous to Windows PowerShell.

### Suggested Fix

Run branch and path checks as separate statements and use their exit codes directly before calling `git worktree add`.

### Metadata

- Reproducible: yes
- Related files: none
- Tags: powershell, git, worktree
## [ERR-20260724-002] partial-node-modules-after-timeout

**Logged**: 2026-07-24T09:08:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: environment

### Summary
An interrupted `npm ci` left a `node_modules` directory that existed but did not contain the project binaries, so checking only directory existence incorrectly skipped dependency installation.

### Error
`eslint`, `tsc`, `tsx`, and `next` were not recognized when the QA command chain ran.

### Resolution
Run `npm ci` to completion whenever `node_modules/.bin/next` is absent; do not use the parent directory alone as the readiness check.

### Prevention
Use `Test-Path node_modules/.bin/next.cmd` (or the platform equivalent) before skipping installation in a fresh worktree.

---

## [ERR-20261119-005] playwright-localhost-sandbox-boundary

**Logged**: 2026-11-19T13:05:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: browser

### Summary

Playwright could not reach a production server started on the other side of the managed sandbox boundary.

### Error

```text
net::ERR_NETWORK_ACCESS_DENIED, followed by net::ERR_CONNECTION_TIMED_OUT when only the browser was escalated
```

### Context

- Task attempted: Render all new localized routes on localhost.
- Command/tool/API: Next production server plus Playwright audit.
- Environment: Managed Windows sandbox with isolated network contexts.

### Suspected Cause

The browser and localhost server were initially launched in different permission and network contexts.

### Suggested Fix

Start both the production server and Playwright audit with the same approved execution context.

### Metadata

- Reproducible: yes
- Related files: scripts/verify-localized-guide-rendering.mjs
- Tags: playwright, localhost, sandbox, visual-qa

---

## [ERR-20261119-006] english-markdown-link-fallbacks

**Logged**: 2026-11-19T13:10:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: marketing

### Summary

Two English article fallback links used inferred slugs rather than the established public paths.

### Error

```text
broken internal link /resources/bumper-plate-hub-insert-loose-retention-inspection (404)
broken internal link /resources/wholesale-free-weight-container-loading-guide (404)
```

### Context

- Task attempted: Run rendered broken-link checks for the English resource article.
- Command/tool/API: Local production Playwright audit.
- Environment: `englishMarkdown()` builds links without a manifest and therefore uses the explicit fallback path list.

### Suspected Cause

Fallback slugs were inferred from entity IDs instead of read from the existing English versions.

### Suggested Fix

Use `/resources/bumper-plate-loose-insert-hub-retention-guide` and `/resources/how-many-dumbbells-fit-container-loading-guide`, and keep rendered link checks mandatory.

### Metadata

- Reproducible: yes
- Related files: content/i18n/bumper-plate-hub-corrosion-guide.ts
- Tags: internal-links, slug, rendering, 404

---

## [ERR-20261119-004] apply-patch-accidental-diff-prefix

**Logged**: 2026-11-19T12:55:00+08:00
**Priority**: low
**Status**: resolved
**Area**: docs

### Summary

A multi-file patch search block accidentally included a literal diff `+` before expected source lines and could not match them.

### Error

```text
apply_patch verification failed: Failed to find expected lines
```

### Context

- Task attempted: Expand Portuguese and Spanish article depth while updating route and test counts.
- Command/tool/API: `apply_patch`.
- Environment: Long one-line localized TypeScript copy objects.

### Suspected Cause

Replacement context was copied from an added-line representation rather than the actual file text.

### Suggested Fix

Locate exact source lines with ripgrep, then apply smaller replacements using literal file content without diff markers.

### Metadata

- Reproducible: yes
- Related files: content/i18n/bumper-plate-hub-corrosion-guide-copy-primary.ts
- Tags: apply-patch, long-lines, localization

---

## [ERR-20261119-003] multilingual-static-counts-after-guide

**Logged**: 2026-11-19T12:45:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary

Infrastructure tests retained the previous locale, blog and sitemap counts after adding one published guide to every locale.

### Error

```text
AssertionError: actual locale and sitemap counts exceeded expected values by the newly published entities.
```

### Context

- Task attempted: Run the complete multilingual infrastructure suite.
- Command/tool/API: `npm test -- --runInBand`.
- Environment: A new blog entity with 13 localized versions and one English resource-list entry.

### Suspected Cause

The suite intentionally uses explicit publication and sitemap baselines, which must be advanced alongside a reviewed multilingual entity.

### Suggested Fix

Increment each locale publication and blog baseline by one, account for the additional English resource entry in both sitemap generators, and increase the global totals by thirteen.

### Metadata

- Reproducible: yes
- Related files: tests/i18n/infrastructure.test.ts
- Tags: tests, sitemap, multilingual, content-counts

---

## [ERR-20261119-002] tsx-cjs-top-level-await

**Logged**: 2026-11-19T12:35:00+08:00
**Priority**: low
**Status**: resolved
**Area**: data

### Summary

The run-artifact builder used top-level await while tsx compiled this project path as CommonJS.

### Error

```text
Top-level await is currently not supported with the "cjs" output format
```

### Context

- Task attempted: Generate multilingual daily-content research and draft artifacts.
- Command/tool/API: `npx tsx content-ops/runs/2026-11-16/build-content-ops.ts`.
- Environment: Project package output interpreted as CommonJS.

### Suspected Cause

The script was authored in module style without the explicit async `main()` pattern used by earlier run builders.

### Suggested Fix

Wrap asynchronous file operations in `async function main()` and terminate through a catch handler.

### Metadata

- Reproducible: yes
- Related files: content-ops/runs/2026-11-16/build-content-ops.ts
- Tags: tsx, commonjs, top-level-await, content-ops

---

## [ERR-20261119-001] powershell-ripgrep-brace-file-list

**Logged**: 2026-11-19T12:05:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary

A ripgrep command used Bash-style brace expansion for a file list and PowerShell parsed the braces as syntax.

### Error

```text
ParserError: Missing argument in parameter list.
```

### Context

- Task attempted: Find entity IDs in a short list of TypeScript content files.
- Command/tool/API: `rg` invoked from PowerShell.
- Inputs: A path expression containing `{file-a.ts,file-b.ts}`.
- Environment: Windows PowerShell.

### Suspected Cause

Brace expansion is a Bash feature and is not a portable way to pass multiple paths to ripgrep in PowerShell.

### Suggested Fix

Pass explicit quoted paths as separate arguments, search the containing directory with a narrow pattern, or use a PowerShell string array.

### Metadata

- Reproducible: yes
- Related files: none
- Tags: powershell, ripgrep, shell-portability

---
## [ERR-20260724-003] ci-daily-health-full-crawl-timeout

**Logged**: 2026-07-24T10:08:00+08:00
**Priority**: high
**Status**: resolved
**Area**: CI

### Summary
The Website Quality Gate ran the daily Playwright health check against all 1,482 sitemap URLs in serial and both push and pull-request jobs hit the 40-minute workflow limit.

### Error
Both `quality-gate` runs completed build, lint, typecheck, unit tests, and the website quality gate, then timed out during `Run daily site health assertions`.

### Resolution
Added a policy-aware scope selector and `SITE_HEALTH_PATHS` support. Daily runs now check critical locale entrances, new URLs, and routes affected by changed files; Sunday includes seven days of changed routes; the first day of each month leaves the scope empty to request a full crawl.

### Prevention
Keep expensive browser health checks incremental outside the monthly full-site run, while retaining sitemap membership checks and protected-page regression controls.

---
## [ERR-20260724-004] health-contact-cta-false-positives

**Logged**: 2026-07-24T10:27:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: QA

### Summary
The incremental health run reported product and RFQ content links as broken communication CTAs because the detector treated any anchor containing `quote` or `rfq` as a mail/phone/contact link.

### Resolution
Restricted the communication-target assertion to mail, email, phone, tel, and WhatsApp signals. The same 16-URL run then produced 0 Critical, 0 High, 16 successful pages, and a passing Playwright assertion.

### Prevention
Keep content-intent links separate from direct communication protocol checks; validate HTTP content links through the existing link-status crawler.

---

## [ERR-20261117-001] worktree-quality-gate-lighthouse-path

**Logged**: 2026-11-17T12:30:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: infra

### Summary

The full quality gate could resolve project commands through the parent repository but failed because it constructs an absolute Lighthouse path under the isolated worktree's missing `node_modules` directory.

### Error

```text
Cannot find module '...\\.codex_work\\daily-2026-11-15\\node_modules\\lighthouse\\cli\\index.js'
```

### Context

- Task attempted: Run the ChinaFreeWeight full website quality gate from a clean Git worktree.
- Command/tool/API: `npm run quality:gate`
- Inputs: Local production server at `http://127.0.0.1:3015`.
- Environment: Windows PowerShell; dependencies installed in the parent checkout.

### Suspected Cause

Node's normal upward module resolution allowed Next.js, TypeScript and ESLint commands to run, but `scripts/quality-gate.mjs` directly joins the worktree root with `node_modules/lighthouse/cli/index.js`.

### Suggested Fix

Before this gate in an isolated worktree, create a local directory junction from the worktree `node_modules` path to the verified parent checkout `node_modules` directory, or install dependencies locally when no verified parent dependency tree exists.

### Metadata

- Reproducible: yes
- Related files: scripts/quality-gate.mjs
- Tags: windows, git-worktree, lighthouse, node-modules, quality-gate

---

## [ERR-20261117-002] gh-pr-merge-worktree-main-conflict

**Logged**: 2026-11-17T12:42:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: infra

### Summary

`gh pr merge --merge --delete-branch` refused to merge because its local Git workflow tried to use `main`, which was already checked out in a different worktree.

### Error

```text
failed to run git: fatal: 'main' is already used by worktree at 'C:/Users/Kloe/Documents/chinafreeweight-main-delete-racks'
```

### Context

- Task attempted: Merge the fully green ChinaFreeWeight content PR from an isolated publication worktree.
- Command/tool/API: `gh pr merge 41 --merge --delete-branch`
- Environment: Windows Git repository with several linked worktrees.

### Suspected Cause

The high-level GitHub CLI merge command performs local branch bookkeeping even though the actual merge is remote, and Git protects a branch already attached to another worktree.

### Suggested Fix

After confirming all required checks are green, use the GitHub pull-request merge API (`PUT /repos/{owner}/{repo}/pulls/{number}/merge`) from isolated worktrees. Delete the remote branch separately only after the merge if needed.

### Metadata

- Reproducible: yes
- Related files: .git/worktrees
- Tags: github-cli, git-worktree, merge, windows

---

## [ERR-20261119-007] next-build-cache-permission-context

**Logged**: 2026-11-19T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary

A normal-context production build could not recreate a directory under `.next` after an earlier escalated build created the cache with a different permission context.

### Error

```text
EPERM: operation not permitted, mkdir '...\\.next\\server\\app'
```

### Resolution

Re-ran the production build in the same approved context that owned the existing `.next` output; the build completed and generated all 2,006 static pages.

### Prevention

Keep all build and render steps for one isolated worktree in a consistent execution context, especially when reusing `.next` on Windows.

---

## [ERR-20261119-008] site-health-browser-close-hang

**Logged**: 2026-11-19T14:00:00+08:00
**Priority**: high
**Status**: resolved
**Area**: testing

### Summary

The `main` Website Quality Gate finished all 14 incremental desktop page checks in 24 seconds, then remained in the daily site-health step until GitHub canceled the job at its 40-minute limit.

### Error

```text
The job has exceeded the maximum execution time of 40m0s
```

### Root Cause

Navigation calls were bounded, but Playwright page and context shutdown calls in the desktop, mobile, and contact-form phases had no timeout. A stalled close operation could therefore prevent the report from being written and consume the entire job budget.

### Resolution

Wrapped page and context cleanup in five-second races and added mobile-phase progress output so a browser cleanup problem can no longer hold the workflow indefinitely or remain invisible.

### Prevention

Every browser lifecycle operation in long-running CI audits must have an explicit upper bound, including cleanup calls after assertions have finished.

---
