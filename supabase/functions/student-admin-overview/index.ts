import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders={
  'Access-Control-Allow-Origin':'https://globalednews.com',
  'Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Content-Type':'application/json; charset=utf-8'
};
const adminEmail='editor.jsti.ltu@gmail.com';
const response=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:corsHeaders});

Deno.serve(async request=>{
  if(request.method==='OPTIONS')return new Response('ok',{headers:corsHeaders});
  if(request.method!=='POST')return response({message:'Method not allowed'},405);
  const authorization=request.headers.get('Authorization')||'';
  const projectUrl=Deno.env.get('SUPABASE_URL');
  const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!projectUrl||!serviceKey)return response({message:'伺服器設定不完整。'},500);

  const userResponse=await fetch(`${projectUrl}/auth/v1/user`,{headers:{Authorization:authorization,apikey:serviceKey}});
  if(!userResponse.ok)return response({message:'請先登入管理員帳號。'},401);
  const user=await userResponse.json();
  if(!user.email_confirmed_at||String(user.email||'').toLowerCase()!==adminEmail)return response({message:'這個帳號沒有管理員權限。'},403);

  const adminHeaders={Authorization:`Bearer ${serviceKey}`,apikey:serviceKey};
  const get=async(path:string)=>{
    const result=await fetch(`${projectUrl}${path}`,{headers:adminHeaders});
    if(!result.ok)throw new Error(await result.text());
    return result.json();
  };

  try{
    const [authData,profiles,preferences,navigators]=await Promise.all([
      get('/auth/v1/admin/users?per_page=1000&page=1'),
      get('/rest/v1/student_profiles?select=*'),
      get('/rest/v1/communication_preferences?select=*'),
      get('/rest/v1/navigator_states?select=*')
    ]);
    const byUser=(rows:Record<string,unknown>[])=>new Map(rows.map(row=>[row.user_id,row]));
    const profileMap=byUser(profiles), preferenceMap=byUser(preferences), navigatorMap=byUser(navigators);
    const rows=(authData.users||[]).filter((item:Record<string,unknown>)=>item.email_confirmed_at).map((item:Record<string,unknown>)=>{
      const id=item.id as string;
      const profile=profileMap.get(id)||{}, preference=preferenceMap.get(id)||{}, navigator=navigatorMap.get(id)||{};
      return {
        user_id:id,email:item.email,email_verified:true,registered_at:item.created_at,last_sign_in_at:item.last_sign_in_at,
        full_name:profile.full_name,preferred_name:profile.preferred_name,grade_level:profile.grade_level,curriculum:profile.curriculum,target_intake:profile.target_intake,
        is_minor:Boolean(profile.is_minor),guardian_consent_confirmed:Boolean(profile.guardian_consent_confirmed),
        weekly_news:Boolean(preference.weekly_news),peter_articles:Boolean(preference.peter_articles),peter_events:Boolean(preference.peter_events),application_deadlines:Boolean(preference.application_deadlines),
        navigator_state:navigator.state||{},navigator_updated_at:navigator.updated_at
      };
    });
    rows.sort((a:Record<string,unknown>,b:Record<string,unknown>)=>String(b.registered_at).localeCompare(String(a.registered_at)));
    return response(rows);
  }catch(error){
    console.error('student-admin-overview failed',error);
    return response({message:'學生資料暫時無法載入。'},500);
  }
});
