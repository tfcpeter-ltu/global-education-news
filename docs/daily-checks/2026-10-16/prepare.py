import json,pathlib,datetime,html
R=pathlib.Path('.');D='2026-10-16';NOW=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
overpath=R/'src/data/i18n/en-overrides.json';over=json.loads(overpath.read_text(encoding='utf-8'))
photos={x['key']:x for x in json.loads((R/f'docs/image-licenses/{D}.json').read_text(encoding='utf-8'))}
def t(a,b):over[a]=b;return a
def body(p):return '\n\n'.join(t(a,b) for a,b in p)
def save(p,d):
 p=R/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def photo(k,a,e):
 p=photos[k];return dict(image=f'/images/daily/{D}/{k}.jpg',imageAlt=t(a,e),imageCredit=p['author']+' / '+p['license']+'; cropped',imageSource=p['source'],imageLicense=p['license'])
def md(p,fm,b):
 s='---\n'
 for k,v in fm.items():
  if k=='sources':s+='sources:\n'+''.join('  - label: '+json.dumps(x['label'],ensure_ascii=False)+'\n    url: '+json.dumps(x['url'])+'\n' for x in v)
  else:s+=k+': '+json.dumps(v,ensure_ascii=False)+'\n'
 p=R/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s+'---\n\n'+b+'\n',encoding='utf-8')
def src(a,u):return dict(label=a,url=u)
def attribution(k):return f'\n\n[Photo attribution and adaptation license](/images/daily/{D}/credits.html#{k})'
aus='https://www.education.gov.au/higher-education-statistics/preliminary-trends-higher-education'
aus2='https://thepienews.com/overseas-student-commencements-fall-5-in-australian-higher-education/'
grad='https://studyportals.com/press-releases/international-students-contribute-1-7-trillion-to-their-host-economies-through-their-careers/'
grad2='https://thepienews.com/international-graduates-deliver-1-7tn-lifetime-boost-to-host-economies/'
ire='https://www.gov.ie/en/department-of-further-and-higher-education-research-innovation-and-science/publications/national-student-accommodation-strategy-2026-2035/'
ire2='https://thepienews.com/ireland-international-education-sector-risks-hitting-social-license-wall/'
news=[]
def article(slug,title,en,desc,de,cat,ce,topic,key,alt,ae,sources,pairs):
 fm=dict(layout='../../layouts/ArticleLayout.astro',title=t(title,en),description=t(desc,de),date=NOW,author='LTU Global Education News 編輯部',category=t(cat,ce),topic=topic,tags=[topic,'2026'],**photo(key,alt,ae),sources=sources)
 md('src/pages/news/'+slug+'.md',fm,body(pairs)+attribution(key));news.append(dict(slug=slug,title=title,url='https://globalednews.com/news/'+slug+'/',sources=sources,verifiedAt=NOW))
article('australia-preliminary-overseas-commencements-2026','澳洲海外新生初步數據年減4.9%：不是全年人數，也不是簽證統計','Australian preliminary overseas commencements fall 4.9%; scope matters',
 '截至2026年5月1日的高教初步資料顯示，海外新生由130,415降至123,968；包含境外校區，不能直接解讀為赴澳人數。','Preliminary higher education data as at 1 May show overseas commencements falling from 130,415 to 123,968. The figures include offshore campuses.',
 '澳洲高等教育','Australian higher education','australia','sydney-quad','雪梨大學四方庭院2021年資料照，非本次統計現場','Archive photograph of the University of Sydney quadrangle in 2021, not the statistical release',
 [src('Australian Department of Education | Preliminary trends',aus),src('The PIE | Independent report, 15 October 2026',aus2)],[
 ('澳洲教育部高等教育初步資料顯示，截至2026年5月1日，海外學生新入學人數為123,968，較2025年同口徑130,415減少4.9%。The PIE於10月15日報導這項下滑。','Australian Department of Education preliminary data show 123,968 overseas student commencements as at 1 May 2026, down 4.9% from 130,415 on the corresponding 2025 measure. The PIE reported the decline on 15 October.'),
 ('## 先看統計範圍','## Read the scope first'),
 ('資料來自TCSI當時快照，涵蓋1月1日至5月1日已過統計基準日的修課紀錄；海外學生包含在澳洲及境外校區就讀者。這不是2026全年最終數字，也不是學生簽證核發或入境人數。','The TCSI snapshot covers units whose census dates fell between 1 January and 1 May. Overseas students include those studying in Australia and at offshore campuses. These are neither final full-year 2026 figures nor visa grants or arrivals.'),
 ('## 台灣家庭如何使用','## What Taiwanese families can use it for'),
 ('初步資料仍可能修訂，學校回報時間也會影響比較。不能因全體新生下降，就推定某一課程比較容易錄取，或直接算成個人的簽證成功率。','Preliminary figures can be revised and reporting timing affects comparisons. A sector-wide decline does not establish easier admission to a particular course or an individual visa approval rate.'),
 ('編輯建議：把總體趨勢當成背景，申請時仍逐校確認課程名額、學費、校區及正式錄取條件，並保存查核日期。','Editorial guidance: use the trend as background, then verify programme availability, fees, campus and formal admission conditions with each university. Keep dated records.')])
