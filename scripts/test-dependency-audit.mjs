import test from 'node:test';
import assert from 'node:assert/strict';
import { assessAudit } from './audit-dependencies.mjs';
const known={github_advisory_id:'GHSA-fc5q-39xc-vjpf',module_name:'picomatch',severity:'high',findings:[{version:'4.0.7'}]};
const wrap=items=>({advisories:Object.fromEntries(items.map((x,i)=>[i,x])),metadata:{vulnerabilities:{high:items.filter(x=>x.severity==='high').length,critical:items.filter(x=>x.severity==='critical').length}}});
const proof={status:'PATCH_AND_REGRESSIONS_VERIFIED',versions:['4.0.7','2.3.2']};
test('known advisory is blocked without verified patch',()=>assert.equal(assessAudit(wrap([known]),null).blocked.length,1));
test('only exact advisory and patched versions can be locally mitigated',()=>{
 assert.equal(assessAudit(wrap([known]),proof).mitigated.length,1);
 assert.equal(assessAudit(wrap([{...known,findings:[{version:'4.0.8'}]}]),proof).blocked.length,1);
 assert.equal(assessAudit(wrap([{...known,github_advisory_id:'GHSA-new-vulnerability'}]),proof).blocked.length,1);
 assert.equal(assessAudit(wrap([{...known,module_name:'another-package'}]),proof).blocked.length,1);
});
test('new critical advisory remains blocking alongside local mitigation',()=>assert.equal(assessAudit(wrap([known,{...known,severity:'critical',github_advisory_id:'GHSA-new-critical'}]),proof).blocked.length,1));
test('malformed, failed and incomplete audits fail closed',()=>{
 for(const input of [null,{}, {error:'registry unavailable'}, {...wrap([known]),metadata:{vulnerabilities:{high:2,critical:0}}}]) assert.throws(()=>assessAudit(input,proof));
});
