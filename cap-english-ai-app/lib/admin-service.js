import crypto from 'node:crypto';

// Owner designation is deployment-controlled, never supplied by the browser.
const OWNER_EMAIL = 'tfcpeter@gmail.com';
const OWNER_CREATED_BEFORE = '2026-10-14T08:00:00Z';
const INITIAL_TEST_EMAIL = 'slim2007960913@gmail.com';
export function sessionHash(req) {
  const pair = String(req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('cap_ai_session='));
  if (!pair) return null;
  try { return crypto.createHash('sha256').update(decodeURIComponent(pair.slice(15))).digest('hex'); } catch { return null; }
}
export function validChange(body) {
  const email = String(body?.email || '').trim().toLowerCase();
  const action = body?.action;
  const days = Number(body?.days);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return null;
  if (!['grant', 'revoke'].includes(action)) return null;
  if (action === 'grant' && (!Number.isInteger(days) || days < 1 || days > 365)) return null;
  return { email, action, days, reason: String(body?.reason || '').trim().slice(0, 300) };
}
export function sameOrigin(req) {
  try {
    const origin = new URL(req.headers.origin).origin;
    const host = String(req.headers.host || '').toLowerCase();
    return origin === `https://${host}` || (host.startsWith('localhost:') && origin === `http://${host}`);
  } catch { return false; }
}
export function createAdminService(pool) {
  let ready;
  async function setup() {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query("SELECT pg_advisory_xact_lock(hashtext('cap_admin_setup_v1'))");
      await client.query(`CREATE TABLE IF NOT EXISTS cap_admin_roles (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE RESTRICT,
        role TEXT NOT NULL CHECK (role='owner'), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
        CREATE TABLE IF NOT EXISTS cap_admin_audit (
        id BIGSERIAL PRIMARY KEY, actor_id UUID REFERENCES users(id) ON DELETE RESTRICT,
        target_id UUID REFERENCES users(id) ON DELETE RESTRICT, action TEXT NOT NULL,
        reason TEXT NOT NULL DEFAULT '', before_state JSONB, after_state JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
        CREATE TABLE IF NOT EXISTS cap_admin_setup (key TEXT PRIMARY KEY, result JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`);
      const applied = (await client.query("SELECT key FROM cap_admin_setup WHERE key='owner-and-first-tester-v1'")).rows.length;
      if (!applied) {
        const owner = (await client.query('SELECT id FROM users WHERE lower(email)=$1 AND created_at<$2 LIMIT 1', [OWNER_EMAIL, OWNER_CREATED_BEFORE])).rows[0];
        // Never reserve admin access for a future signup or accept a client-selected owner.
        if (!owner) throw new Error('OWNER_ACCOUNT_NOT_FOUND');
        await client.query("INSERT INTO cap_admin_roles(user_id,role) VALUES($1,'owner') ON CONFLICT(user_id) DO NOTHING", [owner.id]);
        const tester = (await client.query('SELECT id FROM users WHERE lower(email)=$1 LIMIT 1', [INITIAL_TEST_EMAIL])).rows[0];
        let testerState = 'account_not_found';
        if (tester) {
          await client.query('SELECT id FROM users WHERE id=$1 FOR UPDATE', [tester.id]);
          const before = (await client.query('SELECT * FROM memberships WHERE user_id=$1 FOR UPDATE', [tester.id])).rows[0] || null;
          if (before?.plan === 'complete' && before.status === 'active' && (!before.expires_at || new Date(before.expires_at) > new Date())) {
            testerState = 'existing_complete_preserved';
          } else {
            const after = (await client.query(`INSERT INTO memberships(user_id,plan,status,starts_at,expires_at,source,updated_at)
              VALUES($1,'complete','active',NOW(),NOW()+INTERVAL '30 days','admin_test',NOW())
              ON CONFLICT(user_id) DO UPDATE SET plan='complete',status='active',starts_at=NOW(),expires_at=NOW()+INTERVAL '30 days',source='admin_test',updated_at=NOW() RETURNING *`, [tester.id])).rows[0];
            await client.query(`INSERT INTO cap_admin_audit(actor_id,target_id,action,reason,before_state,after_state) VALUES($1,$2,'grant','使用者指定：首次免費測試 30 天',$3,$4)`, [owner.id, tester.id, before, after]);
            testerState = 'granted_30_days';
          }
        }
        await client.query("INSERT INTO cap_admin_setup(key,result) VALUES('owner-and-first-tester-v1',$1)", [{ ownerBound: true, testerState }]);
      }
      await client.query('COMMIT');
    } catch (e) { await client.query('ROLLBACK').catch(() => {}); throw e; }
    finally { client.release(); }
  }
  async function ensureSetup() {
    if (!ready) ready = setup().catch(e => { ready = null; throw e; });
    return ready;
  }
  async function admin(req) {
    const hash = sessionHash(req);
    if (!hash) return null;
    return (await pool.query(`SELECT u.id,u.email,u.student_name,r.role FROM sessions s
      JOIN users u ON u.id=s.user_id JOIN cap_admin_roles r ON r.user_id=u.id
      WHERE s.token_hash=$1 AND s.expires_at>NOW() LIMIT 1`, [hash])).rows[0] || null;
  }
  async function change(actor, input) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const target = (await client.query('SELECT id,email FROM users WHERE lower(email)=$1 FOR UPDATE', [input.email])).rows[0];
      if (!target) { await client.query('ROLLBACK'); return { status: 404, error: 'ACCOUNT_NOT_FOUND' }; }
      const before = (await client.query('SELECT * FROM memberships WHERE user_id=$1 FOR UPDATE', [target.id])).rows[0] || null;
      const active = before?.plan === 'complete' && before.status === 'active' && (!before.expires_at || new Date(before.expires_at) > new Date());
      if (active && before.source !== 'admin_test') {
        await client.query('ROLLBACK'); return { status: 409, error: 'EXISTING_MEMBERSHIP_PROTECTED' };
      }
      if (input.action === 'revoke' && before?.source !== 'admin_test') {
        await client.query('ROLLBACK'); return { status: 409, error: 'NOT_TEST_MEMBERSHIP' };
      }
      let after;
      if (input.action === 'grant') {
        after = (await client.query(`INSERT INTO memberships(user_id,plan,status,starts_at,expires_at,source,updated_at)
          VALUES($1,'complete','active',NOW(),NOW()+make_interval(days=>$2),'admin_test',NOW())
          ON CONFLICT(user_id) DO UPDATE SET plan='complete',status='active',
          starts_at=CASE WHEN memberships.source='admin_test' AND memberships.expires_at>NOW() THEN memberships.starts_at ELSE NOW() END,
          expires_at=CASE WHEN memberships.source='admin_test' AND memberships.status='active' THEN GREATEST(COALESCE(memberships.expires_at,NOW()),NOW()) ELSE NOW() END+make_interval(days=>$2),source='admin_test',updated_at=NOW() RETURNING *`, [target.id, input.days])).rows[0];
      } else {
        after = (await client.query("UPDATE memberships SET plan='free',status='active',expires_at=NOW(),source='admin_test_revoked',updated_at=NOW() WHERE user_id=$1 RETURNING *", [target.id])).rows[0];
      }
      await client.query('INSERT INTO cap_admin_audit(actor_id,target_id,action,reason,before_state,after_state) VALUES($1,$2,$3,$4,$5,$6)', [actor.id, target.id, input.action, input.reason, before, after]);
      await client.query('COMMIT');
      return { status: 200, email: target.email, membership: after };
    } catch (e) { await client.query('ROLLBACK').catch(() => {}); throw e; }
    finally { client.release(); }
  }
  return { ensureSetup, admin, change,
    async list(search = '', offset = 0) {
      const pattern = `%${search.replace(/[\\%_]/g, '\\$&')}%`;
      return (await pool.query(`SELECT u.id,u.email,u.student_name,u.created_at,
        COALESCE(m.plan,'free') plan,COALESCE(m.status,'active') status,m.source,m.expires_at,
        (m.plan='complete' AND m.status='active' AND (m.expires_at IS NULL OR m.expires_at>NOW())) effective_complete,
        EXISTS(SELECT 1 FROM cap_admin_roles r WHERE r.user_id=u.id) is_admin
        FROM users u LEFT JOIN memberships m ON m.user_id=u.id WHERE u.email ILIKE $1 OR u.student_name ILIKE $1
        ORDER BY u.created_at DESC,u.id LIMIT 51 OFFSET $2`, [pattern, offset])).rows;
    },
    async audit() {
      return (await pool.query(`SELECT a.id,a.action,a.reason,a.created_at,a.before_state,a.after_state,u.email target_email,
        actor.email actor_email FROM cap_admin_audit a LEFT JOIN users u ON u.id=a.target_id
        LEFT JOIN users actor ON actor.id=a.actor_id ORDER BY a.id DESC LIMIT 50`)).rows;
    }
  };
}
