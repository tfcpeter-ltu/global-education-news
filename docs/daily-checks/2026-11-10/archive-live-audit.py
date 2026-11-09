import pathlib,json,urllib.request,datetime,re,concurrent.futures
from lxml import html
R=pathlib.Path.cwd();slugs=['jordan-international-university-unified-admissions-2026','nagoya-g30-undergraduate-2027-application','eduhk-2027-international-undergraduate-admissions']
def get(u):
 with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews-Acceptance/1.0'}),timeout=35) as q:return q.status,q.read()
def check(pair):
 slug,en=pair;url='https://globalednews.com/'+('en/' if en else '')+'news/'+slug+'/'
 status,b=get(url);d=html.fromstring(b);text=' '.join(d.xpath('//body//text()[not(ancestor::script) and not(ancestor::style)]'))
 assert d.xpath('//link[@rel="canonical"]/@href')==[url]
 assert ('November 10, 2026' in text if en else '2026年11月10日' in text)
 assert not en or not re.search('[\u3400-\u9fff]',text)
 assert ('Sources and reporting method' in text if en else '資料與報導方法' in text)
 required={'jordan':('October 8','10月8日'),'nagoya':('11 a.m.','上午11時'),'eduhk':('GSAT','學測')}
 assert required[slug.split('-')[0]][0 if en else 1] in text
 og=d.xpath('//meta[@property="og:image"]/@content')[0];ims,imb=get(og);assert ims==200 and len(imb)>10000
 schemas=[json.loads(t) for t in d.xpath('//script[@type="application/ld+json"]/text()')];assert schemas
 article=next(s for s in schemas if s.get('@type')=='NewsArticle')
 taipei_date=lambda value:datetime.datetime.fromisoformat(value.replace('Z','+00:00')).astimezone(datetime.timezone(datetime.timedelta(hours=8))).date().isoformat()
 assert taipei_date(article['datePublished'])=='2026-10-10'
 assert taipei_date(article['dateModified'])=='2026-11-10'
 return dict(url=url,status=status,canonical=url,ogImage=og,ogBytes=len(imb),visibleTextCharacters=len(text),englishWithoutChinese=en,originalPublicationDatePreserved=True,updatedDateVisible=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=list(pool.map(check,[(s,e) for s in slugs for e in [False,True]]))
result=dict(verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),pages=pages)
(R/'docs/daily-checks/2026-11-10/archive-live-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('PASS: six live revised bilingual pages, original and updated dates, sources, canonical, schema and OG images.')
