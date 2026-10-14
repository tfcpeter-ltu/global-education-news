import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const context={window:{}};vm.createContext(context);
for(const name of ['question-engine-v2.js','explanation-engine.js'])vm.runInContext(await readFile(name,'utf8'),context);
const bank=context.window.LTUQuestionEngine,teaching=context.window.LTUExplanation;
test('every generated question has grounded evidence and distinct option explanations',()=>{
 const types=new Set();let maxLength=0;
 for(let id=0;id<20000;id++){
  const q=bank.make(id),e=teaching.explain(q,(q.answer+1)%4);types.add(q.type);
  assert.equal(e.steps.length,3,q.id);assert.equal(e.options.length,4,q.id);
  assert.equal(e.options.filter(o=>o.correct).length,1,q.id);
  for(const o of e.options){assert(o.reason.length>6,`${q.id} ${o.text}`);assert(!o.reason.includes('沒有表達正確選項'),`${q.id} lacks a specific reason for ${o.text}`);}
  assert.equal(new Set(e.options.map(o=>o.reason)).size,4,`${q.id} repeats generic option feedback`);
  assert((q.meta.audioText||q.stem).includes(e.evidence),`${q.id} quotes non-source evidence`);
  assert(e.memory.length>6,q.id);assert(e.selectedReason,q.id);
  maxLength=Math.max(maxLength,teaching.toText(q,q.answer).length);
 }
 assert.equal(types.size,12);assert(maxLength<5000,'stored detailed explanations must not be truncated');
});
test('grammar instructions and distractors do not rely on the old ambiguities',()=>{
 let since=0,forCount=0;
 for(let id=1;id<20000;id+=12){const q=bank.make(id),a=q.options[q.answer];if(a==='since')since++;if(a==='for')forCount++;assert(!q.options.includes('more safe'));if(a==='was studying')assert(q.stem.includes('already in progress'));}
 assert(since>0&&forCount>0);
 const attend=bank.make(12);assert.equal(attend.options[attend.answer],'attend');assert(!attend.options.includes('join'));
 const subject=bank.make(5*12);assert(!subject.stem.includes('Amy the school'));
});
test('conditional explanation identifies the precise selected error',()=>{
 const q=bank.make(3*12+1),chosen=q.options.indexOf('will finish'),e=teaching.explain(q,chosen);
 assert(e.selectedReason.includes('will'));assert(e.selectedReason.includes('主句'));
 assert(teaching.toText(q,chosen).includes('（你的選擇）'));
});
test('detail and inference feedback point to the actual evidence and excessive claims',()=>{
 const detail=bank.make(3);assert(teaching.explain(detail).options.find(o=>o.text==='The group never meets again.').reason.includes('now meets'));
 const inference=bank.make(6);assert(teaching.explain(inference).options.find(o=>o.text==='Every student was forced to join.').reason.includes('forced'));
});
test('teaching HTML escapes external text and supports a concise Free explanation',()=>{
 const q=bank.make(0);q.stem='<script>bad</script>\n\n'+q.stem;q.options[q.answer]='<img src=x onerror=bad>';
 const html=teaching.render(q,0,true);assert(!html.includes('<script>bad'));assert(html.includes('&lt;img'));
 const brief=teaching.render(bank.make(0),0,false);assert(!brief.includes('比較四個選項'));assert(brief.includes('複習重點'));
});
test('weakness tracking notices become full explanations from the original snapshot',()=>{
 const q=bank.make(37),note={question_id:q.id,category:'weakness',content:'之後會安排同能力題',detail:{type:q.type,skill:q.meta.competency,stem:q.stem,options:q.options,correctAnswerIndex:q.answer,selectedIndex:q.options.indexOf('will finish')}};
 const result=teaching.forNote(note,bank);assert(result.complete);assert(result.text.includes('原題：'));assert(result.text.includes('你的選擇：'));assert(result.text.includes('不在 if 子句')||result.text.includes('不是在 if 子句'));assert(result.text.includes('下次複習：'));
 const changed=structuredClone(note);changed.detail.stem=changed.detail.stem.replaceAll('David','Nancy');const historic=teaching.forNote(changed,bank);assert(historic.text.includes('Nancy'));assert(!historic.text.includes('David'));assert(historic.complete);
});
test('incomplete historical listening notes do not invent a transcript',()=>{
 const q=bank.make(8),note={question_id:'legacy-record',category:'weakness',content:'安排弱點追蹤',detail:{type:'listening',stem:q.stem,options:q.options,correctAnswerIndex:q.answer,selectedIndex:0}};
 const result=teaching.forNote(note,bank);assert(!result.complete);assert(result.text.includes('沒有保存原始錄音文字'));assert(!result.text.includes('Could you help me'));
 assert(!teaching.forNote({category:'weakness',content:'追蹤',detail:{}},bank).complete);
});
