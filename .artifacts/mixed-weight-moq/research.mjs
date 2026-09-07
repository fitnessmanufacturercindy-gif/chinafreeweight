import fs from 'node:fs';
for (const line of fs.readFileSync('.env.local','utf8').split(/\r?\n/)) {
  const m=line.match(/^([A-Z0-9_]+)=(.*)$/);
  if(m&&!process.env[m[1]]) process.env[m[1]]=m[2].replace(/^(["'])(.*)\1$/,'$2');
}
const dir='.artifacts/mixed-weight-moq';
const tasks=[['google','custom dumbbells minimum order quantity per weight',2840,'en'],['bing','"dumbbells" "MOQ" "custom"',2840,'en'],['google','site:quora.com dumbbells minimum order quantity',2840,'en'],['google','halteres personalizados pedido mínimo por peso',2076,'pt'],['google','mancuernas personalizadas pedido mínimo pesos',2724,'es'],['google','Kurzhanteln eigenes Logo Mindestbestellmenge',2276,'de'],['google','haltères personnalisés quantité minimum commande',2250,'fr']];
await Promise.all(tasks.map(async([engine,keyword,location_code,language_code],i)=>{
 const r=await fetch(`https://api.dataforseo.com/v3/serp/${engine}/organic/live/advanced`,{method:'POST',headers:{Authorization:'Basic '+Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64'),'Content-Type':'application/json'},body:JSON.stringify([{keyword,location_code,language_code,device:'desktop',depth:10}])});
 const d=await r.json();fs.writeFileSync(`${dir}/serp-${i}.json`,JSON.stringify(d,null,2));
 console.log(JSON.stringify({engine,keyword,status:d.tasks?.[0]?.status_message,items:d.tasks?.[0]?.result?.[0]?.items?.filter(x=>['organic','people_also_ask'].includes(x.type)).slice(0,6).map(x=>({type:x.type,title:x.title,url:x.url,questions:x.items?.map(y=>y.title)}))}));
}));
