// Official undergraduate program availability; source audit: docs/data-imports/us-majors-2026.json
(()=>{
const rows=[
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Harvard University",
    "nameZh": "哈佛大學",
    "aliases": [],
    "city": "Cambridge, Massachusetts",
    "url": "https://college.harvard.edu/academics/liberal-arts-sciences/concentrations",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Statistics",
      "English",
      "History",
      "Sociology",
      "Psychology",
      "Economics",
      "Computer Science",
      "Engineering",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Princeton University",
    "nameZh": "普林斯頓大學",
    "aliases": [],
    "city": "Princeton, New Jersey",
    "url": "https://admission.princeton.edu/academics/degrees-departments",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "English",
      "History",
      "Sociology",
      "Psychology",
      "Economics",
      "Computer Science",
      "Engineering",
      "Public Policy"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Yale University",
    "nameZh": "耶魯大學",
    "aliases": [],
    "city": "New Haven, Connecticut",
    "url": "https://catalog.yale.edu/ycps/majors-by-disciplines/",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Statistics",
      "English",
      "History",
      "Humanities",
      "Sociology",
      "Psychology",
      "Economics",
      "Computer Science",
      "Engineering",
      "Theatre",
      "Environmental Science"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Brown University",
    "nameZh": "布朗大學",
    "aliases": [],
    "city": "Providence, Rhode Island",
    "url": "https://bulletin.brown.edu/the-college/concentrations/",
    "majors": [
      "English",
      "Art & Design",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Duke University",
    "nameZh": "杜克大學",
    "aliases": [],
    "city": "Durham, North Carolina",
    "url": "https://admissions.duke.edu/academic-possibilities/",
    "majors": [
      "Biology",
      "English",
      "History",
      "Sociology",
      "Psychology",
      "Economics",
      "Public Policy",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Cornell University",
    "nameZh": "康乃爾大學",
    "aliases": [],
    "city": "Ithaca, New York",
    "url": "https://admissions.cornell.edu/academics/majors",
    "majors": [
      "Agriculture",
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Statistics",
      "English",
      "History",
      "Sociology",
      "Economics",
      "Computer Science",
      "Engineering",
      "Public Policy",
      "Communication",
      "Human Development",
      "Nutrition",
      "Art & Design",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Massachusetts Institute of Technology",
    "nameZh": "麻省理工學院",
    "aliases": [],
    "city": "Cambridge, Massachusetts",
    "url": "https://catalog.mit.edu/degree-charts/",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "History",
      "Humanities",
      "Economics",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Stanford University",
    "nameZh": "史丹佛大學",
    "aliases": [],
    "city": "Stanford, California",
    "url": "https://majors.stanford.edu/majors",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "English",
      "History",
      "Sociology",
      "Psychology",
      "Economics",
      "Communication",
      "Public Policy",
      "Art & Design"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "California Institute of Technology",
    "nameZh": "加州理工學院",
    "aliases": [],
    "city": "Pasadena, California",
    "url": "https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Computer Science",
      "Engineering",
      "Interdisciplinary Studies"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of California, Los Angeles",
    "nameZh": "加州大學洛杉磯分校",
    "aliases": [],
    "city": "Los Angeles, California",
    "url": "https://admission.ucla.edu/apply/majors",
    "majors": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Statistics",
      "English",
      "History",
      "Sociology",
      "Psychology",
      "Economics",
      "Education",
      "Public Health",
      "Nursing",
      "Environmental Science",
      "Theatre",
      "Communication"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of California, San Diego",
    "nameZh": "加州大學聖地牙哥分校",
    "aliases": [],
    "city": "La Jolla, California",
    "url": "https://catalog.ucsd.edu/undergraduate/degrees-offered/index.html",
    "majors": [
      "Biology",
      "Public Health",
      "Computer Science",
      "Engineering",
      "Economics"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of California, Santa Barbara",
    "nameZh": "加州大學聖塔芭芭拉分校",
    "aliases": [],
    "city": "Santa Barbara, California",
    "url": "https://admissions.sa.ucsb.edu/majors",
    "majors": [
      "English",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Statistics",
      "Art & Design",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Illinois Urbana-Champaign",
    "nameZh": "伊利諾大學香檳分校",
    "aliases": [
      "University of Illinois at Urbana-Champaign"
    ],
    "city": "Urbana-Champaign, Illinois",
    "url": "https://catalog.illinois.edu/undergraduate/",
    "majors": [
      "Psychology",
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Wisconsin-Madison",
    "nameZh": "威斯康辛大學麥迪遜分校",
    "aliases": [],
    "city": "Madison, Wisconsin",
    "url": "https://guide.wisc.edu/undergraduate/",
    "majors": [
      "Education",
      "Human Development",
      "Social Work",
      "Public Policy",
      "Statistics",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Sociology",
      "History",
      "Psychology",
      "Communication",
      "Journalism"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Washington",
    "nameZh": "華盛頓大學",
    "aliases": [],
    "city": "Seattle, Washington",
    "url": "https://admit.washington.edu/academics/majors/",
    "majors": [
      "Biology",
      "Education",
      "Public Health",
      "Nutrition",
      "Public Policy",
      "Statistics",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Sociology",
      "History",
      "Computer Science",
      "Economics",
      "Communication"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Texas at Austin",
    "nameZh": "德州大學奧斯汀分校",
    "aliases": [],
    "city": "Austin, Texas",
    "url": "https://admissions.utexas.edu/explore/colleges-degrees/",
    "majors": [
      "Psychology",
      "History",
      "English",
      "Sociology",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "Engineering",
      "Social Work",
      "Human Development"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of North Carolina at Chapel Hill",
    "nameZh": "北卡羅來納大學教堂山分校",
    "aliases": [],
    "city": "Chapel Hill, North Carolina",
    "url": "https://catalog.unc.edu/undergraduate/programs-study/",
    "majors": [
      "Public Health",
      "Nursing",
      "Nutrition",
      "Public Policy",
      "Human Development",
      "Interdisciplinary Studies",
      "English",
      "Sociology",
      "History",
      "Psychology",
      "Kinesiology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "North Carolina State University",
    "nameZh": "北卡羅來納州立大學",
    "aliases": [],
    "city": "Raleigh, North Carolina",
    "url": "https://catalog.ncsu.edu/undergraduate/",
    "majors": [
      "Interdisciplinary Studies"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Florida",
    "nameZh": "佛羅里達大學",
    "aliases": [],
    "city": "Gainesville, Florida",
    "url": "https://catalog.ufl.edu/UGRD/programs/",
    "majors": [
      "Interdisciplinary Studies"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Ohio State University, Columbus",
    "nameZh": "俄亥俄州立大學主校區",
    "aliases": [
      "Ohio State University (Main campus)"
    ],
    "city": "Columbus, Ohio",
    "url": "https://undergrad.osu.edu/majors-and-academics/majors-by-college",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Indiana University Bloomington",
    "nameZh": "印第安納大學",
    "aliases": [
      "Indiana University"
    ],
    "city": "Bloomington, Indiana",
    "url": "https://careerexploration.indiana.edu/majors/education-elementary",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Florida State University",
    "nameZh": "佛羅里達州立大學",
    "aliases": [],
    "city": "Tallahassee, Florida",
    "url": "https://registrar.fsu.edu/bulletin/undergraduate-departments/teacher-education",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Notre Dame",
    "nameZh": "聖母大學",
    "aliases": [],
    "city": "Notre Dame, Indiana",
    "url": "https://www.nd.edu/academics/undergraduate-programs/",
    "majors": [
      "English",
      "Humanities",
      "Art & Design",
      "Theatre"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Northwestern University",
    "nameZh": "西北大學",
    "aliases": [],
    "city": "Evanston, Illinois",
    "url": "https://admissions.northwestern.edu/academics/majors-minors/",
    "majors": [
      "Psychology",
      "Economics",
      "Engineering",
      "Journalism",
      "Communication",
      "Human Development",
      "Public Policy",
      "Interdisciplinary Studies",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Statistics"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Carnegie Mellon University",
    "nameZh": "卡內基美隆大學",
    "aliases": [],
    "city": "Pittsburgh, Pennsylvania",
    "url": "https://coursecatalog.web.cmu.edu/degreesoffered/",
    "majors": [
      "Psychology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Pennsylvania",
    "nameZh": "賓夕法尼亞大學",
    "aliases": [],
    "city": "Philadelphia, Pennsylvania",
    "url": "https://crim.sas.upenn.edu/apply/prospective-undergraduate-students",
    "majors": [
      "Criminology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Columbia University",
    "nameZh": "哥倫比亞大學",
    "aliases": [],
    "city": "New York, New York",
    "url": "https://econ.columbia.edu/undergraduate/the-program/",
    "majors": [
      "Economics"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "The University of Chicago",
    "nameZh": "芝加哥大學",
    "aliases": [],
    "city": "Chicago, Illinois",
    "url": "https://collegecatalog.uchicago.edu/thecollege/publicpolicystudies/",
    "majors": [
      "Public Policy"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Johns Hopkins University",
    "nameZh": "約翰霍普金斯大學",
    "aliases": [],
    "city": "Baltimore, Maryland",
    "url": "https://krieger.jhu.edu/publichealth/academics/",
    "majors": [
      "Public Health"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Washington University in St Louis",
    "nameZh": "聖路易華盛頓大學",
    "aliases": [],
    "city": "St. Louis, Missouri",
    "url": "https://biology.washu.edu/undergraduate-program",
    "majors": [
      "Biology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Vanderbilt University",
    "nameZh": "范德堡大學",
    "aliases": [],
    "city": "Nashville, Tennessee",
    "url": "https://peabody.vanderbilt.edu/academics/undergraduate-majors/elementary-secondary-education/",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Minnesota Twin Cities",
    "nameZh": "明尼蘇達大學",
    "aliases": [
      "University of Minnesota"
    ],
    "city": "Minneapolis–Saint Paul, Minnesota",
    "url": "https://cla.umn.edu/psychology/undergraduate/majors-minors",
    "majors": [
      "Psychology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Massachusetts Amherst",
    "nameZh": "麻薩諸塞大學",
    "aliases": [
      "University of Massachusetts"
    ],
    "city": "Amherst, Massachusetts",
    "url": "https://www.umass.edu/education/academics/ba-community-education-social-change/program-study-0",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Michigan State University",
    "nameZh": "密西根州立大學",
    "aliases": [],
    "city": "East Lansing, Michigan",
    "url": "https://reg.msu.edu/AcademicPrograms/ProgramDetail.aspx?PType=UGRD&Program=ELEMED_BA1",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "New York University",
    "nameZh": "紐約大學",
    "aliases": [],
    "city": "New York, New York",
    "url": "https://bulletins.nyu.edu/undergraduate/nursing/programs/nursing-traditional-4-year-bs/",
    "majors": [
      "Nursing"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Southern California",
    "nameZh": "南加州大學",
    "aliases": [],
    "city": "Los Angeles, California",
    "url": "https://keck.usc.edu/pphs/education/bachelor-of-science/",
    "majors": [
      "Health Sciences"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": false,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of Arizona",
    "nameZh": "亞利桑那大學",
    "aliases": [],
    "city": "Tucson, Arizona",
    "url": "https://ids.arizona.edu/undergraduate/current-students/degree-information",
    "majors": [
      "Interdisciplinary Studies"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Arizona State University (Tempe)",
    "nameZh": "亞利桑那州立大學坦佩校區",
    "aliases": [],
    "city": "Tempe, Arizona",
    "url": "https://degrees.asu.edu/bachelors/major-list/interest-area/10",
    "majors": [
      "Interdisciplinary Studies"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Pennsylvania State University, University Park",
    "nameZh": "賓州州立大學主校區",
    "aliases": [
      "Penn State (Main campus)"
    ],
    "city": "University Park, Pennsylvania",
    "url": "https://bulletins.psu.edu/undergraduate/colleges/education/elementary-early-childhood-education-bs/elementary-early-childhood-education-bs_suggestedacademicplantext.pdf",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Boston College",
    "nameZh": "波士頓學院",
    "aliases": [],
    "city": "Chestnut Hill, Massachusetts",
    "url": "https://www.bc.edu/bc-web/schools/lynch-school/academics/undergraduate/transformative-educational-studies.html",
    "majors": [
      "Education"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "Emory University",
    "nameZh": "埃默里大學",
    "aliases": [],
    "city": "Atlanta, Georgia",
    "url": "https://www.nursing.emory.edu/degrees-programs/nursing/traditional-bachelor-science-nursing",
    "majors": [
      "Nursing"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  },
  {
    "country": "us",
    "countryLabel": "美國",
    "name": "University of California, Davis",
    "nameZh": "加州大學戴維斯分校",
    "aliases": [],
    "city": "Davis, California",
    "url": "https://catalog.ucdavis.edu/departments-programs-degrees/animal-science/agricultural-environmental-education-bs/",
    "majors": [
      "Agriculture"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "已整理官方學士科系，可從主修內容與課程結構開始比較。",
    "apply": "依校方當年度國際生與學士招生規定申請；本次核對範圍為科系開設，未以排名推定錄取難度。"
  }
];
window.STUDY_MAJOR_LABELS={"Biology": "生物學", "Chemistry": "化學", "Physics": "物理學", "Statistics": "統計學", "English": "英語文學", "History": "歷史學", "Sociology": "社會學", "Humanities": "人文與博雅研究", "Theatre": "戲劇與表演研究", "Agriculture": "農業科學", "Public Policy": "公共政策", "Human Development": "人類發展與家庭研究", "Nutrition": "營養科學", "Education": "教育學", "Public Health": "公共衛生", "Nursing": "護理學", "Environmental Science": "環境科學與研究", "Social Work": "社會工作", "Interdisciplinary Studies": "跨領域研究", "Kinesiology": "運動科學", "Criminology": "犯罪學", "Mathematics": "數學", "Psychology": "心理學", "Economics": "經濟學", "Communication": "傳播學", "Journalism": "新聞學", "Computer Science": "資訊工程／電腦科學", "Engineering": "工程", "Art & Design": "藝術與設計", "Health Sciences": "健康科學"};
const data=window.UNIVERSITY_FINDER_DATA||(window.UNIVERSITY_FINDER_DATA=[]);
for(const row of rows){const existing=data.find(x=>x.name===row.name);if(existing){existing.majors=[...new Set([...(existing.majors||[]),...row.majors])];existing.nameZh=row.nameZh;existing.aliases=[...new Set([...(existing.aliases||[]),...row.aliases])];}else data.push(row);}
})();
