import {mathModuleView} from '/math-library-routing.mjs';
const main=document.querySelector('main.mathShell'),header=document.querySelector('.mathHeader');
const panel=document.createElement('section');panel.id='mathLibraryPanel';panel.hidden=true;
panel.innerHTML='<iframe id="mathLibraryFrame" title="數學學習中心原創題庫"></iframe>';
main.after(panel);
const style=document.createElement('style');
style.textContent='main.mathShell[hidden],#mathLibraryPanel[hidden]{display:none!important}#mathLibraryFrame{display:block;border:0;width:100%;height:calc(100dvh - var(--math-module-header,76px));background:#f5efdf}body[data-math-module="library"]{overflow:hidden}';
document.head.append(style);
const frame=panel.querySelector('iframe');
document.querySelector('.mathBrand').href='#';
function size(){document.documentElement.style.setProperty('--math-module-header',header.getBoundingClientRect().height+'px')}
new ResizeObserver(size).observe(header);size();
function route(){
 const view=mathModuleView(location.hash);
 main.hidden=!!view;panel.hidden=!view;
 document.body.dataset.mathModule=view?'library':'learning';
 document.title=view?`${view.label}｜CAP Math AI 數學學習中心`:'2027 國中會考數學 × AI 個人化學習｜LTU';
 if(view){if(frame.getAttribute('src')!==view.path)frame.src=view.path;window.scrollTo(0,0);size();}
 else if(['#practice','#weakness','#notebook','#mock','#reviewed'].includes(location.hash))document.querySelector(location.hash)?.scrollIntoView();
 else window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);route();
