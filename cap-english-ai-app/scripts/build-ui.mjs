import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import {makeMath,skills} from '../lib/math-bank.mjs';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/7deeac6b0ab4c85de9e18a2ec7e47a8d94648942/cap-ai-preview/';
const files=['final-v3.html'];
const cache='20261015-detailed-answers-v1';
await mkdir('public',{recursive:true});
await writeFile('public/cambridge-kings.webp',await readFile('assets/cambridge-kings.webp'));
await writeFile('public/photo-credits.html',await readFile('assets/photo-credits.html'));
const logo=await readFile('assets/cap-logo.svg');
await writeFile('public/cap-logo.svg',logo);
for(const size of [32,180,512])await sharp(logo).resize(size,size).png().toFile(`public/cap-logo-${size}.png`);
const shareSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f4efdf"/><rect x="18" y="18" width="1164" height="594" fill="none" stroke="#ae9159" stroke-width="2"/><path d="M38 176V38H176M1024 592H1162V454" stroke="#ae9159" stroke-width="2" fill="none"/><text x="70" y="270" fill="#897044" font-size="25" letter-spacing="5" font-family="Georgia,serif">LTU INTERNATIONAL ACADEMIC CENTRE</text><text x="70" y="350" fill="#24483b" font-family="Georgia,serif" font-size="70" font-weight="bold">CAP ENGLISH AI</text><text x="70" y="408" fill="#24483b" font-family="Microsoft JhengHei,Noto Sans CJK TC,sans-serif" font-size="34" font-weight="bold">2027 國中會考英文 AI</text><text x="70" y="493" fill="#746a53" font-family="Microsoft JhengHei,Noto Sans CJK TC,sans-serif" font-size="24">每日練習 · 閱讀聽力 · 模考解析</text><text x="70" y="548" fill="#897044" font-size="22" font-family="Georgia,serif">cap-ai.ossdtw.com</text></svg>`;
const icon=await sharp(logo).resize(128,128).png().toBuffer();
const art=await sharp('assets/academic-students-gate.png').resize(380,500,{fit:'cover',position:'right'}).png().toBuffer();
await sharp(Buffer.from(shareSvg)).composite([{input:icon,left:70,top:70},{input:art,left:782,top:65}]).png().toFile('public/cap-share.png');
const brandMeta=`<link rel="icon" type="image/svg+xml" href="/cap-logo.svg?v=${cache}"><link rel="icon" type="image/png" sizes="32x32" href="/cap-logo-32.png?v=${cache}"><link rel="apple-touch-icon" sizes="180x180" href="/cap-logo-180.png?v=${cache}"><meta name="theme-color" content="#24483b">`;
const shareMeta=`<meta property="og:type" content="website"><meta property="og:site_name" content="CAP English AI｜LTU"><meta property="og:title" content="2027 國中會考英文 AI 學習中心"><meta property="og:description" content="每日練習、閱讀聽力、模考與逐題解析。"><meta property="og:url" content="https://cap-ai.ossdtw.com/"><meta property="og:image" content="https://cap-ai.ossdtw.com/cap-share.png?v=${cache}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="CAP 書本標誌與會考英文 AI 學習中心"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://cap-ai.ossdtw.com/cap-share.png?v=${cache}">`;

await writeFile('public/collegiate-linework.svg',await readFile('assets/collegiate-linework.svg'));
for(const asset of ['victorian-corner.svg','victorian-corner-reverse.svg','victorian-floral.svg'])await writeFile('public/'+asset,await readFile('assets/'+asset));
await sharp('assets/academic-students-gate.png').resize({width:1280,withoutEnlargement:true}).webp({quality:86}).toFile('public/academic-students-gate.webp');

const mainParts=[];
for(let i=1;i<=7;i++) mainParts.push((await readFile(`main-hero-v17-part-${String(i).padStart(2,'0')}.b64`,'utf8')).replace(/\s+/g,''));
const mainHero=Buffer.from(mainParts.join(''),'base64');
if(mainHero.length<30000 || mainHero.subarray(0,4).toString('ascii')!=='RIFF' || mainHero.subarray(8,12).toString('ascii')!=='WEBP') throw new Error('Invalid main hero');
await writeFile('public/cap-main-hero-v17.webp',mainHero);

