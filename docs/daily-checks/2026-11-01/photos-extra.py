import pathlib,json,urllib.request,urllib.parse,concurrent.futures
E=pathlib.Path(__file__).parent
qs=['"Southern Cross University" -filetype:pdf','"Wichita State University" -Midwestern','"National Taiwan University" "library"']
def run(q):
 u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrsearch=q,gsrnamespace=6,gsrlimit=4,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=1800))
 try:
  with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=25) as f:d=json.load(f)
  (E/('images-'+''.join(c if c.isalnum() else '_' for c in q)+'.json')).write_text(json.dumps(d,ensure_ascii=False),encoding='utf8');return [q,[p['title'] for p in d.get('query',{}).get('pages',{}).values()]]
 except Exception as e:return [q,str(e)]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:print(json.dumps(list(ex.map(run,qs)),ensure_ascii=False))
