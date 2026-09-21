(()=>{
  const fieldIds=['subject','level','country','institution','internship'];
  const get=id=>document.getElementById(`course-${id}`);
  const form=document.getElementById('course-form');
  const output=document.getElementById('course-output');
  const summary=document.getElementById('criteria-summary');
  const count=document.getElementById('course-count');
  const results=document.getElementById('course-results');
  const navigatorLink=document.getElementById('navigator-search');
  const labels={subject:'關鍵字',level:'學位',country:'國家',institution:'院校',qsBand:'QS 2027 名次',qsArea:'QS 2026 學術領域'};
  const countryLabels={uk:'英國',canada:'加拿大',australia:'澳洲',ireland:'愛爾蘭',us:'美國',europe:'歐洲其他地區',japan:'日本',singapore:'新加坡','hong-kong':'香港'};
  const levelLabels={undergraduate:'大學學士',postgraduate:'研究所',doctorate:'博士',foundation:'預科／銜接課程',other:'其他／未標示'};
  const legacyLevels={'高中／School':'other','大學預科／Foundation':'foundation','大學學士／Undergraduate':'undergraduate','研究所／Postgraduate':'postgraduate','博士／Doctorate':'doctorate','技職／VET':'other','語言課程／English':'other'};
  const schoolAliases={'University College London':'University College London (UCL)'};
  const qs=window.QS_RANKING_DATA;
  const fields=document.querySelector('.course-fields');
  if(fields&&qs){
    fields.insertAdjacentHTML('beforeend',`<label class="field"><span>QS 世界大學排名 2027</span><select id="course-qsBand"><option value="">全部名次</option><option value="1-50">前 50</option><option value="51-100">第 51–100</option><option value="101-200">第 101–200</option><option value="201-500">第 201–500</option></select></label><label class="field"><span>QS 學術領域 2026</span><select id="course-qsArea"><option value="">全部領域</option>${qs.areas.map(area=>`<option value="${area}">${area}</option>`).join('')}</select></label>`);
    fieldIds.push('qsBand','qsArea');
    const note=document.createElement('p');
    note.className='qs-course-note';
    note.textContent='整體名次使用 QS 2027；學術領域使用目前最新的 QS 2026。只有已完成來源核對的學校會出現在排名篩選結果。';
    fields.after(note);
  }
  const schoolData=new Map((window.UNIVERSITY_FINDER_DATA||[]).map(item=>[item.name,item]));
  const allRecords=Object.entries(window.OFFICIAL_PROGRAM_SOURCES?.all||{}).map(([key,source])=>{
    const split=key.indexOf('|');
    const school=key.slice(0,split);
    const major=key.slice(split+1);
    const university=schoolData.get(school)||schoolData.get(schoolAliases[school]);
    const searchable=[school,major,source.program,source.status,...(source.highlights||[]),...Object.values(source.evidence||{})].join(' ').toLowerCase();
    return {key,school,major,source,university,searchable,level:inferLevel(source.program||'')};
  }).sort((a,b)=>(b.source.checked||'').localeCompare(a.source.checked||'')||a.school.localeCompare(b.school));
  let displayLimit=60;
  let currentMatches=[];

  function inferLevel(program){
    const text=program.toLowerCase();
    if(/\b(phd|dphil|doctor of philosophy|doctoral)\b/.test(text))return 'doctorate';
    if(/\b(foundation|pathway|pre-sessional|international year)\b/.test(text))return 'foundation';
    if(/\b(msc|master of|postgraduate|graduate diploma|llm)\b/.test(text))return 'postgraduate';
    if(/\b(bsc|ba|beng|meng|bfa|bba|bcom|bachelor|mbbs|mbchb|undergraduate|direct entry)\b/.test(text))return 'undergraduate';
    return 'other';
  }

  const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const read=()=>Object.fromEntries(fieldIds.map(id=>[id,get(id).type==='checkbox'?get(id).checked:get(id).value.trim()]));
  const save=data=>localStorage.setItem('studyNavigatorCourseCriteria',JSON.stringify(data));
  const load=()=>{try{return JSON.parse(localStorage.getItem('studyNavigatorCourseCriteria')||'{}')}catch{return {}}};
  const hasExperience=record=>/\b(co-op|coop|placement|internship|industrial attachment|work experience|work-integrated)\b|實習|實務經驗|產業經驗/i.test(record.searchable);

  function renderCards(){
    const visible=currentMatches.slice(0,displayLimit);
    results.innerHTML=visible.map(record=>{
      const {school,major,source,university,level}=record;
      const highlights=(source.highlights||[]).slice(0,4);
      const location=university?[university.countryLabel,university.city].filter(Boolean).join('・'):'地區待核對';
      const ossd=window.OSSD_ADMISSIONS.get(record);
      const qsEntry=qs?.get(school)||qs?.get(schoolAliases[school]);
      const qsSubject=qs?.subjectFor(school,major)||qs?.subjectFor(schoolAliases[school],major);
      return `<article class="course-card">
        <div class="course-card-meta"><span>${escapeHtml(location)}</span><span>${escapeHtml(levelLabels[level])}</span></div>
        <p class="course-major">${escapeHtml(major)}</p>
        <h3>${escapeHtml(source.program||major)}</h3>
        <p class="course-school">${escapeHtml(school)}</p>
        ${qsEntry?`<div class="course-qs"><b>QS 世界大學排名 2027：第 ${qsEntry.rank} 名</b>${qsSubject?`<span>${escapeHtml(qsSubject.area)}｜QS 2026 第 ${qsSubject.rank} 名</span>`:'<span>學科資料依 QS 2026 逐項補充</span>'}</div>`:''}
        ${highlights.length?`<ul>${highlights.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>`:''}
        <section class="ossd-box">
          <div class="ossd-title"><strong>OSSD 申請規劃</strong><span>建議均分 ${escapeHtml(ossd.range)}</span></div>
          <p><b>科目準備：</b>${escapeHtml(ossd.subjects)}</p>
          <p><b>資格判讀：</b>${escapeHtml(ossd.destination)}</p>
          <p><b>官方課程要求線索：</b>${escapeHtml(ossd.officialRequirement)}</p>
          <p><b>${escapeHtml(ossd.clue.label)}：</b>${escapeHtml(ossd.clue.text)}</p>
          <small>${escapeHtml(ossd.scope)}</small>
        </section>
        <div class="course-card-foot"><span>${escapeHtml(source.status||'已建立官方來源')}・查核 ${escapeHtml(source.checked||'日期待補')}</span><a href="${escapeHtml(source.programUrl)}" target="_blank" rel="noopener noreferrer">查看大學官方課程頁 ↗</a></div>
      </article>`;
    }).join('')||'<div class="empty-result"><strong>目前沒有符合條件的紀錄</strong><p>可放寬國家或學位層級，或改用英文科目名稱搜尋。</p></div>';
    count.textContent=`找到 ${currentMatches.length} 筆已查核課程${currentMatches.length>visible.length?`，目前顯示前 ${visible.length} 筆`:''}`;
    let more=document.getElementById('course-more');
    if(!more){
      more=document.createElement('button');
      more.id='course-more';
      more.type='button';
      more.className='text-button course-more';
      more.textContent='顯示更多課程';
      more.addEventListener('click',()=>{displayLimit+=60;renderCards()});
      results.after(more);
    }
    more.hidden=currentMatches.length<=visible.length;
  }

  function render(data,shouldScroll=true){
    const chips=[];
    ['subject','level','country','institution','qsBand','qsArea'].forEach(key=>{
      if(!data[key])return;
      const value=key==='country'?(countryLabels[data[key]]||data[key]):key==='level'?(levelLabels[data[key]]||data[key]):data[key];
      chips.push(`<span><strong>${labels[key]}：</strong>${escapeHtml(value)}</span>`);
    });
    if(data.internship)chips.push('<span><strong>偏好：</strong>實習／Co-op／placement</span>');
    if(!chips.length)chips.push(`<span>顯示全部 ${allRecords.length} 筆官方課程紀錄</span>`);
    summary.innerHTML=chips.join('');

    const subject=(data.subject||'').toLowerCase();
    const institution=(data.institution||'').toLowerCase();
    currentMatches=allRecords.filter(record=>(
      (!subject||record.searchable.includes(subject))&&
      (!institution||record.school.toLowerCase().includes(institution))&&
      (!data.country||record.university?.country===data.country)&&
      (!data.level||record.level===data.level)&&
      (!data.internship||hasExperience(record))&&
      (!data.qsBand||(qs?.rankBand(qs?.get(record.school)?.rank||qs?.get(schoolAliases[record.school])?.rank)===data.qsBand))&&
      (!data.qsArea||(qs?.hasArea(record.school,data.qsArea)||qs?.hasArea(schoolAliases[record.school],data.qsArea)))
    ));
    displayLimit=60;
    const params=new URLSearchParams();
    if(data.country&&data.country!=='ireland')params.set('country',data.country);
    if(data.subject)params.set('major',data.subject);
    if(data.institution)params.set('q',data.institution);
    navigatorLink.href=`universities.html${params.size?`?${params}`:''}`;
    renderCards();
    output.hidden=false;
    if(shouldScroll)output.scrollIntoView({behavior:'smooth',block:'start'});
  }

  const saved=load();
  if(saved.level&&legacyLevels[saved.level])saved.level=legacyLevels[saved.level];
  fieldIds.forEach(id=>{if(saved[id]===undefined)return;if(get(id).type==='checkbox')get(id).checked=Boolean(saved[id]);else get(id).value=saved[id]});
  render(saved,false);
  form.addEventListener('submit',event=>{event.preventDefault();const data=read();save(data);render(data)});
  document.getElementById('course-reset').addEventListener('click',()=>{form.reset();localStorage.removeItem('studyNavigatorCourseCriteria');render({},false)});
  document.getElementById('copy-criteria').addEventListener('click',async event=>{
    const text=[...summary.querySelectorAll('span')].map(node=>node.textContent.trim()).join('｜');
    try{await window.navigator.clipboard.writeText(text);event.currentTarget.textContent='已複製'}catch{event.currentTarget.textContent='請手動選取條件'}
  });
  const style=document.createElement('style');
  style.textContent='.qs-course-note{grid-column:1/-1;margin:-2px 0 16px;padding:10px 13px;border-radius:12px;background:#eef4f8;color:#40566a;font-size:13px;line-height:1.6}.course-qs{display:flex;gap:6px;flex-wrap:wrap;margin:9px 0}.course-qs b,.course-qs span{border-radius:999px;padding:5px 9px;font-size:12px}.course-qs b{background:#10243d;color:#fff}.course-qs span{background:#edf3f8;border:1px solid #cfdae4;color:#314b63}';
  document.head.appendChild(style);
})();
