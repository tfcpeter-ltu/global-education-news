import fs from 'node:fs/promises';
import {makeMath} from '../lib/math-bank.mjs';
import {mathAI} from '../lib/math-ai.mjs';
const source=await fs.readFile('../cap-math-ai-app/.env.local','utf8');
const key=source.match(/^OPENAI_API_KEY\s*=\s*["']?([^\r\n"']+)/m)?.[1];
if(!key)throw new Error('KEY_UNAVAILABLE');
try{const result=await mathAI(makeMath('MATH-0007'),'我把底乘高，忘記除以2。',key);console.log(JSON.stringify({ok:true,characters:result.length,explanation:result.slice(0,450)}));}catch(e){console.log(JSON.stringify({ok:false,error:e.message}));process.exitCode=1;}
