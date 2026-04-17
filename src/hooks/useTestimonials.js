import { useState, useEffect } from "react";

const WP_API =
  "https://api.vedvidyoga.com/wp-json/wp/v2/testimonials?per_page=100&_embed";

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

function transformWpTestimonial(post) {
  const name = stripHtml(post.title.rendered);
  const rawText = stripHtml(post.content.rendered);

  // Parse "designation: ..." from the first matching line
  let designation = "Reader";
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
  const bodyLines = [];

  for (const line of lines) {
    const match = line.match(/^designation:\s*(.+)$/i);
    if (match) {
      designation = match[1].trim();
    } else {
      bodyLines.push(line);
    }
  }

  const content = bodyLines.join(" ").trim()
    || stripHtml(post.excerpt?.rendered || "").replace(/\n/g, " ").trim();

  // Featured image → avatar (sent by admin after user emails their photo)
  const avatar =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return {
    id: `wp-${post.id}`,
    name,
    designation,
    content,
    avatar,
    source: "api",
  };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(WP_API)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((posts) => {
        const wpTestimonials = posts.map(transformWpTestimonial);
        setTestimonials(wpTestimonials);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading, error };
}
