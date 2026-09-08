(function(){'use strict';
let lastKey=null,pending=false,busy=false;
function deepest(){try{let f=document.querySelector('iframe'),d=f?.contentDocument;if(!d)return document;for(let i=0;i<32;i++){const n=d.querySelector('iframe');if(!n||!n.contentDocument)break;d=n.contentDocument}return d}catch{return document}}
async function state(){try{const r=await fetch('/api/auth/me',{credentials:'include'});if(!r.ok)return null;const x=await r.json(),u=x?.user||{};return `${!!x?.authenticated}|${u.membershipPlan||''}|${u.membershipStatus||''}|${u.expiresAt||''}`}catch{return null}}
function mockActive(){const d=deepest(),m=d?.getElementById('pcMock');return !!(m&&m.querySelector('.pcMock')&&!m.querySelector('.pcResult'))}
async function check(){if(busy)return;busy=true;try{const k=await state();if(k==null)return;if(lastKey===null){lastKey=k;return}if(k!==lastKey){lastKey=k;pending=true}if(pending&&!mockActive()){pending=false;window.dispatchEvent(new CustomEvent('ltu:product-refresh'))}}finally{busy=false}}
setInterval(check,5000);setTimeout(check,1200);window.addEventListener('focus',check);document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});
})();
