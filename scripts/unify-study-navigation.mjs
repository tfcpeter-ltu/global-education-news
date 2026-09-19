import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2] || 'dist/study-abroad');
export const mainLinks=[['student-start.html','開始規劃'],['plan.html','我的規劃'],['course-search.html','找課程'],['universities.html','找大學'],['shortlist.html','我的選校'],['major-decision.html','科系決策'],['apply.html','怎麼申請']];
export const moreLinks=[['compare.html','大學比較'],['dashboard.html','規劃總覽'],['eligibility.html','資格核對'],['documents.html','文件清單'],['timeline.html','申請時間表'],['application-systems.html','申請系統'],['webinars.html','說明會'],['peter-library.html','Peter 的國際教育講座']];
let count=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()){walk(file);continue;}if(!file.endsWith('.html'))continue;let html=fs.readFileSync(file,'utf8');
const page=path.relative(root,file).replaceAll('\\','/');
const link=([url,label])=>'<a href="/study-abroad/'+url+'"'+(page===url?' aria-current="page"':'')+'>'+label+'</a>';
const header='<header class="topbar study-nav"><a class="brand" href="/study-abroad/index.html"><img class="ltu-logo" src="/study-abroad/ltu-logo.png" width="56" height="56" alt="LTU 國際學術中心"><span><strong>留學 DIY 導航</strong><small>Study Abroad Navigator</small></span></a><nav class="study-main-nav" aria-label="留學 DIY 主導覽">'+mainLinks.map(link).join('')+'<details class="study-more"><summary>更多工具</summary><div>'+moreLinks.map(link).join('')+'</div></details></nav></header>';
html=/<header\b[^>]*class="topbar(?: study-nav)?"/.test(html)?html.replace(/<header\b[^>]*class="topbar(?: study-nav)?"[^>]*>[\s\S]*?<\/header>/,header):html.replace(/<body([^>]*)>/,'<body$1>'+header);
if(page==='index.html'&&!html.includes('course-search-entry')){
  const entry='<section class="mvp-section course-search-entry"><div class="decision-note"><span class="overline">Course Search Planner</span><h2>像國際課程資料庫一樣，先用條件找課程。</h2><p>依科目、學位層級、國家、院校、預算、授課方式、課程長度、IELTS、獎學金與實習建立搜尋條件，再回到各校官方頁核對。</p><div class="mvp-hero-actions"><a class="main" style="background:var(--mvp-blue);color:#fff" href="/study-abroad/course-search.html">開啟海外課程搜尋規劃器</a><a class="secondary" style="border-color:var(--mvp-line);color:var(--mvp-blue)" href="/study-abroad/universities.html">查看導航內的大學</a></div></div></section>';
  html=html.replace('</main>',entry+'</main>');
}
if(page==='universities.html'&&!html.includes('course-search-jump')){
  const jump='<aside class="course-search-jump" style="margin:0 0 18px;background:#0b2942;color:#fff;border-left:5px solid #c39752;padding:18px 20px;border-radius:8px"><strong style="font-family:Georgia,serif;font-size:20px">想用學位、預算、長度或 IELTS 找課程？</strong><p style="margin:6px 0 12px;color:#d8e1e7">先建立完整課程條件，再回來篩選大學，避免只靠校名或排名決定。</p><a href="/study-abroad/course-search.html" style="display:inline-block;background:#fff;color:#071d34;padding:9px 13px;border-radius:5px;font-weight:800">開啟課程搜尋規劃器 →</a></aside>';
  html=html.replace('<div class="finder-box">',jump+'<div class="finder-box">');
}
if(!html.includes('navigation.css'))html=html.replace('</head>','<link rel="stylesheet" href="/study-abroad/navigation.css?v=20260916"></head>');
fs.writeFileSync(file,html);count++;}}
walk(root);
if(!count)throw new Error('No study navigation headers found');
console.log('Unified study navigation: '+count+' pages');
