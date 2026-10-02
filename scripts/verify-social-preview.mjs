import sharp from 'sharp';

const urls = process.argv.slice(2);
if (!urls.length) throw new Error('Usage: node scripts/verify-social-preview.mjs <public page URL> [...]');
for (const url of urls) {
  const page = await fetch(url, { headers: { 'User-Agent': 'facebookexternalhit/1.1' }, signal: AbortSignal.timeout(30000) });
  if (!page.ok || !page.headers.get('content-type')?.includes('text/html')) throw new Error(`Page inaccessible: ${url}`);
  const html = await page.text();
  const images = [...html.matchAll(/<meta\s+property="og:image"\s+content="([^"]+)"/g)];
  if (images.length !== 1) throw new Error(`Expected one preview image: ${url}`);
  const image = new URL(images[0][1]);
  if (image.origin !== new URL(url).origin) throw new Error(`Preview image must be self-hosted: ${image}`);
  const response = await fetch(image, { redirect: 'error', headers: { 'User-Agent': 'facebookexternalhit/1.1' }, signal: AbortSignal.timeout(30000) });
  if (!response.ok || !/^image\/(png|jpeg)$/.test(response.headers.get('content-type') || '')) throw new Error(`Invalid image response: ${image}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const info = await sharp(bytes).metadata();
  const stats = await sharp(bytes).stats();
  if (info.width !== 1200 || info.height !== 630 || stats.channels.every(c => c.stdev < 5)) throw new Error(`Blank or invalid preview: ${image}`);
  console.log(`PASS ${url}: ${info.width} × ${info.height}, ${bytes.length} bytes, visible image content`);
}
