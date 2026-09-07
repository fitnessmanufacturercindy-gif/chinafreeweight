import fs from 'node:fs';
import sharp from 'sharp';
const root='C:/Users/Kloe/.codex/generated_images/01a0602b-2e42-7ea0-a20a-0de9cca65c21';
const images=[['exec-115fdc18-51ef-49f2-9e8d-22bc93b00666.png','fixed-dumbbell-head-handle'],['exec-c6678375-82c6-4dba-bfeb-12ece42c9d59.png','dumbbell-handle-shoulder-detail'],['exec-5211d4b1-07c8-41f9-b909-971c226e52dc.png','dumbbell-head-support-packaging']];
const out='public/assets/resources/dumbbell-head-retention';fs.mkdirSync(out,{recursive:true});
for(const [src,name] of images){
 fs.copyFileSync(`${root}/${src}`,`.artifacts/dumbbell-head-retention/${name}.png`);
 await sharp(`${root}/${src}`).resize(1536,1024).webp({quality:78}).toFile(`${out}/${name}.webp`);
 await sharp(`${root}/${src}`).resize(1536,1024).avif({quality:48,bitdepth:8}).toFile(`${out}/${name}.avif`);
 console.log(name,fs.statSync(`${out}/${name}.webp`).size,fs.statSync(`${out}/${name}.avif`).size);
}
