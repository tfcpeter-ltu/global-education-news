(()=>{
const extra={
  "McGill University|Computer Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science BSc",
    "programUrl": "https://www.cs.mcgill.ca/academic/undergrad/bsc/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較程式設計、演算法與軟體系統課程。"
    ]
  },
  "Université de Montréal|Computer Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Baccalauréat en informatique",
    "programUrl": "https://admission.umontreal.ca/programmes/baccalaureat-en-informatique/description/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較程式設計、演算法與軟體系統課程。",
      "授課與法語要求須依校方規定確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "資料科學／AI 在此列為資訊學士內的課程方向，不另宣稱有同名獨立學士主修。"
    ]
  },
  "McMaster University|Computer Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較程式設計、演算法與軟體系統課程。"
    ]
  },
  "McMaster University|Engineering": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Engineering 學士課程",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "機械、土木、電機與軟體工程的課程及認證不同，先選定工程分支。"
    ]
  },
  "Polytechnique Montréal|Engineering": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Engineering 學士課程",
    "programUrl": "https://www.polymtl.ca/futur/bac/programmes",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "機械、土木、電機與軟體工程的課程及認證不同，先選定工程分支。"
    ]
  },
  "Western University|Business": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Ivey HBA",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "programKind": "second-entry",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分商學院、商業主修及專修方向，確認入學後分流規則。",
      "Ivey HBA 與高中申請的 AEO 身分需分清；先完成大學前期課程並滿足後續條件。"
    ]
  },
  "HEC Montréal|Business": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Business Administration",
    "programUrl": "https://www.hec.ca/en/programs/bachelors",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分商學院、商業主修及專修方向，確認入學後分流規則。",
      "依國際學歷確認預備年、語言及入學要求。"
    ]
  },
  "McMaster University|Business": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Business / Commerce 學士課程",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分商學院、商業主修及專修方向，確認入學後分流規則。"
    ]
  },
  "University of Toronto|Data Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Data Science HBSc Specialist",
    "programUrl": "https://future.utoronto.ca/program/data-science",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。"
    ]
  },
  "University of Waterloo|Data Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Data Science BCS / BMath",
    "programUrl": "https://uwaterloo.ca/future-students/programs/data-science",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "需依原入學學程及校內選讀規則申請。"
    ]
  },
  "McGill University|Statistics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Joint Honours Statistics and Computer Science",
    "programUrl": "https://www.cs.mcgill.ca/academic/undergrad/bsc/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "以統計與資訊聯合學程收錄，不以 AI 研究聲望推定獨立資料科學學位。"
    ]
  },
  "University of Alberta|Data Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Data Science — Statistics Option",
    "programUrl": "https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-data-science-statistics-option.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。"
    ]
  },
  "University of British Columbia|Data Science": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Data Science Major — Vancouver",
    "programUrl": "https://datascience.ubc.ca/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "主修與輔修的入學／校內選讀條件不同，請先確認所選校區。"
    ]
  },
  "McMaster University|Mathematics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics & Statistics Gateway",
    "programUrl": "https://math.mcmaster.ca/undergraduate/prospective-students/",
    "programKind": "gateway",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "數學與統計入學途徑，可進一步研究資料分析課程；不等於獨立 AI 學位。"
    ]
  },
  "Queen’s University|AI": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computing — Artificial Intelligence sub-plan",
    "programUrl": "https://www.cs.queensu.ca/undergraduate/programs/sub-plans/artificial-intelligence.php",
    "programKind": "option",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "AI 為 Computing 內的專修方向，需核對校內選讀規則。"
    ]
  },
  "Toronto Metropolitan University|Mathematics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics and Its Applications BSc (Honours)",
    "programUrl": "https://www.torontomu.ca/calendar/2026-2027/programs/science/mathematics/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較統計、數學與資訊基礎，區分獨立主修、專修與研究方向。",
      "以數學與應用學士收錄；不要把資料科學職涯方向或研究所課程當成同名學士。"
    ]
  },
  "University of Toronto|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Science in Nursing — 先修後入學",
    "programUrl": "https://bloomberg.nursing.utoronto.ca/learn-with-us/bachelor-of-science-in-nursing/",
    "programKind": "second-entry",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "此為加速、先修後入學課程，不能視為高中畢業直接入讀的兩年制學位；須另查大學先修與申請資格。"
    ]
  },
  "University of British Columbia|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Science in Nursing — Okanagan",
    "programUrl": "https://nursing.ok.ubc.ca/undergraduate/nursing/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "此處收錄 Okanagan 四年制課程。Vancouver 的先修後入學 BSN 不接受一般國際學生；兩校區不可混用。"
    ],
    "restrictionSource": "https://macisaacnursing.ubc.ca/bsn-admission-requirements"
  },
  "McMaster University|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing 學士課程",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。"
    ]
  },
  "McGill University|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Science in Nursing (BScN)",
    "programUrl": "https://www.mcgill.ca/nursing/programs/bachelor-programs/bscn",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "請核對臨床實習、語言與國際生規定；勿與供既有護理資格者修讀的 BNI 混淆。"
    ]
  },
  "University of Alberta|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Science in Nursing",
    "programUrl": "https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-nursing-nursing.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "基礎護理學位與 After Degree 為不同途徑；實際校址、語言及國際生資格另查。"
    ]
  },
  "Western University|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing 學士課程",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。"
    ]
  },
  "Queen’s University|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Nursing Science — 4-Year Track",
    "programUrl": "https://www.queensu.ca/academic-calendar/nursing/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "四年制與 Accelerated Standing Track 是不同途徑。"
    ]
  },
  "University of Calgary|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Science in Nursing (BScN)",
    "programUrl": "https://nursing.ucalgary.ca/future-students/undergraduate/routes/BScN",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。",
      "請核對當年度入學途徑與甄選制度，不沿用舊 BN 入學資訊。"
    ]
  },
  "University of Ottawa|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing 學士課程",
    "programUrl": "https://catalogue.uottawa.ca/en/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。"
    ]
  },
  "Dalhousie University|Nursing": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing 學士課程",
    "programUrl": "https://www.dal.ca/study/programs/undergraduate/nursing-bscn.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "申請前另核對國際生資格、先修、語言、臨床實習與執照規定。"
    ]
  },
  "McMaster University|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Sciences 學士課程",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "University of Toronto|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Biology: Health and Disease — St. George",
    "programUrl": "https://www.utoronto.ca/academics/undergraduate-programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。",
      "健康科學為本站學科分類，校方主修名稱為 Human Biology: Health and Disease；不是醫學士或醫師資格課程。"
    ]
  },
  "Queen’s University|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Health Sciences",
    "programUrl": "https://www.queensu.ca/academic-calendar/health-sciences/bhsc/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "Western University|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Sciences 學士課程",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "University of British Columbia|Kinesiology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Health and Exercise Sciences — Okanagan",
    "programUrl": "https://hes.ok.ubc.ca/undergraduate/bachelor-of-health-and-exercise-sciences/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。",
      "校方學位為健康與運動科學，歸入運動科學；不是檔案泛稱的 Bachelor of Health Sciences。"
    ]
  },
  "University of Ottawa|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Sciences 學士課程",
    "programUrl": "https://catalogue.uottawa.ca/en/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "McGill University|Biomedical Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Anatomy and Cell Biology Major",
    "programUrl": "https://www.mcgill.ca/anatomy/undergraduate/programs/major",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。",
      "以解剖與細胞生物學主修對應生物醫學分類；不等於醫學院錄取資格。"
    ]
  },
  "University of Waterloo|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Sciences 學士課程",
    "programUrl": "https://uwaterloo.ca/future-students/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "University of Calgary|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Sciences 學士課程",
    "programUrl": "https://www.ucalgary.ca/future-students/undergraduate/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。"
    ]
  },
  "University of Alberta|Health Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Health Sciences",
    "programUrl": "https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-health-sciences.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "健康科學與醫學預備並不保證升讀醫學院或取得醫師資格。",
      "新課程須依當年度招生公告確認入學梯次與國際資格；不沿用檔案中的舊課程名稱。"
    ]
  },
  "University of Toronto|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology / Life Sciences 學士課程",
    "programUrl": "https://www.utoronto.ca/academics/undergraduate-programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "University of British Columbia|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology BSc — Vancouver",
    "programUrl": "https://you.ubc.ca/programs/biology-vancouver/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "McGill University|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology Major",
    "programUrl": "https://www.mcgill.ca/biology/undergraduate/undergraduate-programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "McMaster University|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Life Sciences Gateway",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "gateway",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。",
      "先修生命科學入門課程，再依條件選擇後續主修。"
    ]
  },
  "University of Alberta|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biological Sciences Major",
    "programUrl": "https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-biological-sciences.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "Queen’s University|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://www.queensu.ca/artsci/programs-and-degrees",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "Western University|Biomedical Sciences": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Medical Sciences",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/medical-sciences.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。",
      "生物醫學學士並非醫師資格課程；各專修與升讀要求另查。"
    ]
  },
  "University of Waterloo|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology / Life Sciences 學士課程",
    "programUrl": "https://uwaterloo.ca/future-students/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "University of Calgary|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology / Life Sciences 學士課程",
    "programUrl": "https://www.ucalgary.ca/future-students/undergraduate/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "University of Ottawa|Biology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology / Life Sciences 學士課程",
    "programUrl": "https://catalogue.uottawa.ca/en/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "比較分子、細胞、生態與生命科學課程及實驗訓練。"
    ]
  },
  "University of Waterloo|Psychology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://uwaterloo.ca/future-students/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "心理學學士不等於臨床心理師資格，專業執業需另查。"
    ]
  },
  "McMaster University|Psychology": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology, Neuroscience & Behaviour",
    "programUrl": "https://pnb.mcmaster.ca/undergraduate/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "心理學學士不等於臨床心理師資格，專業執業需另查。",
      "確認第一年入學途徑及後續主修甄選，不能把研究方向當作保證分發。"
    ]
  },
  "Western University|Economics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "經濟學與金融是不同主修，依實際學程比較，不以分類名稱推定兩者均開設。"
    ]
  },
  "University of Waterloo|Economics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://uwaterloo.ca/future-students/programs",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "經濟學與金融是不同主修，依實際學程比較，不以分類名稱推定兩者均開設。"
    ]
  },
  "McMaster University|Economics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://future.mcmaster.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "經濟學與金融是不同主修，依實際學程比較，不以分類名稱推定兩者均開設。"
    ]
  },
  "Simon Fraser University|Economics": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://www.sfu.ca/students/admission/programs/a-z.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "經濟學與金融是不同主修，依實際學程比較，不以分類名稱推定兩者均開設。"
    ]
  },
  "Toronto Metropolitan University|Journalism": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Journalism BA",
    "programUrl": "https://www.torontomu.ca/programs/undergraduate/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。",
      "新聞學與專業傳播為不同課程，依官方課程名稱選擇。"
    ]
  },
  "Carleton University|Journalism": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Journalism",
    "programUrl": "https://admissions.carleton.ca/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。"
    ]
  },
  "University of British Columbia|Communication": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Media Studies — Vancouver",
    "programUrl": "https://you.ubc.ca/programs/media-studies/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。",
      "媒體研究學士，不等於新聞學研究所。"
    ]
  },
  "Western University|Communication": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Media, Information & Technoculture",
    "programUrl": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。"
    ]
  },
  "McGill University|Communication": {
    "status": "已核對官方輔修",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication Studies Minor — 輔修",
    "programUrl": "https://www.mcgill.ca/ahcs/undergraduate/cs",
    "programKind": "minor",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。",
      "此項是輔修，需搭配其他主修；不是獨立傳播學士主修。"
    ]
  },
  "Concordia University|Communication": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication",
    "programUrl": "https://www.concordia.ca/academics/undergraduate.html",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。"
    ]
  },
  "University of Ottawa|Communication": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication",
    "programUrl": "https://catalogue.uottawa.ca/en/programs/",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。"
    ]
  },
  "Queen’s University|Communication": {
    "status": "已核對官方學程",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Film and Media — BA",
    "programUrl": "https://www.queensu.ca/filmandmedia/undergraduate/undergraduate-program-overview",
    "programKind": "major",
    "highlights": [
      "核對範圍為學程開設與類型；費用、名額、期限及個人申請資格仍須逐項確認。",
      "區分新聞採訪、媒體研究、影視製作與傳播輔修。",
      "歸入傳播／媒體領域；實際課程涵蓋影視理論、歷史與媒體製作。"
    ]
  }
};
const base=window.OFFICIAL_PROGRAM_SOURCES||{all:{}};const all={...extra,...(base.all||{})};
window.OFFICIAL_PROGRAM_SOURCES={...base,all,get(school,major){return base.get?.(school,major)||all[school+"|"+major]||null;}};
})();
