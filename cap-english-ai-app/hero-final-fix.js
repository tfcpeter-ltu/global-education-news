(function(){
  const OUTER=document.querySelector('iframe');
  const SRC='/ltu-cap-hero-user.jpg?v=20260907-userhero-final';
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
  function fix(){
    const d=deepest();
    if(!d) return;
    const img=d.querySelector('.v3heroImg');
    if(!img) return;
    if(!img.src.includes('ltu-cap-hero-user.jpg')) img.src=SRC;
    img.alt='LTU 國際學術中心 CAP English AI 系列 AI 輔助教材';
    img.style.setProperty('width','100%','important');
    img.style.setProperty('height','auto','important');
    img.style.setProperty('aspect-ratio','auto','important');
    img.style.setProperty('object-fit','contain','important');
    img.style.setProperty('display','block','important');
    img.style.setProperty('filter','none','important');
    img.style.setProperty('transform','none','important');
    img.style.setProperty('background','transparent','important');
    img.style.setProperty('border-radius','24px','important');
    const box=img.parentElement;
    if(box){
      box.style.setProperty('min-height','0','important');
      box.style.setProperty('height','auto','important');
      box.style.setProperty('aspect-ratio','auto','important');
      box.style.setProperty('background','transparent','important');
    }
    img.onerror=function(){
      this.style.display='none';
      if(this.parentElement){
        this.parentElement.style.minHeight='0';
        this.parentElement.style.height='0';
        this.parentElement.style.margin='0';
        this.parentElement.style.padding='0';
      }
    };
  }
  OUTER?.addEventListener('load',()=>{setTimeout(fix,250);setTimeout(fix,900);setTimeout(fix,1800)});
  setInterval(fix,300);
})();