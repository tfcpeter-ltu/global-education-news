import pathlib,json,urllib.request,urllib.parse,concurrent.futures
E=pathlib.Path(__file__).parent
qs=['European Commission Berlaymont filetype:bitmap','University Reading Whiteknights filetype:bitmap','Swinburne University Hawthorn filetype:bitmap','University Melbourne campus filetype:bitmap','National Cheng Kung University library filetype:bitmap','University Birmingham campus filetype:bitmap']
def run(q):
 u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrsearch=q,gsrnamespace=6,gsrlimit=8,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=1800))
 try:
  with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=25) as f:d=json.load(f)
  (E/('images-'+q.replace(' ','_').replace(':','_')+'.json')).write_text(json.dumps(d,ensure_ascii=False),encoding='utf8');return [q,[p['title'] for p in d.get('query',{}).get('pages',{}).values()]]
 except Exception as e:return [q,str(e)]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:print(json.dumps(list(ex.map(run,qs)),ensure_ascii=False))
