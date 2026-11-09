from common import *
import re
reviews=load('docs/editorial/news-reviews.json')
changes={
'australia-education-agent-accreditation-proposal-2026':dict(perspectives='政府說明提供者監管責任，AIECA提出業界共同標準；另討論小型代辦成本、分包監督與學生申訴可用性。',taiwanImpact='台灣家庭可逐項查校方代理名單、書面服務與收費、推薦佣金及申訴入口，不以會員標章取代自己查核。',uncertainty='沒有證據顯示新強制認證已立法或全面實施，也沒有可推算的風險降低數據；不替個別代辦背書。'),
'new-zealand-student-experience-2026-work-gap':dict(background='交代6129份回覆、超過百國國籍、4月至5月田野期間與加權方式，說明不是11月即時或台灣專項調查。',development='把90%整體正面、55%工作經驗與33%找兼職容易度分開，不將體驗問項改稱畢業後就業率。',perspectives='官方同時呈現滿意度改善與工作面向待改善；PIE跨國論壇補充成長和公共價值觀點，編輯分析聚焦家庭負擔。',taiwanImpact='提醒台灣學生把課程與生活支持分別查詢，先以已確認資金編預算，不讓未取得的兼職收入填補必要支出。',uncertainty='未取得台灣分組或個別學校工作成果，不能推算個人工作機率；論壇不是第二套抽樣，也不證明因果。'),
'uk-business-schools-2026-recruitment-finance-survey':dict(background='逐一說明69%為回報下降院校占比，不是學生人數跌幅；招生目標、前期人數、實際收入及預期不可混用。',perspectives='協會呈現院長招生與政策疑慮，PIE另次直接訪問呈現TNE非短期財務解方，編輯觀點回到課程承諾與學生支持。',taiwanImpact='台灣商管申請者可確認核心課程、選修調整、師資指導與實習取得方式，把獎學金折扣和課程適合度分開。',uncertainty='主管意見不是政策因果研究，59%收入下降屬預期；無個校財務評等、倒閉停課預測或個人移民資格推定。')}
for slug,fields in changes.items():reviews[slug].update(fields)
save('docs/editorial/news-reviews.json',reviews)
old=R/'docs/daily-checks/2026-11-09'
s=(old/'social.py').read_text(encoding='utf-8-sig').replace('2026-11-09','2026-11-10')
s=s.replace("country='Australia',schoolName='Swinburne University of Technology',storyAngle='Industry projects versus competitive professional placement',selectionReason='Rotate from UK Bath to Australia; independent Victorian employer-barrier context and current university FAQ.'","country='United Kingdom',schoolName='Birmingham City University',storyAngle='Campus locations, course fit and travel budgeting',selectionReason='Rotate from Australia Swinburne to UK BCU; official map, Taiwan admissions and independent campus guide checked.'")
s=re.sub(r"r\['sunmoonReview'\]=dict\(.*?\)\n",'',s)
(pathlib.Path(__file__).parent/'social.py').write_text(s,encoding='utf8')
s=(old/'build.py').read_text(encoding='utf-8-sig').replace('2026-11-09','2026-11-10').replace('20261109','20261110')
(pathlib.Path(__file__).parent/'build.py').write_text(s,encoding='utf8')
print('Substantive reviews complete; prepared build and social helpers')
