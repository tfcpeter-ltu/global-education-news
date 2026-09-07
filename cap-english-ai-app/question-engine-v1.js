(function(global){
  const TYPES=['vocabulary','grammar','cloze','detail','mainIdea','reference','inference','sequence','listening','collocation','sentencePattern','connectors'];
  const NAMES=['Amy','Ben','Cindy','David','Emma','Frank','Grace','Henry','Ivy','Jack','Kevin','Lily'];
  const PLACES=['library','museum','station','school','park','bookstore','hospital','market','restaurant','sports center'];
  const ACTIVITIES=['finish the report','practice the piano','clean the room','visit her aunt','prepare dinner','study for the test','return the books','join the meeting','buy a gift','write an email'];
  const TIMES=['two hours','three days','a week','five months','ten years','a long time'];
  const YEARS=['2019','2020','2021','2022','2023','last summer'];
  const ADJ=[['cheap','cheaper','cheapest'],['fast','faster','fastest'],['safe','safer','safest'],['quiet','quieter','quietest'],['large','larger','largest'],['easy','easier','easiest']];
  const CONNECTORS=[
    {a:'because',b:'because of',tip:'because + 子句；because of + 名詞／V-ing'},
    {a:'although',b:'but',tip:'although 已經表示轉折，後面不能再接 but'},
    {a:'during',b:'while',tip:'during + 名詞；while + 子句'},
    {a:'so',b:'because',tip:'so 表結果；because 表原因'}
  ];
  const VOCAB=[
    {w:'borrow',d:'向別人借入',pair:'lend',ex:'May I borrow your pen?'},
    {w:'lend',d:'把東西借給別人',pair:'borrow',ex:'Can you lend me your pen?'},
    {w:'attend',d:'出席活動／課程',pair:'join',ex:'She attended the meeting.'},
    {w:'join',d:'加入團體／人群',pair:'attend',ex:'He joined the school club.'},
    {w:'reach',d:'到達（後面直接接地點）',pair:'arrive',ex:'We reached the station at nine.'},
    {w:'arrive',d:'到達（arrive at/in）',pair:'reach',ex:'They arrived at school early.'},
    {w:'discover',d:'發現原本不知道的事物',pair:'invent',ex:'Scientists discovered a new species.'},
    {w:'invent',d:'發明原本不存在的東西',pair:'discover',ex:'Who invented the telephone?'}
  ];
  const PASSAGES=[
    {topic:'school garden',text:'Last spring, students at Green Hill Junior High turned an empty corner of the campus into a small garden. At first, only twelve students joined the project. After the science teacher posted photos online, more students volunteered. The garden now provides vegetables for the cooking club and has become a quiet place to read during lunch break.',main:'A school garden project grew and became useful to students.',detail:'The cooking club uses vegetables from the garden.',infer:'Posting photos helped attract more volunteers.'},
    {topic:'library program',text:'The city library started a “Bring a Friend” program in June. Teenagers who bring a first-time visitor receive an extra borrowing coupon. Librarians expected the program to increase weekend visitors, but weekday visits also rose. Because of the response, the library plans to continue the program next semester.',main:'A library program successfully attracted more visitors.',detail:'Teenagers can get an extra borrowing coupon.',infer:'The program worked better than librarians expected.'},
    {topic:'bike to school',text:'Mia used to take the bus to school every day. In April, she began riding a bicycle twice a week with her neighbor. At first, the trip took thirty minutes, but after a month it took only twenty-two. Mia says she feels more awake in her first class on cycling days.',main:'Cycling to school became easier and had a positive effect on Mia.',detail:'Mia rides with her neighbor.',infer:'Mia became faster at cycling over time.'},
    {topic:'reusable cups',text:'A small cafe near the station gives customers NT$5 off when they bring their own cups. In the first month, only about one in ten customers did so. After the cafe began showing a weekly “cups saved” number near the counter, the rate almost doubled. The owner now plans to add the same idea to the second store.',main:'Showing progress encouraged more customers to use reusable cups.',detail:'Customers get NT$5 off for bringing a cup.',infer:'Visible feedback can influence customer behavior.'}
  ];
  function rng(seed){let x=(seed>>>0)||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296}}
  function pick(r,a){return a[Math.floor(r()*a.length)%a.length]}
  function shuffle(r,a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function qid(n){return 'LTU-CAP-'+String(n+1).padStart(5,'0')}
  function base(id,type,stem,options,answer,explanation,meta={}){return {id:qid(id),type,stem,options,answer,explanation,meta:{difficulty:meta.difficulty||((id%3)+1),competency:meta.competency||type,grammarFocus:meta.grammarFocus||'',source:'LTU original generator v1',...meta}}}
  function make(id){
    id=((Number(id)||0)%12000+12000)%12000; const r=rng((id+1)*2654435761); const type=TYPES[id%TYPES.length];
    if(type==='grammar'){
      const n=pick(r,NAMES), act=pick(r,ACTIVITIES), t=pick(r,TIMES), useSince=(id%2===0);
      const stem=`${n} has ${act.replace(/^\w+/,'worked on')} ___ ${useSince?pick(r,YEARS):t}.`;
      const ans=useSince?'since':'for'; const ops=shuffle(r,[ans,useSince?'for':'since','during','from']);
      return base(id,type,stem,ops,ops.indexOf(ans),`現在完成式表示從過去持續到現在。${useSince?'since 後接「起點」':'for 後接「一段時間」'}。`,{competency:'tense',grammarFocus:'present perfect: since/for'});
    }
    if(type==='vocabulary'){
      const v=pick(r,VOCAB), n=pick(r,NAMES), p=pick(r,PLACES);
      const stem=`${n} wants to ___ a book from the ${p==='library'?'library':'school library'} and return it next week.`;
      const ans='borrow'; const ops=shuffle(r,['borrow','lend','keep','bring']);
      return base(id,type,stem,ops,ops.indexOf(ans),`borrow 是「向別人借入」；lend 是「借給別人」。題目主詞是借入書本，所以選 borrow。`,{competency:'word meaning',focus:'borrow/lend/keep'});
    }
    if(type==='collocation'){
      const n=pick(r,NAMES), place=pick(r,PLACES); const mode=id%3;
      let stem,ans,opts,exp;
      if(mode===0){stem=`${n} will ___ the school meeting at 3 p.m.`;ans='attend';opts=['attend','join','reach','take part'];exp='attend + meeting/class/event；join 通常接團體或人。'}
      else if(mode===1){stem=`We finally ___ the ${place} before it closed.`;ans='reached';opts=['reached','arrived','got','went'];exp='reach 後直接接地點；arrive 要用 arrive at/in。'}
      else {stem=`Please ___ to the teacher carefully.`;ans='listen';opts=['listen','hear','watch','look'];exp='listen to 是主動「聽」；hear 是被動「聽見」。'}
      opts=shuffle(r,opts);return base(id,type,stem,opts,opts.indexOf(ans),exp,{competency:'collocation'});
    }
    if(type==='sentencePattern'){
      const n=pick(r,NAMES), act=pick(r,['clean the classroom','finish the worksheet','call her mother','bring an umbrella','wait outside']);
      const ans='to';const opts=shuffle(r,['to','for','at','with']);
      return base(id,type,`The teacher asked ${n} ___ ${act}.`,opts,opts.indexOf(ans),'ask + 人 + to V：要求某人做某事。',{competency:'sentence pattern',grammarFocus:'ask/tell/want + O + to V'});
    }
    if(type==='connectors'){
      const c=pick(r,CONNECTORS); let stem,ans,ops;
      if(c.a==='because'){stem='The game was canceled ___ the heavy rain.';ans='because of';ops=['because of','because','although','so'];}
      else if(c.a==='although'){stem='___ it was raining, we still went out.';ans='Although';ops=['Although','But','Because of','So'];}
      else if(c.a==='during'){stem='No one used a phone ___ the meeting.';ans='during';ops=['during','while','because','since'];}
      else {stem='Leo was tired, ___ he went to bed early.';ans='so';ops=['so','because','although','during'];}
      ops=shuffle(r,ops);return base(id,type,stem,ops,ops.indexOf(ans),c.tip,{competency:'connectors'});
    }
    if(type==='cloze'){
      const stem='Nina wanted to improve her English. ___, she started reading one short article every morning and wrote down three useful expressions.';const ans='Therefore';const ops=shuffle(r,['Therefore','However','For example','Meanwhile']);
      return base(id,type,stem,ops,ops.indexOf(ans),'前句是目標，後句是因此採取的行動，所以需要表示結果的 Therefore。',{competency:'cohesion'});
    }
    if(['detail','mainIdea','inference','reference','sequence'].includes(type)){
      const p=pick(r,PASSAGES); let stem,ans,ops,exp;
      if(type==='detail'){stem=p.text+'\n\nWhich statement is true according to the passage?';ans=p.detail;ops=[p.detail,'The project ended after one month.','Only teachers could join the activity.','The program was canceled because few people joined.'];exp='細節題要回原文定位，不要用常識補充。正確選項能直接在文章中找到證據。'}
      else if(type==='mainIdea'){stem=p.text+'\n\nWhat is the passage mainly about?';ans=p.main;ops=[p.main,'A complaint about school rules.','A detailed travel schedule.','Instructions for taking an exam.'];exp='主旨題要整合全文，而不是只抓某一句細節。'}
      else if(type==='inference'){stem=p.text+'\n\nWhat can we infer from the passage?';ans=p.infer;ops=[p.infer,'The writer dislikes all school activities.','Everyone in the city joined immediately.','The activity cost more than expected.'];exp='推論必須有文章證據支持，不能選超出文章範圍的敘述。'}
      else if(type==='reference'){stem=p.text+'\n\nIn the passage, what does “the program/project/idea” most likely refer to?';ans=p.topic;ops=[p.topic,'the weather','the lunch menu','the bus schedule'];exp='指涉題要往前找最近且語意合理的名詞，再代回句子確認。'}
      else {stem='First, Alex checked the bus time online. Then he packed his bag. After that, he walked to the stop. Finally, he got on the bus.\n\nWhat did Alex do right before he walked to the stop?';ans='He packed his bag.';ops=['He packed his bag.','He got on the bus.','He checked into a hotel.','He bought lunch.'];exp='時間順序題先標記 First / Then / After that / Finally，再找前後步驟。'}
      ops=shuffle(r,ops);return base(id,type,stem,ops,ops.indexOf(ans),exp,{competency:type,passageTopic:p.topic});
    }
    if(type==='listening'){
      const mode=id%3; let audio,stem,ans,ops,exp;
      if(mode===0){audio='Could you help me carry these boxes?';stem='What is the best response?';ans='Sure. Where should I put them?';ops=[ans,'Yes, I carried them yesterday.','The boxes are blue.'];exp='基本問答要先判斷對方是在提出請求，再選自然回應。'}
      else if(mode===1){audio='The train to Taichung will leave from Platform Three in ten minutes.';stem='Where should the passenger go?';ans='Platform Three';ops=[ans,'Platform Ten','The bus stop'];exp='聽力細節題鎖定地點訊息 Platform Three。'}
      else {audio='Mina planned to play tennis, but the court was closed because of the rain, so she went to the library instead.';stem='What did Mina finally do?';ans='She went to the library.';ops=[ans,'She played tennis.','She stayed at the court.'];exp='注意轉折 but 與結果 so；最後行動是 went to the library。'}
      ops=shuffle(r,ops);return base(id,type,stem,ops,ops.indexOf(ans),exp,{competency:'listening',audioText:audio});
    }
    const adj=pick(r,ADJ),n=pick(r,NAMES);const ans=adj[1];const ops=shuffle(r,[adj[0],adj[1],adj[2],'more '+adj[0]]);
    return base(id,'grammar',`${n}'s new bike is ___ than the old one.`,ops,ops.indexOf(ans),`than 是比較級訊號，因此使用 ${adj[1]}。`,{competency:'comparison',grammarFocus:'comparative'});
  }
  function count(){return 12000}
  function getBatch({count:n=10,seen=[],types=[]}={}){
    n=Math.max(1,Math.min(50,Number(n)||10));const seenSet=new Set(seen);const out=[];let tries=0;const start=Math.floor(Math.random()*12000);
    while(out.length<n&&tries<24000){const id=(start+tries*7919)%12000;const q=make(id);tries++;if(seenSet.has(q.id))continue;if(types.length&&!types.includes(q.type))continue;out.push(q);seenSet.add(q.id)}
    return out;
  }
  global.LTUQuestionEngine={version:'1.0',count,make,getBatch,types:TYPES};
})(window);