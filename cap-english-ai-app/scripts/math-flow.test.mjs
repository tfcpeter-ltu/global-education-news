import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {PGLiteSocketServer} from '@electric-sql/pglite-socket';
import {makeMath} from '../lib/math-bank.mjs';
if(process.env.DATABASE_URL)throw new Error('Run only without a production DATABASE_URL');
const embedded=await PGlite.create();
const server=new PGLiteSocketServer({db:embedded,host:'127.0.0.1',port:54331});await server.start();
process.env.DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:54331/postgres?sslmode=disable';
const {default:handler}=await import('../api/math.js');
const {mathSchema,mathDb}=await import('../lib/math-store.mjs');
const checks=[];
async function call(action,body,token=''){
 const req={method:body?'POST':'GET',query:{action},body:body||{},headers:{host:'127.0.0.1:4320',origin:'http://127.0.0.1:4320','content-type':'application/json',cookie:token}};
 const res={code:200,headers:{},setHeader(k,v){this.headers[k]=v;},status(c){this.code=c;return this;},json(d){this.data=d;return this;}};
 await handler(req,res);return res;
}
try{
 await mathSchema();
 const password='QA-'+crypto.randomBytes(16).toString('hex');
 const create=await call('signup',{name:'模考隔離測試',email:'mock-complete@example.test',password});assert.equal(create.code,200);
 const completeCookie=create.headers['Set-Cookie'].split(';')[0];const me=await call('me',null,completeCookie);const id=me.data.user.id;
 await mathDb().query("INSERT INTO math_memberships(user_id,plan,status,expires_at,source) VALUES($1,'complete','active',NOW()+INTERVAL '1 day','local_test')",[id]);
 const free=await call('signup',{name:'免費隔離測試',email:'mock-free@example.test',password});const freeCookie=free.headers['Set-Cookie'].split(';')[0];assert.equal((await call('round',{mode:'mock'},freeCookie)).code,403);checks.push('Free 會員不能開啟付費模考');
 const started=await call('round',{mode:'mock'},completeCookie);assert.equal(started.code,200,JSON.stringify(started.data));const r=started.data;assert.equal(r.questions.length,27);assert.equal(r.questions.filter(q=>q.type==='choice').length,25);assert.equal(r.questions.filter(q=>q.type==='written').length,2);assert.equal(new Set(r.questions.map(q=>q.id)).size,27);
 for(const q of r.questions)for(const k of ['answer','answerIndex','steps','rubric'])assert.equal(k in q,false);checks.push('27 題（25 選擇＋2 非選擇），開卷不洩漏答案');
 assert.equal((await call('resume',{roundId:r.id},freeCookie)).code,404);checks.push('其他會員無法讀取本卷');
 const choice=r.questions.filter(q=>q.type==='choice'),written=r.questions.filter(q=>q.type==='written');const answers={[choice[0].id]:makeMath(choice[0].id).answerIndex,[written[0].id]:'设寬為x，先依周長列式。'};
 assert.equal((await call('save',{roundId:r.id,answers},completeCookie)).code,200);const resumed=await call('resume',{roundId:r.id},completeCookie);assert.deepEqual(resumed.data.answers,answers);assert.ok(resumed.data.startedAt);checks.push('選項與文字作答可保存、重開，原始計時不重置');
 for(const q of choice)answers[q.id]=makeMath(q.id).answerIndex;answers[choice[0].id]=(answers[choice[0].id]+1)%4;answers[written[1].id]='總費用除以人數，取小數第二位。';
 const submitted=await call('submit',{roundId:r.id,answers},completeCookie);assert.equal(submitted.code,200,JSON.stringify(submitted.data));assert.equal(submitted.data.result.choiceCorrect,24);assert.equal(submitted.data.result.choiceTotal,25);assert.equal(submitted.data.result.review.length,27);assert.equal(submitted.data.result.writtenNeedsReview,true);
 for(const q of submitted.data.result.review){assert.ok(q.answer);assert.ok(q.steps.length>=2);if(q.type==='written')assert.equal(q.rubric.length,3);}checks.push('交卷計分 24／25，27 題均有詳解，非選擇題有評分規準');
 const repeated=await call('submit',{roundId:r.id,answers:{}},completeCookie);assert.deepEqual(repeated.data.result,submitted.data.result);const attempts=(await mathDb().query('SELECT COUNT(*)::int n FROM math_attempts WHERE user_id=$1',[id])).rows[0].n;assert.equal(attempts,25);checks.push('重複交卷不重複計分或新增作答紀錄');
 const profile=await call('profile',null,completeCookie);assert.equal(profile.data.mocks.length,1);assert.equal(profile.data.stats.correct,24);assert.equal((await call('notes',null,completeCookie)).data.notes.length,1);checks.push('模考紀錄、弱點與錯題筆記同步保存');
 const late=await call('round',{mode:'mock'},completeCookie);assert.equal(late.code,200);assert.ok(late.data.questions.every(q=>!choice.some(x=>x.id===q.id)));const q=late.data.questions.find(x=>x.type==='choice');const before={[q.id]:(makeMath(q.id).answerIndex+1)%4};await call('save',{roundId:late.data.id,answers:before},completeCookie);await mathDb().query("UPDATE math_rounds SET created_at=NOW()-INTERVAL '81 minutes' WHERE id=$1",[late.data.id]);
 const after=await call('submit',{roundId:late.data.id,answers:{[q.id]:makeMath(q.id).answerIndex}},completeCookie);assert.equal(after.data.result.choiceCorrect,0);assert.equal(after.data.result.review.find(x=>x.id===q.id).selected,before[q.id]);checks.push('80 分鐘逾時後不能以新答案覆蓋已保存作答');
 await mathDb().query("UPDATE math_memberships SET expires_at=NOW()-INTERVAL '1 day' WHERE user_id=$1",[id]);assert.equal((await call('round',{mode:'mock'},completeCookie)).code,403);checks.push('Complete 到期後不能新開模考');
 console.log(JSON.stringify({ok:true,checks},null,2));
}finally{await mathDb().end();await server.stop();await embedded.close();}
