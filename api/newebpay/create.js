const crypto = require('crypto');

function aesEncrypt(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('hex');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex').toUpperCase();
}

function htmlEscape(v='') {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  const { NEWEBPAY_MERCHANT_ID, NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV, APP_BASE_URL, NEWEBPAY_MODE } = process.env;
  if (!NEWEBPAY_MERCHANT_ID || !NEWEBPAY_HASH_KEY || !NEWEBPAY_HASH_IV || !APP_BASE_URL) {
    return res.status(503).json({ ok:false, error:'PAYMENT_NOT_CONFIGURED' });
  }

  const plan = String((req.body && req.body.plan) || req.query.plan || '').toLowerCase();
  const email = String((req.body && req.body.email) || req.query.email || '').trim();
  const plans = {
    monthly: { amount: 999, days: 30, item: 'AI Complete 月繳 30 天' },
    annual:  { amount: 9999, days: 365, item: 'AI Complete 年繳 365 天' }
  };
  const selected = plans[plan];
  if (!selected) return res.status(400).json({ ok:false, error:'INVALID_PLAN' });

  const stamp = Math.floor(Date.now()/1000);
  const orderNo = `AIC_${plan === 'annual' ? 'Y' : 'M'}_${stamp}_${crypto.randomBytes(3).toString('hex')}`.slice(0,30);
  const base = APP_BASE_URL.replace(/\/$/, '');
  const params = new URLSearchParams({
    MerchantID: NEWEBPAY_MERCHANT_ID,
    RespondType: 'JSON',
    TimeStamp: String(stamp),
    Version: '2.3',
    MerchantOrderNo: orderNo,
    Amt: String(selected.amount),
    ItemDesc: selected.item,
    LoginType: '0',
    ReturnURL: `${base}/api/newebpay/return`,
    NotifyURL: `${base}/api/newebpay/notify`,
    ClientBackURL: `${base}/cap-ai-preview/final-v15.html#upgradeV15`,
    CREDIT: '1',
    WEBATM: '1',
    VACC: '1'
  });
  if (email) params.set('Email', email);

  const tradeInfo = aesEncrypt(params.toString(), NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV);
  const tradeSha = sha256(`HashKey=${NEWEBPAY_HASH_KEY}&${tradeInfo}&HashIV=${NEWEBPAY_HASH_IV}`);
  const gateway = NEWEBPAY_MODE === 'production'
    ? 'https://core.newebpay.com/MPG/mpg_gateway'
    : 'https://ccore.newebpay.com/MPG/mpg_gateway';

  // NOTE: Before production, persist a pending order in your database here:
  // orderNo, userId/email, plan, amount, status='pending'.

  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html><body><form id="pay" method="POST" action="${gateway}">
    <input type="hidden" name="MerchantID" value="${htmlEscape(NEWEBPAY_MERCHANT_ID)}">
    <input type="hidden" name="TradeInfo" value="${htmlEscape(tradeInfo)}">
    <input type="hidden" name="TradeSha" value="${htmlEscape(tradeSha)}">
    <input type="hidden" name="Version" value="2.3">
  </form><script>document.getElementById('pay').submit()</script></body></html>`);
};
