import pathlib,json,urllib.request,datetime,re,concurrent.futures
from lxml import html
root=pathlib.Path.cwd()
items=json.loads((root/'docs/daily-checks/2026-11-07/archive-prepared.json').read_text(encoding='utf-8'))
def check(url):
    with urllib.request.urlopen(url,timeout=30) as res:
        status=res.status
        doc=html.fromstring(res.read())
    canonical=doc.xpath('//link[@rel="canonical"]/@href')
    assert canonical==[url],(url,canonical)
    text=' '.join(doc.xpath('//body//text()[not(ancestor::script) and not(ancestor::style)]'))
    cjk=len(re.findall('[\u3400-\u9fff]',text))
    assert '/en/' not in url or cjk==0,(url,cjk)
    article=' '.join(doc.xpath('//article//text()[not(ancestor::script) and not(ancestor::style)]'))
    assert len(article)>2000,(url,len(article))
    schemas=[json.loads(s) for s in doc.xpath('//script[@type="application/ld+json"]/text()')]
    news=next(s for s in schemas if s.get('@type')=='NewsArticle')
    tw=datetime.timezone(datetime.timedelta(hours=8))
    modified=datetime.datetime.fromisoformat(news['dateModified']).astimezone(tw).isoformat()
    published=datetime.datetime.fromisoformat(news['datePublished']).astimezone(tw).isoformat()
    assert modified.startswith('2026-11-07'),(url,modified)
    assert published.startswith(('2026-10-12','2026-10-13')),(url,published)
    return dict(url=url,status=status,canonical=canonical[0],h1=doc.xpath('//h1')[0].text_content(),articleCharacters=len(article),englishCjk=cjk if '/en/' in url else None,datePublishedTaipei=published,dateModifiedTaipei=modified,originalDatePreserved=True,updatedDateVerified=True)
urls=[i['url'] for i in items]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    checks=list(pool.map(check,urls+[u.replace('.com/','.com/en/') for u in urls]))
result=dict(status='PASS',verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),pages=checks)
(root/'docs/daily-checks/2026-11-07/archive-live-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
