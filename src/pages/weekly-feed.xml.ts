import type { APIRoute } from 'astro';
import { getStoryImageInfo } from '../lib/storyImages';

const siteRoot = 'https://tfcpeter-ltu.github.io/global-education-news';
const WEEKLY_ITEM_LIMIT = 6;

const esc = (value: unknown) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const cdata = (value: unknown) => String(value ?? '').replaceAll(']]>', ']]]]><![CDATA[>');

const absoluteImage = (image: string) => {
  if (/^https?:\/\//i.test(image)) return image;
  return `${siteRoot}${image.startsWith('/') ? '' : '/'}${image}`;
};

const itemUrl = (key: string) => {
  const match = key.match(/^\.\/(news|insight)\/(.+)\.md$/);
  if (!match) return siteRoot;
  return `${siteRoot}/${match[1]}/${match[2]}/`;
};

export const GET: APIRoute = () => {
  const newsModules = import.meta.glob('./news/*.md', { eager: true });
  const insightModules = import.meta.glob('./insight/*.md', { eager: true });
  const modules = { ...newsModules, ...insightModules } as Record<string, any>;

  const items = Object.entries(modules)
    .map(([key, mod]: [string, any]) => ({
      key,
      ...mod.frontmatter,
      url: itemUrl(key)
    }))
    .filter((item: any) => item.title && item.date)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, WEEKLY_ITEM_LIMIT);

  const lastBuild = new Date().toUTCString();
  const latestDate = items[0]?.date ? new Date(items[0].date).toUTCString() : lastBuild;

  const xmlItems = items.map((item: any) => {
    const photo = getStoryImageInfo(item);
    const image = absoluteImage(photo.url);
    const description = `<p>${esc(item.description ?? '')}</p>`;
    return `
    <item>
      <title>${esc(item.title)}</title>
      <link>${esc(item.url)}</link>
      <guid isPermaLink="true">${esc(item.url)}</guid>
      <pubDate>${esc(new Date(item.date).toUTCString())}</pubDate>
      <category>${esc(item.category ?? '國際教育')}</category>
      <description><![CDATA[${cdata(description)}]]></description>
      <enclosure url="${esc(image)}" length="0" type="image/jpeg" />
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Global Education Weekly｜環球教育週報</title>
    <link>${siteRoot}/</link>
    <description>環球教育新聞 Global Education News 每週精選 6 篇國際教育新聞、大學招生、留學政策與深度專題。</description>
    <language>zh-TW</language>
    <pubDate>${latestDate}</pubDate>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>editor.jsti.ltu@gmail.com (LTU Global Education News 編輯部)</managingEditor>
    <webMaster>editor.jsti.ltu@gmail.com (LTU Global Education News 編輯部)</webMaster>${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};