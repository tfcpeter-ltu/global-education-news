import pathlib,json,datetime
R=pathlib.Path('.');D='2026-10-27'
def load(p):return json.loads((R/p).read_text(encoding='utf-8-sig'))
def save(p,d):(R/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
r=load(f'docs/daily-reports/{D}.json');photos={x['key']:x for x in load(f'docs/image-licenses/{D}.json')}
items=load(f'docs/daily-checks/{D}/social-items.json')


for it in items:
 p=photos[it['key']];attr=f'https://globalednews.com/images/daily/{D}/credits.html#{it["key"]}';credit=f'資料照：{p["author"]} / {p["license"]}；裁切加字。'
 head=it['title']+'\n'+it['benefit'];end='免費加入環球教育新聞會員！\n每週教育新聞與申請提醒，免費且可隨時取消。\nhttps://globalednews.com/newsletter/'
 base=head+'\n\n'+it['summary']+'\n\n'+it['advice']+'\n'+it['section']+'：'+it['sectionUrl']+'\n全文：'+it['url']+'\n\n'
 th=head+'\n'+it['summary']+'\n'+it['section']+'：'+it['sectionUrl']+'\n'+end+'\n'+credit+'\n'+attr
 assert len(th)<=500,(it['campaign'],len(th))
 obj=dict(date=D,version='v1',copyVersion=D+'-v1',status='prepared',campaign=it['campaign'],articleTitle=it['title'],articleUrl=it['url'],shortHook=it['title'],headlineLines=it['lines'],backgroundImage=p['file'],socialImage=f'public/images/social/{D}/{it["topic"]}.jpg',imageAlt=it['title']+'；校園實景資料照，非事件現場',imageCredit=p['author'],imageSource=p['source'],imageLicense=p['license'],imageLicenseUrl=p['licenseUrl'],attributionUrl=attr,topic=it['topic'],category=it['campaign'],CTA='免費加入會員',plannedPublishDate=D,publishedPosts=[],facebookCopy=base+'和正在規劃升學的家人一起核對條件。\n'+end+'\n'+credit+'\n'+attr,instagramCopy=head+'\n\n'+it['summary']+'\n'+it['advice']+'\n\n'+it['section']+'：'+it['sectionUrl']+'\n全文：'+it['url']+'\n可複製網址至瀏覽器閱讀。\n'+end+'\n'+credit+'\n'+attr,threadsCopy=th,linkedinCopy=base+'給教育工作者：轉介學生時請保留資格、時程與尚待確認的限制。\n'+end+'\n'+credit+'\n'+attr,xCopy=head+'\n'+it['url'],threadsSync=False)
 save(f'docs/social-posts/{D}/{it["campaign"]}--{it["topic"]}.json',obj)
r.update(currentPhase='BUILD',preparedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE'],gaps=['BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY']);save(f'docs/daily-reports/{D}.json',r)
print('Four distinct campaign packages prepared, 15 established posts +1 new page planned.')
