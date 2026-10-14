import pg from 'pg';
import { createAdminService, sameOrigin, validChange } from '../lib/admin-service.js';
let service;
export function createHandler(getService) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const route = String(req.query.adminRoute || 'me');
    if (!['GET','POST'].includes(req.method)) return res.status(405).json({ok:false,error:'METHOD_NOT_ALLOWED'});
    if (req.method === 'POST' && (!sameOrigin(req) || !String(req.headers['content-type'] || '').startsWith('application/json'))) return res.status(403).json({ok:false,error:'INVALID_ORIGIN'});
    try {
      const svc = getService();
      await svc.ensureSetup();
      const actor = await svc.admin(req);
      if (!actor) return res.status(403).json({ok:false,error:'ADMIN_REQUIRED'});
      if (route === 'me' && req.method === 'GET') return res.json({ok:true,user:{email:actor.email,name:actor.student_name,role:actor.role}});
      if (route === 'members' && req.method === 'GET') {
        const offset = Math.max(0, Math.min(100000, Math.floor(Number(req.query.offset) || 0)));
        const rows = await svc.list(String(req.query.search || '').trim().slice(0,100),offset);
        return res.json({ok:true,members:rows.slice(0,50),hasMore:rows.length>50,offset});
      }
      if (route === 'audit' && req.method === 'GET') return res.json({ok:true,events:await svc.audit()});
      if (route === 'membership' && req.method === 'POST') {
        const input = validChange(req.body);
        if (!input) return res.status(400).json({ok:false,error:'INVALID_INPUT'});
        const result = await svc.change(actor,input);
        return res.status(result.status).json({ok:result.status===200,...result});
      }
      return res.status(404).json({ok:false,error:'NOT_FOUND'});
    } catch (e) {
      console.error('CAP admin failure', e.code || e.message);
      return res.status(503).json({ok:false,error:e.message==='OWNER_ACCOUNT_NOT_FOUND'?'OWNER_ACCOUNT_NOT_FOUND':'ADMIN_UNAVAILABLE'});
    }
  };
}
export default createHandler(() => {
  if (!service) service=createAdminService(new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:3,connectionTimeoutMillis:8000}));
  return service;
});
