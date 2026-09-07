import fs from 'node:fs';
import sharp from 'sharp';
const copies=JSON.parse(fs.readFileSync('content/i18n/kg-lb-free-weight-units-copy.json','utf8'));
for(const kind of ['desktop','mobile']){
 const width=kind==='desktop'?480:300,height=kind==='desktop'?410:650;
 const pieces=[];
 for(let i=0;i<copies.length;i++){
  const locale=copies[i].locale,source=sharp(`.artifacts/kg-lb-units/${locale}-${kind}.png`),meta=await source.metadata();
  const crop=await source.extract({left:0,top:0,width:meta.width,height:Math.min(meta.height,kind==='desktop'?1230:845)}).resize(width,height-30,{fit:'contain',background:'#fff'}).png().toBuffer();
  pieces.push({input:crop,left:(i%4)*width,top:Math.floor(i/4)*height});
  pieces.push({input:Buffer.from(`<svg width="${width}" height="30"><rect width="100%" height="100%" fill="white"/><text x="10" y="22" font-size="18">${locale}</text></svg>`),left:(i%4)*width,top:Math.floor(i/4)*height+height-30});
 }
 await sharp({create:{width:width*4,height:height*4,channels:3,background:'#eee'}}).composite(pieces).jpeg({quality:85}).toFile(`.artifacts/kg-lb-units/${kind}-contact-sheet.jpg`);
}
