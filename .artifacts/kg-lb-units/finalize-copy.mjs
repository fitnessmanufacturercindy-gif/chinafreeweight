import fs from 'node:fs';
const p='content/i18n/kg-lb-free-weight-units-copy.json';
const copies=JSON.parse(fs.readFileSync(p,'utf8'));
const i=copies.findIndex(c=>c.locale==='id');
copies[i]=JSON.parse(JSON.stringify(copies[i]).replaceAll('private label','merek sendiri').replaceAll('Packing list','Daftar kemasan'));
fs.writeFileSync(p,JSON.stringify(copies,null,2)+'\n');
