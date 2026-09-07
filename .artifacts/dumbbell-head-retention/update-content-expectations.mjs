import fs from 'node:fs';
const p='tests/i18n/infrastructure.test.ts';let s=fs.readFileSync(p,'utf8');
// Add this separately audited original-media article to the existing media registry.
s=s.replace('  "commercial-olympic-barbell-buying-guide"\n]);','  "commercial-olympic-barbell-buying-guide",\n  "dumbbell-head-handle-construction-guide"\n]);');
s=s.replace('const expectedGuideFaqCount = (entityId: string) =>','const expectedOriginalImageCount = (entityId: string) => entityId === "dumbbell-head-handle-construction-guide" ? 3 : 5;\nconst expectedGuideFaqCount = (entityId: string) => entityId === "dumbbell-head-handle-construction-guide" ? 6 :');
s=s.replaceAll('isOriginalMediaGuide ? version.images.length === 5','isOriginalMediaGuide ? version.images.length === expectedOriginalImageCount(entity.id)').replaceAll('isOriginalMediaGuide ? 5 : 3','isOriginalMediaGuide ? expectedOriginalImageCount(entity.id) : 3');
// Every published locale gains exactly one article; unrelated fixture counts remain intact.
s=s.replace(/(assert\.equal\(contentRepository\.listPublished\(\{ locale: "[^"]+" \}\)\)\.length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b);
s=s.replace('contentRepository.listPublished().length, 1144','contentRepository.listPublished().length, 1157');
s=s.replaceAll('blogWords.length, 31','blogWords.length, 32').replaceAll('blogs.length, 31','blogs.length, 32').replaceAll('blog: 29','blog: 30');
s=s.replace(/(assert\.equal\((?:english|portuguese|spanish|german|french|vietnamese|swedish|italian|arabic|korean|indonesian|polish|dutch)Urls\.length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+(a.includes('englishUrls')?2:1))+b);
// English's existing /oem route is in the main sitemap but not the localized repository index.
s=s.replace('new Set(urls).size, 1156','new Set(urls).size, 1170');
const start=s.indexOf('  assert.equal(english.length, 111)');const end=s.indexOf('  for (const path of',start);
const block=s.slice(start,end).replace(/(\.length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b).replace('size, 1156','size, 1169');s=s.slice(0,start)+block+s.slice(end);
s=s.replace(/(assert\.equal\(new Set\([^\n]+\)\.size, )93/g,'$194');
s=s.replace('assert.equal(german.length, 99)','assert.equal(german.length, 100)');
for(const name of ['french','vietnamese','swedish','italian'])s=s.replace(`assert.equal(${name}.length, 94)`,`assert.equal(${name}.length, 95)`);
s=s.replace('assert.equal(guides.length, 24)','assert.equal(guides.length, 25)');
// Only the four European/Vietnamese full-guide suites include the new article; Korean's historical subset stays fixed.
const koreanStart=s.indexOf('test("Korean A-tier');s=s.slice(0,koreanStart).replaceAll('assert.equal(guides.length, 19)','assert.equal(guides.length, 20)')+s.slice(koreanStart);
fs.writeFileSync(p,s);console.log('Updated explicit coverage snapshots and article-specific media/FAQ expectations.');
