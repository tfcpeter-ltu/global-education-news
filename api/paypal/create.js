import crypto from 'crypto';
import { query } from '../../lib/db.js';
import { requireUser } from '../../lib/auth.js';
import { paypalRequest, paypalConfig } from '../../lib/paypal.js';

function clean(name){ return String(process.env[name] || '').trim(); }

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).send('Method Not Allowed');
  if(!process.env.DATABASE_URL) return res.status(503).json({ok:false,error:'DATABASE_NOT_CONFIGURED'});
  const cfg = paypalConfig();
  if(!cfg.configured) return res.status(503).json({ok:false,error:'PAYPAL_NOT_CONFIGURED'});
  const appBase = clean('APP_BASE_URL');
  if(!appBase) return res.status(503).json({ok:false,error:'APP_BASE_URL_NOT_CONFIGURED'});

  const user = await requireUser(req,res);
  if(!user) return;

  const plan = String(req.body?.plan || '').toLowerCase();
  const plans = {
    monthly:{ amount:1500, days:30, item:'AI Complete 月繳 30 天' },
    annual:{ amount:15000, days:365, item:'AI Complete 年繳 365 天' }
  };
  const selected = plans[plan];
  if(!selected) return res.status(400).json({ok:false,error:'INVALID_PLAN'});

  const localOrderNo = `PP_${plan==='annual'?'Y':'M'}_${Math.floor(Date.now()/1000)}_${crypto.randomBytes(3).toString('hex')}`.slice(0,30);
  const base = appBase.replace(/\/$/,'');

  try{
    const local = await query(`
      INSERT INTO payment_orders (order_no,user_id,plan,amount,duration_days,status,provider)
      VALUES ($1,$2,$3,$4,$5,'pending','paypal')
      RETURNING id
    `,[localOrderNo,user.id,plan,selected.amount,selected.days]);

    const order = await paypalRequest('/v2/checkout/orders',{
      method:'POST',
      headers:{'PayPal-Request-Id':localOrderNo},
      body:JSON.stringify({
        intent:'CAPTURE',
        purchase_units:[{
          reference_id:localOrderNo,
          custom_id:localOrderNo,
          description:selected.item,
          amount:{currency_code:'TWD',value:String(selected.amount)}
        }],
        application_context:{
          brand_name:'LTU Education Center',
          locale:'zh-TW',
          user_action:'PAY_NOW',
          return_url:`${base}/api/paypal/return`,
          cancel_url:`${base}/api/paypal/cancel`
        }
      })
    });

    await query(`UPDATE payment_orders SET trade_no=$2, provider_payload=$3, updated_at=NOW() WHERE id=$1`,[
      local.rows[0].id, order.id, order
    ]);

    const approve = Array.isArray(order.links) ? order.links.find(x=>x.rel==='approve')?.href : null;
    if(!approve) return res.status(502).json({ok:false,error:'PAYPAL_APPROVAL_URL_MISSING'});
    return res.redirect(303,approve);
  }catch(err){
    console.error('PayPal create error',err);
    return res.status(500).json({ok:false,error:err.message||'PAYPAL_CREATE_FAILED'});
  }
}
