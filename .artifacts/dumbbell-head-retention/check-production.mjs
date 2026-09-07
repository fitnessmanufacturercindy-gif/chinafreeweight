import fs from 'node:fs';
const base='https://www.chinafreeweight.com';
const copies=JSON.parse(fs.readFileSync('content/i18n/dumbbell-head-retention-copy.json','utf8'));
const assets=['fixed-dumbbell-head-handle','dumbbell-handle-shoulder-detail','dumbbell-head-support-packaging'].flatMap(name=>['webp','avif'].map(ext=>`/assets/resources/dumbbell-head-retention/${name}.${ext}`));
const endpoints=['/','/robots.txt','/sitemap.xml','/sitemap-index.xml','/sitemaps/blogs.xml','/sitemaps/images.xml','/sitemaps/languages.xml'];
const checks=[];const failures=[];
for(const route of [...copies.map(x=>x.path),...assets,...endpoints]){
 const response=await fetch(base+route);const bytes=await response.arrayBuffer();
 const record={route,status:response.status,bytes:bytes.byteLength};checks.push(record);
 if(response.status!==200)failures.push(`${route}: ${response.status}`);
 if(route==='/sitemaps/blogs.xml'){
  const body=new TextDecoder().decode(bytes);
  for(const copy of copies)if(!body.includes(base+copy.path))failures.push(`Blog sitemap missing ${copy.path}`);
 }
 if(route==='/sitemaps/images.xml'){
  const body=new TextDecoder().decode(bytes);
  for(const asset of assets.filter(x=>x.endsWith('.webp')))if(!body.includes(asset))failures.push(`Image sitemap missing ${asset}`);
 }
}
const report={checkedAt:new Date().toISOString(),base,checks,failures};
fs.writeFileSync('.artifacts/dumbbell-head-retention/production-http-checks.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({checked:checks.length,failures}));if(failures.length)process.exit(1);
