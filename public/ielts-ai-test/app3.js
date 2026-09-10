// Formal-student Beta journey layer: full mock orchestration + limited free mini tests.
var _baseSubmitObjective = window.submitTest;
var _baseAnalyseWriting = window.analyseWriting;
var _baseAnalyseSpeaking = window.analyseSpeaking;
var activeJourney = null;

function ensureJourneyModal(){
  if(document.getElementById('journeyModal')) return;
  const el=document.createElement('div');
  el.id='journeyModal'; el.className='modal-backdrop';
  el.innerHTML='<div class="modal"><button class="close" onclick="closeJourneyModal()">×</button><div id="journeyContent"></div></div>';
  document.body.appendChild(el);
}
function closeJourneyModal(){document.getElementById('journeyModal')?.classList.remove('show')}
function journeyProgress(stage){
  const stages=['Listening','Reading','Writing','Speaking'];
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:16px 0">${stages.map(s=>`<div style="padding:9px 5px;border-radius:10px;text-align:center;font-size:11px;font-weight:800;background:${s===stage?'#0d2b4d':'#edf3f8'};color:${s===stage?'white':'#536274'}">${s}</div>`).join('')}</div>`;
}
function showJourneyTransition(title,body,buttonLabel,nextAction,stage){
  ensureJourneyModal();
  document.getElementById('journeyContent').innerHTML=`<span class="eyebrow" style="background:#edf4fb;color:#0d2b4d;border-color:#d8e7f3">${activeJourney?.kind==='full'?'FULL MOCK':'FREE MINI TEST'}</span><h2 style="margin:12px 0 4px">${title}</h2>${activeJourney?.kind==='full'?journeyProgress(stage||activeJourney.stage):''}<p class="muted" style="line-height:1.7">${body}</p><button class="btn primary block" onclick="closeJourneyModal();${nextAction}">${buttonLabel}</button>`;
  document.getElementById('journeyModal').classList.add('show');
}

window.startFullMock=function(id){
  if(profile.member!=='paid' && profile.member!=='demo'){
    openCheckout(1); toast('完整 2,000 套 Full Mock 為付費會員功能'); return;
  }
  const set=testSets.find(x=>x.id===id)||testSets[0];
  activeJourney={kind:'full',setId:set.id,setCode:set.code,stage:'Listening',writingTask:0,speakingPart:0,startedAt:Date.now()};
  Store.set('active_full_mock',activeJourney);
  startModule(set.id,'Listening');
  document.getElementById('testTitle').textContent='Full Mock · 1/4 Listening';
  document.getElementById('testSub').textContent=`${set.code} · ${set.sub} · Listening 40 questions`;
};

