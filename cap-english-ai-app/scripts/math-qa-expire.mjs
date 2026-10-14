import pg from 'pg';
import assert from 'node:assert/strict';
const c=new pg.Client({connectionString:'postgresql://postgres:postgres@127.0.0.1:54332/postgres?sslmode=disable'});await c.connect();
try{const row=(await c.query("SELECT r.id FROM math_rounds r JOIN math_users u ON u.id=r.user_id WHERE u.email='complete@math-qa.example.test' AND u.student_name='隔離 Complete 測試' AND r.mode='mock' AND r.finished_at IS NULL ORDER BY r.created_at DESC LIMIT 1")).rows[0];assert.ok(row,'No unfinished local QA mock');await c.query("UPDATE math_rounds SET created_at=NOW()-INTERVAL '81 minutes' WHERE id=$1",[row.id]);console.log('Local fixture mock time advanced past 80 minutes');}finally{await c.end();}
