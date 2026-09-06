const crypto = require('crypto');

function aesDecrypt(hex, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  decipher.setAutoPadding(true);
  return Buffer.concat([decipher.update(Buffer.from(hex, 'hex')), decipher.final()]).toString('utf8');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { NEWEBPAY_MERCHANT_ID, NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV } = process.env;
  if (!NEWEBPAY_MERCHANT_ID || !NEWEBPAY_HASH_KEY || !NEWEBPAY_HASH_IV) return res.status(503).send('CONFIG_ERROR');

  try {
    const tradeInfo = req.body && req.body.TradeInfo;
    if (!tradeInfo) return res.status(400).send('MISSING_TRADEINFO');
    const decrypted = aesDecrypt(tradeInfo, NEWEBPAY_HASH_KEY, NEWEBPAY_HASH_IV);
    const data = JSON.parse(decrypted);
    const status = data.Status;
    const result = data.Result || {};

    if (result.MerchantID && result.MerchantID !== NEWEBPAY_MERCHANT_ID) {
      return res.status(400).send('MERCHANT_MISMATCH');
    }

    // IMPORTANT: Before production, load the pending order from your database by MerchantOrderNo.
    // Verify order exists, amount matches exactly, and status has not already been paid.
    // Then update membership server-side only after status === 'SUCCESS'.
    // monthly => +30 days; annual => +365 days.
    // Also store TradeNo, PaymentType, PayTime, raw callback, and idempotency marker.

    if (status !== 'SUCCESS') return res.status(200).send('FAIL');

    // Database activation intentionally not implemented yet to avoid granting paid access
    // without a durable membership store.
    return res.status(200).send('SUCCESS');
  } catch (err) {
    console.error('NewebPay notify error', err);
    return res.status(400).send('INVALID_CALLBACK');
  }
};
