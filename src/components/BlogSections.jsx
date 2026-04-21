"use client";
import { useState } from "react";
import PostCard from "./PostCard";

const CLICKS_KEY = "adishiv_post_clicks";

function getClickCounts() {
  try {
    return JSON.parse(localStorage.getItem(CLICKS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function parseDate(str) {
  if (!str) return 0;
  const d = new Date(str);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

const sectionConfig = [
  {
    key: "featured",
    title: "Featured blogs",
    description: "Thoughtfully selected long-form pieces that define the tone and depth of this section.",
  },
  {
    key: "trending",
    title: "Trending blogs",
    description: "The most-read posts in this section, ranked by how often readers click through.",
  },
  {
    key: "latest",
    title: "Latest blogs",
    description: "Freshly published articles sorted by date — the newest content first.",
  },
];

// label = "All Blogs" | "Vedas" | "Rigveda" etc.
function BlogSections({ posts, label = "All Blogs" }) {
  // forceUpdate triggers re-render so trending re-sorts after a click
  const [, forceUpdate] = useState(0);

  function handlePostClick(slug) {
    const counts = getClickCounts();
    counts[slug] = (counts[slug] ?? 0) + 1;
    localStorage.setItem(CLICKS_KEY, JSON.stringify(counts));
    forceUpdate((n) => n + 1);
  }

  const clickCounts = getClickCounts();

  // Featured: manually tagged in WordPress (featured: true)
  const featured = posts.filter((p) => p.featured);

  // Trending: all posts in scope sorted by click count descending
  const trending = [...posts]
    .sort((a, b) => (clickCounts[b.slug] ?? 0) - (clickCounts[a.slug] ?? 0))
    .slice(0, 6);

  // Latest: all posts in scope sorted by publish date descending
  const latest = [...posts]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 6);

  const sections = [
    { config: sectionConfig[0], items: featured },
    { config: sectionConfig[1], items: trending },
    { config: sectionConfig[2], items: latest },
  ];

  return (
    <div className="space-y-10 md:space-y-14">
      {sections.map(({ config, items }) => {
        if (items.length === 0) return null;

        return (
          <section key={config.key} className="space-y-6">

            {/* Section header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">
                  {label}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                  {config.title}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-stone-500 dark:text-stone-400 sm:text-right">
                {config.description}
              </p>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((post) => (
                <PostCard
                  key={`${config.key}-${post.id}`}
                  post={post}
                  onPostClick={handlePostClick}
                />
              ))}
            </div>

          </section>
        );
      })}
    </div>
  );
}

export default BlogSections;
