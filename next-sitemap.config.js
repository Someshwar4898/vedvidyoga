/**
 * Next.js Sitemap Configuration
 * Generates hierarchical sitemap for search engine crawlers
 * Dynamic content updates automatically when new posts, case studies, testimonials, or categories are published
 */

const API_BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "https://api.vedvidyoga.com";
const SITE_URL = "https://vedvidyoga.com";

// Helper to fetch paginated content from WordPress API
async function fetchPaginatedContent(endpoint, perPage = 100) {
  let allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await fetch(
        `${API_BASE}/wp-json/wp/v2${endpoint}?per_page=${perPage}&page=${page}&orderby=modified&order=desc`,
        { timeout: 5000 }
      );

      if (!res.ok) {
        console.warn(`Failed to fetch ${endpoint} page ${page}: ${res.status}`);
        break;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        hasMore = false;
        break;
      }

      allItems = allItems.concat(data);
      page++;

      // Safety limits
      if (allItems.length >= 500 || page > 10) {
        hasMore = false;
      }
    } catch (err) {
      console.warn(`Error fetching ${endpoint} page ${page}:`, err.message);
      hasMore = false;
    }
  }

  return allItems;
}

// Static pages - always included as they exist on the website
function getStaticPages() {
  return [
    {
      loc: SITE_URL,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0', // Highest priority for homepage
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.9', // High priority for blog index
    },
    {
      loc: `${SITE_URL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7',
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7',
    },
    {
      loc: `${SITE_URL}/case-studies`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${SITE_URL}/privacy`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.4',
    },
    {
      loc: `${SITE_URL}/terms`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.4',
    },
    {
      loc: `${SITE_URL}/medical-disclaimer`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.4',
    },
  ];
}

// Fetch posts with category hierarchy
async function getPostPaths() {
  const paths = [];
  try {
    const posts = await fetchPaginatedContent('/posts');
    
    posts.forEach(post => {
      if (post.status === 'publish') {
        paths.push({
          loc: `${SITE_URL}/post/${post.slug}`,
          lastmod: new Date(post.modified).toISOString(),
          changefreq: 'weekly',
          priority: '0.7', // Individual posts
        });
      }
    });
    console.log(`✅ Added ${paths.length} posts to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch posts:', err.message);
  }
  return paths;
}

// Fetch case studies
async function getCaseStudyPaths() {
  const paths = [];
  try {
    const caseStudies = await fetchPaginatedContent('/case-studies');
    
    caseStudies.forEach(cs => {
      if (cs.status === 'publish') {
        paths.push({
          loc: `${SITE_URL}/case-studies/${cs.slug}`,
          lastmod: new Date(cs.modified).toISOString(),
          changefreq: 'weekly',
          priority: '0.75', // Case studies are important
        });
      }
    });
    console.log(`✅ Added ${paths.length} case studies to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch case studies:', err.message);
  }
  return paths;
}

// Fetch testimonials
async function getTestimonialPaths() {
  const paths = [];
  try {
    const testimonials = await fetchPaginatedContent('/testimonials');
    
    testimonials.forEach(t => {
      if (t.status === 'publish') {
        paths.push({
          loc: `${SITE_URL}/testimonials/${t.slug}`,
          lastmod: new Date(t.modified).toISOString(),
          changefreq: 'monthly',
          priority: '0.6', // Testimonials are secondary
        });
      }
    });
    console.log(`✅ Added ${paths.length} testimonials to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch testimonials:', err.message);
  }
  return paths;
}

// Fetch categories with hierarchy (parent → child)
async function getCategoryPaths() {
  const paths = [];
  try {
    const categories = await fetchPaginatedContent('/categories');
    const categoryMap = {};

    // Build category map by ID
    categories.forEach(cat => {
      categoryMap[cat.id] = cat;
    });

    // Process categories with proper hierarchy
    categories.forEach(cat => {
      // Skip uncategorized
      if (cat.slug === 'uncategorized') return;
      
      // Only include categories that have content
      if (cat.count > 0 || cat.parent === 0) {
        if (cat.parent === 0) {
          // Parent category (e.g., /ayurveda)
          paths.push({
            loc: `${SITE_URL}/${cat.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.85', // Parent categories are important
          });
        } else {
          // Subcategory (e.g., /ayurveda/dinacharya)
          const parent = categoryMap[cat.parent];
          if (parent) {
            paths.push({
              loc: `${SITE_URL}/${parent.slug}/${cat.slug}`,
              lastmod: new Date().toISOString(),
              changefreq: 'weekly',
              priority: '0.8', // Subcategories are important
            });
          }
        }
      }
    });
    console.log(`✅ Added ${paths.length} categories (parents + subcategories) to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch categories:', err.message);
  }
  return paths;
}

// Fetch gallery images from media library
async function getImagePaths() {
  const paths = [];
  try {
    const media = await fetchPaginatedContent('/media', 50);
    
    media.forEach(item => {
      if (item.source_url && !item.source_url.includes('thumbnail')) {
        paths.push({
          loc: item.source_url,
          lastmod: new Date(item.modified).toISOString(),
          changefreq: 'monthly',
          priority: '0.5', // Images have lower priority
          images: [{
            loc: item.source_url,
            title: item.title?.rendered ? item.title.rendered.replace(/<[^>]+>/g, '') : 'Gallery Image',
            caption: item.caption?.rendered ? item.caption.rendered.replace(/<[^>]+>/g, '') : '',
          }],
        });
      }
    });
    console.log(`✅ Added ${paths.length} images to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch media:', err.message);
  }
  return paths;
}

