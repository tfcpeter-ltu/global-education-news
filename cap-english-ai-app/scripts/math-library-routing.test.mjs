import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {mathModuleRoute,mathModuleView} from '../lib/math-library-routing.mjs';
assert.equal(mathModuleRoute('/math-original/'),'#math-library');
assert.equal(mathModuleRoute('/math-original'),'#math-library');
for(let n=1;n<=56;n++){
 const id=`original-${String(n).padStart(2,'0')}`;
 for(const answers of [false,true]){
  const path=`/math-original/${id}${answers?'-answers':''}`,route=`#math-${answers?'answers':'paper'}/${id}`;
  assert.equal(mathModuleRoute(path),route);assert.equal(mathModuleView(route).path,path+'.html?embedded=1');
  const html=await fs.readFile('public'+path+'.html','utf8');
  assert.ok(html.includes('data-library-module="math"'));
  assert.ok(!/href="\/math-original\/original-\d+(?:-answers)?"/.test(html));
  const redirect=html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const context={document:{documentElement:{}},location:{hash:'#original-17-q1',replace(url){this.destination=url}}};
  context.window={};context.window.top=context.window;vm.runInNewContext(redirect,context);
  assert.equal(context.location.destination,'/math'+route+'/original-17-q1');
  const embedded={document:{documentElement:{}},location:{hash:'',replace(){throw Error('Embedded view redirected')}}};
  embedded.window={top:{}};vm.runInNewContext(redirect,embedded);
 }
}
assert.equal(mathModuleView('#math-paper/original-57'),null);
assert.equal(mathModuleView('#math-answers/../../admin'),null);
assert.equal(mathModuleRoute('/math-original/original-01.json'),null);
const frame={getAttribute(){return this.src}},panel={querySelector(){return frame}},main={hidden:false,after(){}},brand={},events={},location={hash:'#math-library'};
let tutorClick;const header={getBoundingClientRect(){return {height:94}},addEventListener(_,f){tutorClick=f}};let scrolls=0;
const document={title:'',querySelector(s){return s==='main.mathShell'?main:s==='.mathHeader'?header:s==='.mathBrand'?brand:{scrollIntoView(){scrolls++}}},createElement(tag){return tag==='section'?panel:{}},head:{append(){}},body:{dataset:{}},documentElement:{style:{setProperty(){}}}};
const shell=await fs.readFile('math-site/library-shell.mjs','utf8');
vm.runInNewContext(shell.replace(/^import[^\n]+\n/,''),{document,location,mathModuleView,ResizeObserver:class{observe(){}},window:{scrollTo(){},addEventListener(n,f){events[n]=f}}});
assert.equal(main.hidden,true);assert.equal(panel.hidden,false);assert.equal(frame.src,'/math-original/index.html?embedded=1');
location.hash='#math-answers/original-01';events.hashchange();assert.equal(frame.src,'/math-original/original-01-answers.html?embedded=1');
location.hash='#practice';events.hashchange();assert.equal(main.hidden,false);assert.equal(panel.hidden,true);assert.equal(scrolls,1);assert.equal(brand.href,'#');
location.hash='#capTutorPanel';events.hashchange();assert.equal(scrolls,2);assert.equal(main.hidden,false);
location.hash='#math-library';events.hashchange();let prevented=false,stopped=false;
tutorClick({target:{closest:()=>true},preventDefault(){prevented=true},stopPropagation(){stopped=true}});events.hashchange();
assert.equal(location.hash,'#capTutorPanel');assert.ok(prevented&&stopped);assert.equal(main.hidden,false);
const home=await fs.readFile('public/math.html','utf8');
assert.ok(home.includes('math-library-shell.mjs')&&home.includes('href="#math-library"'));
console.log('Math integration verified: 112 views, legacy redirects, shared math navigation, preserved learning content.');
