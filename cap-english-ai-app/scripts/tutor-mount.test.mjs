import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source=await fs.readFile(new URL('../tutor.js',import.meta.url),'utf8');
// Exercise the real initializer and its polling in both the iframe and direct-page layouts.
function check(math, delayed=false){
  const panels=[],styles=[],links=[];
  const stub=()=>({addEventListener(){},append(){},scrollIntoView(){},setAttribute(){}});
  const host={ownerDocument:null,querySelector(){return null},append(el){panels.push(el)}};
  const doc={head:{append(el){styles.push(el)}},getElementById(id){return panels.find(p=>p.id===id)||null},
    querySelector(selector){
      if(selector==='main.wrap'||selector==='.mathShell')return host;
      if(selector==='.mathHeader nav,.v3links')return {append(el){links.push(el)}};
      return this.getElementById(selector.slice(1));
    },
    createElement(){const children=new Map();return {...stub(),querySelector(selector){if(!children.has(selector))children.set(selector,stub());return children.get(selector)}}}
  };
  host.ownerDocument=doc;
  const frame={contentDocument:delayed?null:doc};
  const outer=math?doc:{getElementById(){return null},querySelector(s){return s==='#capapp'?frame:null}};
  const timers=[];
  const context=vm.createContext({document:outer,location:{pathname:math?'/math':'/'},setInterval(fn){timers.push(fn);return timers.length},clearInterval(){}});
  vm.runInContext(source,context);
  if(delayed){assert.equal(panels.length,0);frame.contentDocument=doc;}
  for(const tick of timers)tick();
  // A second script execution must also leave the existing conversation untouched.
  const first=panels[0];first.conversation='keep student draft';
  vm.runInContext(source,context);
  for(const tick of timers)tick();
  assert.equal(panels.length,1,`${math?'math':'english'} duplicate panel`);
  assert.equal(styles.length,1,'duplicate stylesheet');
  assert.equal(links.length,1,'duplicate navigation link');
  assert.equal(panels[0].conversation,'keep student draft');
}
check(false);check(false,true);check(true);
console.log('PASS: English iframe, delayed iframe load, Math page, repeated polling and repeated script each keep one tutor panel/style/link and preserve conversation');
