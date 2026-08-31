const SITE = 'https://tfcpeter-ltu.github.io/global-education-news';

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>
  <sitemap><loc>${SITE}/article-sitemap.xml</loc></sitemap>
  <sitemap><loc>${SITE}/news-sitemap.xml</loc></sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
