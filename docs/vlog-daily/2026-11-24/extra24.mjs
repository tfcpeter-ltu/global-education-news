import fs from 'node:fs';const dir='docs/vlog-daily/2026-11-24';fs.mkdirSync(dir,{recursive:true});const old=['University of Birmingham official student life','University of British Columbia official student advice','University of Hong Kong official campus tour','University of Queensland official student life','Dartmouth official commencement speech','Peter 國際教育講座 LTU 英國 加拿大'];const qs=['McMaster University official campus tour','University of Copenhagen official student life','HKUST official campus tour'];const known=new Set(JSON.parse(fs.readFileSync('src/data/vlog-videos.json')).map(x=>x.id));let rows=[];for(const q of qs){let s=await(await fetch('https://www.youtube.com/results?search_query='+encodeURIComponent(q))).text();let m=s.match(/var ytInitialData = (.*?);<\/script>/);if(!m)continue;let vs=[];function walk(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){let v=o.videoRenderer;if(!known.has(v.videoId))vs.push({id:v.videoId,title:v.title?.runs?.map(x=>x.text).join(''),channel:v.ownerText?.runs?.[0]?.text,views:v.viewCountText,published:v.publishedTimeText});}for(let v of Object.values(o))if(typeof v==='object')walk(v)}walk(JSON.parse(m[1]));rows.push({q,rows:vs.slice(0,6)});}fs.writeFileSync(dir+'/extra-candidates.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows));













