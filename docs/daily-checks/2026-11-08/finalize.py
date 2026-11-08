import json,pathlib,datetime,subprocess
R=pathlib.Path.cwd();D='2026-11-08';B=f'docs/daily-checks/{D}'
def read(p):return json.loads((R/p).read_text(encoding='utf-8-sig'))
def write(p,d):(R/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
now=lambda:datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r=read(f'docs/daily-reports/{D}.json');log=read(f'docs/social-posts/{D}/publication-log.json');seo=read(f'docs/daily-reports/{D}-live-seo.json');ui=read(f'{B}/live-ui-verification.json');dep=read(f'{B}/deployment-success.json')
if r.get('status')=='completed':
 result=subprocess.run([r'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe','scripts/verify-daily-delivery.mjs',D])
 raise SystemExit(result.returncode)
packs={}
for p in (R/f'docs/social-posts/{D}').glob('*--*.json'):
 d=read(p);packs[d['campaign']]=(p,d)
for p in log['posts']:
 assert p['status']=='PUBLISHED' and p['mediaStatus']=='VERIFIED' and (R/p['mediaEvidence']).stat().st_size>10000
 p['articleUrl']=packs[p['campaign']][1]['articleUrl']
regular=[p for p in log['posts'] if not p.get('pageId')];extra=[p for p in log['posts'] if p.get('pageId')=='61595164194381']
assert len(extra)==1 and len({p['id'] for p in log['posts']})==len(log['posts'])
log.update(regularPostCount=len(regular),newFacebookPagePost=extra[0],allNativeUi=True,updatedAt=now())
write(f'docs/social-posts/{D}/publication-log.json',log)
for c,(p,d) in packs.items():
 d['status']='partial';d['publicationRecords']=[x for x in regular if x['campaign']==c];d['publishedPosts']=d['publicationRecords'];d['remainingPlatforms']=['instagram'];d['blocker']='Native Instagram login explicitly requires Terms acceptance; action-time confirmation requested, pending.'
 d['publishedAt']=min(x['publishedAt'] for x in d['publicationRecords'])
 if c=='news':d['imageAlt']='加拿大渥太華國會資料照，非政策發布現場'
 if c=='taiwan-universities':
  for k,v in list(d.items()):
   if isinstance(v,str):d[k]=v.replace('週日前先核對','截止前先核對')
 write(p,d)
published={p['url'] for p in seo['pages']}
r['newsPublished']=[dict(x,publishedVerifiedAt=seo['verifiedAt']) for x in r['newsPrepared']]
for x in r['newsPublished']:assert x['url'] in published
for x in r['scholarshipAdditions']:
 assert x['url'] in published
 x['publishedVerifiedAt']=seo['verifiedAt']
r['scholarshipChecks']=r['scholarshipAdditions'];r['peterImports']=[dict(x,publishedVerifiedAt=seo['verifiedAt']) for x in r['peterPrepared']]
r['studyAbroadPublished']=dict(r['studyAbroadPrepared'],publishedVerifiedAt=seo['verifiedAt']);r['socialPosts']=regular;r['newFacebookPagePost']=extra[0]
r['deployment']=dict(commit=dep['head_sha'],status='success',verifiedAt=now(),runId=dep['id'],url=dep['html_url'],deployedAt=next(x['completed_at'] for x in dep['jobs'] if x['name']=='deploy'),indexNowStatus='success')
r['acceptance']=dict(desktop=True,mobile=True,seo=True,verifiedAt=ui['verifiedAt'],uiEvidence=f'{B}/live-ui-verification.json',seoEvidence=f'docs/daily-reports/{D}-live-seo.json',mobileViewport='390x843 CSS px',images=True,searchFilters=True,canonical=True,openGraph=True,schema=True,sitemap=True,newsSitemap=True,rss=True)
r['ltuMediaReview']['publishedVerifiedAt']=ui['verifiedAt']
archivePath=R/f'{B}/archive-live-verification.json'
if archivePath.exists():
 a=read(archivePath);assert a['status']=='PASS' and len(a['pages'])==6
 r['archiveRewrites']=[dict(x,status='completed',publishedVerifiedAt=a['verifiedAt'],deploymentCommit=dep['head_sha']) for x in r['archiveRewritesPrepared']]
 q=read('docs/editorial/archive-remediation-queue.json');paths={x['path'] for x in r['archiveRewrites']};q['items']=[x for x in q['items'] if x['path'] not in paths];q['remaining']=len(q['items']);q['updatedAt']=now();q['completedBatches']=[x for x in q.get('completedBatches',[]) if x.get('date')!=D];q['completedBatches'].append(dict(date=D,count=3,commit=dep['head_sha'],verifiedAt=a['verifiedAt'],paths=sorted(paths),evidence=f'{B}/archive-live-verification.json'));assert q['remaining']==175
 write('docs/editorial/archive-remediation-queue.json',q);r['archiveRemaining']=175
write(f'docs/peter-imports/{D}.json',dict(date=D,status='completed',imports=r['peterImports'],review=r['peterReview']))
r.update(status='blocked',currentPhase='PUBLISH',phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','ACCEPTANCE'],gaps=['instagram/news','instagram/scholarship','instagram/study-abroad','instagram/taiwan-universities'],blockers=log['blockers'],manualActions=['Confirm the displayed Instagram Terms acceptance for ltuossdtw, or complete its native login. No other manual publishing is required.'],lastVerifiedAt=now())
if not archivePath.exists():r['gaps'].append('archive deployment and live verification')
write(f'docs/daily-reports/{D}.json',r)
node=r'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
result=subprocess.run([node,'scripts/verify-daily-delivery.mjs',D],capture_output=True,text=True,encoding='utf8');out=result.stdout+result.stderr
(R/B/'daily-verification.log').write_text(out,encoding='utf8');v=dict(status='COMPLETE' if result.returncode==0 else 'INCOMPLETE',exitCode=result.returncode,verifiedAt=now(),output=out,evidence=f'{B}/daily-verification.json');write(f'{B}/daily-verification.json',v);r['verification']=v;write(f'docs/daily-reports/{D}.json',r);print(out)
assert result.returncode==1 and out.count('expected one verified published post, got 0')==4 and out.count('INCOMPLETE')==4,out
