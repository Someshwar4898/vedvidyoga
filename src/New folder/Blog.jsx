import { useState } from "react";
import { Link } from "react-router-dom";
import BlogSections from "../components/BlogSections";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";

function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { posts: allPosts, loading } = usePosts();
  const { categories } = useCategories();

  const filteredPosts = activeFilter === "all"
    ? allPosts
    : allPosts.filter((p) => p.categorySlug === activeFilter);

  const activeLabel = activeFilter === "all"
    ? "All Blogs"
    : categories.find((c) => c.slug === activeFilter)?.name ?? "All Blogs";

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* Page header */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">All Blogs</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Featured, trending, and latest blogs from every category
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">
            This page combines content from Vedas, Upanishads, Ayurveda, and Yoga into one unified editorial overview.
          </p>
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
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-saffron border-t-transparent animate-spin" />
        </div>
      ) : (
        <BlogSections posts={filteredPosts} label={activeLabel} />
      )}
    </div>
  );
}

export default Blog;
