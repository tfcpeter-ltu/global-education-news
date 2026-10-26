"""Check rendered search entry points and shared article semantics after build."""
import json
from pathlib import Path
from urllib.parse import urlsplit, unquote
from lxml import html

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
TOPICS = ['us', 'canada', 'uk', 'australia', 'asia', 'admissions', 'policy', 'taiwan']
ROUTES = ['/', '/news/', '/international-education/'] + [f'/topics/{key}/' for key in TOPICS]
titles = set()
for route in ROUTES:
    page = DIST / route.lstrip('/') / 'index.html'
    doc = html.fromstring(page.read_bytes())
    title = doc.xpath('string(//title)').strip()
    assert title and title not in titles, (route, 'missing or duplicate title')
    titles.add(title)
    assert len(doc.xpath('//main//h1')) == 1, (route, 'expected one main heading')
    assert len(doc.xpath('//link[@rel="canonical"]')) == 1, route
    assert doc.xpath('//link[@rel="canonical"]/@href') == ['https://globalednews.com' + route], route
    assert doc.xpath('//meta[@name="description"]/@content'), route
    assert not any('noindex' in v for v in doc.xpath('//meta[@name="robots"]/@content')), route
    schemas = [json.loads(s) for s in doc.xpath('//script[@type="application/ld+json"]/text()')]
    assert any(s.get('@type') == 'CollectionPage' for s in schemas), route
    for href in doc.xpath('//main//a/@href'):
        url = urlsplit(href)
        if url.netloc or not url.path.startswith('/'):
            continue
        target = DIST / unquote(url.path).lstrip('/')
        assert target.is_file() or (target / 'index.html').is_file(), (route, href, 'broken local link')

counts = {'NewsArticle': 0, 'Article': 0}
for section, expected in [('news', 'NewsArticle'), ('insight', 'Article')]:
    for page in (DIST / section).glob('*/index.html'):
        doc = html.fromstring(page.read_bytes())
        if doc.xpath('//meta[@http-equiv="refresh"]'):
            continue  # Historical URL redirects have no article body.
        schemas = [json.loads(s) for s in doc.xpath('//script[@type="application/ld+json"]/text()')]
        articles = [s for s in schemas if s.get('@type') in ('NewsArticle', 'Article')]
        assert len(articles) == 1 and articles[0]['@type'] == expected, page
        assert articles[0].get('headline') and articles[0].get('datePublished'), page
        if section == 'news':
            visible_sources = doc.xpath('//aside[contains(@class,"source-box")]//a/@href')
            assert articles[0].get('citation', []) == visible_sources, (page, 'citation mismatch')
        assert doc.xpath('//aside[contains(@class,"article-related")]//a[contains(@href,"/international-education/")]'), page
        counts[expected] += 1

assert 'https://globalednews.com/international-education/' in (DIST / 'sitemap-0.xml').read_text(encoding='utf-8')
profile = html.fromstring((DIST / 'peter/about/index.html').read_bytes())
profile_schema = [json.loads(s) for s in profile.xpath('//script[@type="application/ld+json"]/text()')]
person = next(s['mainEntity'] for s in profile_schema if s.get('@type') == 'ProfilePage')
assert person['name'] == '陳祖豐' and person['@id'].endswith('/peter/about/#person')
assert len(profile.xpath('//main//h1')) == 1
assert profile.xpath('//link[@rel="canonical"]/@href') == [person['url']]
for page in (DIST / 'peter').glob('*/index.html'):
    doc = html.fromstring(page.read_bytes())
    for value in doc.xpath('//script[@type="application/ld+json"]/text()'):
        schema = json.loads(value)
        if schema.get('@type') == 'BlogPosting':
            assert schema['author']['@id'] == person['@id'], page
            assert doc.xpath('//a[@href="/peter/about/"]'), page
assert (DIST / 'about/index.html').read_text(encoding='utf-8').find('id="editorial-team"') != -1
books = html.fromstring((DIST / 'peter/books/index.html').read_bytes())
book_data = [json.loads(s) for s in books.xpath('//script[@type="application/ld+json"]/text()')]
collection = next(s for s in book_data if 'mainEntity' in s and s['mainEntity'].get('@type') == 'ItemList')
entries = collection['mainEntity']['itemListElement']
assert len(entries) == collection['mainEntity']['numberOfItems'] == len(books.xpath('//article[contains(@class,"book-entry")]'))
for item in entries:
    work = item['item']
    assert work['author']['@id'] == person['@id']
    if work['@type'] == 'Book' and work.get('isbn'):
        isbn = work['isbn']
        assert len(isbn) == 13 and sum(int(n) * (1 if i % 2 == 0 else 3) for i, n in enumerate(isbn)) % 10 == 0
        assert books.xpath('//a[@href=$url]', url=work['citation'])
    elif work['@type'] == 'Book':
        assert work['creativeWorkStatus'] == '出版資訊待補'
assert len(entries) == 12
assert len({item['item']['@id'] for item in entries}) == 12
assert 'https://globalednews.com/peter/books/' in (DIST / 'sitemap-0.xml').read_text(encoding='utf-8')
robots = (DIST / 'robots.txt').read_text(encoding='utf-8')
for bot in ['Googlebot', 'Bingbot', 'OAI-SearchBot']:
    assert f'User-agent: {bot}\nAllow: /' in robots.replace('\r\n', '\n'), bot
print(json.dumps({'entryPages': len(ROUTES), 'articleSchemas': counts, 'localLinks': 'passed', 'sitemap': 'passed', 'robots': 'passed'}, ensure_ascii=False))
