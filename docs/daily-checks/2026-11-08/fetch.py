import pathlib,json,urllib.request,concurrent.futures
from lxml import html
E=pathlib.Path('docs/daily-checks/2026-11-08')
urls={
'ca-official':'https://www.canada.ca/en/immigration-refugees-citizenship/news/2026/11/building-a-stronger-canada-through-a-well-managed-predictable-immigration-system.html',
'ca-independent':'https://thepienews.com/canada-extends-150000-international-student-arrivals-target-to-2029/',
'kr-official':'https://www.kosaf.go.kr/ko/scholar.do?pg=scholarship05_12_19',
'kr-independent':'https://thepienews.com/south-koreas-free-tuition-plan-could-reshape-international-student-recruitment/',
'uk-official':'https://www.sfc.ac.uk/estates-infrastructure/college-infrastructure-strategy-baseline-2024/college-infrastructure-investment-plan-2027-28-to-2036-37/',
'uk-independent':'https://www.scotsman.com/education/colleges-will-need-ps25bn-to-maintain-campuses-suitable-for-teaching-9328550',
'award-deans':'https://www.bangor.ac.uk/international/future/deans-scholarship',
'award-research':'https://www.bangor.ac.uk/international/future/deans-research-scholarship',
'award-independent':'https://mieconnect.com/scholarships?institution=bangor-university',
'award-portal':'https://www.mastersportal.com/universities/scholarships/427/bangor-university.html'}
def run(kv):
 k,u=kv
 try:
  b=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read();doc=html.fromstring(b)
  for e in doc.xpath('//script|//style|//nav|//header|//footer'):e.drop_tree()
  text='\n'.join(t.strip() for t in doc.text_content().splitlines() if t.strip());(E/(k+'.txt')).write_text(text,encoding='utf8')
  return dict(key=k,url=u,status='readable',chars=len(text))
 except Exception as e:return dict(key=k,url=u,status='error',error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:r=list(ex.map(run,urls.items()))
(E/'source-fetch.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(r))
