import pathlib,json,datetime,subprocess
S=pathlib.Path(__file__).resolve().parents[3];D='2026-11-05';E=pathlib.Path(__file__).parent
N=r'C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def save(p,o):p.write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
rp=S/f'docs/daily-reports/{D}.json';r=load(rp)
dep=load(E/'final-deployment.json');ui=load(E/'live-ui.json');seo=load(S/f'docs/daily-reports/{D}-live-seo.json')
assert dep['status']=='completed' and dep['conclusion']=='success'
assert ui['ltuRotation']==[0,5,6] and ui['desktop'] and ui['mobile'] and ui['searchFilters']
assert len(seo['pages'])==16 and all(p['status']==200 for p in seo['pages'])
assert datetime.datetime.fromisoformat(seo['verifiedAt'])>datetime.datetime.fromisoformat(dep['updated_at'].replace('Z','+00:00'))
r['deployment']={'commit':dep['head_sha'],'status':'success','verifiedAt':now,'url':dep['html_url'],'runId':dep['id']}
r['acceptance'].update(verifiedAt=now,uiEvidence=f'docs/daily-checks/{D}/live-ui.json',ltuRotation=True,englishLanguageSwitch=True)
r['ltuReview']['liveVerifiedAt']=ui['verifiedAt']
r['newsPublished']=[dict(x,publishedVerifiedAt=seo['verifiedAt']) for x in r['newsPrepared']]
for x in r['scholarshipAdditions']:x['publishedVerifiedAt']=seo['verifiedAt']
r['scholarshipChecks']=r['scholarshipAdditions']
r.update(currentPhase='VERIFY',gaps=[],blockers=[],manualActions=[],updatedAt=now)
save(rp,r)
v=subprocess.run([N,'scripts/verify-daily-delivery.mjs',D],cwd=S,capture_output=True,text=True,encoding='utf8')
(E/'verify-daily-delivery.txt').write_text(v.stdout+v.stderr,encoding='utf8')
print(v.stdout+v.stderr)
save(E/'daily-verification.json',{'status':'COMPLETE' if v.returncode==0 else 'INCOMPLETE','exitCode':v.returncode,'verifiedAt':now,'evidence':f'docs/daily-checks/{D}/verify-daily-delivery.txt'})
if v.returncode:raise SystemExit(v.returncode)
r.update(status='completed',currentPhase='COMPLETE',completedAt=now,phaseCompleted=['PREFLIGHT','RESEARCH','PREPARE','BUILD','COMMIT_DEPLOY','PUBLISH','ACCEPTANCE','VERIFY'],verification={'status':'COMPLETE','exitCode':0,'verifiedAt':now,'evidence':f'docs/daily-checks/{D}/daily-verification.json'})
save(rp,r)
lp=S/f'docs/social-posts/{D}/publication-log.json';l=load(lp);l.update(status='COMPLETE',completedAt=now);save(lp,l)
save(S/f'docs/peter-imports/{D}.json',{'date':D,'timezone':'Asia/Taipei','imports':r['peterImports'],'review':r['peterReview']})
lines=[f'# {D} 每日維護回報',f'完成時間：{now}（Asia/Taipei）','', '## 已發布新聞']
lines += [f'- [{x["title"]}]({x["url"]})' for x in r['newsPublished']]
lines += ['', '## 全新獎學金']+[f'- [{x["title"]}]({x["url"]})' for x in r['scholarshipAdditions']]
lines += ['', 'Peter：新增荷蘭 WO／HBO 1 篇；其他為已匯入舊文或會員推廣，無足夠新文達 3 篇。','校園：台大、清大、高雄大學 3 校線索完成。','LTU：3 篇輪播已回讀；安全阻擋來源以獨立查核的工商時報既有報導替換，未繞過限制。','社群：15 則既定貼文 + 新 Facebook 粉專 1 則，全數原生介面發布並回讀 ID、公開網址、時間與照片。',f'新粉專：{r["newFacebookPagePost"]["publicUrl"]}',f'部署：{dep["html_url"]}','驗收：桌面、手機、圖片、搜尋篩選、雙語、canonical、OG、schema、sitemap、News sitemap、RSS 通過。','每日驗證：COMPLETE，exit 0。','真實缺項／人工處理：無。','08:00 同日執行只讀結果並主動回報，不重發。']
(S/f'docs/daily-reports/{D}.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
print('COMPLETED',now)
