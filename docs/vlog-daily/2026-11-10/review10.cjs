const fs=require('fs');const dir='docs/vlog-daily/2026-11-10';const ids=["8EUX0DzJmKM","-hm9RzZOpYY","oXEQ8r-8C9Y","wFIo795BXb4","L3gZplooDV0","eTjBgHIHaHU"];
(async()=>{let rows=[];for(const id of ids){let s=await(await fetch('https://www.youtube.com/watch?v='+id)).text();let m=s.match(/var ytInitialPlayerResponse = (.*?);<\/script>/);if(!m)throw Error(id);let p=JSON.parse(m[1]),v=p.videoDetails,f=p.microformat.playerMicroformatRenderer,cc=[];for(const c of(p.captions?.playerCaptionsTracklistRenderer?.captionTracks||[]).slice(0,1)){let r=await fetch(c.baseUrl);let t=await r.text();cc.push({language:c.languageCode,status:r.status,bytes:t.length,text:t.slice(0,28000)});}let thumb=await fetch('https://i.ytimg.com/vi/'+id+'/hqdefault.jpg');let row={id,title:v.title,channel:v.author,channelId:v.channelId,description:v.shortDescription,views:v.viewCount,publishedAt:f.publishDate,seconds:v.lengthSeconds,playability:p.playabilityStatus,embed:f.embed,thumbnailStatus:thumb.status,captions:cc,verifiedAt:new Date().toISOString()};rows.push(row);console.log(JSON.stringify(row));}fs.writeFileSync(dir+'/source-review.json',JSON.stringify(rows,null,2));})();









