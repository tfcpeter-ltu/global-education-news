import pathlib,json,hashlib,datetime,subprocess
S=pathlib.Path.cwd();D='2026-11-10';R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def save(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
r=load(S/f'docs/daily-reports/{D}.json');now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
sourcefile=S/'public/images/share-photos/sources.json';sourcemap=load(sourcefile);runtime=load(R/'public/images/share-photos/sources.json')
keys=[]
for p in load(S/f'docs/image-licenses/{D}.json'):
 for u in ['/'+p['file'].removeprefix('public/'),'https://globalednews.com/'+p['file'].removeprefix('public/')]:
  key=hashlib.sha256(u.encode()).hexdigest()[:24]+'.jpg'
  if (S/'public/images/share-photos'/key).exists():keys.append(key);sourcemap[key]=u
save(sourcefile,sourcemap)
r.update(currentPhase='COMMIT_DEPLOY',build=dict(status='success',verifiedAt=now,runtime=str(R),pagePairs=945,logs=f'docs/daily-checks/{D}',checks=['news-depth','scholarship-status','astro','bilingual','search','facebook-photo-evidence','public-service-safety','vlog','education-seo']),gaps=['COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
r['phaseCompleted']=['PREFLIGHT','RESEARCH','PREPARE','BUILD'];save(S/f'docs/daily-reports/{D}.json',r)
paths=[x['publishedPath'] for x in r['newsPrepared']+r['scholarshipAdditions']]+[r['studyAbroadPrepared']['publishedPath']]
paths+=['src/pages/index.astro','public/study-abroad/university-data-expanded.js','src/data/i18n/en-overrides.json','src/data/i18n/en.json','src/data/scholarships-seed.json','docs/editorial/news-reviews.json',f'docs/daily-reports/{D}.json',f'docs/image-licenses/{D}.json','public/images/share-photos/sources.json']
for d in [f'public/images/daily/{D}',f'public/images/social/{D}',f'docs/social-posts/{D}']:paths.extend(p.relative_to(S).as_posix() for p in (S/d).rglob('*') if p.is_file())
paths.extend('public/images/share-photos/'+k for k in keys)
paths.extend(p.relative_to(S).as_posix() for p in (S/f'docs/daily-checks/{D}').glob('*') if p.suffix in ['.py','.log'] or p.name in ['preflight.json','runtime-sync.json','runtime-sync-review.json'])
paths=sorted(set(p for p in paths if (S/p).exists()));save(S/f'docs/daily-checks/{D}/commit-manifest.json',paths)
print(json.dumps(dict(files=len(paths),bytes=sum((S/p).stat().st_size for p in paths),paths=paths),ensure_ascii=False))
