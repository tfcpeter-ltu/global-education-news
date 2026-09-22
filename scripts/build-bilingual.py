"""Build self-hosted English HTML from Chinese originals; cached offline translations.
Never translate program identifiers, form values, URLs, stored member data or source files.
"""
import os, re, json, hashlib, pathlib, urllib.request, zipfile, time, sys
from lxml import html, etree
ROOT=pathlib.Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'; CACHE=ROOT/'src/data/i18n/en.json'; OVERRIDES=ROOT/'src/data/i18n/en-overrides.json'
CJK=re.compile(r'[\u3400-\u9fff]'); SKIP={'script','style','code','pre','textarea','svg'}
ATTRS=['title','alt','aria-label','placeholder']; SITE='https://globalednews.com'
def norm(s):return re.sub(r'\s+',' ',s or '').strip()
def parts(s):return [x for x in re.split(r'(?<=[。！？；])|\n+',s) if x.strip()]
def load(p):return json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}
cache=load(CACHE); overrides=load(OVERRIDES); cache.update(overrides); wanted=set()
def collect(s):
 s=norm(s)
 if s and CJK.search(s):
  wanted.add(s)
  for p in parts(s):
   if CJK.search(p):wanted.add(norm(p))
def ignored(el):return any(isinstance(a.tag,str) and (a.tag in SKIP or a.get('translate')=='no' or 'notranslate' in a.get('class','').split()) for a in [el,*el.iterancestors()])
def texts(doc):
 for el in doc.iter():
  if not isinstance(el.tag,str):continue
  if not ignored(el) and el.text:yield el,'text',el.text
  if el.tail and el.getparent() is not None and not ignored(el.getparent()):yield el,'tail',el.tail
  if not ignored(el):
   for a in ATTRS:
    if el.get(a):yield el,a,el.get(a)
  if el.tag=='meta' and el.get('content') and el.get('name',el.get('property','')) in ['description','og:title','og:description','og:site_name','twitter:title','twitter:description']:yield el,'content',el.get('content')
def schema_strings(v):
 if isinstance(v,str):collect(v)
 elif isinstance(v,list):
  for x in v:schema_strings(x)
 elif isinstance(v,dict):
  for x in v.values():schema_strings(x)
files=sorted(p for p in DIST.rglob('*.html') if 'en' not in p.relative_to(DIST).parts)
docs=[]
for p in files:
 doc=html.document_fromstring(p.read_bytes())
 if doc.find('head') is None:continue  # Verification tokens are not website pages.
 docs.append((p,doc))
 for el,a,s in texts(doc):collect(s)
 for el in doc.xpath('//script[@type="application/ld+json"]'):
  try:schema_strings(json.loads(el.text or '{}'))
  except ValueError:pass
 for el in doc.xpath('//script[not(@src) and not(@type="application/ld+json")]'):
  # Visible fragments in inline templates. Script code itself remains untouched.
  for s in re.findall(r'[\u3400-\u9fff][^<>`"\n]{0,180}',el.text or ''):
   collect(s.split('${')[0])
dynamic=load(ROOT/'.bilingual/js-strings.json')
for s in dynamic:
 # Drop template markup and attributes; collect display text and Chinese phrases.
 for v in re.split(r'<[^>]*>|\$\{[^}]*\}',s):
  if CJK.search(v):collect(v)
 for v in re.findall(r'[\u3400-\u9fff]{2,}',s):collect(v)
missing=sorted(wanted-cache.keys(),key=lambda s:(len(s),s))
print(f'{len(files)} pages; {len(wanted)} distinct strings; {len(missing)} new translations',flush=True)
if '--extract' in sys.argv:
 (ROOT/'.bilingual/strings.json').write_text(json.dumps(missing,ensure_ascii=False),encoding='utf-8');sys.exit()
