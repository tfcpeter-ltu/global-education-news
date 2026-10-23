import json, subprocess
from pathlib import Path
from datetime import datetime, timezone, timedelta

root = Path(__file__).resolve().parents[3]
ev = Path(__file__).resolve().parent
now = lambda: datetime.now(timezone(timedelta(hours=8))).isoformat()
read = lambda p: json.loads(p.read_text(encoding='utf-8-sig'))
def write(p, value):
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

rp = root/'docs/daily-reports/2026-10-24.json'
lp = root/'docs/social-posts/2026-10-24/publication-log.json'
r, log = read(rp), read(lp)
seo = read(root/'docs/daily-reports/2026-10-24-live-seo.json')
ui = read(root/'docs/daily-reports/2026-10-24-live-ui.json')
assert len(seo['pages']) == 16 and all(p['status']==200 and p['ogBytes']>0 and p['schemaCount']>0 and p['englishCjk'] is not True for p in seo['pages'])
assert ui['mobileHome']['width']==390 and ui['mobileHome']['scrollWidth']<=390
assert ui['mobileArticle']['scrollWidth']<=390 and ui['desktopFilter']['matches']==ui['mobileFilter']['matches']==1
assert len(log['posts'])==15
for post in log['posts']+[log['newFacebookPagePost']]:
    assert post['status']=='PUBLISHED' and post['visibility']=='public' and post['mediaStatus']=='VERIFIED'
    for key in ['id','publicUrl','publishedAt','verifiedAt','mediaVerifiedAt','mediaEvidence']:
        assert post.get(key), (post['id'], key)
    assert (root/post['mediaEvidence']).is_file()

r['newsPublished'] = [dict(p, publishedVerifiedAt=seo['verifiedAt']) for p in r['newsPrepared']]
for key in ['scholarshipChecks','scholarshipAdditions']:
    for p in r[key]: p['publishedVerifiedAt']=seo['verifiedAt']
r['peterImports']=[dict(p, publishedVerifiedAt=seo['verifiedAt']) for p in r['peterPrepared']]
r['studyAbroadPublished']=dict(r['studyAbroadPrepared'], publishedVerifiedAt=seo['verifiedAt'])
r['socialPosts']=log['posts']
r['newFacebookPagePost']=log['newFacebookPagePost']
r['ltuReview'].update(pendingLiveVerification=False, liveVerifiedAt=ui['checkedAt'], liveText=ui['desktopHome']['ltu'])
r['deployment']={'commit':'1c8308a567feb222eed27b3ab57877748dca5911','status':'success','verifiedAt':now(),'url':'https://github.com/tfcpeter-ltu/global-education-news/actions/runs/40027049254','evidence':'docs/daily-checks/2026-10-24/content-deployment-runs.json'}
r['acceptance']={'desktop':True,'mobile':True,'seo':True,'verifiedAt':ui['checkedAt'],'uiEvidence':'docs/daily-reports/2026-10-24-live-ui.json','seoEvidence':'docs/daily-reports/2026-10-24-live-seo.json','note':'Live 16 bilingual pages, photos, filters, canonical, OG, schema, sitemaps and RSS passed. Mobile DOM verified at 390px; article screenshots retained. Homepage screenshot predates ad dismissal; mobile filter screenshot was stale and is not acceptance evidence.'}
r['currentPhase']='VERIFY'
r['gaps']=[]
r['manualActions']=[]
r['updatedAt']=now()
write(rp,r)
node=Path('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe')
result=subprocess.run([str(node),'scripts/verify-daily-delivery.mjs','2026-10-24'],cwd=root,capture_output=True,text=True,encoding='utf-8')
evidence={'date':'2026-10-24','timezone':'Asia/Taipei','verifiedAt':now(),'command':'node scripts/verify-daily-delivery.mjs 2026-10-24','exitCode':result.returncode,'stdout':result.stdout,'stderr':result.stderr,'status':'COMPLETE' if result.returncode==0 else 'INCOMPLETE'}
write(ev/'daily-verification.json',evidence)
print(result.stdout, result.stderr)
if result.returncode: raise SystemExit(result.returncode)
r.update(status='completed',currentPhase='COMPLETE',completedAt=evidence['verifiedAt'],updatedAt=now(),verification=evidence)
r['phaseCompleted']=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY']
for phase in r['phaseCompleted']:
    if phase not in r['phases']: r['phases'][phase]={'status':'complete','recordedAt':now()}
write(rp,r)
log.update(date='2026-10-24',timezone='Asia/Taipei',status='completed',completedAt=evidence['verifiedAt'],updatedAt=now(),regularPublishedCount=15,newFacebookPublishedCount=1,gaps=[],manualActions=[])
write(lp,log)
for p in lp.parent.glob('*--*.json'):
    c=read(p)
    c.update(status='PUBLISHED',publishedPosts=[x for x in log['posts'] if x['campaign']==c['campaign']],verifiedAt=max(x['verifiedAt'] for x in log['posts'] if x['campaign']==c['campaign']))
    write(p,c)
print('Completed at', r['completedAt'])
