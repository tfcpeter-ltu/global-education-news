import json,pathlib,urllib.request,concurrent.futures
from lxml import html
from PIL import Image,ImageOps,ImageDraw
R=pathlib.Path('.');D='2026-10-21';E=R/f'docs/daily-checks/{D}';out=R/f'public/images/daily/{D}';out.mkdir(parents=True,exist_ok=True)
pool=[]
for p in E.glob('images-*.json'):pool.extend(json.loads(p.read_text(encoding='utf-8')).get('query',{}).get('pages',{}).values())
selected={'uni':'File:UCB-Lyon-1, Campus La Doua, bâtiment Charles-Darwin 01.jpg','school':'File:Cloître du lycée Henri IV à Paris.JPG','residence':'File:UCB-Lyon-1, Campus La Doua, bâtiment Jean-Braconnier 03.jpg','flinders-excellence':'File:Flinders from hill.jpg','flinders-global':'File:Flinders from hill 2.jpg','flinders-kickstart':'File:Flinders University City Campus.jpg','flinders-diy':'File:Flinders from hill 3.jpg','peter':'File:UBC Engineering Student Centre Interior.jpg','taiwan':'File:2017-07-02 Lower Campus of National Chengchi University (NCCU), 國立政治大學 02.jpg'}

def clean(s):return html.fromstring('<span>'+s+'</span>').text_content()
def run(item):
 k,title=item;p=next(p for p in pool if p['title']==title);i=p['imageinfo'][0];m=i['extmetadata'];u=i['url'];f=out/(k+'.jpg')
 import io,time
 if f.exists() and k!='teachers':im=Image.open(f)
 else:
  time.sleep(1)
  download=i.get('thumburl',u)
  b=urllib.request.urlopen(urllib.request.Request(download,headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=20).read()
  im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1800,1800));im.save(f,quality=91)
 return dict(key=k,title=title,file=f.as_posix(),source=i['descriptionurl'],original=u,author=clean(m.get('Artist',{}).get('value','Unknown')),license=m.get('LicenseShortName',{}).get('value'),licenseUrl=m.get('LicenseUrl',{}).get('value',''),description=clean(m.get('ImageDescription',{}).get('value','')),modifications='resized; social versions cropped with editorial headlines',size=list(im.size))
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=1) as ex:photos=list(ex.map(run,selected.items()))
 (R/f'docs/image-licenses/{D}.json').write_text(json.dumps(photos,ensure_ascii=False,indent=2),encoding='utf-8')
 sheet=Image.new('RGB',(1000,1000),'white');draw=ImageDraw.Draw(sheet)
 for n,p in enumerate(photos):
  im=Image.open(p['file']);im=ImageOps.contain(im,(490,170));x=(n%2)*500;y=(n//2)*200;sheet.paste(im,(x,y));draw.text((x+5,y+175),p['key'],fill='black')
 sheet.save(E/'photo-contact-sheet.jpg');print(json.dumps(photos,ensure_ascii=False))
