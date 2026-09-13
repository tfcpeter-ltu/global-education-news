import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html'];
const cache='20260913-feature-v20-tradtw';
await mkdir('public',{recursive:true});

const mainParts=[];
for(let i=1;i<=7;i++) mainParts.push((await readFile(`main-hero-v17-part-${String(i).padStart(2,'0')}.b64`,'utf8')).replace(/\s+/g,''));
const mainHero=Buffer.from(mainParts.join(''),'base64');
if(mainHero.length<30000 || mainHero.subarray(0,4).toString('ascii')!=='RIFF' || mainHero.subarray(8,12).toString('ascii')!=='WEBP') throw new Error(`Invalid main hero WEBP: ${mainHero.length}`);
await writeFile('public/cap-main-hero-v17.webp',mainHero);

const fparts=[];
for(let i=1;i<=10;i++) fparts.push((await readFile(`feature-hero-v13-part-${String(i).padStart(2,'0')}.bin`,'utf8')).replace(/\s+/g,''));
const once=Buffer.from(fparts.join(''),'base64').toString('utf8').replace(/\s+/g,'');
const feature=Buffer.from(once,'base64');
if(feature.length<50000 || feature.subarray(4,12).toString('ascii')!=='ftypavif') throw new Error(`Invalid feature image source: ${feature.length} bytes / ${feature.subarray(4,12).toString('ascii')}`);
const featureWebp=await sharp(feature).webp({quality:96,effort:6}).toBuffer();
if(featureWebp.subarray(0,4).toString('ascii')!=='RIFF' || featureWebp.subarray(8,12).toString('ascii')!=='WEBP') throw new Error('Feature WEBP conversion failed');
await writeFile('public/cap-feature-hero-v20.webp',featureWebp);

for(const file of files){const r=await fetch(base+file+'?v='+cache);if(!r.ok)throw new Error(`Failed to fetch ${file}: ${r.status}`);await writeFile(`public/${file}`,await r.text(),'utf8')}

const assets=['ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','practice-ui-v4.js','notebook-ui-v2.js','auth-ui-v2.js','product-core-v1.js','launch-ui-v1.js','complete-preview-v1.js','complete-portal-v1.js','membership-sync-v1.js','membership-merge-v1.js','remove-duplicate-plans-v1.js','flow-ux-v1.js','trad-tw-fix-v1.js'];
for(const asset of assets) await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');

let cuteTheme=await readFile('cute-theme-v1.js','utf8');
cuteTheme=cuteTheme.replace(/const CACHE='[^']+';/,`const CACHE='${cache}';`);
cuteTheme=cuteTheme.replace('#cuteHeroV1{max-width:1138px!important;','#cuteHeroV1{max-width:1000px!important;');
cuteTheme=cuteTheme.replace('#cuteFeatureHeroV15{max-width:1320px!important;margin-top:0!important;margin-bottom:28px!important;border-radius:24px!important}','#cuteFeatureHeroV15{max-width:1320px!important;margin-top:0!important;margin-bottom:28px!important;border-radius:24px!important;min-height:0!important;height:auto!important;background:transparent!important}#cuteFeatureHeroV15:empty{display:none!important}');
cuteTheme=cuteTheme.replace("heroImg.src='/cap-hero-cute.jpg?v='+CACHE;heroImg.width=1138;heroImg.height=262;heroImg.decoding='async';heroImg.fetchPriority='high';","heroImg.src='/cap-main-hero-v17.webp?v='+CACHE;heroImg.width=1000;heroImg.height=264;heroImg.decoding='async';heroImg.fetchPriority='high';heroImg.onerror=function(){hero.remove()};");
cuteTheme=cuteTheme.replace("featureImg.src='/cap-feature-hero-v13.avif?v='+CACHE;featureImg.width=1672;featureImg.height=941;featureImg.decoding='async';featureImg.fetchPriority='high';","featureImg.src='/cap-feature-hero-v20.webp?v='+CACHE;featureImg.width=1672;featureImg.height=941;featureImg.decoding='async';featureImg.fetchPriority='high';featureImg.style.width='100%';featureImg.style.height='auto';featureImg.onload=function(){feature.style.removeProperty('min-height');feature.style.removeProperty('height');feature.style.background='transparent'};featureImg.onerror=function(){feature.remove()};");
if(!cuteTheme.includes('/cap-main-hero-v17.webp')||!cuteTheme.includes('/cap-feature-hero-v20.webp')) throw new Error('Hero patch did not apply');
await writeFile('public/cute-theme-v1.js',cuteTheme,'utf8');

const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;min-height:100%;overflow:hidden;background:#f5faff}iframe{border:0;width:100%;height:100dvh;min-height:100vh;display:block;background:#f5faff}</style></head><body><iframe id="capapp" src="/final-v3.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/launch-ui-v1.js?v=${cache}"></script><script src="/complete-preview-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/membership-merge-v1.js?v=${cache}"></script><script src="/remove-duplicate-plans-v1.js?v=${cache}"></script><script src="/cute-theme-v1.js?v=${cache}"></script><script src="/flow-ux-v1.js?v=${cache}"></script><script src="/trad-tw-fix-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');

const complete=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>AI Complete 會員中心｜CAP English AI</title><meta name="robots" content="noindex,nofollow"><style>.membermain{max-width:1180px;margin:auto;padding:0 18px 60px}section{scroll-margin-top:72px}</style></head><body><main class="membermain"><div id="completePortal"></div><section id="weekly" class="cpSection"><h2>Weekly Mock</h2></section><section id="history" class="cpSection"><h2>歷屆題</h2></section><section id="analysis" class="cpSection"><h2>弱點分析</h2></section></main><script src="/question-engine-v2.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/complete-portal-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/trad-tw-fix-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/complete.html',complete,'utf8');
console.log(`CAP English AI built: Traditional Chinese UI + feature hero ${featureWebp.length} bytes + ${cache}`);
