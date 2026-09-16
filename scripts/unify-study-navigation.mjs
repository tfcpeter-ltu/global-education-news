import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2] || 'dist/study-abroad');
export const mainLinks=[['student-start.html','開始規劃'],['plan.html','我的規劃'],['universities.html','找大學'],['shortlist.html','我的選校'],['major-decision.html','科系決策'],['compare.html','大學比較'],['apply.html','怎麼申請']];
export const moreLinks=[['dashboard.html','規劃總覽'],['eligibility.html','資格核對'],['documents.html','文件清單'],['timeline.html','申請時間表'],['application-systems.html','申請系統'],['webinars.html','說明會'],['peter-library.html','Peter 的國際教育講座']];
let count=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()){walk(file);continue;}if(!file.endsWith('.html'))continue;let html=fs.readFileSync(file,'utf8');
const page=path.relative(root,file).replaceAll('\\','/');
const link=([url,label])=>'<a href="/study-abroad/'+url+'"'+(page===url?' aria-current="page"':'')+'>'+label+'</a>';
const header='<header class="topbar study-nav"><a class="brand" href="/study-abroad/index.html"><img class="ltu-logo" src="/study-abroad/ltu-logo.png" width="56" height="56" alt="LTU 國際學術中心"><span><strong>留學 DIY 導航</strong><small>Study Abroad Navigator</small></span></a><nav class="study-main-nav" aria-label="留學 DIY 主導覽">'+mainLinks.map(link).join('')+'<details class="study-more"><summary>更多工具</summary><div>'+moreLinks.map(link).join('')+'</div></details></nav></header>';
html=/<header\b[^>]*class="topbar(?: study-nav)?"/.test(html)?html.replace(/<header\b[^>]*class="topbar(?: study-nav)?"[^>]*>[\s\S]*?<\/header>/,header):html.replace(/<body([^>]*)>/,'<body$1>'+header);
if(!html.includes('navigation.css'))html=html.replace('</head>','<link rel="stylesheet" href="/study-abroad/navigation.css?v=20260916"></head>');
fs.writeFileSync(file,html);count++;}}
walk(root);
if(!count)throw new Error('No study navigation headers found');
console.log('Unified study navigation: '+count+' pages');
