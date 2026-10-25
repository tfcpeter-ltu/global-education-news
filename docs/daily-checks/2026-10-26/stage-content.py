import pathlib,json,shutil,subprocess,datetime
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019');D='2026-10-26';E=S/'docs/daily-checks'/D
shutil.copy2(R/'public/images/share-photos/sources.json',S/'public/images/share-photos/sources.json')
p=S/'docs/daily-reports'/f'{D}.json';r=json.loads(p.read_text(encoding='utf8'));r['phaseCompleted'].append('BUILD');r['currentPhase']='COMMIT_DEPLOY';r['build']={'status':'passed','completedAt':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),'astroPages':543,'bilingualPairs':812,'photoPreviews':1616,'searchUrls':1610,'checks':['search','bilingual','facebook-photo-evidence','public-service-safety','vlog']};p.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
files=['public/images/share-photos/credits.json','public/images/share-photos/sources.json','src/data/i18n/en.json','src/data/i18n/en-overrides.json','src/data/scholarships-seed.json',f'docs/daily-reports/{D}.json',f'docs/image-licenses/{D}.json',f'docs/campus-reports/{D}.json']
for x in r['newsPrepared']+r['scholarshipAdditions']:files.append(x['publishedPath'])
files.append('src/pages/study-abroad/'+r['studyAbroadPrepared']['slug']+'.md')
for folder in [f'public/images/daily/{D}',f'public/images/social/{D}',f'docs/social-posts/{D}']:
 files.extend(str(p.relative_to(S)).replace('\\','/') for p in (S/folder).rglob('*') if p.is_file())
sources=json.loads((S/'public/images/share-photos/sources.json').read_text(encoding='utf8'))
files.extend('public/images/share-photos/'+key for key,val in sources.items() if D in val)
for name in ['source-review.json','astro.log','bilingual.log','search-test.log','bilingual-test.log','previews.log','facebook-photo-test.log','safety-test.log','vlog-test.log','completed-translations.json']:
 if (E/name).exists():files.append(str((E/name).relative_to(S)).replace('\\','/'))
files=sorted(set(f for f in files if (S/f).exists()))
(E/'commit-paths.json').write_text(json.dumps(files,ensure_ascii=False,indent=2),encoding='utf8')
subprocess.run(['git','add','--',*files],check=True)
print('Staged',len(files),'selected files')
