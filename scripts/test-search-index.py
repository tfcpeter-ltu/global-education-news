"""Verify submitted URLs exist and are indexable canonical pages."""
from pathlib import Path
from urllib.parse import urlsplit, unquote
from lxml import html, etree

dist = Path(__file__).resolve().parents[1] / 'dist'
site = 'https://globalednews.com'
checked = set()
for sitemap in dist.rglob('*sitemap*.xml'):
    tree = etree.parse(str(sitemap))
    if etree.QName(tree.getroot()).localname == 'sitemapindex':
        for url in tree.xpath('//*[local-name()="loc"]/text()'):
            assert (dist / urlsplit(url).path.lstrip('/')).is_file(), url
        continue
    urls = tree.xpath('//*[local-name()="url"]/*[local-name()="loc"]/text()')
    assert len(urls) == len(set(urls)), sitemap
    for url in urls:
        parsed = urlsplit(url)
        assert parsed.scheme+'://'+parsed.netloc == site and not parsed.query and not parsed.fragment, url
        file = dist / unquote(parsed.path).lstrip('/')
        if parsed.path.endswith('/'):
            file /= 'index.html'
        assert file.is_file(), url
        doc = html.document_fromstring(file.read_bytes())
        assert doc.xpath('//link[@rel="canonical"]/@href') == [url], url
        assert not doc.xpath('//meta[translate(@http-equiv,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="refresh"]'), url
        assert not any('noindex' in s.lower() for s in doc.xpath('//meta[@name="robots"]/@content')), url
        checked.add(url)
assert site+'/study-abroad/majors.html' in checked
assert site+'/en/study-abroad/majors.html' in checked
assert site+'/image-credits/' not in checked
assert site+'/news/us-f1-j1-fixed-admission-period-2026/' not in checked
redirect = html.document_fromstring((dist/'news/us-f1-j1-fixed-admission-period-2026/index.html').read_bytes())
target = redirect.xpath('//link[@rel="canonical"]/@href')[0]
assert target in checked
print(f'PASS: {len(checked)} unique sitemap URLs resolve to indexable canonical HTML; old news route points to an existing article')
