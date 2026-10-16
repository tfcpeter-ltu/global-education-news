import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import crypto from 'node:crypto';
const source=(await fs.readFile('product-core-v1.js','utf8')).replace('window.LTUProductCore={refresh,managesMockResume:true}','window.LTUProductCore={refresh,managesMockResume:true};window.testMock={launch,readDraft}');
const storage=new Map(),requests=[];let fail=true;
function open(){
  const buttons=new Map();const button=k=>{if(!buttons.has(k))buttons.set(k,{dataset:{op:'0',n:'0'}});return buttons.get(k)};
  const app={innerHTML:'',isConnected:true,scrollIntoView(){},insertAdjacentHTML(){},querySelector:button,querySelectorAll(s){return s==='[data-op]'?[button('option')]:[]}};
  const doc={getElementById(id){return id==='pcMock'?app:null}};
  const context={document:doc,location:{},crypto,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
    setTimeout(){},setInterval(){return 1},clearInterval(){},confirm(){return true},alert(m){throw Error(m)},CustomEvent:class{},
    fetch:async(url,opts)=>{
      if(url==='/api/auth/me')return {ok:true,json:async()=>({authenticated:true,user:{id:'owner-a'}})};
      assert.equal(url,'/api/progress/mock');requests.push(JSON.parse(opts.body));
      return {ok:!fail,status:fail?500:200,json:async()=>fail?{ok:false}:{ok:true,readingCorrect:1,listeningCorrect:0,totalCorrect:1,scorePercent:2}};
    }};
  context.window=context;context.addEventListener=()=>{};context.dispatchEvent=()=>{};
  context.LTUQuestionEngine={version:'2.0'};
  context.LTUMockGroups={panel(){return ''},option(){return 'option'},review(){return ''}};
  vm.runInNewContext(source,context);return {api:context.testMock,app,buttons,doc};
}
const qs=Array.from({length:64},(_,i)=>({id:'LTU-CAP-'+String(i+1).padStart(5,'0'),type:'grammar',stem:'question',options:['a','b','c','d'],answer:0,meta:{competency:'test'}}));
let page=open();page.api.launch(page.doc,{},'owner-a',{qs,idx:4,left:123,ans:{0:2},plays:{},part:'reading'});
page.buttons.get('option').onclick();let draft=page.api.readDraft('owner-a');assert.equal(draft.ans[4],0);assert.equal(draft.left,123);assert.equal(page.api.readDraft('owner-b'),null);
// Refresh, then resume the same paper and answers. Submit while disconnected.
page=open();draft=page.api.readDraft('owner-a');page.api.launch(page.doc,{},'owner-a',draft);
page.buttons.get('[data-switch]').onclick();await page.buttons.get('[data-submit]').onclick();
assert(page.app.innerHTML.includes('作答已保留'));assert(page.app.innerHTML.includes('data-retry'));
draft=page.api.readDraft('owner-a');assert.equal(draft.pending,true);assert.equal(draft.ans[0],2);assert.equal(draft.ans[4],0);
// Re-login / reload: the pending paper resumes directly at retry, without re-answering.
page=open();page.api.launch(page.doc,{},'owner-a',page.api.readDraft('owner-a'));
assert(page.app.innerHTML.includes('data-retry'));fail=false;await page.buttons.get('[data-retry]').onclick();
assert.equal(requests.length,2);assert.equal(requests[0].attemptId,requests[1].attemptId);assert.deepEqual(requests[0].items,requests[1].items);
assert.equal(page.api.readDraft('owner-a'),null);assert(page.app.innerHTML.includes('本週 AI 學習診斷'));
console.log('PASS: per-account draft, choices and timer restored after reload, failed sync survives re-login, retry reuses submission id, success clears draft');
