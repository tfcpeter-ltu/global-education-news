(function(){'use strict';
const href='/academic-theme.css?v=20261014-cap-logo-v1';
function install(doc){if(!doc?.body)return;doc.body.dataset.academic='1';if(!doc.querySelector('link[rel=icon]')){const icon=doc.createElement('link');icon.rel='icon';icon.href='/cap-logo.svg';doc.head.append(icon)}if(!doc.getElementById('academic-theme')){const link=doc.createElement('link');link.id='academic-theme';link.rel='stylesheet';link.href=href;doc.head.append(link)}for(const frame of doc.querySelectorAll('iframe')){if(!frame.dataset.academicBound){frame.dataset.academicBound='1';frame.addEventListener('load',()=>{try{install(frame.contentDocument)}catch{}})}try{install(frame.contentDocument)}catch{}}}
install(document);document.addEventListener('DOMContentLoaded',()=>install(document));
})();
