import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html','final-v4.html','final-v5.html','final-v6.html','final-v7.html','final-v8.html','final-v9.html','final-v10.html','final-v11.html','final-v12.html','final-v13.html','final-v14.html','final-v15.html','final-v16.html','final-v17.html','final-v18.html','final-v19.html'];
await mkdir('public',{recursive:true});
for(const file of files){
  const r=await fetch(base+file+'?v=20260907-v19-simple');
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  await writeFile(`public/${file}`,await r.text(),'utf8');
  console.log('copied',file);
}
await writeFile('public/ltu-refine.js',await readFile('ltu-refine.js','utf8'),'utf8');
const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>2027 國中教育會考英文 AI｜LTU 國際學術中心</title><meta name="description" content="LTU 國際學術中心系列 AI 輔助教材。免費會員每日 3 題；完整會員提供 AI 弱點記憶、每週會考模考、AI 筆記與能力分析。"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff}iframe{border:0;width:100%;height:100%;display:block}</style></head><body><iframe src="/final-v19.html?v=20260907-v19-simple" title="2027 會考英文 AI" allow="microphone"></iframe><script src="/ltu-refine.js?v=20260907-v19-simple"></script></body></html>`;
await writeFile('public/index.html',index,'utf8');
console.log('CAP English AI simplified V19 ready');