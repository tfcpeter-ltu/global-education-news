(function(){'use strict';
const CACHE='20260910-two-hero-v15';
function appDoc(){try{let d=document;for(let i=0;i<12;i++){if(d.querySelector&&d.querySelector('.v3nav'))return d;const f=d.querySelector&&d.querySelector('iframe');if(!f||!f.contentDocument)break;d=f.contentDocument}return d}catch{return document}}
function mount(d){if(!d?.body)return;
  if(!d.getElementById('cuteThemeV1Style')){const s=d.createElement('style');s.id='cuteThemeV1Style';s.textContent=`
:root{--cute-blue:#2878f0;--cute-ink:#123b68;--cute-soft:#f3f9ff;--cute-line:#dcecff;--cute-pink:#fff4f8;--cute-mint:#f1fcf8;--cute-yellow:#fff9e8}
html{scroll-behavior:smooth}body{background:linear-gradient(180deg,#fff 0,#f7fbff 48%,#fff 100%)!important;color:var(--cute-ink)!important}
#ltuHomeV3{max-width:1320px!important;padding:0 24px 60px!important}.v3nav{height:70px!important;border-bottom:1px solid #e7f1fb!important;background:#ffffffef!important;box-shadow:0 6px 24px rgba(58,121,186,.06)!important}.v3logo{color:#16539a!important}.v3brandtext{color:#173f68!important}.v3links .primary,.v3Action,.btn.primary,.pcBtn{background:linear-gradient(135deg,#2d83f7,#176df3)!important;border-radius:999px!important;box-shadow:0 7px 18px rgba(32,116,236,.16)!important}.v3Action.secondary,.btn.secondary{border-radius:999px!important;background:#edf6ff!important;color:#245d96!important;border:1px solid #d7eaff!important}
#v3Hero,.v3Quick,.v3Note,#cuteFeatureV1{display:none!important}
#cuteHeroV1,#cuteFeatureHeroV15{display:block!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;padding:0!important;border:0!important;overflow:hidden!important;background:#eef7ff!important;box-shadow:0 16px 42px rgba(55,113,170,.12)!important}
#cuteHeroV1{max-width:1138px!important;margin-top:16px!important;margin-bottom:18px!important;border-radius:22px!important}
#cuteFeatureHeroV15{max-width:1320px!important;margin-top:0!important;margin-bottom:28px!important;border-radius:24px!important}
#cuteHeroV1 img,#cuteFeatureHeroV15 img{display:block!important;width:100%!important;height:auto!important;max-width:none!important;object-fit:contain!important;background:#fff!important}
#plans{display:block!important;visibility:visible!important;opacity:1!important;background:transparent!important;padding-top:28px!important}#plans>h2,#plans h2{color:#123d69!important;letter-spacing:-.02em}.pricing{gap:16px!important}.price{border:1px solid #dbeafa!important;border-radius:26px!important;background:#fff!important;box-shadow:0 12px 30px rgba(27,92,155,.07)!important}.price.feature{border:2px solid #4b93f6!important;background:linear-gradient(145deg,#fff,#f1f8ff)!important}.price ul{line-height:1.85!important}.ribbon{background:#e9f4ff!important;color:#176df3!important;border-radius:999px!important}
#completePreviewV1,.pcMock,.pcResult,.nbBox,.a2box,.memberCard,.priceCard,.card,.panel{border-radius:22px!important}.section{scroll-margin-top:84px}.section h2{color:#123d69!important}.lead{color:#667f98!important}.card,.panel{border-color:#e0edf8!important;box-shadow:0 10px 28px rgba(35,94,150,.05)!important}.pcLock{border-radius:22px!important;background:#fbfdff!important;border-color:#cfe3f7!important}.pcStat,.pcYear,.pcMock{border-color:#dfeaf5!important}.nbItem,.nbStat{border-radius:16px!important}.a2plan{border-radius:18px!important;background:#fbfdff!important}.a2btn{border-radius:999px!important}
#weekly,#history,#analysis{background:linear-gradient(180deg,#fff,#fbfdff)!important;border-radius:28px!important;padding-left:22px!important;padding-right:22px!important}.footer{color:#8292a4!important}
@media(max-width:700px){#ltuHomeV3{padding:0 12px 40px!important}.v3nav{height:64px!important}#cuteHeroV1{border-radius:14px!important;margin-top:8px!important;margin-bottom:12px!important}#cuteFeatureHeroV15{border-radius:14px!important;margin-bottom:20px!important}.pricing{grid-template-columns:1fr!important}.section{padding-left:4px!important;padding-right:4px!important}}
`;d.head.appendChild(s)}
  d.getElementById('v3Hero')?.remove();
  d.querySelectorAll('.v3Quick,.v3Note,#cuteFeatureV1').forEach(x=>x.remove());
  const nav=d.querySelector('#ltuHomeV3 .v3nav')||d.querySelector('.v3nav');
  if(!nav)return;
  let hero=d.getElementById('cuteHeroV1');
  if(!hero){hero=d.createElement('section');hero.id='cuteHeroV1';hero.setAttribute('aria-label','CAP English AI 主視覺')}
  if(hero.previousElementSibling!==nav)nav.insertAdjacentElement('afterend',hero);
  let heroImg=hero.querySelector('img');if(!heroImg){heroImg=d.createElement('img');hero.replaceChildren(heroImg)}
  heroImg.alt='用 AI 學英文，把時間花在真正不會的地方｜LTU 國際學術中心 CAP English AI';
  heroImg.src='/cap-hero-cute.jpg?v='+CACHE;heroImg.width=1138;heroImg.height=262;heroImg.decoding='async';heroImg.fetchPriority='high';
  let feature=d.getElementById('cuteFeatureHeroV15');
  if(!feature){feature=d.createElement('section');feature.id='cuteFeatureHeroV15';feature.setAttribute('aria-label','CAP English AI 特色功能')}
  if(feature.previousElementSibling!==hero)hero.insertAdjacentElement('afterend',feature);
  let featureImg=feature.querySelector('img');if(!featureImg){featureImg=d.createElement('img');feature.replaceChildren(featureImg)}
  featureImg.alt='CAP English AI 特色功能｜AI 弱點分析、AI 筆記與複習規劃';
  featureImg.src='/cap-feature-hero-v13.avif?v='+CACHE;featureImg.width=1672;featureImg.height=941;featureImg.decoding='async';featureImg.fetchPriority='high';
  d.querySelectorAll('.v3Plans').forEach(x=>x.remove());
  const plans=d.getElementById('plans');if(plans){plans.style.setProperty('display','block','important');plans.classList.remove('pcHide','v3Locked','v19Locked')}
}
setTimeout(()=>mount(appDoc()),120);setTimeout(()=>mount(appDoc()),500);setTimeout(()=>mount(appDoc()),1400);setInterval(()=>mount(appDoc()),2500);window.addEventListener('ltu:product-refresh',()=>setTimeout(()=>mount(appDoc()),250));window.LTUCuteTheme={refresh:()=>mount(appDoc())};
})();