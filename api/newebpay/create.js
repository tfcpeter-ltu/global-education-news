import crypto from 'crypto';
import { query } from '../../lib/db.js';
import { requireUser } from '../../lib/auth.js';

function aesEncrypt(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('hex');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex').toUpperCase();
}

function htmlEscape(v='') {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function cleanEnv(name) {
  return String(process.env[name] || '').trim();
}

const MPG_VERSION = '2.0';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const NEWEBPAY_MERCHANT_ID = cleanEnv('NEWEBPAY_MERCHANT_ID');
  const NEWEBPAY_HASH_KEY = cleanEnv('NEWEBPAY_HASH_KEY');
  const NEWEBPAY_HASH_IV = cleanEnv('NEWEBPAY_HASH_IV');
  const APP_BASE_URL = cleanEnv('APP_BASE_URL');
  const NEWEBPAY_MODE = cleanEnv('NEWEBPAY_MODE').toLowerCase();

  if (!NEWEBPAY_MERCHANT_ID || !NEWEBPAY_HASH_KEY || !NEWEBPAY_HASH_IV || !APP_BASE_URL || !process.env.DATABASE_URL) {
    return res.status(503).json({ ok:false, error:'PAYMENT_NOT_CONFIGURED' });
  }

  if (NEWEBPAY_HASH_KEY.length !== 32 || NEWEBPAY_HASH_IV.length !== 16) {
    return res.status(503).json({ ok:false, error:'INVALID_NEWEBPAY_KEY_LENGTH' });
  }

  const user = await requireUser(req, res);
  if (!user) return;

  const plan = String(req.body?.plan || '').toLowerCase();
  const plans = {
    monthly: { amount:1500, days:30, item:'AI Complete 月繳 30 天' },
    annual:  { amount:15000, days:365, item:'AI Complete 年繳 365 天' }
  };
  const selected = plans[plan];
  if (!selected) return res.status(400).json({ ok:false, error:'INVALID_PLAN' });

  const stamp = Math.floor(Date.now()/1000);
  const orderNo = `AIC_${plan === 'annual' ? 'Y' : 'M'}_${stamp}_${crypto.randomBytes(3).toString('hex')}`.slice(0,30);
  const base = APP_BASE_URL.replace(/\/$/, '');

  try {
    await query(`
      INSERT INTO payment_orders (order_no,user_id,plan,amount,duration_days,status,provider)
      VALUES ($1,$2,$3,$4,$5,'pending','newebpay')
    `, [orderNo, user.id, plan, selected.amount, selected.days]);

    const params = new URLSearchParams({
      MerchantID: NEWEBPAY_MERCHANT_ID,
      RespondType: 'JSON',
      TimeStamp: String(stamp),
      Version: MPG_VERSION,
      MerchantOrderNo: orderNo,
      Amt: String(selected.amount),
      ItemDesc: selected.item,
      LoginType: '0',
      ReturnURL: `${base}/api/newebpay/return`,
      NotifyURL: `${base}/api/newebpay/notify`,
      ClientBackURL: `${base}/cap-ai-preview/final-v17.html#upgradeV16`,
      CREDIT: '1',
      WEBATM: '1',
      VACC: '1',
      Email: user.email
    });

    const tradeInfo = aesEncrypt(params.toString(), NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV);
    const tradeSha = sha256(`HashKey=${NEWEBPAY_HASH_KEY}&${tradeInfo}&HashIV=${NEWEBPAY_HASH_IV}`);
    const gateway = NEWEBPAY_MODE === 'production'
      ? 'https://core.newebpay.com/MPG/mpg_gateway'
      : 'https://ccore.newebpay.com/MPG/mpg_gateway';

    console.log('NewebPay checkout prepared', {
      mode: NEWEBPAY_MODE || 'test',
      version: MPG_VERSION,
      gateway,
      merchantIdLength: NEWEBPAY_MERCHANT_ID.length,
      merchantIdMasked: NEWEBPAY_MERCHANT_ID.length > 6
        ? `${NEWEBPAY_MERCHANT_ID.slice(0,3)}***${NEWEBPAY_MERCHANT_ID.slice(-3)}`
        : '***',
      orderNo,
      amount: selected.amount
    });

    res.setHeader('Content-Type','text/html; charset=utf-8');
    return res.status(200).send(`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>前往安全付款</title></head><body><p>正在前往藍新金流安全付款頁…</p><form id="pay" method="POST" action="${gateway}">
      <input type="hidden" name="MerchantID" value="${htmlEscape(NEWEBPAY_MERCHANT_ID)}">
      <input type="hidden" name="TradeInfo" value="${htmlEscape(tradeInfo)}">
      <input type="hidden" name="TradeSha" value="${htmlEscape(tradeSha)}">
      <input type="hidden" name="Version" value="${MPG_VERSION}">
    </form><script>document.getElementById('pay').submit()</script></body></html>`);
  } catch (err) {
    console.error('NewebPay create error', err);
    return res.status(500).json({ ok:false, error:'ORDER_CREATE_FAILED' });
  }
}
