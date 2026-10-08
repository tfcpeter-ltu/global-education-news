"use client";
import {useEffect,useState} from 'react';
import {apiFetch} from '@/lib/supabase-client';
import {Button} from '@/components/ui/button';
export default function TeacherReview(){
 const [rows,setRows]=useState<any[]>([]),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function load(){setError('');try{const r=await apiFetch('/api/teachers');const d:any=await r.json();if(!r.ok)throw Error(d.error);setRows(d.teachers)}catch(e:any){setError(e.message)}}
 useEffect(()=>{load()},[]);
 async function review(user_id:string,status:string){setBusy(true);setError('');try{const r=await apiFetch('/api/teachers',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id,status})});const d:any=await r.json();if(!r.ok)throw Error(d.error);await load()}catch(e:any){setError(e.message)}finally{setBusy(false)}}
 return <section className="panel"><h2>老師註冊審核</h2><p>核准後可使用升學輔導工作台；老師無法審核其他帳號。</p>{error&&<p role="alert">{error}</p>}{!rows.length&&<p>目前沒有老師註冊申請。</p>}{rows.map(r=><div className="teacher-row" key={r.user_id}><div><strong>{r.name}</strong><p>{r.email}</p><p>{r.school} ／ {r.subjects}</p><small>申請日期：{new Date(r.created_at).toLocaleDateString('zh-TW')} ／ {r.status==='approved'?'已核准':r.status==='rejected'?'未核准':'待審核'}</small></div><div><Button disabled={busy||r.status==='approved'} onClick={()=>review(r.user_id,'approved')}>核准</Button><Button variant="outline" disabled={busy||r.status==='rejected'} onClick={()=>review(r.user_id,'rejected')}>{r.status==='approved'?'停用教師權限':'不核准'}</Button></div></div>)}</section>
}
