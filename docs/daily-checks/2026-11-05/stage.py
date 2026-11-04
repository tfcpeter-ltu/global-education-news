import pathlib,json,datetime,hashlib,subprocess
S=pathlib.Path.cwd();D='2026-11-05';E=S/f'docs/daily-checks/{D}';R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
load=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
def save(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
rp=S/f'docs/daily-reports/{D}.json';r=load(rp);now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
r['build']=dict(status='success',verifiedAt=now,evidence=f'docs/daily-checks/{D}',checks=['Astro622 routes','901 bilingual page pairs; zero new untranslated strings','photo previews','scholarship status','search','bilingual','Facebook evidence','public safety','Vlog','SEO'])
r['ltuReview']=dict(status='partial-source-safety-block',checkedAt=now,rotationIndices=[5,6,7],sources=[dict(url='https://www.ctee.com.tw/news/20250723702079-431204',status='native-full-text-read',note='July23 2025 archive report; summer school and Trent cooperation.'),dict(url='https://udn.com/news/story/6898/9271435',status='full-text-read',note='January17 archive; retained original date.'),dict(url='https://www.setn.com/m/news.aspx?newsid=1688074',status='browser-safety-block',note='No bypass attempted; current source remains unverified.')])
for a in r['scholarshipAdditions'][:2]:
 a['sources'].append(dict(label='Current Management MSc January2027 applications',url='https://www.brighton.ac.uk/courses/study/management-msc-pgcert-pgdip.aspx'))
r.update(currentPhase='COMMIT_DEPLOY',phaseCompleted=['PREFLIGHT','PREPARE','BUILD'],gaps=['LTU_SOURCE_REVIEW','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'],updatedAt=now);save(rp,r)
audit=dict(date=D,verifiedAt=now,news=r['newsPrepared'],scholarships=r['scholarshipAdditions'],peter=r['peterReview'],campus=r['campusLeads'],ltu=r['ltuReview'],exclusions=['Collegedunia denied region access; replaced with Nam Phong signed January2027 comparative admissions guide.','Already imported Peter Jobs post and membership promotion excluded.'],sourceAssessment=['India: PIE AIEC original reporting corroborated against official session programme; not a new government policy.','Canada: October22 federal funding release plus independently analysed budget comparison in UAN World; not a new Taiwan scholarship call.','Arab region: November3 UNESCO report and November2 QNA conference interview; two report contexts, not independently calculated statistical datasets.','Brighton: official award terms control; Nam Phong corroborates three distinct amounts and January entry. Management MSc explicitly accepts January2027 applications; AI course also open for STEM. Deans and STEM cannot be combined.','Taiwan eligibility is conditional on international fee status, self funding and other official exclusions; no automatic award guarantee.'],photos='Nine Commons licence records read; original photos and four headline crops visually inspected; all archive scenes labelled.')
save(E/'source-audit.json',audit)
for p in (S/f'docs/social-posts/{D}').glob('*.json'):
 o=load(p)
 if o.get('campaign') in ['news','taiwan-universities']:
  note='照片為印度科學研究院資料照，非論壇或海外分校現場。' if o['campaign']=='news' else '照片為政大校園資料照，非台大。'
  o['threadsCopy']+='\n'+note
  assert len(o['threadsCopy'])<=500
  save(p,o)
credits=S/'public/images/share-photos/credits.json';c=load(credits);registry=S/'public/images/share-photos/sources.json';sources=load(registry);runtime=load(R/'public/images/share-photos/sources.json')
files=[x['publishedPath'] for x in r['newsPrepared']+r['scholarshipAdditions']]+[r['studyAbroadPrepared']['publishedPath'],'src/data/peter-articles.json','src/data/i18n/en-overrides.json','public/images/share-photos/credits.json',f'docs/daily-reports/{D}.json',f'docs/image-licenses/{D}.json',f'docs/daily-checks/{D}/source-audit.json']
for base in [f'public/images/daily/{D}',f'public/images/social/{D}',f'docs/social-posts/{D}']:files += [p.relative_to(S).as_posix() for p in (S/base).rglob('*') if p.is_file()]
for photo in load(S/f'docs/image-licenses/{D}.json'):
 for u in ['/'+photo['file'].removeprefix('public/'),'https://globalednews.com/'+photo['file'].removeprefix('public/')]:
  key=hashlib.sha256(u.encode()).hexdigest()[:24]+'.jpg'
  if (S/'public/images/share-photos'/key).exists():
   files.append('public/images/share-photos/'+key);c[key]=dict(source=photo['source'],artist=photo['author'],license=photo['license'],licenseUrl=photo['licenseUrl'])
   if key in runtime:sources[key]=runtime[key]
save(credits,c);save(registry,sources);files.append('public/images/share-photos/sources.json')
files=sorted(set(files));save(E/'stage-manifest.json',files);(E/'stage-paths.txt').write_bytes(('\0'.join(files)+'\0').encode('utf8'))
subprocess.run(['git','add','--pathspec-from-file='+str(E/'stage-paths.txt'),'--pathspec-file-nul'],check=True)
s=pathlib.Path('docs/daily-checks/2026-11-04/live-audit.py').read_text(encoding='utf8').replace('2026-11-04',D);(E/'live-audit.py').write_text(s,encoding='utf8')
print('Staged',len(files),'explicit daily deliverables')
