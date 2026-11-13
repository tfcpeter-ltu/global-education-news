const fs=require('fs');let p='src/data/i18n/en-overrides.json',e=JSON.parse(fs.readFileSync(p));Object.assign(e,{'205+ 全球獎學金資料庫':'205+ global scholarship listings','國際獎學金雷達｜205+ 全球獎學金資料庫':'International Scholarship Radar | 205+ global scholarship listings','205+ 全球獎學金資料庫｜每日查核，最多新增 3 則':'205+ global scholarship listings | Checked daily, up to 3 additions'});fs.writeFileSync(p,JSON.stringify(e,null,2)+'\n');



