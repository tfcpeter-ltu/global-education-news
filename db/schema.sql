CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  student_name TEXT,
  nickname TEXT,
  school TEXT,
  city TEXT,
  grade TEXT,
  guardian_email TEXT,
  track TEXT DEFAULT 'cap',
  international_interest BOOLEAN DEFAULT FALSE,
  guardian_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS memberships (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  source TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  duration_days INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  provider TEXT NOT NULL DEFAULT 'newebpay',
  trade_no TEXT,
  payment_type TEXT,
  paid_at TIMESTAMPTZ,
  provider_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS payment_orders_user_id_idx ON payment_orders(user_id);
CREATE INDEX IF NOT EXISTS payment_orders_status_idx ON payment_orders(status);

CREATE TABLE IF NOT EXISTS membership_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES payment_orders(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  plan TEXT,
  previous_expires_at TIMESTAMPTZ,
  new_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO memberships (user_id, plan, status)
SELECT id, 'free', 'active' FROM users
ON CONFLICT (user_id) DO NOTHING;
