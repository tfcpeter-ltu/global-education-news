import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {originalEnglishPapers} from '../lib/original-english.mjs';
const papers=originalEnglishPapers();assert.equal(papers.length,56);
const ids=new Set(),passages=new Set();let choice=0,writing=0,listening=0;
for(const p of papers){
 assert.equal(p.reading.length,43);assert.equal(p.listening.length,21);assert.equal(p.groups.length,8);assert.equal(p.writing.length,2);
 assert.equal(p.reading.filter(q=>!q.groupId).length,19);
 assert.equal(p.groups.filter(g=>g.kind==='克漏字').length,2);
 assert.equal(p.groups.filter(g=>g.kind==='閱讀題組').length,6);
 assert.equal(p.listening.filter(q=>q.section==='辨識句意').length,3);
 assert.equal(p.listening.filter(q=>q.section==='基本問答').length,7);
 assert.equal(p.listening.filter(q=>q.section==='言談理解').length,11);
 for(const q of [...p.reading,...p.listening]){
  assert.ok(!ids.has(q.id));ids.add(q.id);choice++;
  assert.equal(q.options.length,q.audio?3:4);assert.equal(new Set(q.options).size,q.options.length);
  assert.equal(q.options[q.answerIndex],q.answer);assert.equal(q.optionReasons.length,q.options.length);
  assert.ok(q.optionReasons.every(s=>s.length>8));assert.ok(q.steps.length>=4);assert.ok(q.evidence.length>3);
  if(q.audio){assert.ok(q.audio.includes(q.evidence),q.id);listening++;}
  if(q.pictures){assert.equal(Object.keys(q.pictures).length,3);for(const o of q.options)assert.ok(q.pictures[o].startsWith('<svg'));}
  if(q.groupId){const g=p.groups.find(g=>g.id===q.groupId);assert.ok(g);assert.ok(g.text.includes(q.evidence),q.id+' evidence');}
 }
 for(const g of p.groups){
  assert.ok(!passages.has(g.text));passages.add(g.text);assert.equal(g.questionIds.length,3);
  if(g.kind==='克漏字'){
   let filled=g.text;for(const id of g.questionIds){const q=p.reading.find(q=>q.id===id);assert.ok(filled.includes(`[${q.blank}]`));filled=filled.replace(`[${q.blank}]`,q.answer);}
   assert.ok(!/\[\d\]/.test(filled));
   assert.ok(!/instead to|instead for|help they |help their /.test(filled));
  }
 }
 for(const [i,q] of p.writing.entries()){
  const words=q.model.trim().split(/\s+/).length;assert.ok(words>=(i?50:40)&&words<=(i?70:60),`${q.id} ${words}`);
  assert.equal(q.rubric.length,4);assert.ok(q.note.includes('答案')||q.note.includes('經驗'));writing++;
 }
 // Independently verify arithmetic and temporal facts embedded in listening answers.
 const n=Number(p.id.slice(-2)),fee=12+(n-1)*2,seats=12+(n-1)%9,hour=9+(n-1)%3;
 assert.equal(p.listening[10].answer,`${hour}:15`);
 assert.equal(p.listening[12].answer,`${fee*2} dollars.`);
 assert.equal(p.listening[19].answer,'Three.');assert.ok(p.listening[19].audio.includes(String(seats-3)));
 const student=await fs.readFile(`public/english-original/${p.id}.html`,'utf8');
 const teacher=await fs.readFile(`public/english-original/${p.id}-answers.html`,'utf8');
 assert.ok(!student.includes('答案：')&&!student.includes('逐步判讀')&&!student.includes('參考範文'));
 assert.ok(teacher.includes('填回後的完整文章')&&teacher.includes('原創聽力稿'));
 assert.ok(!/source_question|research\/|file:\/\/|C:\\Users/.test(teacher));
}
assert.equal(choice,3584);assert.equal(listening,1176);assert.equal(writing,112);assert.equal(passages.size,448);
const source=await fs.readFile('lib/original-english.mjs','utf8');assert.ok(!/fetch\(|openai|api[_-]?key|research\//i.test(source));
// Exercise the real generated audio controls without any audio/network service.
const sample=await fs.readFile('public/english-original/english-01.html','utf8');
const audioCode=[...sample.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('SpeechSynthesisUtterance'));
const status={textContent:''};let click,stop,active;
const synth={getVoices:()=>[],cancel(){if(active)active.onerror?.({error:'canceled'})},speak(u){active=u;u.onstart?.()}};
const context={window:{speechSynthesis:synth},speechSynthesis:synth,SpeechSynthesisUtterance:class{constructor(text){this.text=text}},document:{addEventListener(_,f){click=f},querySelector(s){return s==='#voice-status'?status:{addEventListener(_,f){stop=f}}}}};
vm.runInNewContext(audioCode,context);
const press=()=>click({target:{closest:()=>({dataset:{audio:'An original listening script.',number:'1'}})}});
press();assert.equal(status.textContent,'正在朗讀第1題');
stop();assert.equal(status.textContent,'已停止朗讀');
press();assert.equal(status.textContent,'正在朗讀第1題');
active.onerror({error:'synthesis-failed'});assert.ok(status.textContent.includes('裝置朗讀失敗'));
console.log(JSON.stringify({passed:true,papers:56,choice,writing,listening,uniquePassages:passages.size,paidApiCalls:0}));
