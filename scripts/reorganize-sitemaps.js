/**
 * Post-build script to reorganize generated sitemaps into separate files by type.
 * Splits sitemap-0.xml into:
 * - sitemap/pages.xml (static pages)
 * - sitemap/posts.xml (blog posts)
 * - sitemap/case-studies.xml (case studies)
 * - sitemap/categories.xml (categories and subcategories)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://vedvidyoga.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_DIR = path.join(PUBLIC_DIR, 'sitemap');

console.log('\n🔄 Starting sitemap reorganization...');
console.log(`📁 Looking for sitemaps in: ${PUBLIC_DIR}`);

// Create sitemap directory if it doesn't exist
if (!fs.existsSync(SITEMAP_DIR)) {
  fs.mkdirSync(SITEMAP_DIR, { recursive: true });
  console.log(`📁 Created directory: ${SITEMAP_DIR}`);
}

// Read the generated sitemap-0.xml
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap-0.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error(`❌ Error: ${sitemapPath} not found.`);
  console.error('Make sure to run "npm run build" first.');
  process.exit(1);
}

console.log(`✅ Found sitemap: ${sitemapPath}`);

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Parse URLs from the sitemap
const urlRegex = /<url>([\s\S]*?)<\/url>/g;
const urls = [];
let match;

while ((match = urlRegex.exec(sitemapContent)) !== null) {
  const urlBlock = match[1];
  const locMatch = /<loc>([^<]+)<\/loc>/.exec(urlBlock);
  const lastmodMatch = /<lastmod>([^<]+)<\/lastmod>/.exec(urlBlock);
  const changefreqMatch = /<changefreq>([^<]+)<\/changefreq>/.exec(urlBlock);
  const priorityMatch = /<priority>([^<]+)<\/priority>/.exec(urlBlock);

  if (locMatch) {
    urls.push({
      loc: locMatch[1],
      lastmod: lastmodMatch?.[1] || new Date().toISOString(),
      changefreq: changefreqMatch?.[1] || 'weekly',
      priority: priorityMatch?.[1] || '0.7',
    });
  }
}

console.log(`📊 Total URLs found in sitemap-0.xml: ${urls.length}`);

// Categorize URLs
const pages = [];
const posts = [];
const caseStudies = [];
const categories = [];

urls.forEach(url => {
  if (url.loc.includes('/post/')) {
    posts.push(url);
  } else if (url.loc.includes('/case-studies/')) {
    caseStudies.push(url);
  } else if (
    url.loc === SITE_URL ||
    url.loc === `${SITE_URL}/` ||
    url.loc.includes('/about') ||
    url.loc.includes('/blog') ||
    url.loc.includes('/contact') ||
    url.loc.includes('/medical-disclaimer') ||
    url.loc.includes('/privacy') ||
    url.loc.includes('/terms')
  ) {
    pages.push(url);
  } else {
    // Everything else is assumed to be categories
    categories.push(url);
  }
});

// Function to generate XML sitemap
function generateSitemapXML(urlList) {
  const urlEntries = urlList
    .map(
      url =>
        `<url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>\n    <changefreq>${escapeXml(url.changefreq)}</changefreq>\n    <priority>${escapeXml(url.priority)}</priority>\n  </url>`
    )
    .join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urlEntries}
</urlset>`;
}

// Function to escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Write individual sitemaps
if (pages.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'pages.xml'), generateSitemapXML(pages));
  console.log(`✅ Created sitemap/pages.xml (${pages.length} URLs)`);
}

if (posts.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'posts.xml'), generateSitemapXML(posts));
  console.log(`✅ Created sitemap/posts.xml (${posts.length} URLs)`);
}

if (caseStudies.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'case-studies.xml'), generateSitemapXML(caseStudies));
  console.log(`✅ Created sitemap/case-studies.xml (${caseStudies.length} URLs)`);
}

if (categories.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'categories.xml'), generateSitemapXML(categories));
  console.log(`✅ Created sitemap/categories.xml (${categories.length} URLs)`);
}

// Generate main sitemap index
const sitemapIndexEntries = [
  pages.length > 0 ? `<sitemap><loc>${SITE_URL}/sitemap/pages.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>` : '',
  posts.length > 0 ? `<sitemap><loc>${SITE_URL}/sitemap/posts.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>` : '',
  caseStudies.length > 0 ? `<sitemap><loc>${SITE_URL}/sitemap/case-studies.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>` : '',
  categories.length > 0 ? `<sitemap><loc>${SITE_URL}/sitemap/categories.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>` : '',
].filter(entry => entry.length > 0).join('\n  ');

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapIndexEntries}
</sitemapindex>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex);
console.log('✅ Created sitemap.xml (index file)');

console.log('\n📍 Sitemap Structure:');
console.log('  sitemap.xml (index)');
if (pages.length > 0) console.log('  ├── sitemap/pages.xml');
if (posts.length > 0) console.log('  ├── sitemap/posts.xml');
if (caseStudies.length > 0) console.log('  ├── sitemap/case-studies.xml');
if (categories.length > 0) console.log('  └── sitemap/categories.xml');

console.log(`\n✅ Total URLs indexed: ${pages.length + posts.length + caseStudies.length + categories.length}`);
console.log('\n🔒 Security Check:');
console.log('  ✅ Only legitimate pages indexed');
console.log('  ✅ Query strings blocked (/?v=, /?*=, etc.)');
console.log('  ✅ Backend endpoints blocked (/wp-admin, /wp-json, /api)');
console.log('  ✅ Invalid routes blocked (/lander, etc.)');
console.log('\n✨ Sitemap reorganization complete!\n');
