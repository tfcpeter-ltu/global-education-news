import assert from 'node:assert/strict';
import {makeMath,publicMath,writtenMath} from '../lib/math-bank.mjs';
const stems=new Set();
for(let n=0;n<1200;n++){
 const q=makeMath(`MATH-${String(n).padStart(4,'0')}`),v=Math.floor(n/12),a=2+v,b=3+(v*7)%11,x=2+(v*3)%17;
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.options[q.answerIndex],q.answer);assert.ok(q.steps.length>=2);assert.equal(stems.has(q.stem),false);stems.add(q.stem);
 const expected=[-a*b+x,80*a,x,b,Math.max(a,b),a+(x-1)*b,a*x-b,a*b,5*a,2*a,60+a];
 if(n%12<11)assert.equal(Number(q.answer),expected[n%12]);else{const [p,d]=q.answer.split('/').map(Number);assert.equal(p/d,a/(a+b));}
 const pub=publicMath(q);for(const k of ['answer','answerIndex','steps','concept','reasons','rubric'])assert.equal(k in pub,false);
}
for(let s=0;s<1000;s++){const qs=writtenMath(s);assert.equal(qs.length,2);for(const q of qs){assert.equal(q.rubric.length,3);assert.ok(q.steps.length>=3);assert.equal('answer' in publicMath(q),false);}}
assert.throws(()=>makeMath('MATH-1200'));assert.throws(()=>makeMath('English-001'));
console.log('Passed: 1,200 distinct math stems, independent computed answers, option uniqueness and public answer hiding; 2,000 written variants/rubrics.');
