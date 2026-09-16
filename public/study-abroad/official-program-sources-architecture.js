/* Official architecture records reviewed 2026-09-16; unverified requirements remain explicit. */
(() => {
  window.STUDY_MAJOR_LABELS={...(window.STUDY_MAJOR_LABELS||{}),...{"Accounting":"會計學","Aerospace Engineering":"航太工程","Animation":"動畫","Architecture":"建築學","Aviation":"航空","Composition":"作曲","Dentistry":"牙醫學","Design":"設計","Fashion":"時尚設計","Film Production":"影視製作","Game Design":"遊戲設計","Hospitality":"餐旅管理","International Relations":"國際關係","Mechanical Engineering":"機械工程","Medicine":"醫學","Music Business":"音樂商務","Music Performance":"音樂表演","Music Production":"音樂製作","Pharmacy":"藥學","Political Science":"政治學","Science":"理學","Sport Management":"運動管理","Tourism":"觀光管理"}};
  const base=window.OFFICIAL_PROGRAM_SOURCES;
  if(!base)return;
  const records=[
  {
    "school": "University of Cambridge",
    "program": "Architecture, BA (Hons) and MArch",
    "url": "https://www.undergraduate.study.cam.ac.uk/courses/architecture-ba-hons-march",
    "curriculum": "以設計工作室為核心，結合建築史與理論、結構、施工及環境設計。2027 課程為四年整合 MArch，三年後可選擇以 BA (Hons) 離校。",
    "experience": "設計由執業建築師與設計師指導；有模型工坊與數位製造設備。",
    "requirements": "各 College 的成績與科目要求不同；所有 College 均有入學評估，毋須預先報名。國際學制與英文仍需逐項確認。",
    "documents": "面試前提交本人藝術作品 PDF，最多 6 頁 A4、少於 15MB；獲邀面試須展示近期作品集，依 College 通知準備。",
    "interpretation": "適合希望結合視覺創作、人文思考與技術分析的學生。",
    "limitation": "四年學位不等於立即取得建築師執照；專業實務及註冊另有要求。"
  },
  {
    "school": "University College London",
    "program": "Architecture BSc",
    "url": "https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/architecture-bsc",
    "curriculum": "Bartlett 的設計工作室教學，以繪圖、模型與作品集發展設計；結合建築與社會、場所及文化的關係。",
    "experience": "B-Made 工坊提供製造與模型資源；有工作展覽，並非保證實習或工作。",
    "requirements": "2027/28 一般 A-level AAB；IB 36、三門 HL 合計 17 且各科不低於 5。台灣高中／OSSD 等學制須另外查國際資格。",
    "documents": "申請階段依邀請提交完整創作作品集；英文要求為 UCL Level 1。",
    "interpretation": "適合重視實驗設計、視覺表達及工作室文化的學生。",
    "limitation": "BSc 不等於完整建築師註冊資格；英國專業教育規則正在調整，須另查後續碩士與實務路徑。"
  },
  {
    "school": "University of Manchester",
    "program": "BA (Hons) Architecture — Manchester School of Architecture",
    "url": "https://www.msa.ac.uk/study/ba/",
    "sources": [
      "https://www.msa.ac.uk/study/ba/",
      "https://www.msa.ac.uk/study/ba/apply/"
    ],
    "curriculum": "由 University of Manchester 與 Manchester Metropolitan University 共同辦理，結合設計、技術、歷史及理論。",
    "experience": "MSA Live 讓學生接觸城市中的真實客戶與專案；可使用兩所大學的圖書館和工坊。",
    "interpretation": "適合重視城市議題、設計實作與跨校資源的學生。",
    "limitation": "聯合學程不應重複算成兩份獨立學位；入學資格及作品要求依當年申請頁核對。"
  },
  {
    "school": "University of Sheffield",
    "program": "Architecture BA",
    "url": "https://sheffield.ac.uk/undergraduate/courses/2027/architecture-ba",
    "curriculum": "以設計工作室結合建築歷史、環境與技術，課程涵蓋建築全生命週期碳排與循環經濟。",
    "experience": "設有木工、金工、鑄造與建築模型製作設施。",
    "documents": "申請後依通知提交 10 件藝術／設計作品的複製圖；評估觀察、批判思考、創意與表達。",
    "interpretation": "適合關注環境議題並願意透過模型與設計作品表達想法的學生。"
  },
  {
    "school": "University of the West of England, Bristol",
    "program": "Architecture BSc (Hons)",
    "url": "https://courses.uwe.ac.uk/k100",
    "curriculum": "透過工作室、真實專案與田野工作學習建築，關注永續性、包容性與創新。",
    "requirements": "頁面列 GCSE 英文與數學 C/4 或同等；國際生 IELTS 6.5、各項 6.0 或認可同等。學歷門檻仍須按申請年度核對。",
    "experience": "第一年工作室結合手繪、實體模型、材料與場所分析。",
    "interpretation": "適合偏好實作、工作室與場域觀察的學生。",
    "limitation": "頁面包含當期 Clearing 資訊，不將其名額或條件視為下一年度保證。"
  },
  {
    "school": "Rhode Island School of Design",
    "program": "Bachelor of Architecture (BArch)",
    "url": "https://www.risd.edu/academics/architecture/bachelors-program",
    "curriculum": "五年制專業 BArch，結合建築設計、材料、手繪與數位表達、建築史、都市及環境議題。",
    "experience": "在藝術設計院校環境中進行跨媒材學習；官方列 NAAB 認證。",
    "interpretation": "適合希望在藝術設計環境接受完整建築專業教育的學生。",
    "limitation": "BArch 與一般三年建築研究學士路徑不同；認證不代表畢業即自動取得執照。"
  },
  {
    "school": "University of Sydney",
    "program": "Bachelor of Design in Architecture",
    "url": "https://www.sydney.edu.au/handbooks/architecture/undergraduate/b-design-architecture/unit-of-study-table.html",
    "sources": [
      "https://www.sydney.edu.au/handbooks/architecture/undergraduate/b-design-architecture/unit-of-study-table.html",
      "https://www.sydney.edu.au/architecture/study-architecture-design-planning/undergraduate-courses.html"
    ],
    "curriculum": "課程含建築工作室、建築技術、歷史與理論；課程表列 144 學分，其中核心 102 學分。",
    "experience": "選修包含城市、永續建築、模型與產業／社區專案；需符合各課程先修。",
    "requirements": "欲銜接 Master of Architecture，須完成指定 Architectural Professional Practice 先修單元；這不是高中入學門檻。",
    "interpretation": "適合希望先完成建築設計學士，再規劃後續專業學位的學生。",
    "limitation": "本次核對課程結構；入學分數、英文及 portfolio pathway 的個別適用資格仍須另查。"
  },
  {
    "school": "UNSW Sydney",
    "program": "Bachelor of Architectural Studies",
    "url": "https://www.unsw.edu.au/study/undergraduate/bachelor-of-architectural-studies",
    "curriculum": "三年制學士，結合設計工作室、永續建築、施工技術、數位製造與建築理論。",
    "experience": "官方列有 Work Integrated Learning；實際安排與資格依課程規定。",
    "interpretation": "適合重視設計與技術並規劃後續 Master of Architecture 的學生。",
    "limitation": "學士本身不等於澳洲建築師註冊資格；後續專業學位、實務與註冊要求仍需確認。"
  },
  {
    "school": "Singapore University of Technology and Design",
    "program": "Bachelor of Science (Architecture and Sustainable Design)",
    "url": "https://www.sutd.edu.sg/wp-content/uploads/2026/01/ASD.pdf",
    "curriculum": "結合建築、永續設計、科技與 Design·AI；先修讀科學、數學、科技、人文及設計基礎。",
    "experience": "包含跨領域 Capstone 專案，運用設計與技術處理真實問題。",
    "interpretation": "適合希望把空間設計、數位工具與跨領域合作結合的學生。",
    "limitation": "來源是 2026 官方學程簡介；不能直接當作個別學制的 2027 招生要求。"
  },
  {
    "school": "Delft University of Technology",
    "program": "BSc Architecture, Urbanism & Building Sciences",
    "url": "https://ocw.tudelft.nl/programs/bachelor/architecture/",
    "sources": [
      "https://ocw.tudelft.nl/programs/bachelor/architecture/",
      "https://www.studiekeuze123.nl/studie-in-cijfers/21PF/56951/en"
    ],
    "curriculum": "三年學士以設計為主軸，包含結構、技術、建築史與空間規劃；可安排 minor。",
    "requirements": "課程管理單位在荷蘭選校資料頁註明：此 BSc 全程以荷蘭語授課。國際學歷與語言資格須另查。",
    "interpretation": "適合能準備荷蘭語、並希望結合建築與都市／技術研究的學生。",
    "limitation": "英文開放課程網頁不代表學士採英語授課；本次未核對招生名額、費用與截止日。"
  }
];
  for(const r of records){
    const evidence={...r,major:'Architecture',checked:'2026-09-16',programUrl:r.url,
      sources:r.sources||[r.url],
      experience:r.experience||'本次已確認課程設置；實習名額、合作機構與參加條件請至官方課程頁確認。',
      requirements:r.requirements||'本次已確認課程設置與內容；請依自己的高中學制核對成績、先修、英文及國際生資格。',
      documents:r.documents||'請開啟官方申請頁逐項確認文件、作品集／面試與截止日，勿套用其他大學規格。',
      limitation:r.limitation||'僅已列內容完成查核；學費、名額、期限及個人申請資格仍須確認。'};
    base.all[r.school+'|Architecture']={status:'已核對建築課程；完整資格請見說明',checked:evidence.checked,program:r.program,programUrl:r.url,highlights:[r.curriculum,evidence.requirements],evidence};
  }
  const original=base.get.bind(base);
  base.get=(school,major)=>original(school==='University College London (UCL)'?'University College London':school,major);
  window.STUDY_PROGRAM_AVAILABILITY={
    'University of Oxford|Architecture':{status:'官方學士課程清單未列建築系',url:'https://www.ox.ac.uk/admissions/undergraduate/courses/undergraduate-course-listing-a-z',checked:'2026-09-16'}
  };
})();

