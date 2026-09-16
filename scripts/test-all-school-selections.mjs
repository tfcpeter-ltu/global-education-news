import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const dir='public/study-abroad/';
const loaded={window:{}};vm.createContext(loaded);
const html=fs.readFileSync(dir+'compare.html','utf8');
for(const m of html.matchAll(/src="([^"?]+\.js)[^"]*"/g))if(m[1]!=='compare.js')vm.runInContext(fs.readFileSync(dir+m[1],'utf8'),loaded,{filename:m[1]});
const data=loaded.window.UNIVERSITY_FINDER_DATA;
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const sources=Object.fromEntries(['universities','shortlist','compare','university-detail'].map(n=>[n,fs.readFileSync(dir+n+'.js','utf8')]));
function render(page,values={},query=''){
  const nodes={},extra=[];
  class Element{
    constructor(id='',tag='DIV'){this.id=id;this.tagName=tag;this.value='';this.innerHTML='';this.textContent='';this.events={};this.style={};this.dataset={};this.options=[];this.classList={add(){}};}
    addEventListener(name,fn){this.events[name]=fn;}
    insertAdjacentHTML(_,s){this.innerHTML+=s;for(const m of s.matchAll(/<option value="([^"]*)"/g))this.options.push({value:decode(m[1])});}
    appendChild(x){extra.push(x);if(x.id)nodes[x.id]=x;}
    remove(){delete nodes[this.id];}
  }
  for(const id of ['uni-q','uni-country','uni-major','uni-goal','uni-results','uni-count','profile-banner','short-root','short-count','short-summary','short-clear','compare-root','clear-compare','compare-major','detail-root'])nodes[id]=new Element(id,id==='uni-q'?'INPUT':'SELECT');
  const allHTML=()=>Object.values(nodes).map(n=>n.innerHTML).join('\n');
  const document={body:new Element(),getElementById(id){if(nodes[id])return nodes[id];if(allHTML().includes('id="'+id+'"'))return nodes[id]=new Element(id);return null;},createElement:t=>new Element('',t.toUpperCase()),querySelectorAll(selector){const cls=selector.slice(1),result=[];for(const m of allHTML().matchAll(/<(button|select|input)\b([^>]*)>/g)){const attrs=Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));if(!attrs.class?.split(' ').includes(cls))continue;const el=new Element('',m[1].toUpperCase());for(const [k,v] of Object.entries(attrs))if(k.startsWith('data-'))el.dataset[k.slice(5)]=v;result.push(el);}return result;}};
  // Preserve the actual handler-bearing elements queried by page scripts.
  const queries=new Map(),queryAll=document.querySelectorAll;
  document.querySelectorAll=s=>{const signature=s+'|'+['uni-results','short-root','compare-root','detail-root'].map(id=>nodes[id]?.innerHTML).join('|');if(!queries.has(signature))queries.set(signature,queryAll(s));return queries.get(signature);};
  const location={search:query,href:'https://globalednews.com/study-abroad/'+page+'.html'+query,reload(){this.reloaded=true;}};
  const localStorage={getItem:k=>values[k]??null,setItem:(k,v)=>values[k]=String(v),removeItem:k=>delete values[k]};
  const ctx={window:loaded.window,document,localStorage,location,history:{replaceState(){}},URL,URLSearchParams,Date,console,alert(){},confirm:()=>true};
  vm.runInNewContext(sources[page],ctx,{filename:page+'.js'});
  return {nodes,values,location,document};
}
let pairs=0;
for(const school of data){
  assert(school.majors.length>0,school.name+' has no subjects');
  for(const major of school.majors){
    const values={};
    const page=render('universities',values,'?country='+school.country+'&major='+encodeURIComponent(major));
    const savedButton=page.document.querySelectorAll('.short-btn').find(b=>b.dataset.school===school.name);assert(savedButton);savedButton.events.click();assert(JSON.parse(values.studyNavigatorShortlist).includes(school.name));
    const button=page.document.querySelectorAll('.compare-btn').find(b=>b.dataset.school===school.name);
    assert(button,'finder missing '+school.name+' '+major);button.events.click();
    assert(JSON.parse(values.studyNavigatorCompare).includes(school.name));
    assert(JSON.parse(values.studyNavigatorShortlist).includes(school.name));
    assert.equal(JSON.parse(values.studyNavigatorShortMeta)[school.name].major,major);
    const saved=render('shortlist',values).nodes['short-root'].innerHTML;
    assert(saved.includes('value="'+major.replace(/&/g,'&amp;')+'" selected'),school.name+' '+major+' not retained');
    const comp=render('compare',values).nodes['compare-root'].innerHTML;
    assert(comp.includes('完整分析'),school.name+' '+major+' comparison blank');
    assert(!comp.includes('undefined'),school.name+' '+major+' undefined output');
    const detail=render('university-detail',values,'?school='+encodeURIComponent(school.name)+'&major='+encodeURIComponent(major));
    assert(detail.nodes['detail-root'].innerHTML.includes('目前研究科系：'+major));
    // Detail-page entry also saves subject and school after a fresh visit.
    values.studyNavigatorCompare='[]';values.studyNavigatorShortlist='[]';
    detail.nodes['detail-compare'].events.click();
    assert(JSON.parse(values.studyNavigatorShortlist).includes(school.name));
    pairs++;
  }
}
const majors=[...new Set(data.flatMap(x=>x.majors))];
const names=['University of Oxford','University of Cambridge','University College London (UCL)','Imperial College London'];
for(const major of majors){assert(loaded.window.STUDY_MAJOR_LABELS[major],major+' missing Chinese label');const school=data.find(x=>x.majors.includes(major));assert.notEqual(loaded.window.PROGRAM_INSIGHTS.get(school,major).focus,'依科系查看課程結構與專業方向');const v={studyNavigatorCompare:JSON.stringify(names),studyNavigatorCompareMajor:major};const p=render('compare',v);assert(!p.nodes['compare-root'].innerHTML.includes('undefined'));assert(p.nodes['compare-root'].innerHTML.includes('value="'+major.replace(/&/g,'&amp;')+'" selected'));p.nodes['comparison-subject'].events.change({target:{value:major}});assert.equal(v.studyNavigatorCompareMajor,major);for(const name of names){if(data.find(x=>x.name===name).majors.includes(major))assert.equal(JSON.parse(v.studyNavigatorShortMeta)[name].major,major);}}
const arch=render('compare',{studyNavigatorCompare:JSON.stringify(names),studyNavigatorCompareMajor:'Architecture'}).nodes['compare-root'].innerHTML;
assert(arch.includes('Architecture, BA (Hons) and MArch'));assert(arch.includes('Architecture BSc'));assert(arch.includes('官方學士課程清單未列建築系'));
const unsupported=render('university-detail',{},'?school=University%20of%20Oxford&major=Architecture').nodes['detail-root'].innerHTML;
assert(!unsupported.includes('目前研究科系：Computer Science'));assert(unsupported.includes('找有此方向的大學'));
assert.equal(loaded.window.OFFICIAL_PROGRAM_SOURCES.get('University College London (UCL)','Computer Science').programUrl,loaded.window.OFFICIAL_PROGRAM_SOURCES.get('University College London','Computer Science').programUrl);
const report={checked:'2026-09-16',schools:data.length,majors:majors.length,schoolMajorFlows:pairs,subjectSwitches:majors.length,architectureRecords:data.filter(x=>x.majors.includes('Architecture')).map(x=>({school:x.name,source:loaded.window.OFFICIAL_PROGRAM_SOURCES.get(x.name,'Architecture')?.programUrl||null})),scope:'Automated JavaScript rendering/event regression; not an audit of every current admission requirement.'};
fs.mkdirSync('docs/qa',{recursive:true});fs.writeFileSync('docs/qa/2026-09-16-school-selection-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
