(()=>{
  const URL='https://amaslsruxvgwpruykhmp.supabase.co';
  const KEY='sb_publishable_pt7RTkDPNp9SN1coiDoPnQ_pOVVkHOV';
  const SESSION_KEY='studyNavigatorMemberSession';
  const PREFIX='studyNavigator';
  const jsonHeaders={'apikey':KEY,'Content-Type':'application/json'};
  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}};
  const saveSession=s=>s?localStorage.setItem(SESSION_KEY,JSON.stringify(s)):localStorage.removeItem(SESSION_KEY);
  async function request(path,{method='GET',body,auth=true,headers={}}={}){
    let session=readSession();
    const h={...jsonHeaders,...headers};
    if(auth&&session?.access_token)h.Authorization=`Bearer ${session.access_token}`;
    let response=await fetch(URL+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body)});
    if(response.status===401&&auth&&session?.refresh_token){
      const refreshed=await fetch(URL+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:jsonHeaders,body:JSON.stringify({refresh_token:session.refresh_token})});
      if(refreshed.ok){session=await refreshed.json();saveSession(session);h.Authorization=`Bearer ${session.access_token}`;response=await fetch(URL+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body)});}
    }
    const text=await response.text();
    let data=null;try{data=text?JSON.parse(text):null}catch{data=text}
    if(!response.ok)throw new Error(data?.msg||data?.message||data?.error_description||data?.error||'連線失敗，請稍後再試。');
    return data;
  }
  async function signUp(email,password){return request('/auth/v1/signup',{method:'POST',body:{email,password,options:{emailRedirectTo:'https://globalednews.com/study-abroad/member.html'}},auth:false})}
  async function signIn(email,password){const data=await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password},auth:false});saveSession(data);return data}
  async function signOut(){try{await request('/auth/v1/logout',{method:'POST'})}catch{}saveSession(null)}
  async function user(){const s=readSession();if(!s)return null;try{return await request('/auth/v1/user')}catch{saveSession(null);return null}}
  const ownerHeaders={'Prefer':'resolution=merge-duplicates,return=representation'};
  const select=async table=>{const rows=await request(`/rest/v1/${table}?select=*&limit=1`);return rows?.[0]||null};
  const upsert=(table,row)=>request(`/rest/v1/${table}?on_conflict=user_id`,{method:'POST',body:row,headers:ownerHeaders});
  const insert=(table,row)=>request(`/rest/v1/${table}`,{method:'POST',body:row,headers:{Prefer:'return=minimal'}});
  const collectState=()=>{const state={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith(PREFIX)&&k!==SESSION_KEY){try{state[k]=JSON.parse(localStorage.getItem(k))}catch{state[k]=localStorage.getItem(k)}}}return state};
  const applyState=state=>Object.entries(state||{}).forEach(([k,v])=>{if(k.startsWith(PREFIX)&&k!==SESSION_KEY)localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))});
  function showStorageNotice(){
    const header=document.querySelector('.topbar');
    if(!header||document.querySelector('.storage-notice'))return;
    const style=document.createElement('style');
    style.textContent='.storage-notice{display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 18px;background:#f5ead1;border-bottom:1px solid #d8c28f;color:#17324d;font-size:14px;line-height:1.5;text-align:center}.storage-notice strong{font-weight:850}.storage-notice a{color:#17324d;font-weight:850;text-decoration:underline;text-underline-offset:3px}@media(max-width:620px){.storage-notice{display:block;padding:10px 14px}.storage-notice a{display:inline-block;margin-left:4px}}';
    document.head.appendChild(style);
    const notice=document.createElement('aside');
    notice.className='storage-notice';
    notice.setAttribute('aria-label','資料儲存方式');
    notice.innerHTML='<span><strong>免註冊也能使用。</strong>未登入時資料只保存在目前瀏覽器；免費註冊後可雲端儲存、長期保留，並跨裝置繼續規劃。</span><a href="/study-abroad/member.html">註冊／登入 →</a>';
    header.insertAdjacentElement('afterend',notice);
  }
  let syncTimer=null,syncing=false,patched=false;
  async function saveNavigatorState(){const u=await user();if(!u)return;await upsert('navigator_states',{user_id:u.id,state:collectState(),updated_at:new Date().toISOString()})}
  async function syncNavigator(){if(syncing)return;syncing=true;try{const u=await user();if(!u)return null;const remote=await select('navigator_states');const local=collectState();if(remote?.state&&Object.keys(remote.state).length){applyState({...remote.state,...local});await saveNavigatorState()}else if(Object.keys(local).length){await upsert('navigator_states',{user_id:u.id,state:local,imported_local_data_at:new Date().toISOString(),updated_at:new Date().toISOString()})}patchStorage();return u}finally{syncing=false}}
  function patchStorage(){if(patched)return;patched=true;const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){original.call(this,k,v);if(this===localStorage&&String(k).startsWith(PREFIX)&&k!==SESSION_KEY){clearTimeout(syncTimer);syncTimer=setTimeout(()=>saveNavigatorState().catch(()=>{}),900)}}}
  window.StudyMember={signUp,signIn,signOut,user,select,upsert,insert,syncNavigator,saveNavigatorState,readSession};
  showStorageNotice();
  if(readSession())syncNavigator().catch(()=>{});
})();
