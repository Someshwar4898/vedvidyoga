import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import KnowledgePillars from "../components/KnowledgePillars";
import HomeCategories from "../components/HomeCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import TrendingPosts from "../components/TrendingPosts";
import LatestPosts from "../components/LatestPosts";
import AboutAuthor from "../components/AboutAuthor";
import Testimonials from "../components/Testimonials";
import HomeFAQ from "../components/HomeFAQ";
import Newsletter from "../components/Newsletter";
import heroImg from "../assets/hero_image.png";


function Home() {
  const { posts, loading: postsLoading } = usePosts();

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] grid-cols-1">

        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f6d7b3] bg-white dark:bg-stone-900 dark:border-stone-700 px-4 py-2 text-sm font-medium text-saffron-muted shadow-sm">
            <Sparkles size={16} />
            Decoding the Rishi-Science
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Explore the Foundations of Vedic Knowledge
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            A structured journey through Vedic science, philosophy, healing systems, and value-based education — explained with clarity and logic.
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
              src= {heroImg}
              alt="Ancient manuscripts"
              className="h-[380px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute right-8 bottom-8 left-8 rounded-[1.5rem] border border-white/70 bg-cream/92 dark:bg-stone-900/92 p-5 shadow-lg backdrop-blur">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-saffron-muted">Vedic Knowledge</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">Vedic knowledge is not a belief; it is a technology for the Soul.</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                — Kaptan Singh Choudhary (Kapil)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EIGHT PILLARS (static, curated) ──────────────────────── */}
      <KnowledgePillars />

      {/* ── KNOWLEDGE CATEGORIES (dynamic from WP API) ───────────── */}
      <HomeCategories />

      {/* ── FEATURED POSTS ───────────────────────────────────────── */}
      <FeaturedPosts posts={posts} loading={postsLoading} />

      {/* ── TRENDING POSTS ───────────────────────────────────────── */}
      <TrendingPosts />

      {/* ── LATEST POSTS ─────────────────────────────────────────── */}
      <LatestPosts posts={posts} loading={postsLoading} />

      {/* ── ABOUT AUTHOR ─────────────────────────────────────────── */}
      <AboutAuthor />

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <HomeFAQ />

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <Newsletter />

    </div>
  );
}

export default Home;