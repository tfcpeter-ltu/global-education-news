import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html'];
const cache='20260910-two-hero-v15';
await mkdir('public',{recursive:true});

function jpegSize(buf){
  let i=2;
  const sof=new Set([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf]);
  while(i+9<buf.length){
    if(buf[i]!==0xff){i++;continue}
    const marker=buf[i+1];
    if(sof.has(marker)) return {height:buf.readUInt16BE(i+5),width:buf.readUInt16BE(i+7)};
    if(marker===0xd8||marker===0xd9){i+=2;continue}
    const len=buf.readUInt16BE(i+2);
    if(!len||len<2) break;
    i+=2+len;
  }
  return null;
}

const heroParts=[];
for(let i=1;i<=6;i++){
  heroParts.push((await readFile(`hero-approved-${String(i).padStart(2,'0')}.b64`,'utf8')).replace(/\s+/g,''));
}
const hero=Buffer.from(heroParts.join(''),'base64');
const heroDim=jpegSize(hero);
if(hero.length<60000||hero[0]!==0xff||hero[1]!==0xd8||!heroDim||heroDim.width!==1138||heroDim.height!==262){
  throw new Error(`Invalid main hero JPEG: ${hero.length} bytes ${heroDim?`${heroDim.width}x${heroDim.height}`:'unknown'}`);
}
await writeFile('public/cap-hero-cute.jpg',hero);

const featureParts=[];
for(let i=1;i<=10;i++) featureParts.push(await readFile(`feature-hero-v13-part-${String(i).padStart(2,'0')}.bin`));
const feature=Buffer.concat(featureParts);
const brand=feature.subarray(4,12).toString('ascii');
if(feature.length<50000||brand!=='ftypavif') throw new Error(`Invalid feature AVIF: ${feature.length} bytes brand=${brand}`);
await writeFile('public/cap-feature-hero-v13.avif',feature);

for(const file of files){
  const r=await fetch(base+file+'?v='+cache);
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  await writeFile(`public/${file}`,await r.text(),'utf8');
}

for(const asset of ['ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','practice-ui-v4.js','notebook-ui-v2.js','auth-ui-v2.js','product-core-v1.js','launch-ui-v1.js','complete-preview-v1.js','complete-portal-v1.js','membership-sync-v1.js','membership-merge-v1.js','remove-duplicate-plans-v1.js','cute-theme-v1.js']){
  await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');
}

const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;min-height:100%;overflow:hidden;background:#f5faff}iframe{border:0;width:100%;height:100dvh;min-height:100vh;display:block;background:#f5faff}</style></head><body><iframe id="capapp" src="/final-v3.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/launch-ui-v1.js?v=${cache}"></script><script src="/complete-preview-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/membership-merge-v1.js?v=${cache}"></script><script src="/remove-duplicate-plans-v1.js?v=${cache}"></script><script src="/cute-theme-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');

const complete=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>AI Complete 會員中心｜CAP English AI</title><meta name="robots" content="noindex,nofollow"><style>.membermain{max-width:1180px;margin:auto;padding:0 18px 60px}section{scroll-margin-top:72px}</style></head><body><main class="membermain"><div id="completePortal"></div><section id="weekly" class="cpSection"><h2>Weekly Mock</h2></section><section id="history" class="cpSection"><h2>歷屆題</h2></section><section id="analysis" class="cpSection"><h2>弱點分析</h2></section></main><script src="/question-engine-v2.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/complete-portal-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/complete.html',complete,'utf8');
console.log(`CAP English AI built: main hero ${hero.length} bytes + feature hero ${feature.length} bytes + cache ${cache}`);
