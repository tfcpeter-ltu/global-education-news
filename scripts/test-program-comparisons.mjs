import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const dir='public/study-abroad/';
const context={window:{}};
vm.createContext(context);
for(const file of ['university-data.js','university-data-health.js','university-data-asia-europe.js','university-data-expanded.js','university-data-us-2026.js','university-data-ca-2026.js','university-ranking-expansion-2026.js','program-insights.js']){
  vm.runInContext(fs.readFileSync(dir+file,'utf8'),context,{filename:file});
}

const data=context.window.UNIVERSITY_FINDER_DATA;
const insights=context.window.PROGRAM_INSIGHTS;
const required=['focus','learning','orientation','best','signal','careers','compare','tradeoff','evidence','sourceUrl','scope'];
const descriptions=new Set();
let pairs=0;

for(const school of data){
  for(const major of school.majors||[]){
    const value=insights.get(school,major);
    for(const field of required)assert(value[field],`${school.name}|${major} missing ${field}`);
    assert.match(value.focus,new RegExp(school.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
    assert(value.focus.includes(major),`${school.name}|${major} is not identified`);
    descriptions.add(value.focus);
    pairs++;
  }
}

const coverage=insights.coverage();
assert.equal(coverage.schools,data.length);
assert.equal(coverage.pairs,pairs);
assert.equal(descriptions.size,pairs,'Each school-major pair must have a distinct comparison description');
console.log(`PASS: ${coverage.schools} schools, ${coverage.majors} majors, ${pairs} school-major comparisons, ${required.length} fields each.`);
