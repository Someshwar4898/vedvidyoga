import { Link } from "react-router-dom";

function AboutAuthor() {
  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)] grid md:grid-cols-[280px_1fr] gap-10 items-center">

      {/* Left: placeholder image card */}
      <div className="flex items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#f6d7b3] via-[#fff4e6] to-[#fef5d4] dark:from-stone-800 dark:via-stone-800 dark:to-stone-800 w-full md:w-[280px] h-[320px] shrink-0">
        <div className="flex flex-col items-center gap-3">
          <span className="text-7xl font-bold text-saffron/60 select-none leading-none">KS</span>
          <span className="text-xs font-medium text-saffron-muted uppercase tracking-widest">Kapil</span>
        </div>
      </div>

      {/* Right: text content */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted mb-2">
            About the Author
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Kaptan Singh Choudhary (Kapil)
          </h2>
          <span className="mt-3 inline-block rounded-full border border-[#f6d7b3] bg-saffron-light dark:bg-stone-800 dark:border-stone-700 px-4 py-1 text-xs font-semibold text-saffron-muted">
            Founder &amp; Author, VedVidYoga
          </span>
        </div>

        <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
          A researcher, teacher, and practitioner of Vedic sciences with decades of study across the Vedas,
          Upanishads, Ayurveda, and Classical Yoga. His work bridges ancient Sanskrit knowledge with the
          questions of modern life — making Rishi-science accessible without diluting its depth.
        </p>

        <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
          Every article on VedVidYoga is written or curated with the intent to present Vedic knowledge as a
          living, logical system — one that can be engaged with rigorously, not just admired.
        </p>

        {/* Links row */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:border-saffron/50 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-700 dark:hover:border-saffron/30 dark:hover:text-saffron transition"
          >
            ✉ Contact
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:border-saffron/50 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-700 dark:hover:border-saffron/30 dark:hover:text-saffron transition"
          >
            ✍ All Articles
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:border-saffron/50 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-700 dark:hover:border-saffron/30 dark:hover:text-saffron transition"
          >
            📖 About Page
          </Link>
        </div>
      </div>

    </section>
  );
}

export default AboutAuthor;
