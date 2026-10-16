export function englishModuleRoute(path){
 if(path==='/english-original')return '#english-library';
 const match=/^\/english-original\/(?:index(?:\.html)?|((?:english-)(?:0[1-9]|[1-4]\d|5[0-6]))(-answers)?(?:\.html)?)?\/?$/.exec(path);
 if(!match)return null;
 return match[1]?`#english-${match[2]?'answers':'paper'}/${match[1]}`:'#english-library';
}
export function englishModuleView(hash){
 if(hash==='#english-library')return {path:'/english-original/index.html?embedded=1',label:'原創題庫'};
 const m=/^#english-(paper|answers)\/(english-(?:0[1-9]|[1-4]\d|5[0-6]))(?:\/(eng-\d+-(?:r|l)\d+))?$/.exec(hash);
 if(!m)return null;
 return {path:`/english-original/${m[2]}${m[1]==='answers'?'-answers':''}.html?embedded=1${m[3]?'#'+m[3]:''}`,label:m[1]==='answers'?'逐題詳解':'原創練習'};
}
