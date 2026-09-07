function clean(name){return String(process.env[name]||'').trim();}
function mask(v){if(!v)return ''; if(v.length<=6)return '*'.repeat(v.length); return `${v.slice(0,3)}***${v.slice(-3)}`;}
const MPG_VERSION='2.0';
export default function handler(req,res){
  const merchant=clean('NEWEBPAY_MERCHANT_ID');
  const key=clean('NEWEBPAY_HASH_KEY');
  const iv=clean('NEWEBPAY_HASH_IV');
  const mode=clean('NEWEBPAY_MODE').toLowerCase()||'test';
  const gateway=mode==='production'?'https://core.newebpay.com/MPG/mpg_gateway':'https://ccore.newebpay.com/MPG/mpg_gateway';
  res.status(200).json({
    ok:true,
    mode,
    mpgVersion:MPG_VERSION,
    gateway,
    merchantIdMasked:mask(merchant),
    merchantIdLength:merchant.length,
    hashKeyLength:key.length,
    hashIvLength:iv.length,
    merchantConfigured:!!merchant,
    hashKeyConfigured:!!key,
    hashIvConfigured:!!iv,
    keyLengthsValid:key.length===32&&iv.length===16
  });
}
