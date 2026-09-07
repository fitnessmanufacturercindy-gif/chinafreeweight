# 2026-09-03：kg / lb 自由重量采购研究

## 选题与边界

今天选择公斤与磅规格、双单位标识、单只/成对数量以及补单识别。面向经销商、进口商、品牌方和健身房采购。实体为 `kg-lb-free-weight-ordering-guide`，新增全部 13 个现有语言版本。

避免与既有重量公差、哑铃称重、采购询价、最低起订量和材料指南争夺同一主题。先后排除橡胶异味（保养指南已覆盖）和混合重量起订量（多语言 MOQ 指南已有相同范围）。文章不提供假定价格、数量门槛、交期、认证或客户案例。

## 可核查研究

- [NIST Mass Calibrations](https://www.nist.gov/system/files/documents/calibrations/sp250-31.pdf)：核对 avoirdupois pound 的固定质量换算。1 lb = 0.45359237 kg；45 lb = 20.41165665 kg；20 kg ≈ 44.092 lb。所有文章把这些值标成计算例子，与实测重量、公差分开。
- [IVANKO FAQ](https://ivankobarbell.com/pages/faqs)：对部分产品线区分真正公斤规格与改标的磅产品，支撑“换标不等于改变质量”的采购问题。不得推断本厂使用相同模具或工艺。
- [Eleiko plates catalogue](https://enterprise.eleiko.com/en/pc/weight-plates/136)：可见 KG 与 LB 系列，支撑按具体型号确认规格，不能据此声称本厂库存或供货能力。
- [Texas Power Bars：20KG vs 45LB](https://texaspowerbars.com/blogs/the-barbell-journal/20kg-vs-45lb-power-bar-does-bar-weight-matter)：行业生产商对相近名义规格的区分，作为邻近产品问题记录，不将文章改为重复杠铃选型。
- [Reddit：Mixing kg and lbs](https://www.reddit.com/r/GYM/comments/10b34io/mixing_kg_and_lbs/)：用户讨论公斤杠与磅片混合记录，作为真实困惑，不把评论当作制造证据。
- [Reddit：mix and match kg and lbs dumbbells](https://www.reddit.com/r/MacroFactor/comments/1s2v0qm/mix_and_match_kg_and_lbs_dumbbells/)：实际记录单位混用的问题，不引用个人表现数据。
- [Starting Strength 论坛](https://startingstrength.com/resources/forum/general-q-and-a/22058-microloading-mixing-plates-kg-lb.html)：小增量与混合单位的行业社区讨论，用于确认问题类型，不直接采用未经验证的建议。
- [Woorden.org：pond](https://www.woorden.org/woord/pond)：荷兰语词典将 pond 释为半公斤；荷兰语版本因此强调国际订单明确写 lb，避免口语量词歧义。

## 搜索记录与可用性

通过项目已有 DataForSEO 凭据请求 Google 与 Bing 实时自然结果，原始响应保存在本次 `.artifacts/kg-lb-units/serp-*.json`，未保存或打印凭据。

Google 西语 PAA 包括“怎样知道哑铃用磅还是公斤”“一磅等于多少公斤”；葡语出现 kg/lb 差别与转换；法语出现 livre/kilo 区别、kg 转 livres、lb 转 kg。它们说明常见提问方式，未取得搜索量，不能宣称量级或排名机会已量化。

首个英语 Google API 请求返回 Internal SE Server Error；已通过另一公开搜索入口补查相近单位差别和生产商资料。Bing 请求成功，但结果多数泛化到 kilogram 定义和转换器，相关性不足，没有把它包装成采购趋势证据。德语结果偏向商品目录，PAA 与本主题相关性有限。

Quora 英文限定域名检索跑题。葡语结果找到“Qual é a diferença entre libra e kilograma?”页面，但页面直接访问失败；只记录可见问题与访问限制，未声称读过回答或引用回答内容。未绕过登录或访问限制。

## 去重范围

写作前读取全部仓库已发布实体及各语言正文，共 1,157 个版本；线上主 sitemap 含 1,170 个 URL，博客 sitemap 含 316 个 URL。差额包括英文旧路由。另检查线上资源入口与 OEM 页面，以及旧版英文文章列表。基线清单和线上快照保存在本次 artifacts 中。

仓库中没有专门以 kg/lb 订货规格为主意图的文章。公差指南虽提到双单位，但中心任务是测量与验收；新文将测量细节链接回公差指南。静态审计同时比较所有同语言文章以及旧版英文文章的标题、主关键词和路径；保持原标题相似度门限，不降低历史深度门禁。

## 本地化和配图

13 个版本分别编写标题、介绍、术语、FAQ、询盘 CTA 和图片文字，并增加本地采购环节：葡语 peça/par、德语 Mengeneinheit/Gewichtseinheit、法语 poids 用法、越南语 chiếc/đôi/bộ、韩语 낱개/한 쌍/세트、印尼语 pcs/pasang/set、意大利语 listino/coppia、荷兰语 pond 歧义、阿语混排方向、波兰语 szt./para/zestaw、瑞典语器材架分区等。数字例子保持同一事实基础。

为每篇生成一张独立原创主图，共 13 张，另为每篇配两张本次生成的说明图。已检查全部图像：头部与手柄结构正确，盘孔合理，无 Logo、文字或生成标记。图片仅作为无标识产品示意，不暗示其质量已测量或来自客户项目。WebP 与 AVIF 均为 1536×1024，保留尺寸声明和项目响应式 picture 方案。

## 优先回答的采购问题

1. 20 kg 与 45 lb 是否可以当成同一规格？
2. 更换铭牌能否把磅产品变成公斤产品？
3. 双单位数值如何换算、取舍小数并审核？
4. 标称单只重量、对数与整箱重量如何区分？
5. 补货如何维持原型号、单位与重量递增序列？

候选表达：kg vs lb dumbbells and weight plates；dual unit dumbbell markings；kilogram weight plate ordering；private label weight units；dumbbell pair quantities。研究结果仅确认问题相关性，不声称流量、销量或询盘增长。

## 发布前实际修正

图片数量检查无法发现共用模板优先显示英文封面的问题。截图复核发现印尼语、荷兰语和波兰语受到影响，已给本组文章启用明确的本地化主图选项，保留旧文章的封面选择。渲染脚本现在验证每页主图的精确路径，而非只检查图片数量。

德语原 H1 的单个复合词在手机上被容器裁切，但页面整体没有横向溢出。已重写为更短、更自然的标题，并添加文字范围裁切检查。最终 13 个语言、29 次视口检查均无裁切，13 张独立主图全部正确。印尼语正文中的英文采购词按已有语言规则换为当地表达。

测试中的已发布页面数量和图片策略断言随新增内容更新。旧文章仍执行原有规则；新组明确要求每语言独立主图、每篇 3 张图片及 6 个 FAQ。最终 34/34 测试、类型检查、构建以及所有内容检查通过。
