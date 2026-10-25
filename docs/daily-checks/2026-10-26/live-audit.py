import json,pathlib,urllib.request,datetime,re,concurrent.futures
from lxml import html,etree
S=pathlib.Path.cwd();D='2026-10-26';r=json.loads((S/f'docs/daily-reports/{D}.json').read_text(encoding='utf-8'))
urls=[x['url'] for x in r['newsPrepared']+r['scholarshipAdditions']]+[r['studyAbroadPrepared']['url']]+[x['url'] for x in r['peterPrepared']]
def get(u):
 with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews-Acceptance/1.0'}),timeout=30) as q:return q.status,q.read()
def page(u):
 status,b=get(u);d=html.fromstring(b);can=d.xpath('//link[@rel="canonical"]/@href');og=d.xpath('//meta[@property="og:image"]/@content');schemas=[json.loads(s) for s in d.xpath('//script[@type="application/ld+json"]/text()')]
 assert can==[u],(u,can)
 assert len(og)==1
 imstatus,im=get(og[0]);assert imstatus==200 and len(im)>10000
 assert d.xpath('//h1') and schemas
 text=' '.join(d.xpath('//body//text()[not(ancestor::script) and not(ancestor::style)]'));cjk=bool(re.search('[\u3400-\u9fff]',text));assert '/en/' not in u or not cjk
 return dict(url=u,status=status,canonical=can[0],ogImage=og[0],ogBytes=len(im),schemaCount=len(schemas),englishCjk=cjk if '/en/' in u else None)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=list(pool.map(page,urls+[u.replace('.com/','.com/en/') for u in urls]))
xml={}
for path in ['sitemap-index.xml','sitemap-0.xml','news-sitemap.xml','weekly-feed.xml']:
 status,b=get('https://globalednews.com/'+path);etree.fromstring(b);xml[path]=b.decode()
for u in urls:assert u.rstrip('/') in xml['sitemap-0.xml'],u
for u in urls[:3]:
 assert u.rstrip('/') in xml['news-sitemap.xml'],u
 assert u.rstrip('/') in xml['weekly-feed.xml'],u
assert get('https://globalednews.com/robots.txt')[0]==200
result=dict(verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),pages=pages,xmlChecks=list(xml),newPagesInSitemap=7,newsInNewsSitemapAndRss=3,robots=200)
(S/f'docs/daily-reports/{D}-live-seo.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('PASS: 14 bilingual URLs, canonical, OG photos, schema, sitemap, News sitemap, RSS and English text.')

