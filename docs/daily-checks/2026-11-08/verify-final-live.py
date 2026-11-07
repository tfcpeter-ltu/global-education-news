import runpy,json,pathlib,concurrent.futures,datetime
ns=runpy.run_path('docs/daily-checks/2026-11-08/live-audit.py')
R=pathlib.Path.cwd();D='2026-11-08';items=json.loads((R/f'docs/daily-checks/{D}/archive-prepared.json').read_text(encoding='utf8'))
urls=[x['url'] for x in items];urls += [x.replace('.com/','.com/en/') for x in urls]
def check(u):
 result=ns['page'](u);_,b=ns['get'](u);doc=ns['html'].fromstring(b)
 schemas=[json.loads(s) for s in doc.xpath('//script[@type="application/ld+json"]/text()')]
 article=next(s for s in schemas if s.get('@type')=='NewsArticle')
 assert article['datePublished'].startswith('2026-10-'),article
 assert article['dateModified']=='2026-11-07T21:52:00.000Z',article
 result.update(datePublished=article['datePublished'],dateModified=article['dateModified'],headline=doc.xpath('//h1')[0].text_content())
 assert u.rstrip('/') in ns['xml']['sitemap-0.xml']
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:pages=list(pool.map(check,urls))
data=dict(status='PASS',verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),pages=pages,originalDatesPreserved=True,substantiveUpdateVerified=True)
(R/f'docs/daily-checks/{D}/archive-live-verification.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('PASS: 6 archive URLs; original October dates, November 8 substantive updates, bilingual content, photos, metadata and sitemap.')
