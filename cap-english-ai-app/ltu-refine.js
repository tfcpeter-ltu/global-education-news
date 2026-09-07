(function(){
  const frame=document.querySelector('iframe');
  function deepest(){try{let d=frame?.contentDocument;if(!d)return null;for(let i=0;i<32;i++){const f=d.querySelector('iframe');if(!f||!f.contentDocument)break;d=f.contentDocument}return d}catch(e){return null}}
  function replaceText(d){
    const walker=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{let t=n.nodeValue||'';t=t.replace(/免費會員每天\s*[45]\s*題/g,'免費會員每天 3 題').replace(/免費會員每日\s*[45]\s*題/g,'免費會員每日 3 題').replace(/每天\s*[45]\s*題/g,'每天 3 題').replace(/每日\s*[45]\s*題/g,'每日 3 題');if(t!==n.nodeValue)n.nodeValue=t;});
  }
  function style(d){if(d.getElementById('ltuConciseRefine'))return;const s=d.createElement('style');s.id='ltuConciseRefine';s.textContent=`#ltuSeriesV19,#ltuPlansV19{display:none!important}`;d.head.appendChild(s)}
  function mount(d){style(d);replaceText(d);const hero=d.getElementById('aiAppleHeroV18');if(hero){const e=hero.querySelector('.appleEyebrow');if(e)e.textContent='LTU 國際學術中心｜系列 AI 輔助教材 · 2027 國中教育會考英文';const lead=hero.querySelector('.appleLead');if(lead)lead.innerHTML='以 AI 協助英文練習、錯因整理與重點複習。<strong>不是拼命刷題，而是把時間集中在你還不會的地方。</strong>';}}
  function boot(){const d=deepest();if(d)mount(d)}
  frame?.addEventListener('load',()=>{setTimeout(boot,700);setTimeout(boot,1800)});setInterval(boot,4000);
})();