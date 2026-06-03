/**
 * Generate image sitemaps from WordPress API content
 * Fetches posts, case-studies, and categories to extract featured images
 * Creates separate image sitemap XML files
 * Runs as part of the build process
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const sitemapDir = path.join(projectRoot, 'public', 'sitemap');

// Ensure sitemap directory exists
if (!fs.existsSync(sitemapDir)) {
  fs.mkdirSync(sitemapDir, { recursive: true });
}

const DOMAIN = 'https://vedvidyoga.com';
const WP_API_BASE = 'https://api.vedvidyoga.com/wp-json/wp/v2';

// Helper function to fetch data from WP API with pagination
async function fetchWPData(endpoint, maxPages = 10) {
  const items = [];
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const response = await fetch(`${WP_API_BASE}${endpoint}?page=${page}&per_page=100&_fields=id,slug,title,featured_media,featured_media_urls`);
      
      if (!response.ok) {
        if (response.status === 400) {
          console.log(`⚠️  Page ${page} for ${endpoint} returned 400 - stopping pagination`);
          break;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) break;

      items.push(...data);
    } catch (error) {
      if (page === 1) {
        console.error(`❌ Error fetching ${endpoint}: ${error.message}`);
      }
      break;
    }
  }

  return items;
}

// Extract unique images from items
function extractImages(items, urlPrefix) {
  const images = new Set();

  items.forEach(item => {
    // Add featured image if it exists
    if (item.featured_media_urls?.medium) {
      images.add(item.featured_media_urls.medium);
    } else if (item.featured_media_urls?.full) {
      images.add(item.featured_media_urls.full);
    } else if (item.featured_media_urls?.source_url) {
      images.add(item.featured_media_urls.source_url);
    }

    // Extract images from content if available
    if (item.content?.rendered) {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = imgRegex.exec(item.content.rendered)) !== null) {
        images.add(match[1]);
      }
    }
  });

  return Array.from(images).map(imgUrl => ({
    url: imgUrl,
    pageUrl: urlPrefix,
    title: '',
  }));
}

// Generate image sitemap XML
function generateImageSitemapXML(images, sitemapName) {
  const timestamp = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  images.forEach(img => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXML(img.pageUrl)}</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${escapeXML(img.url)}</image:loc>\n`;
    if (img.title) {
      xml += `      <image:title>${escapeXML(img.title)}</image:title>\n`;
    }
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Escape special XML characters
function escapeXML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate combined sitemap with page URLs and their images
function generatePageImageSitemapXML(pagesByUrl) {
  const timestamp = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  pagesByUrl.forEach((pageData) => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXML(pageData.url)}</loc>\n`;
    xml += `    <lastmod>${escapeXML(pageData.lastmod || timestamp)}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';

    pageData.images.forEach(imgUrl => {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXML(imgUrl)}</image:loc>\n`;
      xml += '    </image:image>\n';
    });

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Main function
async function generateImageSitemaps() {
  console.log('🖼️  Generating image sitemaps...');

  try {
    // Fetch data from WordPress
    console.log('📡 Fetching posts from WordPress API...');
    const posts = await fetchWPData('/posts', 10);
    console.log(`✅ Fetched ${posts.length} posts`);

    console.log('📡 Fetching case-studies from WordPress API...');
    const caseStudies = await fetchWPData('/case-studies', 10);
    console.log(`✅ Fetched ${caseStudies.length} case-studies`);

    console.log('📡 Fetching categories from WordPress API...');
    const categories = await fetchWPData('/categories', 10);
    console.log(`✅ Fetched ${categories.length} categories`);

    // Build image maps by content type
    const postImages = {};
    const caseStudyImages = {};

    // Organize post images by URL
    posts.forEach(post => {
      const url = `${DOMAIN}/post/${post.slug}`;
      if (!postImages[url]) {
        postImages[url] = { url, lastmod: post.modified || new Date().toISOString(), images: [] };
      }
      
      if (post.featured_media_urls?.medium) {
        postImages[url].images.push(post.featured_media_urls.medium);
      } else if (post.featured_media_urls?.full) {
        postImages[url].images.push(post.featured_media_urls.full);
      } else if (post.featured_media_urls?.source_url) {
        postImages[url].images.push(post.featured_media_urls.source_url);
      }
    });

    // Organize case-study images by URL
    caseStudies.forEach(cs => {
      const url = `${DOMAIN}/case-studies/${cs.slug}`;
      if (!caseStudyImages[url]) {
        caseStudyImages[url] = { url, lastmod: cs.modified || new Date().toISOString(), images: [] };
      }
      
      if (cs.featured_media_urls?.medium) {
        caseStudyImages[url].images.push(cs.featured_media_urls.medium);
      } else if (cs.featured_media_urls?.full) {
        caseStudyImages[url].images.push(cs.featured_media_urls.full);
      } else if (cs.featured_media_urls?.source_url) {
        caseStudyImages[url].images.push(cs.featured_media_urls.source_url);
      }
    });

    // Generate image sitemaps
    const postsWithImages = Object.values(postImages).filter(p => p.images.length > 0);
    const caseStudiesWithImages = Object.values(caseStudyImages).filter(cs => cs.images.length > 0);

    console.log(`\n📸 Posts with images: ${postsWithImages.length}`);
    console.log(`📸 Case-studies with images: ${caseStudiesWithImages.length}`);

    // Write posts image sitemap
    if (postsWithImages.length > 0) {
      const postsImageXML = generatePageImageSitemapXML(postsWithImages);
      fs.writeFileSync(path.join(sitemapDir, 'posts-images.xml'), postsImageXML);
      console.log('✅ Created sitemap/posts-images.xml');
    }

    // Write case-studies image sitemap
    if (caseStudiesWithImages.length > 0) {
      const caseStudiesImageXML = generatePageImageSitemapXML(caseStudiesWithImages);
      fs.writeFileSync(path.join(sitemapDir, 'case-studies-images.xml'), caseStudiesImageXML);
      console.log('✅ Created sitemap/case-studies-images.xml');
    }

    console.log('✅ Image sitemaps generated successfully!');

  } catch (error) {
    console.error('❌ Error generating image sitemaps:', error.message);
    process.exit(1);
  }
}

generateImageSitemaps();
