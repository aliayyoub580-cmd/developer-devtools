import { allTools, categories } from '../data/toolRegistry';

const Sitemap = () => {
  return null;
};

export default Sitemap;

// Generate sitemap.xml dynamically
export const generateSitemap = () => {
  const baseUrl = 'https://devtools.example.com';

  const urls = [
    { url: baseUrl, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, changefreq: 'weekly', priority: 0.8 },
    ...categories.map(category => ({
      url: `${baseUrl}/category/${category.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
    })),
    ...allTools.map(tool => ({
      url: `${baseUrl}${tool.route}`,
      changefreq: 'weekly',
      priority: 0.6,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};
