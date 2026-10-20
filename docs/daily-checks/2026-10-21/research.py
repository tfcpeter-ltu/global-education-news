import json,pathlib,urllib.request,urllib.parse,concurrent.futures,datetime
from lxml import html
R=pathlib.Path('docs/daily-checks/2026-10-21')
urls={
'fr-school-budget':'https://www.education.gouv.fr/budget-2027-pour-l-ecole-506131',
'fr-residence':'https://www.enseignementsup-recherche.gouv.fr/fr/laurent-nunez-et-philippe-baptiste-annoncent-de-nouvelles-mesures-pour-prevenir-les-ruptures-de-104317',
'flinders':'https://www.flinders.edu.au/international/apply/scholarships',
'flinders-second':'https://www.studyu.org/en/university-flinders',
'nccu':'https://oic.nccu.edu.tw/',
'nchu':'https://oia.nchu.edu.tw/',
'ncu':'https://oia.ncu.edu.tw/',
'sunmoon':'https://www.sunmoonnews.com.tw/'
}
def fetch(kv):
 k,u=kv
 try:
  req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=20) as f: data=f.read()
  d=html.fromstring(data);[x.drop_tree() for x in d.xpath('//script|//style|//nav|//footer')]
  s='\n'.join(x.strip() for x in d.text_content().splitlines() if x.strip())
  (R/(k+'.txt')).write_text(s,encoding='utf-8')
  (R/(k+'-links.json')).write_text(json.dumps([{'text':x.text_content().strip(),'url':urllib.parse.urljoin(u,x.get('href'))} for x in d.xpath('//a[@href]')],ensure_ascii=False),encoding='utf-8')
  return dict(key=k,url=u,status='retrieved-for-review',characters=len(s),checkedAt=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat())
 except Exception as e:return dict(key=k,url=u,status='fetch-failed',error=str(e))
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex: results=list(ex.map(fetch,urls.items()))
 (R/'retrieval.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
 for x in results: print(json.dumps(x,ensure_ascii=False),flush=True)
