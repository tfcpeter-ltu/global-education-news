import urllib.request,concurrent.futures,pathlib,json
from lxml import html
E=pathlib.Path('docs/daily-checks/2026-11-09')
urls={'uk-report':'https://assets.publishing.service.gov.uk/media/6aeb270b88d44387aeae0693/industrial-strategy-advisory-council-annual-report-2026.pdf','reading-secondary':'https://mieconnect.com/scholarships?institution=university-of-reading','reading-ultimate':'https://www.ultimateducation.co.id/beasiswa/international-scholarships-university-of-reading','reading-master':'https://www.reading.ac.uk/ready-to-study/study/Fees-and-funding/scholarships/masters-excellence-scholarships','reading-alumni':'https://www.reading.ac.uk/ready-to-study/study/Fees-and-funding/scholarships/alumni-scholarship-27-28','reading-palmer':'https://www.reading.ac.uk/ready-to-study/study/Fees-and-funding/scholarships/frank-palmer-award','reading-tw':'https://www.reading.ac.uk/ready-to-study/international-and-eu/country-specific-information/country-specific-taiwan'}
def fetch(kv):
 k,u=kv
 try:
  b=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read()
  if '.pdf' in u:(E/(k+'.pdf')).write_bytes(b);return [k,'pdf',len(b)]
  doc=html.fromstring(b)
  for x in doc.xpath('//script|//style|//nav|//header|//footer'):x.drop_tree()
  t='\n'.join(x.strip() for x in doc.text_content().splitlines() if x.strip());(E/(k+'.txt')).write_text(t,encoding='utf8')
  (E/(k+'-links.json')).write_text(json.dumps(doc.xpath('//a/@href')),encoding='utf8')
  return [k,'read',len(t)]
 except Exception as e:return [k,str(e)]
with concurrent.futures.ThreadPoolExecutor(max_workers=7) as ex:r=list(ex.map(fetch,urls.items()))
(E/'fetch-results.json').write_text(json.dumps(dict(urls=urls,results=r),indent=2),encoding='utf8');print(r)
