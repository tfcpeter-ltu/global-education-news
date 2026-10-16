import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {englishModuleRoute,englishModuleView} from '../lib/english-library-routing.mjs';
assert.equal(englishModuleRoute('/english-original/'),'#english-library');
for(let n=1;n<=56;n++){
 const id=`english-${String(n).padStart(2,'0')}`;
 for(const answers of [false,true]){
  const path=`/english-original/${id}${answers?'-answers':''}`;
  const route=`#english-${answers?'answers':'paper'}/${id}`;
  assert.equal(englishModuleRoute(path),route);
  assert.equal(englishModuleView(route).path,path+'.html?embedded=1');
  const html=await fs.readFile('public'+path+'.html','utf8');
  assert.ok(html.includes('data-library-module="english"'));
  assert.ok(html.includes('window.top===window'));
  assert.ok(!/href="\/english-original\/english-\d+(?:-answers)?"/.test(html));
  const redirect=html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const context={document:{documentElement:{}},location:{hash:'#eng-01-r1',replace(url){this.destination=url}}};
  context.window={};context.window.top=context.window;
  vm.runInNewContext(redirect,context);
  assert.equal(context.location.destination,'/'+route+'/eng-01-r1');
  const embedded={document:{documentElement:{}},location:{hash:'',replace(){throw Error('Embedded view redirected')}}};
  embedded.window={top:{}};vm.runInNewContext(redirect,embedded);
 }
}
assert.equal(englishModuleView('#english-paper/english-57'),null);
assert.equal(englishModuleView('#english-answers/../../admin'),null);
assert.equal(englishModuleRoute('/english-original/english-01.json'),null);
const shell=await fs.readFile('english-library-shell.js','utf8');
const home={hidden:false,src:'/final-v3.html'},frame={getAttribute(){return this.src},contentWindow:{speechSynthesis:{cancel(){}}}},panel={querySelector(){return frame}},events={},location={hash:'#english-library'};
const document={title:'',getElementById(){return home},createElement(tag){return tag==='section'?panel:{}},body:{append(){}},head:{append(){}}};
vm.runInNewContext(shell.replace(/^import[^\n]+\n/,''),{document,location,englishModuleView,window:{addEventListener(n,f){events[n]=f}}});
assert.equal(home.hidden,true);assert.equal(panel.hidden,false);assert.equal(frame.src,'/english-original/index.html?embedded=1');
location.hash='#english-paper/english-01';events.hashchange();assert.equal(frame.src,'/english-original/english-01.html?embedded=1');
location.hash='';events.hashchange();assert.equal(home.hidden,false);assert.equal(panel.hidden,true);assert.equal(home.src,'/final-v3.html');
const index=await fs.readFile('public/index.html','utf8'),landing=await fs.readFile('public/final-v3.html','utf8');
assert.ok(index.includes('english-library-shell.js'));
assert.ok(landing.includes('id="originalEnglishLibrary"')&&landing.includes('href="/#english-library"'));
console.log('English integration verified: 112 views, legacy redirects, internal navigation, preserved learning frame.');
