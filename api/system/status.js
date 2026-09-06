import { query } from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });

  const config = {
    database: Boolean(process.env.DATABASE_URL),
    merchantId: Boolean(process.env.NEWEBPAY_MERCHANT_ID),
    hashKey: Boolean(process.env.NEWEBPAY_HASH_KEY),
    hashIv: Boolean(process.env.NEWEBPAY_HASH_IV),
    appBaseUrl: Boolean(process.env.APP_BASE_URL),
    mode: process.env.NEWEBPAY_MODE || 'test'
  };

  let databaseConnected = false;
  let schemaReady = false;
  let databaseError = null;

  if (config.database) {
    try {
      await query('SELECT 1');
      databaseConnected = true;
      const result = await query(`
        SELECT COUNT(*)::int AS count
        FROM information_schema.tables
        WHERE table_schema='public'
          AND table_name = ANY($1::text[])
      `, [['users','sessions','memberships','payment_orders','membership_events']]);
      schemaReady = Number(result.rows[0]?.count || 0) === 5;
    } catch (err) {
      databaseError = 'DATABASE_UNAVAILABLE';
    }
  }

  const paymentConfigured = config.merchantId && config.hashKey && config.hashIv && config.appBaseUrl;
  return res.status(200).json({
    ok: true,
    ready: databaseConnected && schemaReady && paymentConfigured,
    databaseConnected,
    schemaReady,
    paymentConfigured,
    paymentMode: config.mode,
    checks: {
      DATABASE_URL: config.database,
      NEWEBPAY_MERCHANT_ID: config.merchantId,
      NEWEBPAY_HASH_KEY: config.hashKey,
      NEWEBPAY_HASH_IV: config.hashIv,
      APP_BASE_URL: config.appBaseUrl
    },
    error: databaseError
  });
}
