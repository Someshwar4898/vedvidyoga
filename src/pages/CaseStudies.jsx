import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCaseStudies } from "../hooks/useCaseStudies";

const categories = [
  { value: "all",          label: "All Stories" },
  { value: "depression",   label: "Mental Wellness" },
  { value: "digestive",    label: "Digestive Health" },
  { value: "respiratory",  label: "Respiratory Health" },
  { value: "child-health", label: "Child Wellness" },
  { value: "vedic-logic",  label: "Vedic Research" },
];

function CaseStudies() {
  const { caseStudies } = useCaseStudies();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-10 md:space-y-14">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Real People. Real Results.</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Case Studies: Vedic Science in Practice
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">
            Documented healing journeys where Yoga Therapy, Naturopathy, and Vedic Wisdom resolved conditions that conventional medicine struggled with.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium border transition cursor-pointer ${
                activeFilter === cat.value
                  ? "bg-saffron text-white border-saffron"
                  : "border-[#eadbc7] bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── CARDS GRID ──────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-500 dark:text-stone-400 py-16">
          No case studies found for this category yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs) => (
            <Link
              key={cs.id}
              to={`/case-studies/${cs.slug}`}
              className="group rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 shadow-[0_18px_50px_rgba(102,74,44,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(102,74,44,0.13)] flex flex-col overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-saffron/50 to-saffron" />

              <div className="p-6 flex flex-col flex-1 gap-4">

                {/* Pills row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full bg-saffron/10 dark:bg-stone-800 px-3 py-1 text-xs font-semibold text-saffron">
                    {cs.tag}
                  </span>
                  <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1 text-xs font-medium text-stone-400 dark:text-stone-500">
                    {cs.caseNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-saffron transition line-clamp-2">
                  {cs.title}
                </h3>

                {/* Summary */}
                <p className="text-sm leading-7 text-stone-600 dark:text-stone-400 line-clamp-3 flex-1">
                  {cs.summary}
                </p>

                {/* Outcome highlight */}
                <div className="rounded-2xl bg-saffron/5 dark:bg-stone-800 border border-saffron/15 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-muted mb-1">Outcome</p>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{cs.result}</p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f0e3d3] dark:border-stone-700">
                  <span className="text-xs text-stone-400">{cs.location} · {cs.duration}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-medium group-hover:text-saffron transition">
                    Read Story <ArrowRight size={14} />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── CTA BLOCK ───────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted mb-3">Your Story Could Be Next</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Ready to Start Your Healing Journey?
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 max-w-xl mx-auto">
          Book a consultation and begin your path to recovery through Yoga Therapy, Naturopathy, and Vedic Wisdom.
        </p>
        <a
          href="https://wa.me/917976066236"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
        >
          Book a Consultation <ArrowRight size={16} />
        </a>
      </div>

    </div>
  );
}

export default CaseStudies;
