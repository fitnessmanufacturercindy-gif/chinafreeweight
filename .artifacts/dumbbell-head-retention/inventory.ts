import fs from 'node:fs';
import {contentRepository} from '../../lib/content/repository';
const entries=contentRepository.listPublished().map(({entity,version})=>({id:entity.id,type:entity.type,locale:version.locale,path:version.publicPath,title:version.title,h1:version.h1,description:version.description}));
fs.writeFileSync('.artifacts/dumbbell-head-retention/inventory-before.json',JSON.stringify(entries,null,2));
console.log(JSON.stringify({total:entries.length,locales:[...new Set(entries.map(x=>x.locale))],englishBlogs:entries.filter(x=>x.type==='blog'&&x.locale==='en'),relevantTargets:entries.filter(x=>x.locale==='en'&&/hex|dumbbells-category|inspection|rfq|factory|sample/i.test(x.id))},null,2));
async function main(){for (const p of ['/sitemap.xml','/sitemaps/blogs.xml','/sitemaps/languages.xml']){
 const r=await fetch('https://www.chinafreeweight.com'+p);const body=await r.text();
 fs.writeFileSync('.artifacts/dumbbell-head-retention/live-'+p.replaceAll('/','-'),body);
 console.log(JSON.stringify({path:p,status:r.status,urls:[...body.matchAll(/<loc>(.*?)<\/loc>/g)].length,conflicts:[...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]).filter(x=>/head-retention|loose|joint|solta|fixation|locker|fijacion/i.test(x))}));
}}
void main();
