import { clearSession } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  try {
    await clearSession(req, res);
    return res.status(200).json({ ok:true });
  } catch (err) {
    console.error('logout error', err);
    return res.status(500).json({ ok:false, error:'LOGOUT_FAILED' });
  }
}
