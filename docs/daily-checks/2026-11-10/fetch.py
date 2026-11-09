import urllib.request,concurrent.futures,pathlib,json
from lxml import html
E=pathlib.Path('docs/daily-checks/2026-11-10')
urls={'nz-official':'https://www.enz.govt.nz/news-and-research/ed-news/international-students-give-new-zealand-experience-highest-rating-yet','au-standard':'https://www.education.gov.au/esos-framework/resources/standard-4-education-agents','au-teqsa':'https://www.teqsa.gov.au/guides-resources/resources/sector-updates-and-alerts/sector-alert-provider-responsibilities-when-using-education-agents','bcu-ug':'https://www.bcu.ac.uk/international/fees-costs-and-scholarships/ug-scholarships','bcu-pg':'https://www.bcu.ac.uk/international/fees-costs-and-scholarships/pg-scholarships','bcu-taiwan':'https://www.bcu.ac.uk/international/bcu-in-your-country/taiwan','bcu-secondary':'https://collegedunia.com/uk/university/2288-birmingham-city-university-birmingham/scholarship','aston':'https://www.aston.ac.uk/international/scholarships','aston-taiwan':'https://www.aston.ac.uk/international/taiwan','aston-secondary':'https://kwahub.com/en/study-abroad-scholarships/1754-aston-university-postgraduate-international-community-scholarship-january-2027'}
def fetch(kv):
 k,u=kv
 try:
  b=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=20).read();doc=html.fromstring(b)
  for x in doc.xpath('//script|//style|//nav|//header|//footer'):x.drop_tree()
  t='\n'.join(x.strip() for x in doc.text_content().splitlines() if x.strip());(E/(k+'.txt')).write_text(t,encoding='utf8');(E/(k+'-links.json')).write_text(json.dumps(doc.xpath('//a/@href')),encoding='utf8');return [k,len(t)]
 except Exception as e:return [k,str(e)]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:results=list(ex.map(fetch,urls.items()))
(E/'source-fetch.json').write_text(json.dumps(dict(urls=urls,results=results),indent=2));print(results)
