import pathlib,json,datetime
R=pathlib.Path('.');D='2026-11-10'
load=lambda p:json.loads((R/p).read_text(encoding='utf-8-sig'))
def save(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
r=load(f'docs/daily-reports/{D}.json');photos={x['key']:x for x in load(f'docs/image-licenses/{D}.json')}
for it in load(f'docs/daily-checks/{D}/social-items.json'):
 p=photos[it['key']];attr=f'https://globalednews.com/images/daily/{D}/credits.html#{it["key"]}';credit='' if p['license']=='CC0' else f'攝影：{p["author"]}／{p["license"]}\n{attr}'
 head=it['title']+'\n'+it['benefit'];end='追蹤環球教育新聞，免費加入會員：\n每週國際教育新聞與新增獎學金摘要、連結。\nhttps://globalednews.com/newsletter/'
 base=head+'\n\n'+it['summary']+'\n\n'+it['advice']+'\n'+it['section']+'：'+it['sectionUrl']+'\n'+('全文：'+it['url']+'\n' if it['url']!=it['sectionUrl'] else '')+('活動公告：'+it['sourceUrl']+'\n' if it.get('sourceUrl') else '')
 th=head+'\n'+it['summary']+'\n'+it['sectionUrl']+'\n'+end+('\n'+credit if credit else '')
 assert len(th)<=500,(it['campaign'],len(th))
 obj=dict(date=D,version='v1',copyVersion=D+'-v1',status='prepared',campaign=it['campaign'],articleTitle=it['title'],articleUrl=it['url'],shortHook=it['title'],headlineLines=it['lines'] if it['campaign']!='scholarship' else None,backgroundImage=p['file'],socialImage=f'public/images/social/{D}/{it["topic"]}.jpg',imageAlt=it['title'],imageCredit=p['author'],imageSource=p['source'],imageLicense=p['license'],imageLicenseUrl=p['licenseUrl'],attributionUrl=attr,topic=it['topic'],category=it['campaign'],CTA='免費加入會員',plannedPublishDate=D,publishedPosts=[],facebookCopy=base+'\n'+end+('\n'+credit if credit else ''),instagramCopy=base+'\n網址可複製到瀏覽器閱讀。\n'+end+('\n'+credit if credit else ''),threadsCopy=th,linkedinCopy=base+'\n'+end+('\n'+credit if credit else ''),threadsSync=False)
 if it['campaign']=='scholarship':obj.update(status='awaiting-live-count-and-cover',facebookCopy='',instagramCopy='',threadsCopy='',linkedinCopy='',countVerified=False)
 if it['campaign']=='study-abroad':obj.update(country='United Kingdom',schoolName='Birmingham City University',storyAngle='Campus locations, course fit and travel budgeting',selectionReason='Rotate from Australia Swinburne to UK BCU; official map, Taiwan admissions and independent campus guide checked.',navigatorUrl=it['sectionUrl'],destinationUrl=it['url'],sourcePaths=['public/study-abroad/university-data-expanded.js'],sources=r['studyAbroadPrepared']['sources'],verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat())
 save(f'docs/social-posts/{D}/{it["campaign"]}--{it["topic"]}.json',obj)
r.update(currentPhase='BUILD',preparedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE'],gaps=['BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
save(f'docs/daily-reports/{D}.json',r)
print('Prepared campaign JSON; scholarship copy waits for deployed actual count and cover.')
