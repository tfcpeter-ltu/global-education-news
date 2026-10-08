"use client";
const URL=process.env.NEXT_PUBLIC_SUPABASE_URL||'https://amaslsruxvgwpruykhmp.supabase.co';
const KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_pt7RTkDPNp9SN1coiDoPnQ_pOVVkHOV';
const STORAGE='ltuGuidanceAdminSession';
const headers={'apikey':KEY,'Content-Type':'application/json'};
export function getSession(){try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch{return null}}
export function setSession(value:any){value?localStorage.setItem(STORAGE,JSON.stringify(value)):localStorage.removeItem(STORAGE)}
export async function signIn(email:string,password:string){const r=await fetch(`${URL}/auth/v1/token?grant_type=password`,{method:'POST',headers,body:JSON.stringify({email,password})});const d:any=await r.json();if(!r.ok)throw Error(d.error_description||d.msg||'登入失敗');setSession(d);return d}
export async function refreshSession(){const s=getSession();if(!s?.refresh_token)return null;const r=await fetch(`${URL}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers,body:JSON.stringify({refresh_token:s.refresh_token})});if(!r.ok){setSession(null);return null}const d:any=await r.json();setSession(d);return d}
export async function apiFetch(input:RequestInfo|URL,init:RequestInit={}){let s=getSession();const h=new Headers(init.headers);if(s?.access_token)h.set('Authorization',`Bearer ${s.access_token}`);let r=await fetch(input,{...init,headers:h});if(r.status===401&&(s=await refreshSession())){h.set('Authorization',`Bearer ${s.access_token}`);r=await fetch(input,{...init,headers:h})}return r}
export function signOut(){setSession(null);location.reload()}

export async function registerTeacher(email:string,password:string,data:{name:string;school:string;subjects:string}){
 const r=await fetch(URL+'/auth/v1/signup',{method:'POST',headers,body:JSON.stringify({email,password,data:{...data,requested_role:'guidance_teacher'}})});
 const d:any=await r.json();if(!r.ok)throw Error(d.msg||d.error_description||'註冊失敗，請稍後再試');
 if(d.access_token)setSession(d);return d;
}
export async function verifyEmail(email:string,code:string){
 const r=await fetch(URL+'/auth/v1/verify',{method:'POST',headers,body:JSON.stringify({email,token:code,type:'signup'})});
 const d:any=await r.json();if(!r.ok)throw Error(d.msg||'驗證失敗');setSession(d);return d;
}
