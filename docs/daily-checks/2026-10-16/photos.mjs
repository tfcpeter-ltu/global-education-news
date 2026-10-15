import fs from 'node:fs/promises';
import sharp from 'sharp';
const p=JSON.parse(await fs.readFile('docs/image-licenses/2026-10-16.json','utf8'));
const tiles=[];
for(let i=0;i<p.length;i++){
 const b=await sharp(await fs.readFile(p[i].file)).rotate().resize(1600,1000,{fit:'inside',withoutEnlargement:true}).jpeg({quality:88}).toBuffer();await fs.writeFile(p[i].file,b);
 const tile=await sharp(b).resize(400,240,{fit:'cover'}).toBuffer();tiles.push({input:tile,left:(i%2)*400,top:Math.floor(i/2)*260});
}
await sharp({create:{width:800,height:1040,channels:3,background:'#ffffff'}}).composite(tiles).jpeg().toFile('docs/daily-checks/2026-10-16/photo-contact.jpg');
console.log('Photos resized; contact sheet ready.');


