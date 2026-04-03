import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useCategories } from "../hooks/useCategories";

function Home() {
  const { categories } = useCategories();
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] grid-cols-1">

        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f6d7b3] bg-white dark:bg-stone-900 dark:border-stone-700 px-4 py-2 text-sm font-medium text-saffron-muted shadow-sm">
            <Sparkles size={16} />
            Structured spiritual blog platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Explore timeless Indian wisdom through a clean, modern, and category-driven experience.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            Browse all blogs together, dive into major knowledge categories, or explore individual subcategories — each with Featured, Trending, and Latest sections.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(242,140,40,0.28)] hover:-translate-y-0.5 hover:bg-saffron-dark transition"
            >
              Explore all blogs <ArrowRight size={16} />
            </Link>
            <Link
              to="/vedas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadbc7] bg-white dark:bg-stone-900 dark:border-stone-700 dark:text-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-700 hover:border-saffron/40 hover:text-saffron transition"
            >
              Start with Vedas
            </Link>
          </div>
        </div>

        {/* Right: image card */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#f6d7b3] via-[#fff4e6] to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white dark:bg-stone-900 dark:border-stone-700/50 p-4 shadow-[0_30px_80px_rgba(102,74,44,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80"
              alt="Ancient manuscripts"
              className="h-[380px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute right-8 bottom-8 left-8 rounded-[1.5rem] border border-white/70 bg-cream/92 dark:bg-stone-900/92 p-5 shadow-lg backdrop-blur">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-saffron-muted">Content Architecture</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">One elegant system for blog, category, and subcategory pages.</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                Consistent sections help readers discover important, popular, and recent content without friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE CATEGORIES ─────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white/80 dark:bg-stone-900/80 dark:border-stone-700 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Knowledge Categories</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">Browse the four primary collections</h3>
          </div>
          <p className="max-w-xs text-sm leading-7 text-stone-500 dark:text-stone-400">
            Each category opens a dedicated page that combines blogs from all its subcategories into Featured, Trending, and Latest sections.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/${cat.slug}`}
              className="rounded-[1.5rem] border border-[#f0e3d3] bg-[#fffdf9] dark:bg-stone-800 dark:border-stone-700 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#f6d7b3] hover:shadow-[0_18px_40px_rgba(102,74,44,0.08)] block"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-muted">{cat.name}</p>
              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">{cat.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-saffron-medium">
                Open collection <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
