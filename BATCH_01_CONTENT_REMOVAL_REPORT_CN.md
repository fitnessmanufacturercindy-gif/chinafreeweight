# Batch-01 Content Removal & Cleanup V1.0

执行时间：2026-07-15

目标：下线并清理 Batch-01 已发布的 5 个页面，避免继续维护不符合人工审核标准的内容。

## 1. 删除页面列表

| URL | 处理方式 |
| --- | --- |
| `/manufacturer/chrome-dumbbell-manufacturer` | 410 Gone |
| `/manufacturer/urethane-dumbbell-manufacturer` | 410 Gone |
| `/oem/oem-dumbbells` | 410 Gone |
| `/oem/private-label-dumbbells` | 410 Gone |
| `/manufacturer/weight-plate-manufacturer` | 410 Gone |

## 2. 410 检查结果

本地生产环境验证：

| URL | HTTP 状态 | Robots |
| --- | --- | --- |
| `/manufacturer/chrome-dumbbell-manufacturer` | 410 | `x-robots-tag: noindex` |
| `/manufacturer/urethane-dumbbell-manufacturer` | 410 | `x-robots-tag: noindex` |
| `/oem/oem-dumbbells` | 410 | `x-robots-tag: noindex` |
| `/oem/private-label-dumbbells` | 410 | `x-robots-tag: noindex` |
| `/manufacturer/weight-plate-manufacturer` | 410 | `x-robots-tag: noindex` |

## 3. Sitemap 结果

已从 `app/sitemap.ts` 移除以下 URL：

- `/manufacturer/chrome-dumbbell-manufacturer`
- `/manufacturer/urethane-dumbbell-manufacturer`
- `/oem/oem-dumbbells`
- `/oem/private-label-dumbbells`
- `/manufacturer/weight-plate-manufacturer`

本地生产环境 `/sitemap.xml` 检查结果：以上 5 个 URL 均不存在。

保留页面：

- `/manufacturer/rubber-hex-dumbbell-manufacturer`

## 4. 内部链接检查

已扫描 `app/`、`content/`、`public/`：

结果：除 `middleware.ts` 中的 410 下线列表外，没有发现指向这 5 个 URL 的内部链接、canonical、图片引用或内容引用。

## 5. 删除文件列表

页面内容：

- `content/manufacturer/chrome-dumbbell-manufacturer.md`
- `content/manufacturer/urethane-dumbbell-manufacturer.md`
- `content/oem/oem-dumbbells.md`
- `content/oem/private-label-dumbbells.md`
- `app/manufacturer/weight-plate-manufacturer/page.tsx`

图片资产：

- `public/seo-assets/chrome-dumbbell-manufacturer/`
- `public/seo-assets/urethane-dumbbell-manufacturer/`
- `public/seo-assets/oem-dumbbells/`
- `public/seo-assets/private-label-dumbbells/`
- `public/seo-assets/weight-plate-manufacturer/`

## 6. 保留内容

已保留：

- `production-runs`
- 审计日志
- 其他正常页面
- Blog / Resources
- Factory
- Projects
- 产品页
- 已上线正常页面

## 7. Build 结果

结果：PASS

执行：

```bash
npx tsc --noEmit
npm run build
```

构建结果显示静态页面数量从 122 减少到 117，符合下线 5 个页面的预期。

## 8. SEO 结论

本次处理符合下线不合格内容的 SEO 要求：

1. 页面不再正常返回 200。
2. 页面返回 410 Gone，明确表示永久废弃。
3. 页面带 `x-robots-tag: noindex`。
4. Sitemap 已移除 5 个 URL。
5. 内部链接已清理。
6. 未影响其他产品页、Blog、Factory、Projects 或正常页面。

## 9. 后续建议

PR 合并并部署 Production 后，建议：

1. 在 Google Search Console 中重新提交 sitemap。
2. 对这 5 个 URL 使用 URL 检查，确认 Google 看到 410。
3. 不建议为这 5 个 URL 设置 301，因为内容质量不符合标准，不应把权重传递到临时替代页。
