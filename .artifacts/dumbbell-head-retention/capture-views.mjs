import fs from 'node:fs';
import {chromium} from '@playwright/test';
const copies=JSON.parse(fs.readFileSync('content/i18n/dumbbell-head-retention-copy.json','utf8'));
const base=process.env.BASE_URL||'http://127.0.0.1:3000';const tag=base.includes('chinafreeweight.com')?'production':'local';
const browser=await chromium.launch({headless:true});const errors=[];
for(const locale of ['en','ar','ko','de']){
 const copy=copies.find(x=>x.locale===locale);const page=await browser.newPage({viewport:{width:locale==='de'?834:390,height:locale==='de'?1112:844}});
 page.on('pageerror',e=>errors.push(`${locale}: ${e.message}`));
 await page.goto(base+copy.path,{waitUntil:'networkidle'});
 await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});
 await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}await Promise.all([...document.querySelectorAll('main img')].map(img=>img.decode().catch(()=>{})));scrollTo(0,0);});
 await page.screenshot({path:`.artifacts/dumbbell-head-retention/${tag}-${locale}-top.png`});
 await page.getByRole('heading',{name:copy.table.heading,exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:`.artifacts/dumbbell-head-retention/${tag}-${locale}-table.png`});
 if(locale==='ar'){
  await page.getByRole('heading',{name:copy.cta[0],exact:true}).scrollIntoViewIfNeeded();
  await page.screenshot({path:`.artifacts/dumbbell-head-retention/${tag}-${locale}-cta.png`});
 }
 await page.close();
}
await browser.close();console.log(JSON.stringify({base,errors}));if(errors.length)process.exit(1);
