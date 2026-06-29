export const API_BASE = (process.env.NEXT_PUBLIC_WP_API_URL ?? "https://api.vedvidyoga.com").replace(/\/+$/,"");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vedvidyoga.com").replace(/\/+$/,"");

export const RESERVED_FRONTEND_SLUGS = new Set([
  "about",
  "blog",
  "case-studies",
  "contact",
  "medical-disclaimer",
  "post",
  "privacy",
  "sitemap",
  "terms",
]);

export async function fetchPaginatedContent(endpoint, options = {}) {
  const perPage = options.perPage ?? 100;
  const query = options.query ?? {};
  let allItems = [];
  let page = 1;

  while (page <= 10 && allItems.length < 500) {
    try {
      const params = new URLSearchParams({
        per_page: String(perPage),
        page: String(page),
        ...Object.fromEntries(
          Object.entries(query).filter(([, value]) => value !== undefined && value !== null)
        ),
      });

      const res = await fetch(`${API_BASE}/wp-json/wp/v2${endpoint}?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 400 && page > 1) break;
        console.warn(`Failed to fetch ${endpoint} page ${page}: ${res.status}`);
        break;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;

      allItems.push(...data);

      const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? page);
      if (page >= totalPages) break;
      page += 1;
    } catch (err) {
      console.warn(`Error fetching ${endpoint} page ${page}: ${err.message}`);
      break;
    }
  }

  return allItems;
}

export function escapeXML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function getCategoryMap() {
  const categories = await fetchPaginatedContent("/categories", {
    query: { hide_empty: "false", _fields: "id,slug,parent" },
  });
  return Object.fromEntries(categories.map((c) => [c.id, c]));
}

export function getPostUrl(post, categoryMap) {
  let categorySlug = "";
  let subcategorySlug = "";

  if (post.categories && Array.isArray(post.categories)) {
    const subcat = post.categories
      .map((id) => categoryMap[id])
      .find((c) => c && c.parent !== 0);

    if (subcat) {
      subcategorySlug = subcat.slug;
      const parent = categoryMap[subcat.parent];
      if (parent) {
        categorySlug = parent.slug;
      }
    }
  }

  return subcategorySlug
    ? `${SITE_URL}/${categorySlug}/${subcategorySlug}/${post.slug}`
    : `${SITE_URL}/post/${post.slug}`;
}

export function wrapInUrlset(urlEntries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`;
}
