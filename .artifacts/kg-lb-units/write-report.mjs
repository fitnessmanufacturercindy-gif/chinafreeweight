import fs from 'node:fs';
const root='C:/Users/Kloe/Documents/chinafreeweight独立站';
const copies=JSON.parse(fs.readFileSync('content/i18n/kg-lb-free-weight-units-copy.json','utf8'));
const render=JSON.parse(fs.readFileSync('.artifacts/kg-lb-units/render-production.json','utf8'));
const http=JSON.parse(fs.readFileSync('.artifacts/kg-lb-units/production-http-checks.json','utf8'));
if(render.failures.length||http.failures.length||new Set(render.results.map(r=>r.route)).size!==13)throw new Error('Production verification incomplete');
const names={en:'英语','pt-BR':'葡萄牙语（巴西）',es:'西班牙语',de:'德语',fr:'法语',vi:'越南语',sv:'瑞典语',it:'意大利语',nl:'荷兰语',ar:'阿拉伯语',ko:'韩语',id:'印度尼西亚语',pl:'波兰语'};
const table=copies.map(c=>`| ${names[c.locale]} | [${c.title}](https://www.chinafreeweight.com${c.path}) |`).join('\n');
const report=`# ChinaFreeWeight 每日内容报告 · 2026-09-03

已完成：13 个现有语言各发布 1 篇采购指南，正式部署与上线后验收通过。未发布：无。阻塞：无。

## 今天的主题与真实问题

公斤与磅的哑铃、杠铃片订货规格：20 kg 与 45 lb 的差别、真正公斤规格与换标、双单位换算及取整、单只/成对数量、装箱重量和补单识别。

核对 Google/PAA、Bing 可见结果、Reddit、行业论坛、制造商资料及 Quora 可用性。西语 PAA 的“怎样判断哑铃是公斤还是磅”、法语 lb/kg 换算，以及实际用户混用单位的讨论，支持本次问题选择。没有取得搜索量，不宣称流量或增长。Bing 结果偏泛、一个 Google 请求失败且 Quora 正文不可访问，已如实记录，未编造来源内容。

关键词机会包括 kg vs lb dumbbells and weight plates、dual unit dumbbell markings、private label weight units、dumbbell pair quantities。新文与原有重量公差、称重、MOQ、材料及普通采购询价指南区分，相关细节链接回既有页面。

## 各语言标题与正式 URL

| 语言 | 已发布文章 |
|---|---|
${table}

## 检查结果

- 内容去重：扫描全部 1,157 个原有仓库发布版本、英文旧文章、线上 1,170 个 sitemap URL 及各语言。新增 13 个版本无路径、Title、Description、H1 或主关键词冲突。
- 内容与配图：13/13 专项审计通过。每篇 6 组 FAQ、3 张图，13 张独立原创主图，真实摄影感、无品牌、无乱码；均明确为示意。26 个 WebP/AVIF 文件为 1536×1024，沿用响应式 picture、尺寸声明及本地化 alt。无虚构客户、订单、价格、起订量、交期或测试结果。
- 公开文字：全站 1,183 页扫描零发现。新文的正文、标题、描述、图片文字和用户相关结构化文本通过严格禁词检查。
- 工程：34/34 测试通过；Typecheck、Lint、Build 通过。Lint 零错误、4 条已有未使用变量警告（3 条内容文件及 1 条历史临时验证脚本）。构建生成 1,197 个静态页面；所有既有内容专项审计和 30/30 历史文章渲染检查通过。
- 浏览器：13 篇新文、29 次桌面/平板/手机视口检查通过；正确显示 13 张独立主图，无标题裁切、页面横向溢出或浏览器执行错误。HTTP、图片加载、尺寸、产品/文章内链、单一 canonical、完整 13 语言及 x-default、文章/FAQ/面包屑/图片 Schema、阿语 RTL 均通过。
- 正式门禁：1,183 页和 10 个机器端点，零失败。手机 Performance 98、LCP 2.449 秒、CLS 0；桌面 Performance 100、LCP 601 毫秒、CLS 0。保留 2 条历史大图提示，未降低任何阈值。一次 Lighthouse 在写完完整测量 JSON 后清理 Windows 临时目录出现 EPERM；项目既有逻辑读取有效报告，全部测量指标通过。

截图复核发现并修复了三种语言模板优先显示英文封面，以及德语长标题手机裁切的问题。新增精确主图路径和文字范围检查。印尼语采购文案按已有规则本地化；测试的数量断言与每语言独立主图要求同步更新。用户原有改动保留。

## 部署与生产验收

Vercel 部署 \`dpl_2SyQkvUJS96eHuZC1m5dChCnn3Mu\` 为 READY，已绑定 [正式站点](https://www.chinafreeweight.com/)。上线前参考版本为 \`dpl_DsLaQZEyxtSFhc41XiyhFZ2vUHGA\`。

上线后 13/13 正式 URL 再次通过桌面与手机验证；${http.checks.length}/${http.checks.length} 个页面、图片和 sitemap 请求返回 200。每篇新文进入主、博客和语言 sitemap，13 张主图进入图片 sitemap。生产检查完成时间：${render.checkedAt}。

## 核查记录

- [研究与去重记录](${root}/docs/research/kg-lb-free-weight-buyer-research-2026-09-03.md)
- [质量门禁完整报告](${root}/reports/quality-gate/2026-09-03T04-15-00-271Z-quality-gate.md)
- [生产浏览器检查](${root}/.artifacts/kg-lb-units/render-production.json)
- [生产 HTTP 与 sitemap 检查](${root}/.artifacts/kg-lb-units/production-http-checks.json)
- [图像描述](${root}/.artifacts/kg-lb-units/image-prompts.json)与[原文件映射](${root}/.artifacts/kg-lb-units/image-map.json)

报告生成时间：${new Date().toISOString()}。
`;
fs.mkdirSync('docs/reports',{recursive:true});
fs.writeFileSync('docs/reports/daily-content-2026-09-03.md',report);
console.log('Daily report written with all 13 formal titles and URLs.');
