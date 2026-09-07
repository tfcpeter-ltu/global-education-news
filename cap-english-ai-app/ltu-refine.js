(function(){
  const frame=document.querySelector('iframe');
  function deepest(){try{let d=frame?.contentDocument;if(!d)return null;for(let i=0;i<30;i++){const f=d.querySelector('iframe');if(!f||!f.contentDocument)break;d=f.contentDocument}return d}catch(e){return null}}
  function replaceText(d){
    const walker=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      let t=n.nodeValue||'';
      t=t.replace(/每日\s*4\s*題/g,'每日 3 題').replace(/每天\s*4\s*題/g,'每天 3 題').replace(/免費會員每日\s*5\s*題/g,'免費會員每日 3 題').replace(/每日\s*5\s*題/g,'每日 3 題');
      if(t!==n.nodeValue)n.nodeValue=t;
    });
  }
  function addStyle(d){if(d.getElementById('ltuSeriesRefine'))return;const s=d.createElement('style');s.id='ltuSeriesRefine';s.textContent=`
    #appleMethodV18,#appleFitV18,#appleValueV18,#membershipCompareV18{display:none!important}
    #ltuSeriesV19{max-width:1120px;margin:0 auto;padding:18px 24px 54px}
    .ltuBrand{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:18px}.ltuPill{font-size:12px;font-weight:800;letter-spacing:.04em;border:1px solid #e5e9ef;background:#fff;border-radius:999px;padding:7px 11px;color:#25415f}.ltuPill.primary{background:#0f2744;color:#fff;border-color:#0f2744}
    .ltuShort{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.ltuShortCard{background:#f7f8fa;border-radius:24px;padding:24px}.ltuShortCard b{display:block;font-size:18px;margin-bottom:7px;color:#102a46}.ltuShortCard p{margin:0;color:#66778a;line-height:1.7;font-size:13px}
    #ltuPlansV19{max-width:1120px;margin:0 auto;padding:20px 24px 70px}.ltuPlanGrid{display:grid;grid-template-columns:.82fr 1.18fr;gap:18px}.ltuPlan{border:1px solid #e5e9ef;border-radius:28px;padding:28px;background:#fff}.ltuPlan.complete{border:2px solid #1769ff}.ltuPlan h3{font-size:28px;margin:8px 0 8px}.ltuPlan .sub{color:#66778a;line-height:1.65;font-size:14px}.ltuCount{font-size:44px;font-weight:850;letter-spacing:-.04em;margin:18px 0 4px}.ltuCount small{font-size:14px;color:#6e7c8a;font-weight:650;letter-spacing:0}.ltuMiniList{display:grid;gap:9px;margin:18px 0 0;padding:0;list-style:none}.ltuMiniList li{font-size:14px;color:#34495e}.ltuMiniList li:before{content:'✓';color:#1769ff;font-weight:900;margin-right:8px}.ltuMiniList li.off{color:#9aa4ae}.ltuMiniList li.off:before{content:'—';color:#aab2ba}
    details.ltuDetails{margin-top:18px;border-top:1px solid #edf0f4;padding-top:16px}details.ltuDetails summary{cursor:pointer;font-weight:850;color:#1769ff;list-style:none}details.ltuDetails summary::-webkit-details-marker{display:none}.ltuDetailBody{padding-top:16px}.ltuStats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.ltuStat{background:#f4f7fb;border-radius:999px;padding:7px 10px;font-size:12px;font-weight:800;color:#294a6c}
    .noteSample{background:#f7f8fa;border-radius:22px;padding:20px}.noteSample h4{margin:0 0 14px;font-size:18px}.noteRows{display:grid;gap:9px}.noteRow{display:grid;grid-template-columns:36px 130px 1fr;gap:10px;align-items:start;background:#fff;border-radius:14px;padding:11px 12px}.noteNo{font-weight:900;color:#1769ff}.noteCat{font-weight:800;color:#17395b;font-size:13px}.noteVal{font-size:13px;line-height:1.6;color:#55687a}.sampleTag{display:inline-block;background:#fff4cd;color:#755b00;border-radius:999px;padding:5px 9px;font-size:11px;font-weight:850;margin-bottom:10px}
    .ltuPriceLine{margin-top:18px;font-size:13px;color:#6a7885}.ltuPriceLine strong{font-size:24px;color:#102a46}.ltuCta{display:inline-flex;margin-top:16px;background:#1769ff;color:#fff!important;text-decoration:none;border-radius:999px;padding:11px 18px;font-weight:850}
    @media(max-width:820px){.ltuShort,.ltuPlanGrid{grid-template-columns:1fr}.noteRow{grid-template-columns:30px 1fr}.noteVal{grid-column:2}}
  `;d.head.appendChild(s)}
  function mount(d){
    addStyle(d); replaceText(d);
    const hero=d.getElementById('aiAppleHeroV18');
    if(hero){
      const eyebrow=hero.querySelector('.appleEyebrow'); if(eyebrow)eyebrow.textContent='LTU 國際學術中心｜系列 AI 輔助教材 · 2027 國中教育會考英文';
      const lead=hero.querySelector('.appleLead'); if(lead)lead.innerHTML='以 AI 協助英文練習、錯因整理與重點複習。<strong>不是拼命刷題，而是把時間集中在你還不會的地方。</strong>';
    }
    if(!d.getElementById('ltuSeriesV19')&&hero){
      const sec=d.createElement('section');sec.id='ltuSeriesV19';sec.innerHTML=`
        <div class="ltuBrand"><span class="ltuPill primary">LTU 國際學術中心</span><span class="ltuPill">系列 AI 輔助教材</span><span class="ltuPill">English Learning</span></div>
        <div class="ltuShort"><div class="ltuShortCard"><b>AI 找弱點</b><p>把錯題拆成字彙、片語、文法、句型、閱讀與聽力問題。</p></div><div class="ltuShortCard"><b>AI 整理重點</b><p>把真正錯過的內容收進個人筆記，不把整本教材重新抄一次。</p></div><div class="ltuShortCard"><b>AI 再驗證</b><p>同一能力換題再練，確認是真的會，不是記住答案。</p></div></div>`;
      hero.insertAdjacentElement('afterend',sec);
    }
    if(!d.getElementById('ltuPlansV19')){
      const anchor=d.getElementById('accountV16')||d.getElementById('plans')||d.querySelector('main'); if(!anchor)return;
      const sec=d.createElement('section');sec.id='ltuPlansV19';sec.innerHTML=`
        <div class="appleSectionHead"><div class="kicker">MEMBERSHIP</div><h2>先簡單用。需要 AI 長期追蹤，再升級。</h2><p>免費會員只有有限功能；AI 記憶、每週模考分析與個人化筆記只提供給完整會員。</p></div>
        <div class="ltuPlanGrid">
          <div class="ltuPlan"><span class="ltuPill">Free</span><h3>免費會員</h3><div class="ltuCount">3 <small>題／日</small></div><p class="sub">適合先體驗基本練習。</p><ul class="ltuMiniList"><li>每日 3 題基本練習</li><li>基本答案與簡要解析</li><li class="off">無 AI 長期記憶</li><li class="off">無每週會考模考分析</li><li class="off">無 AI 重點與弱點筆記</li></ul></div>
          <div class="ltuPlan complete"><span class="ltuPill primary">AI Complete</span><h3>完整會員</h3><div class="ltuCount">10 <small>題／日</small></div><p class="sub">AI 長期追蹤、重考不會的地方，並把錯題整理成自己的英文學習檔案。</p><div class="ltuStats"><span class="ltuStat">AI 長期弱點記憶</span><span class="ltuStat">每週會考模考</span><span class="ltuStat">AI 筆記</span><span class="ltuStat">間隔複習</span></div>
          <details class="ltuDetails"><summary>查看完整會員功能與 AI 筆記範例 ＋</summary><div class="ltuDetailBody"><div class="noteSample"><span class="sampleTag">範例｜1 份 AI 筆記 · 7 類重點</span><h4>我的 AI 英文筆記會長這樣</h4><div class="noteRows">
            <div class="noteRow"><div class="noteNo">01</div><div class="noteCat">Vocabulary</div><div class="noteVal">since：從某個時間點開始；常與現在完成式搭配。</div></div>
            <div class="noteRow"><div class="noteNo">02</div><div class="noteCat">Phrase</div><div class="noteVal">have lived here since 2024；固定搭配與情境一起記。</div></div>
            <div class="noteRow"><div class="noteNo">03</div><div class="noteCat">Grammar</div><div class="noteVal">have/has + p.p.；since + 起點，for + 一段時間。</div></div>
            <div class="noteRow"><div class="noteNo">04</div><div class="noteCat">Sentence Pattern</div><div class="noteVal">I have studied English since Grade 7.</div></div>
            <div class="noteRow"><div class="noteNo">05</div><div class="noteCat">錯因</div><div class="noteVal">把 since 和 for 混用，所以雖然知道時態，仍選錯介系詞。</div></div>
            <div class="noteRow"><div class="noteNo">06</div><div class="noteCat">弱點提示</div><div class="noteVal">目前需加強：現在完成式時間表達。</div></div>
            <div class="noteRow"><div class="noteNo">07</div><div class="noteCat">下次複習</div><div class="noteVal">先立即變式重考；答對後再於 3 天、7 天後驗證。</div></div>
          </div></div><ul class="ltuMiniList"><li>每日 10 題個人化弱點練習</li><li>AI 長期記住過去錯題與弱點</li><li>每週國中會考閱讀＋聽力模考與分析</li><li>AI 單字／片語／文法／句型重點整理</li><li>AI 弱點筆記提示與後續複習排程</li><li>學習曲線與能力分析</li></ul></div></details>
          <div class="ltuPriceLine"><strong>NT$1,500</strong>／月　<strong>NT$15,000</strong>／年</div><a class="ltuCta" href="#accountV16">查看付款與會員狀態</a></div>
        </div>`;
      anchor.parentNode.insertBefore(sec,anchor);
    }
    d.querySelectorAll('.compareCard,.priceCard').forEach(card=>{const txt=card.textContent||'';if(/Free|免費會員/.test(txt)){const lis=card.querySelectorAll('li');lis.forEach(li=>{if(/每日\s*[45]\s*題|每天\s*[45]\s*題/.test(li.textContent||''))li.textContent='每日 3 題基本練習';});}});
  }
  function boot(){const d=deepest();if(d)mount(d)}
  frame?.addEventListener('load',()=>{setTimeout(boot,800);setTimeout(boot,2200)});setInterval(boot,3500);
})();
