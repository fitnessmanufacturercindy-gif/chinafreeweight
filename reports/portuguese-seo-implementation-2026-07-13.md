# PowerBaseFit 葡萄牙语 SEO 多语言基础建设修改报告

日期：2026-07-13

目标域名：`https://www.powerbasefitequipment.com`

主要市场：巴西（pt-BR）；兼顾葡萄牙

发布状态：仅完成代码与本地提交，未发布

## 1. 已创建 URL

- `/pt/`
- `/pt/products/`
- `/pt/products/dumbbells/`
- `/pt/products/weight-plates/`
- `/pt/products/bumper-plates/`
- `/pt/oem-private-label/`
- `/pt/factory/`
- `/pt/blog/`

其中 6 个核心页面已完成 800–1500 个葡萄牙语单词的商业 SEO 正文；产品聚合页和 Blog 入口已建立，为后续扩展提供稳定 URL。

## 2. 页面 SEO 内容

| 页面 | 正文词数 | 主要搜索主题 |
|---|---:|---|
| `/pt/` | 1066 | fabricante de equipamentos fitness；equipamentos profissionais para academias |
| `/pt/products/dumbbells/` | 1028 | halteres profissionais；halteres sextavados de borracha；OEM |
| `/pt/products/weight-plates/` | 963 | anilhas de peso；anilhas olímpicas；fabricante |
| `/pt/products/bumper-plates/` | 965 | bumper plates olímpicos；academias；marca própria |
| `/pt/oem-private-label/` | 1044 | equipamentos fitness OEM；private label；marca própria |
| `/pt/factory/` | 889 | fabricante de equipamentos fitness；fábrica na China |

所有核心页面包含：自然葡语 H1、产品/服务介绍、商业应用、主要特点、技术规格、OEM 选项、PowerBaseFit 优势、采购说明和真实搜索型 FAQ。内容以巴西葡萄牙语为优先，没有逐句复制或直接机器翻译英文页面。

Meta Description 已统一控制为 150–160 字符，并包含产品、制造商或 OEM/private label 商业意图。

## 3. 技术 SEO

- 葡语页面使用自引用 canonical，基于正式域名生成绝对 URL。
- 新页面输出 `en`、`pt` 和 `x-default` alternate links。
- 英文首页、Dumbbells、Weight Plates 与 Factory 对应页补充互惠葡语 hreflang；英文正文和 URL 未改动。
- `sitemap.xml` 增加全部 8 个葡萄牙语入口。
- `robots.txt` 保持全站允许抓取，并引用正式 sitemap。
- 默认站点域名从旧的 `chinafreeweight.com` 修正为 `powerbasefitequipment.com`，避免 canonical 和 sitemap 指向错误域名。
- 页面为静态生成，可直接被 Googlebot 获取正文，无需客户端执行后再加载 SEO 内容。

## 4. 结构化数据与 AI Search

- 所有 6 个核心页面：`FAQPage`、`BreadcrumbList`。
- 3 个产品页面：`Product`，含品牌、制造商、分类、图片和页面 URL。
- OEM 页面：`Service`，含服务提供方和目标市场。
- 首页和工厂页：`Organization`。
- Blog 入口：`Blog`；预留文章 Title、Meta、Slug、Category、Author、FAQ 和 Internal Links 数据结构。

FAQ 回答采用“先直接回答，再补充选择依据”的结构，便于 Google 摘要与 AI 搜索理解。

## 5. 图片 SEO

新增描述性 WebP 文件：

- `equipamentos-profissionais-academias.webp`
- `halteres-borracha-profissionais.webp`
- `anilhas-olimpicas-profissionais.webp`
- `bumper-plates-olimpicos.webp`
- `equipamentos-fitness-oem-marca-propria.webp`
- `fabrica-equipamentos-fitness-china.webp`

所有葡语页面图片使用产品和应用相关的葡萄牙语 ALT。Bumper plate 图片已执行真实 WebP 转换，不是只修改扩展名。

## 6. 内部链接与多语言导航

- `/pt/` 路由下的页头和页脚切换为葡萄牙语导航。
- 产品、OEM、工厂和 Blog 入口之间建立内部链接。
- 保留 English 切换入口和原英文导航行为。
- Blog 入口已链接回 Halteres、Anilhas 和 OEM 页面；后续文章可以继续使用预留的内部链接字段。

## 7. 验证结果

| 检查项 | 结果 |
|---|---|
| TypeScript 类型检查 | 通过 |
| Next.js 生产构建 | 通过，124 个静态页面生成 |
| 6 个核心葡语 URL HTTP 状态 | 全部 200 |
| 正文 800–1500 词 | 通过 |
| Meta 150–160 字符 | 通过 |
| canonical | 通过 |
| en/pt hreflang | 通过 |
| sitemap 条目 | 通过 |
| robots 抓取允许 | 通过 |
| FAQ/Breadcrumb Schema | 通过 |
| 产品页 Product Schema | 通过 |
| 桌面端 1440px 视觉检查 | 通过，无横向溢出 |
| 移动端 390px 视觉检查 | 通过，无横向溢出 |
| 浏览器控制台与资源请求 | 通过，无 404 或脚本错误 |

可重复运行的本地检查：

- `npm run seo:pt:check`
- `node scripts/visual-qa-pt.mjs`（需本地开发服务器）
- `npm run typecheck`
- `npm run build`

## 8. 范围说明

- 未创建 SEO 管理系统、Dashboard 或发布自动化。
- 未批量翻译全部英文产品详情页。
- 未自动发布或推送到线上。
- 当前只完成首批核心页面、产品入口和 Blog 基础结构；后续可按关键词优先级扩展具体产品页和葡语文章。
