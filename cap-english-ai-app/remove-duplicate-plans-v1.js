(function(){'use strict';
function deepest(){try{let f=document.querySelector('iframe'),d=f?.contentDocument;if(!d)return document;for(let i=0;i<12;i++){const n=d.querySelector('iframe');if(!n||!n.contentDocument)break;d=n.contentDocument}return d}catch{return document}}
function clean(){const d=deepest();if(!d?.body)return;d.querySelectorAll('.v3Plans').forEach(el=>el.remove());const plans=d.getElementById('plans');if(plans){plans.style.removeProperty('display');plans.classList.remove('pcHide','v19Locked');}}
setTimeout(clean,300);setTimeout(clean,1000);setTimeout(clean,2500);
const t=setInterval(()=>{clean();const d=deepest();if(d?.getElementById('ltuHomeV3')&&!d.querySelector('.v3Plans'))clearInterval(t)},500);
window.addEventListener('ltu:product-refresh',()=>setTimeout(clean,100));
})();