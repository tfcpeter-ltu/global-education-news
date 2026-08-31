const SITE = 'https://globalednews.com';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const modules = import.meta.glob('./news/*.md', { eager: true });
  const cutoff = Date.now() - (2 * 24 * 60 * 60 * 1000);
  const articles = Object.entries(modules)
    .map(([path, mod]: [string, any]) => {
      const slug = path.replace('./news/', '').replace('.md', '');
      return { ...mod.frontmatter, slug };
    })
    .filter((article: any) => new Date(article.date).getTime() >= cutoff)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const urls = articles.map((article: any) => `
  <url>
    <loc>${SITE}/news/${escapeXml(article.slug)}/</loc>
    <news:news>
      <news:publication>
        <news:name>環球教育新聞</news:name>
        <news:language>zh-TW</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`).join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
