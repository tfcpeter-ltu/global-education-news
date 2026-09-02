import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data', 'scholarships');
const outDir = path.join(root, 'src', 'pages', 'scholarships', 'items');
fs.mkdirSync(outDir, { recursive: true });

const yaml = (value = '') => JSON.stringify(String(value));
const files = fs.readdirSync(dataDir).filter((name) => /^seed-\d+\.json$/.test(name)).sort();
const rows = files.flatMap((name) => JSON.parse(fs.readFileSync(path.join(dataDir, name), 'utf8')));

for (const r of rows) {
  const out = path.join(outDir, `catalog-${r.s}.md`);
  if (fs.existsSync(out)) continue;
  const description = `${r.t}：${r.f}。本站以台灣學生角度整理資格、申請狀態與年度時程。`;
  const content = `---\nlayout: ../../../layouts/ScholarshipLayout.astro\ntitle: ${yaml(r.t)}\ndescription: ${yaml(description)}\ndate: 2026-08-30\ncountry: ${yaml(r.c)}\nlevel: ${yaml(r.l)}\nfunding: ${yaml(r.f)}\ndeadline: ${yaml(r.d)}\nstatus: ${yaml(r.st)}\nsourceType: ${yaml(r.ty)}\nsourceName: ${yaml(r.sn)}\nofficialUrl: ${yaml(r.u)}\nsecondSourceUrl: ${yaml(r.u2)}\neligibilityTW: ${yaml(r.e)}\ntaiwanNote: ${yaml(r.n)}\nverificationDate: "2026-09-02"\ncategory: ${yaml(r.cat)}\n---\n\n## 申請重點\n\n**${r.t}**適合正在規劃${r.l}海外升學的台灣學生列入獎學金清單。補助重點為：**${r.f}**。\n\n目前狀態：**${r.st}**。申請時程：**${r.d}**。\n\n## 台灣學生提醒\n\n${r.e}。${r.n}\n\n本站會持續檢查新年度簡章；若新一輪的名額、金額、國籍限制或截止日更新，將以最新官方公告修正。\n`;
  fs.writeFileSync(out, content, 'utf8');
}

console.log(`Scholarship seed: ${rows.length} catalog items generated.`);
