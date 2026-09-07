import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd().replaceAll('\\','/');const dir='.artifacts/dumbbell-head-retention';
const render=fs.readFileSync(`${dir}/render-production.log`,'utf8');
const http=JSON.parse(fs.readFileSync(`${dir}/production-http-checks.json`,'utf8'));
const gate=JSON.parse(fs.readFileSync('reports/quality-gate/2026-09-02T04-15-35-913Z-quality-gate.json','utf8'));
if(!render.includes('13/13 pages')||http.failures.length||gate.issues.some(x=>x.level==='fail'))throw new Error('Production verification or quality gate has not passed.');
const copies=JSON.parse(fs.readFileSync('content/i18n/dumbbell-head-retention-copy.json','utf8'));
const deployment='dpl_DsLaQZEyxtSFhc41XiyhFZ2vUHGA';const now=new Date().toISOString();
const languages={'en':'英语','pt-BR':'巴西葡语','es':'西语','de':'德语','fr':'法语','vi':'越南语','sv':'瑞典语','it':'意语','nl':'荷语','ar':'阿语','ko':'韩语','id':'印尼语','pl':'波兰语'};
const table=['| 语言 | 已发布标题与正式 URL |','|---|---|',...copies.map(c=>`| ${languages[c.locale]} | [${c.title}](https://www.chinafreeweight.com${c.path}) |`)].join('\n');
const report=`# ChinaFreeWeight 每日内容维护 — 2026-09-02

完成时间：${now}。

## 已完成

发布主题：固定哑铃头部与手柄的连接结构、证据审查和批量采购验收。全部 13 个现有语言版本各发布 1 篇专业 Blog，没有使用虚构客户案例。研究覆盖 Google、Bing、People Also Ask、Reddit、行业与制造商资料。Quora 因访问限制且结果无关，没有采用或编造其回答。

${table}

## 新发现的买家问题

- 焊接名称能否代表完整的连接结构？压配是否也可能配合焊接？
- 哪些重量段和结构变化需要纳入代表性样品？
- 拉拔、抗转与冲击资料需要哪些条件才能对应具体采购型号？
- 更换 Logo、头部外形或手柄后，何时需要重新进行技术评审？
- 经销商发现头部松动时，如何保留批次信息并处理相关库存？

关键词方向包括 dumbbell head-to-handle construction、dumbbell head retention、welded dumbbell construction、OEM dumbbell inspection 及各语言的采购表达。未宣称这些词具有未经验证的搜索量。

## 检查结果

- 去重：核对全部内容清单、现有语言和线上 sitemap；新增主题避开已存在的壶铃采购、日常保养、重量公差和杠铃选型内容。
- 内容：13/13 语言通过独立内容审计，唯一 Title/Description/H1/slug，6 组 FAQ，准确本地化图片文字、相关产品和采购内链；无虚构数字、客户、认证或测试结论。
- 公开文案：全站 1,170 页扫描零发现；新文章正文、元信息、alt 和结构化数据通过严格禁词检查。
- 工程：34/34 测试通过；Typecheck 通过；Lint 零错误、3 条历史未使用变量警告；Build 生成 1,184 个静态页面。现有内容审计和 30/30 历史文章渲染检查通过。
- 浏览器：13/13 新页面桌面和手机验证通过，包含平板抽查、阿语 RTL、HTTP/正文、图片解码、内链/产品链接、canonical、完整 hreflang、6 条 FAQ 与文章/面包屑/图片 Schema，无页面横向溢出。
- 正式门禁：1,170 个页面和 10 个机器端点，零失败。手机 Performance 98、LCP 2.436 秒、CLS 0；桌面 Performance 100、LCP 602 毫秒。保留 2 条历史大图提示。

首次门禁因首页手机 LCP 2.649 秒被拦截，未部署。发现隐藏桌面菜单的三张图片仍被手机下载；改为原生延迟加载与异步解码后，减少约 62 KB 首屏请求。重跑完整门禁通过，并验证桌面菜单图片与手机菜单功能。

英文模板按固定大小写识别 FAQ 标题，已按现有约定修正，并增加检查实际结构化问答数量。现有西语工厂指南补充了一句文件型号与版本核对说明，以满足已有内容深度检查。用户已有改动保留，未执行重置或删除。

## 配图和制作记录

使用内置图像生成能力，保留三张结构正确、无品牌的原创摄影感示意图；一张多余手柄的生成结果已淘汰。每个语言版本均使用本地化 alt 和说明，明确图片为示意，未冒充现场或测试证据。

- [产品全景](${root}/public/assets/resources/dumbbell-head-retention/fixed-dumbbell-head-handle.webp)
- [连接处特写](${root}/public/assets/resources/dumbbell-head-retention/dumbbell-handle-shoulder-detail.webp)
- [包装示意](${root}/public/assets/resources/dumbbell-head-retention/dumbbell-head-support-packaging.webp)
- [完整生成提示词及淘汰记录](${root}/${dir}/image-prompts.json)

三图均为 1536 × 1024，提供 WebP 和 8-bit AVIF，沿用项目响应式 picture 与尺寸声明。WebP 为约 97/115/120 KB；AVIF 为约 37/54/39 KB。

## 部署与生产验收

通过现有 Vercel 正式流程发布。部署 ${deployment}，状态 READY，已绑定 [正式站点](https://www.chinafreeweight.com/)。上线前回滚参考为 dpl_Hwhv3p8XYvcp1oGRKQB3PPJTVpLc。

上线后 13/13 正式文章再次通过桌面、平板、手机及 RTL 验证；${http.checks.length} 个文章、图片和机器端点请求全部返回 200。所有新文章进入 blog sitemap，三张主图进入 image sitemap。生产菜单检查通过，无隐藏菜单图片的首屏请求。

未发布：无。阻塞：无。

## 可核查记录

- [研究来源与去重记录](${root}/docs/research/dumbbell-head-retention-buyer-research-2026-09-02.md)
- [最终质量门禁](${root}/reports/quality-gate/2026-09-02T04-15-35-913Z-quality-gate.md)
- [生产浏览器验证](${root}/${dir}/render-production.log)
- [生产 HTTP 与 sitemap 验证](${root}/${dir}/production-http-checks.json)
`;
fs.mkdirSync('docs/reports',{recursive:true});fs.writeFileSync('docs/reports/daily-content-2026-09-02.md',report);
const memoryPath=path.join(process.env.CODEX_HOME||'C:/Users/Kloe/.codex','automations','chinafreeweight','memory.md');
fs.mkdirSync(path.dirname(memoryPath),{recursive:true});
fs.appendFileSync(memoryPath,`\n## ${now}\n\n- Published one independently localized fixed-dumbbell head-to-handle construction and bulk acceptance guide in all 13 active locales. Research: docs/research/dumbbell-head-retention-buyer-research-2026-09-02.md. Full titles/URLs and results: docs/reports/daily-content-2026-09-02.md. Avoid repeating this joint-retention / welding-versus-press-fit / model-specific evidence intent. The repository already has a kettlebell buying guide, so the prior suggested kettlebell topic was rejected.\n- Added three original unbranded studio images in responsive WebP/8-bit AVIF under public/assets/resources/dumbbell-head-retention; rejected a duplicated-handle generation. Each edition has six FAQs and localized image text.\n- Validation: 34/34 tests, typecheck and build (1184 static pages) pass; lint 0 errors/3 pre-existing warnings; all content audits; 1170-page visible-copy scan; 30/30 historical rendered articles; 13/13 new desktop/tablet/mobile/RTL render verification. Full gate passed for 1170 URLs and 10 endpoints, 0 failures/2 existing image advisories, mobile Performance 98/LCP 2436ms/CLS 0, desktop 100/LCP 602ms.\n- First full gate failed mobile LCP 2649ms. Fixed eager loading of three hidden desktop mega-menu images using native lazy loading plus async decode, removing about 62 KB and three mobile requests; verified both menus and reran the complete gate successfully. Do not relax thresholds or repeat this fix unnecessarily.\n- Updated explicit coverage expectations and media/FAQ counts for the new cluster. Corrected the English FAQ heading to the renderer's exact contract and verified six schema questions. Added one useful sentence to the existing Spanish factory guide to satisfy its existing depth gate. Existing user changes preserved.\n- Production deployment ${deployment} is READY at https://www.chinafreeweight.com. Previous deployment reference: dpl_Hwhv3p8XYvcp1oGRKQB3PPJTVpLc. Post-deploy 13/13 article browser checks and ${http.checks.length}/${http.checks.length} URL/asset/endpoint requests passed; new routes are in the blog sitemap and canonical images are in the image sitemap. No unpublished editions or blockers.\n`);
console.log(JSON.stringify({report:path.resolve('docs/reports/daily-content-2026-09-02.md'),memory:memoryPath,completedAt:now}));
console.log(table);
