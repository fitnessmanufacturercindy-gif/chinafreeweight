import fs from 'node:fs';
const base='https://www.chinafreeweight.com';
const copies=JSON.parse(fs.readFileSync('content/i18n/kg-lb-free-weight-units-copy.json','utf8'));
const checks=[];
const failures=[];
const paths=[...copies.map(c=>c.path),...copies.flatMap(c=>['webp','avif'].map(ext=>`/assets/resources/kg-lb-units/${c.locale.toLowerCase()}-weight-assortment.${ext}`)),'/sitemap.xml','/sitemaps/blogs.xml','/sitemaps/images.xml','/sitemaps/languages.xml'];
const documents=new Map();
for(let i=0;i<paths.length;i+=6){
 await Promise.all(paths.slice(i,i+6).map(async path=>{
  try{
   const response=await fetch(base+path,{signal:AbortSignal.timeout(60000)});
   const type=response.headers.get('content-type');
   checks.push({path,status:response.status,type});
   if(response.status!==200) failures.push(`${path}: ${response.status}`);
   if(path.endsWith('.xml'))documents.set(path,await response.text());
   else if(path.endsWith('.webp')||path.endsWith('.avif')){
    if(!type?.startsWith('image/'))failures.push(`${path}: incorrect media type`);
    const bytes=(await response.arrayBuffer()).byteLength;
    if(bytes===0)failures.push(`${path}: empty image`);
   }else{
    const html=await response.text();
    if(!html.includes('kg-lb-units/'))failures.push(`${path}: new article media absent`);
   }
  }catch(error){failures.push(`${path}: ${error.message}`);}
 }));
}
for(const copy of copies){
 for(const sitemap of ['/sitemap.xml','/sitemaps/blogs.xml','/sitemaps/languages.xml'])if(!documents.get(sitemap)?.includes(base+copy.path))failures.push(`${copy.locale}: absent from ${sitemap}`);
 if(!documents.get('/sitemaps/images.xml')?.includes(`/assets/resources/kg-lb-units/${copy.locale.toLowerCase()}-weight-assortment.webp`))failures.push(`${copy.locale}: hero absent from image sitemap`);
}
fs.writeFileSync('.artifacts/kg-lb-units/production-http-checks.json',JSON.stringify({checkedAt:new Date().toISOString(),checks,failures},null,2));
console.log(JSON.stringify({requests:checks.length,failures},null,2));
if(failures.length)process.exit(1);
