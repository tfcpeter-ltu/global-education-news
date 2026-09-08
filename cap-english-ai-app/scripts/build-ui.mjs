import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html','final-v4.html','final-v5.html','final-v6.html','final-v7.html','final-v8.html','final-v9.html','final-v10.html','final-v11.html','final-v12.html','final-v13.html','final-v14.html','final-v15.html','final-v16.html','final-v17.html','final-v18.html','final-v19.html'];
const cache='20260908-product-core-v3';
await mkdir('public',{recursive:true});
for(const file of files){
  const r=await fetch(base+file+'?v='+cache);
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  await writeFile(`public/${file}`,await r.text(),'utf8');
  console.log('copied',file);
}
for(const asset of ['ltu-refine-v3.js','ltu-refine-v4.js','remove-hero.js','question-engine-v2.js','practice-ui-v4.js','notebook-ui-v1.js','product-core-v1.js','membership-sync-v1.js']){
  await writeFile(`public/${asset}`,await readFile(asset,'utf8'),'utf8');
}
const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="CAP English AI：免費會員每日 3 題；AI Complete 提供 AI 記憶出題、AI 筆記、Weekly Mock、歷屆能力練習與跨裝置弱點分析。"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff}iframe{border:0;width:100%;height:100%;display:block}</style></head><body><iframe src="/final-v19.html?v=${cache}" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/question-engine-v2.js?v=${cache}"></script><script src="/ltu-refine-v3.js?v=${cache}"></script><script src="/ltu-refine-v4.js?v=${cache}"></script><script src="/remove-hero.js?v=${cache}"></script><script src="/practice-ui-v4.js?v=${cache}"></script><script src="/notebook-ui-v1.js?v=${cache}"></script><script src="/product-core-v1.js?v=${cache}"></script><script src="/membership-sync-v1.js?v=${cache}"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');
console.log('CAP English AI built: product core v3, 20k unique generator, strict Free 3, Complete learning loop');
