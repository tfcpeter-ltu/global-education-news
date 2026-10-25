import json,pathlib,urllib.request,io,concurrent.futures
from lxml import html
from PIL import Image,ImageOps,ImageDraw
D='2026-10-26';E=pathlib.Path('docs/daily-checks')/D;out=pathlib.Path('public/images/daily')/D;out.mkdir(parents=True,exist_ok=True)
queries=['Miami University Upham Hall','Miami University MacCracken Hall','National Tsing Hua University campus']
def search(q):
 import urllib.parse
 u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json','generator':'search','gsrsearch':q,'gsrnamespace':6,'gsrlimit':4,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1600})
 with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=20) as f:data=f.read()
 (E/('images-'+q.replace(' ','_')+'.json')).write_bytes(data)
 print(q,[p['title'] for p in json.loads(data).get('query',{}).get('pages',{}).values()],flush=True)
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:list(ex.map(search,queries))
