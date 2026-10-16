import fs from 'node:fs/promises';
import {mathModuleRoute} from '../lib/math-library-routing.mjs';
import {families,makeOriginal,choiceOptions,makeProof,makeConstruction} from '../lib/original-math.mjs';
const blueprint=JSON.parse(await fs.readFile('math-original/blueprints.json','utf8'));
const out='public/math-original';await fs.mkdir(out,{recursive:true});
const seen=new Set(),papers=[];
const topicNames={number:'數與量',ratio:'比例應用',algebra:'一次方程與不等式',polynomial:'多項式',radical:'根式與畢氏定理',quadratic:'二次方程式',sequence:'數列與級數',function:'函數與座標',quadraticFunction:'二次函數',geometry:'平面幾何',similarity:'相似形',circle:'圓',solid:'立體幾何',statistics:'統計',probability:'機率'};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isProof=s=>/證明/.test(s),isConstruction=s=>/作圖/.test(s);
const domainFor=(topic,grade)=>{
 const allowed=grade===7?['number','ratio','algebra','function','statistics']:grade===8?['number','ratio','algebra','function','statistics','polynomial','radical','quadratic','sequence','geometry']:Object.keys(topicNames);
 return allowed.includes(topic)?topic:grade===7?'algebra':'geometry';
};
for(const [pi,b] of blueprint.papers.entries()){
 let counter={};const questions=[];
 for(const [qi,slot] of b.slots.entries()){
  const section=slot.section,topic=domainFor(slot.topic,b.grade),baseSeed=pi*211+qi*83;
  let q;
  if(isConstruction(section)){
   q=makeConstruction(baseSeed);q.type='construction';q.points=6;
  }else if(isProof(section)){
   const kind=topic==='number'||topic==='algebra'||topic==='polynomial'?1:topic==='circle'?3:2;
   q=makeProof(baseSeed-baseSeed%4+kind);q.type='proof';q.points=6;
  }else{
   const pool=families.filter(f=>f.topic===topic);
   let found=false;
   // Rejection only prevents repeated wording; it makes no provider/API calls.
   for(let tryNo=0;tryNo<2000;tryNo++){
    const family=pool[(qi+pi+tryNo)%pool.length];
    q=makeOriginal(family.id,baseSeed+tryNo*37);
    if(!seen.has(q.stem)){found=true;break;}
   }
   if(!found)throw Error(`Cannot produce distinct stem ${b.id}/${qi}`);
   if(section==='選擇題'){
    q.type='choice';q.points=2;Object.assign(q,choiceOptions(q,baseSeed));
   }else if(/是非|判斷/.test(section)){
    const candidate=Number(q.answer)+(baseSeed%2===0?0:1),correct=baseSeed%2===0;
    q.numericAnswer=q.answer;q.type='trueFalse';q.points=1;
    q.stem+=` 有同學聲稱「答案為 ${candidate}${q.unit}」。此聲稱是否正確？請填○或×。`;
    q.answer=correct?'○':'×';q.claim=candidate;
    q.steps.push(`原問題正確數值為${q.numericAnswer}${q.unit}，因此聲稱${correct?'正確':'錯誤'}，填${q.answer}。`);
   }else{
    q.type=section==='填充題'?'fill':'worked';q.points=q.type==='fill'?2:4;
    if(q.type==='worked')q.stem+=' 請寫出列式、計算過程與驗算。';
    q.rubric=q.type==='fill'?[`答案${q.answer}${q.unit}且單位符合（2分）。`]:['辨認關係或使用正確公式（1分）。','依條件正確列式（1分）。',`計算正確並得到${q.answer}${q.unit}（1分）。`,'驗算、範圍及單位交代清楚（1分）。'];
   }
   seen.add(q.type==='trueFalse'?q.stem.split(' 有同學聲稱')[0]:q.stem.replace(' 請寫出列式、計算過程與驗算。',''));
  }
  counter[section]=(counter[section]||0)+1;
  questions.push({...q,id:`${b.id}-q${qi+1}`,number:counter[section],section,topicLabel:topicNames[q.topic],difficulty:qi<b.slots.length/3?'基礎':qi<2*b.slots.length/3?'標準':'應用'});
 }
 papers.push({id:b.id,title:`原創數學 ${String(pi+1).padStart(2,'0')}｜${b.category}`,grade:b.grade,category:b.category,questionCount:questions.length,sections:counter,rawPoints:questions.reduce((s,q)=>s+q.points,0),suggestedMinutes:b.category==='會考型綜合練習'?80:50,questions});
}
const style=`*{box-sizing:border-box}body{margin:0;background:#f5efdf;color:#243f39;font:17px/1.9 system-ui,"Microsoft JhengHei",sans-serif}main{max-width:1040px;margin:auto;padding:28px}header{border-block:4px double #b19359;padding:24px 0}h1{font:700 clamp(28px,4vw,42px)/1.5 Georgia,"PMingLiU",serif}h2{font-size:22px}nav,.actions{display:flex;flex-wrap:wrap;gap:16px}a{color:#244b43}article{background:#fffdf7;border:1px solid #c9b789;padding:24px;margin:20px 0;break-inside:avoid}article h2{margin:0 0 8px}.tag{color:#7a5d2b;font-size:14px}.notice{background:#eee6cf;border-left:3px solid #ab884a;padding:14px}li{margin:8px 0}.options{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.options div{border:1px solid #ded1b2;padding:8px}.space{height:100px;border-bottom:1px dotted #c5b89b}.long{height:200px}button,input,select{font:inherit;padding:10px;border:1px solid #b19359;background:#fffdf7;color:#243f39}label{display:block;margin:12px 0}input{width:100%}.answer{font-weight:700;color:#7e5120}.toolbar{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}[hidden]{display:none!important}@media(max-width:600px){main{padding:16px}article{padding:16px}.options{grid-template-columns:1fr}}@media print{body{background:#fff;color:#000;font-size:12pt}main{max-width:none;padding:0}nav,.actions,.toolbar,.no-print{display:none}header{border-color:#555}article{box-shadow:none;border-color:#aaa}a{color:#000;text-decoration:none}.notice{background:none}h1{font-size:23pt}.space{height:70px}.long{height:140px}}`;
const page=(title,body,path='/math-original/')=>{
 const route=mathModuleRoute(path);if(!route)throw Error('Unknown math module path');
 body=body.replace(/href="(\/math-original\/[^" ]*)"/g,(all,path)=>{const next=mathModuleRoute(path);return next?`href="/math${next}" target="_top"`:all});
 const redirect=`<script>if(window.top===window){const item=/^#original-\\d+-q\\d+$/.test(location.hash)?'/'+location.hash.slice(1):'';document.documentElement.hidden=true;location.replace('/math'+${JSON.stringify(route)}+(${JSON.stringify(route)}==='#math-library'?'':item));}</script>`;
 return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜CAP Math AI</title><meta name="description" content="數學學習中心內的原創練習與逐題詳解。"><link rel="canonical" href="https://cap-ai.ossdtw.com/math${route}"><link rel="icon" href="/math-logo.svg">${redirect}<style>${style}header>nav{display:none}</style></head><body data-library-module="math"><main>${body}</main></body></html>`;
};
for(const p of papers){
 for(const answers of [false,true]){
  let html=`<header><nav><a href="/math">數學學習中心</a><a href="/math-original/">56套原創試卷</a></nav><p class="tag">LTU · READ / REASON / SOLVE</p><h1>${esc(p.title)}<br>${answers?'逐題詳解與評分重點':'學生題本'}</h1><p>國${['一','二','三'][p.grade-7]}程度 · ${p.questionCount}個題目／子題 · 建議${p.suggestedMinutes}分鐘</p><p>${Object.entries(p.sections).map(([s,n])=>esc(s)+' '+n+'題').join('｜')}</p><p class="notice">本站原創練習，非官方試卷或原卷改寫。依題型、題數及概略能力領域另行設計；未沿用原卷圖文、大題分組或官方配分。本卷原始總分${p.rawPoints}分，百分制＝得分÷${p.rawPoints}×100。作圖與證明需人工批改。</p><div class="actions"><a href="/math-original/${p.id}${answers?'':'-answers'}">${answers?'回到學生題本':'閱讀完整詳解'}</a><a href="/math-original/${p.id}.json" download>教師用資料（含答案）</a><button class="no-print" onclick="window.print()">列印／另存PDF</button></div></header>`;
  let last='';
  for(const q of p.questions){
   if(last!==q.section){html+=`<h2>${esc(q.section)}</h2>`;last=q.section;}
   html+=`<article id="${q.id}"><p class="tag">${esc(q.section)} ${q.number} · ${q.points}分 · ${esc(q.topicLabel)}</p><h2>${esc(q.stem)}</h2>`;
   if(q.options)html+=`<div class="options">${q.options.map((s,i)=>`<div>(${'ABCD'[i]}) ${esc(s)}${esc(q.unit)}</div>`).join('')}</div>`;
   if(answers){
    html+=`<p class="answer">答案：${q.type==='choice'?'ABCD'[q.answerIndex]+'；':''}${esc(q.answer)}${q.type==='trueFalse'?'':esc(q.unit)}</p><h3>列式與推導</h3><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`;
    if(q.optionExplanations)html+=`<h3>選項核對</h3><ul>${q.optionExplanations.map((s,i)=>`<li>${'ABCD'[i]}：${esc(s)}</li>`).join('')}</ul>`;
    html+=`<p class="notice">易錯提醒：${esc(q.trap)}</p>`;
    if(q.rubric)html+=`<h3>本站參考評分規準</h3><ul>${q.rubric.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;
   }else if(q.type!=='choice'&&q.type!=='trueFalse')html+=`<div class="space ${q.type==='fill'?'':'long'}" aria-label="作答區"></div>`;
   html+='</article>';
  }
  await fs.writeFile(`${out}/${p.id}${answers?'-answers':''}.html`,page(p.title,html,`/math-original/${p.id}${answers?'-answers':''}`));
 }
 await fs.writeFile(`${out}/${p.id}.json`,JSON.stringify(p,null,2));
}
const count=papers.reduce((s,p)=>s+p.questionCount,0);
const comprehensive=papers.filter(p=>p.category==='會考型綜合練習').length;
let index=`<header><nav><a href="/math">← 數學AI學習中心</a></nav><p class="tag">LTU ORIGINAL MATHEMATICS COLLECTION</p><h1>國中數學 · 56套原創練習</h1><p><strong>${count.toLocaleString()}個題目與子題 · 題本與詳解分冊</strong></p><p class="notice">以已核對56套的題型、題目／子題數與概略領域作編排參考，題幹、情境、推導文字及答案由本站另行設計。這是${families.length}種題目結構的參數化原創練習集，並非56份官方模考，也未宣稱與原卷逐題等難。全套可離線閱讀，未呼叫付費AI API。</p><p>包含16套會考型綜合練習與40套分單元段考型練習。計算、證明和尺規作圖皆附步驟與自訂評分規準；作圖保留為紙筆任務。</p></header><div class="toolbar"><label>年級<select id="grade"><option value="">全部年級</option><option value="7">國一</option><option value="8">國二</option><option value="9">國三</option></select></label><label>類型<select id="category"><option value="">全部</option><option>會考型綜合練習</option><option>分單元段考型練習</option></select></label></div><p id="count" role="status">顯示56套</p>`;
index=index.replace('16套會考型綜合練習與40套分單元段考型練習',`${comprehensive}套會考型綜合練習與${papers.length-comprehensive}套分單元段考型練習`);
for(const p of papers)index+=`<article data-grade="${p.grade}" data-category="${p.category}"><span class="tag">國${['一','二','三'][p.grade-7]} · ${p.questionCount}題／子題 · ${p.suggestedMinutes}分鐘</span><h2>${esc(p.title)}</h2><p>${Object.entries(p.sections).map(([s,n])=>esc(s)+' '+n+'題').join('｜')}</p><div class="actions"><a href="/math-original/${p.id}">開啟題本 →</a><a href="/math-original/${p.id}-answers">逐題詳解 →</a></div></article>`;
index+=`<script>const g=document.querySelector('#grade'),c=document.querySelector('#category');function filter(){let n=0;for(const a of document.querySelectorAll('article[data-grade]')){a.hidden=!!((g.value&&a.dataset.grade!==g.value)||(c.value&&a.dataset.category!==c.value));if(!a.hidden)n++}document.querySelector('#count').textContent='顯示'+n+'套'}g.addEventListener('change',filter);c.addEventListener('change',filter);</script>`;
await fs.writeFile(out+'/index.html',page('56套國中數學原創練習',index));
await fs.writeFile('math-original/collection.json',JSON.stringify({version:'original-56-v1',authoringMethod:'Independent parameterized item families; metadata-only blueprints; no provider API calls',papers},null,2));
await fs.writeFile(out+'/release.json',JSON.stringify({version:'original-56-v1',papers:papers.length,questions:count,families:families.length,paidApiCalls:0,scoring:'custom',status:'validated-build'},null,2));
console.log(JSON.stringify({papers:papers.length,questions:count,families:families.length,output:out,paidApiCalls:0}));
