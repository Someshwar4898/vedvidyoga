import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { useCaseStudies } from "../hooks/useCaseStudies";

function CaseStudyDetail() {
  const { slug } = useParams();
  const { caseStudies } = useCaseStudies();

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const cs = caseStudies[currentIndex];

  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;
  const otherStudies = caseStudies.filter((c) => c.slug !== slug);

  if (!cs) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center space-y-4">
        <p className="text-stone-500 dark:text-stone-400">Case study not found.</p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-saffron hover:underline">
          <ArrowLeft size={14} /> Back to All Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-8">

      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-saffron transition"
      >
        <ArrowLeft size={15} /> Back to All Stories
      </Link>

      {/* ── HERO CARD ────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-muted flex items-center gap-2">
          <CheckCircle2 size={14} className="text-saffron" /> {cs.caseNumber}
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          {cs.title}
        </h1>
        <p className="mt-3 text-stone-400 dark:text-stone-500 text-sm">
          A real patient story, shared anonymously for privacy
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-[1fr_290px] gap-8 items-start">

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div className="space-y-8">

          {/* WHERE THINGS STARTED */}
          {cs.startingPoints.length > 0 && (
            <div className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-1">Where Things Started</h2>
              <p className="text-xs italic text-stone-400 dark:text-stone-500 mb-6 leading-5">
                "This story is based on a real patient experience. Details have been adjusted to protect privacy, while preserving the clinical insights."
              </p>
              <div className="space-y-5">
                {cs.startingPoints.map((point) => (
                  <div key={point.label} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-saffron mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{point.label}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-6">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHAT DAILY LIFE FELT LIKE */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">What Daily Life Felt Like</h2>
            <blockquote className="border-l-4 border-saffron/40 bg-saffron/5 dark:bg-stone-800 rounded-r-2xl px-5 py-4">
              <p className="text-stone-700 dark:text-stone-200 font-medium italic">"{cs.quote}"</p>
            </blockquote>
            <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">{cs.summary}</p>
          </div>

          {/* PROGRESS OVER TIME */}
          {cs.progressPoints.length > 0 && (
            <div className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-6">Progress Over Time</h2>
              <div className="space-y-5">
                {cs.progressPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <CheckCircle2 size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{point.title}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-6">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {cs.closeQuote && (
                <blockquote className="mt-6 border-l-4 border-saffron/40 bg-saffron/5 dark:bg-stone-800 rounded-r-2xl px-5 py-4">
                  <p className="text-stone-700 dark:text-stone-200 font-medium italic">"{cs.closeQuote}"</p>
                </blockquote>
              )}
            </div>
          )}

          {/* UNDERSTANDING THE PATTERN */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">Understanding the Pattern</h2>
            <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">{cs.understandingPattern}</p>
          </div>

          {/* KEY INSIGHTS */}
          {cs.keyInsights.length > 0 && (
            <div className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-saffron/10 text-saffron flex-shrink-0">
                  <BookOpen size={16} />
                </div>
                <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Key Insights</h2>
              </div>
              <ul className="space-y-3">
                {cs.keyInsights.map((insight, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="text-saffron mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-6">{insight}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-stone-400 dark:text-stone-500 leading-5 border-t border-[#f0e3d3] dark:border-stone-700 pt-4">
                This case strengthens clinical understanding in the {cs.tag.toLowerCase()} space — especially for individuals who are dismissed because conventional tests appear within normal range.
              </p>
            </div>
          )}

          {/* PREV / NEXT NAVIGATION */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {prevCs ? (
              <Link
                to={`/case-studies/${prevCs.slug}`}
                className="rounded-[1.5rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-5 hover:border-saffron/40 transition group"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 mb-2 flex items-center gap-1">
                  <ArrowLeft size={11} /> Previous Story
                </p>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-saffron transition line-clamp-2 leading-5">
                  {prevCs.title}
                </p>
              </Link>
            ) : <div />}

            {nextCs ? (
              <Link
                to={`/case-studies/${nextCs.slug}`}
                className="rounded-[1.5rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-5 hover:border-saffron/40 transition group text-right"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 mb-2 flex items-center gap-1 justify-end">
                  Next Story <ArrowRight size={11} />
                </p>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-saffron transition line-clamp-2 leading-5">
                  {nextCs.title}
                </p>
              </Link>
            ) : <div />}
          </div>

        </div>

        {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24 space-y-5">

          {/* More case studies list */}
          <div className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-muted mb-4">More Case Studies</p>
            <div className="space-y-3">
              {otherStudies.map((other) => (
                <Link
                  key={other.id}
                  to={`/case-studies/${other.slug}`}
                  className="block rounded-2xl border border-[#f0e3d3] dark:border-stone-700 p-4 hover:border-saffron/40 transition group"
                >
                  <p className="text-xs text-stone-400 dark:text-stone-500 mb-1 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-saffron" /> {other.caseNumber}
                  </p>
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-saffron transition line-clamp-2 leading-5">
                    {other.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="rounded-[1.75rem] border border-saffron/20 bg-saffron/5 dark:bg-stone-800 dark:border-stone-700 p-6">
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 mb-2">Ready to Begin?</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-5">
              Book a consultation and start your own healing journey.
            </p>
            <a
              href="https://wa.me/917976066236"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
            >
              Schedule Consultation
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CaseStudyDetail;
