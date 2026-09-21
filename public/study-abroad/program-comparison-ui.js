(()=>{
  const PI=window.PROGRAM_INSIGHTS;
  const data=window.UNIVERSITY_FINDER_DATA||[];
  if(!PI)return;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const insight=(name,major)=>{const school=data.find(x=>x.name===name);return school&&major&&school.majors?.includes(major)?PI.get(school,major):null;};

  function enhanceFinder(){
    const major=document.getElementById('uni-major')?.value||'';
    document.querySelectorAll('#uni-results .uni-card').forEach(card=>{
      if(card.querySelector('.program-comparison-extra'))return;
      if(!major)return;
      const name=card.querySelector('h3')?.textContent?.trim(), pi=insight(name,major);
      if(!pi)return;
      const block=document.createElement('div');
      block.className='program-comparison-extra';
      block.innerHTML=`<h5>${esc(name)} × ${esc(major)}｜比較特色</h5><p><b>研究／實務取向：</b>${esc(pi.orientation)}</p><p><b>課程比較重點：</b>${esc(pi.learning)}</p><p><b>可能發展：</b>${esc(pi.careers)}</p><p><b>同類學校怎麼比：</b>${esc(pi.compare)}</p><p class="comparison-evidence"><b>證據狀態：</b>${esc(pi.evidence)} <a href="${esc(pi.sourceUrl)}" target="_blank" rel="noopener">官方來源 →</a></p>`;
      (card.querySelector('.program-box')||card.querySelector('.uni-tags'))?.insertAdjacentElement('afterend',block);
    });
  }

  function enhanceDetail(){
    const root=document.getElementById('detail-root');
    if(!root||root.querySelector('.program-comparison-detail'))return;
    const params=new URLSearchParams(location.search), name=params.get('school')||'', requested=params.get('major')||'';
    const school=data.find(x=>x.name===name), major=school?.majors?.includes(requested)?requested:school?.majors?.[0];
    const pi=school&&major?PI.get(school,major):null, grid=root.querySelector('.detail-grid');
    if(!pi||!grid)return;
    const card=document.createElement('article');
    card.className='detail-card program-comparison-detail';
    card.innerHTML=`<h2>${esc(major)}｜完整比較特色</h2><p><strong>課程／訓練重點：</strong>${esc(pi.learning)}</p><p><strong>研究或實務取向：</strong>${esc(pi.orientation)}</p><p><strong>可能職涯與升學：</strong>${esc(pi.careers)}</p><p><strong>同國同科系比較：</strong>${esc(pi.compare)}</p><p><strong>資料判讀：</strong>${esc(pi.evidence)}</p><p><a href="${esc(pi.sourceUrl)}" target="_blank" rel="noopener">核對學校官方來源 →</a></p>`;
    grid.prepend(card);
  }

  const style=document.createElement('style');
  style.textContent='.program-comparison-extra{background:#f4f7fb;border:1px solid #cbd9e6;border-left:4px solid #355b7d;border-radius:13px;padding:13px 14px;margin:12px 0}.program-comparison-extra h5{font-size:15px;color:#10243d;margin:0 0 8px}.program-comparison-extra p{font-size:12px!important;margin:5px 0!important;line-height:1.6}.program-comparison-extra .comparison-evidence{border-top:1px solid #d7e1ea;padding-top:8px;margin-top:8px!important;color:#526578}.program-comparison-extra a,.program-comparison-detail a{font-weight:800;text-decoration:underline}.program-comparison-detail{border-left:5px solid #355b7d!important}';
  document.head.appendChild(style);
  const target=document.getElementById('uni-results');
  if(target)new MutationObserver(enhanceFinder).observe(target,{childList:true});
  enhanceFinder(); enhanceDetail();
})();
