(()=>{
  const ids=['subject','level','country','institution','budget','mode','duration','ielts','scholarship','internship'];
  const get=id=>document.getElementById('course-'+id);
  const form=document.getElementById('course-form');
  const output=document.getElementById('course-output');
  const summary=document.getElementById('criteria-summary');
  const navigatorLink=document.getElementById('navigator-search');
  const idp=document.getElementById('idp-search');
  const coverage=document.getElementById('idp-coverage');
  const labels={subject:'科目',level:'學位',country:'國家',institution:'院校',budget:'預算',mode:'授課',duration:'長度',ielts:'IELTS'};
  const countryLabels={uk:'英國',canada:'加拿大',australia:'澳洲',ireland:'愛爾蘭',us:'美國',europe:'歐洲其他地區',japan:'日本',singapore:'新加坡','hong-kong':'香港'};
  const idpCountries=new Set(['uk','canada','australia','ireland']);

  const read=()=>Object.fromEntries(ids.map(id=>[id,get(id).type==='checkbox'?get(id).checked:get(id).value.trim()]));
  const save=data=>localStorage.setItem('studyNavigatorCourseCriteria',JSON.stringify(data));
  const load=()=>{try{return JSON.parse(localStorage.getItem('studyNavigatorCourseCriteria')||'{}')}catch{return {}}};
  const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const majorMap={
    'computer science':'Computer Science','computing':'Computer Science','資訊':'Computer Science','電腦':'Computer Science',
    'business':'Business','商學':'Business','管理':'Business','finance':'Finance','金融':'Finance',
    'engineering':'Engineering','工程':'Engineering','psychology':'Psychology','心理':'Psychology',
    'medicine':'Medicine','醫學':'Medicine','dentistry':'Dentistry','牙醫':'Dentistry',
    'art':'Art & Design','design':'Art & Design','設計':'Art & Design','architecture':'Architecture','建築':'Architecture',
    'music':'Music Performance','音樂':'Music Performance','data science':'Data Science','資料科學':'Data Science','ai':'AI','人工智慧':'AI'
  };
  const inferMajor=value=>{const text=value.toLowerCase();return Object.entries(majorMap).find(([key])=>text.includes(key))?.[1]||value};
  const render=(data,shouldScroll=true)=>{
    const chips=[];
    ['subject','level','country','institution','budget','mode','duration','ielts'].forEach(key=>{
      if(!data[key])return;
      const value=key==='country'?(countryLabels[data[key]]||data[key]):data[key];
      chips.push(`<span><strong>${labels[key]}：</strong>${escapeHtml(value)}</span>`);
    });
    if(data.scholarship)chips.push('<span><strong>偏好：</strong>獎學金</span>');
    if(data.internship)chips.push('<span><strong>偏好：</strong>實習／Co-op／placement</span>');
    if(!chips.length)chips.push('<span>尚未設定條件，可先從國家或科目開始。</span>');
    summary.innerHTML=chips.join('');
    const params=new URLSearchParams();
    if(data.country&&data.country!=='ireland')params.set('country',data.country);
    if(data.subject)params.set('major',inferMajor(data.subject));
    if(data.institution)params.set('q',data.institution);
    navigatorLink.href='universities.html'+(params.toString()?`?${params}`:'');
    const supported=!data.country||idpCountries.has(data.country);
    idp.hidden=!supported;
    coverage.textContent=supported
      ?'IDP 公開搜尋目前可協助補充英國、加拿大、澳洲與愛爾蘭的課程探索；其他目的地請直接使用本導航與各校官方課程搜尋。'
      :'這個目的地不在目前觀察到的 IDP 國家篩選中，請使用導航內的大學清單並回到各校官方課程頁核對。';
    output.hidden=false;
    if(shouldScroll)output.scrollIntoView({behavior:'smooth',block:'start'});
  };

  const saved=load();
  ids.forEach(id=>{if(saved[id]===undefined)return;if(get(id).type==='checkbox')get(id).checked=Boolean(saved[id]);else get(id).value=saved[id]});
  if(Object.values(saved).some(Boolean))render(saved,false);

  form.addEventListener('submit',event=>{event.preventDefault();const data=read();save(data);render(data)});
  document.getElementById('course-reset').addEventListener('click',()=>{form.reset();localStorage.removeItem('studyNavigatorCourseCriteria');output.hidden=true});
  document.getElementById('copy-criteria').addEventListener('click',async event=>{
    const text=[...summary.querySelectorAll('span')].map(node=>node.textContent.trim()).join('｜');
    try{await window.navigator.clipboard.writeText(text);event.currentTarget.textContent='已複製'}catch{event.currentTarget.textContent='請手動選取條件'}
  });
})();
