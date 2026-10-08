import {rest,user} from '@/lib/database';
export const dynamic='force-dynamic';
const admins=['blythacademy.taiwan@gmail.com','tfcpeter@gmail.com','editor.jsti.ltu@gmail.com'];
const json=(v:unknown,status=200)=>Response.json(v,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(req:Request){
 const u:any=await user(req);if(!u)return json({error:'請先登入'},401);
 const admin=admins.includes((u.email||'').toLowerCase());
 const r=await rest(req,'guidance_teachers?select=user_id,email,name,school,subjects,status,created_at&order=created_at.desc');
 if(!r.ok)return json({error:'教師資料載入失敗'},503);
 const rows:any[]=await r.json();const profile=rows.find((x:any)=>x.user_id===u.id);
 return json({admin,profile,teachers:admin?rows:[],approved:admin||profile?.status==='approved'});
}
export async function PATCH(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return json({error:'無效請求'},403);
 const u:any=await user(req);if(!u)return json({error:'請先登入'},401);
 if(!admins.includes((u.email||'').toLowerCase()))return json({error:'僅管理員可以審核'},403);
 const d:any=await req.json();if(typeof d.user_id!=='string'||!['approved','rejected','pending'].includes(d.status))return json({error:'資料格式錯誤'},400);
 const r=await rest(req,'guidance_teachers?user_id=eq.'+encodeURIComponent(d.user_id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({status:d.status,reviewed_by:u.id,reviewed_at:new Date().toISOString()})});
 if(!r.ok)return json({error:'審核儲存失敗'},500);const rows:any[]=await r.json();if(!rows.length)return json({error:'找不到老師申請'},404);return json({ok:true});
}

export async function POST(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return json({error:'無效請求'},403);
 const u:any=await user(req);if(!u)return json({error:'請先登入'},401);
 const d:any=await req.json();
 if(!['name','school','subjects'].every(k=>typeof d[k]==='string'&&d[k].trim()&&d[k].length<=({name:100,school:150,subjects:200} as Record<string,number>)[k]))return json({error:'請完整填寫姓名、學校與職務'},400);
 const r=await rest(req,'guidance_teachers',{method:'POST',body:JSON.stringify({user_id:u.id,email:u.email,name:d.name.trim(),school:d.school.trim(),subjects:d.subjects.trim()})});
 if(!r.ok)return json({error:'申請未儲存，請重新確認審核狀態；若仍失敗請聯絡管理員。'},409);
 return json({ok:true});
}
