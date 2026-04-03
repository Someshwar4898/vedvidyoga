// WordPress REST API — no auth needed for public posts and categories
const BASE = import.meta.env.VITE_WP_API_URL ?? "";

export const isWPConnected = () => Boolean(BASE);

async function get(path) {
  const res = await fetch(`${BASE}/wp-json/wp/v2${path}`);
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
      name:         c.name,
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
        name:        c.name,
        slug:        c.slug,
        description: c.description.replace(/<[^>]+>/g, "").trim(),
      });
    });

  return parents;
}

// For usePosts: slug → { id, name, slug, parentSlug }
async function getCategoryMap() {
  const all = await get("/categories?per_page=100&hide_empty=false");
  const byId = {};
  all.forEach(c => { byId[c.id] = c; });
  const map = {};
  all.forEach(c => {
    map[c.slug] = {
      id:         c.id,
      name:       c.name,
      slug:       c.slug,
      parentSlug: c.parent ? byId[c.parent]?.slug ?? null : null,
    };
  });
  return map;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

function mapPost(wp, catMap) {
  const terms    = wp._embedded?.["wp:term"] ?? [];
  const cats     = terms[0] ?? [];
  const tags     = (terms[1] ?? []).map(t => t.slug);

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
  if (!catSlug && cats.length) { catSlug = cats[0].slug; catName = cats[0].name; }

  return {
    id:              wp.id,
    slug:            wp.slug,
    title:           wp.title?.rendered ?? "Untitled",
    excerpt:         (wp.excerpt?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
    content:         wp.content?.rendered ?? "",
    image:           wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                       ?? "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200",
    author:          wp._embedded?.author?.[0]?.name ?? "Author",
    date:            new Date(wp.date).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }),
    readTime:        `${Math.max(1, Math.ceil((wp.content?.rendered ?? "").replace(/<[^>]+>/g,"").split(/\s+/).length / 200))} min read`,
    featured:        tags.includes("featured"),
    categorySlug:    catSlug || "uncategorized",
    categoryName:    catName,
    subcategorySlug: subSlug,
    subcategoryName: subName,
  };
}

export async function getPosts({ categorySlug } = {}) {
  const catMap = await getCategoryMap();
  let path = "/posts?per_page=100&_embed";
  if (categorySlug && catMap[categorySlug]) {
    path += `&categories=${catMap[categorySlug].id}`;
  }
  const data = await get(path);
  return data.map(p => mapPost(p, catMap));
}
