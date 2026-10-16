import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const local=await fs.readFile('local-tutor.js','utf8'),ui=await fs.readFile('tutor.js','utf8');
for(const math of [false,true]){
  const panels=[];let requests=0;
  function element(){return {value:'',children:[],handlers:{},append(...children){this.children.push(...children)},setAttribute(){},scrollIntoView(){},addEventListener(event,fn){this.handlers[event]=fn}}}
  const host={ownerDocument:null,append(el){panels.push(el)},querySelector(){return null}};
  const doc={head:{append(){}},getElementById(id){return panels.find(p=>p.id===id)},querySelector(s){if(s==='main.wrap'||s==='.mathShell')return host;return this.getElementById(s.slice(1))},createElement(){const el=element(),children=new Map();el.querySelector=s=>{if(!children.has(s))children.set(s,element());return children.get(s)};return el}};host.ownerDocument=doc;
  const outer=math?doc:{querySelector(s){return s==='#capapp'?{contentDocument:doc}:null}};
  const context={document:outer,location:{pathname:math?'/math':'/'},setInterval(){},clearInterval(){},fetch:async(url,options)=>{requests++;assert.equal(JSON.parse(options.body).mode,'advanced');return {ok:false,json:async()=>({error:'AI_NOT_CONFIGURED'})}}};context.window=context;
  vm.createContext(context);vm.runInContext(local,context);vm.runInContext(ui,context);
  const panel=panels[0],input=panel.querySelector('textarea');
  input.value=math?'負號和分數一直算錯':'我背不起來單字';
  panel.querySelector('form').handlers.submit({preventDefault(){}});
  assert.equal(requests,0);assert.equal(panel.querySelector('.tutorLog').children.length,2);
  assert(panel.querySelector('.tutorStatus').textContent.includes('未使用外部 AI'));
  input.value='這個沒有關鍵字的問題 xyz';panel.querySelector('form').handlers.submit({preventDefault(){}});assert.equal(requests,0);
  const help=context.LTULocalTutor.answer(math?'math':'english',input.value);assert.equal(help.topic,null);
  await panel.querySelector('.tutorAdvanced').handlers.click();assert.equal(requests,1);
}
console.log('PASS: English and Math basic guidance and unknown questions make zero network calls; only explicit advanced button sends a request');
