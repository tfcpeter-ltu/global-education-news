import pathlib,json,urllib.request,urllib.parse,concurrent.futures
from lxml import html
D='2026-10-26'; E=pathlib.Path('docs/daily-checks')/D
urls={
'uk':'https://www.gov.uk/government/news/generational-moment-as-government-acts-on-landmark-antisemitism-review',
'uk-second':'https://feweek.co.uk/antisemitism-review-colleges-told-to-set-out-stance-on-staff-wearing-political-symbols/',
'ca':'https://gazette.mun.ca/teaching-and-learning/enrolment-update-2/',
'ca-second':'https://www.cbc.ca/news/canada/newfoundland-labrador/mun-international-students-decline-9.7389650',
'nz':'https://tahurangi.education.govt.nz/new-senior-secondary-qualifications',
'iowa':'https://www.iastate.edu/admission-and-aid/admissions/international-admissions/international-student-excellence-award',
'iowa-second':'https://scholarshipsforafricans.com/scholarships/iowa-state-international-student-excellence-award',
'miami':'https://miamioh.edu/onestop/financial-aid/funding-opportunities/scholarships/international-scholarships.html',
'pfp-second':'https://collegedunia.com/usa/university/1631-miami-university-oxford/scholarship',
'ywh-second':'https://www.youarewelcomehereusa.org/scholarship',
'ntu':'https://oia.ntu.edu.tw/', 'nthu':'https://oga.site.nthu.edu.tw/', 'nycu':'https://oia.nycu.edu.tw/',
'sunmoon':'https://www.sunmoonnews.com.tw/'
}
def fetch(kv):
 k,u=kv
 try:
  with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25) as f:data=f.read()
  doc=html.fromstring(data);links=[{'text':x.text_content().strip(),'url':urllib.parse.urljoin(u,x.get('href'))} for x in doc.xpath('//a[@href]')]
  [x.drop_tree() for x in doc.xpath('//script|//style|//nav|//footer')]
  s='\n'.join(x.strip() for x in doc.text_content().splitlines() if x.strip());(E/(k+'.txt')).write_text(s,encoding='utf8');(E/(k+'-links.json')).write_text(json.dumps(links,ensure_ascii=False),encoding='utf8')
  return dict(key=k,url=u,status='retrieved-for-review',characters=len(s))
 except Exception as e:return dict(key=k,url=u,status='failed',error=str(e))
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:results=list(ex.map(fetch,urls.items()))
 (E/'retrieval.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(results),flush=True)
