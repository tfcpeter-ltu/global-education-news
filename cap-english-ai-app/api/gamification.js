import crypto from 'crypto';
import pg from 'pg';
const {Pool}=pg;
let pool;
function db(){if(!pool)pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:3});return pool}
async function q(t,p=[]){return db().query(t,p)}
function cookies(req){const raw=req.headers.cookie||'';return Object.fromEntries(raw.split(';').map(x=>x.trim()).filter(Boolean).map(p=>{const i=p.indexOf('=');return[decodeURIComponent(i<0?p:p.slice(0,i)),decodeURIComponent(i<0?'':p.slice(i+1))]}))}
function tokenHash(t){return crypto.createHash('sha256').update(t).digest('hex')}
async function user(req){const t=cookies(req).cap_ai_session;if(!t)return null;const {rows}=await q(`SELECT u.id,u.student_name,u.nickname,CASE WHEN m.plan='complete' AND m.status='active' AND (m.expires_at IS NULL OR m.expires_at>NOW()) THEN true ELSE false END complete FROM sessions s JOIN users u ON u.id=s.user_id LEFT JOIN memberships m ON m.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at>NOW() LIMIT 1`,[tokenHash(t)]);return rows[0]||null}
function dayKey(d){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}
function addDay(d,n){const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x}
export default async function handler(req,res){try{
 if(req.method!=='GET')return res.status(405).json({ok:false,error:'METHOD_NOT_ALLOWED'});
 const u=await user(req);if(!u)return res.status(401).json({ok:false,error:'AUTH_REQUIRED'});
 const [today,total,dates,mocks,archives]=await Promise.all([
  q(`SELECT COUNT(*)::int answered,COUNT(*) FILTER(WHERE correct)::int correct FROM practice_attempts WHERE user_id=$1 AND (answered_at AT TIME ZONE 'Asia/Taipei')::date=(NOW() AT TIME ZONE 'Asia/Taipei')::date`,[u.id]),
  q(`SELECT COUNT(*)::int answered,COUNT(*) FILTER(WHERE correct)::int correct,COUNT(DISTINCT question_id)::int seen FROM practice_attempts WHERE user_id=$1`,[u.id]),
  q(`SELECT DISTINCT d::text day FROM(SELECT (answered_at AT TIME ZONE 'Asia/Taipei')::date d FROM practice_attempts WHERE user_id=$1 AND answered_at>NOW()-INTERVAL '120 days' UNION SELECT (created_at AT TIME ZONE 'Asia/Taipei')::date FROM mock_attempts WHERE user_id=$1 AND created_at>NOW()-INTERVAL '120 days' UNION SELECT (created_at AT TIME ZONE 'Asia/Taipei')::date FROM archive_activity WHERE user_id=$1 AND created_at>NOW()-INTERVAL '120 days')x ORDER BY day DESC`,[u.id]),
  q(`SELECT COUNT(*)::int n FROM mock_attempts WHERE user_id=$1`,[u.id]),
  q(`SELECT COUNT(*) FILTER(WHERE activity_type='practice_completed')::int n FROM archive_activity WHERE user_id=$1`,[u.id])
 ]);
 const t=today.rows[0]||{},a=total.rows[0]||{},mockCount=mocks.rows[0]?.n||0,archiveCount=archives.rows[0]?.n||0;
 const set=new Set(dates.rows.map(r=>r.day));const now=new Date(),todayKey=dayKey(now),yesterdayKey=dayKey(addDay(now,-1));let cursor=set.has(todayKey)?now:(set.has(yesterdayKey)?addDay(now,-1):null),streak=0;
 while(cursor&&set.has(dayKey(cursor))){streak++;cursor=addDay(cursor,-1)}
 const xp=(a.answered||0)*10+(a.correct||0)*2+mockCount*150+archiveCount*60;const level=Math.max(1,Math.floor(Math.sqrt(xp/120))+1);const target=u.complete?10:3,correctTarget=Math.max(2,Math.ceil(target*.7));
 const missions=[{name:`完成今天 ${target} 題`,value:Math.min(t.answered||0,target),target},{name:`今天答對 ${correctTarget} 題`,value:Math.min(t.correct||0,correctTarget),target:correctTarget},{name:u.complete?'完成 1 次 Weekly Mock':'維持今日連勝',value:u.complete?Math.min(mockCount,1):(t.answered>0?1:0),target:1}];
 const labels=['日','一','二','三','四','五','六'];const days=[];for(let i=6;i>=0;i--){const d=addDay(now,-i);days.push({label:labels[d.getUTCDay()],active:set.has(dayKey(d))})}
 return res.json({ok:true,complete:!!u.complete,name:u.nickname||u.student_name||'',streak,xp,level,todayAnswered:t.answered||0,todayCorrect:t.correct||0,seenQuestions:a.seen||0,mockCount,archiveCount,missions,days});
}catch(e){console.error('gamification api',e);return res.status(500).json({ok:false,error:'GAMIFICATION_FAILED'})}}