function startFullReading(){
  if(!activeJourney) return;
  activeJourney.stage='Reading'; Store.set('active_full_mock',activeJourney);
  startModule(activeJourney.setId,'Reading');
  document.getElementById('testTitle').textContent='Full Mock · 2/4 Reading';
  document.getElementById('testSub').textContent=`${activeJourney.setCode} · Reading 40 questions`;
}
function startFullWriting(){
  if(!activeJourney) return;
  activeJourney.stage='Writing'; activeJourney.writingTask=1; Store.set('active_full_mock',activeJourney);
  go('writing'); setFullWritingTask(1);
}
function setFullWritingTask(taskNo){
  const s=testSets.find(x=>x.id===activeJourney.setId)||testSets[0];
  activeJourney.writingTask=taskNo; Store.set('active_full_mock',activeJourney);
  document.getElementById('essayBox').value=''; updateWordCount(); document.getElementById('writingFeedback').innerHTML='';
  if(taskNo===1){
    const y1=2010+(s.id%5), y2=y1+15, a=28+(s.id%30), b=a+12, c=45+(s.id%20), d=c-7;
    document.getElementById('writingTag').textContent=`FULL MOCK · ${s.code} · WRITING TASK 1`;
    document.getElementById('writingPrompt').textContent=`The table shows the percentage of commuters using public transport in City A (${a}% in ${y1}; ${b}% in ${y2}) and City B (${c}% in ${y1}; ${d}% in ${y2}). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`;
  }else{
    const idx=s.id%writingPrompts.length;
    document.getElementById('writingTag').textContent=`FULL MOCK · ${s.code} · WRITING TASK 2`;
    document.getElementById('writingPrompt').textContent=writingPrompts[idx];
  }
}
function startFullSpeaking(){
  if(!activeJourney) return;
  activeJourney.stage='Speaking'; activeJourney.speakingPart=1; Store.set('active_full_mock',activeJourney);
  go('speaking'); setFullSpeakingPart(1);
}
function setFullSpeakingPart(part){
  const s=testSets.find(x=>x.id===activeJourney.setId)||testSets[0];
  activeJourney.speakingPart=part; Store.set('active_full_mock',activeJourney);
  document.getElementById('speakingTranscript').value=''; document.getElementById('speakingFeedback').innerHTML='';
  if(part===1){
    document.getElementById('speakingPart').textContent=`FULL MOCK · ${s.code} · SPEAKING PART 1`;
    document.getElementById('speakingPrompt').textContent=`Let's talk about ${s.topic.toLowerCase()}. What interests you about this topic? How often do you encounter it in daily life? Do you think your views have changed over time?`;
  }else if(part===2){
    document.getElementById('speakingPart').textContent=`FULL MOCK · ${s.code} · SPEAKING PART 2 · 1 min prep`;
    document.getElementById('speakingPrompt').textContent=`Describe an experience related to ${s.sub.toLowerCase()}. You should say what happened, when and where it happened, what you did, and explain why you remember it.`;
  }else{
    document.getElementById('speakingPart').textContent=`FULL MOCK · ${s.code} · SPEAKING PART 3`;
    document.getElementById('speakingPrompt').textContent=`How might ${s.topic.toLowerCase()} affect society in the future? What responsibilities should individuals, organisations and governments have? Are the effects likely to be the same in all countries?`;
  }
}
function completeFullMock(){
  const s=testSets.find(x=>x.id===activeJourney.setId)||testSets[0];
  let completed=Store.get('completed_sets',[]); if(!completed.includes(s.id)) completed.push(s.id); Store.set('completed_sets',completed);
  const sc=bands(); const overall=Math.round((Object.values(sc).reduce((a,b)=>a+b,0)/4)*2)/2;
  let hist=Store.get('history',[]); hist.unshift({set:s.code,module:'Full Mock',score:'Complete',total:'4 skills',band:overall,date:new Date().toLocaleDateString('zh-TW')}); Store.set('history',hist.slice(0,100));
  Store.set('active_full_mock',null);
  showJourneyTransition(`${s.code} Full Mock 完成`,`四科流程已完成。最新 AI 預估 Overall Band：${overall.toFixed(1)}。錯題與語言弱點已加入 AI 弱點筆記，下一週課表可依這次結果重新排序。`,'查看弱點筆記',"activeJourney=null;go('notebook');renderNotebook()",'Speaking');
}

window.submitTest=function(){
  const journey=activeJourney; const finishedModule=currentModule;
  _baseSubmitObjective();
  if(!journey) return;
  if(journey.kind==='full'){
    if(finishedModule==='Listening'){
      journey.stage='Reading'; activeJourney=journey; Store.set('active_full_mock',journey);
      showJourneyTransition('Listening 完成','答案與反應速度已記錄。下一科進入 Reading 40 題；正式考試模式不顯示逐題答案，弱點會在整套結束後集中整理。','進入 Reading','startFullReading()','Reading');
    }else if(finishedModule==='Reading'){
      journey.stage='Writing'; activeJourney=journey; Store.set('active_full_mock',journey);
      showJourneyTransition('Reading 完成','接著進入 Writing。完整模考包含 Task 1 與 Task 2，兩題都完成後才會進入 Speaking。','進入 Writing Task 1','startFullWriting()','Writing');
    }
  }else if(journey.kind==='mini'){
    if(finishedModule==='Reading'){
      showJourneyTransition(`Mini Test ${journey.miniIndex} · Reading 完成`,'接著做 6 題 Listening 精華題，體驗改口訊號、數字與地點陷阱。','繼續 Listening','continueMiniListening()');
    }else if(finishedModule==='Listening'){
      const used=Math.max(Store.get('free_mini_used',0),journey.miniIndex); Store.set('free_mini_used',used); activeJourney=null;
      showJourneyTransition(`Mini Test ${journey.miniIndex} 完成`,`這次精華體驗已完成。免費會員共有 3 組 Mini Tests，目前已完成 ${used}/3；錯題已加入弱點筆記。`,'查看 AI 弱點筆記',"go('notebook');renderNotebook()");
    }
  }
};

