(()=>{
const extra={
'University of the West of England, Bristol|Computer Science':{status:'已核對官方課程頁',checked:'2026-09-14',program:'BSc(Hons) Computer Science',programUrl:'https://courses.uwe.ac.uk/G400',admissionsUrl:'https://www.uwe.ac.uk/courses/applying',highlights:['2026/27 entry，UCAS course code G400','三年 full-time；可選四年 sandwich placement 路線','課程含 AI、軟體開發與實際專案','若未達標準入學要求，可另研究 Foundation Year 路線']},
'Carnegie Mellon University|Computer Science':{status:'已核對官方課程／招生頁',checked:'2026-09-14',program:'B.S. in Computer Science',programUrl:'https://www.csd.cmu.edu/academics/bachelors/overview',admissionsUrl:'https://www.cs.cmu.edu/education/undergraduate/admissions',highlights:['SCS 提供五個學士方向，Computer Science 為其中之一','課程包含數學／機率基礎、系統、演算法與專案型訓練','大學部可參與研究，並可走 research honors thesis','新生申請由 Carnegie Mellon Undergraduate Admission 處理']},
'Northeastern University|Computer Science':{status:'已核對 2026-27 官方課程／Co-op 資料',checked:'2026-09-14',program:'BS in Computer Science (Boston)',programUrl:'https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/bscs/',admissionsUrl:'https://admissions.northeastern.edu/major/computer-science/',highlights:['BSCS 涵蓋程式設計、軟體開發、系統、網絡、理論與演算法','Integrating Knowledge and Skills Through Experience 可由 co-op 滿足','Khoury 學生通常從第二年開始進行 co-op search','若以就業為目標，應把 co-op 與 Boston 產業環境納入比較']},
'University of Michigan|Computer Science':{status:'已核對 2026-27 官方招生更新',checked:'2026-09-14',program:'Computer Science (BS / Engineering route)',programUrl:'https://cse.engin.umich.edu/academics/undergraduate/admissions/',admissionsUrl:'https://admissions.umich.edu/apply/first-year-applicants/requirements-deadlines/application-changes',highlights:['CSE 官方說明 CS advance-selection restriction 自 Spring 2026 已移除','2027 cycle 繼續採用 test-optional','Engineering first-year review 特別重視課程強度，並強調 precalculus、chemistry、physics 等準備','部分招生舊頁面可能仍保留舊 selection 文案，申請人應以目前 application changes／CSE 頁面為準']},
'Georgia Institute of Technology|Computer Science':{status:'已核對 2026-27 官方課程／招生頁',checked:'2026-09-14',program:'BS in Computer Science',programUrl:'https://catalog.gatech.edu/programs/computer-science-bs/',admissionsUrl:'https://admission.gatech.edu/first-year/',highlights:['BSCS 採用 Threads 模式，學生組合兩個 computing Threads','課程可延伸 AI、systems、theory、people、media、cybersecurity 等方向','另有 undergraduate research 與 cooperative plan','Georgia Tech first-year 申請使用 Common App']},
'UNSW Sydney|Computer Science':{status:'已核對官方國際生課程頁',checked:'2026-09-14',program:'Bachelor of Science (Computer Science)',programUrl:'https://www.unsw.edu.au/study/undergraduate/bachelor-of-computer-science',admissionsUrl:'https://www.unsw.edu.au/study/how-to-apply/undergraduate',highlights:['三年 full-time，Program code 3778','可專攻 AI、Security Engineering、Computer Networks、Database Systems、Embedded Systems、Programming Languages','課程獲 Australian Computer Society Professional level accreditation','國際生需留意 grouped offer rounds、capacity 與 intake 更新']},
'University of Sydney|Computer Science':{status:'已核對官方課程頁',checked:'2026-09-14',program:'Bachelor of Advanced Computing',programUrl:'https://www.sydney.edu.au/content/courses/courses/uc/bachelor-of-advanced-computing.html',admissionsUrl:'https://www.sydney.edu.au/study/applying.html',highlights:['四年 full-time Advanced Computing 學位','可專攻 Computer Science、Cybersecurity、Software Development、Computational Data Science','課程同時強調 practical 與 theoretical computing skills','ACS 2027 accreditation 狀態應依學校後續官方更新確認']}
};
const base=window.OFFICIAL_PROGRAM_SOURCES||{all:{},get(){return null}};
const merged={...(base.all||{}),...extra};
const alias={'Business / Finance':'Business','Music Performance':'Music Performance','Music Production':'Music','Art & Design':'Art & Design'};
window.OFFICIAL_PROGRAM_SOURCES={all:merged,get(school,major){const m=alias[major]||major;return merged[`${school}|${m}`]||merged[`${school}|${major}`]||null;}};
})();

