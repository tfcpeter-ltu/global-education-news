export default async function handler(req, res) {
  const base = String(process.env.APP_BASE_URL || '').replace(/\/$/, '');
  const target = `${base || ''}/cap-ai-preview/final-v16.html?payment=processing#upgradeV16`;
  res.statusCode = 302;
  res.setHeader('Location', target);
  res.end();
}
