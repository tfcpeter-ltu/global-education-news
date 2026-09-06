import crypto from 'crypto';
import { query } from './db.js';

const COOKIE_NAME = 'cap_ai_session';
const SESSION_DAYS = 30;

export function normalizeEmail(value = '') {
  return String(value).trim().toLowerCase();
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const derived = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password, stored = '') {
  const [salt, expected] = String(stored).split(':');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(String(password), salt, 64);
  const expectedBuf = Buffer.from(expected, 'hex');
  return expectedBuf.length === actual.length && crypto.timingSafeEqual(expectedBuf, actual);
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function parseCookies(req) {
  const raw = req.headers.cookie || '';
  return Object.fromEntries(raw.split(';').map(v => v.trim()).filter(Boolean).map(pair => {
    const i = pair.indexOf('=');
    return [decodeURIComponent(i < 0 ? pair : pair.slice(0, i)), decodeURIComponent(i < 0 ? '' : pair.slice(i + 1))];
  }));
}

export async function createSession(userId, res) {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await query('INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1,$2,$3)', [userId, tokenHash, expiresAt]);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure}`);
  return expiresAt;
}

export async function clearSession(req, res) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (token) {
    await query('DELETE FROM sessions WHERE token_hash=$1', [hashToken(token)]).catch(() => {});
  }
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
}

export async function getCurrentUser(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return null;
  const { rows } = await query(`
    SELECT u.id, u.email, u.student_name, u.nickname, u.school, u.city, u.grade,
           u.guardian_email, u.track, u.international_interest, u.guardian_consent,
           COALESCE(m.plan,'free') AS membership_plan,
           COALESCE(m.status,'active') AS membership_status,
           m.starts_at, m.expires_at
    FROM sessions s
    JOIN users u ON u.id=s.user_id
    LEFT JOIN memberships m ON m.user_id=u.id
    WHERE s.token_hash=$1 AND s.expires_at > NOW()
    LIMIT 1
  `, [hashToken(token)]);
  const user = rows[0] || null;
  if (user && user.membership_plan === 'complete' && user.expires_at && new Date(user.expires_at) <= new Date()) {
    await query("UPDATE memberships SET plan='free', status='expired', updated_at=NOW() WHERE user_id=$1", [user.id]);
    user.membership_plan = 'free';
    user.membership_status = 'expired';
  }
  return user;
}

export async function requireUser(req, res) {
  const user = await getCurrentUser(req);
  if (!user) {
    res.status(401).json({ ok:false, error:'AUTH_REQUIRED' });
    return null;
  }
  return user;
}
