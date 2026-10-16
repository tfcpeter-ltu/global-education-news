import fs from 'node:fs/promises';
// Only assessment metadata enters the new authoring pipeline: no source stems,
// answers, diagrams, solution prose, school names or source URLs are exported.
const dir='research/math-corpus/reviewed';
const classify=s=>{
 if(/圓柱|圓錐|角柱|角錐|立方|柱體|錐體|球截|空間|立體|展開|挖孔|切割新增/.test(s))return 'solid';
 if(/圓|弦|弧|切線|切圓|割線/.test(s))return 'circle';
 if(/相似|比例線|平行截|中位三角|影長|縮放|放大|縮比/.test(s))return 'similarity';
 if(/機率|抽|等可能|放回/.test(s))return 'probability';
 if(/統計|平均|中位|眾數|次數|四分位|盒|長條|折線|直方|列聯/.test(s))return 'statistics';
 if(/等差|級數|數列|公差|首項|第n項|項數|座位|三角數/.test(s))return 'sequence';
 if(/拋物|二次函數|頂點|開口|配方平移|收入|最大值|最值|同形二次/.test(s))return 'quadraticFunction';
 if(/二次方程|零積|重根|判別|根個數|十字|交乘|平方方程|實根|整數根/.test(s))return 'quadratic';
 if(/根式|根號|平方根|有理化|畢氏|斜邊|正方形對角|坐標距離/.test(s))return 'radical';
 if(/多項式|因式|同類|係數|常數項|平方差|平方展開|完全平方|乘法公式/.test(s))return 'polynomial';
 if(/函數|直線|座標|坐標|象限|斜率|截距|反射|反比|正比/.test(s))return 'function';
 if(/三角|四邊|角|邊長|全等|平行|中點|對稱|鏡射|摺|折|面積|菱形|箏形|矩形|梯形|正方|重心|內心|外心|幾何|作圖|垂直|等距/.test(s))return 'geometry';
 if(/方程|聯立|代入|消元|移項|未知|票價|年齡|列式|通分|不等式|解集|清除分母|帳篷/.test(s))return 'algebra';
 if(/比例|百分|折扣|濃度|速率|分攤|單價|總費|購物|工作|金額|優惠/.test(s))return 'ratio';
 return 'number';
};
const files=(await fs.readdir(dir)).filter(f=>/^(cap-[\w-]+|paper-S\d+)-solutions\.json$/.test(f)).sort();
const blueprints=[];
for(const [i,file] of files.entries()){
 const p=JSON.parse(await fs.readFile(`${dir}/${file}`,'utf8'));
 const grade=/國一/.test(p.title)?7:/國二/.test(p.title)?8:9;
 const slots=[...p.choice.map(q=>({section:'選擇題',topic:classify(q.concept)})),...p.written.map(q=>({section:q.section||'非選擇題',topic:classify(q.concept)}))];
 blueprints.push({id:`original-${String(i+1).padStart(2,'0')}`,grade,category:file.startsWith('cap-')||file.startsWith('paper-S18-')?'會考型綜合練習':'分單元段考型練習',slots});
}
await fs.mkdir('math-original',{recursive:true});
await fs.writeFile('math-original/blueprints.json',JSON.stringify({version:1,note:'僅取已核對的題型與題目／子題數及概略能力領域；非官方試卷，非逐題改寫。原卷大題分組與官方配分不沿用。',papers:blueprints},null,2));
console.log('Created',blueprints.length,'metadata-only blueprints');
