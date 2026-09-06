import crypto from 'crypto';
import { getPool } from '../../lib/db.js';

function aesDecrypt(hex, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
  decipher.setAutoPadding(true);
  return Buffer.concat([decipher.update(Buffer.from(hex, 'hex')), decipher.final()]).toString('utf8');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex').toUpperCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { NEWEBPAY_MERCHANT_ID, NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV } = process.env;
  if (!NEWEBPAY_MERCHANT_ID || !NEWEBPAY_HASH_KEY || !NEWEBPAY_HASH_IV || !process.env.DATABASE_URL) {
    return res.status(503).send('CONFIG_ERROR');
  }

  const tradeInfo = req.body?.TradeInfo;
  const tradeSha = String(req.body?.TradeSha || '').toUpperCase();
  if (!tradeInfo || !tradeSha) return res.status(400).send('MISSING_PAYMENT_DATA');

  const expectedSha = sha256(`HashKey=${NEWEBPAY_HASH_KEY}&${tradeInfo}&HashIV=${NEWEBPAY_HASH_IV}`);
  if (tradeSha !== expectedSha) return res.status(400).send('INVALID_TRADESHA');

  let data;
  try {
    data = JSON.parse(aesDecrypt(tradeInfo, NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV));
  } catch (err) {
    console.error('NewebPay decrypt error', err);
    return res.status(400).send('INVALID_CALLBACK');
  }

  const status = data.Status;
  const result = data.Result || {};
  const orderNo = String(result.MerchantOrderNo || '');
  const paidAmount = Number(result.Amt);
  if (!orderNo) return res.status(400).send('MISSING_ORDER_NO');
  if (result.MerchantID && result.MerchantID !== NEWEBPAY_MERCHANT_ID) return res.status(400).send('MERCHANT_MISMATCH');

  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query('SELECT * FROM payment_orders WHERE order_no=$1 FOR UPDATE', [orderNo]);
    const order = orderResult.rows[0];
    if (!order) {
      await client.query('ROLLBACK');
      return res.status(404).send('ORDER_NOT_FOUND');
    }

    if (Number(order.amount) !== paidAmount) {
      await client.query("UPDATE payment_orders SET status='amount_mismatch', provider_payload=$2, updated_at=NOW() WHERE id=$1", [order.id, data]);
      await client.query('COMMIT');
      return res.status(400).send('AMOUNT_MISMATCH');
    }

    if (order.status === 'paid') {
      await client.query('COMMIT');
      return res.status(200).send('SUCCESS');
    }

    if (status !== 'SUCCESS') {
      await client.query("UPDATE payment_orders SET status='failed', provider_payload=$2, updated_at=NOW() WHERE id=$1", [order.id, data]);
      await client.query('COMMIT');
      return res.status(200).send('SUCCESS');
    }

    const oldMembership = await client.query('SELECT * FROM memberships WHERE user_id=$1 FOR UPDATE', [order.user_id]);
    const previousExpires = oldMembership.rows[0]?.expires_at || null;
    const expiryResult = await client.query(`
      SELECT GREATEST(COALESCE($1::timestamptz, NOW()), NOW()) + ($2::text || ' days')::interval AS new_expiry
    `, [previousExpires, order.duration_days]);
    const newExpiry = expiryResult.rows[0].new_expiry;
    const startsAt = previousExpires && new Date(previousExpires) > new Date() ? oldMembership.rows[0]?.starts_at || new Date() : new Date();

    await client.query(`
      INSERT INTO memberships (user_id,plan,status,starts_at,expires_at,source,updated_at)
      VALUES ($1,'complete','active',$2,$3,'newebpay',NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        plan='complete', status='active', starts_at=$2, expires_at=$3, source='newebpay', updated_at=NOW()
    `, [order.user_id, startsAt, newExpiry]);

    await client.query(`
      UPDATE payment_orders
      SET status='paid', trade_no=$2, payment_type=$3, paid_at=COALESCE($4::timestamptz,NOW()), provider_payload=$5, updated_at=NOW()
      WHERE id=$1
    `, [
      order.id,
      result.TradeNo || null,
      result.PaymentType || null,
      result.PayTime || null,
      data
    ]);

    await client.query(`
      INSERT INTO membership_events (user_id,order_id,event_type,plan,previous_expires_at,new_expires_at)
      VALUES ($1,$2,'payment_activated',$3,$4,$5)
    `, [order.user_id, order.id, order.plan, previousExpires, newExpiry]);

    await client.query('COMMIT');
    return res.status(200).send('SUCCESS');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('NewebPay notify transaction error', err);
    return res.status(500).send('DB_ERROR');
  } finally {
    client.release();
  }
}