// Combine all dynamic paths
async function getAdditionalPaths() {
  const [staticPages, posts, caseStudies, testimonials, categories, images] = await Promise.all([
    Promise.resolve(getStaticPages()),
    getPostPaths(),
    getCaseStudyPaths(),
    getTestimonialPaths(),
    getCategoryPaths(),
    getImagePaths(),
  ]);
  
  console.log('\n📊 Sitemap Summary:');
  console.log(`   🏠 Static pages: ${staticPages.length}`);
  console.log(`   📝 Posts: ${posts.length}`);
  console.log(`   💼 Case studies: ${caseStudies.length}`);
  console.log(`   ⭐ Testimonials: ${testimonials.length}`);
  console.log(`   📁 Categories: ${categories.length}`);
  console.log(`   🖼️  Images: ${images.length}`);
  
  return [...staticPages, ...categories, ...posts, ...caseStudies, ...testimonials, ...images];
}

const config = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsFileName: 'robots.txt',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 50000,
  
  // Exclude all backend paths, query strings, and invalid routes
  exclude: [
    '/wp-admin*',
    '/wp-login.php*',
    '/wp-json*',
    '/wp-content*',
    '/api*',
    '/_next*',
    '/lander*',
    '/?*',
    '/*?*',
    '/*/*/*/*', // Block deeply nested routes beyond category/subcategory/post
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/', // Allow homepage
          '/blog', // Allow blog index
          '/blog/', // Allow blog sub-pages
          '/case-studies', // Allow case studies index
          '/case-studies/', // Allow case study pages
          '/about',
          '/contact',
          '/privacy',
          '/terms',
          '/medical-disclaimer',
          // Allow all published content types
          '/post/',
          '/testimonials/',
          // Allow category and subcategory pages
          '/ayurveda/',
          '/yoga/',
          '/vedas/',
          '/upanishads/',
        ],
        disallow: [
          '/wp-admin',
          '/wp-login.php',
          '/wp-json',
          '/wp-content',
          '/api/',
          '/api',
          '/lander',
          '/lander/',
          '/?',
          '/*?',
          '/?v',
          '/?v=',
          '/?*=',
          '/_next',
          '/_next/',
        ],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
        disallow: '/',
      },
    ],
    host: SITE_URL,
  },

  // Dynamically add all published content
  additionalPaths: async () => {
    try {
      return await getAdditionalPaths();
    } catch (err) {
      console.error('Error generating additional sitemap paths:', err);
      return [];
    }
  },

  // Transform URLs to include image sitemap data
  transform: async (config, url) => {
    if (url.images && url.images.length > 0) {
      return {
        ...url,
        images: url.images.map(img => ({
          loc: img.loc,
          title: img.title || '',
          caption: img.caption || '',
        })),
      };
    }
    return url;
  },

  postBuild: async () => {
    console.log('');
    console.log('✅ Sitemap generated successfully!');
    console.log('');
    console.log('📍 Sitemap Hierarchy:');
    console.log('  🏠 Homepage (priority: 1.0)');
    console.log('  ├── 📝 Blog (priority: 0.9)');
    console.log('  │   └── 📝 Individual Posts (priority: 0.7)');
    console.log('  ├── 📁 Categories (priority: 0.85)');
    console.log('  │   └── 📂 Subcategories (priority: 0.8)');
    console.log('  │       └── 📝 Posts under subcategory (priority: 0.7)');
    console.log('  ├── 💼 Case Studies (priority: 0.9)');
    console.log('  │   └── 💼 Individual Case Studies (priority: 0.75)');
    console.log('  ├── ⭐ Testimonials (priority: 0.6)');
    console.log('  └── 🖼️  Gallery Images (priority: 0.5)');
    console.log('');
    console.log('🔒 Security: Only legitimate website pages indexed');
  },
};

export default config;