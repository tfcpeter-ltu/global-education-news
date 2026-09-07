(function(){
const OUTER=document.querySelector('iframe');
const FALLBACK='https://images.unsplash.com/photo-1557989048-03456d01a26e?auto=format&fit=crop&fm=jpg&q=82&w=2200';
function deepest(){try{let d=OUTER?.contentDocument;if(!d)return null;for(let i=0;i<32;i++){const f=d.querySelector('iframe');if(!f||!f.contentDocument)break;d=f.contentDocument}return d}catch(e){return null}}
function patch(d){
  const img=d.querySelector('.v3heroImg');
  if(img){
    img.src=FALLBACK;
    img.alt='LTU CAP English AI 國中生英文學習';
    img.style.aspectRatio='16/9';
    img.style.objectFit='cover';
    img.style.background='#eef6ff';
    img.onerror=function(){this.style.display='none';const box=this.parentElement;if(box&&!box.querySelector('.v4fallback')){const x=d.createElement('div');x.className='v4fallback';x.innerHTML='<div style="font-size:42px">📚 🤖 ✨</div><h2 style="margin:12px 0 6px">LTU CAP English AI</h2><p style="margin:0;color:#60758c">AI 找弱點・整理重點・記憶後再出題</p>';box.appendChild(x)}};
  }
  if(!d.getElementById('v4fixstyle')){const s=d.createElement('style');s.id='v4fixstyle';s.textContent='.v4fallback{min-height:360px;border-radius:28px;background:linear-gradient(135deg,#eff7ff,#dceeff);display:grid;place-items:center;align-content:center;text-align:center;padding:30px}.v3memberWrap{z-index:150}.v3menu{z-index:999!important}.v3menu.show{display:block!important}.v3links button{pointer-events:auto!important}';d.head.appendChild(s)}
  const btn=d.getElementById('v3MemberBtn'),menu=d.getElementById('v3Menu');
  if(btn&&menu&&!btn.dataset.v4bound){
    btn.dataset.v4bound='1';
    btn.textContent='完整會員｜AI 記憶出題⌄';
    btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();menu.classList.toggle('show')});
    d.addEventListener('click',e=>{if(!menu.contains(e.target)&&e.target!==btn)menu.classList.remove('show')});
  }
  const freeLink=[...d.querySelectorAll('.v3links a')].find(a=>/免費/.test(a.textContent||''));
  if(freeLink)freeLink.textContent='免費會員每日 3 題';
}
function boot(){const d=deepest();if(d)patch(d)}
OUTER?.addEventListener('load',()=>{setTimeout(boot,700);setTimeout(boot,1800)});
setInterval(boot,3000);
})();