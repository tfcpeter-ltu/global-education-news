import fs from 'node:fs';
const p='src/data/i18n/en-overrides.json',o=JSON.parse(fs.readFileSync(p));
Object.assign(o,{'128 筆':'128 records','281+ 全球獎學金資料庫':'281+ scholarship records worldwide','AI評分更一致就更公平嗎？':'Does more consistent AI scoring mean greater fairness?','發布：2026年11月15日':'Published: 15 November 2026','TOP STORY · 教育科技':'TOP STORY · Education technology','2026年11月15日 08:24':'15 November 2026, 08:24','資格查核紀錄：2026-11-15':'Eligibility verification: 2026-11-15','國際學生政策 · 2026/11/15':'International student policy · 2026/11/15','國際教育產業 · 2026/11/15':'International education industry · 2026/11/15','國際獎學金雷達｜281+ 全球獎學金資料庫':'Scholarship Radar | 281+ scholarship records worldwide','官方來源：Hokkaido University':'Official source: Hokkaido University','281+ 全球獎學金資料庫｜每日查核，最多新增 3 則':'281+ scholarship records worldwide | Daily verification, up to 3 additions','2026年11月15日 · Curated & Verified':'15 November 2026 · Curated & Verified','官方來源：Cambridge / Taiwan Ministry of Education':'Official source: Cambridge / Taiwan Ministry of Education','國際評量討論要求保留人的判斷與責任｜環球教育新聞網 Global Education News':'Assessment experts insist on human judgement and responsibility | Global Education News'});
for(const s of JSON.parse(fs.readFileSync('.bilingual/strings.json'))) {
 if(o[s])continue;
 const suffix=s.includes('｜國際獎學金雷達')?'｜國際獎學金雷達':'｜環球教育新聞網 Global Education News';
 const base=s.split(suffix)[0];
 if(o[base])o[s]=o[base]+(suffix.includes('獎學金')?' | Scholarship Radar':' | Global Education News');
 else throw new Error('Untranslated: '+s);
}
for(const k of Object.keys(o))if(k.startsWith('教育部｜'))o[k]=o[k].replace('教育部','Taiwan Ministry of Education');else if(k.startsWith('英國國會｜'))o[k]=o[k].replace('英國國會','UK Parliament');
fs.writeFileSync(p,JSON.stringify(o,null,2)+'\n');
const reportPath='docs/daily-reports/2026-11-15.json',r=JSON.parse(fs.readFileSync(reportPath));
r.ltuMediaReview={checkedAt:new Date().toISOString(),selectedIndices:[3,4,5],sourceUrls:['https://www.businesstoday.com.tw/article/category/183035/post/202508150011/','https://www.ctee.com.tw/news/20260401701821-431204','https://www.ctee.com.tw/news/20250723702079-431204'],note:'Original articles read; CTEE through native browser. Historical dates retained. Business Today is explicitly integrated marketing content, not independent corroboration.'};
r.campusLeads=[{school:'國立中山大學',url:'https://oia.nsysu.edu.tw/p/405-1308-384608,c20621.php?Lang=zh-tw',note:'2027/28交換（非中國日本）11月17日17:00截止；11月20日是補件，不是新申請延期。'},{school:'國立中興大學',url:'https://oia.nchu.edu.tw/index.php/zh/1-2-news-tw/1-2-3-for-local-tw/4569-%E3%80%90oia%E3%80%91116-1_exchange_program_information_session',note:'9月16日說明會及9月9日報名已過；不當成目前開放宣傳。'},{school:'國立清華大學',url:'https://dls.site.nthu.edu.tw/p/406-1473-313995,r7379.php?Lang=zh-tw',note:'系內截止10月8日已過；不以2027學年度標題冒充當日開放。'}];
r.researchExclusions.push({topic:'Exeter Excellence PGT 2027',reason:'Official time II:59 GMT conflicts with external 11:59 p.m. interpretation. Held unpublished; replaced with Hokkaido ISP 2027, not counted.'});
r.currentPhase='BUILD';r.updatedAt=new Date().toISOString();fs.writeFileSync(reportPath,JSON.stringify(r,null,2)+'\n');
console.log('English fragments and research decisions saved.');
