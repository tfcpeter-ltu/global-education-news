(function(g){'use strict';
const meanings={borrow:'借入',lend:'借出',keep:'保留',bring:'帶來',attend:'出席',join:'加入／參與',participate:'參與',reach:'到達',arrive:'抵達',get:'取得／到達（視搭配而定）',leave:'離開',listen:'聆聽',postpone:'延期',cancel:'取消',discover:'發現',reduce:'減少',increase:'增加',provide:'提供',invent:'發明',prevent:'阻止',avoid:'避免',improve:'改善'};
const lex={
 borrow:['動作方向是從圖書館把書借進來；borrow 表示借入，lend 表示把自己的東西借給別人。','borrow something from someone；lend something to someone','borrow a book from the library'],
 attend:['空格後面是 meeting，重點是出席這場會議。attend 可以直接接受活動。','attend a meeting；participate in a meeting','attend the school meeting'],
 reach:['空格後直接接地點，且句意要求到達。reach 不需要另外加 to、at 或 in。','reach + 地點；arrive at/in + 地點；get to + 地點','reach the station / arrive at the station'],
 postpone:['until 後面是延後實施的日期；活動仍會舉行，只是時間往後移。','postpone 是延期；cancel 是取消，兩者結果不同。','postpone the activity until Friday'],
 reduce:['句子談 plastic waste，這裡要表達減少垃圾量。reduce 是減少，increase 則是增加。','先把單字放回受詞搭配，不要只憑看過這個字作答。','reduce waste / increase the amount'],
 provide:['free materials 是要提供給活動使用的資源，provide 表示供應或提供。','provide something for someone；provide someone with something','provide free materials for students'],
 improve:['daily reading 是練習方法，句意是使英文能力變得更好；improve 表示改善、進步。','improve 接要改善的事物，例如 English、skills 或 health。','Reading can improve your English.'],
 discover:['a new fact 指原本存在、後來才知道的事實；discover 是發現，invent 是創造原本沒有的東西。','discover a fact；invent a device','discover a new fact / invent a new tool']
};
const forms={
 since:['時間起點與一段時間','年份是時間起點；has studied 表示從過去持續到現在，起點前用 since。','since + 起點；for + 一段時間','She has studied English since 2020.',{for:'for 後面需要期間，例如 three years；此處是年份起點。',during:'during 表示在某段期間內，通常接 the lesson、the summer 等期間名詞，不能在此表示從該年份持續至今。',from:'from 可以標示起點，但在本題現在完成式的「持續至今」結構中，應使用 since；from 常另外搭配 to/until。'}],
 for:['時間起點與一段時間','空格後面是一段時間，而不是某個開始日期，所以用 for。','since + 起點；for + 一段時間','She has studied English for three years.',{since:'since 後面應接時間起點，例如 2020，而不是持續了幾年。',during:'during 強調某期間內發生的事情，不能取代本題表示持續長度的 for。',from:'from 標示起點；本題提供的是期間長度。'}],
 'was built':['過去式被動語態','study room 是被建造的東西，不是建造別人的人；明確的過去年份需要過去式。','單數主詞 + was + 過去分詞','The room was built in 2020.',{built:'只有 built，缺少被動語態需要的 be 動詞；本題主詞是被建造的房間。','is building':'is building 是現在進行式主動語態，既不符合房間被建造的意思，也不符合過去年份。','has build':'完成式需要 has + 過去分詞 built；而且本題也需要被動語態，不能用 has build。'}],
 safer:['形容詞比較級','than 表示拿新路線與舊路線比較；safe 的常見比較級是 safer。','safe → safer → safest','This route is safer than the old one.',{safe:'safe 是原級，沒有表達 than 所需要的兩者比較。',safest:'safest 是最高級，通常用於三者以上的範圍比較；本題只比較新、舊兩條路線。',safely:'safely 是副詞；is 後面需要描述 route 的形容詞比較級。','more safe':'more safe 在部分語境也可能成立。一般教材以 safer 為常見形式，但兩者同時列為選項容易產生歧義。'}],
 finishes:['未來條件句','主句有 will check；if 子句描述可實現的未來條件，通常用現在式。主詞是單數人名，要加 -es。','If + 現在式，主句 will + 原形動詞','If Amy finishes early, the teacher will check it.',{'will finish':'本題是一般未來條件，不是在 if 子句表達意願；未來的 will 放在主句。',finished:'finished 是過去式，不符合本題 If + 現在式、will + 原形的條件句配對。',finishing:'finishing 不能單獨作這個 if 子句的限定動詞，需要完整的動詞形式。'}],
 who:['關係代名詞作主詞','先行詞 student 是人；空格後直接接 helped，所以關係代名詞也要擔任 helped 的主詞。','人 + who/that + 動詞；地點或時間的關係副詞用途不同。','The student who helped us is Amy.',{which:'which 通常指物，這裡的先行詞是人。',where:'where 表示地點，不能代替這裡 helped 的人物主詞。',when:'when 表示時間，不能代替這裡 helped 的人物主詞。'}],
 reading:['enjoy 後面的動詞形式','enjoy 後面要接動名詞；read 加 -ing 成為 reading，表示喜歡閱讀這件事。','enjoy + V-ing；不是 enjoy + to V','Amy enjoys reading English articles.',{'to read':'enjoy 不接不定詞 to read；不同動詞有不同的後接形式。',read:'這裡不能直接接原形 read，需改為動名詞 reading。',reads:'reads 是第三人稱單數動詞，不是 enjoy 後面需要的動名詞。'}],
 'turn off':['助動詞後接原形','should 已經是助動詞；後面的動詞不再加 -s、-ed 或 -ing。','should/can/must + 原形動詞','Students should turn off their phones.',{'turns off':'加 -s 是一般現在式第三人稱單數形式；助動詞 should 後用原形。','turned off':'-ed 是過去式或過去分詞形式；should 後不能直接接這個形式。','turning off':'-ing 不能直接放在 should 後；本題需要原形 turn off。'}],
 'was studying':['過去進行式','題目要求指出那個過去時刻正在進行的動作；was + studying 表示當時正在讀書。','was/were + V-ing；注意「正在進行」與單純過去事件的差別。','Amy was studying when the teacher called.',{studied:'studied 敘述過去的讀書事件，沒有像 was studying 一樣明確標示當時正在進行。','has studied':'現在完成式連結過去與現在，不是指出某個過去時刻正在進行。','will study':'will study 表未來，不符合本題明確的過去時間。'}],
 to:['ask + 人 + to V','asked 後面先接人，再用 to + 原形動詞說明要求對方做什麼。','ask/tell/want + 人 + to V','The teacher asked Amy to finish the report.',{for:'ask for 表示請求某個東西，不能直接用 asked + 人 + for finish。',at:'at 是介系詞，不能組成本題要求對方完成某事的不定詞。',with:'with 表示與、用，不能取代這裡的不定詞 to。'}],
 'getting up':['be used to 與 used to 的區別','is used to 表示「習慣於」；這裡 to 是介系詞，後面要接名詞或 V-ing。','be used to + V-ing；used to + 原形動詞表示過去習慣。','Amy is used to getting up early.',{'get up':'原形適用於 used to get up 這種過去習慣；本題有 is，結構是 be used to + V-ing。','got up':'got up 是過去式，不能放在本題介系詞 to 後作動名詞。','to get up':'題目已經有 to，不能再接第二個 to get up；這裡應用 getting up。'}],
 'to finish':['花費時間的句型','It took + 人 + 時間後面接 to V，說明花時間完成的動作。','It takes/took + 人 + 時間 + to V','It took Amy thirty minutes to finish the homework.',{finishing:'本句型用不定詞 to finish，不是直接接動名詞。',finish:'這裡需要以 to 引導的不定詞，只有原形 finish 少了句型要求的不定詞標記。',finished:'finished 是過去式或過去分詞；took 已標示過去，後面的不定詞仍用 to finish。'}],
 'to continue':['too ... to ...','too tired 表示太累，接 to continue 說明因太累而無法繼續的動作。','too + 形容詞 + to V','Amy was too tired to continue.',{continuing:'too + 形容詞後用 to V，不能直接接 continuing。',continued:'was 已經是句子的限定動詞；這裡需要 to continue 表達無法繼續的動作。',continue:'原形前少了不定詞標記 to。'}]
};
const relation={
 'in addition':['補充','前後增加另一項學習方法，沒有否定前一項。','In addition 表「此外」，增加同方向資訊。'],
 however:['轉折','前後出現與原先預期不同的情況，需要表達反差。','However 表「然而」，讓讀者注意反差。'],
 therefore:['結果','前句提供原因，後句交代因此採取的處理方式。','Therefore 表「因此」，用來引出結果。'],
 instead:['替代','原先的工具無法使用，後句改用另一個工具。','Instead 表「改用／取而代之」，強調替代。'],
 so:['結果','前面先交代累的原因或狀態，後面再接回家的結果。','so 連接結果；because 則用來引出原因。']
};
const relationMeaning={'in addition':'補充另一項資訊',however:'轉折或反差',therefore:'原因導致的結果',instead:'取代前一種做法',because:'原因',although:'讓步或雖然',during:'某段期間',so:'結果'};
const readingReasons={
 detail:{'The project ended after one day.':'原文說 now meets every ...，活動目前仍定期進行，與只做一天就結束矛盾。','Only teachers may join.':'原文參與者是 classmates、students，沒有「只有教師能加入」的限制。','The group never meets again.':'原文有 now meets every ...，直接說明團體仍會見面。'},
 mainIdea:{'A complaint about school rules.':'全文沒有抱怨校規的內容，主要事件是學生專案與參與人數增加。','A class travel schedule.':'文中雖然有時間與地點，但沒有安排旅遊行程；不能因看到日期就選 travel schedule。','Instructions for an English test.':'原文沒有說明考試步驟，而是在描述一個持續進行的學生專案。'},
 reference:{'the teachers only':'前面提到加入專案的是學生，沒有建立一個只由教師組成的團體。','visitors at the station':'地點名稱不等於參與者；原文沒有提到訪客組成 The group。','people in another city':'原文沒有介紹另一個城市的人，不能自行添加這個指涉對象。'},
 inference:{'Every student was forced to join.':'Every 和 forced 都比原文說得更強；文章只說更多學生加入，沒有證據說每個人都被迫加入。','The project was too expensive.':'文章沒有費用資訊，無法從「參與人數增加」推論專案太貴。','The students stopped after one week.':'原文說 now meets every ...，顯示目前持續活動，沒有一週後停止的證據。'},
 sequence:{'The bus arrived.':'Finally 才提到公車抵達；那是在走到站牌之後，不是之前。','Lunch was ordered.':'文章沒有點午餐這件事，屬於未出現的資訊。','The opening time changed.':'文章說 checked the opening time（查開放時間），不是開放時間改變；而且題目要的是走到站牌的前一步。'}
};
const readingRules={detail:['細節定位','keeps a short record','找到文中 record 這個動作，再對照「keeps a record of what it finishes」。','先定位一句證據，再核對人物、動作及限制詞。'],mainIdea:['整段主旨','more students joined','整段依序描述專案開始、照片分享、更多人加入和持續活動，答案需涵蓋這條主線。','主旨不是挑一個細節，而是能包住整段的重要事件。'],reference:['詞語指涉','The group now meets','從 The group 往前讀，找參與專案的 classmates、students；後面 meets 和 keeps 描述的是這群學生的活動。','指涉要核對人物、單複數與上下文，不是只選最近的名詞。'],inference:['有證據的推論','After the school shared photos','照片分享之後更多學生加入，可合理推論分享讓更多人知道並參與專案。','推論應接近原文，只多走一步，避免加入費用、強迫等新事實。'],sequence:['事件先後','Then a bag was packed','把 first、then、after that、finally 排成時間線，題目問的是 walked 之前的緊鄰事件。','right before 是「就在之前」；不是任意一件比較早發生的事。']};
function problem(q){const s=String(q.stem||'');return s.includes('\n\n')?s.slice(s.indexOf('\n\n')+2):s}
function quoteContaining(text,part){const chunks=String(text).split(/(?<=[.!?])\s+/);return chunks.find(s=>s.toLowerCase().includes(String(part).toLowerCase()))||String(text).slice(0,260)}
function explain(q,selected){if(q.meta?.teaching){const t=q.meta.teaching,options=q.options.map((text,index)=>({index,text,correct:index===q.answer,reason:t.optionReasons[index]}));return{...t,summary:q.explanation,example:'',steps:[`先確認題目要求：${q.meta.question||q.stem}`,`定位原文線索：${t.evidence}`,t.reason],options,selectedReason:options[selected]?.reason||null};}const correct=String(q.options[q.answer]),key=correct.toLowerCase(),text=problem(q),source=q.meta?.audioText||text;let concept=q.meta?.rule||q.explanation,reason=q.explanation,rule=q.meta?.rule||q.explanation,example='',memory=rule,evidence='',reasons={},trap='';
 if(q.type==='vocabulary'){const s=lex[key];if(s){reason=s[0];rule=s[1];example=s[2];memory=s[1];concept='字義、動作方向與搭配';trap='字形相近或都看過，不代表放回原句後意思相同。'}for(const opt of q.options){if(opt===correct)continue;reasons[opt]=`${opt} 表示「${meanings[opt]||opt}」，與本句要表達的「${meanings[key]||correct}」不同。${opt==='lend'?'lend 是借出，與 from the library 的借入方向相反。':opt==='arrive'||opt==='get'?'此外，到達地點時需注意介系詞，不能直接接本題地點。':opt==='participate'?'participate 後接活動通常需要 in，本題沒有 in。':''}`}}
 else if(q.type==='grammar'||q.type==='sentencePattern'){const s=forms[key];if(s){[concept,reason,rule,example,reasons]=s;memory=rule;trap=key==='getting up'?'看到 to 不一定就接原形；先判斷它是不是介系詞。':key==='finishes'?'不能把主句有 will 誤認成 if 子句也要用 will。':key==='safer'?'先看 than 判斷比較，再確認需要形容詞還是副詞。':'先辨認句型中的角色與動詞形式，再套用規則。'}}
 else if(readingRules[q.type]){const s=readingRules[q.type];[concept,,reason,memory]=s;rule=memory;evidence=quoteContaining(source,s[1]);reasons=readingReasons[q.type];trap=q.type==='inference'?'「可能符合常識」不等於「本文有證據」。':q.type==='mainIdea'?'不要因選項含有文中的一個字，就把它當成整段主旨。':'選項加上 only、never 等限制詞時，要特別核對原文是否真的這樣說。';if(q.type==='sequence')example='first 查時間 → then 整理包包 → after that 走到站牌 → finally 公車抵達。'}
 else if(q.type==='cloze'||q.type==='connectors'){
  if(key==='because of'){concept='名詞片語與子句';reason='the heavy rain 只有名詞片語，沒有主詞加動詞；because of 可以直接接它。';rule='because of + 名詞片語；because + 主詞 + 動詞';example='because of the rain / because it rained';reasons={because:'because 後面要有完整子句；the heavy rain 沒有動詞。',although:'although 後面也需要子句，而且表示讓步，不是本題的下雨原因。',so:'so 用來連接結果子句，不能直接接 the heavy rain 這個名詞片語。'};}
  else if(key==='although'){concept='讓步關係';reason='考試困難，但仍完成所有題目，兩句形成讓步；Although 引導前面的子句。';rule='Although + 主詞 + 動詞，另一個子句；不要再同時加 but。';example='Although the test was difficult, Amy finished it.';reasons={But:'but 是連接兩個並列子句的連接詞，不是本題句首用來引導讓步子句的 Although。','Because of':'because of 後接名詞片語，不能直接接 the test was difficult 這個完整子句。',So:'so 引出結果，無法表達「雖然困難仍完成」的讓步關係。'};}
  else if(key==='during'){concept='期間與子句';reason='the meeting 是名詞，表示開會的期間；during 可以直接接期間名詞。';rule='during + 名詞；while/when + 主詞 + 動詞';example='during the meeting / while the meeting was taking place';reasons={while:'while 後面需要子句，不能在本題只接 the meeting。',because:'because 引出原因子句；本題空格後沒有動詞，而且重點是開會期間。',when:'when 作連接詞時需要子句，不能直接以 the meeting 當完整子句。',since:'since 可以表示自某時起，但不等於 during 的「在整個會議期間」。如果缺少更多時間限制，此選項可能造成歧義。'};}
  else{const s=relation[key];if(s){[concept,reason,rule]=s;memory=rule;}for(const opt of q.options){if(opt===correct)continue;const meaning=relationMeaning[opt.toLowerCase()];reasons[opt]=`${opt} 表示${meaning||'不同的連接方式'}；本題前後需要的是「${concept}」，不是這種關係。${['Because','Although','because','although'].includes(opt)&&/___,/.test(text)?'此外，這個位置是句首連接副詞後接逗號，不能直接用 Because/Although 加逗號取代。':''}`}}
  memory=rule;trap='先判斷前後句關係，再檢查後面接名詞還是完整子句；只背中文意思還不夠。';
 }
 else if(q.type==='collocation'){
  if(key==='attend'){[reason,rule,example]=lex.attend;reasons={participate:'participate in a meeting 需要 in；本題空格後直接接 the meeting。',join:'join a meeting 在某些語境也成立，不應把這個形式一律判錯。',reach:'reach 是到達地點，不是出席活動。',arrive:'arrive 表抵達，通常要搭配 at/in；本題問出席會議。'};}
  else if(key==='reached'){reason='空格後直接是地點名稱，所以選 reached；前面的 finally 及 before it closed 對應到達的事件。';rule='reach + 地點；arrive at/in + 地點；get/go to + 地點';example='reached the museum / arrived at the museum';reasons={arrived:'arrived 後需要 at 或 in 才接地點；本題沒有介系詞。',got:'到達某地用 got to；本題沒有 to。',went:'前往某地用 went to；本題沒有 to。'};}
  else if(key==='listen'){reason='carefully 表示主動留心聽；空格後已經有 to，listen to 正好形成固定搭配。';rule='listen to + 名詞；hear 通常直接接聽見的內容。';example='listen to the instructions / hear a sound';reasons={hear:'hear 強調聽見，通常直接接受詞，不用 hear to the instructions。',watch:'watch 表用眼睛看，且通常直接接受詞；本題要聆聽指示。',look:'look 表看；一般用 look at，不能用本題的 to 表達聆聽。'};}
  else{reason='interested 與 in 是固定搭配，in 後面的 joining 是動名詞。';rule='be interested in + 名詞／V-ing';example='Amy is interested in joining the club.';reasons={at:'at 可用在 good at，但不能把這組搭配移到 interested。',on:'on 不是 interested 在本題所需要的固定介系詞。',for:'for 可表示目的或對象，但此處固定使用 interested in。'};}
  concept='固定搭配與介系詞';memory=rule;trap='把搭配當作一個單位記住，不要把另一個形容詞或動詞的介系詞套過來。';
 }
 else if(q.type==='listening'){
  concept=q.meta.competency==='listening response'?'對話功能':q.meta.competency==='listening detail'?'時間資訊':q.meta.competency==='listening inference'?'計畫與最後行動':'對話目的';evidence=source;
  if(concept==='對話功能'){reason='Could you help me ...? 是請求協助。Sure 表同意，Where should I put them? 接著確認箱子要放哪裡，直接回應現在的請求。';reasons={'Yes, I carried them yesterday.':'yesterday 只是在說過去做過什麼，沒有答應或回應現在的搬箱子請求。','The boxes are blue.':'這句只描述箱子顏色，沒有回應是否願意幫忙。','I bought a box last week.':'這句談上週買箱子，和目前需要搬箱子的請求不同。'};}
  else if(concept==='時間資訊'){reason=`問的是 bus leave 的時刻，錄音在 leave at 後面直接給出 ${correct}。地點與 Gate 的數字不是發車時間。`;reasons={'tomorrow morning':'這是籠統的相對時間，不是錄音明確給出的發車時刻。','ten minutes later':'錄音沒有說延後十分鐘，不能自行加上延誤。','after dinner':'錄音沒有提到晚餐，無法用晚餐後取代明確的時間。'};}
  else if(concept==='計畫與最後行動'){reason='planned to 是原先計畫；but the gym was closed 改變情況；so ... went ... instead 才是最後實際行動。';for(const opt of q.options){if(opt===correct)continue;reasons[opt]=opt.startsWith('Played basketball')?'這是原先計畫，但體育館已關閉；題目問 finally，不是原先想做什麼。':opt.startsWith('Went home')?'錄音說改去指定地點，沒有說立即回家。':'錄音說去了另一個地點，沒有說整天等在外面。';}}
  else{reason='電影時間是背景，Boy 用 let’s meet 接著約定提早十五分鐘及見面位置；兩人的共同目的在安排何時、何地見面。';reasons={'To complain about a movie.':'電影只是背景，對話沒有抱怨電影的內容。','To cancel a school activity.':'對話是在約見面，沒有取消學校活動。','To ask for hospital directions.':'即使地點名稱可能出現 hospital，兩人仍在約見面，不是在詢問怎麼走。'};}
  rule=q.meta.rule;memory=concept==='計畫與最後行動'?'聽到 but、so、instead，要重新確認最後結果。':concept==='對話功能'?'先辨認請求、邀請、道歉或問路，再選真正回應該功能的句子。':concept==='時間資訊'?'題目要時間就鎖定 leave at；不要把 Gate 號碼當成時間。':'問目的時整合兩位說話者的內容，不只抓一個名詞。';trap='先看題目要原先計畫、最後結果、時間還是目的，再聽對應的資訊。';
 }
 if(!evidence)evidence=q.type==='vocabulary'||q.type==='grammar'||q.type==='sentencePattern'||q.type==='collocation'?text.split('\n')[0]:source;
 const options=q.options.map((opt,index)=>({index,text:opt,correct:index===q.answer,reason:index===q.answer?reason:(reasons[opt]||`對照本題的規則「${rule}」，${opt} 沒有表達正確選項 ${correct} 所對應的意思或形式。`)}));
 return{concept,evidence,steps:[`先確認題目要求：${concept}。`,reason,`最後把 ${correct} 放回原句或原文，核對「${rule}」。`],rule,example,memory,trap,options,selectedReason:Number.isInteger(selected)&&options[selected]?options[selected].reason:null,summary:q.explanation};
}
function escape(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(q,selected,full=true){const e=explain(q,selected),correct=q.options[q.answer];
return `<div class="exTeaching"><section><h3>01 · 找到題目線索</h3><blockquote>${escape(e.evidence)}</blockquote><p>${escape(e.summary)}</p></section><section><h3>02 · 一步一步判斷</h3><ol>${e.steps.map(s=>`<li>${escape(s)}</li>`).join('')}</ol></section><section><h3>03 · 比較 ${q.options.length} 個選項</h3><div class="exOptions">${e.options.map(o=>`<article class="exOption ${o.correct?'exCorrect':''}"><h4>${String.fromCharCode(65+o.index)}. ${escape(o.text)} <small>${o.correct?'正確答案':o.index===selected?'你的選擇':''}</small></h4><p>${escape(o.reason)}</p></article>`).join('')}</div></section><section><h3>04 · 記住這個觀念</h3><p><b>${escape(e.rule)}</b></p>${e.example?`<p class="exExample">${escape(e.example)}</p>`:''}<p>${escape(e.trap||e.memory)}</p><p class="exMemory">下次遇到類似題目：${escape(e.memory)}</p></section></div>`;}
function toText(q,selected){const e=explain(q,selected);return[`正確答案：${q.options[q.answer]}`,`題目線索：${e.evidence}`,...e.steps.map((s,i)=>`${i+1}. ${s}`),...e.options.map(o=>`${String.fromCharCode(65+o.index)}. ${o.text}${o.index===selected?'（你的選擇）':''}：${o.reason}`),`觀念：${e.rule}`,e.example?`例句：${e.example}`:'',`易錯提醒：${e.trap}`,`下次複習：${e.memory}`].filter(Boolean).join('\n\n');}
function forNote(n,bank){const d=n.detail||{},options=d.options,answer=d.correctAnswerIndex;const valid=typeof d.stem==='string'&&d.stem.trim()&&Array.isArray(options)&&options.length>=2&&Number.isInteger(answer)&&answer>=0&&answer<options.length;
 if(!valid)return{text:String(n.content||'')+'\n\n此筆舊紀錄缺少原始題目或答案，無法可靠補出詳解。請重新練習此能力，新的錯題會保存完整資料。',complete:false};
 if(g.LTUMockGroups?.byId(n.question_id)){const current=g.LTUMockGroups.byId(n.question_id);if(current.stem===d.stem&&JSON.stringify(current.options)===JSON.stringify(options)&&current.answer===answer)return{text:'原題：'+d.stem+'\n\n'+toText(current,d.selectedIndex),complete:true};return{text:'原題：'+d.stem+'\n\n'+String(n.content||''),complete:true};}
 const id=Number(String(n.question_id||'').split('-').pop())-1;let q={id:n.question_id,type:d.type,stem:d.stem,options,answer,explanation:['weakness'].includes(n.category)?'':String(n.content||''),meta:{competency:d.skill||d.type,grammarFocus:d.grammarFocus||'',audioText:d.audioText||'',rule:''}};
 if(bank&&Number.isInteger(id)&&id>=0&&id<20000){const current=bank.make(id);if(current.stem===d.stem&&JSON.stringify(current.options)===JSON.stringify(options)&&current.answer===answer)q=current;}
 const selected=Number.isInteger(d.selectedIndex)&&d.selectedIndex>=0&&d.selectedIndex<options.length?d.selectedIndex:null;
 const header=['原題：'+q.stem,selected===null?'此筆紀錄未保存當時選項。':'你的選擇：'+String.fromCharCode(65+selected)+'. '+options[selected]].join('\n\n');
 if(q.type==='listening'&&!q.meta.audioText)return{text:header+'\n\n正確答案：'+options[answer]+'\n\n'+String(n.content||'')+'\n\n這筆舊紀錄沒有保存原始錄音文字，不能可靠重建聽力線索。新的作答會保留錄音文字與完整解析。',complete:false};
 const e=explain(q,selected);if(n.category==='mistake'||n.category==='weakness')return{text:header+'\n\n'+toText(q,selected),complete:true};
 if(n.category==='strategy')return{text:[e.memory,e.steps[1]].join('\n\n'),complete:true};
 if(['grammar','vocabulary','phrase','sentence_pattern'].includes(n.category))return{text:[e.rule,e.steps[1],e.example].filter(Boolean).join('\n\n'),complete:true};return{text:n.content,complete:true};
}
g.LTUExplanation={explain,render,toText,forNote};
})(typeof window==='undefined'?globalThis:window);