for(const file of files){const r=await fetch(base+file+'?v='+cache);if(!r.ok)throw new Error(`Failed to fetch ${file}: ${r.status}`);await writeFile(`public/${file}`,(await r.text()).replaceAll('基本答案與簡要解析','答案與逐步詳解').replaceAll('基本解析','逐步詳解').replace('</head>','<link id="academic-theme" rel="stylesheet" href="/academic-theme.css?v='+cache+'"></head>').replace('<body','<body data-academic="1"'),'utf8')}

const assets=['tutor.js','ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','mock-listening.js','mock-groups.js','explanation-engine.js','practice-ui-v4.js','notebook-ui-v2.js','auth-ui-v2.js','product-core-v1.js','launch-ui-v1.js','complete-preview-v1.js','complete-portal-v1.js','membership-sync-v1.js','membership-merge-v1.js','remove-duplicate-plans-v1.js','flow-ux-v1.js','trad-tw-fix-v1.js'];
for(const asset of assets) await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');
for(const asset of ['tutor.css','admin.html','admin-ui.js','academic-theme.css','academic-theme.js','explanation-example.html','mock-example.html']) await writeFile(`public/${asset}`,(await readFile(asset,'utf8')).replace('</head>',brandMeta+'</head>'),'utf8');

let cuteTheme=await readFile('cute-theme-v1.js','utf8');
cuteTheme=cuteTheme.replace(/const CACHE='[^']+';/,`const CACHE='${cache}';`);
cuteTheme=cuteTheme.replace('#cuteHeroV1{max-width:1138px!important;','#cuteHeroV1{max-width:1000px!important;');
cuteTheme=cuteTheme.replace('#cuteFeatureHeroV15{max-width:1320px!important;margin-top:0!important;margin-bottom:28px!important;border-radius:24px!important}','#cuteFeatureHeroV15{max-width:1320px!important;margin-top:0!important;margin-bottom:28px!important;border-radius:24px!important;min-height:0!important;height:auto!important;background:transparent!important}#cuteFeatureHeroV15:empty{display:none!important}');
cuteTheme=cuteTheme.replace("heroImg.src='/cap-hero-cute.jpg?v='+CACHE;heroImg.width=1138;heroImg.height=262;heroImg.decoding='async';heroImg.fetchPriority='high';","heroImg.src='/cap-main-hero-v17.webp?v='+CACHE;heroImg.width=1000;heroImg.height=264;heroImg.decoding='async';heroImg.fetchPriority='high';heroImg.onerror=function(){hero.remove()};");

if(!cuteTheme.includes('/academic-students-gate.webp')||!cuteTheme.includes('academicFeatureGrid')) throw new Error('Hero patch did not apply');
await writeFile('public/cute-theme-v1.js',cuteTheme,'utf8');

