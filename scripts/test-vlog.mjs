import assert from 'node:assert/strict';
import fs from 'node:fs';
import { nextVideoIndex, endedVideoIndex } from '../src/lib/vlog-playlist.mjs';
const videos = JSON.parse(fs.readFileSync(new URL('../src/data/vlog-videos.json', import.meta.url), 'utf8')).filter(v => v.status === 'published');
assert.ok(videos.length > 0);
assert.equal(new Set(videos.map(v => v.id)).size, videos.length, 'Duplicate YouTube video');
assert.ok(videos.some(v => v.featured), 'A featured video is required');
const recommendedIds = ['8-zSAurL2hY','nBD6XJWkaPk','8PCtk9OV-sk','fhxXy0P7gkc','QdWNTNuOxso','zM3H-bUNvUg','5AeDNw4kxu4','70D3Legd1kc','lEJ-qc82YG4'];
assert.deepEqual(videos.filter(v => v.recommended).sort((a,b) => a.priority-b.priority).map(v => v.id), recommendedIds, 'Preserve Peter’s nine recommendations, once each, in supplied order');
for (const video of videos) {
  assert.match(video.id, /^[\w-]{11}$/);
  assert.equal(video.url, `https://www.youtube.com/watch?v=${video.id}`);
  assert.ok(video.thumbnail.startsWith(`https://i.ytimg.com/vi/${video.id}/`));
  assert.ok(['peter', 'official', 'submission'].includes(video.sourceType));
  assert.ok(Number.isFinite(Date.parse(video.publishedAt)));
  assert.match(video.duration, /^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)?$/);
  if (video.sourceType === 'peter') assert.equal(video.channelId, 'UCpQEfgKcfpTvhO768DopAuA');
}
assert.equal(nextVideoIndex(9, 10), 0, 'Last video must wrap to first');
assert.equal(nextVideoIndex(0, 10, -1), 9, 'Previous from first must wrap');
assert.equal(nextVideoIndex(0, 0), -1, 'Empty list must not select an invalid video');
assert.equal(nextVideoIndex(0, 1), 0);
assert.equal(endedVideoIndex(3, 10, false), 3, 'Disabling autoplay must preserve current video');
assert.equal(endedVideoIndex(3, 10, true), 4);
assert.equal(endedVideoIndex(9, 10, true), 0);
if (process.argv.includes('--built')) {
  for (const route of ['vlog/index.html', 'en/vlog/index.html']) {
    const html = fs.readFileSync(new URL(`../dist/${route}`, import.meta.url), 'utf8');
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
    const modules = [...body.matchAll(/<script\b[^>]*src="(\/_astro\/[^\"]+\.js)"/g)].map(m => m[1]);
    assert.ok(modules.some(src => fs.readFileSync(new URL(`../dist${src}`, import.meta.url), 'utf8').includes('onYouTubeIframeAPIReady')), `${route}: video controller was lost during HTML processing`);
    assert.ok(!body.includes('class="original-link"'), 'Video cards must play inline instead of showing external link lists');
  }
}
console.log(`Vlog catalog and playback checks passed (${videos.length} videos).`);
