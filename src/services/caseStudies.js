const WP_API =
  "https://api.vedvidyoga.com/wp-json/wp/v2/case-studies?per_page=100&orderby=menu_order&order=asc";

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseWpContent(html) {
  const text = stripHtml(html);

  const parsed = {
    patient: null, location: null, age: null, duration: null,
    category: null, tag: null,
    summary: "", result: "", quote: "", closeQuote: "",
    startingPoints: [], progressPoints: [], keyInsights: [],
    understandingPattern: "",
  };

  const parts = text.split(/\[(\w+)\]/);
  const header = parts[0];

  for (const line of header.split("\n")) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (!match) continue;
    const [, key, val] = match;
    switch (key.toLowerCase()) {
      case "patient": parsed.patient = val.trim(); break;
      case "location": parsed.location = val.trim(); break;
      case "age": parsed.age = parseInt(val, 10) || null; break;
      case "duration": parsed.duration = val.trim(); break;
      case "category": parsed.category = val.trim(); break;
      case "tag": parsed.tag = val.trim(); break;
    }
  }

  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i];
    const content = (parts[i + 1] || "").trim();

    switch (name) {
      case "summary":
      case "result":
      case "quote":
      case "closeQuote":
      case "understandingPattern":
        parsed[name] = content;
        break;
      case "startingPoints":
        parsed.startingPoints = content
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.includes("|"))
          .map((line) => {
            const [label, ...rest] = line.split("|");
            return { label: label.trim(), description: rest.join("|").trim() };
          });
        break;
      case "progressPoints":
        parsed.progressPoints = content
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.includes("|"))
          .map((line) => {
            const [title, ...rest] = line.split("|");
            return { title: title.trim(), description: rest.join("|").trim() };
          });
        break;
      case "keyInsights":
        parsed.keyInsights = content
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        break;
    }
  }

  return parsed;
}

function detectCategory(text) {
  const t = text.toLowerCase();
  if (t.match(/fever|child|kid|son|daughter|paediatric/)) {
    return { category: "child-health", tag: "Child Wellness" };
  }
  if (t.match(/gastric|digestion|ibs|constipation|stomach|gut|bowel/)) {
    return { category: "digestive", tag: "Digestive Health" };
  }
  if (t.match(/asthma|breathing|respiratory|lung|pranayam|claustrophobia/)) {
    return { category: "respiratory", tag: "Respiratory Health" };
  }
  if (t.match(/depress|stress|anxiety|mental|mood|burnout/)) {
    return { category: "depression", tag: "Mental Wellness" };
  }
  if (t.match(/vedic|dharma|shlokas|veda|ritual|priest|logic|spiritual/)) {
    return { category: "vedic-logic", tag: "Vedic Research" };
  }
  return { category: "general", tag: "Healing Story" };
}

function transformWpPost(post, index) {
  const parsed = parseWpContent(post.content.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).replace(/\n/g, " ").trim();
  const title = stripHtml(post.title.rendered);

  let { category, tag } = parsed;
  if (!category) {
    const auto = detectCategory(title + " " + stripHtml(post.content.rendered));
    category = auto.category;
    tag = tag || auto.tag;
  }

  return {
    id: `wp-${post.id}`,
    slug: post.slug,
    caseNumber: `Case Study #${index + 1}`,
    category,
    tag: tag || "Healing Story",
    title,
    patient: parsed.patient || "Anonymous",
    location: parsed.location || "India",
    age: parsed.age,
    duration: parsed.duration || "Ongoing",
    summary: parsed.summary || excerpt || "",
    result: parsed.result || excerpt || "Positive outcome through Vedic healing",
    quote: parsed.quote || "",
    closeQuote: parsed.closeQuote || "",
    startingPoints: parsed.startingPoints,
    progressPoints: parsed.progressPoints,
    keyInsights: parsed.keyInsights,
    understandingPattern: parsed.understandingPattern || "",
    source: "api",
  };
}

export async function getCaseStudies() {
  const res = await fetch(WP_API, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const posts = await res.json();
  return posts.map((post, index) => transformWpPost(post, index));
}
