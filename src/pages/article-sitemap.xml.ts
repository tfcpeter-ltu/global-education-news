const SITE = 'https://globalednews.com';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const modules = import.meta.glob('./news/*.md', { eager: true });

  const articles = Object.entries(modules)
    .map(([path, mod]: [string, any]) => {
      const slug = path.replace('./news/', '').replace('.md', '');
      const frontmatter = mod.frontmatter ?? {};
      const lastmod = frontmatter.updated ?? frontmatter.date;
      return {
        slug,
        date: frontmatter.date,
        lastmod
      };
    })
    .filter((article: any) => article.slug && article.date)
    .sort((a: any, b: any) => new Date(b.lastmod ?? b.date).getTime() - new Date(a.lastmod ?? a.date).getTime());

  const urls = articles.map((article: any) => `
  <url>
    <loc>${SITE}/news/${escapeXml(article.slug)}/</loc>
    <lastmod>${new Date(article.lastmod ?? article.date).toISOString()}</lastmod>
  </url>`).join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
