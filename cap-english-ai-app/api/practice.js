import crypto from 'crypto';
import pg from 'pg';
const {Pool}=pg;
let pool;
function db(){if(!pool)pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:3});return pool}
async function q(t,p=[]){return db().query(t,p)}
function cookies(req){const raw=req.headers.cookie||'';return Object.fromEntries(raw.split(';').map(x=>x.trim()).filter(Boolean).map(p=>{const i=p.indexOf('=');return [decodeURIComponent(i<0?p:p.slice(0,i)),decodeURIComponent(i<0?'':p.slice(i+1))]}))}
function tokenHash(t){return crypto.createHash('sha256').update(t).digest('hex')}
async function user(req){
  const t=cookies(req).cap_ai_session;if(!t)return null;
  const {rows}=await q(`SELECT u.id,COALESCE(m.plan,'free') plan,COALESCE(m.status,'active') status,m.expires_at,
    CASE WHEN m.plan='complete' AND m.status='active' AND (m.expires_at IS NULL OR m.expires_at>NOW()) THEN true ELSE false END complete
    FROM sessions s JOIN users u ON u.id=s.user_id LEFT JOIN memberships m ON m.user_id=u.id
    WHERE s.token_hash=$1 AND s.expires_at>NOW() LIMIT 1`,[tokenHash(t)]);
  return rows[0]||null
}
async function schema(){
  await q(`CREATE TABLE IF NOT EXISTS practice_attempts(id BIGSERIAL PRIMARY KEY,user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,question_id TEXT NOT NULL,question_type TEXT NOT NULL,competency TEXT,grammar_focus TEXT,correct BOOLEAN NOT NULL,selected_index INT,answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
  await q(`CREATE INDEX IF NOT EXISTS practice_attempts_user_time_idx ON practice_attempts(user_id,answered_at DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS practice_attempts_user_q_idx ON practice_attempts(user_id,question_id)`);
  await q(`CREATE TABLE IF NOT EXISTS practice_weakness(user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,skill TEXT NOT NULL,weight NUMERIC NOT NULL DEFAULT 0,wrong_count INT NOT NULL DEFAULT 0,correct_count INT NOT NULL DEFAULT 0,updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(user_id,skill))`);
  await q(`CREATE TABLE IF NOT EXISTS practice_daily_usage(user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,usage_date DATE NOT NULL,used_count INT NOT NULL DEFAULT 0,updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(user_id,usage_date))`);
}
const taipeiDateSql=`(NOW() AT TIME ZONE 'Asia/Taipei')::date`;
async function freeUsage(userId){
  await q(`INSERT INTO practice_daily_usage(user_id,usage_date,used_count) VALUES($1,${taipeiDateSql},0) ON CONFLICT(user_id,usage_date) DO NOTHING`,[userId]);
  const row=(await q(`SELECT used_count FROM practice_daily_usage WHERE user_id=$1 AND usage_date=${taipeiDateSql} LIMIT 1`,[userId])).rows[0];
  const used=Math.max(0,Math.min(3,Number(row?.used_count||0)));
  return {used,remaining:Math.max(0,3-used)};
}
export default async function handler(req,res){try{
  await schema();
  const u=await user(req);
  if(!u)return res.status(401).json({ok:false,error:'AUTH_REQUIRED'});
  const route=String(req.query.practiceRoute||'').replace(/^\/+|\/+$/g,'');
  const complete=Boolean(u.complete);

  if(route==='profile'&&req.method==='GET'){
    const seen=(await q(`SELECT question_id,MAX(answered_at) last_seen FROM practice_attempts WHERE user_id=$1 GROUP BY question_id ORDER BY last_seen DESC LIMIT 20000`,[u.id])).rows.map(r=>r.question_id);
    if(!complete)return res.json({ok:true,complete:false,seen,weakness:[],features:{dailyLimit:3,longTermWeakness:false,notebook:false,weeklyMock:false,archiveTracking:false}});
    const weakness=(await q(`SELECT skill,weight::float,wrong_count,correct_count,updated_at FROM practice_weakness WHERE user_id=$1 ORDER BY weight DESC,updated_at DESC`,[u.id])).rows;
    return res.json({ok:true,complete:true,seen,weakness,features:{dailyCore:10,extraPractice:true,longTermWeakness:true,notebook:true,weeklyMock:true,archiveTracking:true}});
  }

  if(route==='free-status'&&req.method==='GET'){
    if(complete)return res.json({ok:true,complete:true,limit:null,used:0,remaining:null});
    const usage=await freeUsage(u.id);
    return res.json({ok:true,complete:false,limit:3,...usage,timeZone:'Asia/Taipei'});
  }

  if(route==='free-use'&&req.method==='POST'){
    if(complete)return res.json({ok:true,complete:true,consumed:false,remaining:null});
    await q(`INSERT INTO practice_daily_usage(user_id,usage_date,used_count) VALUES($1,${taipeiDateSql},0) ON CONFLICT(user_id,usage_date) DO NOTHING`,[u.id]);
    const {rows}=await q(`UPDATE practice_daily_usage SET used_count=used_count+1,updated_at=NOW() WHERE user_id=$1 AND usage_date=${taipeiDateSql} AND used_count<3 RETURNING used_count`,[u.id]);
    if(!rows[0])return res.status(429).json({ok:false,error:'FREE_DAILY_LIMIT',limit:3,used:3,remaining:0,timeZone:'Asia/Taipei'});
    const used=Math.max(0,Math.min(3,Number(rows[0].used_count||0)));
    return res.json({ok:true,complete:false,consumed:true,limit:3,used,remaining:Math.max(0,3-used),timeZone:'Asia/Taipei'});
  }

  if(route==='answer'&&req.method==='POST'){
    const b=req.body||{},questionId=String(b.questionId||'').trim(),type=String(b.type||'').trim(),skill=String(b.competency||type||'general').trim(),grammar=String(b.grammarFocus||'').trim(),correct=Boolean(b.correct),sel=Number.isInteger(b.selectedIndex)?b.selectedIndex:null;
    if(!questionId||!type||!/^LTU-CAP-\d{5}$/.test(questionId))return res.status(400).json({ok:false,error:'INVALID_ANSWER'});
    await q(`INSERT INTO practice_attempts(user_id,question_id,question_type,competency,grammar_focus,correct,selected_index) VALUES($1,$2,$3,$4,$5,$6,$7)`,[u.id,questionId,type,skill,grammar||null,correct,sel]);
    if(complete){
      await q(`INSERT INTO practice_weakness(user_id,skill,weight,wrong_count,correct_count) VALUES($1,$2,$3,$4,$5) ON CONFLICT(user_id,skill) DO UPDATE SET weight=GREATEST(0,practice_weakness.weight+$3),wrong_count=practice_weakness.wrong_count+$4,correct_count=practice_weakness.correct_count+$5,updated_at=NOW()`,[u.id,skill,correct?-0.35:1.0,correct?0:1,correct?1:0]);
    }
    return res.json({ok:true,persisted:true,complete,learningModelUpdated:complete});
  }

  return res.status(404).json({ok:false,error:'NOT_FOUND'});
}catch(e){console.error('practice api',e);return res.status(500).json({ok:false,error:'PRACTICE_API_FAILED'})}}
