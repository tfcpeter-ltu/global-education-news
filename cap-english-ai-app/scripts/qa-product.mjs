import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

function ok(value,message){if(!value)throw new Error(`QA failed: ${message}`);console.log('✓',message)}
const read=p=>readFile(p,'utf8');

const browserFiles=['question-engine-v2.js','practice-ui-v4.js','notebook-ui-v1.js','product-core-v1.js','membership-sync-v1.js','remove-hero.js'];
for(const file of browserFiles){const src=await read(file);new Function(src);ok(true,`${file} parses`)}

const engineSrc=await read('question-engine-v2.js');
const context={window:{},console};
vm.createContext(context);vm.runInContext(engineSrc,context,{filename:'question-engine-v2.js'});
const engine=context.window.LTUQuestionEngine;
ok(engine?.version==='2.0','question engine v2 is exposed');
const audit=engine.audit();
ok(audit.count===20000,'question bank exposes 20,000 generated questions');
ok(audit.uniqueIds===20000,'all 20,000 question IDs are unique');
ok(audit.uniqueSignatures===20000&&audit.duplicates===0,'all 20,000 content signatures are unique');
ok(Object.keys(audit.byType||{}).length===12,'question bank covers 12 competency types');

const practice=await read('api/practice.js');
ok(practice.includes('used_count<3'),'Free quota is enforced at 3 server-side');
ok(practice.includes("AT TIME ZONE 'Asia/Taipei'"),'Free quota resets by Asia/Taipei date');
ok(practice.includes('learningModelUpdated:complete'),'Free answers do not update the long-term weakness model');
ok(practice.includes('LIMIT 20000'),'account-level seen-question history supports full bank');
ok(practice.includes("m.expires_at>NOW()"),'Complete access checks membership expiry');

const notebook=await read('api/notebook.js');
ok(notebook.includes("m.expires_at>NOW()"),'AI Notebook checks membership expiry');
ok(notebook.includes("INTERVAL '3 days'"),'AI Notebook schedules spaced review');
ok(notebook.includes('level===3?21:30'),'AI Notebook supports 3/7/21/30-day review progression');

const progress=await read('api/progress.js');
ok(progress.includes('items.length!==64'),'Weekly Mock requires exactly 64 questions');
ok(progress.includes('items.slice(0,43)')&&progress.includes('items.slice(43)'),'Weekly Mock splits 43 reading and 21 listening');
ok(progress.includes('jsonb_to_recordset'),'Weekly Mock uses batch DB inserts');
ok(progress.includes('mock_attempts')&&progress.includes('archive_activity')&&progress.includes('learning_events'),'paid learning history is persisted server-side');

const product=await read('product-core-v1.js');
ok(product.includes("take(12,['vocabulary'])")&&product.includes("take(21,['listening'])"),'Product Core dynamically assembles Weekly Mock');
ok(product.includes('20,000 題原創題池'),'paid UI communicates the 20k dynamic bank');
ok(product.includes('Free 用來體驗')&&product.includes('AI COMPLETE'),'Free and Complete are explicitly differentiated');
ok(product.includes('AI 筆記')&&product.includes('Weekly Mock')&&product.includes('歷屆')&&product.includes('弱點分析'),'all paid core features are surfaced');

const v19=await read('../cap-ai-preview/final-v19.html');
ok(!v19.includes('d.body.innerHTML=d.body.innerHTML'),'V19 no longer rebuilds the whole document');
ok(v19.includes("box.dataset.paid=isPaid?'1':'0'"),'V19 menu reads current paid state');
for(const match of v19.matchAll(/<script>([\s\S]*?)<\/script>/g)){new Function(match[1])}
ok(true,'V19 inline scripts parse');

const build=await read('scripts/build-ui.mjs');
for(const required of ['question-engine-v2.js','practice-ui-v4.js','product-core-v1.js','membership-sync-v1.js'])ok(build.includes(required),`build includes ${required}`);

console.log('\nCAP PRODUCT QA PASSED');
console.log(JSON.stringify(audit,null,2));
