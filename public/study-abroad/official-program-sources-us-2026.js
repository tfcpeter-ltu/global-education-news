// Availability only: preserves existing detailed admissions evidence.
(()=>{
const extra={
  "Harvard University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Integrative Biology",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Harvard University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Harvard University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Harvard University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Harvard University|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "Harvard University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Harvard University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Harvard University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Harvard University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Harvard University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Harvard University|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Harvard University|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Engineering Sciences",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Harvard University|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater, Dance & Media",
    "programUrl": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Princeton University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Molecular Biology",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Princeton University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Princeton University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Princeton University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Princeton University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Princeton University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Princeton University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Princeton University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Princeton University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Princeton University|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Princeton University|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical and Aerospace Engineering",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Princeton University|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Princeton School of Public and International Affairs",
    "programUrl": "https://admission.princeton.edu/academics/degrees-departments",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Yale University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Ecology and Evolutionary Biology",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/ecology-evolutionary-biology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Yale University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/chemistry/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Yale University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/physics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Yale University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/mathematics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Yale University|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics and Data Science",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/statistics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "Yale University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/english-language-literature/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Yale University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/history/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Yale University|Humanities": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Humanities",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/humanities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "從文學、哲學與文化等領域探索人文問題；各校博雅課程結構不同。"
    ]
  },
  "Yale University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/sociology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Yale University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/psychology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Yale University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/economics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Yale University|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Yale University|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/mechanical-engineering/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Yale University|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater, Dance, and Performance Studies",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/theater-studies/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Yale University|Environmental Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Environmental Studies",
    "programUrl": "https://catalog.yale.edu/ycps/subjects-of-instruction/environmental-studies/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較自然科學、環境政策與跨領域研究比例，不將環境研究一律視為工程學位。"
    ]
  },
  "Brown University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://bulletin.brown.edu/the-college/concentrations/engl/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Brown University|Art & Design": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Visual Art",
    "programUrl": "https://bulletin.brown.edu/the-college/concentrations/visa/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Brown University|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theatre Arts and Performance Studies",
    "programUrl": "https://bulletin.brown.edu/the-college/concentrations/taps/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Duke University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Duke University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Duke University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Duke University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Duke University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://psychandneuro.duke.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Duke University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Duke University|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy",
    "programUrl": "https://admissions.duke.edu/academic-possibilities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Duke University|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater Studies",
    "programUrl": "https://theaterstudies.duke.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Cornell University|Agriculture": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Agricultural Sciences",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較農業、生物、環境與教育的課程組合，確認是否符合自己想研究的農業領域。"
    ]
  },
  "Cornell University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biological Sciences",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Cornell University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Cornell University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Cornell University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistical Science",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "Cornell University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Cornell University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Cornell University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Cornell University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Cornell University|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Human Development": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Development",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究個人發展及家庭、學校與社會環境；不等於臨床心理或諮商執照。"
    ]
  },
  "Cornell University|Nutrition": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nutritional Sciences",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較營養科學、食物系統與公共衛生方向；營養學學位不代表自動取得營養師資格。"
    ]
  },
  "Cornell University|Art & Design": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Fine Arts",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Cornell University|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Performing and Media Arts",
    "programUrl": "https://admissions.cornell.edu/academics/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Massachusetts Institute of Technology|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://catalog.mit.edu/schools/science/biology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Massachusetts Institute of Technology|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://catalog.mit.edu/schools/science/chemistry/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Massachusetts Institute of Technology|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://catalog.mit.edu/schools/science/physics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Massachusetts Institute of Technology|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://catalog.mit.edu/schools/science/mathematics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Massachusetts Institute of Technology|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://catalog.mit.edu/schools/humanities-arts-social-sciences/history/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Massachusetts Institute of Technology|Humanities": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Humanities",
    "programUrl": "https://catalog.mit.edu/schools/humanities-arts-social-sciences/humanities/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "從文學、哲學與文化等領域探索人文問題；各校博雅課程結構不同。"
    ]
  },
  "Massachusetts Institute of Technology|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://catalog.mit.edu/schools/humanities-arts-social-sciences/economics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Massachusetts Institute of Technology|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater Arts",
    "programUrl": "https://catalog.mit.edu/degree-charts/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Stanford University|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://majors.stanford.edu/opportunities/biology",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Stanford University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://majors.stanford.edu/opportunities/chemistry",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Stanford University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://majors.stanford.edu/opportunities/physics",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Stanford University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://majors.stanford.edu/opportunities/mathematics",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Stanford University|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://majors.stanford.edu/opportunities/english",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "Stanford University|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://majors.stanford.edu/opportunities/history",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "Stanford University|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://majors.stanford.edu/opportunities/sociology",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "Stanford University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://majors.stanford.edu/opportunities/psychology",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Stanford University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://majors.stanford.edu/opportunities/economics",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Stanford University|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication",
    "programUrl": "https://majors.stanford.edu/opportunities/communication",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Stanford University|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy",
    "programUrl": "https://majors.stanford.edu/opportunities/public-policy",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Stanford University|Art & Design": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Art Practice",
    "programUrl": "https://majors.stanford.edu/opportunities/art-practice",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "California Institute of Technology|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/biology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "California Institute of Technology|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/chemistry/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "California Institute of Technology|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/physics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "California Institute of Technology|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/mathematics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "California Institute of Technology|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/computer-science/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "California Institute of Technology|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/mechanical-engineering/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "California Institute of Technology|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Interdisciplinary Studies Program",
    "programUrl": "https://catalog.caltech.edu/current/areas-of-study-and-research/interdisciplinary-studies-program/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "University of California, Los Angeles|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=123",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "University of California, Los Angeles|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=153",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "University of California, Los Angeles|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=666",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "University of California, Los Angeles|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=540",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Los Angeles|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics and Data Science (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?id=299",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "University of California, Los Angeles|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=345",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "University of California, Los Angeles|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=429",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "University of California, Los Angeles|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=867",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "University of California, Los Angeles|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=780",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Los Angeles|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=246",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Los Angeles|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Education and Social Transformation (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?id=429",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "University of California, Los Angeles|Public Health": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Health (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?id=458",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究族群健康、預防與健康政策；公共衛生學士不等於臨床醫學學位。"
    ]
  },
  "University of California, Los Angeles|Nursing": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing - Prelicensure (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?id=309",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分四年制、先修後轉入與已有學位者的加速課程，另查臨床實習及執照資格。"
    ]
  },
  "University of California, Los Angeles|Environmental Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Environmental Science (B.S.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=0351",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較自然科學、環境政策與跨領域研究比例，不將環境研究一律視為工程學位。"
    ]
  },
  "University of California, Los Angeles|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=902",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "University of California, Los Angeles|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication (B.A.)",
    "programUrl": "https://newstudents.ucla.edu/studyarea/?type=MAJ&code=181",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, San Diego|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "General Biology BS",
    "programUrl": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "University of California, San Diego|Public Health": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Health BS",
    "programUrl": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究族群健康、預防與健康政策；公共衛生學士不等於臨床醫學學位。"
    ]
  },
  "University of California, San Diego|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science BS",
    "programUrl": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, San Diego|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering BS",
    "programUrl": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, San Diego|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Business Economics BS",
    "programUrl": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Santa Barbara|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://english.ucsb.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "University of California, Santa Barbara|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admissions.sa.ucsb.edu/majors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "University of California, Santa Barbara|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://www.chem.ucsb.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "University of California, Santa Barbara|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://ccs.ucsb.edu/majors/mathematics",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Santa Barbara|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics & Data Science",
    "programUrl": "https://www.pstat.ucsb.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "University of California, Santa Barbara|Art & Design": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Art",
    "programUrl": "https://www.arts.ucsb.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of California, Santa Barbara|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Theater",
    "programUrl": "https://www.theaterdance.ucsb.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "University of Illinois Urbana-Champaign|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology, BSLAS",
    "programUrl": "https://catalog.illinois.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Illinois Urbana-Champaign|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary Education, BS",
    "programUrl": "https://catalog.illinois.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "University of Wisconsin-Madison|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary Education, BSE",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "University of Wisconsin-Madison|Human Development": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Development and Family Studies, BS",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究個人發展及家庭、學校與社會環境；不等於臨床心理或諮商執照。"
    ]
  },
  "University of Wisconsin-Madison|Social Work": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Social Work, BSW",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "關注社會福利、服務與實務訓練；專業認證、實習與執業資格須逐地區確認。"
    ]
  },
  "University of Wisconsin-Madison|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy, BA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "University of Wisconsin-Madison|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics, BS",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "University of Wisconsin-Madison|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics, BS",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Wisconsin-Madison|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics, BS",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "University of Wisconsin-Madison|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry, BS",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "University of Wisconsin-Madison|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology, BA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "University of Wisconsin-Madison|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History, BA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "University of Wisconsin-Madison|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology, BA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Wisconsin-Madison|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication Arts, BA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Wisconsin-Madison|Journalism": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Journalism, JBA",
    "programUrl": "https://guide.wisc.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Washington|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology",
    "programUrl": "https://admit.washington.edu/majors/biology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "University of Washington|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Education, Communities & Organizations",
    "programUrl": "https://admit.washington.edu/majors/education-communities-organizations/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "University of Washington|Public Health": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Health – Global Health",
    "programUrl": "https://admit.washington.edu/majors/public-health/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究族群健康、預防與健康政策；公共衛生學士不等於臨床醫學學位。"
    ]
  },
  "University of Washington|Nutrition": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Food Systems, Nutrition, & Health",
    "programUrl": "https://admit.washington.edu/majors/food-systems-nutrition-health/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較營養科學、食物系統與公共衛生方向；營養學學位不代表自動取得營養師資格。",
      "本項為 Food Systems, Nutrition, & Health；不是單一臨床營養師培訓路線。"
    ]
  },
  "University of Washington|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Service & Policy",
    "programUrl": "https://admit.washington.edu/majors/public-service-policy/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "University of Washington|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics",
    "programUrl": "https://admit.washington.edu/majors/statistics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "University of Washington|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://admit.washington.edu/majors/mathematics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Washington|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admit.washington.edu/majors/physics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "University of Washington|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://admit.washington.edu/majors/chemistry/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "University of Washington|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://admit.washington.edu/majors/sociology/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "University of Washington|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://admit.washington.edu/majors/history/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "University of Washington|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://admit.washington.edu/majors/computer-science/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Washington|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://admit.washington.edu/majors/economics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Washington|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication",
    "programUrl": "https://admit.washington.edu/majors/communication/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Texas at Austin|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Texas at Austin|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "University of Texas at Austin|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "University of Texas at Austin|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "University of Texas at Austin|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "University of Texas at Austin|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "University of Texas at Austin|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Texas at Austin|Computer Science": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Computer Science",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Texas at Austin|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Texas at Austin|Social Work": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Social Work",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "關注社會福利、服務與實務訓練；專業認證、實習與執業資格須逐地區確認。"
    ]
  },
  "University of Texas at Austin|Human Development": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Development and Family Sciences",
    "programUrl": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究個人發展及家庭、學校與社會環境；不等於臨床心理或諮商執照。"
    ]
  },
  "University of North Carolina at Chapel Hill|Public Health": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Community and Global Public Health Major, B.S.P.H.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究族群健康、預防與健康政策；公共衛生學士不等於臨床醫學學位。"
    ]
  },
  "University of North Carolina at Chapel Hill|Nursing": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing Major, B.S.N.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分四年制、先修後轉入與已有學位者的加速課程，另查臨床實習及執照資格。"
    ]
  },
  "University of North Carolina at Chapel Hill|Nutrition": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nutrition Major, B.S.P.H.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較營養科學、食物系統與公共衛生方向；營養學學位不代表自動取得營養師資格。"
    ]
  },
  "University of North Carolina at Chapel Hill|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "University of North Carolina at Chapel Hill|Human Development": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Development and Family Science Major, B.A.Ed.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究個人發展及家庭、學校與社會環境；不等於臨床心理或諮商執照。"
    ]
  },
  "University of North Carolina at Chapel Hill|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Interdisciplinary Studies Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "University of North Carolina at Chapel Hill|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English and Comparative Literature Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "University of North Carolina at Chapel Hill|Sociology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Sociology Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以社會制度、人群與不平等為研究對象，需比較量化、質性與田野方法。"
    ]
  },
  "University of North Carolina at Chapel Hill|History": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "History Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較歷史時期、地區與史料研究方法，留意閱讀與論證寫作要求。"
    ]
  },
  "University of North Carolina at Chapel Hill|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of North Carolina at Chapel Hill|Kinesiology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Exercise and Sport Science Major, B.A.",
    "programUrl": "https://catalog.unc.edu/undergraduate/programs-study/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究運動、人體活動與健康，與運動管理、物理治療的學位及專業路徑不同。"
    ]
  },
  "North Carolina State University|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Interdisciplinary Studies (BA): Self Design Concentration",
    "programUrl": "https://catalog.ncsu.edu/undergraduate/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "University of Florida|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Interdisciplinary Studies | CLAS",
    "programUrl": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/IDS_BA_BS/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "Ohio State University, Columbus|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Education–Special Education",
    "programUrl": "https://undergrad.osu.edu/majors-and-academics/majors-by-college",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "Indiana University Bloomington|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary Education",
    "programUrl": "https://careerexploration.indiana.edu/majors/education-elementary",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "Florida State University|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary Education",
    "programUrl": "https://registrar.fsu.edu/bulletin/undergraduate-departments/teacher-education",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。",
      "官方師資培育包含學士／碩士銜接；須依具體方向確認後續學位及教師資格要求。"
    ]
  },
  "University of Notre Dame|English": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "English",
    "programUrl": "https://www.nd.edu/academics/undergraduate-programs/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "重視英語文學閱讀、文本分析與寫作，並非以英語會話訓練為主的語言課程。"
    ]
  },
  "University of Notre Dame|Humanities": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Program of Liberal Studies",
    "programUrl": "https://pls.nd.edu/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "從文學、哲學與文化等領域探索人文問題；各校博雅課程結構不同。"
    ]
  },
  "University of Notre Dame|Art & Design": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Studio Art",
    "programUrl": "https://www.nd.edu/academics/undergraduate-programs/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Notre Dame|Theatre": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Film Television and Theatre",
    "programUrl": "https://ftt.nd.edu/academics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較戲劇研究、表演與製作方向；學術型 BA 與專業表演訓練不能混為一談。"
    ]
  },
  "Northwestern University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Engineering": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mechanical Engineering",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Journalism": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Journalism",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Communication": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Communication Studies",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Human Development": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Human Development in Context",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究個人發展及家庭、學校與社會環境；不等於臨床心理或諮商執照。"
    ]
  },
  "Northwestern University|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Social Policy",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Northwestern University|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Integrated Science Program",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "Northwestern University|Physics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Physics",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究物質、能量與自然規律，需比較數學基礎、實驗及理論課程。"
    ]
  },
  "Northwestern University|Chemistry": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Chemistry",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以物質、反應與實驗分析為核心，選校時比較實驗課、化學分支與安全訓練。"
    ]
  },
  "Northwestern University|Mathematics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Mathematics",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "Northwestern University|Statistics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Statistics",
    "programUrl": "https://admissions.northwestern.edu/academics/majors-minors/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "以機率、資料分析與推論為核心；注意統計、數學、資料科學的課程組合差異。"
    ]
  },
  "Carnegie Mellon University|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology, B.A./B.S.",
    "programUrl": "https://coursecatalog.web.cmu.edu/degreesoffered/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Pennsylvania|Criminology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "BA in Criminology",
    "programUrl": "https://crim.sas.upenn.edu/apply/prospective-undergraduate-students",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究犯罪、司法與社會因素；犯罪學學位不等於警察、消防或法律執業訓練。"
    ]
  },
  "Columbia University|Economics": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Economics major",
    "programUrl": "https://econ.columbia.edu/undergraduate/the-program/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "The University of Chicago|Public Policy": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Policy Studies BA",
    "programUrl": "https://collegecatalog.uchicago.edu/thecollege/publicpolicystudies/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "聚焦政策分析與公共議題，注意各校的經濟、統計與社會科學要求。"
    ]
  },
  "Johns Hopkins University|Public Health": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Public Health Studies BA",
    "programUrl": "https://krieger.jhu.edu/publichealth/academics/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "研究族群健康、預防與健康政策；公共衛生學士不等於臨床醫學學位。"
    ]
  },
  "Washington University in St Louis|Biology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Biology major",
    "programUrl": "https://biology.washu.edu/biology-major-requirements-related-programs",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較分子、細胞、生態與演化方向，確認實驗課及研究訓練；生物學並非醫師資格課程。"
    ]
  },
  "Vanderbilt University|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary or Secondary Education (B.S.)",
    "programUrl": "https://peabody.vanderbilt.edu/academics/undergraduate-majors/elementary-secondary-education/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "University of Minnesota Twin Cities|Psychology": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Psychology BA / BS",
    "programUrl": "https://cla.umn.edu/psychology/undergraduate/majors-minors",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Massachusetts Amherst|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "BA in Community Education & Social Change",
    "programUrl": "https://www.umass.edu/education/academics/ba-community-education-social-change/program-study-0",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "Michigan State University|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary Education BA",
    "programUrl": "https://reg.msu.edu/AcademicPrograms/ProgramDetail.aspx?PType=UGRD&Program=ELEMED_BA1",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "New York University|Nursing": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Nursing BS (Traditional 4-Year)",
    "programUrl": "https://bulletins.nyu.edu/undergraduate/nursing/programs/nursing-traditional-4-year-bs/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分四年制、先修後轉入與已有學位者的加速課程，另查臨床實習及執照資格。"
    ]
  },
  "University of Southern California|Health Sciences": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Health Promotion and Disease Prevention BS",
    "programUrl": "https://keck.usc.edu/pphs/education/bachelor-of-science/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。"
    ]
  },
  "University of Arizona|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Bachelor of Interdisciplinary Studies",
    "programUrl": "https://ids.arizona.edu/undergraduate/current-students/degree-information",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "Arizona State University (Tempe)|Interdisciplinary Studies": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Interdisciplinary Studies BA — Tempe",
    "programUrl": "https://degrees.asu.edu/bachelors/major-list/interest-area/10",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "檢查跨領域組合與自行設計主修的審核規則；有跨領域研究排名不代表有同名學士主修。"
    ]
  },
  "Pennsylvania State University, University Park|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Elementary and Early Childhood Education BS — University Park",
    "programUrl": "https://bulletins.psu.edu/undergraduate/colleges/education/elementary-early-childhood-education-bs/elementary-early-childhood-education-bs_suggestedacademicplantext.pdf",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "Boston College|Education": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Transformative Educational Studies BA",
    "programUrl": "https://www.bc.edu/bc-web/schools/lynch-school/academics/undergraduate/transformative-educational-studies.html",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分教育研究、社區教育與教師培育；教師證照、實習與國際學生資格須另行確認。"
    ]
  },
  "Emory University|Nursing": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Traditional Bachelor of Science in Nursing",
    "programUrl": "https://www.nursing.emory.edu/degrees-programs/nursing/traditional-bachelor-science-nursing",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "區分四年制、先修後轉入與已有學位者的加速課程，另查臨床實習及執照資格。",
      "先在 Emory College 或 Oxford College 完成前兩年先修，再依條件轉入護理學院。"
    ]
  },
  "University of California, Davis|Agriculture": {
    "status": "已核對官方學士科系",
    "checked": "2026-09-15",
    "verificationScope": "program-availability",
    "program": "Agricultural & Environmental Education BS",
    "programUrl": "https://catalog.ucdavis.edu/departments-programs-degrees/animal-science/agricultural-environmental-education-bs/",
    "highlights": [
      "已確認官方列有此學士主修／學程；招生資格、名額、期限與費用仍須另查。",
      "比較農業、生物、環境與教育的課程組合，確認是否符合自己想研究的農業領域。"
    ]
  }
};
const base=window.OFFICIAL_PROGRAM_SOURCES||{all:{}};const all={...extra,...(base.all||{})};
window.OFFICIAL_PROGRAM_SOURCES={...base,all,get(school,major){return base.get?.(school,major)||all[school+"|"+major]||null;}};
})();
