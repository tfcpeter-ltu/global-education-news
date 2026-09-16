(() => {
  'use strict';
  const data=window.UNIVERSITY_FINDER_DATA||[], DS=window.STUDENT_DECISION_SUPPORT, PI=window.PROGRAM_INSIGHTS, OS=window.OFFICIAL_PROGRAM_SOURCES;
  const root=document.getElementById('compare-root'), clear=document.getElementById('clear-compare'), majorBox=document.getElementById('compare-major');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key)||'null');return Array.isArray(fallback)?(Array.isArray(v)?v:fallback):(v&&typeof v==='object'&&!Array.isArray(v)?v:fallback);}catch{return fallback;}};
  const names=[...new Set(read('studyNavigatorCompare',[]).filter(n=>typeof n==='string'))].slice(0,4);
  const rows=names.map(n=>data.find(x=>x.name===n)).filter(Boolean);
  const allMajors=[...new Set(data.flatMap(x=>x.majors||[]))].sort();
  const requested=localStorage.getItem('studyNavigatorCompareMajor')||'';
  const major=allMajors.includes(requested)?requested:'';
  const label=m=>window.STUDY_MAJOR_LABELS?.[m]?window.STUDY_MAJOR_LABELS[m]+' · '+m:m;
  const findLink=m=>'universities.html?major='+encodeURIComponent(m)+'&country=&goal=';
  if(!rows.length){root.innerHTML='<div class="empty"><h2>還沒有加入學校</h2><p>在選校器選擇科系，再加入 2–4 間大學比較。</p><a href="universities.html">去找大學 →</a></div>';if(clear){clear.disabled=true;clear.textContent='沒有可清空的學校';}return;}
  const info=rows.map(x=>{
    const listed=!!major&&x.majors?.includes(major), src=major?OS?.get(x.name,major):null;
    return {x,listed,src,d:listed?DS?.describe(x,major,{}):null,pi:listed?PI?.get(x,major):null,availability:window.STUDY_PROGRAM_AVAILABILITY?.[x.name+'|'+major]};
  });
  const matching=info.filter(o=>o.listed).length;
  if(majorBox){majorBox.style.display='block';majorBox.innerHTML=major?'<strong>目前比較科系：'+esc(label(major))+'</strong><p>已選 '+rows.length+' 間，其中 '+matching+' 間在本站列有此方向。切換科系會保留原選校，請檢查每校的課程狀態。</p>':'<strong>請先選擇比較科系</strong><p>選定後才顯示該科系資料，避免混用各校不同科系。</p>';}
  const missing=o=>!major?'請先選擇科系。':o.availability?esc(o.availability.status)+'；請改看其他建築學程。':'本站尚未收錄此校的 '+esc(label(major))+' 課程，不能據此判定學校沒有開設。';
  const sourceLink=o=>'<a href="'+esc(o.src?.programUrl||o.availability?.url||o.x.url)+'" target="_blank" rel="noopener">查看'+(o.src?'官方課程':o.availability?'官方課程清單':'學校官方網站')+' →</a>';
  const pending=(o,field)=>!o.listed?missing(o):o.src?.evidence?.[field]?esc(o.src.evidence[field]):field==='curriculum'&&o.src?esc(o.src.program)+'<br>'+((o.src.highlights||[]).map(esc).join('<br>')||'已確認課程來源；詳細內容請至官方頁閱讀。'):({curriculum:'此校系已列入研究清單，課程內容尚待逐項核對。',experience:'請確認是否提供實習、工作年或專題，以及參加資格。',requirements:'請依高中學制核對成績、先修科目、英文及國際生資格。',documents:'請至官方課程／招生頁核對文件、作品集、測驗與截止日。',limitation:'尚未取得完整逐課程證據；下方通用建議不是官方入學要求。'}[field]||'請開啟官方課程來源繼續確認。');
  const tr=(title,render)=>'<tr><th scope="row">'+title+'</th>'+info.map(o=>'<td>'+render(o)+'</td>').join('')+'</tr>';
  const options=allMajors.map(m=>'<option value="'+esc(m)+'" '+(m===major?'selected':'')+'>'+esc(label(m))+'（已選 '+rows.filter(x=>x.majors?.includes(m)).length+'/'+rows.length+' 間）</option>').join('');
  root.innerHTML='<div class="docs-note"><label for="comparison-subject">比較科系</label><select id="comparison-subject"><option value="">請選擇比較科系</option>'+options+'</select><p>已選 '+rows.length+' 間；請比較相同學位層級及申請年度。</p>'+
    (major?'<p><a href="'+findLink(major)+'">查看其他 '+esc(label(major))+' 大學 →</a></p>':'')+
    (major&&matching<rows.length?'<p class="v-pending">'+(rows.length-matching)+' 間尚無可比較的本科系紀錄。可保留這些學校供其他科系使用，或加入有此方向的學校。</p>':'')+
    '<p>查核來源與通用研究建議分開列示；不以 QS 排名推算就業率。</p></div><div class="compare-wrap" tabindex="0" role="region" aria-label="大學比較表，可左右捲動"><table class="compare-table"><thead><tr><th>比較項目</th>'+
    info.map(({x})=>'<th scope="col"><div class="compare-school">'+esc(x.name)+'</div><small>'+esc(x.countryLabel)+' · '+esc(x.city)+'</small><br><button type="button" class="remove-school" data-name="'+esc(x.name)+'">移除 '+esc(x.name)+'</button></th>').join('')+
    '</tr></thead><tbody>'+
    tr('科系與學位',o=>o.src?'<strong>'+esc(o.src.program)+'</strong>':o.listed?'資料庫列有此方向；正式學位名稱待查。':missing(o))+
    tr('官方查核狀態',o=>(o.src?'<span class="v-ok">'+esc(o.src.status)+'</span><br><small>'+esc(o.src.checked)+'</small>':o.availability?'<span class="v-pending">'+esc(o.availability.status)+'</span><br><small>'+esc(o.availability.checked)+'</small>':'<span class="v-pending">'+(major?'待逐課程查核':'尚未選擇科系')+'</span>')+'<br>'+sourceLink(o))+
    tr('課程內容／已核對重點',o=>pending(o,'curriculum'))+
    tr('實作／研究安排',o=>pending(o,'experience'))+
    tr('入學要求',o=>pending(o,'requirements'))+
    tr('文件與作品要求',o=>pending(o,'documents'))+
    tr('適合學生（本站判讀）',o=>!o.listed?missing(o):esc(o.src?.evidence?.interpretation||o.pi?.best||'將個人目標與官方課程內容對照。'))+
    tr('限制與待確認事項',o=>pending(o,'limitation'))+
    tr('查核來源',o=>o.src?(o.src.evidence?.sources||[o.src.programUrl]).map((u,i)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener">官方／課程依據 '+(i+1)+'</a>').join('<br>'):sourceLink(o))+
    tr('科系研究方向（通用建議）',o=>o.listed?esc(o.pi?.focus||'比較課程結構與專業方向。'):missing(o))+
    tr('學校已收錄科系',({x})=>(x.majors||[]).map(esc).join('、'))+
    tr('研究／就業判讀',o=>o.d?esc(o.d.prestige)+'；'+esc(o.d.local)+'<br><small>研究提示，非雇主調查或錄取率。</small>':missing(o))+
    tr('下一步',o=>o.listed?'<a href="university-detail.html?school='+encodeURIComponent(o.x.name)+'&major='+encodeURIComponent(major)+'">完整分析</a><br><a href="documents.html?country='+encodeURIComponent(o.x.country)+'&major='+encodeURIComponent(major)+'&school='+encodeURIComponent(o.x.name)+'">文件清單</a><br>'+sourceLink(o):'<a href="'+findLink(major)+'">找有此方向的大學 →</a><br>'+sourceLink(o))+
    '</tbody></table></div>';
  document.getElementById('comparison-subject')?.addEventListener('change',e=>{
    localStorage.setItem('studyNavigatorCompareMajor',e.target.value);
    const meta=read('studyNavigatorShortMeta',{});
    for(const x of rows)if(x.majors?.includes(e.target.value))meta[x.name]={...(meta[x.name]||{}),major:e.target.value};
    localStorage.setItem('studyNavigatorShortMeta',JSON.stringify(meta));location.reload();
  });
  document.querySelectorAll('.remove-school').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('studyNavigatorCompare',JSON.stringify(names.filter(n=>n!==b.dataset.name)));location.reload();}));
  clear?.addEventListener('click',()=>{localStorage.removeItem('studyNavigatorCompare');localStorage.removeItem('studyNavigatorCompareMajor');location.reload();});
})();
