import { query } from '../../lib/db.js';
import { requireUser } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  try {
    const user = await requireUser(req, res);
    if (!user) return;
    const { rows } = await query(`
      SELECT order_no,plan,amount,status,trade_no,payment_type,paid_at,created_at,updated_at
      FROM payment_orders
      WHERE user_id=$1
      ORDER BY created_at DESC
      LIMIT 1
    `, [user.id]);
    return res.status(200).json({ ok:true, order:rows[0] || null });
  } catch (err) {
    console.error('latest order error', err);
    return res.status(500).json({ ok:false, error:'ORDER_STATUS_FAILED' });
  }
}
