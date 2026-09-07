import { query } from '../../lib/db.js';

function appBase(){ return String(process.env.APP_BASE_URL || '').trim().replace(/\/$/,''); }

export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).send('Method Not Allowed');
  const token = String(req.query?.token || '');
  if(token){
    await query(`UPDATE payment_orders SET status='failed', updated_at=NOW() WHERE provider='paypal' AND trade_no=$1 AND status='pending'`,[token]).catch(()=>{});
  }
  return res.redirect(303,`${appBase()}/cap-ai-preview/final-v17.html#paypal-cancelled`);
}
