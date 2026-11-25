import fs from 'node:fs';const dir='docs/vlog-daily/2026-11-25';fs.mkdirSync(dir,{recursive:true});const qs=["SNUOGA Student Center"];const known=new Set(JSON.parse(fs.readFileSync('src/data/vlog-videos.json')).map(x=>x.id));let rows=[];for(const q of qs){let s=await(await fetch('https://www.youtube.com/channel/UCj_3iDGRgsrO8uyxVFtuMIg/videos')).text();let m=s.match(/var ytInitialData = (.*?);<\/script>/);if(!m)continue;let vs=[];function walk(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){let v=o.videoRenderer;if(!known.has(v.videoId))vs.push({id:v.videoId,title:v.title?.runs?.map(x=>x.text).join(''),channel:v.ownerText?.runs?.[0]?.text,views:v.viewCountText,published:v.publishedTimeText});}for(let v of Object.values(o))if(typeof v==='object')walk(v)}walk(JSON.parse(m[1]));rows.push({q,rows:vs.slice(0,15)});}fs.writeFileSync(dir+'/snu-candidates.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows));















