import { blogContent } from '../src/data/blogContent.mjs';
import fs from 'fs';

async function generateSitemap() {
  // Base URLs that don't change
  const staticPages = [
    '',                  // homepage
    '/investors',
    '/licensing',
    '/interactions',
    '/team',
    '/careers',
    '/blog',
    '/podcast'
  ];

  // Get all blog URLs from blogContent.js
  const blogPosts = Object.keys(blogContent).map(slug => `/blog/${slug}`);

  // Combine static pages and blog posts
  const allPages = [...staticPages, ...blogPosts];

  // Create XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(path => `
        <url>
          <loc>https://www.glimpse.wiki${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
          <priority>${path === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Save the sitemap
  fs.writeFileSync('public/sitemap.xml', sitemap);
  
  // Log results
  console.log('✅ Sitemap generated successfully!');
  console.log(`📄 Total pages: ${allPages.length}`);
  console.log(`📚 Blog posts: ${blogPosts.length}`);
}

// Run the generator
generateSitemap().catch(console.error);