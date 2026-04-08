import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import KnowledgePillars from "../components/KnowledgePillars";
import HomeCategories from "../components/HomeCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import TrendingPosts from "../components/TrendingPosts";
import LatestPosts from "../components/LatestPosts";
import AboutAuthor from "../components/AboutAuthor";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import HomeFAQ from "../components/HomeFAQ";
import Newsletter from "../components/Newsletter";
import heroImg from "../assets/hero_image-vedvidyoga.webp";


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
            Decoding Ancient Vedic Wisdom with Scientific Logic.
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Understanding Vedic Cult: A Scientific Perspective. 
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            A structured journey through Vedic cult, science, methodology, philosophy, lifestyle, healing systems, and value-based education — explained with clarity and logic.
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
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadbc7] bg-white dark:bg-stone-900 dark:border-stone-700 dark:text-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-700 hover:border-saffron/40 hover:text-saffron transition"
            >
              View Case Studies <ArrowRight size={16} />
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
              <h2 className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">Vedic knowledge explores every aspect of life and creation.</h2>
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

      {/* ── GALLERY ──────────────────────────────────────────────── */}
      <Gallery />

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <Testimonials />

      {/* ── CASE STUDIES CTA ─────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 shadow-[0_20px_60px_rgba(102,74,44,0.08)] overflow-hidden">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 p-8 sm:p-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-saffron-muted">
              <BookOpen size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">Case Studies</p>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
              Real Healing. Vedic Science in Practice.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-stone-500 dark:text-stone-400">
              Documented recoveries from depression, chronic pain, diabetes, and more — through Yoga Therapy, Ayurveda, and Vedic Wisdom. Find the case study closest to your struggle.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Depression", "Back Pain", "Diabetes", "Vedic Logic"].map((tag) => (
                <span key={tag} className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link
            to="/case-studies"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(242,140,40,0.25)] hover:-translate-y-0.5 hover:opacity-90 transition"
          >
            View Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <HomeFAQ />

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <Newsletter />

    </div>
  );
}

export default Home;