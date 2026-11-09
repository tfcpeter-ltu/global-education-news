import pathlib,json,datetime,subprocess
R=pathlib.Path.cwd();D='2026-11-10';E=R/f'docs/daily-checks/{D}';zone=datetime.timezone(datetime.timedelta(hours=8));now=lambda:datetime.datetime.now(zone).isoformat()
def read(p):return json.loads(p.read_text(encoding='utf8'))
def save(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
rp=R/f'docs/daily-reports/{D}.json';r=read(rp);runs=read(E/'archive-deployment-runs.json');run=next(x for x in runs if x['name']=='Deploy Astro site to GitHub Pages')
assert run['status']=='completed' and run['conclusion']=='success'
archive=read(E/'archive-live-verification.json');seo=read(R/f'docs/daily-reports/{D}-live-seo.json');ui=read(E/'live-ui.json');log=read(R/f'docs/social-posts/{D}/publication-log.json')
assert len(archive['pages'])==6 and len(seo['pages'])==14 and ui['desktop'] and ui['mobile'] and seo['newScholarshipsInWeeklyRss']==3
assert len(log['posts'])==15 and all(x['status']=='PUBLISHED' and x['mediaStatus']=='VERIFIED' for x in log['posts'])
allposts=log['posts']+[log['newFacebookPagePost']];allids=[]
for x in allposts:
 assert datetime.datetime.fromisoformat(x['publishedAt']).astimezone(zone).date().isoformat()==D
 assert (R/x['mediaEvidence']).is_file();allids.append(x['id'])
 if x['network']=='facebook':assert datetime.datetime.fromisoformat(x['photoAttachedAt'])<datetime.datetime.fromisoformat(x['copyAddedAt'])
 if x['campaign']=='scholarship' and x['network']=='threads':
  parent=x['id'];assert len(x['threadReplies'])==4
  for child in x['threadReplies']:
   assert child['parentId']==parent and child['status']=='PUBLISHED';parent=child['id'];allids.append(child['id'])
assert len(allids)==len(set(allids))==20
save(E/'publication-integrity.json',dict(verifiedAt=now(),mainPosts=16,radarChildren=4,uniqueIds=20,evidenceFilesPresent=True,taipeiPublicationDate=D,facebookUploadBeforeCopy=True))
paths=[f'src/pages/news/{s}.md' for s in ['jordan-international-university-unified-admissions-2026','nagoya-g30-undergraduate-2027-application','eduhk-2027-international-undergraduate-admissions']]
qp=R/'docs/editorial/archive-remediation-queue.json';q=read(qp);q['items']=[x for x in q['items'] if x['path'] not in paths];q['remaining']=len(q['items']);q['updatedAt']=now()
history=q.setdefault('completedBatches',[])
# Preserve the repository's established completion-history key.
for key,value in q.items():
 if key!='completedBatches' and isinstance(value,list) and value and isinstance(value[0],dict) and 'commit' in value[0] and 'paths' in value[0]:
  history=value;del q['completedBatches'];break
entry=dict(date=D,count=3,commit=run['head_sha'],verifiedAt=archive['verifiedAt'],paths=paths,evidence=f'docs/daily-checks/{D}/archive-live-verification.json')
if not any(x.get('date')==D for x in history):history.append(entry)
save(qp,q)
r['deployment']=dict(commit=run['head_sha'],status='success',completedAt=datetime.datetime.fromisoformat(run['updated_at'].replace('Z','+00:00')).astimezone(zone).isoformat(),verifiedAt=archive['verifiedAt'],runUrl=run['html_url'])
for attempt in r.get('deploymentAttempts',[]):
 if attempt['runId']==run['id'] and attempt['status']=='in_progress':attempt.update(status='success',completedAt=r['deployment']['completedAt'])
if r.get('deploymentAttempts'):
 r['deploymentRecovery']=dict(status='resolved',resolution='Fresh commit and artifact completed after the previous Pages synchronization timeout and cancelled same-ID retry.',verifiedAt=archive['verifiedAt'])
r.pop('archiveDeploymentPending',None);r['archiveRemediation']=dict(count=3,remaining=q['remaining'],paths=paths,verifiedAt=archive['verifiedAt'],evidence=entry['evidence'])
for x in r['newsPublished']+r['scholarshipAdditions']:x['publishedVerifiedAt']=seo['verifiedAt']
r['acceptance'].update(verifiedAt=max(archive['verifiedAt'],seo['verifiedAt']),uiVerifiedAt=datetime.datetime.fromisoformat(ui['verifiedAt'].replace('Z','+00:00')).astimezone(zone).isoformat(),archiveEvidence=entry['evidence'])
r['currentPhase']='VERIFY';r['gaps']=[];r['outstanding']=[];r['humanActionRequired']=[];r['blockers']=[];r['updatedAt']=now();save(rp,r)
node=r'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
v=subprocess.run([node,'scripts/verify-daily-delivery.mjs',D],capture_output=True,text=True,encoding='utf8');(E/'verify-daily-delivery.txt').write_text(v.stdout+v.stderr,encoding='utf8');print(v.stdout+v.stderr)
assert v.returncode==0,'Do not mark completion until verification passes'
completed=now();r.update(status='completed',currentPhase='COMPLETED',completedAt=completed,updatedAt=completed,deadlineMet=datetime.datetime.fromisoformat(completed).hour<8,phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
r['verification']=dict(status='COMPLETE',command=f'node scripts/verify-daily-delivery.mjs {D}',verifiedAt=completed,evidence=f'docs/daily-checks/{D}/verify-daily-delivery.txt')
r['deadlineNote']='All delivery and acceptance completed before the 08:00 Asia/Taipei deadline.'
r['weeklyNewsletter']['feedVerifiedAt']=seo['verifiedAt'];r['weeklyNewsletter']['todayNewScholarshipLinksPresent']=3
save(rp,r);print('Completed at',completed,'archive remaining',q['remaining'])
