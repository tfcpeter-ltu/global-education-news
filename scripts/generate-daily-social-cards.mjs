import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const date = process.argv[2];
if (!date) throw new Error('Usage: node scripts/generate-daily-social-cards.mjs YYYY-MM-DD');

const outDir = path.join('public/images/social', date);
await fs.mkdir(outDir, { recursive: true });
const dataDir = path.join('docs', 'social-posts', date);
const files = (await fs.readdir(dataDir)).filter(name => name.endsWith('.json') && name !== 'publication-log.json');
const labels = { news: '環球教育新聞', scholarship: '台灣國際獎學金雷達', 'study-abroad': '留學 DIY 導航', 'taiwan-universities': '國內大學選校選系資料庫' };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const file of files) {
  const item = JSON.parse(await fs.readFile(path.join(dataDir, file), 'utf8'));
  if (!item.backgroundImage || !item.socialImage || !Array.isArray(item.headlineLines)) continue;
  const job = { source: item.backgroundImage, kicker: labels[item.campaign] || item.campaign, lines: item.headlineLines };
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="url(#g)"/>
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071b31" stop-opacity=".18"/><stop offset=".52" stop-color="#071b31" stop-opacity=".42"/><stop offset="1" stop-color="#071b31" stop-opacity=".94"/></linearGradient></defs>
    <rect x="64" y="56" width="390" height="48" rx="4" fill="#f2b544"/>
    <text x="84" y="89" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="23" font-weight="700" fill="#071b31">${esc(job.kicker)}</text>
    <text x="66" y="442" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="64" font-weight="800" fill="white">${esc(job.lines[0])}</text>
    <text x="66" y="526" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="58" font-weight="800" fill="white">${esc(job.lines[1])}</text>
    <text x="68" y="590" font-family="Arial, sans-serif" font-size="22" letter-spacing="2" fill="#f2b544">GLOBAL EDUCATION NEWS</text>
  </svg>`);
  await fs.mkdir(path.dirname(item.socialImage), { recursive: true });
  await sharp(job.source).rotate().resize(1200, 630, { fit: 'cover' }).composite([{ input: overlay }]).jpeg({ quality: 90 }).toFile(item.socialImage);
}
console.log(`Generated social cards in ${outDir}`);
