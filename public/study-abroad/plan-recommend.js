(()=>{
const data=window.UNIVERSITY_FINDER_DATA||[];
const DS=window.STUDENT_DECISION_SUPPORT;
const PI=window.PROGRAM_INSIGHTS;
const p=new URLSearchParams(location.search);
let saved={};try{saved=JSON.parse(localStorage.getItem('studyNavigatorProfile')||'{}')||{}}catch(e){}
const get=k=>p.get(k)||saved[k]||'';
const profile={country:get('country'),major:get('major'),goal:get('goal'),curriculum:get('curriculum'),grade:get('grade'),english:get('english'),budget:get('budget'),priority:get('priority'),need:get('need')};
const gradeBand=profile.grade;
const gradeStrength=/90%|A 水準/.test(gradeBand)?3:/85–89/.test(gradeBand)?2:/80–84/.test(gradeBand)?1:/75–79/.test(gradeBand)?0:-1;
const goalTerms=p.has('goal')?p.get('goal'):p.has('priority')?p.get('priority'):profile.goal||profile.priority;
const matchesMajor=x=>!profile.major||(x.majors||[]).includes(profile.major);
const matchesCountry=x=>!profile.country||x.country===profile.country;
const goalScore=x=>{let s=0;const gs=(x.goals||[]).join(' ');if(/研究|世界排名|名校/.test(goalTerms)&&/名校|研究/.test(gs))s+=3;if(/就業|企業評價/.test(goalTerms)&&/就業|Co-op|實務|科技/.test(gs))s+=3;if(/Co-op|實習/.test(goalTerms)&&/Co-op|實務|就業/.test(gs))s+=3;if(/專業執照/.test(goalTerms)&&/醫療|工程|就業/.test(gs))s+=2;if(/藝術|產業/.test(goalTerms)&&/藝術|音樂|實務/.test(gs))s+=3;return s;};
const competitionLevel=x=>{const d=DS?.describe(x,profile.major,profile);return d?.competition||''};
const classify=x=>{const comp=competitionLevel(x);const gs=goalScore(x);if(/非常高/.test(comp)&&gradeStrength<2)return '條件需再確認';if(/高/.test(comp)&&gradeStrength<1)return '條件需再確認';if(gs>=3)return '優先研究';return '可比較';};
const pool=data.filter(x=>matchesCountry(x)&&matchesMajor(x));
const scored=pool.map(x=>({x,score:goalScore(x),bucket:classify(x)})).sort((a,b)=>b.score-a.score||a.x.name.localeCompare(b.x.name));
const top=scored.slice(0,12);
const root=document.getElementById('plan-recommendations');
if(!root)return;
const card=({x,bucket})=>{const d=DS?.describe(x,profile.major,profile);const pi=PI?.get(x,profile.major);return `<article class="plan-school"><div class="school-head"><span>${bucket}</span><small>${x.countryLabel} · ${x.city}</small></div><h3>${x.name}</h3><p>${x.note||''}</p>${pi&&profile.major?`<div class="priority"><strong>${profile.major}｜這間的定位</strong><p>${pi.focus}<br><small>${pi.scope||''}</small></p><p><strong>適合：</strong>${pi.best}</p><p><strong>取捨：</strong>${pi.tradeoff}</p></div>`:''}${d?`<div class="school-grid"><div><b>研究／聲望</b><span>${d.prestige}</span></div><div><b>當地就業</b><span>${d.local}</span></div><div><b>競爭度</b><span>${d.competition}</span></div><div><b>申請平台</b><span>${d.docs.platform}</span></div></div><p><strong>這個科系要確認：</strong>${d.req.prereq}</p>`:''}<div class="plan-actions"><a href="university-detail.html?school=${encodeURIComponent(x.name)}&major=${encodeURIComponent(profile.major)}">完整分析</a><a href="${x.url}" target="_blank" rel="noopener">官方網站</a><a href="apply.html?country=${encodeURIComponent(x.country)}&major=${encodeURIComponent(profile.major)}">怎麼申請</a><a href="documents.html?country=${encodeURIComponent(x.country)}&major=${encodeURIComponent(profile.major)}">文件清單</a><a href="timeline.html?country=${encodeURIComponent(x.country)}&major=${encodeURIComponent(profile.major)}">時間表</a></div></article>`};
const groups=['優先研究','可比較','條件需再確認'];let html='';groups.forEach(g=>{const rows=top.filter(r=>r.bucket===g);if(!rows.length)return;html+=`<section class="recommend-group"><div class="recommend-head"><h3>${g}</h3><p>${g==='優先研究'?'方向與你的目標吻合度較高，建議先深入查課程。':g==='可比較'?'適合放進第一輪選校清單，和其他學校一起比較。':'不是不能申請，而是目前條件或資訊不足，請先核對成績、英文與 prerequisite。'}</p></div><div class="recommend-grid">${rows.map(card).join('')}</div></section>`;});if(!html)html='<div class="plan-card"><h3>目前沒有直接符合的代表性大學</h3><p>先放寬國家或科系條件，再回選校器做第一輪研究。</p><div class="plan-actions"><a href="universities.html">開啟選校器</a><a href="majors.html">重新看科系</a></div></div>';root.innerHTML=html;
})();
