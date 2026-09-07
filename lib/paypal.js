function clean(name){ return String(process.env[name] || '').trim(); }

export function paypalConfig(){
  const clientId = clean('PAYPAL_CLIENT_ID');
  const clientSecret = clean('PAYPAL_CLIENT_SECRET');
  const mode = (clean('PAYPAL_MODE') || 'sandbox').toLowerCase();
  const base = mode === 'production' || mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
  return { clientId, clientSecret, mode, base, configured: !!clientId && !!clientSecret };
}

export async function paypalAccessToken(){
  const cfg = paypalConfig();
  if(!cfg.configured) throw new Error('PAYPAL_NOT_CONFIGURED');
  const basic = Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString('base64');
  const r = await fetch(`${cfg.base}/v1/oauth2/token`, {
    method:'POST',
    headers:{
      'Authorization':`Basic ${basic}`,
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials'
  });
  const data = await r.json().catch(()=>({}));
  if(!r.ok || !data.access_token){
    console.error('PayPal OAuth error', r.status, data?.error || data?.name || 'unknown');
    throw new Error('PAYPAL_AUTH_FAILED');
  }
  return { token:data.access_token, cfg };
}

export async function paypalRequest(path, options={}){
  const { token, cfg } = await paypalAccessToken();
  const r = await fetch(`${cfg.base}${path}`, {
    ...options,
    headers:{
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Prefer':'return=representation',
      ...(options.headers || {})
    }
  });
  const data = await r.json().catch(()=>({}));
  if(!r.ok){
    console.error('PayPal API error', path, r.status, data?.name || data?.message || 'unknown');
    const err = new Error('PAYPAL_API_FAILED');
    err.status = r.status;
    err.payload = data;
    throw err;
  }
  return data;
}
