import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const source=readFileSync('public/study-abroad/shortlist.js','utf8');
function run(values){const nodes={}; const storage={getItem:k=>values[k]??null,setItem:(k,v)=>values[k]=v};const document={getElementById:id=>nodes[id]??=( {innerHTML:'',textContent:'',addEventListener(){}}),querySelectorAll:()=>[]};vm.runInNewContext(source,{localStorage:storage,document,window:{UNIVERSITY_FINDER_DATA:[{name:'Oxford',majors:['Computer Science'],country:'uk'}]},Date,URLSearchParams,encodeURIComponent});return nodes;}
test('existing comparison schools and subject recover into My Schools without overwriting notes',()=>{const v={studyNavigatorCompare:'["Oxford"]',studyNavigatorCompareMajor:'Computer Science',studyNavigatorShortMeta:'{"Oxford":{"note":"keep"}}'};const n=run(v);assert.equal(n['short-count'].textContent,'目前收藏 1 間大學');assert.match(n['short-root'].innerHTML,/value="Computer Science" selected/);assert.equal(JSON.parse(v.studyNavigatorShortMeta).Oxford.note,'keep');assert.equal(JSON.parse(v.studyNavigatorShortMeta).Oxford.major,'Computer Science');v.studyNavigatorShortlist='[]';run(v);assert.equal(v.studyNavigatorShortlist,'[]');});
test('malformed legacy storage does not leave the page blank',()=>{const n=run({studyNavigatorShortlist:'bad',studyNavigatorCompare:'null'});assert.match(n['short-root'].innerHTML,/你的申請清單還是空的/);});
test('explicit per-school major is preserved over comparison fallback',()=>{const v={studyNavigatorShortlist:'["Oxford"]',studyNavigatorCompareMajor:'Computer Science',studyNavigatorShortMeta:'{"Oxford":{"major":""}}'};const n=run(v);assert.doesNotMatch(n['short-root'].innerHTML,/value="Computer Science" selected/);});
