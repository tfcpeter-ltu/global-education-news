import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const demo=read('dist/ielts-ai-test/index.html');
assert(!/type=["']password["']/i.test(demo),'Demo must not request passwords');
assert(demo.includes('不收費、不需要密碼'));
assert(demo.includes('91023087'));
assert(demo.includes('並非 IELTS 官方網站'));
assert(!read('public/ielts-ai-test/app1.js').includes('loginEmail'));
assert(!read('dist/ielts-ai-student/index.html').includes('DecompressionStream'));
for(const page of ['security','about','contact']) {
  const html=read(`dist/${page}/index.html`);
  assert(html.includes('91023087'),`${page}: missing operator identifier`);
  assert(html.includes('Content-Security-Policy'),`${page}: missing policy`);
}
assert(read('dist/.well-known/security.txt').includes('Contact: mailto:editor.jsti.ltu@gmail.com'));
console.log('PASS: demo requests no password; operator, service notices, security contact and readable student entry exist');
