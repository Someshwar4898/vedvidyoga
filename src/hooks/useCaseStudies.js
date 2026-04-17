import { useState, useEffect } from "react";
import mockCaseStudies from "../data/mockCaseStudies";

const WP_API = "https://api.vedvidyoga.com/wp-json/wp/v2/case-studies?per_page=100";

// ─────────────────────────────────────────────────────────────────────────────
// WORDPRESS CONTENT TEMPLATE
// Write case studies in the WP editor using this format:
//
//   patient: Full Name Here
//   location: City Name
//   age: 45
//   duration: 8 weeks
//   category: digestive          ← child-health | digestive | respiratory | depression | vedic-logic
//   tag: Digestive Health
//
//   [summary]
//   The main paragraph describing the case...
//
//   [result]
//   One-line outcome statement shown on the card.
//
//   [quote]
//   Opening patient quote (shown in the "What Daily Life Felt Like" section).
//
//   [closeQuote]
//   Closing patient quote (shown at the bottom of progress section).
//
//   [startingPoints]
//   Label One | Description of this starting point
//   Label Two | Description of this starting point
//
//   [progressPoints]
//   Milestone Title | What changed during this phase
//   Next Milestone | What changed in this phase
//
//   [keyInsights]
//   First key insight text goes here
//   Second key insight text goes here
//
//   [understandingPattern]
//   The closing analysis paragraph for this case.
//
// Excerpt field in WP → used as fallback for result/summary if not provided above.
// ─────────────────────────────────────────────────────────────────────────────

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

  // Split on [sectionName] markers
  // e.g. "header text [summary] text [result] text"
  // → ["header text ", "summary", " text ", "result", " text"]
  const parts = text.split(/\[(\w+)\]/);

  // parts[0] = everything before the first [section] — the key: value header
  const header = parts[0];
  for (const line of header.split("\n")) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (!match) continue;
    const [, key, val] = match;
    switch (key.toLowerCase()) {
      case "patient":   parsed.patient = val.trim(); break;
      case "location":  parsed.location = val.trim(); break;
      case "age":       parsed.age = parseInt(val) || null; break;
      case "duration":  parsed.duration = val.trim(); break;
      case "category":  parsed.category = val.trim(); break;
      case "tag":       parsed.tag = val.trim(); break;
    }
  }

  // parts[1], parts[3], parts[5]... = section names
  // parts[2], parts[4], parts[6]... = section content
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
          .map((l) => l.trim())
          .filter((l) => l.includes("|"))
          .map((l) => {
            const [label, ...rest] = l.split("|");
            return { label: label.trim(), description: rest.join("|").trim() };
          });
        break;

      case "progressPoints":
        parsed.progressPoints = content
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.includes("|"))
          .map((l) => {
            const [title, ...rest] = l.split("|");
            return { title: title.trim(), description: rest.join("|").trim() };
          });
        break;

      case "keyInsights":
        parsed.keyInsights = content
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
        break;
    }
  }

  return parsed;
}

function detectCategory(text) {
  const t = text.toLowerCase();
  if (t.match(/fever|child|kid|son|daughter|paediatric/))
    return { category: "child-health", tag: "Child Wellness" };
  if (t.match(/gastric|digestion|ibs|constipation|stomach|gut|bowel/))
    return { category: "digestive", tag: "Digestive Health" };
  if (t.match(/asthma|breathing|respiratory|lung|pranayam|claustrophobia/))
    return { category: "respiratory", tag: "Respiratory Health" };
  if (t.match(/depress|stress|anxiety|mental|mood|burnout/))
    return { category: "depression", tag: "Mental Wellness" };
  if (t.match(/vedic|dharma|shlokas|veda|ritual|priest|logic|spiritual/))
    return { category: "vedic-logic", tag: "Vedic Research" };
  return { category: "general", tag: "Healing Story" };
}

function transformWpPost(post, index) {
  const parsed = parseWpContent(post.content.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).replace(/\n/g, " ").trim();
  const title = stripHtml(post.title.rendered);

  // Use category from content if provided, otherwise auto-detect from text
  let { category, tag } = parsed;
  if (!category) {
    const auto = detectCategory(title + " " + stripHtml(post.content.rendered));
    category = auto.category;
    tag = tag || auto.tag;
  }

  return {
    id: `wp-${post.id}`,
    slug: post.slug,
    caseNumber: `Case Study #${mockCaseStudies.length + index + 1}`,
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

export function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState(mockCaseStudies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(WP_API)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((posts) => {
        const transformed = posts.map((post, i) => transformWpPost(post, i));
        setCaseStudies([...mockCaseStudies, ...transformed]);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { caseStudies, loading, error };
}
