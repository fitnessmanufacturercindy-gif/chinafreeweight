# ChinaFreeWeight 国际化迁移与实施计划

状态：等待架构确认

原则：阶段门控制；任何阶段未通过不得进入下一阶段

## 1. 当前基线

当前项目特征：

- Next.js 15 App Router。
- 英语页面直接位于 `app/`。
- 产品数据分散在各分类 `productData.ts`。
- Blog/Resources 使用 `content/resources/*.md` 与 `blogData.ts`。
- Manufacturer Landing 使用 `content/manufacturer/*.md` 与动态路由。
- FAQ、Metadata 与 Schema 部分写在页面组件内。
- 没有 i18n 配置、Middleware、Locale Provider 或统一 Language Switcher。
- 历史 `app/pt` 属于复制式静态路由，不作为目标架构基础。

迁移的第一约束是保持现有英语 URL、页面内容、视觉结构和 SEO 信号不变。

## 2. 阶段总览

| 阶段 | 内容 | 是否生成小语种页面 | 是否改英语内容 | 发布条件 |
|---|---|---:|---:|---|
| 1 | 架构与迁移方案 | 否 | 否 | 本文档确认 |
| 2 | Locale Framework 骨架 | 否 | 否 | 技术测试通过 |
| 3 | 英语路由迁移到统一模板 | 否 | 否 | 英语 parity 通过 |
| 4 | 统一内容与 SEO 数据层 | 否 | 否 | 数据 parity 通过 |
| 5 | Language Switcher 与发布资格 | 否 | 否 | 无可公开非英语路由 |
| 6 | 单一语言试点 | 是，仅经确认语言 | 否 | 内容审核通过 |
| 7 | SEO Control Center 对接 | 按审批发布 | 否 | 发布工作流通过 |
| 8 | 扩展至更多语言 | 是 | 否 | 每语言独立审批 |

当前任务只完成阶段 1。

## 3. 阶段 2：Locale Framework 骨架

目标：建立运行框架，但保持所有非英语 locale 为 `public: false`，不生成小语种页面。

实施范围：

1. 引入与当前 Next.js 版本兼容的 `next-intl`。
2. 建立 Locale Registry、routing、request 与 navigation 层。
3. 建立 Middleware，默认语言采用无前缀模式。
4. 建立 `app/[locale]` 根布局能力。
5. 设置动态 `<html lang>` 与 `dir`。
6. 明确排除 `/api`、`/_next`、静态文件和系统文件。
7. 建立仅英语可公开的发布资格判断。

阶段门：

- `/` 仍为 200。
- `/products/...` URL 不改变。
- `/en/...` 按统一策略重定向或不公开。
- `/pt/...`、`/es/...` 等仍不可公开访问。
- 英语 Metadata、Schema、robots、sitemap 无变化。

## 4. 阶段 3：英语路由迁移

目标：把现有英语页面移动到统一 `[locale]` 模板树，同时外部 URL 完全不变。

迁移顺序：

1. Root Layout 与全局导航。
2. 首页。
3. Product Category。
4. Product Detail。
5. Resources Hub 与 Article Detail。
6. Projects/Case。
7. Factory、Contact。
8. Manufacturer Landing。
9. 404、robots、sitemap。

每迁移一类页面，执行英语 parity 对比：

- HTTP 状态
- 最终 URL
- Title、Description、Canonical
- H1 与正文文本
- JSON-LD
- 图片 URL 与 ALT
- 内部链接
- 表单行为
- 桌面与移动截图
- Lighthouse 基准

此阶段不重写文案、不优化英语、不改变 slug。

## 5. 阶段 4：内容模型迁移

目标：把现有分散内容接入统一 Content Repository，同时保持渲染结果不变。

### 5.1 Product

迁移来源：

- `app/products/dumbbells/productData.ts`
- `app/products/weight-plates/productData.ts`
- `app/products/racks-benches/productData.ts`
- `app/products/gym-accessories/productData.ts`

迁移方式：

