import {englishModuleView} from '/english-library-routing.mjs';
const home=document.getElementById('capapp');
const panel=document.createElement('section');panel.id='englishLibraryPanel';panel.hidden=true;
panel.innerHTML='<header class="libraryAppHeader"><a class="libraryAppBrand" href="#"><img src="/cap-logo.svg" width="38" height="38" alt=""><span>CAP English AI<small>英文學習中心</small></span></a><nav aria-label="英文學習導覽"><a href="#">英文首頁</a><a href="#english-library">原創題庫</a><a href="/complete">會員中心</a></nav></header><iframe id="englishLibraryFrame" title="英文學習中心原創題庫"></iframe>';
document.body.append(panel);
const style=document.createElement('style');
style.textContent='#englishLibraryPanel[hidden]{display:none!important}#capapp[hidden]{display:none!important}.libraryAppHeader{box-sizing:border-box;min-height:76px;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:10px max(18px,calc((100vw - 1100px)/2));background:#f5efdf;border-bottom:3px double #ae9159;color:#24483b}.libraryAppBrand{display:flex;align-items:center;gap:9px;text-decoration:none;color:inherit;font:700 20px Georgia,serif;white-space:nowrap}.libraryAppBrand small{display:block;font:12px system-ui;margin-top:3px}.libraryAppHeader nav{display:flex;gap:18px;padding:0;margin:0;flex-wrap:wrap}.libraryAppHeader nav a{font:14px system-ui;color:#24483b;text-decoration:none}.libraryAppHeader nav a:hover{text-decoration:underline}#englishLibraryFrame{height:calc(100dvh - 76px)!important;min-height:0!important;width:100%;border:0;display:block}@media(max-width:600px){.libraryAppHeader{height:106px;align-content:center;flex-wrap:wrap;gap:7px;padding:9px 16px}.libraryAppBrand{font-size:18px}.libraryAppHeader nav{width:100%;gap:22px}#englishLibraryFrame{height:calc(100dvh - 106px)!important}}';
document.head.append(style);
const frame=panel.querySelector('iframe');
function route(){
 const view=englishModuleView(location.hash);
 panel.hidden=!view;home.hidden=!!view;
 document.title=view?`${view.label}｜CAP English AI 英文學習中心`:'2027 國中教育會考英文 AI｜LTU 國際學術中心';
 if(view&&frame.getAttribute('src')!==view.path)frame.src=view.path;
 if(!view){try{frame.contentWindow?.speechSynthesis?.cancel()}catch{}}
}
window.addEventListener('hashchange',route);route();
