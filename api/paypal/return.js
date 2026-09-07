import { getPool } from '../../lib/db.js';
import { paypalRequest } from '../../lib/paypal.js';

function appBase(){ return String(process.env.APP_BASE_URL || '').trim().replace(/\/$/,''); }

export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).send('Method Not Allowed');
  const token = String(req.query?.token || '');
  if(!token) return res.status(400).send('MISSING_PAYPAL_ORDER');
  const client = await getPool().connect();
  try{
    await client.query('BEGIN');
    const orderResult = await client.query(`SELECT * FROM payment_orders WHERE provider='paypal' AND trade_no=$1 FOR UPDATE`,[token]);
    const order = orderResult.rows[0];
    if(!order){ await client.query('ROLLBACK'); return res.status(404).send('ORDER_NOT_FOUND'); }
    if(order.status==='paid'){
      await client.query('COMMIT');
      return res.redirect(303,`${appBase()}/cap-ai-preview/final-v17.html#paypal-success`);
    }

    const capture = await paypalRequest(`/v2/checkout/orders/${encodeURIComponent(token)}/capture`,{method:'POST',body:'{}'});
    const cap = capture?.purchase_units?.[0]?.payments?.captures?.[0];
    const paidAmount = Number(cap?.amount?.value);
    const currency = cap?.amount?.currency_code;
    if(capture.status!=='COMPLETED' || cap?.status!=='COMPLETED'){
      await client.query(`UPDATE payment_orders SET status='failed', provider_payload=$2, updated_at=NOW() WHERE id=$1`,[order.id,capture]);
      await client.query('COMMIT');
      return res.redirect(303,`${appBase()}/cap-ai-preview/final-v17.html#paypal-failed`);
    }
    if(currency!=='TWD' || Number(order.amount)!==paidAmount){
      await client.query(`UPDATE payment_orders SET status='amount_mismatch', provider_payload=$2, updated_at=NOW() WHERE id=$1`,[order.id,capture]);
      await client.query('COMMIT');
      return res.redirect(303,`${appBase()}/cap-ai-preview/final-v17.html#paypal-amount-mismatch`);
    }

    const oldMembership = await client.query('SELECT * FROM memberships WHERE user_id=$1 FOR UPDATE',[order.user_id]);
    const previousExpires = oldMembership.rows[0]?.expires_at || null;
    const expiryResult = await client.query(`SELECT GREATEST(COALESCE($1::timestamptz,NOW()),NOW()) + ($2::text || ' days')::interval AS new_expiry`,[previousExpires,order.duration_days]);
    const newExpiry = expiryResult.rows[0].new_expiry;
    const startsAt = previousExpires && new Date(previousExpires)>new Date() ? oldMembership.rows[0]?.starts_at || new Date() : new Date();

    await client.query(`
      INSERT INTO memberships (user_id,plan,status,starts_at,expires_at,source,updated_at)
      VALUES ($1,'complete','active',$2,$3,'paypal',NOW())
      ON CONFLICT (user_id) DO UPDATE SET plan='complete',status='active',starts_at=$2,expires_at=$3,source='paypal',updated_at=NOW()
    `,[order.user_id,startsAt,newExpiry]);

    await client.query(`
      UPDATE payment_orders SET status='paid',payment_type='paypal',paid_at=NOW(),provider_payload=$2,updated_at=NOW() WHERE id=$1
    `,[order.id,capture]);

    await client.query(`
      INSERT INTO membership_events (user_id,order_id,event_type,plan,previous_expires_at,new_expires_at)
      VALUES ($1,$2,'payment_activated',$3,$4,$5)
    `,[order.user_id,order.id,order.plan,previousExpires,newExpiry]);

    await client.query('COMMIT');
    return res.redirect(303,`${appBase()}/cap-ai-preview/final-v17.html#paypal-success`);
  }catch(err){
    await client.query('ROLLBACK').catch(()=>{});
    console.error('PayPal return error',err);
    return res.status(500).send('PAYPAL_CAPTURE_FAILED');
  }finally{
    client.release();
  }
}
