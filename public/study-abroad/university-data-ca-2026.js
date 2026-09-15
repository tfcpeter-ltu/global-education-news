(()=>{
const rows=[
  {
    "name": "University of Toronto",
    "nameZh": "多倫多大學",
    "city": "Toronto",
    "url": "https://www.utoronto.ca/academics/undergraduate-programs",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "Data Science",
      "Nursing",
      "Health Sciences",
      "Biology",
      "Psychology",
      "Economics"
    ],
    "aliases": [
      "University of Toronto (多倫多大學)",
      "University of Toronto",
      "University of Toronto – Rotman",
      "University of Toronto – Bloomberg Faculty of Nursing",
      "University of Toronto – HSc / Health & Disease"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "University of Waterloo",
    "nameZh": "滑鐵盧大學",
    "city": "Waterloo",
    "url": "https://uwaterloo.ca/future-students/programs",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Data Science",
      "Health Sciences",
      "Biology",
      "Psychology",
      "Economics"
    ],
    "aliases": [
      "University of Waterloo (滑鐵盧大學)",
      "University of Waterloo",
      "University of Waterloo – Health Sciences / Kinesiology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "University of British Columbia",
    "nameZh": "英屬哥倫比亞大學",
    "city": "Vancouver / Kelowna",
    "url": "https://you.ubc.ca/programs/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "Data Science",
      "Nursing",
      "Kinesiology",
      "Biology",
      "Psychology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "University of British Columbia (UBC)",
      "University of British Columbia",
      "UBC – Sauder School of Business",
      "University of British Columbia – Bachelor of Health Sciences",
      "University of British Columbia – Vancouver School of Economics",
      "UBC",
      "卑詩大學"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "McGill University",
    "nameZh": "麥基爾大學",
    "city": "Montréal",
    "url": "https://www.mcgill.ca/undergraduate-admissions/programs",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "Statistics",
      "Nursing",
      "Biomedical Sciences",
      "Biology",
      "Psychology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "McGill University (麥基爾大學)",
      "McGill University",
      "McGill University – Desautels",
      "McGill University – Ingram School of Nursing",
      "McGill University – Anatomy & Cell Biology / Physiology"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "University of Alberta",
    "nameZh": "亞伯達大學",
    "city": "Edmonton",
    "url": "https://www.ualberta.ca/en/undergraduate-programs/index.html",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "Data Science",
      "Nursing",
      "Health Sciences",
      "Biology",
      "Psychology",
      "Economics"
    ],
    "aliases": [
      "University of Alberta (亞伯達大學)",
      "University of Alberta",
      "University of Alberta – Alberta School of Business",
      "University of Alberta – Bachelor of Science in Health Sciences"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Université de Montréal",
    "nameZh": "蒙特婁大學",
    "city": "Montréal",
    "url": "https://admission.umontreal.ca/programmes/baccalaureat-en-informatique/description/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science"
    ],
    "aliases": [
      "Université de Montréal (蒙特婁大學)",
      "Université de Montréal"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "McMaster University",
    "nameZh": "麥克馬斯特大學",
    "city": "Hamilton",
    "url": "https://future.mcmaster.ca/programs/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "Mathematics",
      "Nursing",
      "Health Sciences",
      "Biology",
      "Psychology",
      "Economics"
    ],
    "aliases": [
      "McMaster University (麥馬士達大學)",
      "McMaster University",
      "McMaster University – DeGroote",
      "McMaster University – BHSc (Honours)",
      "麥馬士達大學",
      "麥馬斯特大學"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Simon Fraser University",
    "nameZh": "西門菲莎大學",
    "city": "Burnaby / Vancouver / Surrey",
    "url": "https://www.sfu.ca/students/admission/programs/a-z.html",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Data Science",
      "Psychology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "Simon Fraser University (西門菲莎大學)",
      "Simon Fraser University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Queen’s University",
    "nameZh": "皇后大學",
    "city": "Kingston",
    "url": "https://www.queensu.ca/admission/undergraduate-programs",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Engineering",
      "Business",
      "AI",
      "Nursing",
      "Health Sciences",
      "Biology",
      "Psychology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "Queen's University (皇后大學)",
      "Queen's University",
      "Queen's University – Smith School of Business",
      "Queen's University – Bachelor of Health Sciences",
      "Queen's University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "University of Ottawa",
    "nameZh": "渥太華大學",
    "city": "Ottawa",
    "url": "https://catalogue.uottawa.ca/en/programs/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Computer Science",
      "Business",
      "Nursing",
      "Health Sciences",
      "Biology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "University of Ottawa (渥太華大學)",
      "University of Ottawa – Telfer",
      "University of Ottawa",
      "University of Ottawa – BSc Health Sciences (Honours)"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "University of Calgary",
    "nameZh": "卡加利大學",
    "city": "Calgary",
    "url": "https://www.ucalgary.ca/future-students/undergraduate/programs",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Engineering",
      "Nursing",
      "Health Sciences",
      "Biology"
    ],
    "aliases": [
      "University of Calgary",
      "University of Calgary – Health Sciences (BHSc Honours)"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Western University",
    "nameZh": "西安大略大學",
    "city": "London, Ontario",
    "url": "https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Engineering",
      "Business",
      "Nursing",
      "Health Sciences",
      "Biomedical Sciences",
      "Psychology",
      "Economics",
      "Communication"
    ],
    "aliases": [
      "Western University",
      "Western University – Ivey Business School",
      "Western University – Arthur Labatt Family School of Nursing",
      "Western University – BHSc / Medical Sciences",
      "Western University – BMSc",
      "Western University – Faculty of Information & Media Studies",
      "Western University",
      "韋仕敦大學"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Concordia University",
    "nameZh": "康考迪亞大學",
    "city": "Montréal",
    "url": "https://www.concordia.ca/academics/undergraduate.html",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Engineering",
      "Communication"
    ],
    "aliases": [
      "Concordia / Polytechnique Montréal",
      "Concordia University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Polytechnique Montréal",
    "nameZh": "蒙特婁理工學院",
    "city": "Montréal",
    "url": "https://www.polymtl.ca/futur/bac/programmes",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Engineering"
    ],
    "aliases": [
      "Concordia / Polytechnique Montréal"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "York University",
    "nameZh": "約克大學",
    "city": "Toronto",
    "url": "https://futurestudents.yorku.ca/program-search",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Business",
      "Psychology",
      "Communication"
    ],
    "aliases": [
      "York University – Schulich",
      "York University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "HEC Montréal",
    "nameZh": "蒙特婁高等商學院",
    "city": "Montréal",
    "url": "https://www.hec.ca/en/programs/bachelors",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Business"
    ],
    "aliases": [
      "HEC Montréal"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Toronto Metropolitan University",
    "nameZh": "多倫多都會大學",
    "city": "Toronto",
    "url": "https://www.torontomu.ca/programs/undergraduate/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Mathematics",
      "Journalism"
    ],
    "aliases": [
      "Toronto Metropolitan University (TMU)",
      "Toronto Metropolitan University (前 Ryerson)",
      "Ryerson University",
      "瑞爾森大學"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Dalhousie University",
    "nameZh": "達爾豪斯大學",
    "city": "Halifax",
    "url": "https://www.dal.ca/study/programs/undergraduate/nursing-bscn.html",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Nursing"
    ],
    "aliases": [
      "Dalhousie University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  },
  {
    "name": "Carleton University",
    "nameZh": "卡爾頓大學",
    "city": "Ottawa",
    "url": "https://admissions.carleton.ca/programs/",
    "country": "canada",
    "countryLabel": "加拿大",
    "majors": [
      "Journalism"
    ],
    "aliases": [
      "Carleton University"
    ],
    "goals": [
      "科系探索"
    ],
    "catalogOnly": true,
    "note": "依官方課程探索學科方向，進一步比較校區、課程結構與入學途徑。",
    "apply": "依校方當年度國際生招生規定申請；本次整理學程開設，不以排名推定錄取難度。"
  }
];
window.STUDY_MAJOR_LABELS={...(window.STUDY_MAJOR_LABELS||{}),"Data Science":"資料科學","AI":"人工智慧","Business":"商學／商務管理","Finance":"金融","Biomedical Sciences":"生物醫學科學","Biology":"生物學／生命科學"};
const data=window.UNIVERSITY_FINDER_DATA||(window.UNIVERSITY_FINDER_DATA=[]);
for(const row of rows){const old=data.find(x=>x.name===row.name);if(old){old.majors=[...new Set([...(old.majors||[]),...row.majors])];old.nameZh=old.nameZh||row.nameZh;old.aliases=[...new Set([...(old.aliases||[]),...row.aliases])];}else data.push(row);}
})();
