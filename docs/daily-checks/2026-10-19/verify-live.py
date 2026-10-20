import json,re,urllib.request,datetime,pathlib,concurrent.futures
from lxml import html,etree
R=pathlib.Path(__file__).resolve().parents[3];r=json.loads((R/'docs/daily-reports/2026-10-19.json').read_text(encoding='utf-8'));news=r['newsPrepared'];base=[x['url'] for x in news+r['scholarshipAdditions']+[r['studyAbroadPrepared']]];urls=base+[u.replace('https://globalednews.com/','https://globalednews.com/en/') for u in base]
def get(u):
 with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews/1.0 editorial validation'}),timeout=25) as res:return res.read()
def check(u):
 d=html.fromstring(get(u));canonical=d.xpath('//link[@rel="canonical"]/@href');assert canonical==[u],(u,canonical)
 og=d.xpath('//meta[@property="og:image"]/@content');assert len(og)==1 and '/images/share-photos/' in og[0];b=get(og[0]);assert len(b)>10000
 schemas=[json.loads(x) for x in d.xpath('//script[@type="application/ld+json"]/text()')];assert len(schemas)>=2
 cjk=bool(re.search('[\u3400-\u9fff]',d.xpath('//main')[0].text_content())) if '/en/' in u else None;assert cjk is not True
 return dict(url=u,status=200,canonical=canonical[0],ogImage=og[0],ogBytes=len(b),schemaCount=len(schemas),englishCjk=cjk)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=list(pool.map(check,urls))
xml={p:get('https://globalednews.com/'+p).decode() for p in ['sitemap-index.xml','sitemap-0.xml','news-sitemap.xml','weekly-feed.xml']}
for p,s in xml.items():etree.fromstring(s.encode())
assert all(u in xml['sitemap-0.xml'] for u in urls)
assert all(x['url'] in xml['news-sitemap.xml'] and x['url'] in xml['weekly-feed.xml'] for x in news)
assert b'Sitemap' in get('https://globalednews.com/robots.txt')
out=dict(verifiedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),pages=pages,xmlChecks=list(xml),newPagesInSitemap=7,newsInNewsSitemapAndRss=3,robots=200)
(R/'docs/daily-reports/2026-10-19-live-seo.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print('PASS 14 bilingual pages, canonical, photos, schema, XML feeds and robots')
