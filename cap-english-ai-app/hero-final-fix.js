(function(){
  const OUTER=document.querySelector('iframe');
  function deepest(){
    try{
      let d=OUTER?.contentDocument;
      if(!d) return null;
      for(let i=0;i<32;i++){
        const f=d.querySelector('iframe');
        if(!f||!f.contentDocument) break;
        d=f.contentDocument;
      }
      return d;
    }catch{return null}
  }
  function removeHero(){
    const d=deepest();
    if(!d) return;
    d.querySelectorAll('.v4fallback').forEach(el=>el.remove());
    const img=d.querySelector('.v3heroImg');
    if(!img) return;
    const box=img.parentElement;
    img.remove();
    if(box){
      box.style.setProperty('display','none','important');
      box.style.setProperty('height','0','important');
      box.style.setProperty('min-height','0','important');
      box.style.setProperty('margin','0','important');
      box.style.setProperty('padding','0','important');
      box.style.setProperty('border','0','important');
      box.style.setProperty('box-shadow','none','important');
      box.style.setProperty('background','transparent','important');
    }
  }
  OUTER?.addEventListener('load',()=>{setTimeout(removeHero,100);setTimeout(removeHero,500);setTimeout(removeHero,1200)});
  setInterval(removeHero,500);
})();