- 为每个产品分配稳定实体 ID。
- 不改变现有英语 slug。
- 将材料、规格、图片、应用、OEM 选项与 buyer notes 归一化。
- 将英语显示文案写入英语 `LocalizedDocument`。

### 5.2 Blog / Resources

迁移来源：

- `content/resources/*.md`
- `app/resources/blogData.ts`

迁移方式：

- Frontmatter 映射到 `SeoFields` 与发布字段。
- 正文映射为 RichText/Media/FAQ/CTA Blocks。
- `/resources` 英语 URL 保持不变。

### 5.3 Landing Page

迁移来源：

- `content/manufacturer/*.md`
- `app/manufacturer/[slug]/page.tsx`

迁移方式：

- 保留现有内容质量检查语义。
- 内部备注与客户可见内容继续分离。
- FAQ、Breadcrumb 与主 Schema 改为结构化字段来源。

### 5.4 Case / Projects

迁移来源：

- `app/projects/page.tsx`
- 当前项目图片与案例数据

迁移方式：

- 建立 Case 实体。
- Case Hub 与 Case Detail 使用共享模板。

阶段门：英语页面逐 URL 内容哈希与关键 DOM parity 通过。

## 6. 阶段 5：集中 SEO 层

目标：页面组件不再分别维护 SEO 逻辑。

实施顺序：

1. Canonical Builder。
2. Published Alternate Resolver。
3. Metadata Builder。
4. Open Graph Builder。
5. Schema Factory。
6. Breadcrumb Builder。
7. Sitemap Repository 与分片。
8. SEO 一致性检查。

阶段门：

- 所有英语 canonical 与迁移前相同。
- 非英语未发布时不出现 hreflang。
- sitemap 只包含英语。
- FAQ 可见内容与 FAQPage 完全一致。
- Product、Article、Breadcrumb schema 校验通过。

## 7. 阶段 6：Language Switcher

目标：实现基于实体路由映射的语言切换，但只显示已有发布版本。

行为验收：

- 英语实体只有英语版本时，不显示虚假的语言入口。
- 有多个发布版本时显示对应语言。
- Product Detail 保持相同实体。
- 本地化 slug 通过 Route Registry 解析。
- Query/hash 按白名单保留。
- 移动端、键盘、屏幕阅读器可用。
- 阿拉伯语方向切换不影响英语布局。

## 8. 阶段 7：单一语言试点

按照 B2B 多语言 SEO 的保守发布原则，第一次只允许一个语言试点。语言、页面范围与市场目标需要单独确认。

试点发布前必须具备：

- 术语库
- 品牌与产品名规则
- 禁用词
- 单位与数字格式规则
- 本地搜索意图核对
- Metadata 审核
- FAQ 审核
- 图片 ALT 审核
- 内部链接审核
- hreflang 双向检查
- canonical 检查
- sitemap 检查
- 人工语言审核

任何试点页面都不能通过英语 fallback 形成公开语言页面。

## 9. 阶段 8：SEO Control Center 发布流程

### 9.1 工作流

```text
English Draft
→ English Review
→ English Approved
→ Select Target Locales
→ AI Localization
→ Terminology Validation
→ Local Market Review
→ SEO Review
→ Approved
→ Scheduled
→ Published Snapshot
→ Revalidation
→ Search/Sitemap Verification
```

### 9.2 发布包

每次发布产生不可变发布包：

```ts
type PublicationSnapshot = {
  releaseId: string;
  entityId: string;
  locale: string;
  documentVersion: number;
  routeVersion: number;
  publishedAt: string;
  contentHash: string;
  seoHash: string;
  reviewerIds: string[];
};
```

发布包同时控制正文、路由、Metadata、Schema、hreflang 与 sitemap，避免部分字段先上线。

### 9.3 发布事件

```text
localization.published
localization.updated
localization.archived
route.changed
locale.enabled
locale.disabled
```

网站按事件重新验证对应详情页、集合页、相关内容和 sitemap。

## 10. 新增内容流程

### Product

1. 创建产品实体与不可翻译业务数据。
2. 创建英语源文档。
3. 审核并发布英语。
4. 控制面按目标语言生成本地化任务。
5. 各语言独立审核和发布。

