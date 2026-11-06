import pathlib,json,re
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
p=S/'src/data/i18n/en-overrides.json';o=json.loads(p.read_text(encoding='utf8'));m=json.loads((R/'.bilingual/strings.json').read_text(encoding='utf8'))
fixed={'113 筆':'113 results','／ 善意與合作':'/ Kindness and cooperation','円周率３パーセント /':'Enshuritsu 3 Percent /','円周率３パーセント / CC BY-SA 4.0':'Enshuritsu 3 Percent / CC BY-SA 4.0','善意與合作 · PETER':'Kindness and cooperation · PETER','257+ 全球獎學金資料庫':'257+ global scholarships','國際獎學金雷達｜257+ 全球獎學金資料庫':'International Scholarship Radar | 257+ global scholarships','257+ 全球獎學金資料庫｜每日查核，最多新增 3 則':'257+ global scholarships | Checked daily, up to 3 additions','官方來源：University of Lincoln':'Official source: University of Lincoln'}
for z in m:
 e=fixed.get(z)
 if not e and z.startswith('原文日期：Facebook'):e='Original post date: Facebook displayed “17 hours ago” when checked on '+re.search(r'2026-11-07T[^ ]+',z)[0]+'.'+(' The platform provided a relative date only; no exact publication date was inferred.' if '平台僅' in z else '')
 if not e and '；普林斯頓資料照' in z:e=z.split('；')[0]+'; Princeton archive photograph, not the speech or Peter’s original card.'
 if not e and z.endswith(' →'):e=o[z[:-2]]+' →'
 if not e and '｜Peter 專欄｜環球教育新聞' in z:e=o[z.split('｜')[0]]+' | Peter’s Column | Global Education News'
 if not e and z.endswith('｜國際獎學金雷達'):e=o[z.split('｜')[0]]+' | International Scholarship Radar'
 if not e and '2026年11月7日' in z:e=z.replace('2026年11月7日','November 7, 2026').replace('發布：','Published: ')
 if not e and z=='國際教育新聞 · 2026/11/7':e='International education news · November 7, 2026'
 if not e:
  for a,b in [('網站收錄：','Imported: '),('編輯補註 ·','Editorial note ·'),('資格查核紀錄：','Eligibility checked: ')]:
   if z.startswith(a):e=z.replace(a,b)
 assert e and not re.search('[\u3400-\u9fff]',e),(z,e)
 o[z]=e
p.write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Reviewed and completed',len(m),'remaining visible/UI strings')
