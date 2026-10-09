import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const date = process.argv[2];
if (!date) throw new Error('Usage: node scripts/generate-daily-social-cards.mjs YYYY-MM-DD');

const jobs = [
  { name: 'news-unsw', source: 'public/images/share-photos/35bb8698dda105c840b6865f.jpg', kicker: '澳洲大學招生', lines: ['UNSW 2027 新途徑', '合格申請自動加 5 點'] },
  { name: 'scholarship-essex', source: 'public/images/share-photos/13fdd2829261bc1eb1698f28.jpg', kicker: '台灣國際獎學金雷達', lines: ['台灣學生適用', '首年減免 £5,000'] },
  { name: 'study-abroad-toronto', source: 'public/images/share-photos/25afcbd53c58950c938094a7.jpg', kicker: '留學 DIY 導航', lines: ['多倫多選校', '先查課程再算總成本'] },
  { name: 'taiwan-universities-fields', source: 'public/images/share-photos/8bc205794721c86c78aac271.jpg', kicker: '國內大學選校選系資料庫', lines: ['同一興趣', '如何跨校找科系？'] }
];

const outDir = path.join('public/images/social', date);
await fs.mkdir(outDir, { recursive: true });
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const job of jobs) {
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="url(#g)"/>
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071b31" stop-opacity=".18"/><stop offset=".52" stop-color="#071b31" stop-opacity=".42"/><stop offset="1" stop-color="#071b31" stop-opacity=".94"/></linearGradient></defs>
    <rect x="64" y="56" width="390" height="48" rx="4" fill="#f2b544"/>
    <text x="84" y="89" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="23" font-weight="700" fill="#071b31">${esc(job.kicker)}</text>
    <text x="66" y="442" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="64" font-weight="800" fill="white">${esc(job.lines[0])}</text>
    <text x="66" y="526" font-family="Arial, 'Noto Sans TC', sans-serif" font-size="58" font-weight="800" fill="white">${esc(job.lines[1])}</text>
    <text x="68" y="590" font-family="Arial, sans-serif" font-size="22" letter-spacing="2" fill="#f2b544">GLOBAL EDUCATION NEWS</text>
  </svg>`);
  await sharp(job.source).rotate().resize(1200, 630, { fit: 'cover' }).composite([{ input: overlay }]).jpeg({ quality: 90 }).toFile(path.join(outDir, `${job.name}.jpg`));
}
console.log(`Generated ${jobs.length} social cards in ${outDir}`);
