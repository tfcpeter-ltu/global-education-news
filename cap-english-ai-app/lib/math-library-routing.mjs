export function mathModuleRoute(path){
 if(path==='/math-original')return '#math-library';
 const m=/^\/math-original\/(?:index(?:\.html)?|(original-(?:0[1-9]|[1-4]\d|5[0-6]))(-answers)?(?:\.html)?)?\/?$/.exec(path);
 if(!m)return null;
 return m[1]?`#math-${m[2]?'answers':'paper'}/${m[1]}`:'#math-library';
}
export function mathModuleView(hash){
 if(hash==='#math-library')return {path:'/math-original/index.html?embedded=1',label:'原創題庫'};
 const m=/^#math-(paper|answers)\/(original-(?:0[1-9]|[1-4]\d|5[0-6]))(?:\/(original-\d+-q\d+))?$/.exec(hash);
 if(!m)return null;
 return {path:`/math-original/${m[2]}${m[1]==='answers'?'-answers':''}.html?embedded=1${m[3]?'#'+m[3]:''}`,label:m[1]==='answers'?'逐題詳解':'原創練習'};
}
