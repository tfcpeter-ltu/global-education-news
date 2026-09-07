import { mkdir, writeFile } from 'node:fs/promises';

const base='https://raw.githubusercontent.com/tfcpeter-ltu/global-education-news/cap-ai-preview/cap-ai-preview/';
const files=['final-v3.html','final-v4.html','final-v5.html','final-v6.html','final-v7.html','final-v8.html','final-v9.html','final-v10.html','final-v11.html','final-v12.html','final-v13.html','final-v14.html','final-v15.html','final-v16.html','final-v17.html','final-v18.html'];
await mkdir('public',{recursive:true});
for(const file of files){
  const r=await fetch(base+file);
  if(!r.ok) throw new Error(`Failed to fetch ${file}: ${r.status}`);
  await writeFile(`public/${file}`,await r.text(),'utf8');
  console.log('copied',file);
}
const index=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>2027 國中教育會考英文 AI｜LTU AI English</title><meta name="description" content="2027 國中教育會考英文 AI 個人化練習、錯因診斷、Weekly Mock、間隔複習與 AI Complete 會員。"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#f5f7fb}iframe{border:0;width:100%;height:100%;display:block}</style></head><body><iframe src="/final-v18.html" title="2027 會考英文 AI" allow="microphone"></iframe></body></html>`;
await writeFile('public/index.html',index,'utf8');
console.log('CAP English AI standalone UI ready');