const index=`<!doctype html><html lang="zh-Hant"><head><link id="academic-theme" rel="stylesheet" href="/academic-theme.css?v=${cache}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;min-height:100%;overflow:hidden;background:#f5edd5}iframe{border:0;width:100%;height:100dvh;min-height:100vh;display:block;background:#f5edd5}</style></head><body data-academic="1"><iframe id="capapp" src="/final-v3.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/mock-listening.js?v=${cache}"></script><script src="/mock-groups.js?v=${cache}"></script><script src="/explanation-engine.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/launch-ui-v1.js?v=${cache}"></script><script src="/complete-preview-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/membership-merge-v1.js?v=${cache}"></script><script src="/remove-duplicate-plans-v1.js?v=${cache}"></script><script src="/cute-theme-v1.js?v=${cache}"></script><script src="/flow-ux-v1.js?v=${cache}"></script><script src="/trad-tw-fix-v1.js?v=${cache}"></script><script src="/academic-theme.js?v=${cache}"></script><script src="/tutor.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index.replace('</head>',brandMeta+shareMeta+'</head>'),'utf8');

const complete=`<!doctype html><html lang="zh-Hant"><head><link id="academic-theme" rel="stylesheet" href="/academic-theme.css?v=${cache}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>AI Complete 會員中心｜CAP English AI</title><meta name="robots" content="noindex,nofollow"><style>.membermain{max-width:1180px;margin:auto;padding:0 18px 60px}section{scroll-margin-top:72px}</style></head><body data-academic="1"><main class="membermain"><div id="completePortal"></div><section id="weekly" class="cpSection"><h2>Weekly Mock</h2></section><section id="history" class="cpSection"><h2>歷屆題</h2></section><section id="analysis" class="cpSection"><h2>弱點分析</h2></section></main><script src="/question-engine-v2.js?v=${cache}"></script><script src="/mock-listening.js?v=${cache}"></script><script src="/mock-groups.js?v=${cache}"></script><script src="/explanation-engine.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v2.js?v=${cache}"></script><script src="/auth-ui-v2.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/complete-portal-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script><script src="/trad-tw-fix-v1.js?v=${cache}"></script><script src="/academic-theme.js?v=${cache}"></script></body></html>`;
await writeFile('public/complete.html',complete.replace('</head>',brandMeta+'</head>'),'utf8');
console.log('CAP English AI built: warm academic theme + HTML feature board');
await writeFile('public/math.html',await readFile('math-site/index.html'));
await writeFile('public/math-ui.mjs',await readFile('math-site/app.mjs'));
await writeFile('public/math-style.css',await readFile('math-site/style.css'));
await writeFile('public/math-demo.mjs',`export const skills=${JSON.stringify(skills)};export const demoQuestions=${JSON.stringify([0,7,11].map(i=>({...makeMath(`MATH-${String(i).padStart(4,'0')}`),id:'DEMO-'+i})))};`);
const mathLogo=logo.toString().replace(/CAP/g,'MATH');
await writeFile('public/math-logo.svg',mathLogo);
const mathShare=shareSvg.replace('CAP ENGLISH AI','CAP MATH AI').replace('國中會考英文 AI','國中會考數學 AI').replace('每日練習 · 閱讀聽力 · 模考解析','每日練習 · 逐步詳解 · 數學模考');
await sharp(Buffer.from(mathShare)).composite([{input:await sharp(Buffer.from(mathLogo)).resize(128,128).png().toBuffer(),left:70,top:70},{input:art,left:782,top:65}]).png().toFile('public/math-share.png');
const mathHtml=await readFile('public/math.html','utf8');
await writeFile('public/math.html',mathHtml.replace('</head>','<meta property="og:title" content="2027 國中會考數學 × AI 個人化學習"><meta property="og:image" content="https://cap-ai.ossdtw.com/math-share.png"><meta property="og:url" content="https://cap-ai.ossdtw.com/math"><meta name="twitter:card" content="summary_large_image"></head>'));
console.log('CAP Math AI standalone site built');
// Original papers are built locally from committed, API-free authoring sources.
await import('./build-original-math.mjs');
await import('./original-math.test.mjs');
await import('./build-original-english.mjs');
await import('./original-english.test.mjs');
await writeFile('public/english-library-shell.js',await readFile('english-library-shell.js','utf8'));
await writeFile('public/english-library-routing.mjs',await readFile('lib/english-library-routing.mjs','utf8'));
const englishAppShell=await readFile('public/index.html','utf8');
await writeFile('public/index.html',englishAppShell.replace('</body>','<script type="module" src="/english-library-shell.js?v=integrated-1"></script></body>'));
const originalEnglishHome=await readFile('public/final-v3.html','utf8');
if(!originalEnglishHome.includes('<nav>'))throw Error('English navigation missing');
const originalEnglishCard='<section class="section" id="originalEnglishLibrary"><div class="card" style="border:3px double #ae9159;background:#f7f0dd;padding:24px"><span class="tag">ORIGINAL PRACTICE · 原創練習</span><h2>原創題庫與逐題詳解</h2><p class="lead">56 個主題，閱讀、克漏字、聽力及手寫延伸。先做題，再用原文證據與選項分析看懂每一題。</p><a class="btn primary" style="display:inline-block;text-decoration:none" href="/#english-library" target="_top">進入原創題庫</a></div></section>';
let integratedEnglishHome=originalEnglishHome.replace('<div class="links">','<div class="links"><a href="/#english-library" target="_top">原創題庫</a>');
if(!integratedEnglishHome.includes('href="/#english-library"'))throw Error('English library link missing');
integratedEnglishHome=integratedEnglishHome.replace(/(<main class="wrap">[\s\S]*?<\/section>)/,'$1'+originalEnglishCard);
if(!integratedEnglishHome.includes('id="originalEnglishLibrary"'))throw Error('English library panel missing');
await writeFile('public/final-v3.html',integratedEnglishHome);
await import('./english-library-routing.test.mjs');

await writeFile('public/math-library-shell.mjs',await readFile('math-site/library-shell.mjs','utf8'));
await writeFile('public/math-library-routing.mjs',await readFile('lib/math-library-routing.mjs','utf8'));
await import('./math-library-routing.test.mjs');