article('international-graduates-lifetime-economic-estimate-2026','國際畢業生終身經濟貢獻估1.7兆美元：研究模型不能當個人薪資保證','International graduates’ lifetime contribution estimated at US$1.7 trillion',
 'Studyportals與Cambridge IELTS研究估算留在留學國就業者的長期貢獻；1.7兆美元是終身模型值，不是每年收入。','A Studyportals and Cambridge IELTS study models graduates who stay in their study destination. US$1.7 trillion is a lifetime estimate, not annual income.',
 '國際教育研究','International education research','global','cambridge-graduates','劍橋畢業日聚餐資料照，非研究調查樣本或2024屆證明','Archive graduation-day dining photograph in Cambridge, not evidence of the study sample or 2024 cohort',
 [src('Studyportals | Talent Beyond Borders findings',grad),src('The PIE | Independent report, 15 October 2026',grad2)],[
 ('Studyportals與Cambridge IELTS發布的Talent Beyond Borders研究，把2024屆國際畢業生留在留學國發展者的終身經濟貢獻估為約1.7兆美元。The PIE於2026年10月15日報導這項研究。','Talent Beyond Borders, published by Studyportals and Cambridge IELTS, estimates a lifetime economic contribution of about US$1.7 trillion from international graduates in the 2024 cohort who remain in their study destinations. The PIE covered the study on 15 October 2026.'),
 ('## 模型估算了什麼','## What the model estimates'),
 ('研究使用約50萬名畢業生的資料，涵蓋15個目的地。模型估計該屆約267萬名國際畢業生中，41%留在留學國、35%返國、24%轉往第三國；留任者首年貢獻估約1,100億美元。','The study uses data on roughly half a million graduates across 15 destinations. Its model estimates that 41% of approximately 2.67 million international graduates stayed, 35% returned home and 24% moved to a third country. Estimated first-year output from stayers is about US$110 billion.'),
 ('## 不能換算成保證回報','## No guaranteed individual return'),
 ('1.7兆美元是模型推估的終身總量，並非每年新增收入或實際稅收；也不能拿來承諾個人薪資、就業或居留結果。','US$1.7 trillion is modelled lifetime output, not an annual inflow or observed tax receipts. It does not guarantee individual salaries, employment or residence outcomes.'),
 ('編輯建議：台灣學生比較學位時，另外核對課程成本、職涯服務與自己的工作資格，避免以跨國平均值取代個人規劃。','Editorial guidance: Taiwanese applicants should compare programme costs, career services and their own work eligibility separately. Cross-country averages cannot replace personal planning.')])
