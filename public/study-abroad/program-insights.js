(()=>{
const special={
'University of Waterloo|Computer Science':{focus:'數學與計算基礎＋Co-op 工作經驗',best:'想把科技就業與帶薪工作經驗放在學位核心的學生',signal:'加拿大科技雇主與 Co-op 網絡是重要選校價值',tradeoff:'若更重純研究聲望，可同時比較 U of T、UBC、McGill。'},
'University of Toronto|Computer Science':{focus:'研究型電腦科學＋大型學術資源',best:'成績強、未來可能讀碩博或走研究／高階技術路線的學生',signal:'全球學術聲望與多倫多科技市場可以同時考量',tradeoff:'學士階段體驗較研究導向；若最重 Co-op，可另比較 Waterloo。'},
'University of British Columbia|Computer Science':{focus:'研究＋西加拿大科技產業＋Co-op 選擇',best:'想兼顧研究、溫哥華產業與校園資源的學生',signal:'西加拿大品牌、研究與城市產業環境兼具',tradeoff:'申請競爭與生活成本需一起評估。'},
'Carnegie Mellon University|Computer Science':{focus:'高強度電腦科學、AI、系統與研究',best:'數理、程式與學術背景很強，目標頂尖科技／研究的學生',signal:'在電腦專業圈的影響力遠高於只看綜合大學排序所得的印象',tradeoff:'競爭非常高，且學習強度與費用都要納入考量。'},
'Northeastern University|Computer Science':{focus:'電腦課程＋Co-op／產業工作經驗',best:'明確以畢業就業與實際履歷為優先的學生',signal:'Boston 產業與 Co-op 模式是比綜合排名更值得看的指標',tradeoff:'若重學術研究品牌，可同時比較 CMU、Michigan、UIUC。'},
'University of Bath|Business':{focus:'商學課程＋placement 工作年',best:'想在英國累積企業經驗、把就業放在排名之前的學生',signal:'英國雇主與 placement 價值值得單獨看，不宜只看世界綜合排名',tradeoff:'若重全球研究聲望，可同時比較 Warwick、Manchester、UCL。'},
'University of Warwick|Business':{focus:'學術強度、經濟／金融／商學交叉',best:'數學能力好、目標金融、顧問或研究型商科的學生',signal:'英國商學與經濟專業聲望是重要價值',tradeoff:'若希望更明確的 placement 體驗，可比較 Bath。'},
'Queen\'s University|Business':{focus:'商學訓練＋校友與企業網絡',best:'想在加拿大讀商學並重視企業招聘與校友資源的學生',signal:'加拿大本地商界與校友網絡的價值不應只用世界綜合排名衡量',tradeoff:'費用、城市與競爭度需和 Toronto／UBC／Western 一起比較。'},
'Western University|Business':{focus:'商學／金融＋校友與招聘網絡',best:'目標加拿大企業、金融、顧問類就業的學生',signal:'當地商界認可與校友網絡可能比綜合排名更有就業意義',tradeoff:'具體商學院路線與附加申請需另查。'},
'Imperial College London|Engineering':{focus:'高強度 STEM、工程研究與數理訓練',best:'數學與科學很強，目標研究、工程科技或碩博的學生',signal:'工程／STEM 專業聲望與研究環境是核心價值',tradeoff:'競爭極高；若更重 placement 或實務，可比較 Bath、Loughborough、UWE。'},
'Loughborough University|Engineering':{focus:'工程實務、產業連結與 placement',best:'希望以英國工程就業和專案經驗為核心的學生',signal:'工程與雇主評價、placement 價值不能只看綜合世界排名',tradeoff:'若以研究和全球學術品牌為優先，可比較 Imperial、UCL、Manchester。'},
'University of the West of England, Bristol|Engineering':{focus:'應用工程、專案與產業導向',best:'希望課程貼近實務、重視畢業就業與專案經驗的學生',signal:'當地雇主與應用型訓練是主要價值',tradeoff:'若以頂尖研究聲望為首要目標，需同時比較 Bristol、Imperial、Manchester。'},
'University of Manchester|Psychology':{focus:'研究型心理學與大型大學資源',best:'未來考慮研究、碩博或進一步專業訓練的學生',signal:'學術研究資源是主要優勢',tradeoff:'心理學學士不等於臨床／諮商執照，後續專業路徑仍需另查。'},
'University of Bath|Psychology':{focus:'心理學學術訓練＋就業／placement 思維',best:'希望兼顧學術與實務經歷的學生',signal:'英國本地就業與 placement 價值值得與研究型名校分開比較',tradeoff:'未來若要臨床／諮商資格，仍需依專業體系繼續訓練。'},
'University of Adelaide|Medicine':{focus:'醫學專業訓練與臨床路徑',best:'明確以醫師職業為目標，並願意處理高門檻專業選拔的學生',signal:'專業認證、臨床訓練與國際生資格比綜合排名更重要',tradeoff:'需逐年確認國際生名額、先修、測驗與面試。'},
'University of Manchester|Medicine':{focus:'英國醫學專業訓練',best:'學術與科學基礎強、能準備 UCAT／面試的學生',signal:'醫學應優先看專業訓練與執業路徑，不宜只比較 QS',tradeoff:'國際生競爭高，年度要求必須以官網為準。'},
'University of the Arts London|Art & Design':{focus:'藝術設計專業訓練、作品集與倫敦創意產業',best:'作品明確、希望進入時尚／視覺／設計產業的學生',signal:'專業圈、城市與作品集訓練遠比綜合大學排名更有意義',tradeoff:'生活成本高，且申請成敗高度依賴作品與科系匹配。'},
'Rhode Island School of Design|Art & Design':{focus:'高強度 studio、設計與藝術創作',best:'作品集強、以專業設計／藝術訓練為核心的學生',signal:'專業藝術設計聲望不能用綜合研究大學排名衡量',tradeoff:'費用高，作品集與創作能力是核心門檻。'},
'RMIT University|Art & Design':{focus:'設計實務、專案與 Melbourne 創意產業',best:'重視作品、實務專案與產業連結的學生',signal:'設計專業評價與產業連結比綜合排名更有選校意義',tradeoff:'若目標純藝術研究或高學術研究，可另比較研究型大學。'},
'Savannah College of Art and Design|Animation':{focus:'動畫、遊戲、影視與創意產業實務',best:'明確走動畫／遊戲／電影製作並希望大量累積作品的學生',signal:'專業訓練與作品就業導向是核心，不宜用綜合大學排名判斷',tradeoff:'需認真評估作品集、學費與目標產業。'},
'Leeds Conservatoire|Music Performance':{focus:'表演訓練、師資、演出與專業音樂環境',best:'以音樂表演／製作／創作作為職業核心的學生',signal:'音樂院校應看師資、audition、演出與產業環境，而非綜合世界排名',tradeoff:'就業高度依賴個人作品、演出經驗與網絡。'},
'University of Southern California|Music':{focus:'音樂／影視／娛樂產業與 Los Angeles 資源',best:'想把音樂、影視、製作與娛樂產業結合的學生',signal:'城市產業網絡是顯著優勢',tradeoff:'費用與競爭度高，需看具體學院／專業要求。'}
};
const subjectGuides=[[["Mathematics","Statistics"],"數學分析、機率、統計推論與建模","比較純數學、應用數學與統計的課程比重","想用嚴謹推理或數據方法解決問題"],[["Biology","Chemistry","Physics","Science"],"基礎科學理論、實驗與研究方法","比較實驗課、研究專題及選擇主修的時間","願意投入實驗、數理分析與科學研究"],[["Agriculture","Environmental Science"],"生物與環境系統、資源利用與永續議題","核對田野、實驗、產業專案與量化課程","關心生態、食物、資源或環境問題"],[["Health Sciences","Public Health","Nutrition","Nursing","Kinesiology"],"健康、人體、研究方法與專業實務","先確認學位是否通往專業資格，以及國際生實習限制","希望把科學知識應用於健康或運動領域"],[["Education","Social Work"],"教育／社會服務理論、研究方法與實務","核對實習安排、語言要求及當地專業資格","重視人際互動、教學或社會支持"],[["English","History","Humanities","Theatre"],"文本、歷史、文化研究與表達","比較閱讀寫作、研究專題、表演或創作課程比重","喜歡閱讀、思辨、研究或創作表達"],[["Sociology","Criminology","Human Development"],"社會、人類發展、制度與研究方法","比較質性訪談、統計及實地研究課程","對人與社會的互動及制度問題有興趣"],[["Public Policy","Political Science","International Relations"],"政治制度、公共議題與政策分析","比較經濟、統計、語言、區域研究與實務專案","希望研究公共事務或國際議題"],[["Communication","Journalism"],"媒體、傳播理論、採訪與內容製作","區分研究型傳播、新聞採訪與實作製作路線","重視寫作、查證、敘事或媒體分析"],[["Interdisciplinary Studies"],"跨領域課程組合與整合專題","核對能否自訂主修，以及必修、學分及畢業專題規則","希望結合兩個以上領域並能說明學習目標"],[["Aviation"],"航空產業、營運及相關技術","分清航空管理、飛行訓練與工程，另查執照與體檢要求","對航空營運或專業技術有明確目標"],[["Hospitality","Tourism","Sport Management"],"服務產業、營運、管理與實務專案","比較實習是否必修、合作範圍與國際生參加資格","偏好服務、營運及組織管理"],[["Game Design"],"遊戲設計、互動原型與製作專案","區分程式、遊戲美術與設計路線，核對作品集要求","希望以互動作品與團隊專案累積能力"]];
const fallback=(x,m)=>{const s=(m||'').toLowerCase();if(/computer|ai|data/.test(s))return {focus:'計算基礎、軟體工程、資料方法與 AI 專精方向',learning:'比較演算法、系統、程式專案、數學深度與專題研究的比重',best:'希望在研究、軟體工程、AI／資料或 Co-op 就業之間建立清楚主軸的學生',signal:'課程深度、實習／Co-op、城市科技產業與研究資源',careers:'軟體工程、資料分析、AI、資安、產品或研究所'};if(/engineering/.test(s))return {focus:'數學科學基礎、工程分支、實驗與設計專案',learning:'比較電子、機械、土木、化工、航太等分流，以及實驗、capstone 與 placement',best:'願意投入數學、物理與團隊設計，並希望把理論轉為工程解決方案的學生',signal:'專業認證、實驗設備、產業專案、placement 與當地工程產業',careers:'工程設計、研發、製造、顧問、專案管理或研究所'};if(/business|finance|accounting|economics/.test(s))return {focus:'商業決策、金融／經濟分析、量化方法與企業環境',learning:'比較會計、金融、管理、行銷、商業分析與經濟理論的必選修比例',best:'希望把分析能力、企業實務與國際商業環境結合的學生',signal:'企業招聘、placement、校友網絡、專業認證與城市市場',careers:'金融、會計、顧問、行銷、營運、商業分析或研究所'};if(/psychology/.test(s))return {focus:'心理學理論、研究方法、統計與人類行為',learning:'比較認知、發展、社會、生物心理及研究專題；另查專業認證',best:'對人類行為有興趣，願意學習研究設計與統計的學生',signal:'認證、研究機會與臨床／諮商等後續研究所路徑',careers:'研究、教育、人力資源、使用者研究或後續專業訓練'};if(/medicine|dentistry|pharmacy|biomedical|health|nursing|nutrition|kinesiology/.test(s))return {focus:'生命科學、健康研究、臨床或專業實務訓練',learning:'先區分執照型專業、健康科學與研究型生命科學，再核對實習及臨床安排',best:'科學基礎穩定、能承擔高強度專業訓練並重視倫理與人際互動的學生',signal:'專業認證、臨床訓練、國際生資格與畢業後執業路徑',careers:'醫療健康專業、生命科學研究、公共健康或研究所'};if(s==='architecture')return {focus:'建築設計工作室、結構環境、建築史與空間表達',learning:'比較 studio 時數、工坊、數位製造、專業學位路徑與實務安排',best:'喜歡空間設計，願意持續製作模型、繪圖並接受設計評議的學生',signal:'工作室文化、專業認證、作品集、工坊與城市建築環境',careers:'建築、都市設計、空間／展覽設計或後續 MArch'};if(/art|design|animation|film|fashion|game/.test(s))return {focus:'studio、作品集、創意製作與跨媒體專案',learning:'比較專業媒介、設備、個人與團隊專案、業界 brief 及畢業作品',best:'已有創作方向，願意反覆修改作品並累積個人作品集的學生',signal:'作品集指導、師資、設備、城市創意產業與校友網絡',careers:'設計、動畫、影視、時尚、遊戲或自由創作'};if(/music|composition|musical/.test(s))return {focus:'表演、創作、製作、音樂科技與產業訓練',learning:'比較主修師資、一對一教學、ensemble、錄音設備、演出與產業專案',best:'能持續練習與公開演出，並希望建立作品、舞台或製作履歷的學生',signal:'主修師資、audition、演出、設備與音樂產業網絡',careers:'表演、作曲、製作、音樂商務、教育或研究所'};const guide=subjectGuides.find(g=>g[0].includes(m));if(guide)return {focus:guide[1],learning:guide[2],best:guide[3],signal:guide[2],careers:'依專業分支進入產業、公共部門、研究或研究所'};return {focus:`${m||'本科系'}的核心理論、方法、專題與跨領域選修`,learning:'比較必修深度、選修彈性、研究／實作專題、實習與畢業成果',best:'希望把個人興趣、能力與可驗證的課程內容對齊的學生',signal:'課程結構、師資方向、實習／研究機會、城市環境與畢業路徑',careers:'依細分專業進入就業、專業資格或研究所路徑'};};

const countrySignals={
 uk:'英國學制通常專業聚焦較早，應特別比較 placement、專業認證與 UCAS 科系設定',
 canada:'加拿大選校需把 Co-op、校區、城市產業與省別就業環境和研究聲望一起看',
 us:'美國課程常保留通識與轉換主修彈性，也要比較校內資源、實習及整體成本',
 australia:'澳洲應同時檢查專業認證、實習、城市產業與國際生畢業後路徑',
 europe:'歐洲各國制度差異大，授課語言、學位結構、實習與資格認定必須逐國確認',
 japan:'日本要先分英文授課與日文授課，再比較實驗室、企業連結與語言門檻',
 singapore:'新加坡應分清自治大學與私立教育機構，並核對授位學校、EduTrust 與實習資格',
 'hong-kong':'香港課程與城市產業連結緊密，應同時比較專業認證、交換與國際生就業規則',
 'south-korea':'韓國要先分英文軌與韓文軌，再比較研究資源、企業連結及 TOPIK 要求',
 china:'中國大陸要先分中文與英文授課，並比較學院實力、城市產業、實驗室與國際生規則'
};
const orientation=x=>{
 const goals=(x.goals||[]).join(' '), memberships=x.rankingMemberships||[];
 if(memberships.some(r=>r.id==='singapore-private'))return {label:'實務／授位合作導向',detail:'比較授位夥伴、課程交付、實習支援與 EduTrust 狀態'};
 if(/Co-op|實務|就業|placement|產業/.test(`${goals} ${x.note||''}`))return {label:'實務與就業取向較明確',detail:'把實習、Co-op／placement、專案與雇主連結列為主要比較項'};
 if(memberships.length||/名校|研究/.test(goals))return {label:'研究資源與學術能見度取向',detail:'適合把研究方法、學術深度、實驗室與碩博銜接列為主要比較項'};
 return {label:'研究與實務並重',detail:'需從實際課表確認理論、研究、專案與實習的比例'};
};
const peers=(x,m)=>{
 const all=window.UNIVERSITY_FINDER_DATA||[];
 const candidates=all.filter(v=>v!==x&&v.country===x.country&&(v.majors||[]).includes(m));
 const ranked=candidates.sort((a,b)=>(b.rankingMemberships?.length||0)-(a.rankingMemberships?.length||0));
 return ranked.slice(0,3).map(v=>v.name);
};
const build=(x,m)=>{
 const base=fallback(x,m), type=orientation(x), compare=peers(x,m), city=x.city?`${x.city} 的城市／生活與產業環境`:'所在地的生活與產業環境';
 const source=window.OFFICIAL_PROGRAM_SOURCES?.get?.(x.name,m);
 const compareText=compare.length?`同國同科系可先與 ${compare.join('、')} 對照；比較時不要只看綜合排名，應逐項核對課程、實習／研究、成本與申請要求。`:'目前本站同國同科系樣本較少，建議再加入其他國家或同領域課程交叉比較。';
 return {
   focus:`${x.name} × ${m}：${base.focus}。本校目前的比較定位為「${type.label}」。`,
   learning:base.learning,
   orientation:type.label,
   best:base.best,
   signal:`${base.signal}；另把${city}納入判斷。${countrySignals[x.country]||'並確認當地產業、實習與專業資格。'}`,
   careers:base.careers,
   compare:compareText,
   tradeoff:`${type.detail}；${source?'本站已連結對應官方課程，仍須以申請年度頁面為準。':'目前只完成學校層級與科系方向比較，正式學位名稱、課表、師資與實習仍待官方課程頁逐項核對。'}`,
   evidence:source?`已連結官方課程：${source.program}（查核 ${source.checked}）`:'尚未完成此校此科系的逐課程官方查核，不把方向性比較當成已確認開課。',
   sourceUrl:source?.programUrl||x.url,
   scope:source?'學校 × 科系比較；已有官方課程來源':'學校 × 科系方向性比較；官方課程待查'
 };
};
window.PROGRAM_INSIGHTS={
 get(x,m){const generated=build(x,m), found=special[`${x.name}|${m}`];return found?{...generated,...found,focus:`${x.name} × ${m}：${found.focus}`,learning:generated.learning,orientation:generated.orientation,careers:generated.careers,compare:generated.compare,evidence:generated.evidence,sourceUrl:generated.sourceUrl,scope:generated.scope}:generated;},
 coverage(){const all=window.UNIVERSITY_FINDER_DATA||[];return {schools:all.length,majors:new Set(all.flatMap(x=>x.majors||[])).size,pairs:all.reduce((n,x)=>n+(x.majors||[]).length,0)};}
};
})();
