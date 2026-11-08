import pathlib,json,re
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
p=S/'src/data/i18n/en-overrides.json';o=json.loads(p.read_text(encoding='utf8'));m=json.loads((R/'.bilingual/strings.json').read_text(encoding='utf8'))
fixed={'116 筆':'116 results','／ 畢業生就業數據':'/ Graduate employment data','263+ 全球獎學金資料庫':'263+ global scholarships','畢業生就業數據 · PETER':'Graduate employment data · PETER','國際獎學金雷達｜263+ 全球獎學金資料庫':'International Scholarship Radar | 263+ global scholarships','263+ 全球獎學金資料庫｜每日查核，最多新增 3 則':'263+ global scholarships | Checked daily, up to 3 additions','國際教育新聞 · 2026/11/9':'International education news · November 9, 2026'}
for z in m:
 e=fixed.get(z)
 if not e and z.startswith('原文日期：Facebook'):e='Original post date: Facebook displayed November 8, 2026 at 9:56 a.m. when checked at '+re.search(r'2026-11-09T[^ ]+',z)[0]+'.'+(' Recorded as displayed by the platform, without inferring undisplayed date or timezone details.' if '未補推' in z else '')
 if not e and '；校園授權資料照' in z:e=z.split('；')[0]+'; Licensed campus archive photograph, not surveyed graduates or their workplaces.'
 if not e and z.endswith(' →'):e=o[z[:-2]]+' →'
 if not e and '｜Peter 專欄｜環球教育新聞' in z:e=o[z.split('｜')[0]]+' | Peter’s Column | Global Education News'
 if not e and z.endswith('｜國際獎學金雷達'):e=o[z.split('｜')[0]]+' | International Scholarship Radar'
 if not e and '2026年11月9日' in z:e=z.replace('2026年11月9日','November 9, 2026').replace('發布：','Published: ')
 if not e:
  for a,b in [('網站收錄：','Imported: '),('編輯補註 ·','Editorial note ·'),('資格查核紀錄：','Eligibility checked: ')]:
   if z.startswith(a):e=z.replace(a,b)
 assert e and not re.search('[\u3400-\u9fff]',e),(z,e)
 o[z]=e
p.write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Reviewed',len(m),'additional English UI strings')