article('ireland-student-housing-capacity-debate-2026','愛爾蘭國際教育論壇關切住宿：2035年床位需求含既有缺口','Ireland’s education debate highlights housing and existing accommodation shortfalls',
 '10月論壇討論國際教育成長與住宿支持；3月公布的官方策略估2035年需42,000個床位，其中包含15,000個既有缺口。','October discussions link international education growth to housing support. The March strategy projects 42,000 beds needed by 2035, including a 15,000-bed deficit.',
 '歐洲國際教育','European international education','europe','dublin-courtyard','都柏林大學Newman大樓前庭資料照，非論壇或新宿舍','Archive photograph of the courtyard before UCD’s Newman Building, not the forum or new accommodation',
 [src('Government of Ireland | National Student Accommodation Strategy, 24 March 2026',ire),src('The PIE | Ireland forum report, 15 October 2026',ire2)],[
 ('The PIE於10月15日報導，10月12至13日愛爾蘭國際教育論壇的討論，把住宿、學生體驗與社會支持列為成長的重要條件。這些與會者觀點，不應當成全體居民或國際學生的代表性調查。','The PIE reported on 15 October that discussions at the 12–13 October Irish international education forum linked growth to housing, student experience and public support. Speakers’ views should not be treated as a representative survey of residents or international students.'),
 ('## 既有政策背景','## Existing policy background'),
 ('愛爾蘭政府3月24日公布的2026–2035學生住宿策略，估計至2035年需42,000個床位，已包含15,000個既有缺口。不能把兩者再相加成57,000，也不能寫成10月剛宣布的新增宿舍數。','The government’s 2026–2035 student accommodation strategy, published on 24 March, projects a need for 42,000 beds by 2035, including an existing deficit of 15,000. These should not be added to produce 57,000 or presented as new dormitories announced in October.'),
 ('## 錄取與住宿分開規劃','## Plan admission and accommodation separately'),
 ('策略處理供應與可負擔性，但不代表每位新生已獲保證住宿。台灣家庭應向個別學校確認可申請的住宿、候補安排、租期及費用。','The strategy addresses supply and affordability; it does not guarantee accommodation for every incoming student. Taiwanese families should check available residences, waiting lists, contract length and fees with each institution.'),
 ('編輯建議：把住宿確認日期與開學日並列，保留替代預算，並核對租約和學校提供的住宿支援資訊。','Editorial guidance: track the housing confirmation date alongside the start of study, allow for alternative costs, and check contracts and university accommodation support.')])
base='https://www.lincoln.ac.nz/study/scholarships/search-scholarships/'
admit='https://www.lincoln.ac.nz/study/apply-and-enrol/apply/'
entry='https://www.lincoln.ac.nz/study/apply-and-enrol/apply/international-undergraduate-entry-criteria/'
idp='https://www.idp.com/universities-and-colleges/lincoln-university/IID-NZ-00826/'
sch=[]
def scholarship(slug,title,en,desc,de,level,le,funding,fe,deadline,dle,note,ne,key,official,second,pairs):
 fm=dict(layout='../../../layouts/ScholarshipLayout.astro',title=t(title,en),description=t(desc,de),date=D,author='LTU Global Education News 編輯部',country=t('紐西蘭','New Zealand'),level=t(level,le),funding=t(funding,fe),deadline=t(deadline,dle),status=t('開放中','Open'),sourceName='Lincoln University and independent education source',officialUrl=official,secondSourceUrl=second,eligibilityTW=t('可申請','Eligible to apply'),taiwanNote=t(note,ne),verificationDate=D,featuredDate=D,featuredUntil='2026-10-17T00:00:00+08:00',category=t('大學國際生獎學金','University international scholarships'),**photo(key,'紐西蘭Lincoln大學校園資料照，不代表特定課程教室','Archive photograph of Lincoln University, New Zealand; not a designated classroom for the programme'))
 path='src/pages/scholarships/items/'+slug+'.md';md(path,fm,body(pairs)+f'\n\n[Official admission dates]({admit})\n\n[Taiwan undergraduate entry routes]({entry})'+attribution(key))
 sch.append(dict(slug=slug,url='https://globalednews.com/scholarships/items/'+slug+'/',publishedPath=path,sources=[official,second,admit,entry],eligibleTaiwan=True,open=True,verifiedAt=NOW,isNew=True,baselineAbsent=True,updateSummary='New page: current 2027 admission route, Taiwan eligibility, scholarship conditions and distinct application deadlines verified.'))
