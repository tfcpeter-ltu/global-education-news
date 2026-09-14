const data=window.STUDY_NAV_DATA;
const verifiedOverrides={
  'canada-019':'articles/bc-university-application.html',
  'canada-021':'articles/canada-coop.html',
  'canada-022':'articles/canada-college-university-transfer.html',
  'uk-005':'articles/uk-medicine-dentistry.html',
  'uk-006':'articles/uk-art-design-portfolio.html',
  'us-013':'articles/us-essay-recommendations.html',
  'us-014':'articles/us-essay-recommendations.html',
  'europe-034':'articles/netherlands-application.html',
  'europe-035':'articles/germany-application.html',
  'japan-043':'articles/japan-eju.html',
  'hong-kong-061':'articles/hong-kong-medicine.html',
  'singapore-054':'articles/singapore-business-computing.html',
  'global-071':'articles/communication-comparison.html',
  'global-073':'articles/music-comparison.html',
  'global-075':'articles/architecture-comparison.html',
  'us-011':'article.html?slug=us-011',
  'us-012':'article.html?slug=us-012',
  'canada-023':'article.html?slug=canada-023',
  'europe-036':'article.html?slug=europe-036',
  'europe-037':'article.html?slug=europe-037',
  'japan-044':'article.html?slug=japan-044',
  'hong-kong-063':'article.html?slug=hong-kong-063',
  'singapore-055':'article.html?slug=singapore-055',
  'global-067':'article.html?slug=global-067',
  'global-066':'article.html?slug=global-066',
  'global-065':'article.html?slug=global-065'
};
data.articles.forEach(a=>{if(verifiedOverrides[a.slug]){a.status='已完成官方查核';a.url=verifiedOverrides[a.slug];}});
const extraVerified=[
 {slug:'us-essay-recommendations',country:'us',major:'General',title:'美國 Essay 與推薦信 DIY 指南',kind:'指南',stage:'準備文件',status:'已完成官方查核',url:'articles/us-essay-recommendations.html'},
 {slug:'canada-college-transfer',country:'canada',major:'General',title:'加拿大 College → University Transfer 指南',kind:'指南',stage:'研究選校',status:'已完成官方查核',url:'articles/canada-college-university-transfer.html'},
 {slug:'europe-netherlands',country:'europe',major:'General',title:'荷蘭大學 Studielink DIY 申請',kind:'指南',stage:'填申請系統',status:'已完成官方查核',url:'articles/netherlands-application.html'},
 {slug:'europe-germany',country:'europe',major:'General',title:'德國大學 uni-assist / Studienkolleg DIY 指南',kind:'指南',stage:'填申請系統',status:'已完成官方查核',url:'articles/germany-application.html'},
 {slug:'uk-art-portfolio',country:'uk',major:'Creative Arts',title:'英國 Art / Design Portfolio DIY 指南',kind:'指南',stage:'準備文件',status:'已完成官方查核',url:'articles/uk-art-design-portfolio.html'},
 {slug:'global-architecture',country:'global',major:'Architecture',title:'Architecture 建築系跨國比較',kind:'跨校比較',stage:'選科系',status:'已完成官方查核',url:'articles/architecture-comparison.html'},
 {slug:'global-communication',country:'global',major:'Communication',title:'Communication 傳播系跨國比較',kind:'跨校比較',stage:'選科系',status:'已完成官方查核',url:'articles/communication-comparison.html'},
 {slug:'global-music',country:'global',major:'Music',title:'Music 音樂系跨國比較',kind:'跨校比較',stage:'選科系',status:'已完成官方查核',url:'articles/music-comparison.html'},
 {slug:'major-ai',country:'global',major:'Artificial Intelligence AI 人工智慧',title:'人工智慧 AI：不要只看科系名稱，要先看 Computing 還是 Math + AI',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/ai-major-guide.html'},
 {slug:'major-data-science',country:'global',major:'Data Science 資料科學',title:'資料科學 Data Science：Statistics + Mathematics + Computing',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/data-science-major-guide.html'},
 {slug:'major-finance',country:'global',major:'Finance 金融',title:'金融 Finance：商學金融與數學型金融怎麼分？',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/finance-major-guide.html'},
 {slug:'major-engineering',country:'global',major:'Engineering 工程',title:'工程 Engineering：先選分支，再倒推數學物理化學 prerequisite',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/engineering-major-guide.html'},
 {slug:'major-pharmacy',country:'global',major:'Pharmacy 藥學',title:'藥學 Pharmacy：藥師養成與 Pharmaceutical Science 不一樣',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/pharmacy-major-guide.html'},
 {slug:'major-nursing',country:'global',major:'Nursing 護理',title:'護理 Nursing：專業註冊型學位怎麼選？',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/nursing-major-guide.html'},
 {slug:'major-public-health',country:'global',major:'Public Health 公共衛生',title:'公共衛生 Public Health：研究一整個社會怎麼更健康',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/public-health-major-guide.html'},
 {slug:'major-law',country:'global',major:'Law 法律',title:'法律 Law：法學學位與律師資格不是同一件事',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/law-major-guide.html'},
 {slug:'major-supply-chain',country:'global',major:'Supply Chain Management 供應鏈管理',title:'供應鏈管理 Supply Chain：從採購到交付的整體系統',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/supply-chain-major-guide.html'},
 {slug:'major-aviation',country:'global',major:'Aviation Management 航空管理',title:'航空管理 Aviation Management：不是飛行員訓練',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/aviation-management-major-guide.html'},
 {slug:'major-education',country:'global',major:'Education 教育',title:'教育 Education：Education Studies 與教師資格怎麼分？',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/education-major-guide.html'},
 {slug:'major-ir',country:'global',major:'International Relations 國際關係',title:'國際關係 International Relations：不是只學外交',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/international-relations-major-guide.html'},
 {slug:'major-sport',country:'global',major:'Sport Management 運動管理',title:'運動管理 Sport Management：讀的是運動產業，不是體育課',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/sport-management-major-guide.html'},
 {slug:'major-hospitality',country:'global',major:'Hospitality Tourism 旅館與觀光',title:'旅館與觀光 Hospitality & Tourism：管理一個全球產業',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/hospitality-tourism-major-guide.html'},
 {slug:'major-film-animation',country:'global',major:'Film Animation 影視與動畫',title:'影視與動畫 Film & Animation：影像敘事、動畫與互動設計怎麼分？',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/film-animation-major-guide.html'},
 {slug:'major-economics',country:'global',major:'Economics 經濟學',title:'經濟學 Economics：用模型與資料研究選擇、市場與政策',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/economics-major-guide.html'},
 {slug:'major-marketing',country:'global',major:'Marketing 行銷',title:'行銷 Marketing：消費者、資料、品牌與策略',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/marketing-major-guide.html'},
 {slug:'major-business-analytics',country:'global',major:'Business Analytics 商業分析',title:'商業分析 Business Analytics：把數據用在商業決策',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/business-analytics-major-guide.html'},
 {slug:'major-biomedical-engineering',country:'global',major:'Biomedical Engineering 生醫工程',title:'生醫工程 Biomedical Engineering：用工程解決醫療問題',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/biomedical-engineering-major-guide.html'},
 {slug:'major-physio-ot',country:'global',major:'Physiotherapy Occupational Therapy 物理治療 職能治療',title:'物理治療 vs 職能治療：復健專業怎麼分？',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/physiotherapy-occupational-therapy-guide.html'},
 {slug:'major-biotechnology',country:'global',major:'Biotechnology 生物科技',title:'生物科技 Biotechnology：把 biology 變成可以應用與商業化的技術',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/biotechnology-major-guide.html'},
 {slug:'major-ppe',country:'global',major:'PPE Philosophy Politics Economics 哲學 政治 經濟',title:'PPE 哲學政治經濟：用三種方法看公共問題',kind:'科系指南',stage:'選科系',status:'已完成官方查核',url:'articles/ppe-major-guide.html'}
];
extraVerified.forEach(x=>{if(!data.articles.some(a=>a.slug===x.slug))data.articles.push(x);});
const q=document.querySelector('#q'),country=document.querySelector('#country'),kind=document.querySelector('#kind'),results=document.querySelector('#results'),count=document.querySelector('#count');
const params=new URLSearchParams(location.search);q.value=params.get('q')||'';country.value=params.get('country')||'';
const names={uk:'英國',us:'美國',canada:'加拿大',australia:'澳洲',europe:'歐洲',japan:'日本',singapore:'新加坡','hong-kong':'香港',global:'跨國比較'};
function render(){const term=q.value.trim().toLowerCase();const rows=data.articles.filter(a=>(!country.value||a.country===country.value)&&(!kind.value||a.kind===kind.value)&&(!term||[a.title,a.major,a.kind,a.stage,names[a.country]||''].join(' ').toLowerCase().includes(term)));count.textContent=`找到 ${rows.length} 個主題`;results.innerHTML=rows.map(a=>`<article class="result-card"><div><span class="tag">${names[a.country]||a.country} · ${a.kind}</span><h2>${a.title}</h2><p>${a.major} · ${a.stage}</p></div><div class="status-row"><span>${a.status}</span><a href="${a.url||`article.html?slug=${encodeURIComponent(a.slug)}`}">查看完整文章 →</a></div></article>`).join('')||'<div class="empty-state"><h2>目前沒有符合的主題</h2><p>可以減少篩選條件，或之後再查看新匯入內容。</p></div>';}
[q,country,kind].forEach(el=>el.addEventListener('input',render));render();
