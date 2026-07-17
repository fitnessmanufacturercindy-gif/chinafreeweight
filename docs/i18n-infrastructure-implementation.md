# ChinaFreeWeight 国际化基础设施实施说明

状态：第二阶段完成，非英语发布开关全部关闭

## 1. 当前运行边界

- 英语继续使用现有无前缀 URL 和现有页面文件。
- `pt-BR`、`es`、`de`、`fr`、`it`、`nl`、`ru`、`ar`、`ja`、`ko` 已登记为可支持 locale，但 `public` 均为 `false`。
- 内部葡语代码为 `pt-BR`，未来公开前缀为 `/pt`。
- `content/i18n/manifest.json` 当前没有任何内容实体。
- `/pt`、`/es` 等已保留前缀由 middleware 返回 404，并附带 `X-Robots-Tag: noindex, nofollow`。
- `/en/...` 永久重定向到原英语无前缀路径。
- sitemap 仍为原有 112 条英语 URL，没有非英语 URL。
- Language Switcher 未接入生产 Header；可用语言不足两种时组件也会返回空。

## 2. 请求与发布门

```text
Request
  → middleware 检查 locale 前缀
  → /en 去前缀重定向
  → 非公开 locale 返回 404
  → 已公开 locale 进入 app/[locale]/[[...segments]]
  → Content Repository 按 locale + publicPath 精确查找
  → 仅 publishStatus=published 且存在 publishedAt 的版本可返回
  → Metadata / Schema / Template 从同一 PublishedContent 生成
```

运行时不做英语正文 fallback。某语言没有已发布版本时，页面不会借用英语内容返回 200。

## 3. Locale Registry

统一配置位于 `i18n/locale-registry.ts`。每个 locale 包含：

- 路由代码
- 内部内容代码
- hreflang
- 公开前缀
- LTR / RTL
- enabled
- public
- default
- fallbackLocale（只供编辑流程参考，公开页面不使用正文 fallback）

新增语言时只扩展 Locale Registry、`routeLocales` 和内容数据，不创建语言专属页面树。

## 4. 统一内容模型

`ContentEntity` 以稳定 ID 表示一个业务实体；slug 不是实体身份。

```text
ContentEntity
  id
  type
  defaultLocale
  versions[locale]
    translationStatus
    reviewStatus
    publishStatus
    slug
    publicPath
    title / description / h1
    body blocks
    FAQ
    author
    schemaData
    images + alt
    internalLinks
    canonicalData
    hreflangData
    updatedAt / publishedAt
    version
```

支持的内容类型覆盖 Home、Product、Product Category、Blog、Case、Landing Page、Factory、OEM、Projects、Contact、About、FAQ 与 Generic Page。

## 5. SEO 生成

### Metadata / Canonical / hreflang

- canonical 始终由当前已发布版本的 `publicPath` 生成，不能由正文手填到其他语言。
- hreflang 只遍历同一稳定内容 ID 下“已发布且 locale 已公开”的版本。
- `x-default` 只在英语版本实际已发布时输出，并指向英语无前缀 URL。
- Open Graph、Twitter 和 `content-language` 使用当前版本数据。

### Schema

统一 Schema Engine 支持 Organization、WebSite、WebPage、CollectionPage、Product、Offer、BreadcrumbList、Article、BlogPosting、FAQPage、ImageObject、VideoObject 和 Person。

所有本地化节点的 URL、name、description、FAQ、breadcrumb 与 `inLanguage` 都来自当前语言版本。

### Sitemap

- 现有英语 sitemap 生成逻辑保持不变。
- 新 Content Repository 输出通过统一 `buildPublishedSitemap` 合并。
- 自动排除非公开 locale、非 published 状态与 noindex 版本。
- 支持按 pages、products、blogs、cases、landings 及 locale 分组。
- 图片进入 Next.js sitemap；视频与图片的扩展记录由 Media Sitemap Builder 提供。

## 6. Language Switcher

切换流程：

```text
current publicPath
  → resolve current ContentEntity.id
  → repository.getPublishedVersion(id, targetLocale)
  → target version.publicPath
```

目标语言未公开或目标版本未发布时不生成选项，因此不会回首页、不会产生猜测 slug，也不会产生死链。

## 7. Translation Pipeline

接口支持以下状态：

```text
draft
→ generated
→ localized
→ review_required
→ approved
→ published
```

并支持 `rejected`、`archived`、撤回、重新本地化和不可变事件历史。Pipeline 只输出统一内容版本，不写 TSX，也不调用真实 AI。

## 8. 第三阶段发布一个 locale 的必要条件

1. 为目标内容创建独立语言版本，不能复制英语正文作为公开 fallback。
2. 完成本地关键词适配、术语校验与人工审核。
3. 将内容版本推进到 `published` 并写入 `publishedAt`。
4. 将目标 Locale Registry 的 `public` 改为 `true`。
5. 在 Preview 验证 HTML language、canonical、hreflang、Schema、sitemap 与 Language Switcher。
6. 将全站根布局迁入最终共享 locale 路由树，使公开语言页面的 `<html lang>` 与 `dir` 由 locale 直接生成。
7. 通过确认后才允许部署 Production。

第 6 项必须在首次非英语正式发布前完成。第二阶段没有可公开的非英语页面，因此当前英语根布局继续保持 `<html lang="en">`，避免把现有 118 个静态页面改为动态渲染。

## 9. 质量门

- `npm run typecheck`
- `npm test`
- `npm run lint`
- `npm run build`

自动测试覆盖英语 URL、locale 路由、未发布语言、canonical、hreflang、metadata、Schema language、sitemap、Language Switcher、内容校验与 Translation Pipeline。
