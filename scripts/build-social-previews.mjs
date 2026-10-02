import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve('dist');
const origin = 'https://globalednews.com';
const prepare = process.argv.includes('--prepare');
const cacheDir = path.resolve('public/images/share-photos');
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = text => text.replace(/&amp;/g, '&');
const defaultPhoto = '/images/social/2026-10-02/ucla-royce-hall.jpg';
async function* pages(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* pages(file);
    else if (entry.name.endsWith('.html')) yield file;
  }
}
const jobs = [];
for await (const file of pages(root)) {
  const html = await fs.readFile(file, 'utf8');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!title || !/<\/head>/i.test(html) || /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
  const hero = html.match(/<figure[^>]*class="article-hero-image"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i)?.[1];
  const og = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)?.[1];
  let source = decode(hero || og || defaultPhoto);
  if (!hero && (/news-og\.jpg|social-preview\.jpg|\/images\/share\/|\.svg(?:\?|$)/i.test(source))) source = defaultPhoto;
  jobs.push({ file, html, title, source, hero });
}
await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(path.join(root, 'images/share-photos'), { recursive: true });
const sources = [...new Set(jobs.map(j => j.source))];
const photos = new Map();
const failures = [];
async function photo(source) {
  const key = createHash('sha256').update(source).digest('hex').slice(0, 24) + '.jpg';
  const cached = path.join(cacheDir, key);
  let bytes;
  try { bytes = await fs.readFile(cached); }
  catch {
    const url = new URL(source, origin);
    if (url.origin === origin) bytes = await fs.readFile(path.join('public', decodeURIComponent(url.pathname)));
    else {
      if (!prepare) throw new Error('Remote photo is not cached; run --prepare and commit the photo before deployment');
      if (url.hostname === 'commons.wikimedia.org' && url.pathname.includes('/Special:Redirect/file/')) {
        const name = decodeURIComponent(url.pathname.split('/Special:Redirect/file/')[1]).replace(/ /g, '_');
        const hash = createHash('md5').update(name).digest('hex');
        url.href = `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.slice(0, 2)}/${encodeURIComponent(name)}`;
      }
      if (url.hostname === 'upload.wikimedia.org' && !url.pathname.includes('/thumb/')) {
        const name = decodeURIComponent(url.pathname.split('/').pop()).replace(/ /g, '_');
        const hash = createHash('md5').update(name).digest('hex');
        const filename = encodeURIComponent(name);
        url.href = `https://thumb.wikimedia.org/wikipedia/commons/thumb/${hash[0]}/${hash.slice(0, 2)}/${filename}/1280px-${filename}`;
      }
      const response = await fetch(url, { headers: { 'User-Agent': 'GlobalEducationNews/1.0 (editorial photo cache)' }, signal: AbortSignal.timeout(20000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Photo download failed: ${response.status}`);
      bytes = Buffer.from(await response.arrayBuffer());
    }
    const metadata = await sharp(bytes).metadata();
    if (!['jpeg', 'png', 'webp', 'avif', 'tiff'].includes(metadata.format)) throw new Error('A raster photograph is required; SVG/text cards are not photos');
    bytes = await sharp(bytes).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
    if (prepare) await fs.writeFile(cached, bytes);
  }
  const metadata = await sharp(bytes).metadata();
  const stats = await sharp(bytes).stats();
  if (metadata.width !== 1200 || metadata.height !== 630 || stats.channels.every(c => c.stdev < 5)) throw new Error('Blank or invalid photo');
  await fs.writeFile(path.join(root, 'images/share-photos', key), bytes);
  photos.set(source, `${origin}/images/share-photos/${key}`);
}
let index = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (index < sources.length) {
    const source = sources[index++];
    try { await photo(source); }
    catch (error) { failures.push({ source, error: error.message, pages: jobs.filter(j => j.source === source).map(j => path.relative(root, j.file)) }); }
  }
}));
if (failures.length) {
  await fs.mkdir('tmp', { recursive: true });
  await fs.writeFile('tmp/photo-preview-failures.json', JSON.stringify(failures, null, 2));
  throw new Error(`${failures.length} photo sources failed; see tmp/photo-preview-failures.json. No text-card fallback is allowed.`);
}
for (const job of jobs) {
  let html = job.html;
  const image = photos.get(job.source);
  if (job.hero) html = html.replaceAll(escape(job.source), image).replaceAll(job.source, image);
  if (!/property=["']og:title["']/i.test(html)) html = html.replace(/<\/head>/i, `<meta property="og:title" content="${escape(job.title)}"></head>`);
  html = html.replace(/<meta\b[^>]*(?:property|name)=["'](?:og:image(?::[\w]+)?|twitter:image(?::[\w]+)?)["'][^>]*>/gi, '');
  const tags = `<meta property="og:image" content="${image}"><meta property="og:image:secure_url" content="${image}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(job.title)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${escape(job.title)}"><meta name="social-preview-kind" content="photograph">`;
  html = html.replace(/<\/head>/i, tags + '</head>');
  html = html.replace(/<\/body>/i, `<p style="text-align:center;font-size:12px;padding:12px"><a href="/image-credits/#${image.split('/').pop()}">Photo source &amp; license · cropped for sharing</a></p></body>`);
  await fs.writeFile(job.file, html);
}
if (!jobs.length) throw new Error('No shareable HTML pages found');
if (prepare) await fs.writeFile(path.join(cacheDir, 'sources.json'), JSON.stringify(Object.fromEntries([...photos].map(([source, url]) => [url.split('/').pop(), source])), null, 2) + '\n');
const credits = JSON.parse(await fs.readFile(path.join(cacheDir, 'credits.json'), 'utf8'));
await fs.mkdir(path.join(root, 'image-credits'), { recursive: true });
await fs.writeFile(path.join(root, 'image-credits/index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Photo sources and licenses</title></head><body style="font:16px/1.6 sans-serif;max-width:900px;margin:40px auto;padding:16px"><h1>Photo sources and licenses</h1><p>Photographs are resized and cropped to 1200 × 630 for sharing. Adaptations retain the original photo license.</p>${Object.entries(credits).map(([file, credit]) => `<section id="${file}"><h2>${file}</h2><p>${escape(credit.artist || credit.credit || '')}</p><p><a href="${escape(credit.source)}">Original source</a> · ${credit.licenseUrl ? `<a href="${escape(credit.licenseUrl)}">${escape(credit.license)}</a>` : escape(credit.license || 'See original article credit')}</p></section>`).join('')}</body></html>`);
console.log(`Verified ${jobs.length} photo previews from ${photos.size} original images; no text-only cards.`);
