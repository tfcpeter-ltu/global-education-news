import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { advisory, verifyMitigation } from './verify-picomatch-mitigation.mjs';

export function assessAudit(audit, mitigation) {
  if (!audit || audit.error || !audit.advisories || !audit.metadata?.vulnerabilities) throw Error('Invalid or unavailable dependency audit; refusing deployment');
  const blocked = [], mitigated = [];
  for (const item of Object.values(audit.advisories)) {
    if (!['low','moderate','high','critical','info'].includes(item.severity)) throw Error('Unknown advisory severity');
    if (!['high','critical'].includes(item.severity)) continue;
    if (item.github_advisory_id === advisory && item.module_name === 'picomatch' &&
        mitigation?.status === 'PATCH_AND_REGRESSIONS_VERIFIED' &&
        item.findings?.length && item.findings.every(f => mitigation.versions.includes(f.version))) mitigated.push(item);
    else blocked.push(item);
  }
  const reportedHigh = Number(audit.metadata.vulnerabilities.high) + Number(audit.metadata.vulnerabilities.critical);
  if (!Number.isFinite(reportedHigh) || reportedHigh !== blocked.length + mitigated.length) throw Error('Audit count mismatch; refusing deployment');
  return { blocked, mitigated };
}

export function auditDependencies() {
  const mitigation = verifyMitigation();
  const result = process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d','/s','/c','pnpm audit --prod --json'], { encoding:'utf8',timeout:120000,maxBuffer:10*1024*1024 })
    : spawnSync('pnpm',['audit','--prod','--json'],{encoding:'utf8',timeout:120000,maxBuffer:10*1024*1024});
  if (result.error || ![0,1].includes(result.status)) throw Error(`Audit process failed: ${result.error || result.stderr}`);
  const raw = JSON.parse(result.stdout.replace(/^\uFEFF/,''));
  const assessment = assessAudit(raw, mitigation);
  for (const item of assessment.mitigated) console.log(`LOCALLY MITIGATED (not upstream patched): ${item.github_advisory_id}; ${mitigation.copies} installed copies hash-checked and tested.`);
  console.log('Raw registry vulnerability totals:', raw.metadata.vulnerabilities);
  if (assessment.blocked.length) throw Error('Unmitigated high/critical advisories: '+assessment.blocked.map(x=>x.github_advisory_id||x.id).join(', '));
  console.log('DEPENDENCY_GATE_PASS: no unmitigated high/critical advisories. Lower-severity findings remain reported.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { auditDependencies(); } catch (error) { console.error(error.message); process.exitCode=1; }
}