### Blog

1. 创建 Blog 实体、作者和分类关系。
2. 发布英语版本。
3. 按语言本地化 Title、Meta、Slug、正文、FAQ 与内部链接。
4. 发布后自动进入语言 Blog Hub 与 sitemap。

### Case

1. 创建 Case 实体和项目事实。
2. 关联产品、行业、市场和图片。
3. 各语言独立发布叙述内容与 SEO。

### Landing Page

1. 创建 Landing 实体并选择模板。
2. 配置 Blocks、CTA、关系和英语路由。
3. 各语言配置本地路由与内容。

上述流程不新增页面组件。

## 11. 风险登记

| 风险 | 影响 | 控制点 |
|---|---|---|
| 英语 URL 被加 `/en` | 英文 SEO 波动 | `as-needed` 前缀与逐 URL parity |
| 未翻译页面显示英语 | 重复内容 | 公开环境禁止 fallback |
| 字符串拼接切换语言 | 跳错页面 | 实体 ID + Route Registry |
| Slug 本地化后 hreflang 不对称 | alternate 失效 | Published Alternate Resolver |
| FAQ 文本与 Schema 不一致 | 结构化数据风险 | 单一 FAQ 数据源 |
| 20+ 语言包进入客户端 | 性能下降 | 服务端按 locale/namespace 加载 |
| RTL 破坏布局 | 阿拉伯语不可用 | Locale direction + logical CSS |
| AI 内容直接发布 | 品牌与事实风险 | 强制人工审核状态门 |
| Sitemap 先于页面发布 | 抓取 404 | 原子发布快照 |
| 多分支部署覆盖语言版本 | 线上语言消失 | 发布来源与快照校验 |

## 12. 回滚设计

- 代码迁移按页面类型分批提交。
- 每个阶段保留英语 parity 基线。
- Locale 可通过 Registry 关闭公开状态，不删除内容。
- 单个语言版本可回滚至上一 Publication Snapshot。
- 路由回滚与内容、Metadata、hreflang、sitemap 同步。
- 英语迁移失败时回滚路由层，不改内容源。

## 13. 测试矩阵

### 路由

- 默认英语无前缀。
- 所有公开 locale 前缀正确。
- 不支持 locale 返回 404。
- 未发布语言版本返回 404。
- 静态资源与 API 不被 locale middleware 重写。

### SEO

- canonical 自引用。
- hreflang 双向且只包含已发布语言。
- `x-default` 指向英语。
- sitemap 与公开路由一致。
- Open Graph URL 与 canonical 一致。
- Schema `inLanguage`、URL 和 Breadcrumb 正确。

### 内容

- 产品事实跨语言一致。
- 可翻译字段不存在意外 fallback。
- FAQ 显示与 Schema 一致。
- 内部链接只指向已发布目标。

### UI

- Language Switcher 保持当前实体。
- LTR/RTL 正确。
- 移动导航可用。
- 长德语文本与无空格日语文本不破坏布局。
- 表单标签、错误消息与提交数据 locale 正确。

### 性能

- 页面只加载当前 locale 所需 messages。
- 语言数量增长不线性增加客户端 JS。
- sitemap 分片与构建时间在阈值内。

## 14. 实施提交策略

建议的未来提交边界：

1. `chore(i18n): add locale registry and routing foundation`
2. `refactor(i18n): move english routes under shared locale tree`
3. `refactor(content): add unified content repository`
4. `refactor(seo): centralize multilingual metadata and schema`
5. `feat(i18n): add entity-aware language switcher`
6. `feat(localization): add first approved locale`
7. `feat(publishing): connect localization publication snapshots`

每个提交独立验证，不在同一提交中同时迁移英语路由和发布新语言。

## 15. 第一阶段交付与停止点

本阶段交付物仅为：

- `docs/i18n-architecture.md`
- `docs/i18n-migration-plan.md`

停止点：等待架构确认。未经确认，不进入 Locale Framework 实现，不创建小语种路由，不迁移英语页面，不部署，不合并 `main`。
