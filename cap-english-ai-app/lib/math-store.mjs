import pg from 'pg';
import crypto from 'node:crypto';
const {Pool}=pg;let pool,ready;
export const mathDb=()=>pool||(pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:3}));
export const hash=t=>crypto.createHash('sha256').update(t).digest('hex');
export function cookie(req,name='cap_math_session'){try{return decodeURIComponent((String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))||'').slice(name.length+1));}catch{return '';}}
export async function mathSchema(){if(!ready)ready=mathDb().query(`
CREATE TABLE IF NOT EXISTS math_users(id UUID PRIMARY KEY DEFAULT gen_random_uuid(),email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,student_name TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_sessions(token_hash TEXT PRIMARY KEY,user_id UUID REFERENCES math_users(id) ON DELETE CASCADE,expires_at TIMESTAMPTZ NOT NULL);
CREATE TABLE IF NOT EXISTS math_memberships(user_id UUID PRIMARY KEY REFERENCES math_users(id),plan TEXT NOT NULL DEFAULT 'free',status TEXT NOT NULL DEFAULT 'active',starts_at TIMESTAMPTZ,expires_at TIMESTAMPTZ,source TEXT,updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_payment_orders(id BIGSERIAL PRIMARY KEY,order_no TEXT UNIQUE NOT NULL,user_id UUID REFERENCES math_users(id),plan TEXT,amount INT,duration_days INT,status TEXT,provider TEXT,provider_order_id TEXT,trade_no TEXT,payment_type TEXT,paid_at TIMESTAMPTZ,provider_payload JSONB,created_at TIMESTAMPTZ DEFAULT NOW(),updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_membership_events(id BIGSERIAL PRIMARY KEY,user_id UUID REFERENCES math_users(id),order_id BIGINT REFERENCES math_payment_orders(id),event_type TEXT,plan TEXT,previous_expires_at TIMESTAMPTZ,new_expires_at TIMESTAMPTZ,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_rounds(id UUID PRIMARY KEY,user_id UUID REFERENCES math_users(id),mode TEXT NOT NULL,question_ids JSONB NOT NULL,answers JSONB,result JSONB,finished_at TIMESTAMPTZ,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_attempts(user_id UUID REFERENCES math_users(id),question_id TEXT,skill TEXT,correct BOOLEAN,selected_index INT,answered_at TIMESTAMPTZ DEFAULT NOW(),PRIMARY KEY(user_id,question_id));
CREATE INDEX IF NOT EXISTS math_attempts_user_time ON math_attempts(user_id,answered_at);
CREATE TABLE IF NOT EXISTS math_notes(id BIGSERIAL PRIMARY KEY,user_id UUID REFERENCES math_users(id),question_id TEXT,skill TEXT,content JSONB,mastery INT DEFAULT 0,review_at TIMESTAMPTZ DEFAULT NOW()+INTERVAL '3 days',updated_at TIMESTAMPTZ DEFAULT NOW(),UNIQUE(user_id,question_id));
CREATE TABLE IF NOT EXISTS math_admin_roles(user_id UUID PRIMARY KEY REFERENCES math_users(id));
CREATE TABLE IF NOT EXISTS math_admin_audit(id BIGSERIAL PRIMARY KEY,actor UUID REFERENCES math_users(id),target UUID REFERENCES math_users(id),action TEXT,detail JSONB,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS math_ai_usage(user_id UUID REFERENCES math_users(id),usage_date DATE,used INT DEFAULT 0,PRIMARY KEY(user_id,usage_date));
CREATE TABLE IF NOT EXISTS math_auth_rate(bucket TEXT PRIMARY KEY,used INT DEFAULT 0,expires_at TIMESTAMPTZ);
`).catch(e=>{ready=null;throw e;});await ready;}
export async function mathUser(req){const t=cookie(req);if(!t)return null;return(await mathDb().query(`SELECT u.id,u.email,u.student_name,COALESCE(m.plan,'free') plan,m.expires_at,COALESCE(m.plan='complete' AND m.status='active' AND (m.expires_at IS NULL OR m.expires_at>NOW()),false) complete,EXISTS(SELECT 1 FROM math_admin_roles a WHERE a.user_id=u.id) admin FROM math_sessions s JOIN math_users u ON u.id=s.user_id LEFT JOIN math_memberships m ON m.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at>NOW()`,[hash(t)])).rows[0]||null;}
export function mathOrigin(req){const host=String(req.headers.host||'');return req.headers.origin===`https://${host}`||(host.startsWith('127.0.0.1:')&&req.headers.origin===`http://${host}`);}
