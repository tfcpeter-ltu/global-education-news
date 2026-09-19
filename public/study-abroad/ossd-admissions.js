(()=>{
  const highlySelective=new Set([
    'University of Cambridge','University of Oxford','Imperial College London','University College London','University College London (UCL)','London School of Economics and Political Science','University of Edinburgh',
    'Massachusetts Institute of Technology','Stanford University','Carnegie Mellon University','University of California, Berkeley','University of California, Los Angeles','Harvard University','Yale University','Princeton University','Columbia University','Cornell University','University of Pennsylvania',
    'University of Toronto','University of Waterloo','McGill University','University of British Columbia',
    'University of Melbourne','University of Sydney','UNSW Sydney','Monash University','Australian National University',
    'National University of Singapore','Nanyang Technological University','The University of Hong Kong','Hong Kong University of Science and Technology','Delft University of Technology','ETH Zurich'
  ]);
  const selective=new Set([
    'University of Manchester','University of Warwick','University of Bristol','University of Bath','King’s College London','Durham University','University of Southampton','University of Birmingham','University of Leeds','University of Sheffield','Loughborough University',
    'University of Michigan','University of Illinois Urbana-Champaign','Purdue University','Georgia Institute of Technology','New York University','University of Southern California','Boston University','Northeastern University',
    'Queen’s University','Western University','University of Alberta','Simon Fraser University','University of Calgary',
    'University of Queensland','University of Adelaide','RMIT University','University of Technology Sydney',
    'Chinese University of Hong Kong','Hong Kong Polytechnic University','City University of Hong Kong','Waseda University','Keio University'
  ]);
  const professional=/Medicine|Dentistry|Pharmacy|Nursing|Veterinary/i;
  const quantitative=/Computer Science|Computing|AI|Data Science|Engineering|Mathematics|Statistics|Finance|Economics|Accounting|Architecture|Aviation/i;

  const destination={
    canada:'OSSD 通常以六門 Grade 12 U／M（含 ENG4U 與科系先修）計算 Top 6；同校不同科系的門檻與競爭均分可能不同。',
    uk:'若該校接受 OSSD 直接申請，會依 Grade 12 U／M 成績換算課程要求；須同時核對該校 Canada／Ontario 資格頁，部分課程或學校可能另有資格限制。',
    us:'美國大學通常審查完整高中成績、課程難度與申請文件；OSSD 沒有全國統一換算線，選課強度與科系先修會一起評估。',
    australia:'澳洲大學通常把 OSSD Grade 12 U／M 成績換算為校方選拔標準；科系先修、英文與年度換算表須分別核對。',
    europe:'歐洲各國與各校對 OSSD 的學歷認可、科目及語言要求不同；須查該校的加拿大學歷資格頁，不可只套用單一均分。',
    japan:'日本英語授課學程通常要求完成 12 年教育；OSSD 成績之外，仍可能要求英文檢定、標準化測驗、面試或指定文件。',
    singapore:'新加坡大學會依加拿大／Ontario 高中資格與科系先修個別審查；競爭型課程不能把最低資格視為錄取線。',
    'hong-kong':'香港大學多接受 OSSD 作為國際資格，但最低資格與實際錄取競爭度差距可能很大，並須符合科系指定科目。'
  };

  function subjectPreparation(major){
    if(/Medicine|Dentistry|Pharmacy|Biomedical|Biology|Health Sciences|Nursing|Nutrition/i.test(major))return '核心準備：ENG4U、SBI4U、SCH4U；部分課程另要求 MHF4U／MCV4U 或 SPH4U，醫牙藥並常有測驗、面試或額外選拔。';
    if(/Engineering|Aerospace|Mechanical|Aviation/i.test(major))return '核心準備：ENG4U、MHF4U、MCV4U、SCH4U、SPH4U；工程分支可能另有指定科目或入學測驗。';
    if(/Computer Science|Computing|AI|Data Science|Mathematics|Statistics/i.test(major))return '核心準備：ENG4U、MHF4U、MCV4U；MDM4U 可強化資料能力，但不能取代校方指定的微積分先修。';
    if(/Business|Finance|Accounting|Economics|Management/i.test(major))return '核心準備：ENG4U、MHF4U；量化商學、金融與經濟課程常要求或偏好 MCV4U，MDM4U 可作統計補強。';
    if(/Architecture/i.test(major))return '核心準備：ENG4U；建議修 MHF4U／MCV4U 並保留藝術或設計課程。部分學校另看作品集、創意任務或面試。';
    if(/Art|Design|Animation|Film|Fashion|Game/i.test(major))return '核心準備：ENG4U 加五門 4U／M；申請重點通常包含作品集、創意任務或面試，成績達標不代表作品審查一定通過。';
    if(/Music|Composition|Theatre/i.test(major))return '核心準備：ENG4U 加五門 4U／M；另依主修準備 audition、作品集、樂理或面試。';
    if(/Psychology|Kinesiology|Sport/i.test(major))return '核心準備：ENG4U；建議修 MHF4U 或 MDM4U，研究型／理學路線常另看 SBI4U。';
    if(/Science|Chemistry|Physics|Environmental|Agriculture/i.test(major))return '核心準備：ENG4U，並依科系修讀 MHF4U／MCV4U、SBI4U、SCH4U、SPH4U 中的指定組合。';
    if(/Communication|Journalism|English|History|Humanities|Political|International Relations|Sociology|Social Work|Education|Criminology/i.test(major))return '核心準備：ENG4U 加五門 4U／M；寫作密集課程應以 ENG4U 成績、研究寫作與申請文件展現能力。';
    return '核心準備：ENG4U 加五門 Grade 12 U／M；另依課程頁核對數學、理科、作品集、audition 或其他指定條件。';
  }

  function planningRange(school,major){
    if(professional.test(major))return highlySelective.has(school)?'93–97% 以上':'88–94% 以上';
    if(highlySelective.has(school))return quantitative.test(major)?'92–96% 以上':'88–94% 以上';
    if(selective.has(school))return quantitative.test(major)?'88–93%':'85–91%';
    return quantitative.test(major)?'82–88%':'78–86%';
  }

  function officialClue(source){
    const requirement=source?.evidence?.requirements||'';
    const candidates=[requirement,...(source?.highlights||[])];
    const specific=candidates.find(text=>/OSSD|Ontario|ENG4U|MHF4U|MCV4U|Grade 12 U|Grade 12 U\/M/i.test(text));
    if(specific)return {label:'本課程官方紀錄',text:specific};
    return {label:'OSSD 查核狀態',text:'目前課程紀錄未列 OSSD 專屬換算；送件前須回查該校當年度 Canada／Ontario 資格頁及本課程先修科目。'};
  }

  function courseRequirement(source){
    if(source?.evidence?.requirements)return source.evidence.requirements;
    const highlights=source?.highlights||[];
    return highlights.find(text=>/require|prerequisite|minimum|grade|score|A-level|IB|UCAT|TMUA|TARA|作品集|面試|先修|成績|門檻|測驗/i.test(text))||highlights[0]||'官方課程頁已建立，詳細入學條件仍須依申請年度重新核對。';
  }

  window.OSSD_ADMISSIONS={
    get({school,major,source,university}){
      return {
        destination:destination[university?.country]||'OSSD 可作為加拿大高中學歷申請；仍須由該校依國家資格、學位層級與科系要求個別審查。',
        subjects:subjectPreparation(major),
        range:planningRange(school,major),
        officialRequirement:courseRequirement(source),
        clue:officialClue(source),
        scope:'LTU 選校規劃區間，不是校方最低門檻、歷年錄取保證或正式 offer 條件。'
      };
    }
  };
})();
