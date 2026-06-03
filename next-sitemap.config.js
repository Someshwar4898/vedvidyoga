/** @type {import('next-sitemap').IConfig} */

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

// Fetch posts
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
          priority: 0.8,
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
          priority: 0.75,
        });
      }
    });
    console.log(`✅ Added ${paths.length} case studies to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch case studies:', err.message);
  }
  return paths;
}

// Fetch categories
async function getCategoryPaths() {
  const paths = [];
  try {
    const categories = await fetchPaginatedContent('/categories');
    const categoryMap = {};

    categories.forEach(cat => {
      categoryMap[cat.id] = cat;
    });

    categories.forEach(cat => {
      if (cat.slug !== 'uncategorized' && cat.count > 0) {
        if (cat.parent === 0) {
          paths.push({
            loc: `${SITE_URL}/${cat.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.7,
          });
        } else {
          const parent = categoryMap[cat.parent];
          if (parent) {
            paths.push({
              loc: `${SITE_URL}/${parent.slug}/${cat.slug}`,
              lastmod: new Date().toISOString(),
              changefreq: 'weekly',
              priority: 0.65,
            });
          }
        }
      }
    });
    console.log(`✅ Added ${paths.length} categories to sitemap`);
  } catch (err) {
    console.warn('Failed to fetch categories:', err.message);
  }
  return paths;
}

// Combine all dynamic paths
async function getAdditionalPaths() {
  const [posts, caseStudies, categories] = await Promise.all([
    getPostPaths(),
    getCaseStudyPaths(),
    getCategoryPaths(),
  ]);
  return [...posts, ...caseStudies, ...categories];
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
    '/api*',
    '/_next*',
    '/lander*',
    '/?*',
    '/*?*',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/post/',
          '/case-studies/',
          '/blog',
          '/about',
          '/contact',
          '/medical-disclaimer',
          '/privacy',
          '/terms',
        ],
        disallow: [
          '/wp-admin',
          '/wp-login.php',
          '/wp-json',
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

  postBuild: async () => {
    console.log('');
    console.log('✅ Sitemaps generated successfully!');
    console.log('📍 Sitemap structure:');
    console.log('  - sitemap.xml (index of all sitemaps)');
    console.log('  - sitemap-0.xml (all pages, posts, case-studies, categories)');
    console.log('');
  },
};

export default config;