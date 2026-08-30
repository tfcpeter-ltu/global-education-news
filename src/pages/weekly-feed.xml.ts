import type { APIRoute } from 'astro';

const siteRoot = 'https://tfcpeter-ltu.github.io/global-education-news';
const WEEKLY_ITEM_LIMIT = 5;

const fallbackImages: Record<string, string> = {
  australia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Usydcampuspicture.jpg/1280px-Usydcampuspicture.jpg',
  canada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/University_of_Toronto_campus_in_November_2023_1.jpg/1280px-University_of_Toronto_campus_in_November_2023_1.jpg',
  uk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/University_college_London.jpg/1280px-University_college_London.jpg',
  us: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_Students.jpg/1280px-University_Students.jpg',
  taiwan: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/%E5%8F%B0%E5%A4%A7%E6%A0%A1%E5%9C%92%20-%20panoramio.jpg?width=1280',
  asia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_Students.jpg/1280px-University_Students.jpg',
  admissions: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_Students.jpg/1280px-University_Students.jpg',
  policy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_Students.jpg/1280px-University_Students.jpg'
};

const esc = (value: unknown) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const cdata = (value: unknown) => String(value ?? '').replaceAll(']]>', ']]]]><![CDATA[>');

const absoluteImage = (image: string | undefined, topic: string | undefined) => {
  const selected = image || fallbackImages[topic ?? ''] || fallbackImages.admissions;
  if (/^https?:\/\//i.test(selected)) return selected;
  return `${siteRoot}${selected.startsWith('/') ? '' : '/'}${selected}`;
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
    const image = absoluteImage(item.image, item.topic);
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
    <title>Global Education Weekly｜國際教育週報</title>
    <link>${siteRoot}/</link>
    <description>Global Education News 每週精選 5 篇國際教育新聞、大學招生、留學政策與深度專題。</description>
    <language>zh-TW</language>
    <pubDate>${latestDate}</pubDate>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>editor.jsti.ltu@gmail.com (Global Education News 編輯部)</managingEditor>
    <webMaster>editor.jsti.ltu@gmail.com (Global Education News 編輯部)</webMaster>${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
