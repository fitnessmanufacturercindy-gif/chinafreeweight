import fs from 'node:fs';
for (const line of fs.readFileSync('.env.local','utf8').split(/\r?\n/)) {
  const m=line.match(/^([A-Z0-9_]+)=(.*)$/);
  if(m&&!process.env[m[1]]) process.env[m[1]]=m[2].replace(/^(["'])(.*)\1$/,'$2');
}
const dir='.artifacts/kg-lb-units';
const tasks=[['google','kg vs lb weight plates 20 kg 45 lb difference',2840,'en'],['bing','"kg" "lb" "weight plates"',2840,'en'],['google','site:quora.com kg pounds dumbbells difference',2840,'en'],['google','halteres kg libras diferença',2076,'pt'],['google','mancuernas kilos libras diferencia',2724,'es'],['google','Hantelscheiben kg lbs Unterschied',2276,'de'],['google','haltères kg livres différence',2250,'fr']];await Promise.all(tasks.map(async([engine,keyword,location_code,language_code],i)=>{
 const r=await fetch(`https://api.dataforseo.com/v3/serp/${engine}/organic/live/advanced`,{method:'POST',headers:{Authorization:'Basic '+Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64'),'Content-Type':'application/json'},body:JSON.stringify([{keyword,location_code,language_code,device:'desktop',depth:10}])});
 const d=await r.json();fs.writeFileSync(`${dir}/serp-${i}.json`,JSON.stringify(d,null,2));
 console.log(JSON.stringify({engine,keyword,status:d.tasks?.[0]?.status_message,items:d.tasks?.[0]?.result?.[0]?.items?.filter(x=>['organic','people_also_ask'].includes(x.type)).slice(0,6).map(x=>({type:x.type,title:x.title,url:x.url,questions:x.items?.map(y=>y.title)}))}));
}));

