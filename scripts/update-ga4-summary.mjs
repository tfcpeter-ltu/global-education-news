import fs from 'node:fs';
import crypto from 'node:crypto';

const propertyId = process.env.GA4_PROPERTY_ID;
const serviceAccountRaw = process.env.GA4_SERVICE_ACCOUNT_JSON;
const outputPath = 'public/data/analytics-summary.json';

if (!propertyId || !serviceAccountRaw) {
  console.log('GA4 credentials are not configured; skipping readership update.');
  process.exit(0);
}

const serviceAccount = JSON.parse(serviceAccountRaw);
const b64url = (input) => Buffer.from(input).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
const payload = b64url(JSON.stringify({
  iss: serviceAccount.client_email,
  scope: 'https://www.googleapis.com/auth/analytics.readonly',
  aud: 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: now + 3600
}));
const unsignedJwt = `${header}.${payload}`;
const signature = crypto.sign('RSA-SHA256', Buffer.from(unsignedJwt), serviceAccount.private_key).toString('base64url');
const assertion = `${unsignedJwt}.${signature}`;

const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion })
});
if (!tokenResponse.ok) throw new Error(`OAuth token request failed: ${tokenResponse.status}`);
const { access_token: accessToken } = await tokenResponse.json();
const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

async function runReport(body) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GA4 Data API failed (${response.status}): ${text.slice(0, 500)}`);
  }
  return response.json();
}

const dateRanges = [{ startDate: '6daysAgo', endDate: 'today' }];

const articleReport = await runReport({
  dateRanges,
  dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
  metrics: [{ name: 'screenPageViews' }],
  dimensionFilter: { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/news/' } } },
  orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
  limit: 5
});

const countryReport = await runReport({
  dateRanges,
  dimensions: [{ name: 'country' }],
  metrics: [{ name: 'sessions' }],
  orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  limit: 10
});

const totalReport = await runReport({ dateRanges, metrics: [{ name: 'sessions' }] });
const totalSessions = Number(totalReport.rows?.[0]?.metricValues?.[0]?.value || 0);

const countryNames = {
  Taiwan: '台灣', 'United States': '美國', Canada: '加拿大', 'United Kingdom': '英國', Australia: '澳洲',
  'Hong Kong': '香港', Japan: '日本', Singapore: '新加坡', Malaysia: '馬來西亞', India: '印度', China: '中國',
  'South Korea': '南韓', Germany: '德國', France: '法國', 'New Zealand': '紐西蘭', Vietnam: '越南', Thailand: '泰國',
  Indonesia: '印尼', Philippines: '菲律賓', Sweden: '瑞典', Ireland: '愛爾蘭'
};

const cleanTitle = (title = '') => title.replace(/\s*[｜|]\s*Global Education News.*$/i, '').trim();

const popularArticles = (articleReport.rows || []).map((row) => ({
  title: cleanTitle(row.dimensionValues?.[0]?.value || '未命名文章'),
  path: row.dimensionValues?.[1]?.value || '#',
  views: Number(row.metricValues?.[0]?.value || 0)
}));

const countries = (countryReport.rows || []).map((row) => {
  const rawName = row.dimensionValues?.[0]?.value || 'Other';
  const sessions = Number(row.metricValues?.[0]?.value || 0);
  return {
    name: countryNames[rawName] || rawName,
    mapName: rawName,
    sessions,
    share: totalSessions > 0 ? Number(((sessions / totalSessions) * 100).toFixed(1)) : 0
  };
});

const summary = {
  status: popularArticles.length || countries.length ? 'ready' : 'pending',
  updatedAt: new Date().toISOString(),
  period: 'rolling-7-days',
  audienceDisplay: 'accumulating',
  popularArticles,
  countries
};

fs.mkdirSync('public/data', { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
console.log(`Updated ${outputPath}`);
