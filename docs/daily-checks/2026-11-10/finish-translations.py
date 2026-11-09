from common import *
import re
m=json.loads(pathlib.Path(r'C:/Users/User/AppData/Local/Temp/globalednews-security-20261019/.bilingual/strings.json').read_text(encoding='utf8'))
fixed={'117 筆':'117 results','依官方台灣學歷':'Check official Taiwan qualifications','科系與英語要求評估':'subject and English requirements','兩個主要校區位於伯明罕':'Two main campuses in Birmingham','266+ 全球獎學金資料庫':'266+ global scholarships','選課與住宿前先核對上課地點':'Confirm teaching locations before choosing courses and housing','國際申請日期依入學期別與居住地':'International application dates depend on intake and domicile','國際教育新聞 · 2026/11/10':'International education news · November 10, 2026','國際獎學金雷達｜266+ 全球獎學金資料庫':'International Scholarship Radar | 266+ global scholarships','266+ 全球獎學金資料庫｜每日查核，最多新增 3 則':'266+ global scholarships | Checked daily, up to 3 additions'}
for z in m:
 e=fixed.get(z)
 if not e and z.endswith('｜國際獎學金雷達'):e=over[z.split('｜')[0]]+' | International Scholarship Radar'
 if not e and z.startswith('官方來源：'):e=z.replace('官方來源：','Official source: ')
 if not e and z.startswith('資格查核紀錄：'):e=z.replace('資格查核紀錄：','Eligibility checked: ')
 if not e and '2026年11月10日' in z:e=z.replace('2026年11月10日','November 10, 2026').replace('發布：','Published: ')
 assert e and not re.search('[\u3400-\u9fff]',e),(z,e)
 over[z]=e
save('src/data/i18n/en-overrides.json',over);print('Reviewed',len(m),'English strings')
