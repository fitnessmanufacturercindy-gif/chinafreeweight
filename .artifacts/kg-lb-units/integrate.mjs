import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,s)=>fs.writeFileSync(p,s);
const copies=JSON.parse(read('content/i18n/kg-lb-free-weight-units-copy.json'));
const pt=copies.find(x=>x.locale==='pt-BR'); pt.imageCopy[0][0]='Dois halteres hexagonais sem identificação em superfície de estúdio';
copies.find(x=>x.locale==='es').imageCopy[1][0]='Discos negros sin identificación agrupados en varias pilas';
copies.find(x=>x.locale==='nl').sections[0].text=copies.find(x=>x.locale==='nl').sections[0].text.replace('Het Nederlandse woord pond','Het [Nederlandse woord pond](https://www.woorden.org/woord/pond)');
write('content/i18n/kg-lb-free-weight-units-copy.json',JSON.stringify(copies,null,2)+'\n');
let guide=read('content/i18n/dumbbell-head-retention-guide.ts')
 .replaceAll('dumbbell-head-retention-copy.json','kg-lb-free-weight-units-copy.json')
 .replaceAll('dumbbell-head-handle-construction-guide','kg-lb-free-weight-ordering-guide')
 .replaceAll('2026-09-02','2026-09-03')
 .replace(/const files = \[[^\n]+\];\r?\n/,'')
 .replaceAll('pre-shipment-inspection-free-weights','weight-plate-tolerance-bulk-order-guide')
 .replaceAll('/resources/pre-shipment-inspection-dumbbells-weight-plates','/resources/weight-plate-weight-tolerance-bulk-orders')
 .replace('  return files.map((file, index)', '  const files = [`${copy.locale.toLowerCase()}-weight-assortment`, `${copy.locale === "es" ? "fr" : "es"}-weight-assortment`, `${copy.locale === "ko" ? "en" : "ko"}-weight-assortment`];\n  return files.map((file, index)')
 .replaceAll('dumbbell-joint-','unit-guide-').replaceAll('joint-','unit-')
 .replaceAll('/assets/resources/dumbbell-head-retention/','/assets/resources/kg-lb-units/')
 .replaceAll('dumbbellHeadRetentionEnglishPost','kgLbFreeWeightEnglishPost')
 .replaceAll('withDumbbellHeadRetentionGuide','withKgLbFreeWeightGuide')
 .replace('["dumbbell head retention", "welded dumbbell construction", "OEM dumbbell inspection", "wholesale rubber hex dumbbells"]','["kilogram versus pound weight plates", "dual unit dumbbell markings", "private label weight units", "dumbbell pair quantities"]')
 .replace('dumbbell joint specification and bulk acceptance','specify nominal units and markings for wholesale free weights');
write('content/i18n/kg-lb-free-weight-units-guide.ts',guide);
let manifest=read('content/i18n/multilingual-manifest.ts');
manifest='import { withKgLbFreeWeightGuide } from "./kg-lb-free-weight-units-guide";\n'+manifest;
manifest=manifest.replace('const retiredContentIds = new Set([','const kgLbFreeWeightManifest = withKgLbFreeWeightGuide(dumbbellHeadRetentionManifest);\n\nconst retiredContentIds = new Set([')
 .replace('...dumbbellHeadRetentionManifest,','...kgLbFreeWeightManifest,').replace('entities: dumbbellHeadRetentionManifest.entities','entities: kgLbFreeWeightManifest.entities');
