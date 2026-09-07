import fs from 'node:fs';
import {contentRepository} from '../../lib/content/repository';
const entries=contentRepository.listPublished().map(({entity,version})=>({id:entity.id,type:entity.type,locale:version.locale,path:version.publicPath,title:version.title,h1:version.h1,description:version.description,keyword:version.schemaData.extra?.primaryKeyword,body:version.body}));
fs.writeFileSync('.artifacts/mixed-weight-moq/inventory-before.json',JSON.stringify(entries,null,2));
console.log(JSON.stringify({total:entries.length,locales:[...new Set(entries.map(x=>x.locale))],englishBlogs:entries.filter(x=>x.type==='blog'&&x.locale==='en').map(x=>({id:x.id,title:x.title})),titleConflicts:entries.filter(x=>/MOQ|minimum order|mixed.weight|pedido m[ií]nimo|Mindestbestellmenge|quantit[eé] minimum/i.test(x.title))},null,2));
async function main(){for(const p of ['/sitemap.xml','/sitemaps/blogs.xml','/sitemaps/languages.xml','/resources','/oem']){const r=await fetch('https://www.chinafreeweight.com'+p);const body=await r.text();fs.writeFileSync('.artifacts/mixed-weight-moq/live'+p.replaceAll('/','-'),body);console.log(JSON.stringify({path:p,status:r.status,urls:[...body.matchAll(/<loc>(.*?)<\/loc>/g)].length,conflicts:[...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]).filter(x=>/minimum-order|mixed-weight|mindestbestell|pedido-minimo|quantite-minimum/i.test(x))}));}}
void main();
