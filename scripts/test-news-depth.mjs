import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const slug='uk-ucas-october-2027-applicant-snapshot';
const original=fs.readFileSync(`src/pages/news/${slug}.md`,'utf8');
function run(text) {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'news-depth-test-'));
 fs.mkdirSync(path.join(dir,'src/pages/news'),{recursive:true});
 fs.mkdirSync(path.join(dir,'docs/editorial'),{recursive:true});
 fs.writeFileSync(path.join(dir,`src/pages/news/${slug}.md`),text);
 fs.copyFileSync('docs/editorial/news-reviews.json',path.join(dir,'docs/editorial/news-reviews.json'));
 return spawnSync(process.execPath,[path.resolve('scripts/check-news-depth.mjs')],{cwd:dir,encoding:'utf8'});
}
test('reviewed complete report passes',()=>assert.equal(run(original).status,0));
test('brief cannot count as a complete new report',()=>{
 const result=run(original.split(/^---\s*$/m).slice(0,2).join('---\n')+'---\n只有一句新聞摘要。\n');
 assert.notEqual(result.status,0);assert.match(result.stderr,/minimum 900/);
});
test('changed body invalidates previous review',()=>{
 const result=run(original+'\n尚未經過來源查核的新增結論。\n');
 assert.notEqual(result.status,0);assert.match(result.stderr,/stale editorial review/);
});
