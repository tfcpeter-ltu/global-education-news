import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('public/study-abroad/student-admin.html','utf8');
const js=fs.readFileSync('public/study-abroad/student-admin.js','utf8');
const sql=fs.readFileSync('supabase/migrations/20260921213000_remove_insecure_student_admin_view.sql','utf8');

assert.match(html,/學生會員管理/);
assert.match(html,/noindex,nofollow/);
assert.match(html,/student-admin\.js/);
assert.match(html,/登入管理後台/);
assert.match(html,/註冊學生/);
assert.match(js,/editor\.jsti\.ltu@gmail\.com/);
assert.match(js,/student-admin-overview/);
assert.match(js,/admin-login-button/);
assert.match(js,/replace\(\/\[&<>'\"\]\/g/);
assert.match(sql,/drop view if exists public\.admin_student_overview/);
assert.doesNotMatch(`${html}\n${js}`,/service_role|sb_secret_/);

const edge=fs.readFileSync('supabase/functions/student-admin-overview/index.ts','utf8');
assert.match(edge,/EDITOR\.JSTI\.LTU@GMAIL\.COM/i);
assert.match(edge,/SUPABASE_SERVICE_ROLE_KEY/);
assert.match(edge,/\/auth\/v1\/user/);
assert.match(edge,/管理員權限/);
assert.match(edge,/toLowerCase\(\)!==adminEmail/);
assert.doesNotMatch(edge,/service_role\s*=\s*['"]/i);

console.log('student admin dashboard checks passed');
