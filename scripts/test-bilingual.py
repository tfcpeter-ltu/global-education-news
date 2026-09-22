import pathlib,json
from urllib.parse import urlsplit,unquote
from lxml import html,etree
root=pathlib.Path(__file__).resolve().parents[1];dist=root/'dist';failures=[];count=0
for english in (dist/'en').rglob('*.html'):
 original=dist/english.relative_to(dist/'en');en=html.parse(str(english));zh=html.parse(str(original));count+=1
 if en.getroot().get('lang')!='en':failures.append(str(english)+' lang')
 for doc in [en,zh]:
  if len(doc.xpath('//a[@data-language="en"]'))!=1:failures.append(str(english)+' switch')
  if len(doc.xpath('//link[@hreflang="en"]'))!=1:failures.append(str(english)+' hreflang')
 if len(en.xpath('//option'))!=len(zh.xpath('//option')):failures.append(str(english)+' option count')
 for a,b in zip(zh.xpath('//option'),en.xpath('//option')):
  if a.get('value',a.text_content())!=b.get('value'):failures.append(str(english)+' changed option value')
 for a in en.xpath('//a[starts-with(@href,"/en/")]'):
  href=unquote(urlsplit(a.get('href')).path);p=dist/href.lstrip('/')
  if href.endswith('/'):p=p/'index.html'
  if not p.exists():failures.append(str(english)+' broken '+href)
 for a in en.xpath('//a[starts-with(@href,"/news/")]'):
  if not a.get('data-language'):failures.append(str(english)+' article link lost English locale')
 for s in en.xpath('//script[@type="application/ld+json"]'):
  try:json.loads(s.text or '{}')
  except ValueError:failures.append(str(english)+' invalid schema')
for name in ['sitemap.xml','english-sitemap.xml']:
 etree.parse(str(dist/name))
assert count>400, count
assert not failures,'\n'.join(failures[:40])
print(f'PASS: {count} Chinese/English page pairs, language links, internal English URLs, unchanged option values, JSON-LD and XML sitemaps')
