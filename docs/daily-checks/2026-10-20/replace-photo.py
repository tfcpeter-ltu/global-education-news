import json,pathlib,urllib.request,io,hashlib,shutil
from PIL import Image,ImageOps
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019');D='2026-10-20';E=S/f'docs/daily-checks/{D}'
pool=json.loads((E/'images-Curtin_University_Bentley_campus.json').read_text(encoding='utf-8'))['query']['pages'].values()
p=next(x for x in pool if x['title']=='File:Curtin building 212 side entrance.jpg');i=p['imageinfo'][0]
with urllib.request.urlopen(urllib.request.Request(i['thumburl'],headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=30) as response:b=response.read()
im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1800,1800));dest=S/f'public/images/daily/{D}/curtin-leaders.jpg';im.save(dest,quality=91);shutil.copy2(dest,R/dest.relative_to(S))
old='https://commons.wikimedia.org/wiki/File:Curtin_building_208_path.jpg';new=i['descriptionurl']
manifest=S/f'docs/image-licenses/{D}.json';data=json.loads(manifest.read_text(encoding='utf-8'))
for x in data:
 if x['key']=='curtin-leaders':x.update(title=p['title'],source=new,original=i['url'],description=i['extmetadata']['ImageDescription']['value'],size=list(im.size))
manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
rels=['src/pages/scholarships/items/2026-10-curtin-future-leaders-2027.md',f'public/images/daily/{D}/credits.html','public/images/share-photos/credits.json']
for rel in rels:
 a=S/rel;t=a.read_text(encoding='utf-8').replace(old,new).replace('File:Curtin building 208 path.jpg',p['title']);a.write_text(t,encoding='utf-8');shutil.copy2(a,R/rel)
for rel in ['scholarships/items/2026-10-curtin-future-leaders-2027/index.html','en/scholarships/items/2026-10-curtin-future-leaders-2027/index.html','images/daily/'+D+'/credits.html','en/images/daily/'+D+'/credits.html','image-credits/index.html']:
 a=R/'dist'/rel
 if a.exists():a.write_text(a.read_text(encoding='utf-8').replace(old,new).replace('File:Curtin building 208 path.jpg',p['title']),encoding='utf-8')
for source in [f'/images/daily/{D}/curtin-leaders.jpg',f'https://globalednews.com/images/daily/{D}/curtin-leaders.jpg']:
 key=hashlib.sha256(source.encode()).hexdigest()[:24]+'.jpg'
 for root in [S/'public',R/'public',R/'dist']:ImageOps.fit(im,(1200,630)).save(root/'images/share-photos'/key,quality=88)
print('Replaced repeated image with licensed Curtin Building 212 entrance.')
