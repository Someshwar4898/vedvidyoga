import { useState } from "react";
import { Link } from "react-router-dom";
import BlogSections from "../components/BlogSections";
import CategoryName from "../components/CategoryName";
import LogoLoader from "../components/LogoLoader";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";

function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { posts: allPosts, loading } = usePosts();
  const { categories } = useCategories();

  const filteredPosts = activeFilter === "all"
    ? allPosts
    : allPosts.filter((p) => p.categorySlug === activeFilter);

  const activeCategory = categories.find((c) => c.slug === activeFilter) ?? null;
  const activeLabel = activeCategory?.name ?? "All Blogs";

  const eyebrow = activeFilter === "all" ? "All Blogs" : <CategoryName name={activeCategory?.name ?? ""} slug={activeFilter} />;
  const heading = activeFilter === "all"
    ? "Decode Vedic Knowledge Through Logic & Science"
    : <CategoryName name={activeCategory?.name ?? ""} slug={activeFilter} />;
  const description = activeFilter === "all"
    ? "Explore insights from Vedas, Upanishads, Ayurveda, and Yoga—presented with clarity, reasoning, and practical understanding for modern life."
    : activeCategory?.description ?? "";

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* Page header */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">{eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            {heading}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">{description}</p>
          )}
        </div>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium border transition cursor-pointer ${
              activeFilter === "all"
                ? "bg-saffron text-white border-saffron"
                : "border-[#eadbc7] bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:border-saffron/40 hover:text-saffron"
            }`}
          >
            All Blogs
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveFilter(cat.slug)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium border transition cursor-pointer ${
                activeFilter === cat.slug
                  ? "bg-saffron text-white border-saffron"
                  : "border-[#eadbc7] bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              <CategoryName name={cat.name} slug={cat.slug} />
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <LogoLoader />
      ) : (
        <BlogSections posts={filteredPosts} label={activeLabel} />
      )}
    </div>
  );
}

export default Blog;
