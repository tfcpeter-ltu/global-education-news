import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html'];
const cache='20260909-cute-hero-v10-chunked';
await mkdir('public',{recursive:true});

const heroParts=[];
for(let i=1;i<=10;i++){
  heroParts.push((await readFile(`hero-v10-${String(i).padStart(2,'0')}.b64`,'utf8')).trim());
}
const hero=Buffer.from(heroParts.join(''),'base64');
if(hero.length!==21985||hero[0]!==0xff||hero[1]!==0xd8||hero[hero.length-2]!==0xff||hero[hero.length-1]!==0xd9){
  throw new Error(`Invalid reconstructed hero JPEG: ${hero.length} bytes`);
}
await writeFile('public/cap-hero-cute.jpg',hero);
const heroData=`data:image/jpeg;base64,${hero.toString('base64')}`;
const innerHeroScript=`<script>(function(){'use strict';const DATA=${JSON.stringify(heroData)};function mount(){const nav=document.querySelector('.v3nav');if(!nav)return;let hero=document.getElementById('cuteHeroV1');if(!hero){hero=document.createElement('section');hero.id='cuteHeroV1';hero.setAttribute('aria-label','CAP English AI 主視覺');nav.insertAdjacentElement('afterend',hero)}let img=hero.querySelector('img');if(!img){img=document.createElement('img');img.alt='用 AI 學英文，把時間花在真正不會的地方｜LTU 國際學術中心 CAP English AI';hero.appendChild(img)}if(img.getAttribute('src')!==DATA)img.setAttribute('src',DATA);hero.style.display='block'}setTimeout(mount,80);setTimeout(mount,400);setTimeout(mount,1200);setInterval(mount,2500)})();<\/script>`;

for(const file of files){
  const r=await fetch(base+file+'?v='+cache);
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  let html=await r.text();
  html=html.includes('</body>')?html.replace('</body>',innerHeroScript+'</body>'):html+innerHeroScript;
  await writeFile(`public/${file}`,html,'utf8');
  console.log('copied and injected complete hero into',file);
}
for(const asset of ['ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','practice-ui-v4.js','notebook-ui-v2.js','auth-ui-v2.js','product-core-v1.js','launch-ui-v1.js','complete-preview-v1.js','complete-portal-v1.js','membership-sync-v1.js','membership-merge-v1.js','remove-duplicate-plans-v1.js','cute-theme-v1.js']){
  await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');
}

const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;min-height:100%;overflow:hidden;background:#f5faff}iframe{border:0;width:100%;height:100dvh;min-height:100vh;display:block;background:#f5faff}</style></head><body><iframe id="capapp" src="/final-v3.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/launch-ui-v1.js?v=${cache}"></script><script src="/complete-preview-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/membership-merge-v1.js?v=${cache}"></script><script src="/remove-duplicate-plans-v1.js?v=${cache}"></script><script src="/cute-theme-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');

const complete=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>AI Complete 會員中心｜CAP English AI</title><meta name="robots" content="noindex,nofollow"><style>.membermain{max-width:1180px;margin:auto;padding:0 18px 60px}section{scroll-margin-top:72px}</style></head><body><main class="membermain"><div id="completePortal"></div><section id="weekly" class="cpSection"><h2>Weekly Mock</h2></section><section id="history" class="cpSection"><h2>歷屆題</h2></section><section id="analysis" class="cpSection"><h2>弱點分析</h2></section></main><script src="/question-engine-v2.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/complete-portal-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/complete.html',complete,'utf8');
console.log(`CAP English AI built: reconstructed complete hero ${hero.length} bytes + cache v10`);
