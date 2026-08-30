import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tfcpeter-ltu.github.io',
  base: '/global-education-news',
  output: 'static',
  integrations: [sitemap()]
});
