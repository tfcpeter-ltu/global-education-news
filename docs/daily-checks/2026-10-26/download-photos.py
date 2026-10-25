from photos import *
pool=[]
for p in E.glob('images-*.json'):pool.extend(json.loads(p.read_text(encoding='utf8')).get('query',{}).get('pages',{}).values())
selected={'ca':'File:MemorialUniversity.jpg','uk':'File:DepartmentForEducationLondon.jpg','au':'File:Dickson college dickson act.jpg','iowa':'File:Beardshear hall.jpg','pfp':'File:Upham Hall, Miami University 5-2-2022.jpg','ywh':'File:MacCracken Hall at dusk.jpg','diy':'File:Miamiu.jpg','taiwan':'File:In the Campus of National Tsing Hua University 01.jpg'}
def clean(x):return html.fromstring('<span>'+x+'</span>').text_content()
def download(kv):
 k,title=kv;p=next(x for x in pool if x['title']==title);i=p['imageinfo'][0];m=i['extmetadata'];f=out/(k+'.jpg')
 b=urllib.request.urlopen(urllib.request.Request(i.get('thumburl',i['url']),headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=25).read()
 im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1800,1800));im.save(f,quality=91)
 return dict(key=k,title=title,file=f.as_posix(),source=i['descriptionurl'],original=i['url'],author=clean(m.get('Artist',{}).get('value','')),license=m.get('LicenseShortName',{}).get('value'),licenseUrl=m.get('LicenseUrl',{}).get('value','https://creativecommons.org/publicdomain/mark/1.0/'),description=clean(m.get('ImageDescription',{}).get('value','')))
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:records=list(ex.map(download,selected.items()))
pathlib.Path('docs/image-licenses/'+D+'.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
sheet=Image.new('RGB',(1200,810),'white');draw=ImageDraw.Draw(sheet)
for n,p in enumerate(records):
 im=ImageOps.fit(Image.open(p['file']),(400,240));x=(n%3)*400;y=(n//3)*270;sheet.paste(im,(x,y));draw.text((x+5,y+244),p['key']+' / '+p['license'],fill='black')
sheet.save(E/'photo-contact-sheet.jpg');print('Downloaded',len(records),'licensed photos')