if missing:
 import ctranslate2, sentencepiece
 from opencc import OpenCC
 model_input=OpenCC('t2s')  # Normalize only model input, never the published Chinese.
 model=pathlib.Path(os.environ.get('BILINGUAL_MODEL',ROOT/'.bilingual/model/translate-zh_en-1_9'))
 if not (model/'model/model.bin').exists():
  model.parent.mkdir(parents=True,exist_ok=True); archive=model.parent/'model.zip'
  sources=['https://data.argosopentech.com/argospm/v1/translate-zh_en-1_9.argosmodel','https://argos-net.com/v1/translate-zh_en-1_9.argosmodel']
  errors=[]
  for source in sources:
   try:
    request=urllib.request.Request(source,headers={'User-Agent':'GlobalEducationNews-BilingualBuild/1.0'})
    with urllib.request.urlopen(request,timeout=60) as response:archive.write_bytes(response.read())
    if hashlib.sha256(archive.read_bytes()).hexdigest()!='62e7af5a3a48b530e47b7b3e5c78c2de79073ecd815750d2bf3ab35b4a67da2d':raise ValueError('Translation model checksum mismatch')
    break
   except Exception as error:errors.append(str(error))
  else:raise RuntimeError('Official translation model download failed: '+'; '.join(errors))
  with zipfile.ZipFile(archive) as z:z.extractall(model.parent)
 sp=sentencepiece.SentencePieceProcessor(model_proto=(model/'sentencepiece.model').read_bytes())
 translator=ctranslate2.Translator(os.path.relpath(model/'model'),compute_type='int8',inter_threads=2,intra_threads=4)
 # Translate complete sentences independently so later sentences cannot be dropped.
 sentences=sorted({norm(p) for s in missing for p in parts(s) if CJK.search(p) and norm(p) not in cache},key=len)
 started=time.time(); CACHE.parent.mkdir(parents=True,exist_ok=True)
 for i in range(0,len(sentences),32):
  batch=sentences[i:i+32]
  results=translator.translate_batch([sp.encode(model_input.convert(s),out_type=str) for s in batch],beam_size=4,max_decoding_length=512,max_batch_size=32)
  for s,r in zip(batch,results):cache[s]=sp.decode(r.hypotheses[0]).replace('▁',' ').strip()
  if i%320==0 or i+32>=len(sentences):
   CACHE.write_text(json.dumps(cache,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
   print(f'Translated {min(i+32,len(sentences))}/{len(sentences)} sentences ({round(time.time()-started)}s)',flush=True)
 for s in missing:cache[s]=' '.join(cache.get(norm(p),norm(p)) for p in parts(s))
 cache.update(overrides);CACHE.write_text(json.dumps(cache,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if '--translate-only' in sys.argv:sys.exit()
asset_version=hashlib.sha256((json.dumps(cache,ensure_ascii=False,sort_keys=True)+(ROOT/'public/bilingual.js').read_text(encoding='utf-8')+(ROOT/'public/bilingual.css').read_text(encoding='utf-8')).encode()).hexdigest()[:12]
def tr(s):
 key=norm(s)
 if not CJK.search(key):return s
 translated=cache.get(key)
 if not translated:raise ValueError('Untranslated static string: '+key[:150])
 return (' ' if s[:1].isspace() else '')+translated+(' ' if s[-1:].isspace() else '')
def page_url(p):
 rel=p.relative_to(DIST).as_posix()
 return '/'+(rel[:-10] if rel.endswith('index.html') else rel)
routes={page_url(p) for p,_ in docs}; routes.update('/'+p.relative_to(DIST).as_posix() for p,_ in docs)
routes.update(r.rstrip('/') for r in list(routes) if r!='/')
def english_link(value,original):
 from urllib.parse import urljoin,urlsplit,urlunsplit
 if not value or value.startswith(('mailto:','tel:','javascript:','data:')):return value
 if value.startswith('#'):return '/en'+original+value
 u=urlsplit(urljoin(SITE+original,value))
 if u.netloc!='globalednews.com':return value
 if u.path in routes:return urlunsplit(('','','/en'+u.path,u.query,u.fragment))
 return urlunsplit(('','',u.path,u.query,u.fragment))
def schema_translate(v,original):
 if isinstance(v,str):
  if v=='zh-Hant-TW' or v=='zh-TW':return 'en'
  if v.startswith(SITE):
   link=english_link(v,original);return SITE+link if link.startswith('/') else link
  return tr(v) if CJK.search(v) else v
 if isinstance(v,list):return [schema_translate(x,original) for x in v]
 if isinstance(v,dict):return {k:schema_translate(x,original) for k,x in v.items()}
 return v
def decorate(doc,original,is_en):
 head=doc.find('head');body=doc.find('body');zh=SITE+original;en=SITE+'/en'+original
 for lang,url in [('zh-Hant',zh),('en',en),('x-default',zh)]:etree.SubElement(head,'link',rel='alternate',hreflang=lang,href=url)
 etree.SubElement(head,'link',rel='stylesheet',href='/bilingual.css?v='+asset_version)
 etree.SubElement(head,'script',src='/bilingual.js?v='+asset_version,defer='defer')
 bar=html.fragment_fromstring('<div class="language-bar" translate="no"><div class="language-inner"><span class="language-label">'+('Choose your language' if is_en else '選擇閱讀語言')+'</span><nav aria-label="Language"><a data-language="zh" href="'+original+'" lang="zh-Hant"'+(' aria-current="page"' if not is_en else '')+'>繁體中文</a><a data-language="en" href="/en'+original+'" lang="en"'+(' aria-current="page"' if is_en else '')+'>English</a></nav></div></div>')
 body.insert(0,bar)
 if is_en:
  notice=html.fragment_fromstring('<aside class="translation-note" translate="no">English translation · This edition uses automated translation. For exact eligibility, deadlines and policy wording, consult the linked official sources. <a data-language="zh" href="'+original+'">Read the Chinese original</a>.</aside>')
  main=doc.find('.//main');(main if main is not None else body).insert(0 if main is not None else 1,notice)
  # Embedded partner sites remain separate services, and are clearly identified.
  for iframe in doc.xpath('//iframe'):
   note=html.fragment_fromstring('<p class="translation-note" translate="no">Embedded external service: its language is controlled by the provider.</p>');iframe.addprevious(note)
for p,doc in docs:
 original=page_url(p)
 # Chinese output gets only the accessible switch, no editorial changes.
 zh=html.document_fromstring(etree.tostring(doc,encoding='utf-8',method='html'));decorate(zh,original,False)
 p.write_bytes(etree.tostring(zh,encoding='utf-8',method='html',doctype='<!DOCTYPE html>'))
 for option in doc.xpath('//option[not(@value)]'):option.set('value',option.text_content())
 for el,a,s in list(texts(doc)):
  value=tr(s)
  if a in ['text','tail']:setattr(el,a,value)
  else:el.set(a,value)
 for el in doc.xpath('//script[@type="application/ld+json"]'):
  try:el.text=json.dumps(schema_translate(json.loads(el.text or '{}'),original),ensure_ascii=False).replace('</','<\\/')
  except ValueError:pass
 for el in doc.iter():
  if not isinstance(el.tag,str):continue
  for attr in ['href','src','action','poster']:
   val=el.get(attr)
   if not val:continue
   # Only navigation URLs change locale; assets keep original paths.
   if (el.tag in ['a','form'] and attr in ['href','action']):el.set(attr,english_link(val,original))
   elif not val.startswith(('http:','https:','//','#','data:','mailto:')):
    from urllib.parse import urljoin
    el.set(attr,urljoin(original,val))
  if el.get('data-search'):el.set('data-search',el.get('data-search')+' '+norm(' '.join(el.itertext())).lower())
 doc.set('lang','en')
 # Existing application fetches continue resolving against their original assets.
 base=etree.Element('base',href=original);doc.find('head').insert(0,base)
 if not doc.xpath('//link[@rel="canonical"]'):etree.SubElement(doc.find('head'),'link',rel='canonical',href=SITE+'/en'+original)
 for el in doc.xpath('//link[@rel="canonical"]'):el.set('href',SITE+'/en'+original)
 for el in doc.xpath('//meta[@property="og:url"]'):el.set('content',SITE+'/en'+original)
 for el in doc.xpath('//meta[@property="og:locale"]'):el.set('content','en_US')
 decorate(doc,original,True)
 dest=DIST/'en'/p.relative_to(DIST);dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(etree.tostring(doc,encoding='utf-8',method='html',doctype='<!DOCTYPE html>'))
(DIST/'bilingual-dictionary.json').write_text(json.dumps(cache,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(DIST/'bilingual-routes.json').write_text(json.dumps(sorted(routes)),encoding='utf-8')
namespace='http://www.sitemaps.org/schemas/sitemap/0.9';urlset=etree.Element('urlset',nsmap={None:namespace})
for p,doc in docs:
 if doc.xpath('//meta[@name="robots" and contains(@content,"noindex")]'):continue
 node=etree.SubElement(urlset,'url');etree.SubElement(node,'loc').text=SITE+'/en'+page_url(p)
(DIST/'english-sitemap.xml').write_bytes(etree.tostring(urlset,encoding='utf-8',xml_declaration=True))
for name in ['sitemap-index.xml','sitemap.xml']:
 index=DIST/name
 if index.exists():
  tree=etree.parse(str(index));node=etree.SubElement(tree.getroot(),'{'+namespace+'}sitemap');etree.SubElement(node,'{'+namespace+'}loc').text=SITE+'/english-sitemap.xml';tree.write(str(index),encoding='utf-8',xml_declaration=True)
report={'pages':len(docs),'translationStrings':len(cache),'newStrings':len(missing),'engine':'Argos/OpenNMT zh-en 1.9 / CTranslate2','englishPrefix':'/en/','translatedAt':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
(ROOT/'.bilingual/build-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report),flush=True)
