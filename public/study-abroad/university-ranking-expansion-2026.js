(()=>{
  const data=window.UNIVERSITY_FINDER_DATA||(window.UNIVERSITY_FINDER_DATA=[]);
  const norm=value=>String(value||'').toLowerCase().normalize('NFKD').replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();
  const broad=['Computer Science','Engineering','Business','Economics','Mathematics','Data Science','Biology','Chemistry','Physics','Psychology','Social Sciences','Humanities'];
  const profiles={
    uk:{label:'英國',range:'80–95%+',courses:'6 門 Grade 12 U／M；競爭科系通常更看重相關先修與高分科目',language:'IELTS／TOEFL 或校方認可替代證明；依課程確認',extra:'多數學士經 UCAS；醫學、牙醫、法律、藝術等另有測驗、面試或作品集'},
    canada:{label:'加拿大',range:'80–95%+',courses:'OSSD、30 credits、40 小時志工與 OSSLT／替代要求；常以 6 門 Grade 12 U／M 計算',language:'依大學英文豁免規則；未符合時準備 IELTS／TOEFL／Duolingo',extra:'工程、商學、護理、健康與電腦科學常要求指定 4U 先修且實際門檻高於最低資格'},
    us:{label:'美國',range:'85–95%+',courses:'完整 Grade 9–12 成績、課程難度與 Grade 12 進度；OSSD 不以單一 6 科門檻概括',language:'依校方國際生政策準備英文檢定',extra:'整體審查；活動、文書、推薦信與 SAT／ACT 政策須逐校確認'},
    australia:{label:'澳洲',range:'80–95%+',courses:'通常依 6 門 Grade 12 U／M 與科系先修換算；各校換算表不同',language:'IELTS／TOEFL／PTE 或校方認可替代證明',extra:'醫療、教育、建築與設計可能有更高英文、面試、作品集或註冊要求'},
    japan:{label:'日本',range:'85–95%+',courses:'OSSD 可作 12 年學歷資格；英文授課學程與日文授課學程的審查路徑不同',language:'英文學程常看 IELTS／TOEFL；日文學程常要求 JLPT／EJU',extra:'部分國際學程另看 SAT／ACT／IB／EJU、書審與面試；必須核對當年度是否招生'},
    singapore:{label:'新加坡',range:'88–95%+',courses:'以 Ontario 高中資格與指定 Grade 12 科目個別審查；熱門課程競爭高',language:'依授課語言與校方豁免規則準備英文證明',extra:'公立自治大學與私立教育機構制度不同；私校須核對 SSG／EduTrust 與實際授位夥伴'},
    'south-korea':{label:'韓國',range:'85–95%+',courses:'OSSD 可作 12 年學歷證明；國際／英文軌與韓文軌要求不同',language:'英文軌常看 IELTS／TOEFL；韓文軌常要求 TOPIK',extra:'可能要求學業計畫、推薦信、面試與財力文件；逐校核對國際生名額'},
    china:{label:'中國大陸',range:'85–95%+',courses:'OSSD 可作 12 年高中學歷；須提交完整成績與畢業證明並符合科系先修',language:'中文授課通常要求 HSK；英文授課通常要求 IELTS／TOEFL 或校方認可證明',extra:'國際生路徑、入學測驗、面試、年齡與國籍規則各校不同；醫學尤其要核對授課語言與認證'}
  };
  const groups={};
  const addGroup=(id,label,system,edition,source,rows)=>{
    const parsed=rows.trim().split('\n').map((line,index)=>{const [name,nameZh,city,url,rankText]=line.split('|');return {name,nameZh,city,url,rank:Number(rankText||index+1)};});
    const showRank=!['usnews-us-2026','qs-japan-2027','qs-korea-2027','qs-china-2027','singapore-autonomous','singapore-private'].includes(id);
    groups[id]={id,label,system,edition,source,showRank,entries:parsed};
    for(const entry of parsed){
      let old=data.find(x=>norm(x.name)===norm(entry.name)||(x.aliases||[]).some(a=>norm(a)===norm(entry.name)));
      if(!old){
        const country=id.startsWith('the-uk')?'uk':id.startsWith('macleans')?'canada':id.startsWith('qs-australia')?'australia':id.startsWith('usnews')?'us':id.startsWith('qs-japan')?'japan':id.startsWith('singapore')?'singapore':id.startsWith('qs-korea')?'south-korea':'china';
        const p=profiles[country];
        old={name:entry.name,nameZh:entry.nameZh,city:entry.city,country,countryLabel:p.label,url:entry.url||'',majors:[...broad],aliases:[],goals:['名校／研究','科系探索'],catalogOnly:true,note:`${label}收錄學校；先依官方科系目錄確認實際學士學程與授課語言。`,apply:`OSSD 規劃區間 ${p.range}；${p.courses}。`};
        data.push(old);
      }else{
        old.majors=[...new Set([...(old.majors||[]),...broad])]; old.nameZh=old.nameZh||entry.nameZh; old.city=old.city||entry.city; old.url=old.url||entry.url;
      }
      old.rankingMemberships=[...(old.rankingMemberships||[]).filter(r=>r.id!==id),{id,label,rank:entry.rank,showRank,edition,system,source}];
      old.ossdPlanning={...profiles[old.country],disclaimer:'本站規劃區間，不是校方公布的保證錄取線；正式門檻依校系、年度與申請者背景而異。'};
    }
  };

  addGroup('the-uk-2026','THE 2026 英國前 50（含並列）','Times Higher Education','2026','https://www.timeshighereducation.com/student/best-universities/best-universities-uk',`
University of Oxford|牛津大學|Oxford|https://www.ox.ac.uk/admissions/undergraduate/courses|1
University of Cambridge|劍橋大學|Cambridge|https://www.undergraduate.study.cam.ac.uk/courses|2
Imperial College London|倫敦帝國學院|London|https://www.imperial.ac.uk/study/courses/undergraduate/|3
University College London|倫敦大學學院|London|https://www.ucl.ac.uk/prospective-students/undergraduate/degrees|4
University of Edinburgh|愛丁堡大學|Edinburgh|https://www.ed.ac.uk/studying/undergraduate/degrees|5
King's College London|倫敦國王學院|London|https://www.kcl.ac.uk/study/undergraduate/courses|6
London School of Economics and Political Science|倫敦政治經濟學院|London|https://www.lse.ac.uk/study-at-lse/Undergraduate/degree-programmes|7
University of Manchester|曼徹斯特大學|Manchester|https://www.manchester.ac.uk/study/undergraduate/courses/|8
University of Bristol|布里斯托大學|Bristol|https://www.bristol.ac.uk/study/undergraduate/|9
University of Glasgow|格拉斯哥大學|Glasgow|https://www.gla.ac.uk/undergraduate/degrees/|10
University of Birmingham|伯明罕大學|Birmingham|https://www.birmingham.ac.uk/study/undergraduate/subjects|11
University of Sheffield|雪菲爾大學|Sheffield|https://www.sheffield.ac.uk/undergraduate/courses|12
University of Leeds|里茲大學|Leeds|https://courses.leeds.ac.uk/|13
University of Warwick|華威大學|Coventry|https://warwick.ac.uk/study/undergraduate/courses/|14
University of Southampton|南安普敦大學|Southampton|https://www.southampton.ac.uk/courses|15
Queen Mary University of London|倫敦瑪麗王后大學|London|https://www.qmul.ac.uk/undergraduate/coursefinder/|16
University of Liverpool|利物浦大學|Liverpool|https://www.liverpool.ac.uk/courses/undergraduate/|17
Newcastle University|紐卡索大學|Newcastle|https://www.ncl.ac.uk/undergraduate/degrees/|18
University of Nottingham|諾丁漢大學|Nottingham|https://www.nottingham.ac.uk/ugstudy/course-search.aspx|19
University of York|約克大學|York|https://www.york.ac.uk/study/undergraduate/courses/|20
University of St Andrews|聖安德魯斯大學|St Andrews|https://www.st-andrews.ac.uk/subjects/|21
University of Exeter|艾克斯特大學|Exeter|https://www.exeter.ac.uk/study/undergraduate/courses/|22
Durham University|杜倫大學|Durham|https://www.durham.ac.uk/study/courses/undergraduate/|23
Lancaster University|蘭卡斯特大學|Lancaster|https://www.lancaster.ac.uk/study/undergraduate/courses/|24
University of Leicester|萊斯特大學|Leicester|https://le.ac.uk/courses|25
Queen's University Belfast|貝爾法斯特女王大學|Belfast|https://www.qub.ac.uk/courses/undergraduate/|26
Cardiff University|卡地夫大學|Cardiff|https://www.cardiff.ac.uk/study/undergraduate/courses|27
University of Aberdeen|亞伯丁大學|Aberdeen|https://www.abdn.ac.uk/study/undergraduate/degree-programmes/|27
University of Reading|雷丁大學|Reading|https://www.reading.ac.uk/ready-to-study/study/subject-area|27
University of Surrey|薩里大學|Guildford|https://www.surrey.ac.uk/undergraduate|27
University of Sussex|薩塞克斯大學|Brighton|https://www.sussex.ac.uk/study/undergraduate/courses|27
University of Bath|巴斯大學|Bath|https://www.bath.ac.uk/courses/undergraduate/|32
University of East Anglia|東英吉利大學|Norwich|https://www.uea.ac.uk/course-finder|32
Birkbeck, University of London|倫敦大學伯貝克學院|London|https://www.bbk.ac.uk/courses/undergraduate|34
Loughborough University|羅浮堡大學|Loughborough|https://www.lboro.ac.uk/study/undergraduate/courses/|34
City St George's, University of London|倫敦大學城市聖喬治學院|London|https://www.citystgeorges.ac.uk/prospective-students/courses/undergraduate|34
Swansea University|斯旺西大學|Swansea|https://www.swansea.ac.uk/undergraduate/courses/|34
University of Dundee|鄧迪大學|Dundee|https://www.dundee.ac.uk/undergraduate/courses|34
University of Essex|艾塞克斯大學|Colchester|https://www.essex.ac.uk/courses|34
University of Strathclyde|斯特拉斯克萊德大學|Glasgow|https://www.strath.ac.uk/courses/undergraduate/|40
Aston University|阿斯頓大學|Birmingham|https://www.aston.ac.uk/study/courses|41
Bournemouth University|伯恩茅斯大學|Bournemouth|https://www.bournemouth.ac.uk/study/courses/undergraduate|41
Brunel University London|倫敦布魯內爾大學|London|https://www.brunel.ac.uk/study/undergraduate|41
Heriot-Watt University|赫瑞瓦特大學|Edinburgh|https://www.hw.ac.uk/study/undergraduate|41
Northumbria University|諾森比亞大學|Newcastle|https://www.northumbria.ac.uk/study-at-northumbria/courses/|41
Royal Holloway, University of London|倫敦大學皇家霍洛威學院|Egham|https://www.royalholloway.ac.uk/studying-here/undergraduate/|41
SOAS University of London|倫敦大學亞非學院|London|https://www.soas.ac.uk/study/find-course|41
University of Kent|肯特大學|Canterbury|https://www.kent.ac.uk/courses/undergraduate|41
University of Portsmouth|樸茨茅斯大學|Portsmouth|https://www.port.ac.uk/study/courses/undergraduate|41
Bangor University|班戈大學|Bangor|https://www.bangor.ac.uk/courses/undergraduate|50
Goldsmiths, University of London|倫敦大學金匠學院|London|https://www.gold.ac.uk/course-finder/|50
Keele University|基爾大學|Keele|https://www.keele.ac.uk/study/undergraduate/undergraduatecourses/|50
Liverpool John Moores University|利物浦約翰摩爾斯大學|Liverpool|https://www.ljmu.ac.uk/study/courses/undergraduates|50
Middlesex University|密德薩斯大學|London|https://www.mdx.ac.uk/courses/undergraduate/|50
Royal Veterinary College, University of London|皇家獸醫學院|London|https://www.rvc.ac.uk/study/undergraduate|50
University of Bradford|布拉德福德大學|Bradford|https://www.bradford.ac.uk/courses/ug/|50
University of Huddersfield|哈德斯菲爾德大學|Huddersfield|https://courses.hud.ac.uk/|50
University of Hull|赫爾大學|Hull|https://www.hull.ac.uk/study/undergraduate|50
University of Plymouth|普利茅斯大學|Plymouth|https://www.plymouth.ac.uk/courses/undergraduate|50
University of Stirling|斯特靈大學|Stirling|https://www.stir.ac.uk/courses/ug/|50`);

  addGroup('macleans-medical-2026','Maclean’s 2026 醫博類','Maclean’s','2026','https://macleans.ca/education/university-rankings/',`
McGill University|麥基爾大學|Montréal|https://www.mcgill.ca/undergraduate-admissions/programs|1
University of Toronto|多倫多大學|Toronto|https://www.utoronto.ca/academics/undergraduate-programs|2
University of British Columbia|英屬哥倫比亞大學|Vancouver / Kelowna|https://you.ubc.ca/programs/|3
University of Alberta|亞伯達大學|Edmonton|https://www.ualberta.ca/en/undergraduate-programs/index.html|4
University of Calgary|卡加利大學|Calgary|https://www.ucalgary.ca/future-students/undergraduate/explore-programs|5
McMaster University|麥克馬斯特大學|Hamilton|https://future.mcmaster.ca/programs/|5
University of Ottawa|渥太華大學|Ottawa|https://www.uottawa.ca/study/undergraduate-studies/programs|7
Queen's University|皇后大學|Kingston|https://www.queensu.ca/admission/programs|7
Dalhousie University|達爾豪斯大學|Halifax|https://www.dal.ca/study/programs/undergraduate.html|9
Western University|西安大略大學|London, Ontario|https://welcome.uwo.ca/what-can-i-study/undergraduate-programs.html|10
Université de Montréal|蒙特婁大學|Montréal|https://admission.umontreal.ca/programmes-de-1er-cycle/|11
Université Laval|拉瓦爾大學|Québec City|https://www.ulaval.ca/etudes/programmes|12
University of Manitoba|曼尼托巴大學|Winnipeg|https://umanitoba.ca/explore/programs-of-study|13
University of Saskatchewan|薩斯喀徹溫大學|Saskatoon|https://admissions.usask.ca/programs/|14
Université de Sherbrooke|舍布魯克大學|Sherbrooke|https://www.usherbrooke.ca/admission/programmes|15`);
  addGroup('macleans-comprehensive-2026','Maclean’s 2026 綜合類','Maclean’s','2026','https://macleans.ca/education/university-rankings/',`
Simon Fraser University|西門菲莎大學|Burnaby|https://www.sfu.ca/students/admission/programs.html|1
University of Victoria|維多利亞大學|Victoria|https://www.uvic.ca/undergraduate/programs/|2
University of Waterloo|滑鐵盧大學|Waterloo|https://uwaterloo.ca/future-students/programs|3
University of Guelph|貴湖大學|Guelph|https://www.uoguelph.ca/programs/|4
York University|約克大學|Toronto|https://futurestudents.yorku.ca/program-search|5
Carleton University|卡爾頓大學|Ottawa|https://admissions.carleton.ca/programs/|6
University of New Brunswick|新布倫瑞克大學|Fredericton / Saint John|https://www.unb.ca/academics/programs/|7
Memorial University of Newfoundland|紐芬蘭紀念大學|St. John's|https://www.mun.ca/undergrad/programs/|8
Concordia University|康考迪亞大學|Montréal|https://www.concordia.ca/academics/undergraduate.html|9
Toronto Metropolitan University|多倫多都會大學|Toronto|https://www.torontomu.ca/programs/undergraduate/|10`);
  addGroup('macleans-undergraduate-2026','Maclean’s 2026 基礎大學類','Maclean’s','2026','https://macleans.ca/education/university-rankings/',`
Mount Allison University|蒙特愛立森大學|Sackville|https://mta.ca/academics/programs-and-degrees|1
University of Northern British Columbia|北英屬哥倫比亞大學|Prince George|https://www.unbc.ca/programs|2
Acadia University|阿卡迪亞大學|Wolfville|https://www2.acadiau.ca/academics/undergraduate.html|3
St. Francis Xavier University|聖法蘭西斯澤維爾大學|Antigonish|https://www.stfx.ca/academics/programs|4
Saint Mary's University|聖瑪麗大學|Halifax|https://www.smu.ca/academics/programs.html|5
Lakehead University|湖首大學|Thunder Bay / Orillia|https://www.lakeheadu.ca/programs/undergraduate-programs|6`);

  addGroup('qs-australia-2027','QS 2027 澳洲前 15','QS','2027','https://www.topuniversities.com/world-university-rankings',`
UNSW Sydney|新南威爾斯大學|Sydney|https://www.unsw.edu.au/study/undergraduate|1
University of Melbourne|墨爾本大學|Melbourne|https://study.unimelb.edu.au/find/courses/undergraduate/|2
University of Sydney|雪梨大學|Sydney|https://www.sydney.edu.au/courses/subject-areas.html|3
Australian National University|澳洲國立大學|Canberra|https://programsandcourses.anu.edu.au/|4
Monash University|蒙納許大學|Melbourne|https://www.monash.edu/study/courses|5
University of Queensland|昆士蘭大學|Brisbane|https://study.uq.edu.au/study-options/programs|6
University of Western Australia|西澳大學|Perth|https://www.uwa.edu.au/study/courses-and-careers|7
University of Adelaide|阿德雷德大學|Adelaide|https://www.adelaide.edu.au/degree-finder/|8
University of Technology Sydney|雪梨科技大學|Sydney|https://www.uts.edu.au/study/find-a-course|9
RMIT University|皇家墨爾本理工大學|Melbourne|https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study|10
Macquarie University|麥覺理大學|Sydney|https://www.mq.edu.au/study/find-a-course|11
University of Wollongong|臥龍崗大學|Wollongong|https://www.uow.edu.au/study/courses/|12
Curtin University|科廷大學|Perth|https://www.curtin.edu.au/study/undergraduate/|13
Deakin University|迪肯大學|Victoria|https://www.deakin.edu.au/courses|14
University of Newcastle|紐卡索大學（澳洲）|Newcastle|https://www.newcastle.edu.au/degrees|15`);

  const us=`Princeton University|普林斯頓大學|Princeton, New Jersey|https://www.princeton.edu/academics/areas-of-study
Massachusetts Institute of Technology|麻省理工學院|Cambridge, Massachusetts|https://mitadmissions.org/discover/the-schools/
Harvard University|哈佛大學|Cambridge, Massachusetts|https://college.harvard.edu/academics
Stanford University|史丹佛大學|Stanford, California|https://majors.stanford.edu/
Yale University|耶魯大學|New Haven, Connecticut|https://catalog.yale.edu/ycps/majors-by-disciplines/
California Institute of Technology|加州理工學院|Pasadena, California|https://www.admissions.caltech.edu/explore/academics/options
Duke University|杜克大學|Durham, North Carolina|https://admissions.duke.edu/academic-possibilities/
Johns Hopkins University|約翰霍普金斯大學|Baltimore, Maryland|https://apply.jhu.edu/academics/majors-minors-programs/
Northwestern University|西北大學|Evanston, Illinois|https://admissions.northwestern.edu/academics/majors-minors/
University of Pennsylvania|賓夕法尼亞大學|Philadelphia, Pennsylvania|https://admissions.upenn.edu/academics
Cornell University|康乃爾大學|Ithaca, New York|https://www.cornell.edu/academics/fields.cfm
University of Chicago|芝加哥大學|Chicago, Illinois|https://college.uchicago.edu/academics/programs-study
Brown University|布朗大學|Providence, Rhode Island|https://www.brown.edu/academics/undergraduate-programs
Columbia University|哥倫比亞大學|New York, New York|https://undergrad.admissions.columbia.edu/academics
Dartmouth College|達特茅斯學院|Hanover, New Hampshire|https://admissions.dartmouth.edu/academics
University of California, Los Angeles|加州大學洛杉磯分校|Los Angeles, California|https://admission.ucla.edu/apply/majors
University of California, Berkeley|加州大學柏克萊分校|Berkeley, California|https://www.berkeley.edu/academics/
Rice University|萊斯大學|Houston, Texas|https://admission.rice.edu/academics/majors-minors-programs
University of Notre Dame|聖母大學|Notre Dame, Indiana|https://admissions.nd.edu/majors/
Vanderbilt University|范德堡大學|Nashville, Tennessee|https://www.vanderbilt.edu/academics/program-finder/
Carnegie Mellon University|卡內基美隆大學|Pittsburgh, Pennsylvania|https://www.cmu.edu/academics/index.html
University of Michigan|密西根大學|Ann Arbor, Michigan|https://admissions.umich.edu/academics-majors/majors-degrees
Washington University in St. Louis|聖路易華盛頓大學|St. Louis, Missouri|https://admissions.washu.edu/academics/majors-and-programs/
Emory University|埃默里大學|Atlanta, Georgia|https://apply.emory.edu/academics/majors-minors.html
Georgetown University|喬治城大學|Washington, DC|https://www.georgetown.edu/academics/
University of Virginia|維吉尼亞大學|Charlottesville, Virginia|https://www.virginia.edu/academics
University of North Carolina at Chapel Hill|北卡羅來納大學教堂山分校|Chapel Hill, North Carolina|https://catalog.unc.edu/undergraduate/programs-study/
University of Southern California|南加州大學|Los Angeles, California|https://www.usc.edu/academics/
University of California, San Diego|加州大學聖地牙哥分校|San Diego, California|https://students.ucsd.edu/academics/advising/majors-minors/undergraduate-majors.html
New York University|紐約大學|New York, New York|https://www.nyu.edu/academics/academic-programs.html
University of Florida|佛羅里達大學|Gainesville, Florida|https://catalog.ufl.edu/UGRD/programs/
University of Texas at Austin|德州大學奧斯汀分校|Austin, Texas|https://admissions.utexas.edu/explore/academics/
Georgia Institute of Technology|喬治亞理工學院|Atlanta, Georgia|https://www.gatech.edu/academics/degrees
University of California, Davis|加州大學戴維斯分校|Davis, California|https://www.ucdavis.edu/majors
University of California, Irvine|加州大學爾灣分校|Irvine, California|https://www.admissions.uci.edu/academics/majors.php
University of Illinois Urbana-Champaign|伊利諾大學香檳分校|Champaign, Illinois|https://www.admissions.illinois.edu/academics/majors
Boston College|波士頓學院|Chestnut Hill, Massachusetts|https://www.bc.edu/bc-web/academics.html
Tufts University|塔夫茨大學|Medford, Massachusetts|https://www.tufts.edu/academics
University of Wisconsin-Madison|威斯康辛大學麥迪遜分校|Madison, Wisconsin|https://www.wisc.edu/academics/
University of California, Santa Barbara|加州大學聖塔芭芭拉分校|Santa Barbara, California|https://my.sa.ucsb.edu/catalog/Current/CollegesDepartments/ls-intro.aspx
Ohio State University|俄亥俄州立大學|Columbus, Ohio|https://undergrad.osu.edu/majors-and-academics/majors
Rutgers University-New Brunswick|羅格斯大學新布朗斯維克分校|New Brunswick, New Jersey|https://newbrunswick.rutgers.edu/academics
University of Maryland, College Park|馬里蘭大學學院市分校|College Park, Maryland|https://www.umd.edu/majors
University of Rochester|羅徹斯特大學|Rochester, New York|https://www.rochester.edu/academics/
Lehigh University|理海大學|Bethlehem, Pennsylvania|https://www1.lehigh.edu/academics/undergraduate
Purdue University|普渡大學|West Lafayette, Indiana|https://www.admissions.purdue.edu/majors/
University of Georgia|喬治亞大學|Athens, Georgia|https://www.admissions.uga.edu/academics/majors/
University of Washington|華盛頓大學|Seattle, Washington|https://www.washington.edu/uaa/advising/degree-overview/majors/
Wake Forest University|維克森林大學|Winston-Salem, North Carolina|https://admissions.wfu.edu/academics/majors-minors/
Case Western Reserve University|凱斯西儲大學|Cleveland, Ohio|https://case.edu/admission/academics/areas-study
Texas A&M University|德州農工大學|College Station, Texas|https://www.tamu.edu/academics/majors/index.html
Virginia Tech|維吉尼亞理工|Blacksburg, Virginia|https://www.vt.edu/academics/majors.html
University of Minnesota Twin Cities|明尼蘇達大學雙城分校|Minneapolis, Minnesota|https://admissions.tc.umn.edu/academics/majors-and-programs
Northeastern University|東北大學|Boston, Massachusetts|https://admissions.northeastern.edu/academics/
William & Mary|威廉與瑪麗學院|Williamsburg, Virginia|https://www.wm.edu/academics/
Florida State University|佛羅里達州立大學|Tallahassee, Florida|https://admissions.fsu.edu/first-year/academics/majors/
University of Massachusetts Amherst|麻薩諸塞大學阿默斯特分校|Amherst, Massachusetts|https://www.umass.edu/academics/undergraduate-programs
University of Miami|邁阿密大學|Coral Gables, Florida|https://admissions.miami.edu/undergraduate/academics/majors-by-school-or-college/index.html
Tulane University|杜蘭大學|New Orleans, Louisiana|https://admission.tulane.edu/academics/majors-minors
Brandeis University|布蘭迪斯大學|Waltham, Massachusetts|https://www.brandeis.edu/academics/undergraduate/index.html
Rensselaer Polytechnic Institute|壬色列理工學院|Troy, New York|https://www.rpi.edu/academics
Santa Clara University|聖塔克拉拉大學|Santa Clara, California|https://www.scu.edu/academics/
Syracuse University|雪城大學|Syracuse, New York|https://www.syracuse.edu/academics/programs/
George Washington University|喬治華盛頓大學|Washington, DC|https://www.gwu.edu/academic-programs
Pennsylvania State University, University Park|賓州州立大學大學公園分校|University Park, Pennsylvania|https://www.psu.edu/academics/undergraduate/majors/
Stony Brook University|石溪大學|Stony Brook, New York|https://www.stonybrook.edu/commcms/undergraduate-admissions/academics/programs.php
University of Connecticut|康乃狄克大學|Storrs, Connecticut|https://admissions.uconn.edu/academics/majors/
University at Buffalo, SUNY|紐約州立大學水牛城分校|Buffalo, New York|https://www.buffalo.edu/home/academics/undergraduate.html
Michigan State University|密西根州立大學|East Lansing, Michigan|https://admissions.msu.edu/academics/majors-degrees-programs
North Carolina State University|北卡羅來納州立大學|Raleigh, North Carolina|https://majorsandminors.dasa.ncsu.edu/
Binghamton University, SUNY|紐約州立大學賓漢頓分校|Binghamton, New York|https://www.binghamton.edu/academics/programs.html
Indiana University Bloomington|印第安納大學布魯明頓分校|Bloomington, Indiana|https://academics.iu.edu/degrees/index.html
Clemson University|克萊門森大學|Clemson, South Carolina|https://www.clemson.edu/degrees/
Fordham University|福坦莫大學|New York, New York|https://www.fordham.edu/academics/programs/
American University|美利堅大學|Washington, DC|https://www.american.edu/academics/
Baylor University|貝勒大學|Waco, Texas|https://admissions.web.baylor.edu/academics/majors
Loyola Marymount University|洛約拉馬利蒙特大學|Los Angeles, California|https://academics.lmu.edu/programs/
Marquette University|馬凱特大學|Milwaukee, Wisconsin|https://www.marquette.edu/explore/majors.php
Stevens Institute of Technology|史蒂文斯理工學院|Hoboken, New Jersey|https://www.stevens.edu/academics/undergraduate-study
University of California, Riverside|加州大學河濱分校|Riverside, California|https://admissions.ucr.edu/majors
Colorado School of Mines|科羅拉多礦業學院|Golden, Colorado|https://www.mines.edu/academics/
Drexel University|卓克索大學|Philadelphia, Pennsylvania|https://drexel.edu/academics/programs/
Howard University|霍華德大學|Washington, DC|https://howard.edu/academics
New Jersey Institute of Technology|紐澤西理工學院|Newark, New Jersey|https://www.njit.edu/academics
Southern Methodist University|南衛理公會大學|Dallas, Texas|https://www.smu.edu/academics
Texas Christian University|德州基督教大學|Fort Worth, Texas|https://www.tcu.edu/academics/programs.php
University of Delaware|德拉瓦大學|Newark, Delaware|https://www.udel.edu/academics/colleges/
University of Denver|丹佛大學|Denver, Colorado|https://www.du.edu/academics
University of Iowa|愛荷華大學|Iowa City, Iowa|https://admissions.uiowa.edu/academics
University of Pittsburgh|匹茲堡大學|Pittsburgh, Pennsylvania|https://www.pitt.edu/academics
University of Utah|猶他大學|Salt Lake City, Utah|https://admissions.utah.edu/academics/majors/
Auburn University|奧本大學|Auburn, Alabama|https://www.auburn.edu/academic/programs/
Arizona State University (Tempe)|亞利桑那州立大學|Tempe, Arizona|https://degrees.apps.asu.edu/bachelors
University of Arizona|亞利桑那大學|Tucson, Arizona|https://www.arizona.edu/degree-search/majors
University of Colorado Boulder|科羅拉多大學波德分校|Boulder, Colorado|https://www.colorado.edu/academics
University of Kansas|堪薩斯大學|Lawrence, Kansas|https://academics.ku.edu/degree-programs
University of Kentucky|肯塔基大學|Lexington, Kentucky|https://academics.uky.edu/programs/bachelors
University of Missouri|密蘇里大學|Columbia, Missouri|https://majors.missouri.edu/
University of Nebraska-Lincoln|內布拉斯加大學林肯分校|Lincoln, Nebraska|https://admissions.unl.edu/academics/
University of Oregon|奧勒岡大學|Eugene, Oregon|https://admissions.uoregon.edu/majors
University of South Florida|南佛羅里達大學|Tampa, Florida|https://www.usf.edu/undergrad/programs/academic-programs.aspx
University of Tennessee, Knoxville|田納西大學諾克斯維爾分校|Knoxville, Tennessee|https://admissions.utk.edu/undergraduate-programs/
Iowa State University|愛荷華州立大學|Ames, Iowa|https://www.iastate.edu/academics/majors-minors-certificates
Temple University|天普大學|Philadelphia, Pennsylvania|https://www.temple.edu/academics/degree-programs
University of Central Florida|中佛羅里達大學|Orlando, Florida|https://www.ucf.edu/degree-search/
University of Houston|休士頓大學|Houston, Texas|https://www.uh.edu/undergraduate-admissions/discover/majors/
University of Oklahoma|奧克拉荷馬大學|Norman, Oklahoma|https://www.ou.edu/admissions/academics/majors
University of Cincinnati|辛辛那提大學|Cincinnati, Ohio|https://www.uc.edu/majors-programs.html`;
  addGroup('usnews-us-2026','U.S. News 2026 美國 National Universities 前 100 範圍','U.S. News','2026','https://www.usnews.com/best-colleges/rankings/national-universities',us);

  addGroup('qs-japan-2027','QS 2027 日本重點 30 校／國際學程','QS','2027','https://www.topuniversities.com/world-university-rankings',`
University of Tokyo|東京大學|Tokyo|https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html|1
Kyoto University|京都大學|Kyoto|https://www.iup.kyoto-u.ac.jp/|2
Osaka University|大阪大學|Osaka|https://www.osaka-u.ac.jp/en/admissions|3
Institute of Science Tokyo|東京科學大學|Tokyo|https://admissions.isct.ac.jp/en/|4
Tohoku University|東北大學|Sendai|https://www.insc.tohoku.ac.jp/english/degree/undergraduate-english/|5
Nagoya University|名古屋大學|Nagoya|https://admissions.g30.nagoya-u.ac.jp/|6
Kyushu University|九州大學|Fukuoka|https://www.kyushu-u.ac.jp/en/admission/|7
Hokkaido University|北海道大學|Sapporo|https://www.global.hokudai.ac.jp/admissions/|8
Waseda University|早稻田大學|Tokyo|https://www.waseda.jp/inst/admission/en/undergraduate/|9
Keio University|慶應義塾大學|Tokyo|https://www.keio.ac.jp/en/admissions/|10
University of Tsukuba|筑波大學|Tsukuba|https://www.tsukuba.ac.jp/en/admissions/|11
Kobe University|神戶大學|Kobe|https://www.kobe-u.ac.jp/en/academics/admissions/|12
Hiroshima University|廣島大學|Hiroshima|https://www.hiroshima-u.ac.jp/en/admissions|13
Hitotsubashi University|一橋大學|Tokyo|https://www.hit-u.ac.jp/eng/admission/|14
Chiba University|千葉大學|Chiba|https://www.chiba-u.jp/e/admissions/|15
Yokohama National University|橫濱國立大學|Yokohama|https://www.ynu.ac.jp/english/admissions/|16
Tokyo University of Science|東京理科大學|Tokyo|https://www.tus.ac.jp/en/admissions/|17
Ritsumeikan University|立命館大學|Kyoto / Osaka / Shiga|https://en.ritsumei.ac.jp/e-ug/|18
Sophia University|上智大學|Tokyo|https://adm.sophia.ac.jp/eng/admissions/|19
International Christian University|國際基督教大學|Tokyo|https://www.icu.ac.jp/en/admissions/undergraduate/|20
Osaka Metropolitan University|大阪公立大學|Osaka|https://www.omu.ac.jp/en/admissions/|21
Tokyo Metropolitan University|東京都立大學|Tokyo|https://www.tmu.ac.jp/english/entrance.html|22
Kanazawa University|金澤大學|Kanazawa|https://www.kanazawa-u.ac.jp/e/admission/|23
Okayama University|岡山大學|Okayama|https://discovery.okayama-u.ac.jp/en/|24
Kumamoto University|熊本大學|Kumamoto|https://ewww.kumamoto-u.ac.jp/en/prospective/|25
Ritsumeikan Asia Pacific University|立命館亞洲太平洋大學|Beppu|https://admissions.apu.ac.jp/|26
Akita International University|秋田國際教養大學|Akita|https://web.aiu.ac.jp/en/admissions/|27
Doshisha University|同志社大學|Kyoto|https://ila.doshisha.ac.jp/ila/en/admissions/|28
Kwansei Gakuin University|關西學院大學|Hyogo|https://global.kwansei.ac.jp/admissions/|29
Hosei University|法政大學|Tokyo|https://www.hosei.ac.jp/english/admissions/|30`);

  addGroup('singapore-autonomous','新加坡自治大學（6 所）','Singapore MOE','2026','https://www.moe.gov.sg/post-secondary/overview/autonomous-universities',`
National University of Singapore|新加坡國立大學|Singapore|https://nus.edu.sg/oam/academic-programmes|1
Nanyang Technological University|南洋理工大學|Singapore|https://www.ntu.edu.sg/education/undergraduate-programme|2
Singapore Management University|新加坡管理大學|Singapore|https://admissions.smu.edu.sg/programmes|3
Singapore University of Technology and Design|新加坡科技設計大學|Singapore|https://www.sutd.edu.sg/education/undergraduate/|4
Singapore Institute of Technology|新加坡理工大學|Singapore|https://www.singaporetech.edu.sg/undergraduate-programmes|5
Singapore University of Social Sciences|新躍社科大學|Singapore|https://www.suss.edu.sg/programmes|6`);
  addGroup('singapore-private','新加坡主要私立教育機構（非排名）','SSG／EduTrust 查核清單','2026','https://www.tpgateway.gov.sg/resources/information-for-private-education-institutions-(peis)',`
James Cook University Singapore|詹姆士庫克大學新加坡校區|Singapore|https://www.jcu.edu.sg/courses-and-study|1
Curtin Singapore|科廷大學新加坡校區|Singapore|https://curtin.edu.sg/courses/|2
SIM Global Education|新加坡管理學院全球教育|Singapore|https://www.sim.edu.sg/degrees-diplomas|3
Kaplan Singapore|新加坡楷博高等教育學院|Singapore|https://www.kaplan.com.sg/academic-programmes|4
PSB Academy|PSB 學院|Singapore|https://www.psb-academy.edu.sg/academic-level/bachelors-degree|5
Management Development Institute of Singapore|新加坡管理發展學院|Singapore|https://www.mdis.edu.sg/bachelors-degree|6
Raffles College of Higher Education|萊佛士高等教育學院|Singapore|https://raffles-college.edu.sg/programmes/|7
Amity Global Institute Singapore|新加坡阿米提全球學院|Singapore|https://www.amitysingapore.sg/courses/|8
DIMENSIONS International College|博偉國際教育學院|Singapore|https://dimensions.edu.sg/academic-courses/|9
ERC Institute|ERC 創業管理學院|Singapore|https://erci.edu.sg/programmes/|10`);

  addGroup('qs-korea-2027','QS 2027 韓國前 10','QS','2027','https://www.topuniversities.com/world-university-rankings',`
Seoul National University|首爾大學|Seoul|https://en.snu.ac.kr/admission|1
KAIST|韓國科學技術院|Daejeon|https://admission.kaist.ac.kr/intl-undergraduate/|2
Yonsei University|延世大學|Seoul|https://www.yonsei.ac.kr/en_sc/admission/|3
Korea University|高麗大學|Seoul|https://oia.korea.ac.kr/oia/under/admission.do|4
POSTECH|浦項工科大學|Pohang|https://adm-iu.postech.ac.kr/|5
Sungkyunkwan University|成均館大學|Seoul / Suwon|https://admission-global.skku.edu/eng/|6
Hanyang University|漢陽大學|Seoul|https://oia.hanyang.ac.kr/|7
UNIST|蔚山科學技術院|Ulsan|https://admu-intl.unist.ac.kr/|8
Kyung Hee University|慶熙大學|Seoul / Suwon|https://iadmission.khu.ac.kr/|9
Ewha Womans University|梨花女子大學|Seoul|https://admission.ewha.ac.kr/admission/html/international/guide.asp|10`);

  addGroup('qs-china-2027','QS 2027 中國內地前 30','QS','2027','https://www.topuniversities.com/world-university-rankings',`
Peking University|北京大學|Beijing|https://www.isd.pku.edu.cn/en/undergraduate.php|1
Tsinghua University|清華大學|Beijing|https://international.join-tsinghua.edu.cn/|2
Fudan University|復旦大學|Shanghai|https://iso.fudan.edu.cn/isoenglish/|3
Shanghai Jiao Tong University|上海交通大學|Shanghai|https://isc.sjtu.edu.cn/EN/content.aspx?info_lb=38|4
Zhejiang University|浙江大學|Hangzhou|https://iczu.zju.edu.cn/admissionsen/|5
University of Science and Technology of China|中國科學技術大學|Hefei|https://isa.ustc.edu.cn/|6
Nanjing University|南京大學|Nanjing|https://hwxy.nju.edu.cn/English/Admissions/|7
Tongji University|同濟大學|Shanghai|https://study.tongji.edu.cn/|8
Wuhan University|武漢大學|Wuhan|https://admission.whu.edu.cn/|9
Harbin Institute of Technology|哈爾濱工業大學|Harbin|http://studyathit.hit.edu.cn/|10
Beijing Normal University|北京師範大學|Beijing|https://iso.bnu.edu.cn/en/|11
Sun Yat-sen University|中山大學|Guangzhou|https://iso.sysu.edu.cn/en|12
Xi'an Jiaotong University|西安交通大學|Xi'an|https://sie.xjtu.edu.cn/en/|13
Tianjin University|天津大學|Tianjin|https://sie.tju.edu.cn/en/|14
Huazhong University of Science and Technology|華中科技大學|Wuhan|https://iso.hust.edu.cn/|15
Southern University of Science and Technology|南方科技大學|Shenzhen|https://www.sustech.edu.cn/en/admissions.html|16
Beijing Institute of Technology|北京理工大學|Beijing|https://isc.bit.edu.cn/|17
Shandong University|山東大學|Jinan|https://www.istudy.sdu.edu.cn/|18
Sichuan University|四川大學|Chengdu|https://global.scu.edu.cn/oso/|19
Xiamen University|廈門大學|Xiamen|https://admissions.xmu.edu.cn/|20
Nankai University|南開大學|Tianjin|https://ensie.nankai.edu.cn/|21
Southeast University|東南大學|Nanjing|https://cis.seu.edu.cn/|22
Renmin University of China|中國人民大學|Beijing|https://iso.ruc.edu.cn/|23
Beihang University|北京航空航天大學|Beijing|https://is.buaa.edu.cn/|24
South China University of Technology|華南理工大學|Guangzhou|https://sie.scut.edu.cn/|25
Central South University|中南大學|Changsha|https://intl.csu.edu.cn/|26
Dalian University of Technology|大連理工大學|Dalian|https://sie.dlut.edu.cn/|27
Jilin University|吉林大學|Changchun|https://cie.jlu.edu.cn/|28
East China Normal University|華東師範大學|Shanghai|https://lxs.ecnu.edu.cn/en/|29
University of Electronic Science and Technology of China|電子科技大學|Chengdu|https://en.uestc.edu.cn/Admissions.htm|30`);

  // Consolidate legacy programme-specific rows and known naming variants so one university has one card.
  const aliases={'University College London':'University College London (UCL)'};
  for(const row of [...data]){
    const canonical=aliases[row.name]||row.name.split(' — ')[0];
    if(canonical===row.name)continue;
    const target=data.find(x=>x!==row&&norm(x.name)===norm(canonical));
    if(!target)continue;
    target.majors=[...new Set([...(target.majors||[]),...(row.majors||[])])];
    target.aliases=[...new Set([...(target.aliases||[]),row.name,...(row.aliases||[])])];
    target.rankingMemberships=[...new Map([...(target.rankingMemberships||[]),...(row.rankingMemberships||[])].map(r=>[r.id,r])).values()];
    target.ossdPlanning=target.ossdPlanning||row.ossdPlanning;
    data.splice(data.indexOf(row),1);
  }

  window.GLOBAL_RANKING_DATA={
    groups,
    normalize:norm,
    get(name){const key=norm(name);const row=data.find(x=>norm(x.name)===key||(x.aliases||[]).some(a=>norm(a)===key));return row?.rankingMemberships||[];},
    profile(country){return profiles[country]||null;}
  };
})();
