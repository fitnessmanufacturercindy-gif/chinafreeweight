import fs from 'node:fs';
for (const line of fs.readFileSync('.env.local','utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]]=m[2].replace(/^(["'])(.*)\1$/,'$2');
}
const dir='.artifacts/dumbbell-head-retention';
fs.mkdirSync(dir,{recursive:true});
const queries=[
 ['google','why do rubber hex dumbbell heads come loose'],
 ['google','dumbbell head handle construction welded press fit'],
 ['bing','rubber hex dumbbell manufacturer head handle construction'],
 ['google','site:quora.com dumbbell head loose'],
 ['google','Kurzhantel Kopf locker verschweißt'],
 ['google','haltere cabeça solta academia'],
 ['google','mancuerna cabeza floja gimnasio']
];
await Promise.all(queries.map(async([engine,keyword],i)=>{
 const response=await fetch(`https://api.dataforseo.com/v3/serp/${engine}/organic/live/advanced`,{method:'POST',headers:{Authorization:'Basic '+Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64'),'Content-Type':'application/json'},body:JSON.stringify([{keyword,location_code:2840,language_code:'en',device:'desktop',depth:10}])});
 const data=await response.json();fs.writeFileSync(`${dir}/serp-${i}.json`,JSON.stringify(data,null,2));
 const result=data.tasks?.[0]?.result?.[0];
 console.log(JSON.stringify({engine,keyword,status:data.tasks?.[0]?.status_message,items:result?.items?.filter(x=>['organic','people_also_ask','related_searches'].includes(x.type)).map(x=>({type:x.type,title:x.title,url:x.url,description:x.description,items:x.items?.map(y=>({title:y.title,url:y.url}))})).slice(0,12)}));
}));
