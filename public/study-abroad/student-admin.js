(()=>{
  const $=id=>document.getElementById(id), M=window.StudyMember;
  const ADMIN_EMAIL='editor.jsti.ltu@gmail.com';
  let students=[];
  const escape=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const date=value=>value?new Intl.DateTimeFormat('zh-TW',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Taipei'}).format(new Date(value)):'—';
  const yes=value=>`<span class="${value?'yes':'no'}">${value?'是':'否'}</span>`;
  const savedItems=state=>state&&typeof state==='object'?Object.keys(state).length:0;
  const preferences=row=>[['weekly_news','週報'],['peter_articles','Peter 文章'],['peter_events','Peter 講座'],['application_deadlines','期限提醒']].filter(([key])=>row[key]).map(([,label])=>label).join('、')||'未訂閱';
  function render(){
    const query=$('student-search').value.trim().toLowerCase();
    const rows=students.filter(row=>[row.email,row.full_name,row.preferred_name,row.grade_level,row.curriculum,row.target_intake].some(value=>String(value||'').toLowerCase().includes(query)));
    $('result-count').textContent=`顯示 ${rows.length}／${students.length} 位會員`;
    $('student-rows').innerHTML=rows.map(row=>`<tr><td>${date(row.registered_at)}</td><td>${escape(row.email)}</td><td>${escape([row.full_name,row.preferred_name].filter(Boolean).join('／')||'尚未填寫')}</td><td>${escape(row.grade_level||'—')}</td><td>${escape(row.curriculum||'—')}</td><td>${escape(row.target_intake||'—')}</td><td>${yes(row.email_verified)}</td><td>${row.is_minor?`是／${row.guardian_consent_confirmed?'已同意':'未確認'}`:'否'}</td><td>${escape(preferences(row))}</td><td>${savedItems(row.navigator_state)} 項<br><small>${date(row.navigator_updated_at)}</small></td><td>${date(row.last_sign_in_at)}</td></tr>`).join('');
    $('empty-message').classList.toggle('hidden',rows.length>0);
  }
  async function load(){
    const user=await M.user();
    if(!user){$('admin-status').textContent='請使用管理員帳號登入。';$('admin-login').classList.remove('hidden');return}
    if((user.email||'').toLowerCase()!==ADMIN_EMAIL){await M.signOut();$('admin-status').textContent='這個帳號沒有管理員權限。';$('admin-login').classList.remove('hidden');return}
    $('admin-login').classList.add('hidden');
    $('admin-status').textContent='正在載入學生資料…';
    try{
      students=await M.request('/functions/v1/student-admin-overview',{method:'POST',body:{}})||[];
      $('admin-status').textContent=`管理員：${user.email}`;
      $('admin-status').style.color='#27633f';
      $('admin-content').classList.remove('hidden');
      $('total-count').textContent=students.length;
      $('verified-count').textContent=students.filter(row=>row.email_verified).length;
      $('saved-count').textContent=students.filter(row=>savedItems(row.navigator_state)>0).length;
      render();
    }catch(error){$('admin-status').textContent=`無法載入：${error.message}`}
  }
  $('student-search').addEventListener('input',render);
  $('refresh-button').addEventListener('click',load);
  $('admin-login-button').addEventListener('click',async()=>{const email=$('admin-email').value.trim(),password=$('admin-password').value;$('admin-status').textContent='正在登入管理後台…';try{await M.signIn(email,password);$('admin-password').value='';await load()}catch(error){$('admin-status').textContent=error.message}});
  $('admin-password').addEventListener('keydown',event=>{if(event.key==='Enter')$('admin-login-button').click()});
  $('admin-logout-button').addEventListener('click',async()=>{await M.signOut();location.reload()});
  load().catch(error=>{$('admin-status').textContent=error.message});
})();
