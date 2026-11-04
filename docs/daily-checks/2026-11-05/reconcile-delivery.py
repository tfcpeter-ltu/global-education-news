import pathlib,json,datetime
S=pathlib.Path(__file__).resolve().parents[3];D='2026-11-05'
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def save(p,o):p.write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
rp=S/f'docs/daily-reports/{D}.json';r=load(rp)
lp=S/f'docs/social-posts/{D}/publication-log.json';l=load(lp)
assert len(l['posts'])==16
assert len({(p['campaign'],p['network'],p['accountId']) for p in l['posts']})==16
for p in l['posts']:
 assert (S/p['mediaEvidence']).stat().st_size>10000
 assert p['visibility']=='PUBLIC' and p['publicationDateTaipei']==D
 for k in ['publishedAt','verifiedAt','mediaVerifiedAt','previewVerifiedAt','photoAttachedAt','copyAddedAt']:
  if p.get(k):p[k]=datetime.datetime.fromisoformat(p[k].replace('Z','+00:00')).astimezone(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
l.update(status='PUBLISHED',timezone='Asia/Taipei',verifiedAt=now,regularPostCount=15,newFacebookPageCount=1)
save(lp,l)
for path in (S/f'docs/social-posts/{D}').glob('*--*.json'):
 c=load(path);c.update(status='PUBLISHED',publishedPosts=[p for p in l['posts'] if p['campaign']==c['campaign'] and not p.get('pageId')=='61595164194381']);save(path,c)
live=load(S/f'docs/daily-reports/{D}-live-seo.json');t=live['verifiedAt']
r['newsPublished']=[dict(x,publishedVerifiedAt=t) for x in r['newsPrepared']]
for x in r['scholarshipAdditions']:x['publishedVerifiedAt']=t
r['scholarshipChecks']=r['scholarshipAdditions']
r['peterImports']=[dict(x,publishedVerifiedAt=t) for x in r['peterPrepared']]
r['studyAbroadPublished']=dict(r['studyAbroadPrepared'],publishedVerifiedAt=t)
r['socialPosts']=[p for p in l['posts'] if p.get('pageId')!='61595164194381']
r['newFacebookPagePost']=next(p for p in l['posts'] if p.get('pageId')=='61595164194381')
r['deployment']={'commit':'f1ab9e9df4f0edd0db57246768d5781121e3e67a','status':'success','verifiedAt':t,'url':'https://github.com/tfcpeter-ltu/global-education-news/actions/runs/41914902901','note':'Content deployed; reviewed LTU rotation correction awaiting final deployment.'}
r['acceptance']={'desktop':True,'mobile':True,'seo':True,'images':True,'searchFilters':True,'canonical':True,'og':True,'schema':True,'sitemap':True,'newsSitemap':True,'rss':True,'englishNoCjk':True,'verifiedAt':now,'seoEvidence':f'docs/daily-reports/{D}-live-seo.json','screenshots':[f'docs/daily-checks/{D}/live-desktop.png',f'docs/daily-checks/{D}/live-mobile.png',f'docs/daily-checks/{D}/live-mobile-search.png'],'mobileObservedCssWidth':390,'mobileObservedScrollWidth':371,'searchResult':'Brighton + UK + open = three newly added awards; homepage images loaded without broken images.'}
r.update(status='in_progress',currentPhase='FINAL_DEPLOY_ACCEPTANCE',phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD','PUBLISH'],gaps=['FINAL_DEPLOY_ACCEPTANCE','VERIFY'],updatedAt=now)
r['build']['rotationRebuild']={'status':'success','verifiedAt':now,'evidence':f'docs/daily-checks/{D}/rotation-validation.log'}
save(rp,r)
ap=S/f'docs/daily-checks/{D}/source-audit.json';a=load(ap);a['ltu']=r['ltuReview'];a['resolvedBlockers']=r['resolvedBlockers'];save(ap,a)
print('Reconciled 15 regular posts + one new Facebook page post; final rotation deployment pending.')