write('content/i18n/multilingual-manifest.ts',manifest);
let blog=read('app/resources/blogData.ts');
const block=blog.match(/  const dumbbellHeadRetentionPost: ResourcePost = \{[\s\S]+?\n  \};/)[0];
blog='import { kgLbFreeWeightEnglishPost } from "../../content/i18n/kg-lb-free-weight-units-guide";\n'+blog;
blog=blog.replace(block,block+'\n\n'+block.replaceAll('dumbbellHeadRetention','kgLbFreeWeight')).replace('commercialOlympicBarbellPost, dumbbellHeadRetentionPost]','commercialOlympicBarbellPost, dumbbellHeadRetentionPost, kgLbFreeWeightPost]');
write('app/resources/blogData.ts',blog);
let test=read('tests/i18n/infrastructure.test.ts');
test=test.replace('const originalMediaGuideIds = new Set([','const originalMediaGuideIds = new Set([\n  "kg-lb-free-weight-ordering-guide",');
test=test.replaceAll('entityId === "dumbbell-head-handle-construction-guide" ?','["dumbbell-head-handle-construction-guide", "kg-lb-free-weight-ordering-guide"].includes(entityId) ?');
test=test.replace(/(assert.equal\(contentRepository.listPublished\(\{ locale: "[^"]+" \}\).length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b)
 .replace('listPublished().length, 1157','listPublished().length, 1170')
 .replace(/(assert.equal\((?:english|portuguese|spanish|german|french|vietnamese|swedish|italian|arabic|korean|indonesian|polish|dutch)(?:Urls)?\.length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b)
 .replace('new Set(urls).size, 1170','new Set(urls).size, 1183')
 .replace('new Set(entries.map((entry) => entry.url)).size, 1169','new Set(entries.map((entry) => entry.url)).size, 1182')
 .replace(/(assert.equal\(guides.length, )(25|20)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b);
write('tests/i18n/infrastructure.test.ts',test);
let audit=read('scripts/audit-dumbbell-head-retention.ts').replaceAll('dumbbell-head-handle-construction-guide','kg-lb-free-weight-ordering-guide').replace('Dumbbell head retention guide audit passed','KG/LB free-weight guide audit passed');
audit='import { getAllResourcePosts } from "../app/resources/blogData";\n'+audit;
audit=audit.replace('  const allPaths = new Set(allPublished.map(({ version }) => version.publicPath));','  const legacyPosts = getAllResourcePosts();\n  const allPaths = new Set([...allPublished.map(({ version }) => version.publicPath), ...legacyPosts.map((post) => `/resources/${post.slug}`)]);');
audit=audit.replace('    for (const other of allPublished.filter(', '    if (locale === "en") for (const post of legacyPosts.filter((post) => `/resources/${post.slug}` !== version.publicPath)) {\n      if (titleSimilarity(`${version.title} ${version.h1}`, `${post.seoTitle ?? post.title} ${post.title}`) >= 0.78 || post.primaryKeyword === version.schemaData.extra?.primaryKeyword) failures.push(`${label}: legacy article conflict ${post.slug}`);\n    }\n\n    for (const other of allPublished.filter(');
write('scripts/audit-kg-lb-free-weight-units.ts',audit);
let render=read('scripts/verify-dumbbell-head-retention-rendering.mjs');
render=render.replace(/const routes = \[[\s\S]*?\n\];/,`const routes = ${JSON.stringify(copies.map(c=>[c.locale,c.path]),null,2)};`)
 .replaceAll('dumbbell-head-retention','kg-lb-units').replace('Dumbbell head retention rendering verified','KG/LB free-weight rendering verified');
render=render.replace('const failures = [];','const failures = [];\nconst results = [];');
render=render.replace('  if (checkLinks) {','  results.push({ locale, route, viewportLabel, ...result, visibleText: undefined, auditText: undefined });\n  if (checkLinks) {');
render=render.replace('  for (const [locale, route] of routes) await inspectPage', '  page.on("pageerror", (error) => failures.push(`Browser error: ${error.message}`));\n  for (const [locale, route] of routes) await inspectPage');
render=render.replace('if (failures.length) {','fs.writeFileSync(path.join(artifactDirectory, new URL(baseUrl).hostname === "127.0.0.1" ? "render-local.json" : "render-production.json"), JSON.stringify({baseUrl,checkedAt:new Date().toISOString(),results,failures},null,2));\n\nif (failures.length) {');
write('scripts/verify-kg-lb-free-weight-units-rendering.mjs',render);
const pkg=JSON.parse(read('package.json'));pkg.scripts['audit:kg-lb-units']='tsx scripts/audit-kg-lb-free-weight-units.ts';pkg.scripts['verify:kg-lb-units']='node scripts/verify-kg-lb-free-weight-units-rendering.mjs';write('package.json',JSON.stringify(pkg,null,2)+'\n');
console.log('Registered 13 editions, three images and six FAQs per edition.');
