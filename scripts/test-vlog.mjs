import assert from 'node:assert/strict';
import fs from 'node:fs';
import { nextVideoIndex, endedVideoIndex } from '../src/lib/vlog-playlist.mjs';
import { vlogGroup } from '../src/lib/vlog-categories.mjs';
const videos=JSON.parse(fs.readFileSync(new URL('../src/data/vlog-videos.json',import.meta.url),'utf8')).filter(v=>v.status==='published');
assert.ok(videos.length>0);
assert.equal(new Set(videos.map(v=>v.id)).size,videos.length,'Duplicate YouTube video');
const recommendedIds=['8-zSAurL2hY','nBD6XJWkaPk','8PCtk9OV-sk','fhxXy0P7gkc','QdWNTNuOxso','zM3H-bUNvUg','5AeDNw4kxu4','70D3Legd1kc','lEJ-qc82YG4','9bxccQwHyro','KQG282CRC5k'];
assert.deepEqual(videos.filter(v=>v.recommended).sort((a,b)=>a.priority-b.priority).map(v=>v.id),recommendedIds,'Preserve Peter’s recommendations, once each, in supplied order');
const shortIds=['RDDDlBReyjI','JdKukj8yn0c','1jlZwuedH-8','YScfNNBNSZE','WIYpkGJCGdw','svhqSyrUl1Q','JrXECILbeUg','m3m7cUuJqW8'];
for(const v of videos){
  assert.match(v.id,/^[\w-]{11}$/);assert.equal(v.url,`https://www.youtube.com/watch?v=${v.id}`);
  assert.ok(v.thumbnail.startsWith(`https://i.ytimg.com/vi/${v.id}/`));
  assert.ok(['peter','official','submission'].includes(v.sourceType));assert.ok(Number.isFinite(Date.parse(v.publishedAt)));
  assert.match(v.duration,/^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)?$/);
  if(v.sourceType==='peter')assert.equal(v.channelId,'UCpQEfgKcfpTvhO768DopAuA');
}
for(const id of shortIds){const v=videos.find(v=>v.id===id);assert.ok(v,`Missing verified tour short ${id}`);assert.equal(vlogGroup(v),'tour');assert.equal(v.format,'short');assert.ok(!v.collectedAt,'Extra tour imports must not replace six daily picks');}
assert.equal(vlogGroup({topic:'遊學體驗'}),'tour','Existing summer school and camp videos belong in the tour column');
assert.equal(vlogGroup({sourceType:'peter',topic:'LTU課程介紹'}),'study','LTU degree-planning talks are not automatically study tours');
assert.equal(nextVideoIndex(0,0),-1);assert.equal(nextVideoIndex(0,1),0);
assert.equal(endedVideoIndex(3,10,false),3);
for(const group of ['study','tour']){const queue=videos.filter(v=>vlogGroup(v)===group);assert.ok(queue.length);assert.equal(nextVideoIndex(queue.length-1,queue.length),0);assert.equal(nextVideoIndex(0,queue.length,-1),queue.length-1);assert.equal(endedVideoIndex(queue.length-1,queue.length,true),0);}
if(process.argv.includes('--built')){
  for(const route of ['vlog/index.html','en/vlog/index.html']){
    const html=fs.readFileSync(new URL(`../dist/${route}`,import.meta.url),'utf8');
    assert.equal((html.match(/class="video-card"/g)??[]).length,videos.length,'Each video belongs to one playback queue');
    assert.equal((html.match(/data-player="study"/g)??[]).length,1);assert.equal((html.match(/data-player="tour"/g)??[]).length,1);
    const studyStart=html.indexOf('data-group="study"'),tourStart=html.indexOf('data-group="tour"');
    assert.ok(studyStart>0&&tourStart>studyStart,'Study column is left of tour column');
    const columns={study:html.slice(studyStart,tourStart),tour:html.slice(tourStart)};
    for(const v of videos){assert.ok(columns[vlogGroup(v)].includes(`data-id="${v.id}"`),`${route}: video in wrong column ${v.id}`);}
    for(const group of ['study','tour'])assert.ok(columns[group].indexOf(`data-player="${group}"`)<columns[group].indexOf('class="video-grid"'),'Each player must precede its long library list');
    assert.ok(html.includes('data-view="tour"'),'Mobile tour switch must exist near the top');
    const latest=videos.map(v=>v.collectedAt?.slice(0,10)??'').sort().at(-1);
    if(latest){const daily=videos.filter(v=>v.collectedAt?.slice(0,10)===latest).sort((a,b)=>a.priority-b.priority).slice(0,6);assert.equal((html.match(/data-daily-video=/g)??[]).length,daily.length);for(const v of daily)assert.ok(html.includes(`data-daily-video="${v.id}"`));}
    const modules=[...html.matchAll(/<script\b[^>]*src="(\/_astro\/[^\"]+\.js)"/g)].map(m=>m[1]);
    assert.ok(modules.some(src=>fs.readFileSync(new URL(`../dist${src}`,import.meta.url),'utf8').includes('onYouTubeIframeAPIReady')),`${route}: video controller lost`);
    assert.ok(!html.includes('class="original-link"'),'Cards must play inline');
  }
}
console.log(`Vlog catalog, two columns and independent playback checks passed (${videos.length} videos).`);
