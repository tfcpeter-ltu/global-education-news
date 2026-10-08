const URL=process.env.NEXT_PUBLIC_SUPABASE_URL||'https://amaslsruxvgwpruykhmp.supabase.co';
const KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_pt7RTkDPNp9SN1coiDoPnQ_pOVVkHOV';
export function token(req:Request){const value=req.headers.get('authorization')||'';return value.startsWith('Bearer ')?value.slice(7):''}
export async function user(req:Request){const access=token(req);if(!access)return null;const r=await fetch(URL+'/auth/v1/user',{headers:{apikey:KEY,Authorization:`Bearer ${access}`},cache:'no-store'});return r.ok?r.json():null}
export async function rest(req:Request,path:string,init:RequestInit={}){const access=token(req);const headers=new Headers(init.headers);headers.set('apikey',KEY);headers.set('Authorization',`Bearer ${access}`);headers.set('Content-Type','application/json');return fetch(URL+'/rest/v1/'+path,{...init,headers,cache:'no-store'})}
export function runtime(){return process.env as Record<string,string>}
