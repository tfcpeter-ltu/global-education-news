import { query } from '../../lib/db.js';
import { createSession, normalizeEmail, verifyPassword } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || '');
    const { rows } = await query('SELECT id,email,password_hash,student_name,nickname,school,city,grade,guardian_email,track FROM users WHERE email=$1 LIMIT 1', [email]);
    const user = rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ ok:false, error:'INVALID_CREDENTIALS' });
    }
    await query('DELETE FROM sessions WHERE expires_at <= NOW()');
    await createSession(user.id, res);
    const m = await query("SELECT plan,status,starts_at,expires_at FROM memberships WHERE user_id=$1", [user.id]);
    const membership = m.rows[0] || { plan:'free', status:'active', starts_at:null, expires_at:null };
    delete user.password_hash;
    return res.status(200).json({ ok:true, user:{ ...user, membershipPlan:membership.plan, membershipStatus:membership.status, startsAt:membership.starts_at, expiresAt:membership.expires_at } });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ ok:false, error:'LOGIN_FAILED' });
  }
}
