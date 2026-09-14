import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const jsFiles=['api/gamification.js','gamification-v1.js','gamification-polish-v1.js','boss-ui-v1.js','game-api-shim.js','study-goal-v1.js','weekly-rank-v1.js','scripts/build-ui.mjs'];
for(const f of jsFiles){const r=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});if(r.status!==0){console.error(`Syntax failed: ${f}\n${r.stderr||r.stdout}`);process.exit(1)}}
const build=await readFile('scripts/build-ui.mjs','utf8');
for(const name of ['game-api-shim.js','gamification-v1.js','gamification-polish-v1.js','boss-ui-v1.js','study-goal-v1.js','weekly-rank-v1.js'])if(!build.includes(name))throw new Error(`Build missing asset: ${name}`);
const vercel=JSON.parse(await readFile('vercel.json','utf8'));
if(!Array.isArray(vercel.rewrites)||!vercel.rewrites.some(r=>r.source==='/game-api'&&r.destination==='/api/gamification'))throw new Error('Missing /game-api rewrite');
const game=await readFile('api/gamification.js','utf8');
for(const token of ['gamification_state','freeze_tokens','latestMock','checkedInToday'])if(!game.includes(token))throw new Error(`Gamification API missing: ${token}`);
const polish=await readFile('gamification-polish-v1.js','utf8');
for(const token of ['每日簽到','連勝保護','/game-api'])if(!polish.includes(token))throw new Error(`Polish UI missing: ${token}`);
const goal=await readFile('study-goal-v1.js','utf8');
for(const token of ['今天想學多久','5,10,15,20','capStudyGoalV1'])if(!goal.includes(token))throw new Error(`Study goal missing: ${token}`);
const rank=await readFile('weekly-rank-v1.js','utf8');
for(const token of ['本週段位','鑽石','黃金','白銀','青銅','新星','自己的成長段位'])if(!rank.includes(token))throw new Error(`Weekly rank missing: ${token}`);
console.log('Gamification QA passed: core + boss + check-in + shield + study goal + weekly rank');
