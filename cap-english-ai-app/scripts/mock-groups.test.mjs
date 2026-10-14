import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const c=vm.createContext({});for(const f of ['mock-groups.js','explanation-engine.js'])vm.runInContext(await readFile(f,'utf8'),c);
const e=c.LTUMockGroups,t=c.LTUExplanation;
assert.equal(e.groups.length,12);assert.equal(e.all.length,48);assert.equal(new Set(e.all.map(q=>q.id)).size,48);
const a=e.select(new Set()),b=e.select(new Set(a.map(q=>q.id)));assert.equal(a.length,24);assert.equal(b.length,24);assert.equal(b.filter(q=>a.some(x=>x.id===q.id)).length,0);
const repeated=e.select(new Set(e.all.map(q=>q.id)));assert(repeated.every(q=>q.meta.repeated));
for(const set of [a,b]){assert.equal(new Set(set.map(q=>q.meta.groupId)).size,6);for(let i=0;i<24;i+=4){const chunk=set.slice(i,i+4);assert(chunk.every(q=>q.meta.passage===chunk[0].meta.passage));assert.equal(new Set(chunk.map(q=>q.meta.groupIndex)).size,4);}}
for(const q of e.all){assert(q.stem.length<=900);assert(q.options.every(o=>o.length<=180));assert(q.meta.passage.includes(q.meta.teaching.evidence)||q.meta.teaching.evidence.includes(' / '));assert.equal(q.options.length,4);assert(q.answer>=0&&q.answer<4);const x=t.explain(q,(q.answer+1)%4);assert.equal(new Set(x.options.map(o=>o.reason)).size,4);assert.equal(x.options[q.answer].reason,q.explanation);assert(t.toText(q,0).length<=5000);assert(!e.panel(q).includes(q.explanation));const note=t.forNote({question_id:q.id,category:'weakness',content:t.toText(q,0),detail:{stem:q.stem,options:q.options,correctAnswerIndex:q.answer,selectedIndex:0,type:q.type}},null);assert(note.text.includes(q.meta.teaching.evidence));assert(note.text.includes(q.explanation));assert.equal(e.byId(q.id),q);}
const launch=await readFile('launch-ui-v1.js','utf8');assert(launch.includes('ltu:mock-assembled'));assert(launch.includes('LTUMockGroups?.byId(id)'));assert(launch.includes('LTUMockGroups.panel(q)'));
console.log('PASS: 12 original groups, 48 questions; two unseen sets, shared passages, safe snapshots, four option reasons, resume lookup, explicit review labels.');
