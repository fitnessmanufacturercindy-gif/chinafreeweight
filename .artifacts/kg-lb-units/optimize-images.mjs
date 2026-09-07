import fs from 'node:fs';
import sharp from 'sharp';
const images=JSON.parse(fs.readFileSync('.artifacts/kg-lb-units/image-map.json','utf8'));
const out='public/assets/resources/kg-lb-units';
fs.mkdirSync(out,{recursive:true});
const tiles=[];
for(let i=0;i<images.length;i++){
 const item=images[i], name=item.locale.toLowerCase();
 const source=sharp(item.path).resize(1536,1024,{fit:'cover'});
 await source.clone().webp({quality:82}).toFile(`${out}/${name}-weight-assortment.webp`);
 await source.clone().avif({quality:52,effort:6}).toFile(`${out}/${name}-weight-assortment.avif`);
 const tile=await source.clone().resize(384,256).png().toBuffer();
 tiles.push({input:tile,left:(i%4)*384,top:Math.floor(i/4)*288});
 const label=Buffer.from(`<svg width="384" height="32"><rect width="100%" height="100%" fill="white"/><text x="12" y="23" font-size="20">${item.locale}</text></svg>`);
 tiles.push({input:label,left:(i%4)*384,top:Math.floor(i/4)*288+256});
 console.log(name,fs.statSync(`${out}/${name}-weight-assortment.webp`).size,fs.statSync(`${out}/${name}-weight-assortment.avif`).size);
}
await sharp({create:{width:1536,height:1152,channels:3,background:'#eee'}}).composite(tiles).jpeg({quality:90}).toFile('.artifacts/kg-lb-units/image-contact-sheet.jpg');
