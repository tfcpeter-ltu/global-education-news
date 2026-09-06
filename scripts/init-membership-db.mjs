import fs from 'node:fs/promises';
import pg from 'pg';

const { Client } = pg;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not configured.');
  process.exit(1);
}

const sql = await fs.readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized:false } : undefined
});

try {
  await client.connect();
  await client.query(sql);
  const { rows } = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
      AND table_name = ANY($1::text[])
    ORDER BY table_name
  `, [['users','sessions','memberships','payment_orders','membership_events']]);
  console.log('Membership database initialized.');
  console.log('Tables:', rows.map(r=>r.table_name).join(', '));
} finally {
  await client.end().catch(()=>{});
}
