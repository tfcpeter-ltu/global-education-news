import fs from 'node:fs/promises';
const root='research/math-corpus',out='public/math-solutions';await fs.mkdir(out,{recursive:true});
const catalog=JSON.parse(await fs.readFile(root+'/catalog.json','utf8')).sets;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=url=>{try{const u=new URL(url);return u.protocol==='https:'?u.href:null}catch{return null}};
const style=`*{box-sizing:border-box}body{margin:0;background:#f5efdf;color:#24483b;font:16px/1.85 system-ui,"Microsoft JhengHei",sans-serif}main{max-width:1040px;margin:auto;padding:24px}header{padding:26px 0;border-block:3px double #ae9159}h1{font:700 clamp(28px,5vw,42px)/1.5 Georgia,"PMingLiU",serif}h2{font-size:21px}a{color:#24483b}nav,.links{display:flex;gap:16px;flex-wrap:wrap}article{background:#fffdf5;border:1px solid #c6b186;padding:22px;margin:18px 0;overflow-wrap:anywhere}li{margin:10px 0}.note{padding:12px;background:#eee7d2;border-left:3px solid #b28d4b}.issue{border-left-color:#974b31;background:#faeee3}label{display:block;margin:24px 0}input{width:100%;font:inherit;padding:12px;border:1px solid #ae9159;background:#fffdf5}.tag{font-size:13px;color:#765b32}.jump{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}.jump a{padding:4px 10px;border:1px solid #c6b186;text-decoration:none}[hidden]{display:none!important}@media(max-width:550px){main{padding:16px}article{padding:16px}}`;
const page=(title,body)=>`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜CAP Math AI</title><link rel="icon" href="/math-logo.svg"><meta name="description" content="國中數學歷屆及段考逐題詳解，含列式、推導、易錯提醒與原卷勘誤。"><style>${style}</style></head><body><main>${body}</main></body></html>`;
const papers=[];
for(const file of (await fs.readdir(root+'/reviewed')).filter(x=>/^(cap-[\w-]+|paper-S\d+)-solutions\.json$/.test(x))){
 const p=JSON.parse(await fs.readFile(root+'/reviewed/'+file,'utf8')),slug=file.replace('-solutions.json','');
 const local=(p.source_question||'').replace(/^\.\.\//,'').replaceAll('\\','/'),source=catalog.find(s=>s.question_file.path.replaceAll('\\','/')===local);
 const sourcePage=safe(p.source_page||source?.source_page),question=safe(source?.question_url),answer=safe(source?.answer_url);
 const all=[...p.choice.map(q=>({...q,section:'選擇題'})),...p.written.map(q=>({...q,section:q.section||'非選擇題'}))];
 const issueCount=all.filter(q=>q.source_answer||q.exclude_from_scoring||q.manual_review_required||/歧義|無正確|矛盾|定義/.test(q.answer)).length;
 const link=(url,label)=>url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`:'';
 let body=`<header><nav><a href="/math">返回數學學習</a><a href="/math-solutions/">全部試卷</a></nav><h1>${esc(p.title)}</h1><p>本站逐題解法 · ${all.length} 個題目與子題 · 核對日期 ${esc(p.reviewed_on)}</p><p class="note">請由來源網站開啟原題，再依題號對照下方解法。本站提供解題推導與勘誤，並非原發布單位的官方詳解。</p><div class="links">${link(question,'開啟來源題本')}${link(answer,'來源參考答案')}${link(sourcePage,'原發布頁面')}</div></header>`;
 if(p.review_notes?.length)body+=`<section class="note issue"><h2>原卷勘誤與閱讀提醒</h2><ul>${p.review_notes.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></section>`;
 const id=q=>'q-'+encodeURIComponent(q.section+'-'+q.number);
 body+=`<nav class="jump" aria-label="題號索引">${all.map(q=>`<a href="#${id(q)}">${esc(q.section+' '+q.number)}</a>`).join('')}</nav>`;
 for(const q of all){body+=`<article id="${id(q)}"><span class="tag">${esc(q.section)} ${esc(q.number)}</span><h2>${esc(q.concept)}</h2><p><strong>答案：${esc(q.answer)}</strong></p>`;
  if(q.source_answer||q.exclude_from_scoring||q.manual_review_required)body+=`<p class="note issue">${q.source_answer?'原卷答案：'+esc(q.source_answer)+'。':''}${q.exclude_from_scoring?'此題有疑義，不納入自動評分。':''}${q.manual_review_required?'需先人工審核題意。':''}${q.source_key_corrected?'本站已更正或補齊原答案。':''}${esc(q.issue||q.correction_reason||'')}</p>`;
  body+=`<ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p class="note">易錯提醒：${esc(q.trap)}</p>${q.rubric?'<h3>參考評分重點（非官方配分）</h3><ul>'+q.rubric.map(s=>`<li>${esc(s)}</li>`).join('')+'</ul>':''}<a href="#top" aria-label="返回頁首">返回頁首 ↑</a></article>`;
 }
 body=body.replace('<header>','<header id="top">');await fs.writeFile(`${out}/${slug}.html`,page(p.title,body));
 papers.push({slug,title:p.title,entries:all.length,issues:issueCount});
}
papers.sort((a,b)=>b.title.localeCompare(a.title,'zh-Hant'));
const total=papers.reduce((a,p)=>a+p.entries,0);if(papers.length!==56||total!==1578)throw Error('Unexpected publication count');
let index=`<header><nav><a href="/math">← 數學 AI 學習中心</a><a href="/">英文學習中心</a></nav><h1>國中數學逐題詳解</h1><p><strong>${papers.length} 套試卷 · ${total.toLocaleString()} 個題目與子題</strong></p><p>按題號閱讀答案、列式、推導與易錯提醒。原訂新增 50 套的核對已完成，連同先前 6 套一併提供。</p><p class="note">原題請至來源網站開啟。原卷資料有誤、答案漏解或定義不明者已另行標示，不能直接沿用原答案評分。這些詳解可直接閱讀，不需呼叫 AI API。</p></header><label for="search">搜尋試卷、學年或年級<input id="search" type="search" placeholder="例如：115、國三、107-2"></label><p id="count" role="status">顯示 ${papers.length} 套</p><section id="papers">`;
for(const p of papers)index+=`<article data-search="${esc(p.title.toLowerCase())}"><h2><a href="/math-solutions/${p.slug}">${esc(p.title)}</a></h2><p>${p.entries} 個詳解${p.issues?' · '+p.issues+' 個題目含勘誤或閱讀提醒':''}</p><a href="/math-solutions/${p.slug}">閱讀逐題詳解 →</a></article>`;
index+=`</section><script>const input=document.querySelector('#search');input.addEventListener('input',()=>{let n=0;for(const card of document.querySelectorAll('[data-search]')){card.hidden=!card.dataset.search.includes(input.value.trim().toLowerCase());if(!card.hidden)n++}document.querySelector('#count').textContent='顯示 '+n+' 套'});</script>`;
await fs.writeFile(out+'/index.html',page('國中數學逐題詳解',index));
await fs.writeFile(out+'/release.json',JSON.stringify({version:'20261016-reviewed-56',papers:56,entries:1578,sourcePdfsIncluded:false},null,2));
for(const f of await fs.readdir(out)){const text=await fs.readFile(out+'/'+f,'utf8');if(/research\/|\.\.\/files|C:\\Users|file:\/\//i.test(text))throw Error('Local path leaked '+f);}
console.log(JSON.stringify({papers:papers.length,entries:total,output:out,sourcePdfsIncluded:false}));
