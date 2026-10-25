from research import *
U={
'ca-primary':'https://atlanticuniversities.ca/wp-content/uploads/2026/10/web_VISA_PreliminaryEnrolments-26-27_Final-Oct.-1426-4.pdf',
'au':'https://www.act.gov.au/education-and-training/latest-articles/protected-industrial-action-at-act-public-schools-19-to-23-october-2026',
'au-second':'https://region.com.au/fed-up-public-school-teachers-take-to-the-streets-as-threat-of-term-4-full-day-strike-looms/1009426/',
'pfp':'https://miamioh.edu/admission-aid/majors-minors-programs/honors-programs/presidential-fellows-program.html',
'miami-apply':'https://miamioh.edu/admission-aid/apply/international-students/',
'iowa-apply':'https://www.iastate.edu/admission-and-aid/apply',
'ntu':'https://oia.ntu.edu.tw/outgoing',
}
def images(q):
 try:
  u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json','generator':'search','gsrsearch':q,'gsrnamespace':6,'gsrlimit':7,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1600})
  with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=25) as f:data=f.read()
  (E/('images-'+q.replace(' ','_')+'.json')).write_bytes(data)
  return dict(query=q,titles=[p['title'] for p in json.loads(data).get('query',{}).get('pages',{}).values()])
 except Exception as e:return dict(query=q,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
 print(json.dumps(list(ex.map(fetch,[(k,u) for k,u in U.items() if k!='ca-primary']))),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
 print(json.dumps(list(ex.map(images,['Memorial University Newfoundland campus','Department Education Sanctuary Buildings London','Dickson College Canberra','Iowa State University Beardshear Hall','Miami University Oxford Ohio buildings','National Taiwan University campus']))),flush=True)
