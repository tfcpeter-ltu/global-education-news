import json,pathlib,datetime
S=pathlib.Path.cwd();D='2026-11-10';p=S/f'docs/social-posts/{D}/scholarship--scholarship-radar-20261110.json'
j=json.loads(p.read_text(encoding='utf-8-sig'))
intro='''台灣學生國際獎學金雷達
想減輕留學負擔，卻不知道哪些獎學金適合自己？

Global Education News｜環球教育新聞提供免費開放、具公益性質的資訊整理。學生與家長可依國家、學位及申請狀態查找，比較補助、資格、期限與官方來源。
2026/11/10 台北實查：已收錄266筆獎學金資料；這是全庫總量，不代表全部開放申請。
免費查詢：https://globalednews.com/scholarships/'''
a='''今日新增①｜英國・授課型碩士
Aston國際社群獎：首年學費減£4,000。適用2027年1月入學、自費且符合海外費率的新生；須獲合資格全日制課程錄取。MBA、MRes等除外，訂金期限依個人錄取信；課程申請目前開放至11月30日，可能提前額滿。
https://globalednews.com/scholarships/items/2026-11-aston-pg-international-community-january-2027/'''
b='''今日新增②｜英國・學士
Birmingham City國際學士獎：第一年減£3,000、第二年減£2,000，合計£5,000。2027年1月入學、自費國際新生，無須另填獎學金表；預科銜接、音樂／表演學院等有排除條款。以台灣為居住地者，課程申請12月4日截止、CAS訂金12月11日。
https://globalednews.com/scholarships/items/2026-11-bcu-international-undergraduate-january-2027/'''
c='''今日新增③｜英國・授課型碩士
Birmingham City國際碩士獎：學費減£3,000。2027年1月入學、自費國際新生；研究型、部分專業與銜接課程除外。台灣居住地申請12月4日截止、CAS訂金12月11日。
https://globalednews.com/scholarships/items/2026-11-bcu-international-postgraduate-january-2027/
兩項BCU獎均須先備妥全年學費50%的CAS訂金，不能先扣獎學金。台灣學生仍須逐項符合入學及獎學金條件。'''
n='''最新環球教育新聞｜選校也要看學習與就業支持
紐西蘭國際生九成肯定留學體驗，但找兼職的便利程度評價較低；這不是就業率。留學前可先問學校提供哪些求職協助。
https://globalednews.com/news/new-zealand-student-experience-2026-work-gap/'''
cta='''追蹤環球教育新聞，讓找機會更有方向。
免費加入會員，每週收到最新國際教育新聞及本週新增國際獎學金摘要與連結：
https://globalednews.com/newsletter/'''
full='\n\n'.join([intro,a,b,c,n,cta]);parts=[intro,a,b,c,n+'\n\n'+cta]
assert len(full)<2200 and all(len(x)<=500 for x in parts)
j.update(status='prepared',socialImage=f'docs/social-posts/{D}/radar-mobile-large.png',imageAlt='台灣學生國際獎學金雷達：266筆獎學金資料，2026年11月10日',facebookCopy=full,instagramCopy=full,linkedinCopy=full,threadsCopy=parts[0],threadsReplies=parts[1:],threadsTopic='獎學金',verifiedTotal=266,totalVerifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),countEvidence=f'docs/daily-checks/{D}/radar-live-page.txt',mobilePreview=f'docs/social-posts/{D}/radar-360-preview.jpg',imageSource='Daily verified production radar count; imagegen information cover',imageLicense='Original designed information graphic',threadsSync=False)
p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Full copy characters',len(full),'Threads',list(map(len,parts)))
