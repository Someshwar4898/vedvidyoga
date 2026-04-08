import { useState } from "react";
import { FlaskConical, Brain, Zap, BookOpen, ChevronDown, ArrowRight, MapPin, Clock, User } from "lucide-react";
import caseStudies from "../data/mockCaseStudies";

const solutions = [
  {
    key: "depression",
    box: "Box 1: Mental Wellness",
    icon: Brain,
    title: "Overcoming Depression",
    description: "How Vedic Science, Meditation, and Sound Therapy helped individuals emerge from the most hardcore struggling phases of life.",
    count: caseStudies.filter((c) => c.category === "depression").length,
  },
  {
    key: "back-pain",
    box: "Box 2: Physical Healing",
    icon: Zap,
    title: "Chronic Disease Recovery",
    description: "Using Ayurvedic herbs and a disciplined Vedic lifestyle to cure ailments through natural, methodical, and drugless therapy.",
    count: caseStudies.filter((c) => c.category === "back-pain").length,
  },
  {
    key: "diabetes",
    box: "Box 3: Youth & Education",
    icon: FlaskConical,
    title: "Student Success Stories",
    description: "How Vedic cult, methodology, and strategy helped students overcome school-life depression and find focus.",
    count: caseStudies.filter((c) => c.category === "diabetes").length,
  },
  {
    key: "vedic-logic",
    box: "Box 4: Vedic Research",
    icon: BookOpen,
    title: "Scientific Hawan Results",
    description: "Research-based results of Vedic fire rituals and their long impact on human health and the environment.",
    count: caseStudies.filter((c) => c.category === "vedic-logic").length,
  },
];

const dropdownOptions = [
  { value: "all", label: "All Case Studies" },
  { value: "depression", label: "Depression / Anxiety" },
  { value: "back-pain", label: "Back Pain" },
  { value: "diabetes", label: "Diabetes" },
  { value: "vedic-logic", label: "Vedic Logic" },
];

function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-12">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Real People. Real Results.</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          Case Studies: Vedic Science in Practice
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">
          Documented healing journeys where Yoga Therapy, Naturopathy, and Vedic Wisdom resolved conditions that conventional medicine struggled with.
        </p>
      </div>

      {/* ── SOLUTIONS GRID (4 BOXES) ─────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {solutions.map(({ key, box, icon: Icon, title, description, count }) => (
          <button
            key={key}
            onClick={() => setActiveCategory((prev) => (prev === key ? "all" : key))}
            className={`text-left flex flex-col rounded-[1.75rem] border p-6 shadow-[0_18px_50px_rgba(102,74,44,0.07)] transition hover:-translate-y-0.5 focus:outline-none ${
              activeCategory === key
                ? "border-saffron/50 bg-saffron/5 dark:bg-stone-800"
                : "border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-saffron/30"
            }`}
          >
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-2xl mb-4 ${
                activeCategory === key
                  ? "bg-saffron text-white"
                  : "bg-saffron/10 text-saffron"
              }`}
            >
              <Icon size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-muted mb-1 min-h-[2rem] flex items-start">{box}</p>
            <p className="font-semibold text-stone-900 dark:text-stone-100 leading-snug">{title}</p>
            <p className="mt-2 text-xs leading-5 text-stone-500 dark:text-stone-400">{description}</p>
            <p className="mt-3 text-xs font-semibold text-saffron-muted">
              {count} {count === 1 ? "case study" : "case studies"}
            </p>
          </button>
        ))}
      </div>

      {/* ── SEARCH / FILTER BAR ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-5 shadow-[0_10px_30px_rgba(102,74,44,0.06)]">
        <p className="text-sm font-semibold text-stone-700 dark:text-stone-200 whitespace-nowrap">
          Find your struggle:
        </p>
        <div className="relative w-full sm:w-72">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full appearance-none rounded-full border border-[#eadbc7] dark:border-stone-700 bg-[#fffdf9] dark:bg-stone-800 px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 pr-10 focus:outline-none focus:border-saffron/50 transition cursor-pointer"
          >
            {dropdownOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
          />
        </div>
        {activeCategory !== "all" && (
          <button
            onClick={() => setActiveCategory("all")}
            className="text-xs font-medium text-saffron hover:underline whitespace-nowrap"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* ── CASE STUDY CARDS ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-500 dark:text-stone-400 py-16">No case studies found for this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs) => (
            <div
              key={cs.id}
              className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-[0_18px_50px_rgba(102,74,44,0.07)] flex flex-col gap-4"
            >
              {/* Tag */}
              <span className="inline-flex w-fit rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">
                {cs.tag}
              </span>

              {/* Title */}
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {cs.title}
              </h3>

              {/* Summary */}
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400 flex-1">
                {cs.summary}
              </p>

              {/* Result highlight */}
              <div className="rounded-2xl bg-saffron/5 dark:bg-stone-800 border border-saffron/15 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-muted mb-1">Result</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{cs.result}</p>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-[#f0e3d3] dark:border-stone-700">
                <span className="flex items-center gap-1.5 text-xs text-stone-400">
                  <User size={12} /> {cs.patient}, {cs.age}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-400">
                  <MapPin size={12} /> {cs.location}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Clock size={12} /> {cs.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <div className="text-center pt-4">
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">Want to start your own healing journey?</p>
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