var _baseStartFreeMini=window.startFreeMini;
window.startFreeMini=function(){
  const used=Store.get('free_mini_used',0);
  if(used>=3){openCheckout(1);toast('3 組免費 Mini Tests 已完成，可升級月費 NT$3,000 會員');return}
  profile.member='free'; Store.set('ltu_profile',profile); renderAll();
  const idx=used+1; activeJourney={kind:'mini',miniIndex:idx,setId:idx,stage:'Reading',startedAt:Date.now()};
  startModule(idx,'Reading'); currentQuestions=currentQuestions.slice(0,6); timerSec=12*60; renderTestQuestions(); updateTimer();
  document.getElementById('testTitle').textContent=`免費精華 Mini Test ${idx}/3 · Reading`;
  document.getElementById('testSub').textContent='6 questions · AI weakness diagnosis preview';
};
function continueMiniListening(){
  const j=activeJourney; if(!j)return; j.stage='Listening'; activeJourney=j;
  startModule(j.setId,'Listening'); currentQuestions=currentQuestions.slice(0,6); timerSec=10*60; renderTestQuestions(); updateTimer();
  document.getElementById('testTitle').textContent=`免費精華 Mini Test ${j.miniIndex}/3 · Listening`;
  document.getElementById('testSub').textContent='6 questions · correction / number / location traps';
}

window.analyseWriting=function(){
  const t=document.getElementById('essayBox').value.trim(); const words=t?t.split(/\s+/).length:0;
  if(activeJourney?.kind==='full' && activeJourney.stage==='Writing'){
    const min=activeJourney.writingTask===1?150:250;
    if(words<min){toast(`Full Mock Writing Task ${activeJourney.writingTask} 建議至少 ${min} 字；目前 ${words} 字`);return}
    _baseAnalyseWriting();
    const latest=Store.get('history',[])[0]; if(latest?.module==='Writing'){const sc=bands();sc.Writing=Math.round(latest.band*2)/2;Store.set('band_scores',sc)}
    if(activeJourney.writingTask===1){
      showJourneyTransition('Writing Task 1 完成','Task 1 已保存。接著完成 Task 2；在 IELTS Writing 中 Task 2 權重較高，因此要保留足夠時間發展論點。','進入 Writing Task 2','setFullWritingTask(2)','Writing');
    }else{
      activeJourney.stage='Speaking'; Store.set('active_full_mock',activeJourney);
      showJourneyTransition('Writing 完成','Task 1 與 Task 2 都已完成。最後進入 Speaking Part 1–3。','進入 Speaking','startFullSpeaking()','Speaking');
    }
    return;
  }
  if(profile.member==='free' && Store.get('free_writing_used',0)>=1){openCheckout(1);toast('免費 Writing AI 分析已使用，可升級會員');return}
  _baseAnalyseWriting();
  if(profile.member==='free' && document.querySelectorAll('#writingFeedback .fb').length) Store.set('free_writing_used',1);
};

window.analyseSpeaking=function(){
  const t=document.getElementById('speakingTranscript').value.trim(); const words=t?t.split(/\s+/).length:0;
  if(activeJourney?.kind==='full' && activeJourney.stage==='Speaking'){
    const mins={1:35,2:80,3:55}; const min=mins[activeJourney.speakingPart]||35;
    if(words<min){toast(`Speaking Part ${activeJourney.speakingPart} 請先回答至少約 ${min} 字，再進行 Beta 分析`);return}
    _baseAnalyseSpeaking();
    const latest=Store.get('history',[])[0]; if(latest?.module==='Speaking'){const sc=bands();sc.Speaking=Math.round(latest.band*2)/2;Store.set('band_scores',sc)}
    if(activeJourney.speakingPart<3){
      const next=activeJourney.speakingPart+1;
      showJourneyTransition(`Speaking Part ${activeJourney.speakingPart} 完成`,`回答已保存。接著進入 Part ${next}。` ,`進入 Part ${next}`,`setFullSpeakingPart(${next})`,'Speaking');
    }else completeFullMock();
    return;
  }
  if(profile.member==='free' && Store.get('free_speaking_used',0)>=1){openCheckout(1);toast('免費 Speaking AI 分析已使用，可升級會員');return}
  _baseAnalyseSpeaking();
  if(profile.member==='free' && document.querySelectorAll('#speakingFeedback .fb').length) Store.set('free_speaking_used',1);
};

ensureJourneyModal();
