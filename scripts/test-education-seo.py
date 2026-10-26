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
robots = (DIST / 'robots.txt').read_text(encoding='utf-8')
for bot in ['Googlebot', 'Bingbot', 'OAI-SearchBot']:
    assert f'User-agent: {bot}\nAllow: /' in robots.replace('\r\n', '\n'), bot
print(json.dumps({'entryPages': len(ROUTES), 'articleSchemas': counts, 'localLinks': 'passed', 'sitemap': 'passed', 'robots': 'passed'}, ensure_ascii=False))
