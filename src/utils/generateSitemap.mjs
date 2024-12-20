import fs from 'fs';
import path from 'path';
import { blogContent } from '../data/blogContent.mjs';

const SITE_URL = 'https://www.glimpse.wiki/';

function generateSitemap() {
  // Get all blog URLs
  const blogUrls = Object.keys(blogContent).map(slug => ({
    url: `${SITE_URL}/blog/${slug}`,
    priority: 0.8,
    changefreq: 'weekly'
  }));

  // Add your static routes
  const staticUrls = [
    {
      url: 'https://www.glimpse.wiki',
      priority: 1.0,
      changefreq: 'daily'
    },
    {
      url: 'https://www.glimpse.wiki/investors',
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: 'https://www.glimpse.wiki/licensing',
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: 'https://www.glimpse.wiki/interactions',
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: 'https://www.glimpse.wiki/team',
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: 'https://www.glimpse.wiki/careers',
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: 'https://www.glimpse.wiki/blog',
      priority: 0.9,
      changefreq: 'weekly'
    },
    {
      url: 'https://www.glimpse.wiki/podcast',
      priority: 0.8,
      changefreq: 'weekly'
    }
  ];

  // Combine all URLs
  const allUrls = [...staticUrls, ...blogUrls];

  // Generate XML
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, priority, changefreq }) => `  <url>
    <loc>${url}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}${priority ? `
    <priority>${priority}</priority>` : ''}${changefreq ? `
    <changefreq>${changefreq}</changefreq>` : ''}
  </url>`).join('\n')}
</urlset>`;

  // Write the file
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent);
  console.log('Sitemap generated successfully at public/sitemap.xml');

  return xmlContent.trim();
}

// Remove the CommonJS check and just call the function
generateSitemap();

export { generateSitemap };