(() => {
  const KEY='studyNavigatorProfile';
  const ids=['country','major','goal','curriculum','grade','english','budget','need'];
  const els=Object.fromEntries(ids.map(k=>[k,document.getElementById('start-'+k)]));
  const params=new URLSearchParams(location.search);
  let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
  const aliases={'世界排名／研究資源':'名校／研究','當地就業／企業評價':'就業','Co-op／實習':'Co-op／就業','藝術作品／產業':'藝術設計'};
  const normalize=v=>aliases[v]||v||'';
  for(const [key,el] of Object.entries(els)){
    let value=params.has(key)?params.get(key):saved[key]||'';
    if(key==='goal')value=normalize(params.has('goal')?params.get('goal'):params.has('priority')?params.get('priority'):saved.goal||saved.priority);
    el.value=[...el.options].some(o=>o.value===value)?value:'';
  }
  const read=()=>Object.fromEntries(Object.entries(els).filter(([,el])=>el.value).map(([k,el])=>[k,el.value]));
  const save=()=>{const profile=read();try{localStorage.setItem(KEY,JSON.stringify(profile));}catch{}return profile;};
  const updateLinks=()=>{
    const major=els.major.value,country=els.country.value;
    document.getElementById('start-major-link').href=major?'universities.html?major='+encodeURIComponent(major):'majors.html';
    document.getElementById('start-decision-link').href=major?'major-decision.html?major='+encodeURIComponent(major):'major-decision.html';
    document.getElementById('start-country-link').href=country?'countries/'+country+'.html':'index.html';
  };
  Object.values(els).forEach(el=>el.addEventListener('change',()=>{save();updateLinks();}));
  document.getElementById('start-go').addEventListener('click',()=>{location.href='plan.html?'+new URLSearchParams(save()).toString();});
  document.getElementById('start-clear').addEventListener('click',()=>{
    try{localStorage.removeItem(KEY);}catch{}
    Object.values(els).forEach(el=>el.value='');
    history.replaceState(null,'',location.pathname);updateLinks();
  });
  // Opening a shared URL previews its values; save only on an explicit edit or submit.
  updateLinks();
})();