// Course-level evidence reviewed 2026-09-13. Editorial interpretations are labelled.
(()=>{
const records=[
  {
    "school": "University of Waterloo",
    "major": "Computer Science",
    "program": "Computer Science BCS / BMath",
    "programUrl": "https://uwaterloo.ca/future-students/programs/computer-science",
    "checked": "2026-09-13",
    "curriculum": "一年級包含函數式程式、代數、微積分與線性代數；後續可選 AI、HCI 等專精。",
    "experience": "有 regular 與 Co-op 兩種路線；官方列出軟體、研究助理等工作例子，並提供求職支持。",
    "requirements": "Ontario 課程要求六門 4U/M，含 Advanced Functions、Calculus and Vectors、4U English 及另一門 4U；其他地區資格另查。",
    "documents": "AIF 必交；數學競賽非一般錄取必需，但部分獎學金有要求。",
    "interpretation": "研究與工作經驗可以並行；不是「研究型或就業型」只能二選一。",
    "limitation": "官方列出的工作案例不代表保證職缺；臺灣修讀 OSSD 須另確認境外修課與英文政策。",
    "sources": [
      "https://uwaterloo.ca/future-students/programs/computer-science"
    ]
  },
  {
    "school": "University of Waterloo",
    "major": "Data Science",
    "program": "Computer Science 入學後的 Data Science 方向",
    "programUrl": "https://uwaterloo.ca/future-students/programs/computer-science",
    "checked": "2026-09-13",
    "curriculum": "官方列明第一年結束後可選擇 Data Science 主修。",
    "experience": "可先比較 CS regular／Co-op 路線，再查 Data Science 分流條件。",
    "requirements": "不是高中直接取得 Data Science 主修保證；分流名額與大一課程成績須另核對。",
    "documents": "先依 CS 申請要求準備 AIF 和學術資料。",
    "interpretation": "適合想先建立計算與數學基礎、再決定資料科學方向的學生。",
    "limitation": "轉入門檻、選拔與可用名額尚待逐年核對，不能當作 Safer 保證。",
    "sources": [
      "https://uwaterloo.ca/future-students/programs/computer-science"
    ]
  },
  {
    "school": "University of Bath",
    "major": "Business",
    "program": "Management BSc (Hons) with work placement, 2027",
    "programUrl": "https://www.bath.ac.uk/courses/undergraduate-2027/business-and-management/bsc-management-with-work-placement/",
    "checked": "2026-09-13",
    "curriculum": "管理學位結合企業實務；申請時要區分含 placement 的版本。",
    "experience": "官方表示與 400 多家企業有聯繫；placement 是實際工作，通常有薪。",
    "requirements": "2027 典型 A-level AAA／A*AB；IB 36，HL 666／765。不同資格須使用相應要求。",
    "documents": "校方綜合考量過往與預估成績、科目組合及個人陳述；經 UCAS 申請。",
    "interpretation": "有一年工作經驗的課程，可與研究資源強的商學課程分開比較。",
    "limitation": "企業聯繫數不是錄取或就業保證；placement 通常需自行申請競爭。",
    "sources": [
      "https://www.bath.ac.uk/courses/undergraduate-2027/business-and-management/bsc-management-with-work-placement/"
    ]
  },
  {
    "school": "University of Bath",
    "major": "Accounting",
    "program": "Accounting and Management BSc with work placement, 2027",
    "programUrl": "https://www.bath.ac.uk/courses/undergraduate-2027/accounting-and-finance/bsc-accounting-and-management-with-work-placement/",
    "checked": "2026-09-13",
    "curriculum": "會計與管理結合的新課程，與 Accounting and Finance 不同。",
    "experience": "含 placement 路線，但本課程尚沒有已完成 placement 的學生數據。",
    "requirements": "依 2027 課程頁選取自己的學制；不能套用其他商科門檻。",
    "documents": "UCAS 文書、推薦與學術資料；職業考試抵免須逐機構核對。",
    "interpretation": "適合會計與企業管理兼顧的學生；應比較會計必修比例。",
    "limitation": "其他相近課程薪資或就業數據不可當成本課程成果。",
    "sources": [
      "https://www.bath.ac.uk/courses/undergraduate-2027/accounting-and-finance/bsc-accounting-and-management-with-work-placement/",
      "https://www.bath.ac.uk/campaigns/undergraduate-courses-in-the-school-of-management/"
    ]
  },
  {
    "school": "University of Bath",
    "major": "Finance",
    "program": "Accounting and Finance BSc (Hons), 2027",
    "programUrl": "https://www.bath.ac.uk/courses/undergraduate-2027/accounting-and-finance/bsc-accounting-and-finance/",
    "checked": "2026-09-13",
    "curriculum": "三年 Accounting and Finance，非單純 Finance；先比較會計與金融模組比重。",
    "experience": "可另比較含 work placement 的版本，不能把其他版本的實習當作本版本必修。",
    "requirements": "查核頁對應 2027 入學；數學與學制要求需逐項對照。",
    "documents": "以 UCAS 與本課程官方要求整理文件。",
    "interpretation": "適合尚未完全排除會計職涯、希望保留商業財務方向者。",
    "limitation": "商學院層級的雇主資料不等於這個學位的招聘保證。",
    "sources": [
      "https://www.bath.ac.uk/courses/undergraduate-2027/accounting-and-finance/bsc-accounting-and-finance/"
    ]
  },
  {
    "school": "University of Sheffield",
    "major": "AI",
    "program": "Computer Science (Artificial Intelligence) MComp, 2027",
    "programUrl": "https://sheffield.ac.uk/undergraduate/courses/2027/computer-science-artificial-intelligence-mcomp",
    "checked": "2026-09-13",
    "curriculum": "四年整合碩士；最後一年含進階教學與團隊研究專案。",
    "experience": "課程資訊可支持研究訓練判斷，不能直接推導畢業就業率。",
    "requirements": "官方列 A-level A*AA／AAA（適用條件須展開核對）；UCAS G700。",
    "documents": "確認 Mathematics 等指定科目與資格換算；準備 UCAS 所需資料。",
    "interpretation": "適合願意多讀一年、深化 AI 研究與分析能力的學生。",
    "limitation": "MComp 是四年整合學位，不應與三年 BSc 當成相同成本或深度。",
    "sources": [
      "https://sheffield.ac.uk/undergraduate/courses/2027/computer-science-artificial-intelligence-mcomp"
    ]
  },
  {
    "school": "Waseda University",
    "major": "Computer Science",
    "program": "English-based Computer Science and Communications Engineering",
    "programUrl": "https://www.waseda.jp/fsci/en/about/education/english-based",
    "checked": "2026-09-13",
    "curriculum": "英文授課 CSCE 結合計算理論、資訊與通訊工程。",
    "experience": "此頁支持課程方向；沒有提供可直接比較的國際生就業率。",
    "requirements": "依理工英文學程當年 AO 招生簡章；不同教育體系使用不同文件表。",
    "documents": "查看 List of Application Documents by Education System；不要預設所有英文學程都要求 EJU。",
    "interpretation": "適合想在日本讀英文理工、也接受通訊工程訓練的學生。",
    "limitation": "日本就業所需日文能力須另規劃；英文授課不等於英文就業市場保證。",
    "sources": [
      "https://www.waseda.jp/fsci/en/about/education/english-based",
      "https://www.waseda.jp/inst/admission/en/undergraduate/english"
    ]
  },
  {
    "school": "Aalto University",
    "major": "Art & Design",
    "program": "Design and Media BA + MA",
    "programUrl": "https://www.aalto.fi/en/study-options/design-and-media-bachelor-of-arts-and-master-of-arts-art-and-design",
    "checked": "2026-09-13",
    "curriculum": "英文授課設計與媒體，學士三年＋碩士兩年的學位路徑。",
    "experience": "需比較設計作業與作品發展，不能用綜合研究排名取代作品品質。",
    "requirements": "2027 preliminary assignments 尚未公布；2026 題目僅能練習參考。",
    "documents": "依當年官方程序提交學歷、語言與指定甄選作業。",
    "interpretation": "適合重視跨媒體探索且願意準備指定任務的學生。",
    "limitation": "舊年度申請時程與題目不可直接用於 2027。",
    "sources": [
      "https://www.aalto.fi/en/study-options/design-and-media-bachelor-of-arts-and-master-of-arts-art-and-design",
      "https://www.aalto.fi/en/admission-services/preliminary-assignments-for-bachelors-programme-in-design-and-media"
    ]
  },
  {
    "school": "The University of Hong Kong",
    "major": "Biomedical Sciences",
    "program": "Bachelor of Biomedical Sciences",
    "programUrl": "https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-biomedical-sciences",
    "checked": "2026-09-13",
    "curriculum": "包含實驗、問題導向教學與研究專案；不是 MBBS 醫學學位。",
    "experience": "課程可支持研究技能培養，未提供可用來保證就業的個人預測。",
    "requirements": "依國際資格及本課程要求核對科學科目；勿套用醫學 UCAT 清單。",
    "documents": "準備學術及語言證明，補充文件依校方 portal。",
    "interpretation": "適合希望研究疾病機制與生命科學、再評估研究所的學生。",
    "limitation": "取得此學位不等於取得醫師執照，也不保證轉入醫學。",
    "sources": [
      "https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-biomedical-sciences",
      "https://www.biomedsc.hku.hk/incoming-students"
    ]
  },
  {
    "school": "University of Manchester",
    "major": "Dentistry",
    "program": "BDS Dentistry, 2027",
    "programUrl": "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00398/bds-dentistry-first-year-entry/",
    "checked": "2026-09-13",
    "curriculum": "牙醫專業學位，與 Biomedical Sciences 的研究訓練不同。",
    "experience": "專業訓練應先按未來執業地要求評估，不能只按 QS 排序。",
    "requirements": "IB 36、HL 666，包含 Chemistry 與 Biology；其他學制另查。",
    "documents": "所有申請人須在申請年度考 UCAT；另查面試與英文要求。",
    "interpretation": "適合已確定牙醫志向、能提早準備科學先修與甄選的學生。",
    "limitation": "達到學術門檻不等於錄取；不能標成保底。",
    "sources": [
      "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00398/bds-dentistry-first-year-entry/",
      "https://www.bmh.manchester.ac.uk/study/dentistry/apply/faqs/"
    ]
  },
  {
    "school": "University of the Arts London",
    "major": "Fashion",
    "program": "BA (Hons) Fashion Design: Womenswear, CSM",
    "programUrl": "https://www.arts.ac.uk/subjects/fashion-design/undergraduate/ba-hons-fashion-design-womenswear-csm",
    "checked": "2026-09-13",
    "curriculum": "女裝設計的實際學位，不代表所有 Fashion 或時尚管理課程。",
    "experience": "應檢視作品研究、發展過程與最終呈現，而非只選城市或校名。",
    "requirements": "課程指定數位作品集最多 25 頁，包含研究、發展草圖與彩色時裝插畫。",
    "documents": "依本課程作品要求；UAL 數位作品透過 PebblePad 提交。",
    "interpretation": "適合希望以服裝設計作品建立專業方向的學生。",
    "limitation": "頁數與作品格式依課程更新；不能套用到 LCF 或時尚管理。",
    "sources": [
      "https://www.arts.ac.uk/subjects/fashion-design/undergraduate/ba-hons-fashion-design-womenswear-csm",
      "https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice"
    ]
  },
  {
    "school": "Leeds Conservatoire",
    "major": "Music Production",
    "program": "BA (Hons) Music Production",
    "programUrl": "https://www.leedsconservatoire.ac.uk/courses/undergraduate-courses/ba-hons-music-production/",
    "checked": "2026-09-13",
    "curriculum": "音樂製作學士；與演奏主修的 audition 路徑分開。",
    "experience": "比較錄音與製作作品、自己的製作角色及可使用的專業設施。",
    "requirements": "課程頁列一般 96 UCAS tariff；英文 IELTS 6.0、單項 5.5，國際同等資格需個別審核。",
    "documents": "校方按申請、個人陳述、面試與作品集等評估適合度。",
    "interpretation": "適合以錄音、製作與創作輸出為重點的學生。",
    "limitation": "UCAS tariff 不應直接換算台灣或 OSSD 百分比；不把器樂 Grade 8 套入製作課程。",
    "sources": [
      "https://www.leedsconservatoire.ac.uk/courses/undergraduate-courses/ba-hons-music-production/",
      "https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/entry-requirements/"
    ]
  },
  {
    "school": "Leeds Conservatoire",
    "major": "Music Performance",
    "program": "BA (Hons) Classical Music",
    "programUrl": "https://www.leedsconservatoire.ac.uk/courses/undergraduate-courses/ba-hons-classical-music/",
    "checked": "2026-09-13",
    "curriculum": "以 Classical Music 為具體示例，其他風格有不同主修安排。",
    "experience": "評估一對一師資、合奏與演出機會；沒有可比較的雇主排名證據。",
    "requirements": "一般三年課程 96 UCAS tariff；演奏標準約 Grade 8，國際資格另審。",
    "documents": "準備指定 audition；英語和學歷要求與演奏評估分別核對。",
    "interpretation": "適合目標古典表演、能用 audition 展示主修能力的學生。",
    "limitation": "表演水平相當不等於一定需要持有該檢定證書。",
    "sources": [
      "https://www.leedsconservatoire.ac.uk/courses/undergraduate-courses/ba-hons-classical-music/",
      "https://www.leedsconservatoire.ac.uk/courses/international-applicants/entry-requirements/"
    ]
  },
  {
    "school": "Nanyang Technological University",
    "major": "Communication",
    "program": "Bachelor of Communication Studies",
    "programUrl": "https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies",
    "checked": "2026-09-13",
    "curriculum": "二年級選修發展方向；四年級做 capstone。",
    "experience": "三年級第二學期所有學生參與 22 週 Professional Internship。",
    "requirements": "依 NTU 國際資格表核對學歷及語言，不使用本地 IGP 當作國際錄取線。",
    "documents": "校方申請系統；補充資料依學制及當年度招生要求。",
    "interpretation": "適合希望在傳播學習中安排正式產業實習的學生。",
    "limitation": "實習列入課程可作比較依據，不能等同特定企業錄用保證。",
    "sources": [
      "https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies"
    ]
  },
  {
    "school": "RMIT University",
    "major": "Architecture",
    "program": "Bachelor of Architectural Design BP250",
    "programUrl": "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bp250",
    "checked": "2026-09-13",
    "curriculum": "三年設計學士；課程採設計與專案訓練。",
    "experience": "學士可通往不需專業註冊的設計職務；建築師路徑還需 Master of Architecture 等後續訓練。",
    "requirements": "競爭選拔根據 selection task；需確認國際同等學歷與英文。",
    "documents": "完成 Architectural Design selection task；延遲件不受理，依申請身分看時程。",
    "interpretation": "適合有設計興趣、願意連同後續專業訓練一起估算總成本者。",
    "limitation": "學士不是直接建築師註冊資格；當地或返台執業須另外核對。",
    "sources": [
      "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bp250"
    ]
  },
  {
    "school": "University of Southern California",
    "major": "Film Production",
    "program": "Film & Television Production BFA",
    "programUrl": "https://cinema.usc.edu/admissions/procedures/production/firstyearprocedures.cfm",
    "checked": "2026-09-13",
    "curriculum": "創作製作型 BFA，與 Cinema & Media Studies 學術方向不同。",
    "experience": "申請已要求呈現敘事、創作與自我評析能力；不是只交學校成績。",
    "requirements": "按該學年的 Film & Television Production 新生要求申請。",
    "documents": "Common App 加 SCA SlideRoom；包含專業個人陳述、創作資料與影片。影片需直接上傳，不能只放網址。",
    "interpretation": "適合願意親自製作、反思與說明團隊分工的學生。",
    "limitation": "作品入學要求不代表畢業工作保證；影片題目與分鐘數請逐年核對。",
    "sources": [
      "https://cinema.usc.edu/admissions/procedures/production/firstyearprocedures.cfm"
    ]
  },
  {
    "school": "University of Waterloo",
    "major": "Engineering",
    "program": "Engineering direct-entry programmes",
    "programUrl": "https://uwaterloo.ca/engineering/future-students",
    "checked": "2026-09-13",
    "curriculum": "申請時直接選工程分支；不是先讀共同大一再保證任選。",
    "experience": "官方介紹六個工作學期的 Co-op 規劃，結合實驗設施與設計團隊。",
    "requirements": "高中指定科目依工程分支與教育體系核對。",
    "documents": "Admissions 頁另列 AIF、Online Interviews 與學術文件。",
    "interpretation": "適合已有工程分支興趣、願意在學習與工作學期之間切換的學生。",
    "limitation": "此紀錄是工程招生框架；機械、電機、化工的實際模組與認證需各自核對。",
    "sources": [
      "https://uwaterloo.ca/engineering/future-students"
    ]
  },
  {
    "school": "Monash University",
    "major": "Pharmacy",
    "program": "Bachelor of Pharmacy (Honours) / Doctor of Pharmacy, 2027",
    "programUrl": "https://www.monash.edu/pharm/future/courses/undergraduate-pharmacy-international",
    "checked": "2026-09-13",
    "curriculum": "五年藥學專業路徑，含臨床決策、病人照護及數位能力；不是研究博士 PhD。",
    "experience": "二至四年級安排社區與醫院 placement；第五年為帶薪 supervised practice，學生須自行取得該職位。",
    "requirements": "2027 新制；國際學歷與先修應由官方 Entry requirements 另核對。",
    "documents": "學術與英文證明；第五年實務職位另有求職程序，不能當成入學即保證安排。",
    "interpretation": "適合以藥師專業訓練為目標，願意連同五年成本和實務求職一起規劃者。",
    "limitation": "替代出口與註冊所需追加要求不同；取得學位不代表自動在任何國家執業。",
    "sources": [
      "https://www.monash.edu/pharm/future/courses/undergraduate-pharmacy-international"
    ]
  },
  {
    "school": "University of Manchester",
    "major": "Psychology",
    "program": "BSc Psychology, 2027",
    "programUrl": "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00653/bsc-psychology/",
    "checked": "2026-09-13",
    "curriculum": "BPS 認證心理學，結合理論、核心與選修；研究與實務並非互斥。",
    "experience": "二年級有 30 小時 placement；完整 placement year 需符合進級條件，再申請選入。",
    "requirements": "依 2027 的學歷、指定科目與英文門檻分別核對。",
    "documents": "UCAS 學術、推薦與文書資料；placement 職位另準備 CV、cover letter。",
    "interpretation": "適合希望保留研究與應用方向、之後再決定專業訓練的學生。",
    "limitation": "BPS 學士認證不等於已獲臨床或諮商執業資格。",
    "sources": [
      "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00653/bsc-psychology/"
    ]
  },
  {
    "school": "RMIT University",
    "major": "Animation",
    "program": "Bachelor of Design (Animation and Interactive Media)",
    "programUrl": "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bp203",
    "checked": "2026-09-13",
    "curriculum": "包含 2D／3D 動畫、interactive media 與數位特效；後續採 studio 專案。",
    "experience": "以創作與製作技能判讀實務方向；課程頁未提供可比的國際生雇主調查。",
    "requirements": "所有申請人須交 selection task；境外國際生與 VTAC 有不同指示。",
    "documents": "境外國際生須下載專用 selection-task PDF 隨申請提交；不可直接套用本地生截止日或頁數。",
    "interpretation": "適合想做視覺敘事與互動影像、願意按指定創作任務準備者。",
    "limitation": "2027 任務有原創與 AI 使用規範；送件前應閱讀適用身分的完整任務文件。",
    "sources": [
      "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bp203"
    ]
  },
  {
    "school": "University of Manchester",
    "major": "Medicine",
    "program": "MBChB Medicine, 2027",
    "programUrl": "https://www.manchester.ac.uk/study/undergraduate/courses/2027/01428/mbchb-medicine/",
    "checked": "2026-09-13",
    "curriculum": "醫學專業學位；與 Biomedical Sciences 或一般生命科學分開選擇。",
    "experience": "以臨床訓練與未來執業可行性作為決策核心。",
    "requirements": "按該年度醫學課程確認科學先修、UCAT 及面試。",
    "documents": "除一般 UCAS 文件外，提早安排測驗與面試準備。",
    "interpretation": "適合已確認醫師方向，且願意投入專業甄選準備的學生。",
    "limitation": "本紀錄不是各學制分數換算；國際生條件、後續註冊與執業地需再核對。",
    "sources": [
      "https://www.manchester.ac.uk/study/undergraduate/courses/2027/01428/mbchb-medicine/"
    ]
  }
,
{
  "school": "University of Manchester",
  "major": "Biomedical Sciences",
  "program": "BSc Biomedical Sciences, 2027 · B940",
  "programUrl": "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00532/bsc-biomedical-sciences/",
  "checked": "2026-09-13",
  "curriculum": "三年制；生理、藥理、神經科學與免疫等基礎，最後一年可做實驗、資料分析或科學傳播研究專題。",
  "experience": "另有 industry／professional experience 或整合碩士路線，須分別確認課程；一般三年制不等於已包含 placement。",
  "requirements": "A-level AAB，含 Biology、Chemistry、Physics、Mathematics 中兩科；單一核心科學的替代組合有不同條件。IB 一般為 35／HL 665，含兩科科學（通常生物及化學）。IELTS 6.5，各項至少 6.5。",
  "documents": "UCAS 申請；準備學歷、科目成績、英文證明與推薦資料。非標準學歷先洽招生組；通常不建議同時申請多個 Manchester bioscience 課程。",
  "interpretation": "適合希望探索生命科學、研究專題及後續研究所的學生；與 HKU 生醫比較時，先看研究選修及自己的職涯地點。",
  "limitation": "官方明確標示未獲 Institute of Biomedical Science（IBMS）認證。不能把此學位當成直接取得註冊資格；2027 費用及其他高中學制門檻仍需核對。",
  "sources": [
    "https://www.manchester.ac.uk/study/undergraduate/courses/2027/00532/bsc-biomedical-sciences/"
  ]
}
,
{
  "school": "Carnegie Mellon University",
  "major": "Computer Science",
  "program": "B.S. in Computer Science",
  "programUrl": "https://www.csd.cmu.edu/academics/bachelors/overview",
  "curriculum": "CS 核心搭配數學、機率與另一領域的必修 minor；有密集專案課程。",
  "experience": "可做學士研究、暑期研究或獨立研究學分；研究榮譽論文路線適合探索研究所。",
  "requirements": "高中課程要求含四年英文與數學、一年物理、兩年化學／生物／CS、兩年外語及三門選修，數學須涵蓋 pre-calculus 並鼓勵 calculus。SCS 必須提交 SAT 或 ACT。非英語母語申請者另交英文成績；IELTS Academic 總分至少 7.5，校方另重視單項 7.5 以上。不得套用其他學院的 test-flexible 政策。",
  "documents": "Common App、Essay、三題校方短答、counselor evaluation、teacher recommendation，以及適用的測驗成績。",
  "interpretation": "適合願意深入數學、理論與研究，並以 minor 建立第二領域的學生。",
  "limitation": "研究機會不是保證分配；本紀錄沒有國際生錄取率或最低保證錄取分數。",
  "sources": [
    "https://www.csd.cmu.edu/academics/bachelors/overview",
    "https://www.cmu.edu/admission/admission/undergraduate-admission-requirements",
      "https://www.cmu.edu/admission/admission/standardized-testing",
      "https://www.cmu.edu/admission/admission/academic-requirements-college-level-work"
  ],
  "documentChecklist": [
    "高中課程與成績",
    "Common App Essay",
    "CMU 三題短答",
    "Counselor evaluation",
    "Teacher recommendation",
    "SAT 或 ACT 成績",
      "英文檢定成績（非英語母語申請者）"
  ],
  "checked": "2026-09-14"
},
{
  "school": "Northeastern University",
  "major": "Computer Science",
  "program": "BSCS (Boston), 2026–2027 catalogue",
  "programUrl": "https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/bscs/",
  "curriculum": "133 學分；離散結構、程式、系統與演算法，包含 Khoury Co-op 職涯準備課。",
  "experience": "課程的經驗整合要求可由 Co-op 滿足；要把求職準備排進修課計畫。",
  "requirements": "國際生依學歷及英文證明審查。英文豁免須申請並符合連續四年全日制英語授課等條件，不等同持有 OSSD 即豁免。",
  "documents": "Common App 或 Coalition；學校提交正式成績及必要翻譯；教師與 counselor 各一封推薦；適用的英文與財力文件。",
  "interpretation": "適合重視在學期間職場經驗，願意主動投遞、面試及安排 Co-op 的學生。",
  "limitation": "此筆限 Boston BSCS；不能套用 Oakland 或其他入學路線。Co-op 並非保證工作。",
  "sources": [
    "https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/bscs/",
    "https://admissions.northeastern.edu/application-information/required-materials/"
  ],
  "documentChecklist": [
    "Common App 或 Coalition 申請",
    "學校提交正式高中成績單",
    "非英文成績單的正式翻譯（如適用）",
    "Teacher recommendation",
    "Counselor recommendation",
    "英文成績或核准的豁免",
    "國際生財力資料（依 portal）"
  ],
  "checked": "2026-09-14"
},
{
  "school": "Georgia Institute of Technology",
  "major": "Computer Science",
  "program": "BS Computer Science · two Threads",
  "programUrl": "https://catalog.gatech.edu/programs/computer-science-bs/",
  "curriculum": "從九個 Threads 選兩個組合，如 AI＋People、Systems＋Cybersecurity；由程式與計算理論基礎延伸。",
  "experience": "有學士研究及五年 cooperative plan，可比較一般四年與結合產業經驗的安排。",
  "requirements": "First-year 必須提交 SAT 或 ACT；AP、IB、A-level 等不能取代此項。國際生另須符合英文證明規定。",
  "documents": "可在 Common App 或 admission portal 自報 SAT／ACT；決定入學後須於 orientation 前送正式分數。其餘文件另查 first-year checklist。",
  "interpretation": "適合已能說明自己想組合哪兩個技術方向，並願意兼顧基礎與專案的學生。",
  "limitation": "Threads 是同一 CS 學位內的路線，不是兩個獨立學位；沒有同年度國際生就業率可供比較。",
  "sources": [
    "https://catalog.gatech.edu/programs/computer-science-bs/",
    "https://admission.gatech.edu/first-year/standardized-tests"
  ],
  "checked": "2026-09-14"
},
{
  "school": "UNSW Sydney",
  "major": "Computer Science",
  "program": "Bachelor of Science (Computer Science)",
  "programUrl": "https://www.unsw.edu.au/study/undergraduate/bachelor-of-computer-science",
  "curriculum": "資料結構、演算法、程式與系統；可選 AI、資料庫、網路、嵌入式系統等專修，也有其他領域 minor。",
  "experience": "可參與 ChallENG 的 Vertically Integrated Project；專題機會不能直接當成有薪實習。",
  "requirements": "列出的 assumed knowledge 為 Mathematics Extension 1；這是入學前預備知識，不能直接當作各學制的硬性先修。國際資格與英文另查。",
  "documents": "依國際生申請身分備妥學歷、成績及英文能力證明；各學制分數與授課語言豁免須用官方選單核對。",
  "interpretation": "適合想在 CS 學位內探索專修與跨領域 minor，並主動參與專題的學生。",
  "limitation": "頁面部分分數標示為 2026 參考，不能當成 2027 保證錄取門檻；未取得本課程可比雇主評價。",
  "sources": [
    "https://www.unsw.edu.au/study/undergraduate/bachelor-of-computer-science"
  ],
  "checked": "2026-09-14"
}
];
const api=window.OFFICIAL_PROGRAM_SOURCES;
for(const r of records){const key=r.school+'|'+r.major;const old=api.all[key]||{};api.all[key]={...old,status:'已核對課程重點；完整資格仍須核對',checked:r.checked,program:r.program,programUrl:r.programUrl,admissionsUrl:old.admissionsUrl||r.sources[r.sources.length-1],highlights:[r.curriculum,r.requirements],evidence:r};}
const original=api.get.bind(api);api.get=(school,major)=>api.all[school+'|'+major]||original(school,major);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
api.renderEvidence=(src)=>{const r=src?.evidence;if(!r)return '';return `<section class="course-evidence"><h3>實際課程與選校依據</h3><p>${esc(r.program)} · 查核 ${esc(r.checked)}</p><dl>${[['課程事實',r.curriculum],['實習／產業資料',r.experience],['申請條件與先修',r.requirements],['文件與額外要求',r.documents],['適合誰（本站判讀）',r.interpretation],['尚需確認／限制',r.limitation]].map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl><p>當地雇主評價：本紀錄未取得同年度、同科系、國際生的可比調查，不以校名或城市推定名次。</p>${r.sources.map((u,i)=>`<a href="${esc(u)}" target="_blank" rel="noopener">官方依據 ${i+1}</a>`).join(' · ')}</section>`;};
})();
