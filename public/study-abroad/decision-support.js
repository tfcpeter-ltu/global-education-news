(()=>{
const countryDocs={
 uk:{platform:'UCAS／校方指定流程',docs:['高中成績單','在學／畢業證明','英文成績','UCAS 問答／Personal Statement','推薦資料（依課程）'],note:'醫牙、藝術設計、音樂等專業科系常有額外測驗、作品集或 audition。'},
 canada:{platform:'省級／校方申請系統',docs:['高中成績單','在學／畢業證明','英文成績','補充申請資料（依校系）'],note:'工程、CS、商學常有指定 prerequisite；Co-op 與校系申請條件要分開看。'},
 us:{platform:'Common App／UC／校方系統',docs:['高中成績單','School Report','英文成績','Essay／Supplement','推薦信（依校）','活動資料'],note:'Test-Optional／Test-Required 變動快；需逐校確認 SAT/ACT 與補充文件。'},
 australia:{platform:'校方直申／州級 admissions centre',docs:['高中成績單','畢業／在學證明','英文成績','作品集／補充資料（依科系）'],note:'Direct Entry、Foundation、Diploma 要分開比較，不要把 pathway 當成同一種錄取。'},
 europe:{platform:'各國中央平台／校方直申',docs:['高中成績單','畢業／在學證明','英文或當地語言成績','動機文件／CV（依校）'],note:'歐洲不是單一制度；資格認定、學費與語言要求必須依國家查。'},
 japan:{platform:'校方申請',docs:['高中成績單','畢業／在學證明','志望理由','英文／日文成績','EJU／校內選考（依學程）'],note:'先分英文授課與日文授課，再判斷 EJU、JLPT、面試與書審要求。'},
 singapore:{platform:'各校校方申請',docs:['高中成績單','畢業／在學證明','英文成績','補充資料／面試（依校系）'],note:'NUS、NTU、SMU 等校各自招生，國際資格與面試要求不同。'},
 'hong-kong':{platform:'校方 International／Non-JUPAS 申請',docs:['高中成績單','畢業／在學證明','英文成績','Personal Statement／補充資料（依校系）'],note:'國際生與 Non-JUPAS 規則要依學校判讀，醫學等科系通常有額外要求。'}
};
const familyReq=(m='')=>{
 const s=m.toLowerCase();
 if(/medicine|dentistry/.test(s))return {prereq:'通常需 Chemistry／Biology，部分學校另看 Mathematics／Physics；英國常見 UCAT。',extra:'面試與專業適性評估常是重要環節。'};
 if(/pharmacy|biomedical|life sciences|biology/.test(s))return {prereq:'常見 Biology／Chemistry，部分課程要求 Mathematics。',extra:'確認是否為專業註冊型課程，或偏研究型生命科學。'};
 if(/engineering|computer|software|ai|data science|mathematics|statistics/.test(s))return {prereq:'Mathematics 幾乎是核心；工程常另看 Physics／Chemistry，CS／AI 可能重數學能力。',extra:'確認課程偏理論、軟體、AI、硬體、產業專案或 Co-op。'};
 if(/business|finance|accounting|economics|analytics|supply chain/.test(s))return {prereq:'多數商學不要求特定科學科目，但 Economics／Finance／Analytics 常更重 Mathematics。',extra:'比較實習、placement、專業認證與城市商業環境。'};
 if(/art|design|animation|film|fashion|architecture|interior/.test(s))return {prereq:'學術成績之外，作品集／selection task 常是核心。',extra:'城市產業、設備、studio 課程與 portfolio 指導通常比綜合排名更有決定性。'};
 if(/music|composition|musical theatre/.test(s))return {prereq:'通常重 audition／作品／音樂背景，不宜只用一般學術門檻判斷。',extra:'師資、演出機會、錄音設備與產業連結要一起看。'};
 if(/psychology/.test(s))return {prereq:'部分大學偏好 Mathematics／Science；若未來想走臨床／諮商，要另外研究專業資格。',extra:'心理學學士與臨床／諮商執照不是同一件事。'};
 return {prereq:'依科系確認指定先修科目、英文與補充資料。',extra:'不要只看總平均，應逐校逐科系核對。'};
};
const prestigeNames=['University of Toronto','University of British Columbia','McGill University','University of California, Berkeley','University of Illinois Urbana-Champaign','University of Manchester','University of Bristol','University of Leeds','University of Sheffield','University of Melbourne','University of Sydney','Monash University','University of Tokyo','National University of Singapore','Nanyang Technological University','University of Hong Kong','Imperial College London','University College London','University of Warwick','Carnegie Mellon University','University of Michigan','UNSW Sydney','Australian National University','University of Queensland','Delft University of Technology','Technical University of Munich'];
const localStrong=['University of Waterloo','Simon Fraser University','Toronto Metropolitan University','University of the West of England, Bristol','RMIT University','Queensland University of Technology','Purdue University','Savannah College of Art and Design','Leeds Conservatoire','Aalto University','Waseda University','Singapore Management University','Hong Kong Polytechnic University','University of Bath','Loughborough University','Northeastern University','Concordia University','Carleton University','Swinburne University of Technology','Georgia Institute of Technology','University of Southern California','Western University',"Queen's University"];
const creativeStrong=['University of the Arts London','Rhode Island School of Design','Savannah College of Art and Design','RMIT University','Leeds Conservatoire','Aalto University','Hong Kong Polytechnic University'];
const coopStrong=['University of Waterloo','Simon Fraser University','University of British Columbia','Northeastern University','Carleton University','Concordia University','University of Bath','Loughborough University'];
const professionalStrong=['Monash University','University of Manchester','University of Bristol','University of Sydney','University of Adelaide','University of Hong Kong'];
const hasGoal=(x,re)=>(x.goals||[]).some(g=>re.test(g));
const priorityScore=(x,profile={},selectedGoal='')=>{
 let score=0;const reasons=[];const priority=profile.priority||selectedGoal||'';
 if(/世界排名|研究|名校/.test(priority)){if(prestigeNames.includes(x.name)){score+=40;reasons.push('研究／全球聲望符合你的優先順序');}if(hasGoal(x,/名校|研究/)){score+=20;}}
 if(/當地就業|企業評價|就業/.test(priority)){if(localStrong.includes(x.name)){score+=40;reasons.push('當地就業／產業連結符合你的優先順序');}if(hasGoal(x,/就業|實務|科技/)){score+=20;}}
 if(/Co-op|實習/.test(priority)){if(coopStrong.includes(x.name)){score+=45;reasons.push('Co-op／實習特性符合你的優先順序');}if(hasGoal(x,/Co-op|實務|就業/)){score+=20;}}
 if(/專業執照|認證/.test(priority)){if(professionalStrong.includes(x.name)){score+=40;reasons.push('專業／臨床路線值得優先研究');}if(hasGoal(x,/醫療|專業/)){score+=20;}}
 if(/藝術作品|藝術產業/.test(priority)){if(creativeStrong.includes(x.name)){score+=45;reasons.push('作品／創意產業連結符合你的優先順序');}if(hasGoal(x,/藝術|作品|音樂|實務/)){score+=20;}}
 if(selectedGoal&&hasGoal(x,new RegExp(selectedGoal.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace('／','|'))))score+=15;
 if(profile.budget&&/控制總成本/.test(profile.budget)&&['us','uk'].includes(x.country))score-=5;
 return {score,reasons};
};
const profileWarnings=(x,major='',profile={})=>{const out=[];if(profile.english&&/5.5|尚未/.test(profile.english))out.push('英文目前可能是明顯缺口，先確認直入門檻或 Pathway。');if(prestigeNames.includes(x.name)&&profile.grade&&/75|70|以下/.test(profile.grade))out.push('這是高競爭研究型學校，先當 Reach 研究，不要當安全選項。');if(prestigeNames.includes(x.name)&&profile.grade&&/90|85/.test(profile.grade))out.push('成績可支持進一步研究，但仍需逐校核對 prerequisite 與完整競爭背景。');if(profile.budget&&/控制總成本/.test(profile.budget)&&x.country==='us')out.push('若要控制總成本，美國學費、住宿與獎助學金要優先查。');if(profile.budget&&/控制總成本/.test(profile.budget)&&x.country==='uk')out.push('英國學制通常較短，但學費與城市生活費仍需逐校比較。');if(/Medicine|Dentistry/.test(major))out.push('醫牙錄取不只看平均：測驗、面試、先修與國際生名額都要另外確認。');if(/Art & Design|Animation|Film|Fashion|Architecture/.test(major))out.push('創意科系請把作品集、studio 訓練與產業連結放在綜合排名之外比較。');if(/Music/.test(major))out.push('音樂類請優先比較主修師資、audition、演出與產業資源。');return out;};
window.STUDENT_DECISION_SUPPORT={
 describe(x,major,profile={}){
   const docs=countryDocs[x.country]||{platform:'校方指定流程',docs:['成績單','畢業／在學證明','英文成績'],note:'依官方招生頁為準。'};
   const req=familyReq(major||x.majors?.[0]||'');
   const prestige=prestigeNames.includes(x.name)?'全球聲望／研究型強':'需依科系與領域判讀';
   const local=localStrong.includes(x.name)?'當地產業／實務評價通常比單看世界排名更有參考價值':'當地評價需看科系、城市與雇主市場';
   const research=hasGoal(x,/名校|研究/)?'研究導向較強':'研究強度依科系判讀';
   const employment=hasGoal(x,/就業|Co-op|實務|科技|藝術設計|音樂|placement/)?'就業／實務連結值得重點比較':'需再比較實習、placement 與城市產業';
   const competition=(x.catalogOnly||window.OFFICIAL_PROGRAM_SOURCES?.get(x.name,major)?.verificationScope==='program-availability')?'尚未核對此校系招生競爭度':prestigeNames.includes(x.name)?'高到非常高':hasGoal(x,/名校/)?'高':'中高；仍需依科系與學生背景判斷';
   const profileNotes=[];
   if(profile.curriculum)profileNotes.push(`你的課程體系：${profile.curriculum}`);
   if(profile.grade)profileNotes.push(`成績區間：${profile.grade}`);
   if(profile.english)profileNotes.push(`英文準備：${profile.english}`);
   if(profile.budget)profileNotes.push(`預算考量：${profile.budget}`);
   return {docs,req,prestige,local,research,employment,competition,profileNotes,warnings:profileWarnings(x,major,profile)};
 },rank(x,profile={},selectedGoal=''){return priorityScore(x,profile,selectedGoal);},countryDocs,familyReq
};
})();