common=[('## 台灣境外申請的兩個日期','## Two dates for offshore Taiwanese applicants'),('本頁採2027年第一學期路徑。人在紐西蘭境外的新生入學申請須於2026年12月1日前送件；獎學金第一學期年度截止為1月31日。不能因獎學金較晚截止而延後入學申請。夏季班10月31日獎學金截止，不代表境外夏季班入學仍開放。','This page uses the first-semester 2027 route. New offshore students must submit admission applications by 1 December 2026; the annual semester-one scholarship deadline is 31 January. The later scholarship deadline does not extend admission. A 31 October summer scholarship date does not mean offshore summer admission remains open.')]
scholarship('2026-10-lincoln-pathway-merit-2027','Lincoln銜接課程獎學金：NZ$2,500學費抵扣，先確認台灣學歷路徑','Lincoln Pathway Merit Scholarship: NZ$2,500 tuition credit',
 '適用Pathway Certificate或First Year Pathway Diploma新生；2027第一學期境外入學12月1日截止，獎學金1月31日截止。','For new Pathway Certificate or First Year Pathway Diploma students. Offshore semester-one 2027 admission closes on 1 December; scholarship applications close on 31 January.',
 '預科／大一銜接文憑','Foundation or first-year pathway diploma','NZ$2,500，一學期學費抵扣','NZ$2,500 tuition credit for one semester','入學2026-12-01；獎學金2027-01-31','Admission: 1 December 2026; scholarship: 31 January 2027',
 '台灣學生須依高中修業與成績符合銜接課程門檻，並符合英語及其他入學條件；不得同時領取其他獎學金。','Taiwanese applicants must meet the relevant school-study, grade, English and other entry requirements. No concurrent scholarship is allowed.',
 'lincoln-burns',base+'lincoln-university-international-pathway-merit-scholarship/',idp,[
 ('這項獎學金面向新入讀紐西蘭Lincoln大學學術課程的國際學生，適用Pathway Certificate（Foundation）或First Year Pathway Diploma，提供一學期2,500紐元學費抵扣。','This award supports international students new to an academic programme at Lincoln University, New Zealand. It covers the Pathway Certificate (Foundation) or First Year Pathway Diploma, with a NZ$2,500 tuition credit for one semester.'),
 ('## 資格與文件','## Eligibility and documents'),
 ('官方台灣入學表列不同銜接路徑：大一銜接文憑要求高中三年級四門學科平均70%；預科有完成高中或高二整體70%等路徑。仍須由學校審查等值資格及英語條件，不能把高中畢業視為自動取得本科直接入學資格。','The official Taiwan table distinguishes routes: the first-year diploma requires a 70% average in four academic subjects in senior high year three; foundation routes include high-school completion or a 70% overall result in year two. The university assesses equivalence and English requirements. High-school completion is not automatic direct bachelor admission.'),
 ('申請需使用官方表格及機密推薦信；不得同領其他獎學金，亦不可直接延後或重新申請同獎。學費抵扣不涵蓋全部生活費。','Apply using the official form and confidential reference. Other concurrent scholarships, deferral and reapplication for the same award are excluded. The credit does not cover all living costs.')]+common)
scholarship('2026-10-lincoln-undergraduate-vice-chancellor-2027','Lincoln本科校長獎學金：新國際生可競逐NZ$5,000','Lincoln Undergraduate Vice-Chancellor’s Scholarship: NZ$5,000',
 '適用符合錄取與學術門檻的新國際本科生，不可同領其他獎學金；台灣申請人先核對本科入學學歷。','For new international bachelor students meeting admission and academic criteria, without another scholarship. Taiwanese applicants should first check qualification requirements.',
 '大學部','Undergraduate','NZ$5,000學費抵扣','NZ$5,000 tuition credit','入學2026-12-01；獎學金2027-01-31','Admission: 1 December 2026; scholarship: 31 January 2027',
 '國際學生資格未排除台灣；須符合本科入學與學術卓越要求，不可同領其他獎學金。','Taiwan is not excluded from international eligibility. Bachelor admission, academic excellence and no other scholarship are required.',
 'lincoln-workshops',base+'lincoln-university-undergraduate-vice-chancellors-scholarship/','https://www.idp.com/scholarship/lincoln-university/lincoln-university-undergraduate-vice-chancellors-scholarship/131137/',[
 ('Lincoln University Undergraduate Vice-Chancellor’s Scholarship提供5,000紐元學費抵扣，對象是計畫新入讀本科的國際學生。IDP的獨立教育資料頁同列金額、國際生資格及年度截止日。','Lincoln University’s Undergraduate Vice-Chancellor’s Scholarship provides a NZ$5,000 tuition credit for new international bachelor students. IDP’s education listing corroborates the amount, international eligibility and annual deadlines.'),
 ('## 錄取與獎項分開審查','## Admission and award assessment are separate'),
 ('官方規章以先前資格B等級或70%等學術表現為選拔依據；台灣成績的等值須由校方認定。台灣本科直接入學路徑包括認可大學一年、或指定高中加二專／國中加五專資格，不宜只憑高中畢業就判定符合。','The regulations use academic performance such as a B grade or 70% in the previous qualification; the university determines Taiwanese equivalence. Direct bachelor routes for Taiwan include one year at a recognised university or specified senior-high plus two-year junior-college, or junior-high plus five-year junior-college qualifications. High-school graduation alone should not be assumed sufficient.'),
 ('需另交獎學金申請表，並符合課程及英語條件，不得同時領取其他獎學金。這是競爭性資助，不是每位錄取者自動獲得。','A separate scholarship form is required alongside programme and English requirements. Applicants must not receive another scholarship. This is a selective award, not an automatic entitlement for every admitted student.')]+common)
