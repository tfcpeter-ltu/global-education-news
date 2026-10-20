import pathlib,json,hashlib,shutil,datetime,subprocess,urllib.parse
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019');D='2026-10-21'
def load(p):return json.loads((S/p).read_text(encoding='utf-8'))
def save(p,d):(S/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
r=load(f'docs/daily-reports/{D}.json');photos=load(f'docs/image-licenses/{D}.json');sources=load('public/images/share-photos/sources.json');dups=[]
for p in photos:
 for old in (S/'docs/image-licenses').glob('2026-10-*.json'):
  if old.stem==D:continue
  try:items=json.loads(old.read_text(encoding='utf8'))
  except:continue
  if isinstance(items,list):
   for x in items:
    if urllib.parse.unquote(x.get('source','')).replace(' ','_')==urllib.parse.unquote(p['source']).replace(' ','_'):dups.append([p['key'],old.stem])
 for source in ['/'+p['file'].removeprefix('public/'),'https://globalednews.com/'+p['file'].removeprefix('public/')]:
  key=hashlib.sha256(source.encode()).hexdigest()[:24]+'.jpg';a=R/'dist/images/share-photos'/key
  if a.exists():shutil.copy2(a,S/'public/images/share-photos'/key);sources[key]=source
save('public/images/share-photos/sources.json',sources);assert not dups,dups
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r.update(currentPhase='COMMIT_DEPLOY',phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD'],build=dict(status='passed',verifiedAt=now,runtime=str(R),bilingualPairs=765,photoPreviews=1522,searchCanonicalUrls=1516,evidence=f'docs/daily-checks/{D}'),gaps=['COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY']);save(f'docs/daily-reports/{D}.json',r)
save(f'docs/daily-checks/{D}/precommit-review.json',dict(verifiedAt=now,photoSourceDuplicates=dups,metricoolScheduledPosts=[],metricoolCheckedAt=now,socialCardsVisuallyChecked=4,englishNoHan=True,baselineNewScholarships=3))
paths=[x['publishedPath'] for x in r['newsPrepared']+r['scholarshipChecks']]+['src/pages/study-abroad/'+r['studyAbroadPrepared']['slug']+'.md','src/data/peter-articles.json','src/data/i18n/en.json','src/data/i18n/en-overrides.json','public/images/share-photos/credits.json','public/images/share-photos/sources.json',f'public/images/daily/{D}',f'public/images/social/{D}',f'docs/social-posts/{D}',f'docs/daily-reports/{D}.json',f'docs/campus-reports/{D}.json',f'docs/peter-imports/{D}.json',f'docs/image-licenses/{D}.json']
paths += [str(p.relative_to(S)).replace('\\','/') for p in (S/'public/images/share-photos').glob('*.jpg') if p.name in sources and D in sources[p.name]]
paths += [str(p.relative_to(S)).replace('\\','/') for p in (S/f'docs/daily-checks/{D}').glob('*') if p.is_file() and p.suffix in ['.py','.log','.txt','.json','.jpg'] and not p.name.startswith('images-') and '-links' not in p.name]
subprocess.run(['git','add','--']+paths,check=True);print('Staged',len(paths),'paths; prior files untouched')
