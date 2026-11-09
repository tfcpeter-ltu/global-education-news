import pathlib,json,urllib.request,html,re,io,concurrent.futures,shutil
from PIL import Image,ImageDraw
D='2026-11-10'; E=pathlib.Path(__file__).parent; O=pathlib.Path('public/images/daily')/D; O.mkdir(parents=True,exist_ok=True)
selected={'au':"File:University of Melbourne Southbank campus.jpg",'nz':'File:University of Auckland Clocktower (31936169282).jpg','uk':'File:Birmingham City University, Curzon Building, from south-west.jpg','aston':'File:Aston University Campus - geograph.org.uk - 2655667.jpg','bcuug':'File:Curzon Building, Birmingham City University - geograph.org.uk - 7223688.jpg','bcupg':'File:East side, Curzon Building, Birmingham City University - geograph.org.uk - 7223702.jpg','diy':'File:Parkside & Curzon 2017.jpg','taiwan':'File:National Sun Yat-sen University campus 20260210.jpg'}
pages={x['title']:x for p in E.glob('images-*.json') for x in json.loads(p.read_text(encoding='utf-8-sig')).get('query',{}).get('pages',{}).values()}
clean=lambda s:html.unescape(re.sub('<[^>]+>','',s)).strip()
def run(kv):
 k,title=kv;i=pages[title]['imageinfo'][0];m=i['extmetadata'];assert m['LicenseShortName']['value'] in ['CC BY-SA 4.0','CC BY-SA 3.0','CC BY-SA 2.0','CC BY-SA 2.5','CC BY 4.0','CC BY 3.0','CC BY 2.0','CC BY 2.5','Public domain','CC0'],m['LicenseShortName']
 with urllib.request.urlopen(urllib.request.Request(i.get('thumburl',i['url']),headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=35) as f:b=f.read()
 im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1800,1800));p=O/(k+'.jpg');im.save(p,quality=92)
 return dict(key=k,title=title,file=p.as_posix(),source=i['descriptionurl'],original=i['url'],author=clean(m['Artist']['value']),license=m['LicenseShortName']['value'],licenseUrl=m.get('LicenseUrl',{}).get('value',''),description=clean(m.get('ImageDescription',{}).get('value','')),modifications='resized; social card cropped with headline',size=list(im.size))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:records=list(ex.map(run,selected.items()))
pathlib.Path(f'docs/image-licenses/{D}.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
sheet=Image.new('RGB',(900,((len(records)+2)//3)*220),'white');draw=ImageDraw.Draw(sheet)
for j,r in enumerate(records):
 im=Image.open(r['file']);im.thumbnail((290,185));x=(j%3)*300;y=(j//3)*220;sheet.paste(im,(x,y));draw.text((x+5,y+190),r['key']+' / '+r['license'],fill='black')
sheet.save(E/'photo-contact.jpg')
body='<h1>Licensed archive photographs / 2026-11-10</h1>'
for r in records:body+=f'<section id="{r["key"]}"><h2>{html.escape(r["title"])}</h2><p>{html.escape(r["author"])} / <a href="{html.escape(r["licenseUrl"])}">{r["license"]}</a></p><a href="{html.escape(r["source"])}">Original source</a><p>Resized; social card cropped and captioned. Adaptations retain the applicable share-alike licence. Archive image, not a photograph of the reported event.</p></section>'
(O/'credits.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><title>Photo credits</title><body>'+body+'</body></html>',encoding='utf8')
print(json.dumps(records,ensure_ascii=False))
