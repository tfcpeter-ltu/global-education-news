"""Keep submitted URLs consistent with the final, bilingual HTML output."""
from pathlib import Path
from urllib.parse import urljoin
from lxml import html, etree
import json, re

DIST = Path(__file__).resolve().parents[1] / 'dist'
SITE = 'https://globalednews.com'
NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
pages = set()
excluded = []
added_canonicals = 0

for file in sorted(DIST.rglob('*.html')):
    relative = file.relative_to(DIST).as_posix()
    route = '/' + relative
    if route.endswith('/index.html'):
        route = route[:-10]
    url = SITE + route
    doc = html.document_fromstring(file.read_bytes())
    head = doc.find('head')
    if head is None or not doc.xpath('//title'):
        continue  # Preserve verification files verbatim.
    robots = ','.join(doc.xpath('//meta[translate(@name,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="robots"]/@content')).lower()
    refresh = doc.xpath('//meta[translate(@http-equiv,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="refresh"]')
    if refresh:
        target = re.search(r'url\s*=\s*(.+)', refresh[0].get('content', ''), re.I)
        if target:
            destination = urljoin(url, target[1].strip().strip('\"\''))
            links = doc.xpath('//link[@rel="canonical"]')
            if links:
                links[0].set('href', destination)
            else:
                etree.SubElement(head, 'link', rel='canonical', href=destination)
            file.write_bytes(etree.tostring(doc, encoding='utf-8', method='html', doctype='<!DOCTYPE html>'))
    if 'noindex' in robots or refresh:
        excluded.append(url)
        continue
    canonical = doc.xpath('//link[@rel="canonical"]')
    if not canonical:
        etree.SubElement(head, 'link', rel='canonical', href=url)
        file.write_bytes(etree.tostring(doc, encoding='utf-8', method='html', doctype='<!DOCTYPE html>'))
        added_canonicals += 1
        canonical_url = url
    else:
        canonical_url = urljoin(url, canonical[0].get('href', ''))
    if canonical_url != url:
        excluded.append(url)
        continue
    pages.add(url)

# Remove missing, redirected, noindex and non-canonical entries from every sitemap.
removed = 0
for file in DIST.rglob('*.xml'):
    if 'sitemap' not in file.name:
        continue
    tree = etree.parse(str(file))
    if etree.QName(tree.getroot()).localname != 'urlset':
        continue
    for node in list(tree.getroot()):
        loc = node.find('{'+NS+'}loc')
        if loc is not None and loc.text not in pages:
            tree.getroot().remove(node)
            removed += 1
    tree.write(str(file), encoding='utf-8', xml_declaration=True)

# Astro's sitemap does not include all files copied from public/. Include those
# canonical pages too, without invented lastmod dates or filter parameters.
root = etree.Element('urlset', nsmap={None: NS})
for url in sorted(pages):
    node = etree.SubElement(root, 'url')
    etree.SubElement(node, 'loc').text = url
etree.ElementTree(root).write(str(DIST/'pages-sitemap.xml'), encoding='utf-8', xml_declaration=True)
for name in ['sitemap.xml', 'sitemap-index.xml']:
    file = DIST / name
    tree = etree.parse(str(file))
    if SITE+'/pages-sitemap.xml' not in tree.xpath('//*[local-name()="loc"]/text()'):
        node = etree.SubElement(tree.getroot(), '{'+NS+'}sitemap')
        etree.SubElement(node, '{'+NS+'}loc').text = SITE+'/pages-sitemap.xml'
    tree.write(str(file), encoding='utf-8', xml_declaration=True)
print(json.dumps({'canonicalPages': len(pages), 'addedCanonicals': added_canonicals,
                  'removedSitemapEntries': removed, 'excludedPages': excluded}, ensure_ascii=False))
