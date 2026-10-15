export const skills=['有理數運算','比例與百分率','一元一次方程式','二元一次聯立方程式','二次方程式','等差數列','一次函數','三角形面積','畢氏定理','圓與扇形','統計平均數','機率'];
const gcd=(a,b)=>b?gcd(b,a%b):a;
const frac=(a,b)=>`${a/gcd(a,b)}/${b/gcd(a,b)}`;
export function makeMath(id){
 const m=/^MATH-(\d{4})$/.exec(id);if(!m||+m[1]>=1200)throw new Error('INVALID_QUESTION');const n=+m[1],t=n%12,v=Math.floor(n/12),a=2+v,b=3+(v*7)%11,x=2+(v*3)%17;
 let stem,answer,steps,wrong,concept,diagram='';
 switch(t){
 case 0:stem=`計算（−${a}）× ${b}＋${x} 的值。`;answer=-a*b+x;steps=[`先算乘法：（−${a}）×${b}=−${a*b}。`,`再做加法：−${a*b}＋${x}=${answer}。`];wrong=[a*b+x,-a*(b+x),-a*b-x];concept='先乘除、後加減；負數乘正數仍是負數。';break;
 case 1:stem=`原價 ${100*a} 元的商品打八折，折後價格是多少元？`;answer=80*a;steps=[`八折表示支付原價的80%，不是減少80%。`,`${100*a}×0.8=${answer}（元）。`];wrong=[20*a,100*a-8,100*a];concept='折後價＝原價×折扣率。';break;
 case 2:stem=`解方程式 ${a}x＋${b}＝${a*x+b}，求 x。`;answer=x;steps=[`兩邊同減${b}：${a}x=${a*x}。`,`兩邊同除${a}：x=${x}。`,`代回：${a}×${x}＋${b}=${a*x+b}，符合原式。`];wrong=[x+b,x-b,a*x];concept='等式兩邊做相同運算；移項需注意符號。';break;
 case 3:stem=`若 x＋y＝${x+b}，x−y＝${x-b}，則 y 的值為何？`;answer=b;steps=[`兩式相加：2x=${2*x}，故x=${x}。`,`代回x＋y=${x+b}：y=${b}。`,`檢查x−y=${x-b}，符合第二式。`];wrong=[x,x+b,x-b];concept='消去法要確認同一未知數的係數能相消。';break;
 case 4:stem=`方程式 x²−${a+b}x＋${a*b}＝0 的較大解為何？`;answer=Math.max(a,b);steps=[`找和為${a+b}、積為${a*b}的兩數：${a}、${b}。`,`分解成(x−${a})(x−${b})=0。`,`解為${a}、${b}；較大解是${answer}。`];wrong=[-answer,a+b,a*b];concept='零乘積性質：乘積為零，至少一個因式為零。';break;
 case 5:stem=`等差數列首項為 ${a}、公差為 ${b}，第 ${x} 項是多少？`;answer=a+(x-1)*b;steps=[`第n項=a₁+(n−1)d。`,`第${x}項=${a}+(${x}−1)×${b}=${answer}。`];wrong=[a+x*b,x*b,a+(x-1)];concept='從第1項到第n項，只增加n−1次公差。';break;
 case 6:stem=`一次函數 y＝${a}x−${b}，當 x＝${x} 時，y＝？`;answer=a*x-b;steps=[`將x=${x}代入函數。`,`y=${a}×${x}−${b}=${answer}。`];wrong=[a*x+b,a*(x-b),x-b];concept='代入數值後仍須遵守先乘後減。';break;
 case 7:stem=`三角形的底為 ${2*a} 公分，對應的高為 ${b} 公分，面積為多少平方公分？`;answer=a*b;steps=[`三角形面積=底×對應高÷2。`,`${2*a}×${b}÷2=${answer}（平方公分）。`];wrong=[2*a*b,2*a+b,a+b];concept='高須垂直於底；三角形面積要除以2。';diagram='triangle';break;
 case 8:stem=`直角三角形的兩股長為 ${3*a}、${4*a} 公分，斜邊長多少公分？`;answer=5*a;steps=[`斜邊c滿足c²=(${3*a})²+(${4*a})²。`,`c²=${25*a*a}，邊長為正，所以c=${5*a}（公分）。`];wrong=[7*a,a,25*a*a];concept='平方和等於斜邊平方，最後還要開平方根。';diagram='rightTriangle';break;
 case 9:stem=`半徑 ${a} 公分的圓，其圓周長是幾 π 公分？（答案填 π 前的係數）`;answer=2*a;steps=[`圓周長=2πr。`,`代入半徑${a}：2π×${a}=${2*a}π。`,`π前係數為${2*a}。`];wrong=[a*a,a,4*a];concept='圓周長與圓面積是不同公式：2πr與πr²。';diagram='circle';break;
 case 10:stem=`三天閱讀頁數為 ${50+a}、${60+a}、${70+a} 頁，平均每天閱讀多少頁？`;answer=60+a;steps=[`總頁數=${50+a}+${60+a}+${70+a}=${180+3*a}。`,`平均=總頁數÷3=${60+a}。`];wrong=[180+3*a,90+1.5*a,50+a];concept='平均數＝總和÷資料個數。';break;
 case 11:stem=`袋內有 ${a} 顆紅球及 ${b} 顆藍球，每顆球被抽到的機會相同。隨機抽一顆，抽到紅球的機率為何？`;answer=frac(a,a+b);steps=[`球總數=${a}+${b}=${a+b}。`,`紅球有${a}顆，機率=${a}/${a+b}=${answer}。`];wrong=[frac(b,a+b),frac(a,b),'1'];concept='等可能時，機率＝符合條件的結果數÷全部結果數。';break;
 }
 const originalWrong=wrong.map(String);const values=[String(answer),...originalWrong];for(let k=1;k<4;k++){if(values.slice(0,k).includes(values[k]))values[k]=String(1000+v+k*100+t);}const shift=n%4,options=values.slice(shift).concat(values.slice(0,shift)),answerIndex=(4-shift)%4;
 const traps=[
 ['把負數乘正數誤算成正數。','把沒有括號的加法先算，改變原式運算順序。','把最後的加法誤算成減法。'],
 ['算出的是減免金額（20%），不是實際付款（80%）。','八折不是直接減8元。','使用原價，尚未乘0.8。'],
 ['減去常數項後，還要除以x的係數；不能把常數直接加到解上。','移項減常數後，仍要除以係數。','這是係數乘解的值，還不是x。'],
 ['求得的是x，題目問y。','使用兩數總和，尚未代回求y。','使用兩數差，尚未代回求y。'],
 ['因式為x−a時，解為正的a，不能寫成負值。','兩根的和不等於較大根。','兩根的積不等於較大根。'],
 ['從首項到第n項只有n−1次增加，不能增加n次公差。','漏掉首項。','漏掉乘公差，不能每次只加1。'],
 ['把函數常數項的減號誤改成加號。','把ax−b誤看成a(x−b)，把b多乘了a。','漏掉x前的係數a。'],
 ['只算底乘高，忘了三角形面積要除2。','把長度相加，不能得到面積。','使用不完整的長度加法，不能得到平方單位的面積。'],
 ['直接加兩股，未使用畢氏定理。','使用兩股差，並非斜邊公式。','得到的是斜邊的平方，最後還要開平方根。'],
 ['這是圓面積π前的係數，題目問圓周長。','只取半徑，漏乘2。','半徑乘4會把直徑再多乘一次2。'],
 ['這是總和，平均還要除以3。','除錯資料個數；共有3筆資料。','只取第一筆，沒有平均三筆資料。'],
 ['分子用了藍球數；題目問抽到紅球。','分母只用了藍球數，應使用全部球數。','袋中有藍球，抽到紅球並不是必然事件。']
 ][t];
 const reasons=options.map((val,i)=>i===answerIndex?`依上面的計算得到${answer}，因此此選項正確。`:`${val} 不符合正確結果 ${answer}。${originalWrong[values.indexOf(val)-1]===val?traps[values.indexOf(val)-1]:`把此數代回題目的關係，不會得到已知條件；請依「${concept}」重新計算。`}`);
 const checks=[
`正負號檢查：負數乘正數得負數，再加上${x}；結果應是${-a*b}+${x}=${answer}，而不是${a*b+x}。`,
`折扣檢查：節省金額=${100*a}−${answer}=${20*a}元，剛好是原價的20%。`,
`驗算時左右兩邊都等於${a*x+b}，所以x=${x}符合題意。`,
`兩式相減也可得2y=${2*b}，再次確認y=${b}。`,
`代回較大解${answer}：${answer**2}−${(a+b)*answer}+${a*b}=0，且另一解${Math.min(a,b)}不較大。`,
`也可由首項${a}加${x-1}次公差${b}；因此${answer}−${a}=${(x-1)*b}。`,
`把求得y移回：${answer}+${b}=${a*x}，等於${a}×${x}。`,
`同底同高的長方形面積為${2*a*b}平方公分；本三角形是它的一半，即${answer}平方公分。`,
`驗算：${(3*a)**2}+${(4*a)**2}=${(5*a)**2}；斜邊${5*a}也大於兩股${3*a}與${4*a}。`,
`直徑為${2*a}公分，圓周長=π×直徑=${2*a}π公分；題目只要π前的係數${answer}。`,
`驗算：平均${answer}頁×3天=${180+3*a}頁，等於總頁數；平均也介於${50+a}與${70+a}頁之間。`,
`機率檢查：紅球機率${a}/${a+b}加藍球機率${b}/${a+b}=1，且各機率均介於0與1。`
][t];steps=[`先辨認本題觀念：${concept}`,...steps,checks];
 return{id,skill:skills[t],type:'choice',stem,options,answerIndex,answer:String(answer),steps,concept,reasons,diagram,difficulty:t<3?'基礎':t<8?'標準':'整合'};
}
export function writtenMath(seed=0){const a=3+seed%7,b=2+Math.floor(seed/7)%5;return[{id:`WRITTEN-${seed}-0`,type:'written',skill:'代數與幾何整合',stem:`長方形的長比寬多${b}公分，周長為${4*a+2*b}公分。設寬為x。（1）列出方程式並求寬。（2）求面積，寫出計算過程。`,answer:`寬${a}公分；面積${a*(a+b)}平方公分`,steps:[`長=x+${b}。`,`周長方程式：2[x+(x+${b})]=${4*a+2*b}。`,`4x+${2*b}=${4*a+2*b}，x=${a}。`,`面積=${a}×${a+b}=${a*(a+b)}平方公分。`,`驗算周長：2×(${a}+${a+b})=${4*a+2*b}公分，符合已知條件；面積單位是平方公分。`],rubric:['列出正確周長方程式（1分）。',`解出寬${a}公分並呈現過程（1分）。`,`由正確長寬算出面積${a*(a+b)}平方公分（1分）。`]}, {id:`WRITTEN-${seed}-1`,type:'written',skill:'比例與資料應用',stem:`校外教學租車固定費${1000*a}元，每人另收${100*b}元。全班${10+a}人參加。（1）列式求總費用。（2）若每人平均分擔，平均每人多少元？保留到小數第二位並寫出過程。`,answer:`總費用${1000*a+(10+a)*100*b}元；每人${((1000*a+(10+a)*100*b)/(10+a)).toFixed(2)}元`,steps:[`人數為${10+a}人。`,`總費用=${1000*a}+${10+a}×${100*b}=${1000*a+(10+a)*100*b}元。`,`平均分擔=總費用÷人數=${((1000*a+(10+a)*100*b)/(10+a)).toFixed(2)}元。`,`也可先平均分攤固定費：${1000*a}÷${10+a}，再加每人費${100*b}；最後才四捨五入到小數第二位。`],rubric:['區分固定費與每人費用並列式（1分）。','求得正確總費用與計算過程（1分）。','正確平均分擔、四捨五入並標示單位（1分）。']}];}
export function publicMath(q){const {answer,answerIndex,steps,concept,reasons,rubric,...out}=q;return out;}
