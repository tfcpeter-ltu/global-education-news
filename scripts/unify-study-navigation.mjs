import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2] || 'dist/study-abroad');
export const mainLinks=[['student-start.html','開始規劃'],['plan.html','我的規劃'],['course-search.html','找課程'],['universities.html','找大學'],['shortlist.html','我的選校'],['major-decision.html','科系決策'],['apply.html','怎麼申請']];
export const moreLinks=[['member.html','免費註冊／登入'],['compare.html','大學比較'],['dashboard.html','規劃總覽'],['eligibility.html','資格核對'],['documents.html','文件清單'],['timeline.html','申請時間表'],['application-systems.html','申請系統'],['webinars.html','說明會'],['peter-library.html','Peter 的國際教育講座']];
let count=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()){walk(file);continue;}if(!file.endsWith('.html'))continue;let html=fs.readFileSync(file,'utf8');
const page=path.relative(root,file).replaceAll('\\','/');
const link=([url,label])=>'<a href="/study-abroad/'+url+'"'+(page===url?' aria-current="page"':'')+'>'+label+'</a>';
const header='<header class="topbar study-nav"><a class="brand" href="/study-abroad/index.html"><img class="ltu-logo" src="/study-abroad/ltu-logo.png" width="56" height="56" alt="LTU 國際學術中心"><span><strong>留學 DIY 導航</strong><small>Study Abroad Navigator</small></span></a><nav class="study-main-nav" aria-label="留學 DIY 主導覽">'+mainLinks.map(link).join('')+'<details class="study-more"><summary>更多工具</summary><div>'+moreLinks.map(link).join('')+'</div></details></nav></header>';
html=/<header\b[^>]*class="topbar(?: study-nav)?"/.test(html)?html.replace(/<header\b[^>]*class="topbar(?: study-nav)?"[^>]*>[\s\S]*?<\/header>/,header):html.replace(/<body([^>]*)>/,'<body$1>'+header);
if(page==='index.html'&&!html.includes('course-search-entry')){
  const entry='<section class="mvp-section course-search-entry"><div class="decision-note"><span class="overline">Official Course Finder</span><h2>直接搜尋已查核的海外大學課程。</h2><p>依科目、學位層級、國家與院校篩選本站整理的大學官方課程紀錄，再查看查核日期、重點與第一方來源。</p><div class="mvp-hero-actions"><a class="main" style="background:var(--mvp-blue);color:#fff" href="/study-abroad/course-search.html">搜尋官方課程資料庫</a><a class="secondary" style="border-color:var(--mvp-line);color:var(--mvp-blue)" href="/study-abroad/universities.html">查看導航內的大學</a></div></div></section>';
  html=html.replace('</main>',entry+'</main>');
}
if(page==='index.html'&&!html.includes('membership-comparison')){
  const membership='<section class="mvp-section membership-comparison" aria-labelledby="membership-title"><div class="mvp-heading"><div><span class="overline">Free Account Benefits</span><h2 id="membership-title">先免費使用，再解鎖完整 328 間大學資料庫</h2></div><p>基本規劃工具不用註冊也能使用；建立免費帳號後，可多查 218 間大學，並把查詢結果長期保存在雲端。</p></div><div class="membership-grid"><article class="membership-card"><span class="membership-label">未註冊也能用</span><h3>免費基本功能</h3><strong class="membership-number">110 間大學</strong><ul><li>使用留學規劃、科系探索與申請工具</li><li>查詢 110 間代表性大學</li><li>使用文件清單、申請時間表與基本比較</li><li>資料只保存在目前瀏覽器</li></ul><a class="membership-secondary" href="/study-abroad/universities.html">先開始免費查詢</a></article><article class="membership-card featured"><span class="membership-label">免費註冊後</span><h3>完整會員資料庫</h3><strong class="membership-number">328 間大學</strong><ul><li>額外解鎖 218 間，搜尋完整大學資料</li><li>保留查詢條件、選校與比較結果</li><li>雲端儲存、長期保留並可跨裝置使用</li><li>新聞、文章與講座通知仍由你分開選擇</li></ul><a class="membership-primary" href="/study-abroad/member.html">免費註冊，解鎖完整資料庫</a></article></div><div class="membership-follow"><strong>持續掌握國際教育與升學資訊</strong><a href="/">追蹤環球教育新聞網 →</a><a href="/newsletter/">訂閱國際教育週報 →</a><a href="https://www.facebook.com/profile.php?id=61585164670358" target="_blank" rel="noopener noreferrer">追蹤 Peter 的國際教育講座 →</a></div></section>';
  html=html.replace('</section><section class="mvp-section">','</section>'+membership+'<section class="mvp-section">');
  const membershipCss='<style>.membership-comparison{background:#f7f2e7}.membership-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.membership-card{display:flex;flex-direction:column;border:1px solid var(--mvp-line);border-radius:20px;padding:28px;background:#fff}.membership-card.featured{border:2px solid #b28a43;box-shadow:0 15px 35px rgba(15,39,66,.1)}.membership-label{align-self:flex-start;border-radius:999px;padding:6px 10px;background:#edf3f8;color:var(--mvp-blue);font-size:12px;font-weight:850}.membership-card.featured .membership-label{background:#b28a43;color:#fff}.membership-card h3{margin:14px 0 4px;color:var(--mvp-blue);font-size:26px}.membership-number{font-family:Georgia,serif;color:var(--mvp-blue);font-size:34px}.membership-card ul{flex:1;padding-left:22px;line-height:1.8}.membership-card a{display:block;padding:12px 15px;border-radius:8px;text-align:center;font-weight:850}.membership-primary{background:var(--mvp-blue);color:#fff}.membership-secondary{border:1px solid var(--mvp-line);color:var(--mvp-blue)}.membership-follow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:18px;padding:18px;border-top:1px solid var(--mvp-line)}.membership-follow a{color:var(--mvp-blue);font-weight:800}@media(max-width:720px){.membership-grid{grid-template-columns:1fr}.membership-card{padding:22px}.membership-follow{align-items:flex-start;flex-direction:column}}</style>';
  html=html.replace('</head>',membershipCss+'</head>');
}
if(page==='universities.html'&&!html.includes('course-search-jump')){
  const jump='<aside class="course-search-jump" style="margin:0 0 18px;background:#0b2942;color:#fff;border-left:5px solid #c39752;padding:18px 20px;border-radius:8px"><strong style="font-family:Georgia,serif;font-size:20px">想直接找已查核的課程？</strong><p style="margin:6px 0 12px;color:#d8e1e7">依科目、學位、國家與院校搜尋本站整理的大學官方課程紀錄。</p><a href="/study-abroad/course-search.html" style="display:inline-block;background:#fff;color:#071d34;padding:9px 13px;border-radius:5px;font-weight:800">搜尋官方課程資料庫 →</a></aside>';
  html=html.replace('<div class="finder-box">',jump+'<div class="finder-box">');
}
if(html.includes('university-ranking-expansion-2026.js')&&!html.includes('member-access.js')){
  html=html.replace(/<script src="(?:\.\.\/)?study-cloud-sync\.js"><\/script>/g,'');
  html=html.replace(/(<script src="(?:\.\.\/)?university-ranking-expansion-2026\.js[^>]*><\/script>)/,'$1<script src="/study-abroad/study-cloud-sync.js"></script><script src="/study-abroad/member-access.js"></script>');
}
if(!html.includes('navigation.css'))html=html.replace('</head>','<link rel="stylesheet" href="/study-abroad/navigation.css?v=20260916"></head>');
fs.writeFileSync(file,html);count++;}}
walk(root);
if(!count)throw new Error('No study navigation headers found');
console.log('Unified study navigation: '+count+' pages');
