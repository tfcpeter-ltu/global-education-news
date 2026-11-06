import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Mechanical checks reject obvious briefs; an evidence review remains mandatory.
const root = 'src/pages/news';
const reviews = JSON.parse(fs.readFileSync('docs/editorial/news-reviews.json', 'utf8'));
const audit = process.argv.includes('--audit');
const rows = [];
let failed = false;
for (const name of fs.readdirSync(root).filter(n => n.endsWith('.md'))) {
  const file = path.posix.join(root, name);
  const text = fs.readFileSync(file, 'utf8');
  const [, fm, rawBody] = text.split(/^---\s*$/m);
  if (!fm || rawBody === undefined) throw new Error(`Invalid frontmatter: ${file}`);
  const date = fm.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const updated = fm.match(/^updated:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const body = rawBody.split('## 資料與報導方法')[0].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const chars = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const paragraphs = body.split(/\n\s*\n/).filter(s => s.trim() && !s.trim().startsWith('#')).length;
  const slug = name.slice(0, -3);
  const review = reviews[slug];
  const errors = [];
  if (chars < 900) errors.push(`body ${chars} Chinese characters; minimum 900`);
  if (paragraphs < 8) errors.push(`only ${paragraphs} prose paragraphs`);
  const sourcesLine = fm.match(/^sources:\s*(\[.*\])\s*$/m);
  let sources = [];
  if (sourcesLine) { try { sources = JSON.parse(sourcesLine[1]); } catch {} }
  if (!review || review.bodySha256 !== crypto.createHash('sha256').update(rawBody.replace(/\r\n/g, '\n')).digest('hex')) errors.push('missing or stale editorial review');
  for (const key of ['newsValue','background','development','perspectives','taiwanImpact','uncertainty','independence']) {
    if (typeof review?.[key] !== 'string' || review[key].length < 30) errors.push(`missing substantive review: ${key}`);
  }
  if (!sources.some(s => s.url === review?.primarySource)) errors.push('review must identify a listed primary source');
  if (!sources.some(s => s.url === review?.independentSource) || review?.primarySource === review?.independentSource) errors.push('review must identify a distinct listed independent source');
  // Do not retroactively declare old material reviewed. Audit reports the backlog.
  const enforced = !date || date >= '2026-11-06' || updated >= '2026-11-06';
  rows.push({file,date,bodyCjk:chars,paragraphs,enforced,issues:errors});
  if (enforced && errors.length) { failed = true; console.error(`${file}: ${errors.join('; ')}`); }
}
if (audit) console.log(JSON.stringify({total:rows.length,under900:rows.filter(r=>r.bodyCjk<900).length,articles:rows},null,2));
else console.log(`News depth: checked ${rows.filter(r=>r.enforced).length} current articles; ${rows.length} archived/current articles inventoried. Editorial review is not replaced by length checks.`);
if (failed) process.exitCode = 1;