scholarship('2026-10-lincoln-taught-master-merit-2027','Lincoln指定授課碩士獎學金：NZ$7,000至15,000，依課程與成績分級','Lincoln taught-master’s merit awards: NZ$7,000–15,000 by programme and grade',
 '指定授課型碩士於課程申請時自動評估；各級至少B+，部分商管課程A等級可評估NZ$15,000。','Automatic assessment with applications to eligible taught master’s programmes. All tiers require at least B+; selected business programmes offer an A-grade NZ$15,000 tier.',
 '指定授課型碩士','Selected taught master’s degrees','NZ$7,000／10,000／15,000學費減免','NZ$7,000, NZ$10,000 or NZ$15,000 tuition reduction','2026-12-01（2027第一學期境外入學）','1 December 2026 for offshore semester-one 2027 admission',
 '台灣國際學生可依合格學士學位、最後一年成績及指定碩士入學條件評估；並非所有碩士均適用。','Taiwanese international students may be assessed based on an eligible bachelor’s degree, final-year grades and admission to a listed master’s programme. Not every master’s qualifies.',
 'lincoln-building',base+'lincoln-university-180-credit-taught-master-merit-scholarship/','https://scholarshiproar.com/lincoln-university-scholarships/',[
 ('Lincoln的授課碩士Merit獎學金按指定課程與學士最後一年成績提供7,000、10,000或15,000紐元學費減免。學校在課程申請時自動評估，不必另外填獎學金表。','Lincoln’s taught-master’s merit awards provide NZ$7,000, NZ$10,000 or NZ$15,000 in tuition reductions according to the listed programme and final-year bachelor’s grades. Assessment is automatic with the programme application; no separate scholarship form is required.'),
 ('## 金額不能一概套用','## Match the amount to the programme'),
 ('目前官方表的各級門檻至少為B+；指定商管、金融科技與CPA專業會計課程的15,000紐元級要求A。其他課程依官方分組適用7,000或10,000紐元，不應把最高金額當成每位學生都可獲得。','The current official table requires at least B+ for all tiers. The NZ$15,000 tier requires an A in specified business, fintech and CPA professional-accounting programmes. Other listed courses fall into the NZ$7,000 or NZ$10,000 groups; the maximum is not available to every applicant.'),
 ('清單亦包含240學分的景觀建築及規劃碩士，不能只看網址的180-credit就認定全部課程都是180學分。台灣成績換算及實際課程資格由校方審查。','The list also includes 240-credit landscape architecture and planning degrees. The 180-credit wording in the URL does not describe every listed course. The university determines Taiwanese grade equivalence and programme eligibility.'),
 ('2027年第一學期人在紐西蘭境外的新生入學申請於2026年12月1日截止。申請前確認課程是否該學期開課，並預留未獲減免的學費與生活費。','New offshore students applying for semester one 2027 face a 1 December 2026 admission deadline. Confirm that the programme has the intended intake and budget for remaining tuition and living costs.')])
