(()=>{
  const FREE_LIMIT=110;
  const full=[...(window.UNIVERSITY_FINDER_DATA||[])];
  const SESSION_KEY='studyNavigatorMemberSession';
  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}};
  const tokenExpiry=token=>{try{return JSON.parse(atob(token.split('.')[1].replaceAll('-','+').replaceAll('_','/'))).exp||0}catch{return 0}};
  const hasValidSession=()=>{const session=readSession();if(!session?.access_token)return false;const expires=session.expires_at||tokenExpiry(session.access_token);return !expires||Number(expires)>Date.now()/1000+30};
  const member=hasValidSession();
  const countryOrder=['uk','canada','us','australia','europe','japan','singapore','hong-kong','south-korea','china'];
  const core=full.filter(school=>!school.catalogOnly);
  const publicSchools=core.slice(0,FREE_LIMIT);
  const selected=new Set(publicSchools.map(school=>school.name));
  const queues=Object.fromEntries(countryOrder.map(country=>[country,full.filter(school=>school.country===country&&!selected.has(school.name))]));
  while(publicSchools.length<FREE_LIMIT){
    let added=false;
    for(const country of countryOrder){
      const school=queues[country]?.shift();
      if(!school)continue;
      publicSchools.push(school);selected.add(school.name);added=true;
      if(publicSchools.length===FREE_LIMIT)break;
    }
    if(!added)break;
  }
  const allowed=new Set((member?full:publicSchools).map(school=>school.name));
  window.UNIVERSITY_FINDER_DATA=member?full:publicSchools;
  window.STUDY_ACCESS={member,total:full.length,freeLimit:FREE_LIMIT,locked:Math.max(0,full.length-FREE_LIMIT),canUseSchool:name=>member||allowed.has(name)};

  const style=document.createElement('style');
  style.textContent='.access-tier-banner{max-width:1380px;margin:0 auto 22px;padding:15px 18px;border:1px solid #d8c28f;border-radius:14px;background:#fff8e8;color:#17324d;line-height:1.65}.access-tier-banner.member{border-color:#b8d6c3;background:#edf7f0}.access-tier-banner strong{font-weight:850}.access-tier-banner a{display:inline-block;margin-left:7px;color:#17324d;font-weight:850;text-decoration:underline;text-underline-offset:3px}.member-lock-card{max-width:780px;margin:30px auto;padding:34px;border:1px solid #d8c28f;border-radius:20px;background:#fff8e8;text-align:center}.member-lock-card h2{color:#17324d}.member-lock-card a{display:inline-block;margin-top:10px;padding:11px 16px;border-radius:8px;background:#17324d;color:#fff;font-weight:850}';
  document.head.appendChild(style);
  const main=document.querySelector('main');
  if(main){
    const banner=document.createElement('aside');
    banner.className='access-tier-banner'+(member?' member':'');
    banner.setAttribute('aria-label','大學資料庫使用權限');
    banner.innerHTML=member
      ?`<strong>會員完整資料庫已開啟：</strong>可搜尋全部 ${full.length} 間大學，選校、比較與查詢條件會同步到雲端並長期保留。<a href="/study-abroad/member.html">管理會員資料 →</a>`
      :`<strong>免費版開放 ${FREE_LIMIT} 間大學。</strong>註冊後可再解鎖 ${Math.max(0,full.length-FREE_LIMIT)} 間，搜尋完整 ${full.length} 間大學，並雲端保存查詢與規劃結果。<a href="/study-abroad/member.html">免費註冊 →</a>`;
    const intro=main.querySelector('.page-intro');
    (intro||main).insertAdjacentElement(intro?'afterend':'afterbegin',banner);
  }

  const requested=new URLSearchParams(location.search).get('school');
  if(requested&&!member&&!allowed.has(requested)){
    document.addEventListener('DOMContentLoaded',()=>{
      const root=document.getElementById('detail-root');
      if(root)root.innerHTML=`<section class="member-lock-card"><span class="overline">Member University Access</span><h2>這間大學收錄於完整會員資料庫</h2><p>未註冊可搜尋 ${FREE_LIMIT} 間大學；免費註冊後可查看全部 ${full.length} 間，並把查詢、選校與比較結果長期保存在雲端。</p><a href="/study-abroad/member.html">免費註冊，解鎖完整資料庫 →</a></section>`;
    });
  }
})();
