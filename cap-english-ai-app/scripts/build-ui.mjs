import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html'];
const cache='20260910-feature-hero-v13';
await mkdir('public',{recursive:true});

const featureParts=[];
for(let i=1;i<=10;i++){
  featureParts.push(await readFile(`feature-hero-v13-part-${String(i).padStart(2,'0')}.bin`));
}
const feature=Buffer.concat(featureParts);
const box=feature.subarray(4,12).toString('ascii');
if(feature.length<50000 || !box.includes('ftyp') || !feature.subarray(8,16).toString('ascii').includes('avif')){
  throw new Error(`Invalid CAP feature AVIF: ${feature.length} bytes, signature=${box}`);
}
await writeFile('public/cap-feature-hero-v13.avif',feature);

const featureSrc=`/cap-feature-hero-v13.avif?v=${cache}`;
const innerHeroScript=`<script>(function(){'use strict';const SRC=${JSON.stringify(featureSrc)};function mount(){const nav=document.querySelector('.v3nav');if(!nav)return;document.getElementById('v3Hero')?.remove();document.querySelectorAll('.v3Quick,.v3Note,#cuteFeatureV1').forEach(x=>x.remove());let style=document.getElementById('capFeatureHeroV13Style');if(!style){style=document.createElement('style');style.id='capFeatureHeroV13Style';style.textContent='.v3Quick,.v3Note,#cuteFeatureV1{display:none!important}#cuteHeroV1{display:block!important;width:100%!important;max-width:1320px!important;margin:10px auto 28px!important;padding:0!important;border:0!important;border-radius:24px!important;overflow:hidden!important;background:#eef7ff!important;box-shadow:0 16px 42px rgba(55,113,170,.12)!important}#cuteHeroV1 img{display:block!important;width:100%!important;height:auto!important;max-width:none!important;object-fit:contain!important;background:#fff!important}@media(max-width:700px){#cuteHeroV1{margin:6px auto 18px!important;border-radius:14px!important}}';document.head.appendChild(style)}let hero=document.getElementById('cuteHeroV1');if(!hero){hero=document.createElement('section');hero.id='cuteHeroV1';hero.setAttribute('aria-label','CAP English AI 特色功能');nav.insertAdjacentElement('afterend',hero)}else if(hero.previousElementSibling!==nav){nav.insertAdjacentElement('afterend',hero)}let img=hero.querySelector('img');if(!img){img=document.createElement('img');hero.replaceChildren(img)}img.alt='CAP English AI 特色功能｜AI 弱點分析、AI 筆記與複習規劃';if(img.getAttribute('src')!==SRC)img.setAttribute('src',SRC);img.setAttribute('width','1672');img.setAttribute('height','941');img.setAttribute('decoding','async');img.setAttribute('fetchpriority','high')}setTimeout(mount,60);setTimeout(mount,300);setTimeout(mount,900);setInterval(mount,2200)})();<\/script>`;

for(const file of files){
  const r=await fetch(base+file+'?v='+cache);
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  let html=await r.text();
  html=html.includes('</body>')?html.replace('</body>',innerHeroScript+'</body>'):html+innerHeroScript;
  await writeFile(`public/${file}`,html,'utf8');
  console.log('copied and injected CAP feature hero into',file);
}

for(const asset of ['ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','practice-ui-v4.js','notebook-ui-v2.js','auth-ui-v2.js','product-core-v1.js','launch-ui-v1.js','complete-preview-v1.js','complete-portal-v1.js','membership-sync-v1.js','membership-merge-v1.js','remove-duplicate-plans-v1.js','cute-theme-v1.js']){
  await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');
}

const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;min-height:100%;overflow:hidden;background:#f5faff}iframe{border:0;width:100%;height:100dvh;min-height:100vh;display:block;background:#f5faff}</style></head><body><iframe id="capapp" src="/final-v3.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/launch-ui-v1.js?v=${cache}"></script><script src="/complete-preview-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/membership-merge-v1.js?v=${cache}"></script><script src="/remove-duplicate-plans-v1.js?v=${cache}"></script><script src="/cute-theme-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');

const complete=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>AI Complete 會員中心｜CAP English AI</title><meta name="robots" content="noindex,nofollow"><style>.membermain{max-width:1180px;margin:auto;padding:0 18px 60px}section{scroll-margin-top:72px}</style></head><body><main class="membermain"><div id="completePortal"></div><section id="weekly" class="cpSection"><h2>Weekly Mock</h2></section><section id="history" class="cpSection"><h2>歷屆題</h2></section><section id="analysis" class="cpSection"><h2>弱點分析</h2></section></main><script src="/question-engine-v2.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/complete-portal-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/complete.html',complete,'utf8');
console.log(`CAP English AI built: feature hero ${feature.length} bytes + cache ${cache}`);