slug='lincoln-new-zealand-admission-scholarship-dates-2027'
fm=dict(layout='../../layouts/ArticleLayout.astro',title=t('申請紐西蘭Lincoln：先排入學期限，再排獎學金期限','Applying to Lincoln, New Zealand: admission before scholarship deadlines'),description=t('比較銜接、本科與授課碩士路徑，分開核對課程入學、學歷門檻與獎學金日期。','Compare pathway, bachelor and taught-master’s routes while separating admission, qualification requirements and scholarship dates.'),date=NOW,author='LTU Global Education News 編輯部',category=t('留學DIY規劃','Study-abroad planning'),**photo('lincoln-lodge','紐西蘭Lincoln大學Lodge建築資料照，非獎學金保證住宿','Archive photograph of the Lodge at Lincoln University, New Zealand; not guaranteed scholarship accommodation'),sources=[src('Lincoln | Admission dates',admit),src('Lincoln | Taiwan entry routes',entry),src('IDP | University and awards',idp)])
md('src/pages/study-abroad/'+slug+'.md',fm,body([
 ('同樣叫Lincoln，本文指紐西蘭Lincoln University。規劃2027年入學，先寫下課程、學位層級、開課學期與人在境內或境外，再整理獎學金；不同路徑不能共用一張截止日期表。','This guide concerns Lincoln University in New Zealand. For 2027 entry, record the programme, level, intake and whether you apply from inside or outside New Zealand before considering scholarships. Different routes require different deadline lists.'),
 ('## 先送入學申請','## Submit admission first'),
 ('2027第一學期境外新生入學截止為2026年12月1日，境內新生則為2027年2月1日。Pathway及本科校長獎的第一學期獎學金年度截止是1月31日；這不會延長境外入學期限。','For semester one 2027, new offshore admission closes on 1 December 2026, while the onshore deadline is 1 February 2027. The annual semester-one deadline for the pathway and undergraduate vice-chancellor awards is 31 January. This does not extend offshore admission.'),
 ('## 再確認學歷與資助','## Then check qualifications and funding'),
 ('台灣高中、大專與學士學歷分別對應不同路徑；銜接課程與本科不能混用資格。指定授課碩士可在課程申請時自動評估Merit獎，仍須核對課程名單與成績級別。','Taiwanese secondary, junior-college and bachelor qualifications correspond to different routes. Pathway and direct-bachelor requirements are not interchangeable. Listed taught master’s programmes assess merit awards with the course application, subject to programme and grade criteria.'),
 ('編輯建議：用三欄記錄入學文件、獎學金文件及尚待確認項目。只將正式核定的學費減免扣入預算，住宿、保險與生活費另列，不把校園資料照視為已保留住宿。','Editorial guidance: keep separate columns for admission documents, scholarship documents and unresolved questions. Deduct only confirmed tuition reductions from the budget. List accommodation, insurance and living costs separately; a campus photograph is not a housing reservation.')])+f'\n\n[Study-abroad navigator](/study-abroad/) · [Scholarship radar](/scholarships/)'+attribution('lincoln-lodge'))
credit='<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Photo credits — 16 October 2026</title></head><body><h1>Photo credits — 16 October 2026</h1>'
for k,p in photos.items():credit+=f'<section id="{k}"><h2>{html.escape(k)}</h2><p>{html.escape(p["author"])}. <a href="{html.escape(p["source"])}">Original photograph</a>. <a href="{html.escape(p["licenseUrl"])}">{html.escape(p["license"])}</a>. Resized and cropped; social versions add editorial headlines. Share-alike adaptations retain the source license. Archive photograph, not a current event.</p></section>'
(R/f'public/images/daily/{D}/credits.html').write_text(credit+'</body></html>',encoding='utf-8')
overpath.write_text(json.dumps(over,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
r=json.loads((R/f'docs/daily-reports/{D}.json').read_text(encoding='utf-8-sig'));assert all(x['slug'] not in r['scholarshipBaselineSlugs'] for x in sch)
r.update(currentPhase='PREPARE',newsPrepared=news,scholarshipChecks=sch,scholarshipAdditions=sch,researchCompletedAt=NOW,studyAbroadReview=dict(country='New Zealand',school='Lincoln University',angle='Separate offshore admission from scholarship deadlines',url='https://globalednews.com/study-abroad/'+slug+'/',verifiedAt=NOW),gaps=['PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
save(f'docs/daily-reports/{D}.json',r)
save(f'docs/daily-checks/{D}/source-review.json',dict(date=D,verifiedAt=NOW,news=news,scholarships=sch,rejectedCandidates=[dict(topic='Lincoln International Undergraduate Scholarship NZ$3,000',reason='Currently linked regulations restrict the award to 2021; excluded rather than assuming validity.'),dict(topic='UCB expansion and US CPT',reason='Already covered in existing archive.')],notes=['All Lincoln official award pages and current admission table read in authenticated-independent public browser; no login required. PDF regulations and Taiwan entry table read through web.','IDP and ScholarshipRoar full pages cross-checked; older conflicting master grade summaries excluded.','Ireland March strategy is background to October debate, not new October policy.','TCSI includes offshore campuses and is preliminary; graduate output is modelled, not receipts.']))
print('Prepared 3 news, 3 new scholarships and 1 DIY with English overrides.')
