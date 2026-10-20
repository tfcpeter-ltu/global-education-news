import json,pathlib,urllib.request,io,html as esc,shutil
from lxml import html
from PIL import Image
S=pathlib.Path.cwd();D='2026-10-21';E=S/f'docs/daily-checks/{D}';R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
pool=json.loads((E/'images-National_Chengchi_University_campus.json').read_text(encoding='utf8'))['query']['pages'].values();x=next(x for x in pool if x['title']=='File:2017-07-02 Lower Campus of National Chengchi University (NCCU), 國立政治大學 02.jpg');i=x['imageinfo'][0];m=i['extmetadata']
old=[]
for f in (S/'docs/image-licenses').glob('2026-10-*.json'):
 if f.stem==D:continue
 try:old.extend(json.loads(f.read_text(encoding='utf8')))
 except:pass
assert not any(isinstance(z,dict) and z.get('source')==i['descriptionurl'] for z in old)
b=urllib.request.urlopen(urllib.request.Request(i.get('thumburl',i['url']),headers={'User-Agent':'GlobalEducationNews/1.0 (https://globalednews.com/contact/)'}),timeout=25).read();im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1800,1800));file=f'public/images/daily/{D}/taiwan.jpg';im.save(S/file,quality=91)
p=dict(key='taiwan',title=x['title'],file=file,source=i['descriptionurl'],original=i['url'],author=html.fromstring('<span>'+m['Artist']['value']+'</span>').text_content(),license=m['LicenseShortName']['value'],licenseUrl=m['LicenseUrl']['value'],description=html.fromstring('<span>'+m['ImageDescription']['value']+'</span>').text_content(),modifications='resized; social versions cropped with editorial headlines',size=list(im.size))
lic=S/f'docs/image-licenses/{D}.json';photos=json.loads(lic.read_text(encoding='utf8'));photos=[p if z['key']=='taiwan' else z for z in photos];lic.write_text(json.dumps(photos,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
f=S/f'docs/social-posts/{D}/taiwan-universities--nccu-short-study-nov10.json';d=json.loads(f.read_text(encoding='utf8'));d.update(imageCredit=p['author'],imageSource=p['source'],imageLicense=p['license'],imageLicenseUrl=p['licenseUrl']);f.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
c=S/f'public/images/daily/{D}/credits.html';t=c.read_text(encoding='utf8');start=t.index('<section id="taiwan"');end=t.index('</section>',start)+len('</section>');section=f'<section id="taiwan"><h2>taiwan</h2><p>{esc.escape(p["author"])}</p><a href="{esc.escape(p["source"])}">Original photograph</a> · <a href="{p["licenseUrl"]}">{p["license"]}</a><p>Resized; social versions cropped with editorial headlines.</p></section>';c.write_text(t[:start]+section+t[end:],encoding='utf8')
for f in [S/file,c,S/f'docs/social-posts/{D}/taiwan-universities--nccu-short-study-nov10.json']:shutil.copy2(f,R/f.relative_to(S))
print(p['source'])
