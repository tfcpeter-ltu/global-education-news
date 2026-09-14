window.APPLICATION_SYSTEMS_DATA = {
  verifiedAt: '2026-09-10',
  notice: '申請平台、截止日、費用與文件要求會更新。本站提供操作導航，但送件前仍應點入官方來源再次核對。',
  systems: [
    {
      id:'uk-ucas-2027', country:'uk', countryLabel:'英國', title:'UCAS Undergraduate 2027', badge:'中央申請平台',
      who:'申請英國大多數大學學士課程的學生。Oxford、Cambridge、Medicine、Dentistry、Veterinary 等有較早時程或額外選拔。',
      cycle:'2027 entry', verified:'2026-09-10',
      official:'https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications',
      operate:'https://www.ucas.com/dashboard',
      deadline:'2026-10-15 18:00（UK time）：Oxford、Cambridge 與多數 Medicine／Dentistry／Veterinary；2027-01-13 18:00：多數其他學士課程。',
      steps:[
        '建立 UCAS Hub 帳號並開始 Undergraduate application。',
        '確認學校／科系 choices；總數上限依 UCAS 當年度規則管理。',
        '填寫個人資料、國籍、教育背景與 qualifications。',
        '完成三題式 Personal Statement；內容應由學生本人撰寫並依自身經歷調整。',
        '安排 academic reference；若透過學校申請，先確認校內提早截止日與 buzzword／centre 流程。',
        '逐一查每個 choice 是否另有 admissions test、portfolio、written work、audition 或 interview。',
        '送件前核對資格名稱、成績、課程代碼、年份與所有附件，再付款並 submit。',
        '送件後在 UCAS Hub 追蹤大學決定、面試與 offer；必要時再進入各大學 applicant portal。'
      ],
      docs:['護照英文姓名資料','高中成績／資格資料','Predicted / achieved grades','Academic reference','Personal Statement','英文成績（如課程要求）','科系額外測驗／作品資料'],
      sources:[
        ['UCAS 2027 Dates & Deadlines','https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications'],
        ['UCAS Hub','https://www.ucas.com/dashboard'],
        ['UCAS Documents Upload','https://www.ucas.com/applying/applying-to-university/uploading-documents-to-your-application']
      ]
    },
    {
      id:'us-common-app-2026-27', country:'us', countryLabel:'美國', title:'Common App 2026–2027', badge:'常見共用平台',
      who:'申請使用 Common App 的美國及其他地區會員大學之 first-year applicants；不是每所美國大學都只使用 Common App。',
      cycle:'2026–2027 season', verified:'2026-09-10',
      official:'https://www.commonapp.org/apply/first-year-students/',
      operate:'https://apply.commonapp.org/common',
      deadline:'沒有單一全國截止日；每所大學的 Early / Regular / Rolling deadlines 必須逐校確認。',
      steps:[
        '建立 Common App first-year account。',
        '完成 Profile、Family、Education、Testing、Activities 等共用欄位。',
        '加入 college list，逐校查看 testing、writing、deadline、recommendation 等 requirements。',
        '邀請 counselor／teacher recommenders；各校推薦信數量可能不同。',
        '完成 Common App personal essay（若該校要求）及各校 supplemental questions／writing supplements。',
        '確認官方成績單、school report、英文測驗與 SAT/ACT policy；不要假設所有學校規則相同。',
        '逐校 review application PDF、簽署聲明、支付費用或使用核准的 fee waiver，再 submit。',
        '送件後進入各大學 applicant portal，追蹤 checklist、補件、面試與決定。'
      ],
      docs:['High school transcript','School profile / school report','Activities list','Honors','Personal essay','College supplements','Counselor / teacher recommendations','English proficiency','SAT/ACT（依校政策）','Financial aid 文件（如適用）'],
      sources:[
        ['Common App First-year Guide','https://www.commonapp.org/apply/first-year-students/'],
        ['Common App Login','https://apply.commonapp.org/common'],
        ['Common App First-year Toolkit','https://www.commonapp.org/apply/fy-toolkit/'],
        ['2026–2027 Essay Prompts','https://www.commonapp.org/apply/essay-prompts/']
      ]
    },
    {
      id:'ca-ouac', country:'canada', countryLabel:'加拿大', title:'Ontario｜OUAC Undergraduate', badge:'省級申請平台',
      who:'申請 Ontario 參與 OUAC 的大學學士課程。學生身份與學歷背景會影響 Group A／Group B 及文件處理方式。',
      cycle:'Fall 2027', verified:'2026-09-10',
      official:'https://www.ouac.on.ca/guide/undergrad-how-to-apply/',
      operate:'https://www.ouac.on.ca/apply/dashboard/en_CA/user/login',
      deadline:'Ontario high school Group A 的 2027 申請時程已公告 2027-01-15 為完成申請日；其他國際／Group B 申請者需依各大學與科系截止日。',
      steps:[
        '先確認你屬於哪一類 applicant，並在 OUInfo／各校官網研究 program code 與 requirements。',
        '建立 OUAC account，只保留一個帳號並使用長期可收信的個人 email。',
        '選 Undergraduate application，輸入 personal information、academic history 與 program choices。',
        '依 OUAC 與大學指示處理 transcript；不同學歷背景的送件方式不同。',
        '確認 program-specific supplementary application、portfolio、interview 或特殊 deadline。',
        'Review and Payment：核對 choices 與資料、同意聲明、付款並保留 OUAC Reference Number。',
        '送件後登入 OUAC 與各大學 applicant portal，確認 acknowledgement、補件與 offer。'
      ],
      docs:['成績單','在學／畢業資料','英文成績','OUAC program codes','補充申請（依校／科系）','作品集／面試資料（如適用）','OUAC Reference Number'],
      sources:[
        ['OUAC Undergraduate Guide','https://www.ouac.on.ca/guide/undergrad-how-to-apply/'],
        ['OUAC Login / Apply','https://www.ouac.on.ca/apply/dashboard/en_CA/user/login'],
        ['OUAC 2026–2027 Schedule','https://guidance.ouac.on.ca/resources/schedule-of-dates/']
      ]
    },
    {
      id:'ca-bc-epbc', country:'canada', countryLabel:'加拿大', title:'British Columbia｜EducationPlannerBC', badge:'省級申請平台',
      who:'申請 B.C. 公立 post-secondary institutions 的常見入口；部分學校／課程可能轉往外部或校方系統。',
      cycle:'2026–2027', verified:'2026-09-10',
      official:'https://www.educationplannerbc.ca/help?tab=0',
      operate:'https://www.educationplannerbc.ca/apply',
      deadline:'各校與各 intake 截止日不同，必須在選定 institution / program 後查該校日期。',
      steps:[
        '建立 EducationPlannerBC account 並完成 email verification。',
        '建立 profile：legal name、citizenship、contact information、academic history 等。',
        'Select Institution，選擇要申請的 B.C. 學校。',
        'Complete Application：選 program 與 start term，依畫面完成資料。',
        '準備 payment method；平台提醒多數 institution 接受 Visa / Mastercard。',
        'Review & Submit。已送出的 application 若需修改，通常需直接聯絡 Admissions / Registrar。',
        '後續依學校 email／applicant portal 補交文件並追蹤決定。'
      ],
      docs:['Legal name / passport data','Contact information','Academic history','Program / term choice','成績單與校方要求附件','付款工具'],
      sources:[
        ['EducationPlannerBC Apply','https://www.educationplannerbc.ca/apply'],
        ['EducationPlannerBC Help','https://www.educationplannerbc.ca/help?tab=0']
      ]
    },
    {
      id:'au-uac-intl', country:'australia', countryLabel:'澳洲', title:'NSW / ACT｜UAC International', badge:'有條件使用州級平台',
      who:'國際學生只有在指定學歷情況下使用 UAC；多數持其他國際高中資格者要直接向大學申請。',
      cycle:'2026–2027 admissions', verified:'2026-09-10',
      official:'https://uac.edu.au/current-applicants/international-applications-and-offers',
      operate:'https://apply.uac.edu.au/',
      deadline:'UAC 有多個 offer rounds 與相對應截止日；課程也可能有較早 deadline。需依當期 key dates 查核。',
      steps:[
        '先判斷你的學歷是否符合 UAC international route；不符合者改走大學 direct application。',
        '建立 account、驗證 email 並開始 application。',
        '填寫 citizenship、Year 12 qualification、personal details、studies / qualifications。',
        '選擇 course preferences；國際申請頁目前可列最多六個 preferences。',
        '接受 applicant declaration 並付款。',
        '依 offer-round 截止日前調整 preferences／補交文件。',
        '登入 UAC 追蹤 offer；同時查看大學是否要求額外 portal 或文件。'
      ],
      docs:['身分／國籍資料','符合資格的 Year 12 / IB / NCEA 資料','成績文件','course preference list','英文與科系額外要求'],
      sources:[
        ['UAC International Applications','https://uac.edu.au/current-applicants/international-applications-and-offers'],
        ['UAC How to Apply','https://uac.edu.au/future-applicants/how-to-apply-for-uni']
      ]
    },
    {
      id:'au-vtac-intl', country:'australia', countryLabel:'澳洲', title:'Victoria｜VTAC International Year 12', badge:'特定國際 Year 12',
      who:'VTAC 對 international applicants 有資格限制；目前官方 quick-start 明確限定特定 international Year 12 類型，其他學生需依學校 direct route。',
      cycle:'2027 commencement', verified:'2026-09-10',
      official:'https://vtac.edu.au/guides/quickstart/international',
      operate:'https://vtac.edu.au/',
      deadline:'2027 課程申請已於 2026-08-03 開放；各 course / offer round 仍需查 VTAC 當期日期。',
      steps:['確認自己是否符合 VTAC international applicant 身份。','建立 VTAC profile；依官方要求準備 USI（如適用）。','搜尋課程並確認 prerequisites。','建立 course application，依喜好排序最多八個 course preferences。','補充文件／特殊 consideration（如適用）。','在 change-of-preference 時窗內調整。','追蹤結果、offer、enrolment / defer 指示。'],
      docs:['身分資料','Year 12 qualification','USI（如適用）','成績','course prerequisites','其他科系指定文件'],
      sources:[['VTAC International Quick Start','https://vtac.edu.au/guides/quickstart/international']]
    },
    {
      id:'nl-studielink', country:'europe', countryLabel:'荷蘭', title:'Netherlands｜Studielink', badge:'全國常見註冊入口',
      who:'多數荷蘭高教課程先透過 Studielink 註冊／申請，但部分國際生或特定學校另有自己的申請方式。',
      cycle:'2027 study', verified:'2026-09-10',
      official:'https://www.studyinnl.org/plan-your-stay/how-to-apply',
      operate:'https://www.studielink.nl/',
      deadline:'一般學士常見基準為 5 月 1 日；numerus fixus 常見為 1 月 15 日，但大學／科系可以有不同日期。',
      steps:['先到學校 program page 確認是否要求 Studielink、是否為 numerus fixus。','建立 Studielink account；海外申請者依 Studielink 身份驗證流程辦理。','新增 prior education 與欲申請的 programme。','完成 Studielink enrolment request。','依學校指示轉往該校 application portal，上傳成績、CV、motivation、英文等。','完成 selection procedure（numerus fixus / selective programme 如適用）。','收到 ranking / decision 後依規則在 Studielink 接受名額並完成校方 enrolment。'],
      docs:['Diploma / transcript','英文成績','CV（依校）','Motivation letter（依校）','推薦信（依校）','作品集／selection 資料（依科系）'],
      sources:[['Study in NL — How to Apply','https://www.studyinnl.org/plan-your-stay/how-to-apply'],['Studielink','https://www.studielink.nl/']]
    },
    {
      id:'de-uni-assist', country:'europe', countryLabel:'德國', title:'Germany｜uni-assist / My assist', badge:'依學校決定',
      who:'由 uni-assist 處理國際申請的合作大學；不是所有德國大學都走 uni-assist，且部分課程使用 VPD / DoSV 等特殊程序。',
      cycle:'依 semester', verified:'2026-09-10',
      official:'https://www.uni-assist.de/en/apply-in-6-steps/',
      operate:'https://my.uni-assist.de/',
      deadline:'依大學與 semester；uni-assist 官方建議先查學校 requirements / deadlines，並預留審查時間。',
      steps:['確認目標大學／課程是否由 uni-assist 處理，以及是否需要 VPD 或 DoSV。','Plan your application：查期限、資格、特殊程序。','Assemble documents：掃描證書與成績；確認翻譯／認證規則。','在 My assist 建立 account，為每個 course 建立 application 並 upload documents。','支付 handling fees。','Send & Track：在 My assist 追蹤處理，依通知補件。','若流程是 VPD，取得 VPD 後仍需依大學規定完成大學端正式申請。'],
      docs:['Certificates / diploma','Transcripts','Certified translations（如需要）','Language certificate','CV / motivation（依課程）','VPD（如適用）'],
      sources:[['uni-assist — Apply in 6 Steps','https://www.uni-assist.de/en/apply-in-6-steps/'],['My assist','https://my.uni-assist.de/'],['uni-assist Checklists','https://www.uni-assist.de/en/tools/checklists/']]
    },
    {
      id:'fr-parcoursup', country:'europe', countryLabel:'法國', title:'France｜Parcoursup', badge:'一年級國家平台',
      who:'法國高等教育第一年多數 formation 的 national pre-registration 平台；國際學生仍需依國籍、居住地、學歷與 formation 判斷 Parcoursup、DAP / Études en France 或校方流程。',
      cycle:'2026 official cycle / 2027 dates待官方公布', verified:'2026-09-10',
      official:'https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/etudiants-internationaux',
      operate:'https://www.parcoursup.gouv.fr/',
      deadline:'2027 cycle 日期尚需等待官方公布；本站不會用 2026 日期代替 2027。',
      steps:['先判斷目標 formation 是否列在 Parcoursup。','以 international student FAQ 判斷你的身份與路徑；部分情況還需 Études en France / DAP。','官方開放後建立 Parcoursup account / dossier candidat。','搜尋 formation、閱讀 attendus、capacity、selection 與文件要求。','在時限內提出 vœux，完成 dossier 與各 formation 所需資料。','依官方時程確認／完成申請，之後進入 admission phase 回覆 offer。','接受名額後依 formation 指示做 administrative enrolment。'],
      docs:['身分與學歷資料','成績／school records','formation 指定 motivation / questionnaire','語言證明（依課程）','其他指定證明'],
      sources:[['Parcoursup International Students','https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/etudiants-internationaux'],['Parcoursup','https://www.parcoursup.gouv.fr/']]
    },
    {
      id:'jp-eju-direct', country:'japan', countryLabel:'日本', title:'Japan｜EJU + University Direct Application', badge:'考試＋各校申請',
      who:'需要 EJU 的日文授課／國際生選拔路線。日本大學並不存在一個能取代各校申請的單一全國大學 portal。英文授課課程常走各校自己的 admissions portal。',
      cycle:'2026 EJU / 各校 2027 intake', verified:'2026-09-10',
      official:'https://www.jasso.go.jp/en/ryugaku/eju/',
      operate:'https://www.jasso.go.jp/en/ryugaku/eju/examinee/procedure/application.html',
      deadline:'2026 EJU 第二回申請已於 2026-07-30 截止，考試為 2026-11-08；真正大學申請 deadline 需逐校查核。',
      steps:['先確認課程是 English-taught 還是 Japanese-taught，以及是否要求 EJU / JLPT / TOEFL 等。','需要 EJU 者依 JASSO 當期 bulletin 與所在地申請方式報名。','逐校查 admission guidelines / 募集要項，確認資格、科目、分數與文件。','建立該大學 web application account 或依募集要項提交。','上傳／寄送成績、畢業證明、語言／EJU score、推薦／理由書等。','完成 examination / interview / written test（如適用）。','查結果並依校方完成入學手續、費用與 COE／簽證相關程序。'],
      docs:['Transcript','Graduation / expected graduation certificate','EJU score（如要求）','JLPT / English score（如要求）','Statement / reason for application','Recommendation（依校）','財力／身分文件（依校）'],
      sources:[['JASSO EJU','https://www.jasso.go.jp/en/ryugaku/eju/'],['EJU Application Method','https://www.jasso.go.jp/en/ryugaku/eju/examinee/procedure/application.html'],['EJU Schedule','https://www.jasso.go.jp/en/ryugaku/eju/schedule.html']]
    },
    {
      id:'sg-direct', country:'singapore', countryLabel:'新加坡', title:'Singapore｜University Direct Portals', badge:'各校直申',
      who:'NUS、NTU、SMU 等主要大學各自招生；須依 applicant qualification category 進入正確頁面。',
      cycle:'AY 2027/2028', verified:'2026-09-10',
      official:'https://nus.edu.sg/oam/admissions/international-qualifications-for-foreigners/admission-requirements',
      operate:'https://nus.edu.sg/oam/admissions/international-qualifications-for-foreigners/admission-requirements',
      deadline:'NUS 已公告 AY2027/2028 foreign international qualifications 申請期為 2026-12-16 至 2027-02-17；其他大學需逐校查。',
      steps:['先選定學校與 programme，判斷使用哪一種 high-school qualification category。','查 programme prerequisites 與是否有 interview / test。','在各校 application opening 後建立 applicant account。','填個人與學歷資料、programme choices、achievements / aptitude-based sections（依校）。','上傳 qualification-specific documents 與英文／standardized tests（如要求）。','完成費用與 submission。','進 Applicant Portal 追蹤文件、面試／測驗、結果與 appeal / acceptance 時程。'],
      docs:['高中資格與成績','Programme prerequisites','英文成績（如要求）','活動／成就資料','面試／測驗準備（依科系）','Qualification-specific documents'],
      sources:[['NUS International Qualifications','https://nus.edu.sg/oam/admissions/international-qualifications-for-foreigners/admission-requirements']]
    },
    {
      id:'hk-direct', country:'hong-kong', countryLabel:'香港', title:'Hong Kong｜International / Non-JUPAS Direct', badge:'各校直申',
      who:'持國際資格、非 HKDSE 路線的申請者通常依各大學 International / Non-JUPAS scheme 辦理。',
      cycle:'2027 intake', verified:'2026-09-10',
      official:'https://admissions.hku.hk/apply/international-qualifications',
      operate:'https://admissions.hku.hk/apply/international-qualifications',
      deadline:'HKU 官方已公告 2027 International/Non-JUPAS applications 於 2026-09-23 開放；各校／round 截止日仍需逐校核對。',
      steps:['確認自己屬 International / Non-JUPAS 或其他申請身份。','逐校查 qualification requirements、programme requirements 與 application rounds。','在該大學 admissions portal 建立 account。','填寫個人、學歷、programme choices 與 extracurricular / achievement 資料。','上傳 transcript、predicted / achieved results、語言成績及指定文件。','邀請 referee／提交 reference（若該校要求）。','完成 application fee 與 submit，之後追蹤 interview、補件、offer 與 acceptance。'],
      docs:['高中成績與國際資格','Predicted / achieved grades','英文成績','Personal statement / activities（依校）','Reference（依校）','Interview / portfolio（依科系）'],
      sources:[['HKU International / Non-JUPAS','https://admissions.hku.hk/apply/international-qualifications']]
    }
  ],
  templates:[
    {id:'master-checklist',title:'申請資料 Master Checklist',text:'□ 護照英文姓名與出生資料\n□ 高中成績單（最新版本）\n□ 在學／預計畢業／畢業證明\n□ Predicted grades（如適用）\n□ 英文檢定成績與考生編號\n□ SAT/ACT/EJU/UCAT 等（依校／科系）\n□ Personal Statement / Essay / Motivation Letter\n□ Activities / Honors / CV\n□ Recommendation / Referee 資料\n□ Portfolio / Audition / Interview（依科系）\n□ 各校 Applicant Portal 帳密與申請編號\n□ Deadline、費用、補件與 Offer 回覆期限'},
    {id:'filename',title:'文件檔名範本',text:'Lastname_Firstname_Document_University_EntryYear.pdf\n\n例：Chen_Peter_Transcript_UBC_2027.pdf\n例：Chen_Peter_EnglishScore_NUS_2027.pdf\n\n原則：英文檔名、避免特殊符號、版本更新時加日期 YYYYMMDD。'},
    {id:'cv',title:'學生 CV 架構範本',text:'FULL NAME\nEmail | City, Country\n\nEDUCATION\nSchool | Expected Graduation\nKey curriculum / relevant subjects\n\nACADEMIC & PROJECT EXPERIENCE\nProject / Research / Competition | Date\n- What you did\n- What skill / result demonstrates readiness for the programme\n\nACTIVITIES & LEADERSHIP\nRole | Organization | Date\n- Responsibility and measurable contribution\n\nAWARDS / HONORS\nAward | Year\n\nSKILLS / LANGUAGES\nLanguage tests, technical, creative or research skills\n\n請依大學要求調整，不要為了填滿版面加入無關資訊。'},
    {id:'ps-plan',title:'PS / Essay 思考框架',text:'1. Why this subject?\n用一個具體問題、學習經驗或作品說明你的學科動機。\n\n2. Academic preparation\n挑 2–3 個最能證明準備度的課程、研究、閱讀、競賽或 project。\n\n3. Evidence, not adjectives\n不要只寫「我很有熱情」；改用你做過什麼、學到什麼、下一步想研究什麼。\n\n4. Fit / next step\n依申請制度決定是否需要寫校系契合度。UCAS 共用內容與美國校-specific supplement 的寫法不同。\n\n提醒：此為規劃框架。最終文章應反映學生本人的經歷、觀點與語氣。'},
    {id:'recommendation-request',title:'向老師邀請推薦信範本',text:'Dear [Teacher Name],\n\nI am preparing my university applications for [entry year] and would be grateful if you would consider writing a recommendation for me. I am applying mainly for [subject / programme direction].\n\nTo make the process easier, I can provide my university list, deadlines, transcript, CV/activity summary, and a short note on the classes/projects I completed with you. The earliest deadline is [date].\n\nPlease let me know if you would be comfortable supporting my application. Thank you very much for considering my request.\n\nBest regards,\n[Student Name]'},
    {id:'final-audit',title:'送件前 Final Audit',text:'IDENTITY\n□ Legal name 與護照完全一致\n□ Email 是長期可使用的個人信箱\n\nPROGRAMME\n□ University / campus / programme / entry year 正確\n□ Prerequisites 已核對\n□ Deadline 與時區已核對\n\nACADEMIC\n□ Qualification 名稱、科目、成績、predicted/achieved 狀態正確\n□ 成績單版本正確\n\nWRITING / REFERENCE\n□ 使用正確版本，沒有貼錯學校／科系名稱\n□ Referee 已收到邀請並知道截止日\n\nEXTRAS\n□ Test / portfolio / interview / supplement 已完成或排程\n□ Application fee 已確認\n□ Submission PDF / confirmation / application ID 已保存'}
  ]
};
