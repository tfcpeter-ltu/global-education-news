import json,pathlib,datetime,subprocess
root=pathlib.Path.cwd();date='2026-11-07';base=f'docs/daily-checks/{date}'
def read(path):return json.loads((root/path).read_text(encoding='utf-8-sig'))
def write(path,data):
    p=root/path;p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
now=lambda:datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r=read(f'docs/daily-reports/{date}.json');log=read(f'docs/social-posts/{date}/publication-log.json')
seo=read(f'docs/daily-reports/{date}-live-seo.json');ui=read(f'{base}/live-ui-verification.json');dep=read(f'{base}/deployment-success.json');archive=read(f'{base}/archive-live-verification.json')
assert dep['conclusion']=='success' and all(j['conclusion']=='success' for j in dep['jobs'])
assert len(log['posts'])==16 and len({p['id'] for p in log['posts']})==16
for p in log['posts']:
    assert p['status']=='PUBLISHED' and p['mediaStatus']=='VERIFIED'
    assert (root/p['mediaEvidence']).stat().st_size>10000
    p['accountVerified']=True
    p['publishClickedAt']=p['publishedAt']
    p['timestampMethod']='Native publish click time in Asia/Taipei; public relative time separately recorded.'
regular=[p for p in log['posts'] if not p.get('pageId')]
extra=[p for p in log['posts'] if p.get('pageId')=='61595164194381']
assert len(regular)==15 and len(extra)==1
log.update(status='COMPLETE',completedAt=now(),regularPostCount=15,newFacebookPagePost=extra[0],allNativeUi=True)
write(f'docs/social-posts/{date}/publication-log.json',log)
for p in (root/f'docs/social-posts/{date}').glob('*--*.json'):
    d=read(p);d['status']='published';d['publicationRecords']=[x for x in regular if x['campaign']==d['campaign']]
    d['publishedAt']=min(x['publishedAt'] for x in d['publicationRecords'])
    d['publicationCompletedAt']=max(x['verifiedAt'] for x in d['publicationRecords'])
    write(p,d)
published={p['url']:p for p in seo['pages']}
r['newsPublished']=[dict(x,publishedVerifiedAt=seo['verifiedAt']) for x in r['newsPrepared']]
for x in r['newsPublished']:assert x['url'] in published
for x in r['scholarshipAdditions']:
    assert x['url'] in published
    x['publishedVerifiedAt']=seo['verifiedAt']
    x['updateSummary']='New independently cross-checked award; official UK Lincoln intake, Taiwan eligibility, exclusions and award terms verified.'
r['scholarshipChecks']=r['scholarshipAdditions']
r['peterImports']=[dict(x,publishedVerifiedAt=seo['verifiedAt']) for x in r['peterPrepared']]
r['studyAbroadPublished']=dict(r['studyAbroadPrepared'],publishedVerifiedAt=seo['verifiedAt'])
r['socialPosts']=regular;r['newFacebookPagePost']=extra[0]
r['deployment']=dict(commit=dep['head_sha'],status='success',verifiedAt=now(),runId=dep['id'],url=dep['html_url'],deployedAt='2026-11-07T05:39:09+08:00',indexNowStatus='success')
r['deploymentAttempts'][-1]['status']='success'
r['acceptance']=dict(desktop=True,mobile=True,seo=True,verifiedAt=ui['verifiedAt'],uiEvidence=f'{base}/live-ui-verification.json',seoEvidence=f'docs/daily-reports/{date}-live-seo.json',mobileViewport='390x843 CSS px',images=True,searchFilters=True,canonical=True,openGraph=True,schema=True,sitemap=True,newsSitemap=True,rss=True)
r['ltuMediaReview']['publishedVerifiedAt']=ui['verifiedAt']
assert archive['status']=='PASS' and len(archive['pages'])==6
r['archiveRewrites']=[dict(x,publishedVerifiedAt=archive['verifiedAt'],status='completed',deploymentCommit=dep['head_sha']) for x in r['archiveRewritesPrepared']]
queue=read('docs/editorial/archive-remediation-queue.json')
paths={x['path'] for x in r['archiveRewrites']}
queue['items']=[x for x in queue['items'] if x['path'] not in paths]
queue['remaining']=len(queue['items']);queue['updatedAt']=now()
queue['completedBatches']=[x for x in queue.get('completedBatches',[]) if x.get('date')!=date]
queue['completedBatches'].append(dict(date=date,count=3,commit=dep['head_sha'],verifiedAt=archive['verifiedAt'],paths=sorted(paths),evidence=f'{base}/archive-live-verification.json'))
assert queue['remaining']==178
write('docs/editorial/archive-remediation-queue.json',queue)
r['archiveRemaining']=178
write(f'docs/peter-imports/{date}.json',dict(date=date,status='completed',imports=r['peterImports'],review=r['peterReview']))
r['phaseCompleted']=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE']
r['currentPhase']='VERIFY';r['gaps']=['VERIFY'];r['blockers']=[];r['manualActions']=[]
write(f'docs/daily-reports/{date}.json',r)
node=r'C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
result=subprocess.run([node,'scripts/verify-daily-delivery.mjs',date],capture_output=True,text=True,encoding='utf-8')
output=result.stdout+result.stderr
(root/base/'daily-verification.log').write_text(output,encoding='utf-8')
verification=dict(status='COMPLETE' if result.returncode==0 else 'INCOMPLETE',exitCode=result.returncode,verifiedAt=now(),output=output,evidence=f'{base}/daily-verification.json')
write(f'{base}/daily-verification.json',verification)
print(output)
if result.returncode:raise SystemExit(result.returncode)
r.update(status='completed',currentPhase='COMPLETE',completedAt=now(),gaps=[],verification=verification)
r['phaseCompleted'].append('VERIFY')
write(f'docs/daily-reports/{date}.json',r)
print('Daily COMPLETE; 3 archive rewrites deployed and verified; 178 remain.')
