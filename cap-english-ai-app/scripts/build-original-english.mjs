import fs from 'node:fs/promises';
import {originalEnglishPapers,englishBlueprint} from '../lib/original-english.mjs';
const papers=originalEnglishPapers(),out='public/english-original';await fs.mkdir(out,{recursive:true});
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const style=`*{box-sizing:border-box}body{margin:0;background:#f5efdf;color:#24483b;font:17px/1.85 system-ui,"Microsoft JhengHei",sans-serif}main{max-width:1040px;margin:auto;padding:28px}header{border-block:4px double #ae9159;padding:24px 0}h1{font:700 clamp(27px,4vw,40px)/1.5 Georgia,"PMingLiU",serif}h2{font-size:23px}h3{font-size:19px}.tag{color:#7c6033;font-size:14px}nav,.actions{display:flex;gap:16px;flex-wrap:wrap}a{color:#24483b}article,.passage{padding:24px;border:1px solid #c9b789;background:#fffdf7;margin:20px 0;break-inside:avoid}.passage{border-block:3px double #ae9159;background:#eee8d5}.english{font-family:Georgia,"Times New Roman",serif;font-size:19px;white-space:pre-line}.options{display:grid;grid-template-columns:1fr 1fr;gap:10px}.options p{margin:0;padding:8px;border:1px solid #dfd2b4;overflow-wrap:anywhere}.options svg{display:block;max-width:100%;margin:auto}.notice{padding:14px;border-left:3px solid #ac8c51;background:#eee6cf}.answer{color:#7d5425;font-weight:700}li{margin:8px 0}button,input{font:inherit;background:#fffdf7;border:1px solid #ae9159;color:#24483b;padding:10px}input{width:100%}.space{height:170px;border-bottom:1px dotted #b19a6e}[hidden]{display:none!important}@media(max-width:600px){main{padding:16px}.options{grid-template-columns:1fr}article,.passage{padding:16px}}@media print{body{background:#fff;color:#000;font-size:12pt}main{padding:0;max-width:none}nav,.actions,button,.no-print{display:none}h1{font-size:23pt}.passage,.notice{background:#fff}a{color:#000;text-decoration:none}.english{font-size:12pt}.options{display:grid;grid-template-columns:1fr 1fr}.space{height:130px}}`;
const voice=`<script>let audioRun=0;document.addEventListener('click',e=>{const b=e.target.closest('[data-audio]');if(!b)return;const status=document.querySelector('#voice-status');if(!('speechSynthesis' in window)){status.textContent='此裝置不支援語音朗讀，請由教師依詳解冊聽力稿朗讀。';return}const run=++audioRun;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(b.dataset.audio);u.lang='en-US';u.rate=.88;const vs=speechSynthesis.getVoices(),v=vs.find(v=>v.lang==='en-US'&&v.localService)||vs.find(v=>v.lang.startsWith('en'));if(v)u.voice=v;u.onstart=()=>{if(run===audioRun)status.textContent='正在朗讀第'+b.dataset.number+'題'};u.onend=()=>{if(run===audioRun)status.textContent='朗讀結束'};u.onerror=e=>{if(run===audioRun&&!['canceled','interrupted'].includes(e.error))status.textContent='裝置朗讀失敗，請使用教師朗讀稿。'};speechSynthesis.speak(u)});document.querySelector('[data-stop]')?.addEventListener('click',()=>{audioRun++;if('speechSynthesis' in window)speechSynthesis.cancel();document.querySelector('#voice-status').textContent='已停止朗讀'});</script>`;
const page=(title,body)=>`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜CAP English AI</title><meta name="description" content="56套本站原創英文練習，含閱讀、克漏字、聽力稿、裝置朗讀與逐題詳解。"><link rel="icon" href="/cap-logo.svg"><style>${style}</style></head><body><main>${body}</main></body></html>`;
function renderQuestion(q,answers){
 let html=`<article id="${q.id}"><p class="tag">${esc(q.section)} · 第${q.number}題</p><h3 class="english">${esc(q.stem)}</h3>`;
 if(q.audio)html+=`<button class="no-print" data-audio="${esc(q.audio)}" data-number="${q.number}">播放本題聽力</button>`;
 html+=`<div class="options">${q.options.map((s,i)=>`<p><b>(${'ABCD'[i]})</b> ${q.pictures?q.pictures[s]:`<span lang="en">${esc(s)}</span>`}</p>`).join('')}</div>`;
 if(answers){
  if(q.audio)html+=`<h4>原創聽力稿</h4><p class="english" lang="en">${esc(q.audio)}</p>`;
  html+=`<p class="answer">答案：${'ABCD'[q.answerIndex]}${q.pictures?'':' · '+esc(q.answer)}</p><h4>逐步判讀</h4><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h4>四選項／三選項分析</h4><ul>${q.optionReasons.map((s,i)=>`<li><b>${'ABCD'[i]}：</b>${esc(s)}</li>`).join('')}</ul>`;
 }
 return html+'</article>';
}
for(const p of papers){
 for(const answers of [false,true]){
  let html=`<header><nav><a href="/">英文學習中心</a><a href="/english-original/">56套原創英文</a><a href="/math-original/">原創數學</a></nav><p class="tag">LTU · READ / LISTEN / REASON</p><h1>${esc(p.title)}<br>${answers?'逐題詳解與教師稿':'學生題本'}</h1><p>閱讀43題＋聽力21題 · 另附2題手寫延伸練習</p><p class="notice">本站原創主題與模板編排，非官方試卷或歷屆原題改寫。題型比例為本站練習設計，並非每年官方題本的完整複製；未宣稱與原卷逐題等難。${esc(p.scoreNote)}閱讀建議60分鐘，聽力練習約25分鐘（裝置朗讀長度及重播會影響時間）。</p><div class="actions"><a href="/english-original/${p.id}${answers?'':'-answers'}">${answers?'開啟學生題本':'閱讀詳解與教師朗讀稿'}</a><a href="/english-original/${p.id}.json" download>教師資料（含答案）</a><button onclick="window.print()">列印／另存PDF</button></div></header><h2>第一部分｜閱讀：43題</h2><p>第1–19題：字彙文法。第20–25題：兩組克漏字。第26–43題：六組閱讀。</p>`;
  for(const q of p.reading.filter(q=>!q.groupId))html+=renderQuestion(q,answers);
  for(const g of p.groups){
   html+=`<section class="passage"><p class="tag">${esc(g.kind)}</p><h2>${esc(g.title)}</h2><div class="english" lang="en">${esc(g.text)}</div>${answers?`<p class="notice">段落理解：${esc(g.gloss)}</p>`:''}</section>`;
   for(const id of g.questionIds)html+=renderQuestion(p.reading.find(q=>q.id===id),answers);
   if(answers&&g.kind==='克漏字'){
    let complete=g.text;for(const id of g.questionIds){const q=p.reading.find(q=>q.id===id);complete=complete.replace(`[${q.blank}]`,q.answer);}
    html+=`<section class="passage"><h3>填回後的完整文章</h3><div class="english" lang="en">${esc(complete)}</div></section>`;
   }
  }
  html+=`<h2>第二部分｜聽力：21題</h2><p class="notice">辨識句意3題、基本問答7題、言談理解11題。這是本站分配，不代表每年官方分配。使用裝置語音引擎朗讀，未製作真人錄音，音質與可用性依裝置而異；也可請教師使用詳解冊稿件朗讀。播放不呼叫本站AI服務或付費語音API。</p><div class="no-print"><button data-stop>停止朗讀</button><p id="voice-status" role="status">按各題播放鍵開始</p></div>`;
  for(const q of p.listening)html+=renderQuestion(q,answers);
  html+=`<h2>第三部分｜手寫延伸（非會考選擇題規格）</h2><p>每題10分，需人工批改。合理不同答案可接受，與64題選擇題分開紀錄。</p>`;
  for(const q of p.writing)html+=`<article><h3>${esc(q.title)}</h3><p class="english" lang="en">${esc(q.prompt)}</p>${answers?`<h4>參考範文</h4><p class="english" lang="en">${esc(q.model)}</p><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h4>本站評分規準</h4><ul>${q.rubric.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p class="notice">${esc(q.note)}</p>`:'<div class="space" aria-label="書寫作答區"></div>'}</article>`;
  html+=voice;await fs.writeFile(`${out}/${p.id}${answers?'-answers':''}.html`,page(p.title,html));
 }
 await fs.writeFile(`${out}/${p.id}.json`,JSON.stringify(p,null,2));
}
let index=`<header><nav><a href="/">← 英文學習中心</a><a href="/math-original/">56套原創數學</a></nav><p class="tag">LTU ORIGINAL ENGLISH COLLECTION</p><h1>56套原創英文練習</h1><p><strong>3,584題選擇題＋112題手寫延伸 · 全部附詳解</strong></p><p class="notice">56個新主題，以共同題型模板編排。所有文章、對話、選項與解說另行撰寫，未使用歷屆試題或出版題庫的圖文。每套閱讀43題、聽力21題；題型比例、自訂手寫與難度安排屬本站練習設計，非官方題本。未宣稱逐題等難或保證達到特定會考等級。</p><p>閱讀提供原文證據、文法與選項分析；聽力提供原創稿件及裝置朗讀；手寫提供範文、可接受答案提醒與人工評分規準。本批產生與網頁詳解閱讀皆不呼叫付費AI API。</p><p><a href="https://cap-rcpet.rcpet.edu.tw/test5-3.html" target="_blank" rel="noopener noreferrer">會考官方英語科題型說明</a>（僅參考評量能力，未重製題目）</p></header><label>搜尋主題<input id="search" type="search" placeholder="例如：Radio、Garden、Book"></label><p id="count" role="status">顯示56套</p>`;
for(const p of papers)index+=`<article data-search="${esc((p.title+' '+p.theme).toLowerCase())}"><p class="tag">閱讀43＋聽力21＋手寫延伸2</p><h2>${esc(p.title)}</h2><div class="actions"><a href="/english-original/${p.id}">開啟題本 →</a><a href="/english-original/${p.id}-answers">逐題詳解與聽力稿 →</a></div></article>`;
index+=`<script>document.querySelector('#search').addEventListener('input',e=>{let n=0;for(const a of document.querySelectorAll('[data-search]')){a.hidden=!a.dataset.search.includes(e.target.value.trim().toLowerCase());if(!a.hidden)n++}document.querySelector('#count').textContent='顯示'+n+'套'});</script>`;
await fs.writeFile(out+'/index.html',page('56套原創英文練習',index));
await fs.mkdir('english-original',{recursive:true});await fs.writeFile('english-original/collection.json',JSON.stringify({version:'english-original-56-v1',papers},null,2));
await fs.writeFile(out+'/release.json',JSON.stringify({version:'english-original-56-v1',papers:56,readingQuestions:56*43,listeningQuestions:56*21,writingExtensions:56*2,passages:56*8,paidApiCalls:0,audio:'device-speech-or-teacher-script',status:'validated-build'},null,2));
console.log(JSON.stringify({papers:56,choice:3584,writingExtensions:112,passages:448,paidApiCalls:0,output:out}));
