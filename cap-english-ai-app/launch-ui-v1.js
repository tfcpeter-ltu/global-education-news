(function(){'use strict';
const PENDING='ltuCapPendingPracticeV1';
let replaying=false;
function deepest(){try{let f=document.querySelector('iframe'),d=f?.contentDocument;if(!d)return document;for(let i=0;i<8;i++){const n=d.querySelector('iframe');if(!n||!n.contentDocument)break;d=n.contentDocument}return d}catch{return document}}
function dispatch(name,detail){window.dispatchEvent(new CustomEvent(name,{detail}))}
async function authMe(){try{const r=await fetch('/api/auth/me',{credentials:'include'});return r.ok?await r.json():null}catch{return null}}
function savePending(detail){try{sessionStorage.setItem(PENDING,JSON.stringify({detail:detail||{mode:'core'},ts:Date.now()}))}catch{}}
function takePending(){try{const raw=sessionStorage.getItem(PENDING);if(!raw)return null;const x=JSON.parse(raw);if(!x?.ts||Date.now()-x.ts>10*60*1000){sessionStorage.removeItem(PENDING);return null}sessionStorage.removeItem(PENDING);return x.detail||{mode:'core'}}catch{return null}}
function practiceInProgress(d){const m=d?.getElementById('ltuPracticeModalV4');if(!m?.classList.contains('show'))return false;const t=(m.textContent||'');return /第\s*\d+\s*\/\s*\d+\s*題/.test(t)&&!/練習完成|訓練完成|已完成/.test(t)}
function confirmLeavePractice(d){return !practiceInProgress(d)||confirm('目前這輪練習還沒完成。離開後本輪作答畫面不會保留，確定要離開嗎？')}
function bindPracticeGuard(d){if(!d?.body||d.body.dataset.practiceGuardV1)return;d.body.dataset.practiceGuardV1='1';d.addEventListener('click',e=>{const m=d.getElementById('ltuPracticeModalV4');if(!m?.classList.contains('show'))return;const close=e.target?.closest?.('.lp4close');const backdrop=e.target===m;if((close||backdrop)&&!confirmLeavePractice(d)){e.preventDefault();e.stopImmediatePropagation()}},true)}
function cleanup(d){
  if(!d?.body)return;
  bindPracticeGuard(d);
  const hero=d.querySelector('.hero');
  if(hero){
    const lead=hero.querySelector('.lead');
    if(lead)lead.textContent='免費會員每天 3 題＋基本解析；AI Complete 每日 10 題核心任務，可追加弱點訓練，並串接 AI 筆記、Weekly Mock、歷屆能力練習與弱點分析。';
    const stats=hero.querySelectorAll('.stat');
    const vals=[['3','免費會員每日題數'],['10+','Complete 核心＋追加訓練'],['43+21','Weekly Mock'],['20K','原創動態題目變化']];
    stats.forEach((x,i)=>{if(!vals[i])return;const b=x.querySelector('b'),s=x.querySelector('span');if(b)b.textContent=vals[i][0];if(s)s.textContent=vals[i][1]});
    const primary=hero.querySelector('.btn.primary');
    if(primary&&!primary.dataset.launchv2){const n=primary.cloneNode(true);n.dataset.launchv2='1';n.dataset.authv2='1';n.removeAttribute('onclick');n.textContent='免費開始 3 題';n.addEventListener('click',e=>{e.preventDefault();dispatch('ltu:start-practice',{mode:'core'})});primary.replaceWith(n)}
    const secondary=hero.querySelector('.btn.secondary');
    if(secondary&&!secondary.dataset.launchv2){const n=secondary.cloneNode(true);n.dataset.launchv2='1';n.removeAttribute('onclick');n.textContent='查看 Free／Complete 差異';n.addEventListener('click',e=>{e.preventDefault();d.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'})});secondary.replaceWith(n)}
  }
  const nav=d.querySelector('.top nav .links');
  if(nav&&!nav.dataset.launchv2){
    nav.dataset.launchv2='1';
    nav.innerHTML='<a href="#" data-n="home">首頁</a><a href="#" data-n="free">免費 3 題</a><a href="#" data-n="complete">AI Complete</a><a href="#" data-n="mock">Weekly Mock</a><a href="#" data-n="history">歷屆題</a><a href="#" data-n="analysis">弱點分析</a>';
    nav.querySelectorAll('[data-n]').forEach(a=>a.onclick=e=>{e.preventDefault();const k=a.dataset.n;if(k==='home')hero?.scrollIntoView({behavior:'smooth'});else if(k==='free')dispatch('ltu:start-practice',{mode:'core'});else if(k==='complete')d.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'});else d.getElementById(k==='mock'?'weekly':k)?.scrollIntoView({behavior:'smooth',block:'start'})});
  }
  ['examguide','dashboard','daily','wrongbook','notes','global','admin'].forEach(id=>{const el=d.getElementById(id);if(el)el.style.display='none'});
  const plans=d.getElementById('plans');
  if(plans){plans.style.display='block';plans.classList.remove('pcHide','v19Locked')}
  d.getElementById('pcoreMembership')?.remove();
  d.getElementById('membershipCompareV18')?.remove();
  d.getElementById('upgradeV15')?.remove();
  const acc=d.getElementById('accountBtn');if(acc)acc.textContent=acc.textContent.includes('Complete')?'AI Complete 帳號':'登入／帳號';
}
window.addEventListener('ltu:start-practice',async e=>{if(replaying)return;const x=await authMe();if(!x?.authenticated)savePending(e.detail||{mode:'core'})});
window.addEventListener('ltu:auth-changed',async()=>{const x=await authMe();if(!x?.authenticated)return;const p=takePending();if(!p)return;setTimeout(()=>{replaying=true;dispatch('ltu:start-practice',p);setTimeout(()=>{replaying=false},500)},350)});
window.addEventListener('ltu:goto',e=>{const d=deepest(),id=e.detail?.id||e.detail;if(!d||!id)return;if(id==='notes'||id==='notebook'){dispatch('ltu:open-notebook');return}if(id==='account'){dispatch('ltu:open-auth');return}d.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})});
window.addEventListener('beforeunload',e=>{const d=deepest();if(practiceInProgress(d)){e.preventDefault();e.returnValue=''}});
setInterval(()=>cleanup(deepest()),700);
setTimeout(()=>cleanup(deepest()),200);
window.addEventListener('ltu:product-refresh',()=>setTimeout(()=>cleanup(deepest()),250));
})();