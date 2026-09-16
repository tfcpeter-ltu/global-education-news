import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const dir='dist/study-abroad';
let count=0,reference;
function walk(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,x.name);if(x.isDirectory()){walk(f);continue;}if(!f.endsWith('.html'))continue;const html=fs.readFileSync(f,'utf8');const h=html.match(/<header[^>]*study-nav[^>]*>[\s\S]*?<\/header>/)?.[0];assert.ok(h,f);const normalized=h.replace(/ aria-current="page"/g,'');reference??=normalized;assert.equal(normalized,reference,f);for(const [,url] of h.matchAll(/(?:href|src)="([^"]+)"/g))assert.ok(fs.existsSync('dist'+url),f+' '+url);assert.ok(html.includes('navigation.css'),f);count++;}}
walk(dir);
const html=fs.readFileSync('public/study-abroad/student-start.html','utf8');
const script=fs.readFileSync('public/study-abroad/student-start.js','utf8');
function form(query,saved={}){const nodes={};for(const [,id,body] of html.matchAll(/<select id="([^"]+)">([\s\S]*?)<\/select>/g)){nodes[id]={value:'',options:[...body.matchAll(/<option(?: value="([^"]*)")?>([^<]*)<\/option>/g)].map(m=>({value:m[1]??m[2]})),events:{},addEventListener(k,fn){this.events[k]=fn;}};}for(const id of ['start-major-link','start-decision-link','start-country-link','start-go','start-clear'])nodes[id]={events:{},addEventListener(k,fn){this.events[k]=fn;}};
let data=JSON.stringify(saved);const location={search:query,pathname:'/study-abroad/student-start.html'};const ctx={document:{getElementById:id=>nodes[id]},location,URLSearchParams,localStorage:{getItem:()=>data,setItem:(_,v)=>data=v,removeItem:()=>data=null},history:{replaceState:(_,__,url)=>location.search=''}};vm.runInNewContext(script,ctx);return {nodes,location,data:()=>data};}
const inputs={country:'uk',major:'Architecture',curriculum:'OSSD',grade:'85–89%',english:'IELTS 6.5 左右／同等',goal:'名校／研究'};
let f=form('?'+new URLSearchParams(inputs),{country:'us',goal:'就業',priority:'當地就業／企業評價'});
for(const [k,v] of Object.entries(inputs))assert.equal(f.nodes['start-'+k].value,v);
assert.equal(JSON.parse(f.data()).country,'us','preview must not overwrite previous plan');
f.nodes['start-go'].events.click();assert.equal(new URLSearchParams(f.location.href.split('?')[1]).get('goal'),inputs.goal);assert.equal(JSON.parse(f.data()).priority,undefined);
f=form('?priority='+encodeURIComponent('Co-op／實習'));assert.equal(f.nodes['start-goal'].value,'Co-op／就業');
f=form('?country=&goal=invalid',{country:'us',goal:'就業'});assert.equal(f.nodes['start-country'].value,'');assert.equal(f.nodes['start-goal'].value,'');
f.nodes['start-clear'].events.click();assert.equal(f.data(),null);assert.equal(f.location.search,'');
assert.ok(!html.includes('start-priority'));
console.log('Passed: '+count+' identical navigation headers with existing link targets; six-field hydration, legacy goals, URL precedence, preview, submit and clear.');
