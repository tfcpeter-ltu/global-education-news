import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {parameters,families} from '../lib/original-math.mjs';
const {papers}=JSON.parse(await fs.readFile('math-original/collection.json','utf8'));
const bp=JSON.parse(await fs.readFile('math-original/blueprints.json','utf8')).papers;
assert.equal(papers.length,56);assert.equal(papers.flatMap(p=>p.questions).length,1578);
// Independent answer models: these do not execute item certificates or solutions.
const expected={
 'signed-ledger':({a,b,c})=>b-a-c,'distance-line':({a,b,c})=>c-(-a-b),
 'gcd-packets':({a})=>{const gcd=(x,y)=>y?gcd(y,x%y):x;return gcd(6*a,9*a)},
 'lcm-signals':({a})=>{for(let x=1;;x++)if(x%(4*a)===0&&x%(6*a)===0)return x},
 'fraction-tank':({a,b})=>a-a/4+b,'powers-sign':({a,b})=>(-a)*(-a)-b*a,
 'budget-craft':({a,b,c})=>Math.floor((a*c+b+a-1-b)/a),
 'blend-concentration':({a})=>(10*a*.2+10*a*.4)/(20*a)*100,
 'shared-work':({a})=>1/(1/(2*a)+1/(3*a)),
 'successive-price':({a})=>(100*a+100*a*.2)*(1-.25),
 'ticket-two-kinds':({a,b,c})=>(c*(2*a+b)-c*(a+b))/c,
 'balance-brackets':({a,b,c})=>a*c/a+b,
 'inequality-negative':({a,b,c})=>(b-(a*c+b))/-a,
 'two-equations':({a,b})=>{const x=((2*a+b)+(a-b))/3,y=x-(a-b);return x+y},
 'fraction-equation':({a,b,c})=>b*c-a,
 'rectangle-coefficient':({a,b})=>(1+a)*(1+b)-1-a*b,
 'remainder-machine':({a,b,c})=>a*2*2+b*2+c,
 'difference-square':({a})=>(10*a+1)**2-(10*a-1)**2,
 'factor-missing':({a,b})=>a*b,
 'radical-coefficient':({a,b})=>(Math.sqrt(2*a*a)+Math.sqrt(2*b*b))/Math.sqrt(2),
 'diagonal-walk':({a})=>12*a+5*a-Math.hypot(12*a,5*a),
 'square-side':({a})=>Math.sqrt(3*a*a)/Math.sqrt(3),
 'roots-product':({a,b})=>-(-(a-b)),
 'garden-width':({a,b})=>(-b+Math.sqrt(b*b+4*a*(a+b)))/2,
 'square-two-roots':({a,b})=>(b+Math.sqrt(a*a))-(b-Math.sqrt(a*a)),
 'double-root':({a})=>(2*a)**2/4,
 'seat-row':({a,b,c})=>{let x=a;for(let n=1;n<c;n++)x+=b;return x},
 'saving-total':({a,b,c})=>Array.from({length:c},(_,i)=>2*a+i*2*b).reduce((a,b)=>a+b),
 'common-difference':({a,b})=>(a+2*b)-2*((a+7*b)-(a+2*b))/5,
 'odd-tile-sum':({c})=>Array.from({length:c},(_,i)=>i*2+1).reduce((a,b)=>a+b),
 'fare-intersection':({a,b,c})=>(b*c)/((a+b)-a),
 'midpoint-coordinate':({a,c})=>(a+(a+2*c))/2,
 'line-slope':({a,b,c})=>((b+3*c)-b)/((a+c)-a)*(2*c),
 'inverse-resource':({a,b,c})=>(a*b*c)/(a*b),
 'arch-height':({a,b,c})=>Math.max(...Array.from({length:2*a+1},(_,x)=>-((x-a)**2)+b+c)),
 'translate-vertex':({a,b,c})=>((a+c)-a)**2-b,
 'revenue-maximum':({a,b,c})=>{let best=0;for(let x=0;x<=2*b;x++)if(-a*x*x+2*a*b*x+c>-a*best*best+2*a*b*best+c)best=x;return best},
 'triangle-exterior':({a,b})=>180-(a+20)-(180-(a+b+60)),
 'diagonals-area':({a,b})=>4*a*b/2,
 'trapezoid-garden':({a,b,c})=>(a+a+2*b)/2*c,
 'polygon-diagonals':({a})=>Array.from({length:5+a},(_,i)=>i).filter(i=>i!==0&&i!==1&&i!==4+a).length,
 'parallelogram-angle':({a})=>180-(a+40),
 'triangle-third-side':({a,b})=>{let max=0;for(let x=1;x<2*a+b;x++)if(x>b)max=x;return max},
 'shadow-survey':({a,b,c})=>a/b*(b*c),
 'area-scale':({a,b})=>Math.sqrt(a)*b*Math.sqrt(a)*b,
 'mid-segment':({a})=>(2*a)/2,'parallel-cut':({a,b})=>b/(a/(a+2*a))-b,
 'arc-coefficient':({a})=>(2*(6*a)*60)/360,
 'sector-coefficient':({a})=>(2*a)**2*90/360,
 'chord-center':({a})=>2*Math.sqrt((5*a)**2-(3*a)**2),
 'tangent-distance':({a})=>Math.sqrt((13*a)**2-(5*a)**2),
 'inscribed-angle':({a})=>2*(a+10)/2,
 'prism-volume':({a,b,c})=>a*b/2*c,
 'box-surface':({a,b,c})=>a*b+a*b+a*c+a*c+b*c+b*c,
 'cylinder-volume':({a,b})=>((2*a)/2)**2*b,
 'pyramid-volume':({a,b})=>a*a*(3*b)/3,
 'missing-mean':({a,b})=>4*(a+3*b)-(a+(a+2*b)+(a+4*b)),
 'even-median':({a,b})=>((a+2*b)+(a+4*b))/2,
 'weighted-survey':({a,b})=>(a*2*b+(a+3)*b)/(3*b),
 'quartile-spread':({a,b})=>(a+4*b)-(a+b),
 'red-blue':({a})=>a,
 'without-replacement':({a})=>{const n=4+a;let k=0;for(let i=1;i<=n;i++)for(let j=1;j<=n;j++)if(i!==j&&i%2===0&&j%2===0)k++;return k},
 'independent-spinners':({a,b})=>{let k=0;for(let i=1;i<=3+a%7;i++)for(let j=1;j<=4+b%6;j++)k++;return k}
};
const near=(a,b)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-7*Math.max(1,Math.abs(b)),`${a} != ${b}`);
let numeric=0,proof=0,construction=0;const seen=new Set(),usedFamilies=new Set();
for(const [i,p] of papers.entries()){
 assert.equal(p.questions.length,bp[i].slots.length);
 assert.equal(p.rawPoints,p.questions.reduce((s,q)=>s+q.points,0));
 let sumRubric=0;
 const student=await fs.readFile(`public/math-original/${p.id}.html`,'utf8');
 assert.ok(!student.includes('選項核對')&&!student.includes('易錯提醒')&&!student.includes('答案：'));
 for(const [j,q] of p.questions.entries()){
  assert.equal(q.section,bp[i].slots[j].section);assert.ok(q.steps.length>=4);assert.ok(q.trap.length>=10);
  assert.ok(!seen.has(q.stem),`Duplicate stem: ${q.id}`);seen.add(q.stem);
  if(q.type==='proof'||q.type==='construction'){
   q.type==='proof'?proof++:construction++;
   assert.ok(q.rubric.length>=3);assert.equal(q.points,6);continue;
  }
  usedFamilies.add(q.family);assert.ok(expected[q.family],q.family);
  const data=parameters(q.seed),value=expected[q.family](data);
  near(value,q.certificate.expected);numeric++;
  if(q.type==='trueFalse'){
   near(value,Number(q.numericAnswer));assert.equal(q.answer,Math.abs(q.claim-value)<1e-8?'○':'×');
  }else near(value,Number(q.answer));
  if(q.type==='choice'){
   assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
   near(Number(q.options[q.answerIndex]),value);assert.equal(q.optionExplanations.length,4);
  }
  if(q.family==='triangle-exterior')assert.ok(120-data.a-data.b>0);
  if(q.family==='inscribed-angle')assert.ok(2*(data.a+10)<180);
 }
}
assert.equal(Object.keys(expected).length,families.length);
const texts=(await Promise.all(papers.map(p=>fs.readFile(`public/math-original/${p.id}-answers.html`,'utf8')))).join('');
assert.ok(!/research\/|source_question|file:\/\/|C:\\Users|\.pdf/i.test(texts));
// Metadata-only input is an intentional boundary against accidental copying.
for(const p of bp)for(const s of p.slots)assert.deepEqual(Object.keys(s).sort(),['section','topic']);
console.log(JSON.stringify({passed:true,papers:56,questions:1578,numericVerified:numeric,proof,construction,usedFamilies:usedFamilies.size,uniqueStems:seen.size,paidApiCalls:0}));
