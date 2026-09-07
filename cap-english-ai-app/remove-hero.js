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
    const hero=d.getElementById('v3Hero');
    if(hero) hero.remove();
    d.querySelectorAll('.v3hero,.v4fallback').forEach(el=>el.remove());
    const img=d.querySelector('.v3heroImg');
    if(img){
      const parent=img.parentElement;
      img.remove();
      if(parent && !parent.children.length && !parent.textContent.trim()) parent.remove();
    }
  }
  OUTER?.addEventListener('load',()=>{
    setTimeout(removeHero,100);
    setTimeout(removeHero,500);
    setTimeout(removeHero,1500);
  });
  setInterval(removeHero,250);
})();
