"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCategories } from "../hooks/useCategories";
import BlogSections from "../components/BlogSections";
import LogoLoader from "../components/LogoLoader";
import { usePosts } from "../hooks/usePosts";

function CategoryPage() {
  const { category, subcategory } = useParams();
  const { posts: allPosts, loading } = usePosts({ categorySlug: category, subcategorySlug: subcategory });
  const { categories } = useCategories();

  const categoryData   = categories.find((c) => c.slug === category);
  const subcategoryData = subcategory
    ? categoryData?.subcategories.find((s) => s.slug === subcategory)
    : null;

  const eyebrow       = categoryData?.name ?? category;
  const pageTitle     = subcategoryData
    ? subcategoryData.name
    : categoryData?.name ?? category;
  const pageDescription = subcategoryData
    ? subcategoryData.description
    : categoryData?.description ?? "";
  const sectionLabel  = categoryData?.name ?? category;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* Page header */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">{eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">{pageTitle}</h1>
          {pageDescription && (
            <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">{pageDescription}</p>
          )}
        </div>

        {/* Category pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-full border border-[#eadbc7] bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 px-5 py-2.5 text-sm font-medium hover:border-saffron/40 hover:text-saffron transition"
          >
            All Blogs
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`rounded-full px-5 py-2.5 text-sm font-medium border transition ${
                cat.slug === category
                  ? "bg-saffron text-white border-saffron"
                  : "border-[#eadbc7] bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Subcategory pills — shown when a category is selected */}
        {categoryData?.subcategories?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/${category}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold border transition ${
                !subcategory
                  ? "bg-stone-800 text-white border-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                  : "border-[#eadbc7] bg-white text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              All {categoryData.name}
            </Link>
            {categoryData.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/${category}/${sub.slug}`}
                className={`rounded-full px-4 py-2 text-xs font-semibold border transition ${
                  sub.slug === subcategory
                    ? "bg-saffron text-white border-saffron"
                    : "border-[#eadbc7] bg-white text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 hover:border-saffron/40 hover:text-saffron"
                }`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {loading ? (
        <LogoLoader />
      ) : allPosts.length > 0 ? (
        <BlogSections posts={allPosts} label={sectionLabel} />
      ) : (
        <p className="text-center py-24 text-stone-400 dark:text-stone-500 text-lg">No posts here yet. Check back soon.</p>
      )}
    </div>
  );
}

export default CategoryPage;
