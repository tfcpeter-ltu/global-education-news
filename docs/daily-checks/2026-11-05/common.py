import pathlib,json,datetime
R=pathlib.Path.cwd();D='2026-11-05';NOW=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()
load=lambda p:json.loads((R/p).read_text(encoding='utf-8-sig'))
def save(p,v):
 p=R/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
r=load(f'docs/daily-reports/{D}.json');over=load('src/data/i18n/en-overrides.json');photos={p['key']:p for p in load(f'docs/image-licenses/{D}.json')}
def t(z,e):over[z]=e;return z
def write(k,slug,title,en,desc,de,paras,urls,kind='news',extra=None):
 folder='scholarships/items' if kind=='award' else kind;path=f'src/pages/{folder}/{slug}.md';p=photos[k]
 fm=dict(layout=('../../../' if kind=='award' else '../../')+'layouts/'+('ScholarshipLayout.astro' if kind=='award' else 'ArticleLayout.astro'),title=t(title,en),description=t(desc,de),date=D if kind=='award' else NOW,author='LTU Global Education News 編輯部',category=t('國際獎學金' if kind=='award' else '國際教育新聞','International scholarships' if kind=='award' else 'International education news'),topic={'ca':'canada','india':'asia','arab':'global'}.get(k,'uk'),sources=[dict(label='Source '+str(i+1),url=u) for i,u in enumerate(urls)],image='/'+p['file'].removeprefix('public/'),imageAlt=t('校園授權資料照，非報導事件現場','Licensed campus archive photograph, not the reported event'),imageCredit=p['author']+' / '+p['license'],imageSource=p['source'],imageLicense=p['license'])
 if extra:fm.update(extra)
 for suffix,es in [('｜環球教育新聞網 Global Education News',' | Global Education News'),('｜台灣國際獎學金雷達',' | Taiwan Global Scholarship Radar')]:over[title+suffix]=en+es
 body=[]
 for h,he,z,e in paras:
  body += ['## '+t(h,he),t(z,e)]
 text='---\n'+''.join(x+': '+json.dumps(v,ensure_ascii=False)+'\n' for x,v in fm.items())+'---\n\n'+'\n\n'.join(body)+f'\n\n[Photo credits](/images/daily/{D}/credits.html#{k})\n'
 assert not (R/path).exists();(R/path).write_text(text,encoding='utf8')
 return dict(slug=slug,title=title,url=f'https://globalednews.com/{folder}/{slug}/',publishedPath=path,sources=fm['sources'],verifiedAt=NOW)

