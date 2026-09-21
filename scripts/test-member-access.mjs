import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const base='public/study-abroad/';
const dataFiles=['university-data.js','university-data-health.js','university-data-asia-europe.js','university-data-expanded.js','university-data-us-2026.js','university-data-ca-2026.js','university-ranking-expansion-2026.js'];
const accessCode=fs.readFileSync(base+'member-access.js','utf8');

function load(session){
  const storage=new Map(session?[['studyNavigatorMemberSession',JSON.stringify(session)]]:[]);
  const main={querySelector(){return null},insertAdjacentElement(){}};
  const document={head:{appendChild(){}},createElement(){return {set textContent(value){this.value=value},setAttribute(){}}},querySelector(selector){return selector==='main'?main:null},addEventListener(){},getElementById(){return null}};
  const context={window:{},document,location:{search:''},localStorage:{getItem:key=>storage.get(key)||null},URLSearchParams,Date,Set,Map,JSON,atob};
  vm.createContext(context);
  for(const file of dataFiles)vm.runInContext(fs.readFileSync(base+file,'utf8'),context,{filename:file});
  vm.runInContext(accessCode,context,{filename:'member-access.js'});
  return context.window;
}

const guest=load(null);
assert.equal(guest.STUDY_ACCESS.total,328);
assert.equal(guest.STUDY_ACCESS.freeLimit,110);
assert.equal(guest.STUDY_ACCESS.locked,218);
assert.equal(guest.UNIVERSITY_FINDER_DATA.length,110);
for(const country of ['uk','canada','us','australia','europe','japan','singapore','hong-kong','south-korea','china'])assert(guest.UNIVERSITY_FINDER_DATA.some(school=>school.country===country),`free tier missing ${country}`);

const member=load({access_token:'test-token',expires_at:Math.floor(Date.now()/1000)+3600});
assert.equal(member.STUDY_ACCESS.member,true);
assert.equal(member.UNIVERSITY_FINDER_DATA.length,328);
console.log('PASS: guest 110 schools across 10 destinations; member 328 schools; 218 member-only schools.');
