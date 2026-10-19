import json,pathlib,datetime
R=pathlib.Path('.');D='2026-10-20'
def load(p):return json.loads((R/p).read_text(encoding='utf-8'))
def save(p,d):
 p=R/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
r=load(f'docs/daily-reports/{D}.json');photos={x['key']:x for x in load(f'docs/image-licenses/{D}.json')}
items=[
dict(campaign='news',topic='parcoursup-offer-enrolment',title='法國Parcoursup：收到錄取建議，不等於已入學',url=r['newsPrepared'][0]['url'],section='環球教育新聞｜掌握國際教育最新動態',sectionUrl='https://globalednews.com/',key='parcoursup',lines=['法國Parcoursup結果','有錄取建議 ≠ 已入學'],summary='2026年有603,910名高中畢業年級申請者收到至少一項錄取建議，占該類申請者91.5%；這不是所有申請者的入學率。',advice='教育部10月19日公布結果，獨立報導持續關注審查透明度。赴法升學須另查課程、學歷與申請管道，不能把平台總數當個人錄取保證。照片為Sorbonne資料照。'),
dict(campaign='scholarship',topic='curtin-excellence-40',title='Curtin全球卓越獎：合格課程學費減40%',url=r['scholarshipChecks'][0]['url'],section='專屬台灣學生的國際留學獎學金雷達',sectionUrl='https://globalednews.com/scholarships/',key='curtin-excellence',lines=['Curtin全球卓越獎','合格課程學費減40%'],summary='2027或2028西澳校區入學，台灣自費國際生可依資格受評估；需CWA95或校方認可同等成績，不能直接套用台灣原始分數。',advice='官方窗口至2027年10月1日，部分課程排除。須先付全額入學訂金，續領需維持CWA70等條件，不能與其他Curtin或澳洲政府獎助併用。照片為Curtin校園資料照。'),
dict(campaign='study-abroad',topic='curtin-awards-cash-flow',title='Curtin留學DIY：40%與1萬澳元怎麼比？',url=r['studyAbroadPrepared']['url'],section='留學 DIY 導航｜海外大學選校與申請規劃',sectionUrl='https://globalednews.com/study-abroad/',key='curtin-diy',lines=['Curtin留學獎助比較','40%與1萬澳元怎麼算？'],summary='先確認課程、校區與入學年度，再比較全球卓越獎40%學費減免及未來領袖獎一次性1萬澳元抵減；兩者不是直接相加。',advice='未來領袖獎分兩次5,000澳元學費抵減，並非現金。入學訂金、生活費與抵減時點分開列，保留有獎與無獎兩份預算。照片為Curtin校園資料照。'),
dict(campaign='taiwan-universities',topic='nthu-tohoku-internal-deadline',title='清華東北大學短期課程：校內10月26日截止',url='https://globalednews.com/taiwan-universities/',section='國內大學選校選系資料庫｜找到適合你的學習方向',sectionUrl='https://globalednews.com/taiwan-universities/',key='taiwan',lines=['清華 × 東北大學TESP','校內10月26日截止'],summary='清華公告東北大學TESP追加招生，課程12月3日至18日；清華校內10月26日23:59台灣時間截止，主辦另為10月29日日本時間。',advice='課程費用11萬日圓，須查本校資格與提名，不適用所有台灣學生。另查核臺大學海說明會、陽明交大姐妹校短期課程清單。照片為清華校園資料照。')]
for it in items:
 p=photos[it['key']];attr=f'https://globalednews.com/images/daily/{D}/credits.html#{it["key"]}'
 credit=f'照片：{p["author"]} / {p["license"]}；裁切加字。'
 head=it['section']+'\n'+it['sectionUrl']+'\n\n最新消息｜'+it['title']
 end='免費加入環球教育新聞會員！\n每週教育新聞與申請提醒；免費且可隨時取消。\nhttps://globalednews.com/newsletter/'
 body=head+'\n'+it['summary']+'\n\n'+it['advice']+'\n全文：'+it['url']+'\n\n'+end+'\n\n'+credit+'\n'+attr
 th=head+'\n'+it['summary']+'\n校園資料照。\n\n'+end+'\n'+credit+'\n'+attr
 assert len(th)<=500,(it['campaign'],len(th))
 d=dict(date=D,version='v1',copyVersion=D+'-v1',status='prepared',campaign=it['campaign'],articleTitle=it['title'],articleUrl=it['url'],shortHook=it['title'],headlineLines=it['lines'],backgroundImage=p['file'],socialImage=f'public/images/social/{D}/{it["topic"]}.jpg',imageAlt=it['title']+'；'+it['advice'].split('照片為')[-1],imageCredit=p['author'],imageSource=p['source'],imageLicense=p['license'],imageLicenseUrl=p['licenseUrl'],attributionUrl=attr,topic=it['topic'],category=it['campaign'],CTA='免費加入會員',plannedPublishDate=D,publishedPosts=[],facebookCopy=body,instagramCopy=body+'\n可複製網址至瀏覽器閱讀。',threadsCopy=th,linkedinCopy=body,threadsSync=False)
 save(f'docs/social-posts/{D}/{it["campaign"]}--{it["topic"]}.json',d)
for x in r['newsPrepared'][1:]+r['scholarshipChecks'][1:]:
 campaign='news' if '/news/' in x['url'] else 'scholarship'
 save(f'docs/social-posts/{D}/{campaign}--{x["slug"]}--archive.json',dict(date=D,status='prepared-not-selected',campaign=campaign,articleTitle=x['title'],articleUrl=x['url'],sources=x['sources'],plannedPublishDate=None))
r.update(currentPhase='BUILD',preparedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE'],gaps=['BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
save(f'docs/daily-reports/{D}.json',r)
print('Prepared four campaigns; Threads lengths:',[len(load(str(p))['threadsCopy']) for p in (R/f'docs/social-posts/{D}').glob('*.json') if '--archive' not in p.name and p.name!='publication-log.json'])
