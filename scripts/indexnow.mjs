import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const site = 'https://globalednews.com';
const key = 'b4c9e7a28d15460f9ab52e86c0317d48';
const keyLocation = `${site}/${key}.txt`;
const request = async (url, options = {}) => fetch(url, { ...options, signal: AbortSignal.timeout(30000) });

if (process.argv[2] === 'prepare') {
  const pages = {};
  async function scan(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await scan(file);
      else if (entry.name.endsWith('.html')) {
        const html = await fs.readFile(file, 'utf8');
        if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
        if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) continue;
        const href = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
        const pageUrl = new URL(path.relative('dist', file).split(path.sep).join('/'), site + '/');
        const canonical = href ? new URL(href, pageUrl) : null;
        const routeUrl = new URL(pageUrl.href.replace(/\/index\.html$/, '/'));
        if (canonical?.origin === site && canonical.href === routeUrl.href)
          pages[canonical.href] = createHash('sha256').update(html).digest('hex');
      }
    }
  }
  await scan('dist');
  if (!Object.keys(pages).length) throw new Error('No canonical pages found');
  const previous = await request(`${site}/indexnow-manifest.json`);
  let old;
  if (previous.ok) {
    old = await previous.json();
    if (old.schemaVersion !== 1 || !old.pages) throw new Error('Invalid live manifest');
  } else if (previous.status !== 404) throw new Error(`Live manifest HTTP ${previous.status}`);
  // First activation establishes a baseline; do not flood Bing with unchanged archives.
  const urls = old ? [...new Set([
    ...Object.keys(pages).filter(url => pages[url] !== old.pages[url]),
    ...Object.keys(old.pages).filter(url => !(url in pages)),
  ])] : [site + '/'];
  const commit = process.env.GITHUB_SHA || 'local';
  await fs.writeFile('dist/indexnow-manifest.json', JSON.stringify({ schemaVersion: 1, commit, pages }));
  await fs.writeFile('indexnow-submission.json', JSON.stringify({ commit, urls }));
  console.log(`IndexNow prepared ${urls.length} changed URLs; ${Object.keys(pages).length} canonical pages`);
} else if (process.argv[2] === 'submit') {
  const { commit, urls } = JSON.parse(await fs.readFile('indexnow-submission.json', 'utf8'));
  let ready = false;
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await request(`${site}/indexnow-manifest.json?commit=${commit}`);
    if (response.ok && (await response.json()).commit === commit) { ready = true; break; }
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  if (!ready) throw new Error('This deployment is not visible on the live domain; URLs were not submitted');
  const proof = await request(keyLocation);
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Live IndexNow key verification failed');
  if (!urls.every(url => new URL(url).origin === site)) throw new Error('Invalid submission host');
  for (let offset = 0; offset < urls.length; offset += 10000) {
    const batch = urls.slice(offset, offset + 10000);
    const response = await request('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: 'globalednews.com', key, keyLocation, urlList: batch }),
    });
    if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}: ${await response.text()}`);
    console.log(`IndexNow received ${batch.length} URLs: HTTP ${response.status}; receipt is not proof of indexing`);
  }
  if (!urls.length) console.log('No changed URLs; nothing submitted');
} else throw new Error('Usage: node scripts/indexnow.mjs prepare|submit');

