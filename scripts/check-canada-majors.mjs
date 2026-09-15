import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const dir='public/study-abroad/';
const ctx={window:{}};vm.createContext(ctx);
const run=f=>vm.runInContext(fs.readFileSync(dir+f,'utf8'),ctx,{filename:f});
for(const f of ['university-data.js','university-data-health.js','university-data-asia-europe.js','university-data-expanded.js','university-data-us-2026.js'])run(f);
const before=JSON.parse(JSON.stringify(ctx.window.UNIVERSITY_FINDER_DATA));
run('university-data-ca-2026.js');
const data=ctx.window.UNIVERSITY_FINDER_DATA;
assert.equal(data.length,130);assert.equal(data.filter(x=>x.country==='canada').length,20);
assert.equal(new Set(data.map(x=>x.name)).size,data.length);
for(const old of before){const x=data.find(x=>x.name===old.name);assert(x);for(const m of old.majors)assert(x.majors.includes(m));for(const k of ['url','note','apply','goals'])assert.equal(JSON.stringify(x[k]),JSON.stringify(old[k]));}
const once=JSON.stringify(data);run('university-data-ca-2026.js');assert.equal(JSON.stringify(data),once);
for(const f of ['official-program-sources.js','official-program-sources-expanded.js','official-program-sources-current.js','official-program-sources-current2.js','official-program-sources-us-2026.js'])run(f);
const oldSources=JSON.parse(JSON.stringify(ctx.window.OFFICIAL_PROGRAM_SOURCES.all));
run('official-program-sources-ca-2026.js');
const source=ctx.window.OFFICIAL_PROGRAM_SOURCES;
for(const [k,v] of Object.entries(oldSources))assert.equal(JSON.stringify(source.all[k]),JSON.stringify(v));
const audit=JSON.parse(fs.readFileSync('docs/data-imports/canada-majors-2026.json','utf8'));
assert.equal(audit.rows.length,100);assert.equal(audit.newSchools.length,5);assert.equal(audit.newRelationships.length,55);
for(const row of audit.rows)for(const key of row.programKeys){const [school,major]=key.split('|');assert(data.find(x=>x.name===school&&x.country==='canada')?.majors.includes(major),key);}
for(const key of audit.newRelationships){const [school,major]=key.split('|');assert(source.get(school,major)?.programUrl,key);}
assert.match(source.get('McGill University','Communication').program,/輔修/);
assert.match(source.get('University of British Columbia','Nursing').program,/Okanagan/);
assert.match(source.get('University of British Columbia','Nursing').highlights.join(' '),/不接受一般國際學生/);
assert.equal(source.get('University of Toronto','Nursing').programKind,'second-entry');
assert(!data.find(x=>x.name==='Toronto Metropolitan University').majors.includes('Data Science'));
assert(!data.find(x=>x.name==='Université de Montréal').majors.includes('AI'));
for(const file of fs.readdirSync(dir).filter(x=>x.endsWith('.html'))){const html=fs.readFileSync(dir+file,'utf8');for(const prefix of ['university-data','official-program-sources']){if(html.includes(prefix+'-us-2026.js')){assert.equal(html.split(prefix+'-ca-2026.js').length-1,1,file);assert(html.indexOf(prefix+'-ca-2026.js')>html.indexOf(prefix+'-us-2026.js'));}}}
const hub=fs.readFileSync(dir+'countries/canada.html','utf8');assert.equal((hub.match(/class="hub-card"/g)||[]).length,14);
for(const href of [...hub.matchAll(/href="([^"]*universities.html\?[^"]*)"/g)].map(x=>x[1])){const u=new URL(href.replaceAll('&amp;','&'),'https://globalednews.com/study-abroad/countries/canada.html');assert.equal(u.searchParams.get('country'),'canada');const m=u.searchParams.get('major');if(m)assert(data.some(x=>x.country==='canada'&&x.majors.includes(m)),m);}
const start=fs.readFileSync(dir+'student-start.html','utf8');for(const m of new Set(audit.newRelationships.map(x=>x.split('|')[1])))assert(start.includes('value="'+m+'"')||start.includes('<option>'+m+'</option>'),m);
run('decision-support.js');assert.match(ctx.window.STUDENT_DECISION_SUPPORT.describe(data.find(x=>x.name==='University of Toronto'),'Nursing').competition,/尚未核對/);
for(const file of ['universities.js','university-detail.js','university-data-ca-2026.js','official-program-sources-ca-2026.js'])new vm.Script(fs.readFileSync(dir+file,'utf8'));
console.log('PASS: 100 workbook rows mapped; 5 schools / 55 relationships added; 130 total schools / 20 Canada; existing US and other countries preserved; source and entry-route checks passed.');
const nodes=Object.fromEntries(['q','country','kind','results','count','more-schools'].map(id=>[id,{value:'',innerHTML:'',textContent:'',tagName:id==='q'?'INPUT':'SELECT',events:{},addEventListener(type,fn){this.events[type]=fn;},insertAdjacentHTML(_,html){this.innerHTML+=html;}}]));
const search={window:ctx.window,document:{getElementById:id=>nodes[id]},URL,URLSearchParams,location:{search:'?country=canada&kind='+encodeURIComponent('大學')+'&q='+encodeURIComponent('護理'),href:'https://globalednews.com/study-abroad/search.html'},history:{replaceState(){}}};
vm.createContext(search);vm.runInContext(fs.readFileSync(dir+'search-unified.js','utf8'),search);
assert.match(nodes.count.textContent,/10 間大學/);
assert(nodes.results.innerHTML.includes('school=University%20of%20Toronto&major=Nursing'));
nodes.q.value='麥马士達'.replace('马','馬');nodes.q.events.input();assert.match(nodes.count.textContent,/1 間大學/);assert.match(nodes.results.innerHTML,/McMaster University/);
nodes.q.value='';nodes.q.events.input();assert.match(nodes.count.textContent,/20 間大學/);
nodes.q.value='不存在的學校測試';nodes.q.events.input();assert.match(nodes.results.innerHTML,/目前沒有完全符合的結果/);
console.log('PASS: Canadian Chinese subject search, school aliases, matching detail links and empty-state handling.');
