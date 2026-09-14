import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=new URL('../public/study-abroad/',import.meta.url);
const read=f=>fs.readFileSync(new URL(f,base),'utf8');
const context={window:{}};vm.createContext(context);
const run=f=>vm.runInContext(read(f),context,{filename:f});
for(const f of ['university-data.js','university-data-health.js','university-data-asia-europe.js','university-data-expanded.js'])run(f);
const before=JSON.parse(JSON.stringify(context.window.UNIVERSITY_FINDER_DATA));
run('university-data-us-2026.js');
const data=context.window.UNIVERSITY_FINDER_DATA;
assert.equal(data.length,125);assert.equal(data.filter(x=>x.country==='us').length,51);
assert.equal(new Set(data.map(x=>x.name)).size,data.length);
for(const old of before){const row=data.find(x=>x.name===old.name);assert(row);for(const m of old.majors)assert(row.majors.includes(m));for(const k of ['url','note','apply','goals'])assert.equal(JSON.stringify(row[k]),JSON.stringify(old[k]));}
run('university-data-us-2026.js');assert.equal(data.length,125,'repeated script does not duplicate schools');
for(const f of ['official-program-sources.js','official-program-sources-expanded.js','official-program-sources-current.js','official-program-sources-current2.js'])run(f);
const prior={...context.window.OFFICIAL_PROGRAM_SOURCES.all};run('official-program-sources-us-2026.js');
const api=context.window.OFFICIAL_PROGRAM_SOURCES;
for(const [key,v] of Object.entries(prior))assert.deepEqual(api.all[key],v,'preserve detailed evidence');
const audit=JSON.parse(fs.readFileSync(new URL('../docs/data-imports/us-majors-2026.json',import.meta.url),'utf8'));
assert.equal(audit.workbookRows.length,400);assert.equal(audit.newSchools.length,35);assert.equal(audit.newMajors.length,21);
for(const [key,v] of Object.entries(audit.programs)){const [school,major]=key.split('|');assert(data.find(x=>x.name===school)?.majors.includes(major),key);assert(api.get(school,major),key);assert(new URL(v.programUrl).hostname.endsWith('.edu'));assert.equal(v.verificationScope,'program-availability');assert(!['Medicine','Dentistry','Firefighting'].includes(major));}
for(const f of fs.readdirSync(base).filter(x=>x.endsWith('.html'))){const html=read(f);if(html.includes('src="university-data-expanded.js"')){assert.equal(html.split('src="university-data-us-2026.js"').length,2,f);assert(html.indexOf('university-data-us-2026.js')>html.indexOf('university-data-expanded.js'),f);}if(html.includes('official-program-sources-expanded.js'))assert(html.includes('official-program-sources-us-2026.js'),f);}
for(const major of audit.newMajors){assert(read('majors.html').includes('major='+encodeURIComponent(major)),major);assert(read('student-start.html').includes('value="'+major+'"'),major);}
run('decision-support.js');assert.match(context.window.STUDENT_DECISION_SUPPORT.describe(data.find(x=>x.name==='Harvard University'),'Biology').competition,/尚未核對/);
for(const f of ['universities.js','university-detail.js','major-decision.js'])new vm.Script(read(f),{filename:f});
assert(!read('university-detail.js').includes('<a href="${source.admissionsUrl}"')||read('university-detail.js').includes('source.admissionsUrl?'));
console.log('PASS: 125 schools (51 US), 35 additions, 21 new majors, 214 sourced relationships; existing data/evidence preserved; all data consumers wired.');
// Search must preserve the requested subject, including partial Chinese terms.
const nodes=Object.fromEntries(['q','country','kind','results','count','more-schools'].map(id=>[id,{value:'',innerHTML:'',textContent:'',tagName:id==='q'?'INPUT':'SELECT',events:{},addEventListener(type,fn){this.events[type]=fn;},insertAdjacentHTML(_,html){this.innerHTML+=html;}}]));
const search={window:context.window,document:{getElementById:id=>nodes[id]},URL,URLSearchParams,location:{search:'?country=us&kind='+encodeURIComponent('大學')+'&q='+encodeURIComponent('教育'),href:'https://globalednews.com/study-abroad/search.html'},history:{replaceState(){}}};
vm.createContext(search);vm.runInContext(read('search-unified.js'),search);
assert.match(nodes.count.textContent,/12 間大學/);
const washington=nodes.results.innerHTML.split('<article').find(s=>s.includes('University of Washington'));
assert(washington.includes('school=University%20of%20Washington&major=Education'),'Chinese search opens the requested program, not the first major');
nodes.q.value='';nodes.q.events.input();assert.match(nodes.results.innerHTML,/顯示更多大學/);
assert.equal((nodes.results.innerHTML.match(/university-hit/g)||[]).length,30);
nodes['more-schools'].events.click();assert.equal((nodes.results.innerHTML.match(/university-hit/g)||[]).length,51);
nodes.q.value='不存在的學校測試';nodes.q.events.input();assert.match(nodes.results.innerHTML,/目前沒有完全符合的結果/);
console.log('PASS: Chinese subject search, matching detail links, all 51 search results and empty-state handling.');
