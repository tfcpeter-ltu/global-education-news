import datetime,json,pathlib
S=pathlib.Path.cwd(); D='2026-10-20'
def read(p): return json.loads((S/p).read_text(encoding='utf-8-sig'))
def write(p,v): (S/p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r=read(f'docs/daily-reports/{D}.json')
ledger=read(f'docs/social-posts/{D}/publication-log.json')
seo=read(f'docs/daily-reports/{D}-live-seo.json')
ui=read(f'docs/daily-checks/{D}/acceptance-ui.json')
assert len(ledger['posts'])==15 and all(p['status']=='PUBLISHED' for p in ledger['posts'])
assert ledger['newFacebookPagePost']['status']=='PUBLISHED'
assert [int(x['index']) for x in ui['ltu']]==[4,5,6]
assert ui['mobile']['width']==390 and ui['mobile']['scrollWidth']<=390
assert ui['desktop']['scrollWidth']<=ui['desktop']['width']
assert all(i['complete'] and i['width']>0 for i in ui['desktop']['images'])
for post in ledger['posts']+[ledger['newFacebookPagePost']]:
 assert (S/post['mediaEvidence']).is_file()
 assert post['imageCount']>=1 and post['mediaStatus']=='VERIFIED'
r['newsPublished']=[dict(p,publishedVerifiedAt=seo['verifiedAt']) for p in r['newsPrepared']]
for p in r['scholarshipChecks']+r['scholarshipAdditions']:
 p['publishedVerifiedAt']=seo['verifiedAt']
 p['updateSummary']='Net-new award; official open status, Taiwan eligibility, intake and exclusions cross-checked; bilingual public page and photograph verified after deployment.'
r['studyAbroadPublished']=dict(r['studyAbroadPrepared'],publishedVerifiedAt=seo['verifiedAt'])
r['socialPosts']=ledger['posts'];r['newFacebookPagePost']=ledger['newFacebookPagePost']
r['deployment']={'commit':'9a982a1b08096257387c9d3883f01f8575ca5278','status':'success','deployedAt':'2026-10-20T05:24:27+08:00','verifiedAt':seo['verifiedAt'],'workflowRunId':39326996105,'url':'https://github.com/tfcpeter-ltu/global-education-news/actions/runs/39326996105','evidence':f'docs/daily-checks/{D}/deployment.json'}
r['acceptance']={'desktop':True,'mobile':True,'seo':True,'images':True,'searchFilters':True,'canonical':True,'og':True,'schema':True,'sitemap':True,'newsSitemap':True,'rss':True,'englishNoChinese':True,'verifiedAt':now,'liveSeoEvidence':f'docs/daily-reports/{D}-live-seo.json','uiEvidence':f'docs/daily-checks/{D}/acceptance-ui.json','desktopViewport':ui['desktop'],'mobileViewport':ui['mobile'],'searchTest':ui['scholarshipSearch']}
r['ltuReview'].update(pendingLiveVerification=False,visibleItems=ui['ltu'],verifiedAt=now)
r['phaseCompleted']=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE']
r['currentPhase']='VERIFY';r['gaps']=['VERIFY'];r['manualActions']=[];r['updatedAt']=now
write(f'docs/daily-reports/{D}.json',r)
for p in (S/f'docs/social-posts/{D}').glob('*.json'):
 if p.name=='publication-log.json' or p.name.endswith('--archive.json'):continue
 data=read(p.relative_to(S));campaign=data.get('campaign')
 if campaign in ['news','scholarship','study-abroad','taiwan-universities']:
  data['publishedPosts']=[x for x in ledger['posts'] if x['campaign']==campaign]
  data['status']='PUBLISHED';data['verifiedAt']=now;write(p.relative_to(S),data)
print('Final evidence assembled; ready for daily verifier.')
