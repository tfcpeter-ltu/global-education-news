(function(){'use strict';
function deepest(){try{let f=document.querySelector('iframe'),d=f?.contentDocument;if(!d)return document;for(let i=0;i<32;i++){const n=d.querySelector('iframe');if(!n||!n.contentDocument)break;d=n.contentDocument}return d}catch{return document}}
let observedDoc=null,observer=null;
function clean(){const d=deepest();if(!d?.body)return;
 ['pcoreMembership','membershipCompareV18','upgradeV15'].forEach(id=>d.getElementById(id)?.remove());
 const plans=d.getElementById('plans');if(!plans)return;
 plans.classList.remove('pcHide','v19Locked','hidden','hiddenV16');plans.style.setProperty('display','block','important');plans.style.setProperty('visibility','visible','important');plans.style.setProperty('opacity','1','important');
 const h=plans.querySelector('h2');if(h)h.textContent='Free 免費會員與 AI Complete 完整會員';
 const cards=[...plans.querySelectorAll('.price')];
 const free=cards.find(x=>(x.textContent||'').includes('Free 免費會員'))||cards[0];
 const complete=cards.find(x=>(x.textContent||'').includes('完整會員')&&!(x.textContent||'').includes('Free 免費會員'))||cards[1];
 if(free){const ul=free.querySelector('ul');if(ul)ul.innerHTML='<li>每天 3 題，台灣時間 00:00 重置</li><li>基本答案與簡要解析</li><li>帳號記錄已做題，避免重抽</li><li>基本能力練習</li><li style="color:#9aa5af">不建立 AI 長期弱點模型與個人 AI 筆記</li><li style="color:#9aa5af">不開 Weekly Mock、歷屆練習紀錄與長期弱點分析</li>';const b=free.querySelector('button');if(b)b.textContent='免費開始'}
 if(complete){const ul=complete.querySelector('ul');if(ul)ul.innerHTML='<li>每日 10 題核心個人化任務，可追加弱點訓練</li><li>AI 記憶出題，帳號級避開已做題目</li><li>AI 長期弱點記憶與錯題同能力變式練習</li><li>AI 單字／片語／文法／句型筆記</li><li>3／7／21／30 天間隔複習</li><li>Weekly Mock：43 題閱讀＋21 題聽力</li><li>103～115 年官方資源＋原創變式練習紀錄</li><li>跨裝置弱點分析、模考歷程與學習曲線</li>';const b=complete.querySelector('button');if(b)b.textContent='查看完整會員功能'}
 if(observedDoc!==d){observer?.disconnect();observer=new MutationObserver(()=>{const extra=d.getElementById('pcoreMembership');if(extra)extra.remove();const p=d.getElementById('plans');if(p){p.classList.remove('pcHide','v19Locked','hidden','hiddenV16');p.style.setProperty('display','block','important')}});observer.observe(d.body,{childList:true,subtree:true});observedDoc=d}
}
window.addEventListener('click',e=>{const d=deepest();const b=e.target?.closest?.('[data-up]');if(b&&d?.getElementById('plans')){e.preventDefault();e.stopImmediatePropagation();d.getElementById('plans').scrollIntoView({behavior:'smooth',block:'start'})}},true);
setTimeout(clean,100);setTimeout(clean,500);setTimeout(clean,1200);setInterval(clean,1000);
window.LTUMembershipMerge={refresh:clean};
})();