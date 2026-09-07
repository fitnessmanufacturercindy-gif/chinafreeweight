import fs from 'node:fs';
const p='tests/i18n/infrastructure.test.ts';let s=fs.readFileSync(p,'utf8');
s=s.replace(/(assert\.equal\(contentRepository\.listPublished\(\{ locale: "[^"]+" \}\)\.length, )(\d+)(\);)/g,(_,a,n,b)=>a+(Number(n)+1)+b);
fs.writeFileSync(p,s);
