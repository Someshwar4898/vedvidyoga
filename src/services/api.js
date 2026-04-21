// WordPress REST API — no auth needed for public posts and categories
const BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "https://api.vedvidyoga.com";
export const API = `${BASE.replace(/\/+$/g, "")}/wp-json/wp/v2`;

export const isWPConnected = () => Boolean(BASE);

// WordPress returns HTML-encoded strings (e.g. "Yoga &amp; Naturopathy").
// This decodes them back to plain text for display.
function decodeHTML(str) {
  if (!str || !str.includes("&")) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

// ── Categories ────────────────────────────────────────────────────────────────

// For navbar: array of parent categories, each with subcategories[]
export async function getNavCategories() {
  const all = await get("/categories?per_page=100&hide_empty=false");

  const byId = {};
  all.forEach(c => { byId[c.id] = c; });

  // parent categories (exclude Uncategorized)
  const parents = all
    .filter(c => c.parent === 0 && c.slug !== "uncategorized")
    .map(c => ({
      id:           c.id,
      name:         decodeHTML(c.name),
      slug:         c.slug,
      description:  c.description.replace(/<[^>]+>/g, "").trim(),
      subcategories: [],
    }));

  // attach children
  all
    .filter(c => c.parent !== 0)
    .forEach(c => {
      const parent = parents.find(p => p.id === c.parent);
      if (parent) parent.subcategories.push({
        name:        decodeHTML(c.name),
        slug:        c.slug,
        description: c.description.replace(/<[^>]+>/g, "").trim(),
      });
    });

  return parents;
}

// For usePosts: slug → { id, name, slug, parentSlug }
async function getCategoryMap() {
  const all = await get("/categories?per_page=100&hide_empty=false");

  const map = {};
  const byId = {};

  // First pass: index by id so parent lookups work regardless of order
  all.forEach(c => { byId[c.id] = c; });

  // Second pass: build map with correct parentSlug and name
  all.forEach(c => {
    map[c.slug] = {
      id: c.id,
      name: decodeHTML(c.name),
      slug: c.slug,
      parentSlug: c.parent ? (byId[c.parent]?.slug ?? null) : null,
      children: []
    };
  });

  // Third pass: attach children to their parents
  all.forEach(c => {
    if (c.parent) {
      const parent = byId[c.parent];
      if (parent && map[parent.slug]) {
        map[parent.slug].children.push({ id: c.id, slug: c.slug });
      }
    }
  });

  return map;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

function mapPost(wp, catMap) {
  // wp:term is an array of groups, one per taxonomy — order is not guaranteed.
  // Find by taxonomy name instead of assuming index position.
  const allTermGroups = wp._embedded?.["wp:term"] ?? [];
  const allTerms      = allTermGroups.flat();
  const cats          = allTerms.filter(t => t.taxonomy === "category");
  const tags          = allTerms.filter(t => t.taxonomy === "post_tag").map(t => t.slug);

  let catSlug = "", catName = "", subSlug = "", subName = "";

  for (const c of cats) {
    const info = catMap[c.slug];
    if (info?.parentSlug) {
      subSlug = info.slug;   subName = info.name;
      catSlug = info.parentSlug;
      catName = catMap[info.parentSlug]?.name ?? info.parentSlug;
      break;
    }
  }
  if (!catSlug && cats.length) {
    const first = cats[0];
    const info = catMap[first.slug];

    if (info?.parentSlug) {
      catSlug = info.parentSlug;
      catName = catMap[info.parentSlug]?.name ?? info.parentSlug;
      subSlug = info.slug;
      subName = info.name ?? first.name;
    } else {
      catSlug = first.slug;
      catName = info?.name ?? decodeHTML(first.name);
    }
  }
  return {
    id:              wp.id,
    slug:            wp.slug,
    title:           wp.title?.rendered ?? "Untitled",
    excerpt:         (wp.excerpt?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
    content:         wp.content?.rendered ?? "",
    image:           wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    author:          wp._embedded?.author?.[0]?.name ?? "Author",
    date:            new Date(wp.date).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }),
    readTime:        `${Math.max(1, Math.ceil((wp.content?.rendered ?? "").replace(/<[^>]+>/g,"").split(/\s+/).length / 200))} min read`,
    views:           wp.meta?.post_views_count ?? wp.meta?.["_post_views_count"] ?? null,
    categoryIds: wp.categories,
    featured:        tags.includes("featured"),
    categorySlug:    catSlug || "uncategorized",
    categoryName:    catName,
    subcategorySlug: subSlug,
    subcategoryName: subName,
  };
}

export async function getPosts() {
  const catMap = await getCategoryMap();
  let path = "/posts?per_page=100&_embed";

  const data = await get(path);
  return data.map(p => mapPost(p, catMap));
}

// Fetch up to 10 posts and sort by Post Views Counter view count (desc), return top 4
export async function getTrendingPosts() {
  const catMap = await getCategoryMap();
  const data = await get("/posts?per_page=10&_embed");
  return data
    .map(p => ({
      ...mapPost(p, catMap),
      views: p.meta?.post_views_count ?? 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);
}

// Fetch up to 3 posts that share any of the given category IDs, excluding the current post.
// categoryIds can be a single ID or an array (parent + subcategory IDs both work).
export async function getRelatedPosts(categoryIds, excludePostId) {
  const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
  if (ids.length === 0 || !ids[0]) return [];
  const catMap = await getCategoryMap();
  const data = await get(`/posts?per_page=4&_embed&categories=${ids.join(",")}&exclude=${excludePostId}`);
  return data.map(p => mapPost(p, catMap)).slice(0, 3);
}

// ── Testimonials CPT ──────────────────────────────────────────────────────────
// Testimonials are fetched via useTestimonials() hook from the WordPress REST API
