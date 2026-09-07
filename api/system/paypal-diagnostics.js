import { paypalConfig } from '../../lib/paypal.js';

export default function handler(req,res){
  const cfg = paypalConfig();
  res.status(200).json({
    ok:true,
    configured:cfg.configured,
    mode:cfg.mode,
    apiBase:cfg.base,
    clientIdConfigured:!!cfg.clientId,
    clientSecretConfigured:!!cfg.clientSecret
  });
}
