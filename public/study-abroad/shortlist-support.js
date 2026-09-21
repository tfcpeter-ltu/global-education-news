(()=>{
  const KEY='studyNavigatorShortlist';
  const get=()=>{try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value:[]}catch{return []}};
  const set=value=>localStorage.setItem(KEY,JSON.stringify(value));
  const qs=window.QS_RANKING_DATA;
  const global=window.GLOBAL_RANKING_DATA;
  let applying=false;

  function addRankingControls(){
    const box=document.querySelector('.finder-box');
    if(!box||document.getElementById('uni-qs-band'))return;
    if(global){
      const ranking=document.createElement('select');
      ranking.id='uni-ranking-list';
      ranking.setAttribute('aria-label','指定大學榜單');
      ranking.innerHTML='<option value="">全部榜單</option>'+Object.values(global.groups).map(g=>`<option value="${g.id}">${g.label}（${g.entries.length} 所）</option>`).join('');
      box.append(ranking);
      ranking.addEventListener('change',applyRankingView);
    }
    if(!qs)return;
    const band=document.createElement('select');
    band.id='uni-qs-band';
    band.setAttribute('aria-label','QS 2027 世界大學排名');
    band.innerHTML='<option value="">全部 QS 名次</option><option value="1-50">QS 2027 前 50</option><option value="51-100">QS 2027 第 51–100</option><option value="101-200">QS 2027 第 101–200</option><option value="201-500">QS 2027 第 201–500</option>';
    const area=document.createElement('select');
    area.id='uni-qs-area';
    area.setAttribute('aria-label','QS 2026 學術領域');
    area.innerHTML='<option value="">全部 QS 學術領域</option>'+qs.areas.map(value=>`<option value="${value}">${value}｜QS 2026</option>`).join('');
    box.append(band,area);
    const note=document.createElement('div');
    note.className='qs-method-note';
    note.innerHTML='<strong>榜單版本與方法：</strong>英國採 THE 2026、加拿大採 Maclean’s 2026 三類型、美國採 U.S. News 2026 National Universities、澳洲／日本／韓國／中國內地採 QS 2027；新加坡私立教育機構是 SSG／EduTrust 查核清單，不是排名。QS 學術領域採 2026。不同榜單不互相換算；排名也不等於錄取條件。';
    box.after(note);
    band.addEventListener('change',applyRankingView);
    area.addEventListener('change',applyRankingView);
  }

  function addRankingBadge(card,name){
    if(card.querySelector('.qs-ranking-panel,.ossd-planning-panel'))return;
    const entry=qs?.get(name);
    const memberships=global?.get(name)||[];
    const selectedMajor=document.getElementById('uni-major')?.value||'';
    const matched=qs?.subjectFor(name,selectedMajor);
    const strengths=Object.entries(entry?.subjects||{});
    const badge=card.querySelector('.verify-badge');
    let anchor=badge||card.querySelector('h3');
    if(entry||memberships.length){
      const panel=document.createElement('div');
      panel.className='qs-ranking-panel';
      panel.innerHTML=`${entry?`<b>QS 世界大學排名 2027：第 ${entry.rank} 名</b>`:''}${memberships.map(m=>`<b>${m.label}${m.showRank?'：第 '+m.rank+' 名':'：入榜／收錄'}</b>`).join('')}${entry?(matched?`<span>${matched.area}｜QS 學科排名 2026 第 ${matched.rank} 名</span>`:strengths.length?`<span>${strengths.map(([area,rank])=>`${area} #${rank}`).join('・')}（QS 2026）</span>`:entry.highlights?.length?`<span>${entry.highlights.join('・')}（QS 2026）</span>`:'<span>學科領域資料持續逐校查核</span>'):''}`;
      anchor?.insertAdjacentElement('afterend',panel); anchor=panel;
    }
    const country=[...(window.UNIVERSITY_FINDER_DATA||[])].find(x=>x.name===name)?.country;
    const p=global?.profile(country);
    if(p){const box=document.createElement('div');box.className='ossd-planning-panel';box.innerHTML=`<strong>OSSD 申請規劃｜建議 ${p.range}</strong><span>${p.courses}</span><span>${p.language}</span><span>${p.extra}</span><small>這是本站用來建立選校梯度的規劃區間，不是校方保證錄取線；正式條件依年度、校系與個人背景為準。</small>`;anchor?.insertAdjacentElement('afterend',box);}
  }

  function applyRankingView(){
    if(applying)return;
    applying=true;
    const band=document.getElementById('uni-qs-band')?.value||'';
    const area=document.getElementById('uni-qs-area')?.value||'';
    const list=document.getElementById('uni-ranking-list')?.value||'';
    let visible=0;
    document.querySelectorAll('#uni-results .uni-card').forEach(card=>{
      const name=card.querySelector('h3')?.textContent?.trim()||'';
      const entry=qs?.get(name);
      addRankingBadge(card,name);
      const memberships=global?.get(name)||[];
      const show=(!list||memberships.some(m=>m.id===list))&&(!band||(entry&&qs.rankBand(entry.rank)===band))&&(!area||qs?.hasArea(name,area));
      card.hidden=!show;
      if(show)visible+=1;
    });
    if(list||band||area){
      const count=document.getElementById('uni-count');
      if(count)count.textContent=`目前顯示 ${visible} 間已完成 QS 版本與來源查核的大學；未顯示不代表未進榜，而是本站尚未完成逐筆核對。`;
    }
    applying=false;
  }

  function inject(){
    addRankingControls();
    document.querySelectorAll('.uni-card').forEach(card=>{
      const name=card.querySelector('h3')?.textContent?.trim();
      const actions=card.querySelector('.uni-actions');
      if(!name||!actions)return;
      addRankingBadge(card,name);
      if(card.querySelector('.short-btn,.shortlist-btn'))return;
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='shortlist-btn';
      const paint=()=>{const on=get().includes(name);btn.textContent=on?'★ 已收藏':'☆ 收藏';btn.style.background=on?'#f7f2e7':'#fff'};
      btn.addEventListener('click',()=>{let value=get();value=value.includes(name)?value.filter(item=>item!==name):[...value,name];set(value);paint();renderBadge()});
      actions.appendChild(btn);
      paint();
    });
    applyRankingView();
  }

  function renderBadge(){
    let badge=document.getElementById('shortlist-float');
    const count=get().length;
    if(!count){badge?.remove();return}
    if(!badge){badge=document.createElement('a');badge.id='shortlist-float';badge.href='shortlist.html';badge.style='position:fixed;right:18px;bottom:82px;z-index:89;background:#fff;color:#10243d;border:1px solid #d9d1c3;border-radius:999px;padding:10px 14px;font-weight:800;box-shadow:0 10px 28px rgba(16,36,61,.16)';document.body.appendChild(badge)}
    badge.textContent=`我的選校 ${count} 間 →`;
  }

  const style=document.createElement('style');
  style.textContent='.qs-method-note{margin:12px 0 20px;padding:12px 15px;border:1px solid #cbd9e6;border-radius:13px;background:#eef4f8;color:#33485d;font-size:13px;line-height:1.65}.qs-ranking-panel{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:8px 0 10px}.qs-ranking-panel b,.qs-ranking-panel span{border-radius:999px;padding:5px 9px;font-size:12px}.qs-ranking-panel b{background:#10243d;color:#fff}.qs-ranking-panel span{background:#edf3f8;color:#314b63;border:1px solid #cfdae4}.ossd-planning-panel{display:grid;gap:6px;background:#f8f3e9;border:1px solid #e5d6b8;border-radius:13px;padding:12px 14px;margin:10px 0;font-size:12px;line-height:1.55}.ossd-planning-panel strong{color:#10243d}.ossd-planning-panel span:before{content:"✓ ";color:#47694f}.ossd-planning-panel small{color:#6b655d}.uni-card[hidden]{display:none!important}@media(min-width:1001px){.finder-box{grid-template-columns:repeat(3,minmax(0,1fr))!important}}';
  document.head.appendChild(style);
  const target=document.getElementById('uni-results')||document.body;
  const observer=new MutationObserver(()=>{inject();renderBadge()});
  observer.observe(target,{childList:true,subtree:true});
  inject();renderBadge();
})();
