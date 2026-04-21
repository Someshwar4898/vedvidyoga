const BASE = (process.env.NEXT_PUBLIC_WP_API_URL ?? "").replace(/\/+$/, "");
const API = BASE ? `${BASE}/wp-json/wp/v2` : "";
const SITE_NAME = "VedVidYoga";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vedvidyoga.com";

// ── WordPress data fetchers ───────────────────────────────────────────────────

export async function getPostMeta(slug) {
  if (!API) return null;
  try {
    const res = await fetch(
      `${API}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    const p = posts[0];
    if (!p) return null;
    return {
      link:    p.link,
      title:   decodeEntities(p.title?.rendered ?? ""),
      excerpt: stripTags(p.excerpt?.rendered ?? ""),
      image:   p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    };
  } catch {
    return null;
  }
}

export async function getCategoryMeta(slug) {
  if (!API) return null;
  try {
    const res = await fetch(
      `${API}/categories?slug=${encodeURIComponent(slug)}&_fields=link,name,description`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const cats = await res.json();
    const c = cats[0];
    if (!c) return null;
    return {
      link:        c.link,
      title:       decodeEntities(c.name ?? ""),
      description: stripTags(c.description ?? ""),
    };
  } catch {
    return null;
  }
}

// ── RankMath REST API (works once enabled in WP) ──────────────────────────────
// WordPress Admin → RankMath → Status & Tools → General → Enable Headless SEO

async function tryRankMath(wpPermalink) {
  if (!BASE || !wpPermalink) return null;
  try {
    const res = await fetch(
      `${BASE}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(wpPermalink)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success || !data.head) return null;
    return parseRankMathHead(data.head);
  } catch {
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

// For post pages: try RankMath first, fall back to WP post data
export async function getPostPageMeta(slug) {
  const wpData = await getPostMeta(slug);
  if (!wpData) return {};

  const rankMath = await tryRankMath(wpData.link);
  if (rankMath) return rankMath;

  // Fallback: build meta from WP post fields
  return buildMeta({
    title:       `${wpData.title} | ${SITE_NAME}`,
    description: wpData.excerpt,
    canonical:   wpData.link,
    image:       wpData.image,
    type:        "article",
  });
}

// For category / subcategory pages: try RankMath first, fall back to WP category data
export async function getCategoryPageMeta(slug) {
  const wpData = await getCategoryMeta(slug);
  if (!wpData) return {};

  const rankMath = await tryRankMath(wpData.link);
  if (rankMath) return rankMath;

  return buildMeta({
    title:       `${wpData.title} | ${SITE_NAME}`,
    description: wpData.description || `Explore ${wpData.title} articles on ${SITE_NAME}.`,
    canonical:   wpData.link,
    type:        "website",
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildMeta({ title, description, canonical, image, type = "website" }) {
  const meta = { title, description };
  if (canonical) meta.alternates = { canonical };

  meta.openGraph = { title, description, type, siteName: SITE_NAME };
  if (canonical) meta.openGraph.url = canonical;
  if (image)     meta.openGraph.images = [{ url: image }];

  meta.twitter = { card: image ? "summary_large_image" : "summary", title, description };
  if (image) meta.twitter.images = [image];

  return meta;
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function parseRankMathHead(html) {
  const metaName = (name) =>
    html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i"))?.[1] ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"))?.[1];

  const metaProp = (property) =>
    html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"))?.[1] ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"))?.[1];

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ??
                    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];

  const ogTitle = metaProp("og:title"), ogDesc = metaProp("og:description"),
        ogUrl   = metaProp("og:url"),   ogImg  = metaProp("og:image"),
        ogType  = metaProp("og:type"),  ogSite = metaProp("og:site_name");

  // RankMath omits <title> — use og:title (decoded) as the page title
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? ogTitle;

  const result = {};
  if (title)                   result.title       = decodeEntities(title);
  if (metaName("description")) result.description = metaName("description");
  if (metaName("robots"))      result.robots      = metaName("robots");
  if (canonical)               result.alternates  = { canonical };

  if (ogTitle || ogDesc || ogUrl || ogImg) {
    result.openGraph = {};
    if (ogTitle) result.openGraph.title       = decodeEntities(ogTitle);
    if (ogDesc)  result.openGraph.description = ogDesc;
    if (ogUrl)   result.openGraph.url         = ogUrl;
    if (ogType)  result.openGraph.type        = ogType;
    if (ogSite)  result.openGraph.siteName    = ogSite;
    if (ogImg)   result.openGraph.images      = [{ url: ogImg }];
  }

  const twCard = metaName("twitter:card"), twTitle = metaName("twitter:title"),
        twDesc = metaName("twitter:description"), twImg = metaName("twitter:image");

  if (twCard || twTitle || twDesc || twImg) {
    result.twitter = {};
    if (twCard)  result.twitter.card        = twCard;
    if (twTitle) result.twitter.title       = decodeEntities(twTitle);
    if (twDesc)  result.twitter.description = twDesc;
    if (twImg)   result.twitter.images      = [twImg];
  }

  return Object.keys(result).length > 0 ? result : null;
}
