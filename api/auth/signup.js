import { query } from '../../lib/db.js';
import { createSession, hashPassword, normalizeEmail } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'METHOD_NOT_ALLOWED' });
  try {
    const body = req.body || {};
    const email = normalizeEmail(body.email);
    const password = String(body.password || '');
    const studentName = String(body.studentName || '').trim();
    if (!email || !email.includes('@')) return res.status(400).json({ ok:false, error:'INVALID_EMAIL' });
    if (password.length < 8) return res.status(400).json({ ok:false, error:'PASSWORD_TOO_SHORT' });
    if (!studentName) return res.status(400).json({ ok:false, error:'STUDENT_NAME_REQUIRED' });

    const passwordHash = hashPassword(password);
    const { rows } = await query(`
      INSERT INTO users (email,password_hash,student_name,nickname,school,city,grade,guardian_email,track,international_interest,guardian_consent)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id,email,student_name,nickname,school,city,grade,guardian_email,track
    `, [
      email, passwordHash, studentName,
      String(body.nickname || '').trim() || null,
      String(body.school || '').trim() || null,
      String(body.city || '').trim() || null,
      String(body.grade || '').trim() || null,
      normalizeEmail(body.guardianEmail) || null,
      String(body.track || 'cap'),
      Boolean(body.internationalInterest),
      Boolean(body.guardianConsent)
    ]);

    const user = rows[0];
    await query("INSERT INTO memberships (user_id,plan,status) VALUES ($1,'free','active') ON CONFLICT (user_id) DO NOTHING", [user.id]);
    await createSession(user.id, res);
    return res.status(201).json({ ok:true, user:{ ...user, membershipPlan:'free', membershipStatus:'active' } });
  } catch (err) {
    if (err && err.code === '23505') return res.status(409).json({ ok:false, error:'EMAIL_ALREADY_REGISTERED' });
    console.error('signup error', err);
    return res.status(500).json({ ok:false, error:'SIGNUP_FAILED' });
  }
}
