import type { APIRoute } from 'astro';
import { getStoryImageInfo } from '../lib/storyImages';
import { weeklyScholarships, scholarshipDigestHtml } from '../lib/weekly-scholarships.mjs';

const siteRoot = 'https://globalednews.com';
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
  const now = new Date();
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

  let xmlItems = items.map((item: any) => {
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

  const scholarshipPages = import.meta.glob('./scholarships/items/*.md', { eager: true }) as Record<string, any>;
  const reports = import.meta.glob('../../docs/daily-reports/*.json', { eager: true, import: 'default' }) as Record<string, any>;
  const digest = weeklyScholarships(Object.entries(scholarshipPages).map(([key, mod]) => ({
    ...mod.frontmatter, slug: key.split('/').pop()!.replace(/\.md$/, '')
  })), Object.values(reports), now);
  if (digest.items.length) {
    const photo = getStoryImageInfo(digest.items[0]);
    xmlItems += `
    <item>
      <title>${esc(`台灣國際獎學金｜本週新增 ${digest.items.length} 項（${digest.start}–${digest.end}）`)}</title>
      <link>${siteRoot}/scholarships/</link>
      <guid isPermaLink="false">${siteRoot}/weekly-scholarships/${digest.start}/${digest.end}</guid>
      <pubDate>${esc(new Date(`${digest.end}T05:00:00+08:00`).toUTCString())}</pubDate>
      <category>台灣國際獎學金｜本週新增</category>
      <description><![CDATA[${cdata(scholarshipDigestHtml(digest))}]]></description>
      <enclosure url="${esc(absoluteImage(photo.url))}" length="0" type="image/jpeg" />
    </item>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Global Education Weekly｜環球教育週報</title>
    <link>${siteRoot}/</link>
    <description>環球教育新聞 Global Education News 每週精選 6 篇國際教育新聞、大學招生、留學政策與深度專題，另附台灣國際獎學金本週新增項目的摘要與連結。</description>
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
