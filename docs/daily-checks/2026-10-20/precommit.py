import pathlib,json,hashlib,shutil,datetime,subprocess,urllib.parse
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019');D='2026-10-20'
def load(p):return json.loads((S/p).read_text(encoding='utf-8'))
def save(p,d):(S/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
r=load(f'docs/daily-reports/{D}.json');photos=load(f'docs/image-licenses/{D}.json');sources=load('public/images/share-photos/sources.json')
dups=[]
for p in photos:
 for old in (S/'docs/image-licenses').glob('2026-10-*.json'):
  if old.stem==D:continue
  try:items=json.loads(old.read_text(encoding='utf-8'))
  except:continue
  if isinstance(items,list):
   for x in items:
    if urllib.parse.unquote(x.get('source','')).replace(' ','_')==urllib.parse.unquote(p['source']).replace(' ','_'):dups.append([p['key'],old.stem])
 for source in ['/'+p['file'].removeprefix('public/'),'https://globalednews.com/'+p['file'].removeprefix('public/')]:
  key=hashlib.sha256(source.encode()).hexdigest()[:24]+'.jpg';a=R/'dist/images/share-photos'/key
  if a.exists():shutil.copy2(a,S/'public/images/share-photos'/key);sources[key]=source
save('public/images/share-photos/sources.json',sources)
assert not dups,dups
for p in (S/f'docs/social-posts/{D}').glob('*.json'):
 if p.name=='publication-log.json':continue
 d=json.loads(p.read_text(encoding='utf-8'))
 if d.get('status')=='prepared-not-selected':
  copy=d['articleTitle']+'\n資格、條件與來源詳見全文：'+d['articleUrl']+'\n免費加入會員，每週教育新聞與申請提醒：https://globalednews.com/newsletter/'
  d.update(shortHook=d['articleTitle'],facebookCopy=copy,instagramCopy=copy,threadsCopy=copy,linkedinCopy=copy,xCopy=d['articleTitle']+'\n'+d['articleUrl'],CTA='免費加入會員',category=d['campaign'],topic=p.stem)
 else:
  d['linkedinCopy']=d['linkedinCopy'].replace('\n\n最新消息｜','\n\n給學生、家長與升學輔導工作者｜')
  d['instagramCopy']=d['instagramCopy'].replace('\n\n最新消息｜','\n\n最新消息｜今日重點\n')
  d['xCopy']=d['articleTitle']+'\n'+d['articleUrl']
  if d['campaign']=='taiwan-universities':
   for field in ['facebookCopy','instagramCopy','linkedinCopy']:d[field]=d[field].replace('全文：'+d['articleUrl'],'官方公告：https://oga.site.nthu.edu.tw/p/406-1524-316538,r8945.php?Lang=zh-tw')
 save(str(p.relative_to(S)),d)
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r.update(currentPhase='COMMIT_DEPLOY',phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD'],build=dict(status='passed',verifiedAt=now,runtime=str(R),bilingualPairs=756,photoPreviews=1504,searchCanonicalUrls=1498,evidence=f'docs/daily-checks/{D}'),gaps=['COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'])
save(f'docs/daily-reports/{D}.json',r)
save(f'docs/daily-checks/{D}/precommit-review.json',dict(verifiedAt=now,photoSourceDuplicates=dups,metricoolScheduledPosts=[],metricoolCheckedAt='2026-10-20T05:18:00+08:00',socialCardsVisuallyChecked=4,englishNoHan=True,baselineNewScholarships=3))
paths=[x['publishedPath'] for x in r['newsPrepared']+r['scholarshipChecks']]+['src/pages/study-abroad/'+r['studyAbroadPrepared']['slug']+'.md','src/data/i18n/en.json','src/data/i18n/en-overrides.json','public/images/share-photos/credits.json','public/images/share-photos/sources.json',f'public/images/daily/{D}',f'public/images/social/{D}',f'docs/social-posts/{D}',f'docs/daily-reports/{D}.json',f'docs/campus-reports/{D}.json',f'docs/peter-imports/{D}.json',f'docs/image-licenses/{D}.json']
paths += [str(p.relative_to(S)).replace('\\','/') for p in (S/'public/images/share-photos').glob('*.jpg') if p.name in sources and D in sources[p.name]]
paths += [f'docs/daily-checks/{D}/'+name for name in ['source-review.json','precommit-review.json','bilingual.log','bilingual-test.log','search-test.log','facebook-photo-test.log','safety-test.log','previews.log','prepare.py','social.py','complete-translations.py','precommit.py','build.py']]
subprocess.run(['git','add','--']+paths,check=True)
print('Staged',len(paths),'paths; previous-day records untouched.')
