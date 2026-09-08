import crypto from 'crypto';
import pg from 'pg';
const {Pool}=pg;
let pool;
function db(){if(!pool)pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:3});return pool}
async function q(t,p=[]){return db().query(t,p)}
function cookies(req){const raw=req.headers.cookie||'';return Object.fromEntries(raw.split(';').map(x=>x.trim()).filter(Boolean).map(p=>{const i=p.indexOf('=');return [decodeURIComponent(i<0?p:p.slice(0,i)),decodeURIComponent(i<0?'':p.slice(i+1))]}))}
function tokenHash(t){return crypto.createHash('sha256').update(t).digest('hex')}
async function user(req){const t=cookies(req).cap_ai_session;if(!t)return null;const {rows}=await q(`SELECT u.id,u.student_name,u.nickname,COALESCE(m.plan,'free') plan,COALESCE(m.status,'active') status,m.expires_at,CASE WHEN m.plan='complete' AND m.status='active' AND (m.expires_at IS NULL OR m.expires_at>NOW()) THEN true ELSE false END complete FROM sessions s JOIN users u ON u.id=s.user_id LEFT JOIN memberships m ON m.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at>NOW() LIMIT 1`,[tokenHash(t)]);return rows[0]||null}
async function schema(){
 await q(`CREATE TABLE IF NOT EXISTS mock_attempts(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,reading_correct INT NOT NULL,listening_correct INT NOT NULL,total_correct INT NOT NULL,total_questions INT NOT NULL DEFAULT 64,score_percent INT NOT NULL,question_ids JSONB NOT NULL DEFAULT '[]'::jsonb,weaknesses JSONB NOT NULL DEFAULT '{}'::jsonb,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
 await q(`CREATE INDEX IF NOT EXISTS mock_attempts_user_time_idx ON mock_attempts(user_id,created_at DESC)`);
 await q(`CREATE TABLE IF NOT EXISTS archive_activity(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,exam_year INT NOT NULL,activity_type TEXT NOT NULL,score INT,total INT,question_ids JSONB NOT NULL DEFAULT '[]'::jsonb,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
 await q(`CREATE INDEX IF NOT EXISTS archive_activity_user_time_idx ON archive_activity(user_id,created_at DESC)`);
 await q(`CREATE TABLE IF NOT EXISTS learning_events(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,event_type TEXT NOT NULL,source TEXT,reference_id TEXT,detail JSONB NOT NULL DEFAULT '{}'::jsonb,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
 await q(`CREATE INDEX IF NOT EXISTS learning_events_user_time_idx ON learning_events(user_id,created_at DESC)`);
 await q(`CREATE TABLE IF NOT EXISTS practice_attempts(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,question_id TEXT NOT NULL,question_type TEXT NOT NULL,competency TEXT,grammar_focus TEXT,correct BOOLEAN NOT NULL,selected_index INT,answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
 await q(`CREATE TABLE IF NOT EXISTS practice_weakness(user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,skill TEXT NOT NULL,weight NUMERIC NOT NULL DEFAULT 0,wrong_count INT NOT NULL DEFAULT 0,correct_count INT NOT NULL DEFAULT 0,updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(user_id,skill))`);
 await q(`CREATE TABLE IF NOT EXISTS ai_notebook(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,question_id TEXT NOT NULL,category TEXT NOT NULL,title TEXT NOT NULL,content TEXT NOT NULL,detail JSONB NOT NULL DEFAULT '{}'::jsonb,mastery_level INT NOT NULL DEFAULT 0,review_at TIMESTAMPTZ,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),UNIQUE(user_id,question_id,category))`);
}
function safe(v,max=700){return String(v||'').trim().slice(0,max)}
function buildMockNotes(items){
 const rows=[];
 for(const x of items){
  if(x.correct)continue;
  const id=safe(x.id,80),skill=safe(x.competency||x.type||'general',100),type=safe(x.type,40),ex=safe(x.explanation,800);
  const detail={type,skill,stem:safe(x.stem,900),options:Array.isArray(x.options)?x.options.slice(0,5).map(v=>safe(v,180)):[],selectedIndex:Number.isInteger(x.selectedIndex)?x.selectedIndex:null,correctAnswerIndex:Number.isInteger(x.answer)?x.answer:null,source:'weekly_mock'};
  const notes=[['mistake',`模考錯因｜${skill}`,ex||'重新確認題目線索與選項差異。'],['weakness',`模考弱點｜${skill}`,`Weekly Mock 顯示「${skill}」仍需要補強，下一輪會增加同能力題。`]];
  if(type==='grammar')notes.push(['grammar',`文法｜${skill}`,ex]);
  if(type==='vocabulary')notes.push(['vocabulary',`單字｜${skill}`,ex]);
  if(['collocation','connectors','cloze'].includes(type))notes.push(['phrase',`片語／搭配｜${skill}`,ex]);
  if(type==='sentencePattern')notes.push(['sentence_pattern',`句型｜${skill}`,ex]);
  if(['detail','mainIdea','reference','inference','sequence','listening'].includes(type))notes.push(['strategy',`解題策略｜${skill}`,ex]);
  for(const [category,title,content] of notes)rows.push({question_id:id,category,title:safe(title,160),content:safe(content,900),detail});
 }
 return rows;
}
async function batchMockLearning(client,userId,items){
 const attempts=items.map(x=>({question_id:safe(x.id,80),question_type:safe(x.type,40),competency:safe(x.competency||x.type||'general',100),grammar_focus:safe(x.grammarFocus,140)||null,correct:Boolean(x.correct),selected_index:Number.isInteger(x.selectedIndex)?x.selectedIndex:null}));
 await client.query(`INSERT INTO practice_attempts(user_id,question_id,question_type,competency,grammar_focus,correct,selected_index)
 SELECT $1,r.question_id,r.question_type,r.competency,NULLIF(r.grammar_focus,''),r.correct,r.selected_index
 FROM jsonb_to_recordset($2::jsonb) AS r(question_id text,question_type text,competency text,grammar_focus text,correct boolean,selected_index int)`,[userId,JSON.stringify(attempts)]);
 const agg={};
 for(const x of items){const skill=safe(x.competency||x.type||'general',100),a=agg[skill]||(agg[skill]={skill,delta:0,wrong_count:0,correct_count:0});if(x.correct){a.delta-=0.2;a.correct_count++}else{a.delta+=0.8;a.wrong_count++}}
 const weakRows=Object.values(agg);
 for(const r of weakRows)await client.query(`INSERT INTO practice_weakness(user_id,skill,weight,wrong_count,correct_count) VALUES($1,$2,$3,$4,$5) ON CONFLICT(user_id,skill) DO UPDATE SET weight=GREATEST(0,practice_weakness.weight+$3),wrong_count=practice_weakness.wrong_count+$4,correct_count=practice_weakness.correct_count+$5,updated_at=NOW()`,[userId,r.skill,r.delta,r.wrong_count,r.correct_count]);
 const notes=buildMockNotes(items);
 if(notes.length)await client.query(`INSERT INTO ai_notebook(user_id,question_id,category,title,content,detail,review_at)
 SELECT $1,r.question_id,r.category,r.title,r.content,r.detail,NOW()+INTERVAL '3 days'
 FROM jsonb_to_recordset($2::jsonb) AS r(question_id text,category text,title text,content text,detail jsonb)
 ON CONFLICT(user_id,question_id,category) DO UPDATE SET title=EXCLUDED.title,content=EXCLUDED.content,detail=EXCLUDED.detail,review_at=LEAST(COALESCE(ai_notebook.review_at,EXCLUDED.review_at),EXCLUDED.review_at),updated_at=NOW()`,[userId,JSON.stringify(notes)]);
}
export default async function handler(req,res){try{
 await schema();const u=await user(req);if(!u)return res.status(401).json({ok:false,error:'AUTH_REQUIRED'});const route=String(req.query.progressRoute||'').replace(/^\/+|\/+$/g,'');
 if(route==='summary'&&req.method==='GET'){
   if(!u.complete)return res.json({ok:true,complete:false});
   const [m,w,a,e]=await Promise.all([
     q(`SELECT id,reading_correct,listening_correct,total_correct,total_questions,score_percent,weaknesses,created_at FROM mock_attempts WHERE user_id=$1 ORDER BY created_at DESC LIMIT 12`,[u.id]),
     q(`SELECT skill,weight::float,wrong_count,correct_count,updated_at FROM practice_weakness WHERE user_id=$1 ORDER BY weight DESC,updated_at DESC LIMIT 12`,[u.id]),
     q(`SELECT exam_year,activity_type,score,total,created_at FROM archive_activity WHERE user_id=$1 ORDER BY created_at DESC LIMIT 20`,[u.id]),
     q(`SELECT event_type,source,reference_id,detail,created_at FROM learning_events WHERE user_id=$1 ORDER BY created_at DESC LIMIT 20`,[u.id])
   ]);
   const seen=(await q(`SELECT COUNT(DISTINCT question_id)::int n FROM practice_attempts WHERE user_id=$1`,[u.id])).rows[0]?.n||0;
   return res.json({ok:true,complete:true,student:{name:u.nickname||u.student_name},seenQuestions:seen,mocks:m.rows,weakness:w.rows,archives:a.rows,events:e.rows});
 }
 if(route==='mock'&&req.method==='POST'){
   if(!u.complete)return res.status(403).json({ok:false,error:'COMPLETE_REQUIRED'});const body=req.body||{},items=Array.isArray(body.items)?body.items:[];
   if(items.length!==64)return res.status(400).json({ok:false,error:'MOCK_REQUIRES_64_QUESTIONS'});const ids=items.map(x=>safe(x.id,80));if(new Set(ids).size!==64||ids.some(x=>!/^LTU-CAP-\d{5}$/.test(x)))return res.status(400).json({ok:false,error:'INVALID_MOCK_QUESTIONS'});
   const reading=items.slice(0,43),listening=items.slice(43),rc=reading.filter(x=>x.correct).length,lc=listening.filter(x=>x.correct).length,total=rc+lc,pct=Math.round(total/64*100),weak={};items.forEach(x=>{if(!x.correct){const s=safe(x.competency||x.type||'general',100);weak[s]=(weak[s]||0)+1}});
   const client=await db().connect();try{await client.query('BEGIN');
     const ins=(await client.query(`INSERT INTO mock_attempts(user_id,reading_correct,listening_correct,total_correct,total_questions,score_percent,question_ids,weaknesses) VALUES($1,$2,$3,$4,64,$5,$6,$7) RETURNING id,created_at`,[u.id,rc,lc,total,pct,ids,weak])).rows[0];
     await batchMockLearning(client,u.id,items);
     await client.query(`INSERT INTO learning_events(user_id,event_type,source,reference_id,detail) VALUES($1,'weekly_mock_completed','weekly_mock',$2,$3)`,[u.id,String(ins.id),{readingCorrect:rc,listeningCorrect:lc,totalCorrect:total,scorePercent:pct,weakness:weak}]);await client.query('COMMIT');return res.json({ok:true,mockId:ins.id,readingCorrect:rc,listeningCorrect:lc,totalCorrect:total,scorePercent:pct,weakness:weak,createdAt:ins.created_at});
   }catch(e){await client.query('ROLLBACK').catch(()=>{});throw e}finally{client.release()}
 }
 if(route==='archive'&&req.method==='POST'){
   if(!u.complete)return res.status(403).json({ok:false,error:'COMPLETE_REQUIRED'});const b=req.body||{},year=Number(b.year),activity=String(b.activityType||'open');if(!Number.isInteger(year)||year<103||year>115)return res.status(400).json({ok:false,error:'INVALID_YEAR'});if(!['open','practice_started','practice_completed'].includes(activity))return res.status(400).json({ok:false,error:'INVALID_ACTIVITY'});const ids=Array.isArray(b.questionIds)?b.questionIds.filter(x=>/^LTU-CAP-\d{5}$/.test(String(x))).slice(0,50):[],score=Number.isFinite(Number(b.score))?Number(b.score):null,total=Number.isFinite(Number(b.total))?Number(b.total):null;await q(`INSERT INTO archive_activity(user_id,exam_year,activity_type,score,total,question_ids) VALUES($1,$2,$3,$4,$5,$6)`,[u.id,year,activity,score,total,ids]);await q(`INSERT INTO learning_events(user_id,event_type,source,reference_id,detail) VALUES($1,$2,'archive',$3,$4)`,[u.id,`archive_${activity}`,String(year),{score,total,questionCount:ids.length}]);return res.json({ok:true})
 }
 return res.status(404).json({ok:false,error:'NOT_FOUND'});
}catch(e){console.error('progress api',e);return res.status(500).json({ok:false,error:'PROGRESS_API_FAILED'})}}
