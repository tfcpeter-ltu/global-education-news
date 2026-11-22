import fs from 'node:fs';const dir='docs/vlog-daily/2026-11-22';fs.mkdirSync(dir,{recursive:true});const ignored=['University of Manchester official student life','McGill University official campus tour','National University Singapore official student life','University of Melbourne official student life','Harvard official commencement speech','Peter 國際教育講座 LTU 英國 加拿大'];const qs=['University of Bristol student life official','University of Sydney student experience official','Yale commencement speech official','ETH Zurich campus official','University of Toronto student advice official'];const known=new Set(JSON.parse(fs.readFileSync('src/data/vlog-videos.json')).map(x=>x.id));let rows=[];for(const q of qs){let s=await(await fetch('https://www.youtube.com/results?search_query='+encodeURIComponent(q))).text();let m=s.match(/var ytInitialData = (.*?);<\/script>/);if(!m)continue;let vs=[];function walk(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){let v=o.videoRenderer;if(!known.has(v.videoId))vs.push({id:v.videoId,title:v.title?.runs?.map(x=>x.text).join(''),channel:v.ownerText?.runs?.[0]?.text,views:v.viewCountText,published:v.publishedTimeText});}for(let v of Object.values(o))if(typeof v==='object')walk(v)}walk(JSON.parse(m[1]));rows.push({q,rows:vs.slice(0,6)});}fs.writeFileSync(dir+'/extra-candidates.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows));












