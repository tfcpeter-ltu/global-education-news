import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(process.argv[2] || 'dist');
const origin = 'https://globalednews.com';
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = text => text.replace(/&(?:amp|lt|gt|quot|apos|#(\d+)|#x([\da-f]+));/gi, (m, dec, hex) => dec || hex ? String.fromCodePoint(parseInt(dec || hex, hex ? 16 : 10)) : ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"}[m] || m));
async function* pages(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* pages(file);
    else if (entry.name.endsWith('.html')) yield file;
  }
}
function wrap(text, width) {
  const lines = []; let line = '', size = 0;
  for (const char of text) {
    const weight = /[\x00-\x7f]/.test(char) ? 0.56 : 1;
    if (size + weight > width) { lines.push(line.trim()); line = ''; size = 0; }
    line += char; size += weight;
  }
  if (line) lines.push(line.trim());
  return lines;
}
await fs.mkdir(path.join(root, 'images/share'), { recursive: true });
let count = 0;
for await (const file of pages(root)) {
  let html = await fs.readFile(file, 'utf8');
  const rawTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!rawTitle || !/<\/head>/i.test(html) || /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
  const title = decode(rawTitle).replace(/\s*[｜|]\s*(?:環球教育新聞網.*|Global Education News.*)$/i, '').trim();
  const english = path.relative(root, file).split(path.sep)[0] === 'en';
  const lines = wrap(title, 18);
  if (lines.length > 5) throw new Error(`Share title too long: ${file}`);
  const size = lines.length > 3 ? 42 : 50;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f3f0e7"/><rect width="18" height="630" fill="#173d4a"/><path d="M64 146H1136" stroke="#c4b68d" stroke-width="2"/><g font-family="Noto Sans CJK TC,Microsoft JhengHei,sans-serif"><text x="64" y="73" font-size="30" fill="#173d4a">${english ? 'Global Education News' : '環球教育新聞網'}</text><text x="64" y="112" font-size="19" letter-spacing="3" fill="#66777b">GLOBAL EDUCATION · POLICY · ADMISSIONS</text>${lines.map((line, i) => `<text x="64" y="${215 + i * (size + 18)}" font-size="${size}" font-weight="700" fill="#142e39">${escape(line)}</text>`).join('')}<rect x="64" y="542" width="1072" height="2" fill="#c4b68d"/><text x="64" y="589" font-size="23" fill="#173d4a">globalednews.com</text><text x="1136" y="589" text-anchor="end" font-size="22" fill="#66777b">${english ? 'News · Universities · Scholarships' : '國際教育新聞・大學申請・獎學金'}</text></g></svg>`;
  const filename = createHash('sha256').update(svg).digest('hex').slice(0, 24) + '.png';
  const output = path.join(root, 'images/share', filename);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const info = await sharp(png).metadata();
  if (info.width !== 1200 || info.height !== 630 || png.length < 5000) throw new Error(`Invalid preview: ${file}`);
  await fs.writeFile(output, png);
  const image = `${origin}/images/share/${filename}`;
  if (!/property=["']og:title["']/i.test(html)) html = html.replace(/<\/head>/i, `<meta property="og:title" content="${escape(title)}"></head>`);
  html = html.replace(/<meta\b[^>]*(?:property|name)=["'](?:og:image(?::[\w]+)?|twitter:image(?::[\w]+)?)["'][^>]*>/gi, '');
  const tags = `<meta property="og:image" content="${image}"><meta property="og:image:secure_url" content="${image}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(title)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${escape(title)}">`;
  html = html.replace(/<\/head>/i, tags + '</head>');
  await fs.writeFile(file, html);
  count++;
}
if (!count) throw new Error('No shareable HTML pages found');
console.log(`Verified ${count} self-hosted social preview cards (1200 × 630 PNG).`);
