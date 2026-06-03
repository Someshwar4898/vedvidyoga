import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://vedvidyoga.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_DIR = path.join(PUBLIC_DIR, 'sitemap');

console.log('\n Starting hierarchical sitemap reorganization...');
console.log(' Looking for sitemaps in: ' + PUBLIC_DIR);

if (!fs.existsSync(SITEMAP_DIR)) {
  fs.mkdirSync(SITEMAP_DIR, { recursive: true });
  console.log(' Created directory: ' + SITEMAP_DIR);
}

const sitemapPath = path.join(PUBLIC_DIR, 'sitemap-0.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error(' Error: ' + sitemapPath + ' not found.');
  console.error('Make sure to run "npm run build" first.');
  process.exit(1);
}

console.log(' Found sitemap: ' + sitemapPath);

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

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

console.log(' Total URLs found in sitemap-0.xml: ' + urls.length);

const staticPages = [];
const blogPages = [];
const categories = [];
const posts = [];
const caseStudies = [];
const testimonials = [];

urls.forEach(url => {
  const loc = url.loc;
  
  if (
    loc === SITE_URL ||
    loc === SITE_URL + '/' ||
    loc === SITE_URL + '/about' ||
    loc === SITE_URL + '/contact' ||
    loc === SITE_URL + '/privacy' ||
    loc === SITE_URL + '/terms' ||
    loc === SITE_URL + '/medical-disclaimer' ||
    loc === SITE_URL + '/case-studies'
  ) {
    staticPages.push(url);
  }
  else if (loc === SITE_URL + '/blog' || loc === SITE_URL + '/blog/') {
    blogPages.push(url);
  }
  else if (loc.includes('/testimonials/')) {
    testimonials.push(url);
  }
  else if (loc.includes('/case-studies/')) {
    caseStudies.push(url);
  }
  else if (loc.includes('/post/')) {
    posts.push(url);
  }
  else if (loc.match(/\/[a-z-]+\/[a-z-]+$/i)) {
    categories.push({ ...url, type: 'subcategory' });
  }
  else if (loc.match(/\/[a-z-]+$/i) && !loc.includes('.')) {
    categories.push({ ...url, type: 'category' });
  }
  else {
    staticPages.push(url);
  }
});

categories.sort((a, b) => {
  if (a.type === 'category' && b.type === 'subcategory') return -1;
  if (a.type === 'subcategory' && b.type === 'category') return 1;
  return a.loc.localeCompare(b.loc);
});

posts.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
caseStudies.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));

function escapeXml(str) {
  if (!str) return '';
  const s = String(str);
  return s.replace(/&/g, '\u0026amp;').replace(/</g, '\u003Clt;').replace(/>/g, '\u003Egt;').replace(/"/g, '\u0022quot;').replace(/'/g, '\u0027apos;');
}

function generateSitemapXML(urlList) {
  const urlEntries = urlList
    .map(url => {
      return '    <url>\n      <loc>' + escapeXml(url.loc) + '</loc>\n      <lastmod>' + escapeXml(url.lastmod) + '</lastmod>\n      <changefreq>' + escapeXml(url.changefreq) + '</changefreq>\n      <priority>' + escapeXml(url.priority) + '</priority>\n    </url>';
    })
    .join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n' + urlEntries + '\n</urlset>';
}

function generateSitemapIndex(sitemaps) {
  const entries = sitemaps
    .filter(s => s.count > 0)
    .map(s => '  <sitemap>\n    <loc>' + SITE_URL + '/' + s.file + '</loc>\n    <lastmod>' + new Date().toISOString() + '</lastmod>\n  </sitemap>')
    .join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '\n</sitemapindex>';
}

const sitemapsToIndex = [];

if (staticPages.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'pages.xml'), generateSitemapXML(staticPages));
  console.log(' Created sitemap/pages.xml (' + staticPages.length + ' URLs) - Main pages');
  sitemapsToIndex.push({ file: 'sitemap/pages.xml', count: staticPages.length });
}

if (blogPages.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'blog.xml'), generateSitemapXML(blogPages));
  console.log(' Created sitemap/blog.xml (' + blogPages.length + ' URLs) - Blog index');
  sitemapsToIndex.push({ file: 'sitemap/blog.xml', count: blogPages.length });
}

if (categories.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'categories.xml'), generateSitemapXML(categories));
  console.log(' Created sitemap/categories.xml (' + categories.length + ' URLs) - Categories and Subcategories');
  sitemapsToIndex.push({ file: 'sitemap/categories.xml', count: categories.length });
}

if (posts.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'posts.xml'), generateSitemapXML(posts));
  console.log(' Created sitemap/posts.xml (' + posts.length + ' URLs) - Individual posts');
  sitemapsToIndex.push({ file: 'sitemap/posts.xml', count: posts.length });
}

if (caseStudies.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'case-studies.xml'), generateSitemapXML(caseStudies));
  console.log(' Created sitemap/case-studies.xml (' + caseStudies.length + ' URLs) - Case studies');
  sitemapsToIndex.push({ file: 'sitemap/case-studies.xml', count: caseStudies.length });
}

if (testimonials.length > 0) {
  fs.writeFileSync(path.join(SITEMAP_DIR, 'testimonials.xml'), generateSitemapXML(testimonials));
  console.log(' Created sitemap/testimonials.xml (' + testimonials.length + ' URLs) - Testimonials');
  sitemapsToIndex.push({ file: 'sitemap/testimonials.xml', count: testimonials.length });
}

const sitemapIndex = generateSitemapIndex(sitemapsToIndex);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex);
console.log(' Created sitemap.xml (main index file)');

const totalUrls = staticPages.length + blogPages.length + categories.length + posts.length + caseStudies.length + testimonials.length;
console.log('\n Total URLs indexed: ' + totalUrls);
console.log('\n Hierarchical sitemap reorganization complete!');