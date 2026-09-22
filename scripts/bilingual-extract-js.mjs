import fs from 'node:fs';
import path from 'node:path';
let parse;
try { ({parse}=await import('acorn')); } catch { ({parse}=await import('../node_modules/.pnpm/acorn@8.18.0/node_modules/acorn/dist/acorn.mjs')); }
const strings=new Set();
const chinese=/[\u3400-\u9fff]/;
function add(s){if(typeof s==='string'&&chinese.test(s)&&s.length<20000){strings.add(s);}}
function nodes(n){if(!n||typeof n!=='object')return;if(n.type==='Literal')add(n.value);if(n.type==='TemplateElement')add(n.value.cooked);for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(nodes);else if(v&&typeof v==='object')nodes(v);}}
function extract(s,f){if(!chinese.test(s))return;try{nodes(parse(s,{ecmaVersion:'latest',sourceType:'module',allowReturnOutsideFunction:true}));}catch(error){throw new Error(`Cannot extract ${f}: ${error.message}`);}}
function walk(p){for(const e of fs.readdirSync(p,{withFileTypes:true})){const f=path.join(p,e.name);if(e.isDirectory()){if(e.name!=='en')walk(f);}else if(f.endsWith('.js')){extract(fs.readFileSync(f,'utf8'),f);}else if(f.endsWith('.html')){for(const m of fs.readFileSync(f,'utf8').matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!/type=["']application\//i.test(m[1]))extract(m[2],f);}}}}
walk('dist');
fs.mkdirSync('.bilingual',{recursive:true});fs.writeFileSync('.bilingual/js-strings.json',JSON.stringify([...strings]));console.log(`Bilingual: ${strings.size} dynamic text strings extracted`);
