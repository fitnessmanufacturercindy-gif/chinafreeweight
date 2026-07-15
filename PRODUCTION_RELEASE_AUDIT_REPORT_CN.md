# PowerBaseFit Production Website Full Release Audit & Hardening V1.0

生成时间：2026-07-15

审计对象：ChinaFreeWeight 正式网站发布渲染层、Markdown/Front Matter 隔离、Batch-01 已发布页面、构建阶段客户可见内容拦截。

本次不修改 Data Source Hub、DataForSEO、Opportunity Engine、Content Generation 逻辑、Draft 内容、SEO 策略、Publishing 流程。

## 1. 发现问题列表

| 问题 | 影响 | 处理状态 |
| --- | --- | --- |
| Batch-01 Markdown 文件开头存在 BOM，旧 Front Matter 解析器没有去除 BOM，导致 `title:`、`meta_description:`、`primary_keyword:`、`search_intent:`、`publishing_decision:` 被当成正文渲染 | 客户页面可能看到后台字段和 SEO 元数据 | 已修复 |
| Manufacturer / OEM 渲染器客户可见禁词覆盖不完整 | 未来 Draft 中若出现更多后台字段，可能无法在构建阶段拦截 | 已加固 |
| Resources 文章读取器未统一处理 BOM | 资源文章未来也可能出现 Front Matter 进入正文风险 | 已修复 |
| 构建流程没有统一的 Customer Visible Content Validation | 问题可能在上线后才被人工发现 | 已新增构建前和构建后自动检查 |
| 图片内部字段缺少构建级检查 | `synthetic_visual`、`ai_generated_visual`、图片内部说明等未来可能泄露 | 已加入扫描规则 |

## 2. 修复内容

1. Manufacturer 页面读取 Markdown 时先去除 BOM，再解析 Front Matter。
2. OEM 页面读取 Markdown 时先去除 BOM，再解析 Front Matter。
3. Resources 文章读取器统一去除 BOM 与换行差异，避免 Front Matter 泄露。
4. 扩展 Manufacturer / OEM 渲染器的后台字段拦截列表，包括：
   - `title:`
   - `meta_description:`
   - `slug:`
   - `primary_keyword:`
   - `secondary_keyword:`
   - `search_intent:`
   - `buyer_intent:`
   - `publishing_decision:`
   - `product_context:`
   - `quality_score:`
   - `internal_notes:`
   - `Draft Review:`
   - `Image Plan:`
   - `Missing Evidence:`
   - `Status: Missing:`
   - `synthetic_visual`
   - `ai_generated_visual`
5. 新增 `scripts/validate-customer-visible-content.mjs`：
   - 构建前检查渲染器是否包含客户可见内容隔离规则。
   - 构建后扫描 `.next/server/app/**/*.html` 的真实 HTML。
   - 只扫描客户可见 `<body>/<main>` 内容，避免把 `<head>` 中合法 SEO 字段误判为正文泄露。
   - 检查 Batch-01 页面 H1、Title、Meta Description、Canonical、BreadcrumbList、FAQPage、FAQ、CTA。
   - 检查 Batch-01 页面产品上下文污染。
   - 检查 Sitemap 是否包含 Batch-01 URL。
6. 将扫描器接入 `npm run build`：
   - `prebuild`：源代码与渲染器防线检查。
   - `postbuild`：真实 HTML 泄露扫描与 SEO/Schema/Product Context 检查。

## 3. 修改文件

| 文件 | 修改说明 |
| --- | --- |
| `app/manufacturer/[slug]/page.tsx` | 增加 BOM 清理；扩展后台字段、图片内部字段、发布字段的客户可见拦截 |
| `app/oem/[slug]/page.tsx` | 增加 BOM 清理；扩展后台字段、图片内部字段、发布字段的客户可见拦截 |
| `app/resources/blogData.ts` | 增加 BOM 清理，降低资源文章 Front Matter 泄露风险 |
| `scripts/validate-customer-visible-content.mjs` | 新增客户可见内容泄露、SEO、Schema、产品上下文、Sitemap 构建级扫描 |
| `package.json` | 新增 `prebuild`、`postbuild`、`validate:customer-visible` |

## 4. 5 个页面检查结果

| 页面 | HTML Leak Scan | SEO | Schema | Product Context | 图片字段泄露 |
| --- | --- | --- | --- | --- | --- |
| `/manufacturer/chrome-dumbbell-manufacturer` | PASS | PASS | PASS | PASS | PASS |
| `/manufacturer/urethane-dumbbell-manufacturer` | PASS | PASS | PASS | PASS | PASS |
| `/oem/oem-dumbbells` | PASS | PASS | PASS | PASS | PASS |
| `/oem/private-label-dumbbells` | PASS | PASS | PASS | PASS | PASS |
| `/manufacturer/weight-plate-manufacturer` | PASS | PASS | PASS | PASS | PASS |

## 5. HTML Leak Scan 结果

构建后扫描结果：PASS

已确认客户可见正文中未出现以下内部字段：

- Front Matter 字段
- Draft Review 字段
- Image Plan
- Missing Evidence
- Status: Missing
- Content Strategy
- Generation Notes
- synthetic_visual
- ai_generated_visual
- 内部图片元数据
- Brief 写作指令残留

## 6. SEO 检查结果

Batch-01 页面均已通过以下本地构建检查：

- H1 存在且唯一
- Title 存在
- Meta Description 存在
- Canonical 指向正式 URL
- BreadcrumbList JSON-LD 存在
- FAQPage JSON-LD 存在
- FAQ 正常显示
- CTA 正常显示
- Sitemap 包含目标 URL

## 7. Build 结果

结果：PASS

执行命令：

```bash
npm run build
```

构建阶段已自动执行：

```bash
node scripts/validate-customer-visible-content.mjs --source
node scripts/validate-customer-visible-content.mjs --html
```

两项均通过。

## 8. Typecheck 结果

结果：PASS

执行命令：

```bash
npx tsc --noEmit
```

## 9. 是否需要重新部署

需要。

原因：当前修复位于本次 PR 分支，必须在人工验收后 Merge，触发正式网站 Production 部署，才能让已上线 Batch-01 页面获得这次渲染与构建级防护。

## 10. 长期防护机制

从本次 PR 开始，未来 Batch-02、Batch-03 或任何新页面发布时：

1. 如果 Markdown Front Matter 进入正文，Build 会失败。
2. 如果正文出现内部 Draft / Publishing / Image 字段，Build 会失败。
3. 如果图片元数据暴露到客户页面，Build 会失败。
4. 如果 Batch 页面缺少基础 SEO / Schema，Build 会失败。
5. 如果产品上下文污染，例如 Chrome 页面出现 Rubber Hex 默认内容，Build 会失败。

结论：建议 Merge 本 PR 后重新部署正式网站。
