import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, User, MapPin, Clock, AlertCircle, Lightbulb, TrendingUp, Heart } from "lucide-react";
import { useCaseStudies } from "../hooks/useCaseStudies";

const SECTIONS = [
  { key: "snapshot",   num: "01", icon: User,         label: "Patient Snapshot"  },
  { key: "problem",    num: "02", icon: AlertCircle,   label: "The Problem"       },
  { key: "impact",     num: "03", icon: Heart,         label: "Life Impact"       },
  { key: "treatment",  num: "04", icon: TrendingUp,    label: "Treatment Plan"    },
  { key: "results",    num: "05", icon: CheckCircle2,  label: "Results & Feedback"},
];

function SectionShell({ num, icon: Icon, label, children }) {
  return (
    <div className="flex items-stretch rounded-[1.75rem] overflow-hidden border border-[#f0e3d3] dark:border-stone-700 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">

      {/* Arrow number badge */}
      <div
        className="flex-shrink-0 w-24 sm:w-28 bg-saffron flex flex-col items-center justify-center gap-1"
        style={{ clipPath: "polygon(0 0, 78% 0, 100% 50%, 78% 100%, 0 100%)" }}
      >
        <span className="text-3xl sm:text-4xl font-black text-white leading-none pr-3">{num}</span>
        <Icon size={14} className="text-white/70 pr-3" />
      </div>

      {/* Content panel */}
      <div className="flex-1 bg-white dark:bg-stone-900 px-7 py-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron mb-4">{label}</p>
        {children}
      </div>

    </div>
  );
}

function CaseStudyDetail() {
  const { slug } = useParams();
  const { caseStudies } = useCaseStudies();

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const cs = caseStudies[currentIndex];

  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

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

  const hookLine = cs.summary ? cs.summary.split(/[.!?]/)[0].trim() : "";

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-8">

      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-saffron transition"
      >
        <ArrowLeft size={15} /> Back to All Stories
      </Link>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">{cs.tag}</span>
          <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1 text-xs font-medium text-stone-400 dark:text-stone-500">{cs.caseNumber}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          {cs.title}
        </h1>
        <p className="mt-3 text-stone-400 dark:text-stone-500 text-sm">
          A real patient story, shared anonymously for privacy
        </p>
      </div>

      {/* ── NUMBERED SECTIONS ────────────────────────────────────────────── */}
      <div className="space-y-5">

        {/* 01 — Patient Snapshot */}
        <SectionShell num="01" icon={User} label="Patient Snapshot">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Patient</p>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{cs.patient}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5 flex items-center gap-1"><MapPin size={10} /> Location</p>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{cs.location}{cs.age ? `, ${cs.age} yrs` : ""}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5 flex items-center gap-1"><Clock size={10} /> Duration</p>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{cs.duration}</p>
            </div>
          </div>
          {hookLine && (
            <p className="text-sm leading-6 text-stone-600 dark:text-stone-400 border-t border-[#f0e3d3] dark:border-stone-700 pt-4">
              {hookLine}.
            </p>
          )}
        </SectionShell>

        {/* 02 — The Problem */}
        <SectionShell num="02" icon={AlertCircle} label="The Problem">
          {cs.startingPoints.length > 0 ? (
            <div className="space-y-3">
              {cs.startingPoints.map((point) => (
                <div key={point.label} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">{point.label}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-6">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">{cs.summary}</p>
          )}
        </SectionShell>

        {/* 03 — Life Impact */}
        {cs.quote && (
          <SectionShell num="03" icon={Heart} label="Life Impact">
            <blockquote className="border-l-4 border-saffron/50 pl-5">
              <p className="text-stone-700 dark:text-stone-200 font-medium italic leading-7 text-sm">"{cs.quote}"</p>
            </blockquote>
          </SectionShell>
        )}

        {/* 04 — Treatment Plan */}
        {cs.progressPoints.length > 0 && (
          <SectionShell num="04" icon={TrendingUp} label="Treatment Plan">
            <div className="space-y-5">
              {cs.progressPoints.map((point, i) => (
                <div key={point.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-saffron/10 text-saffron text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < cs.progressPoints.length - 1 && (
                      <div className="w-px flex-1 bg-saffron/15 mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">{point.title}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-6">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>
        )}

        {/* 05 — Results + Feedback */}
        <SectionShell num="05" icon={CheckCircle2} label="Results & Feedback">
          <div className="rounded-2xl bg-saffron/5 dark:bg-stone-800 border border-saffron/15 px-5 py-3 mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-muted mb-0.5">Outcome</p>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{cs.result}</p>
          </div>

          {cs.keyInsights.length > 0 && (
            <div className="space-y-3 mb-4">
              {cs.keyInsights.map((insight, i) => (
                <div key={i} className="flex gap-3">
                  <Lightbulb size={14} className="text-saffron mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-6">{insight}</p>
                </div>
              ))}
            </div>
          )}

          {cs.closeQuote && (
            <blockquote className="border-l-4 border-saffron/40 bg-saffron/5 dark:bg-stone-800 rounded-r-2xl px-5 py-4">
              <p className="text-stone-700 dark:text-stone-200 font-medium italic text-sm">"{cs.closeQuote}"</p>
            </blockquote>
          )}
        </SectionShell>

      </div>

      {/* ── CLINICAL NOTE ─────────────────────────────────────────────────── */}
      {cs.understandingPattern && (
        <div className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-7 shadow-[0_18px_50px_rgba(102,74,44,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron mb-4">Clinical Note</p>
          <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">{cs.understandingPattern}</p>
        </div>
      )}

      {/* ── PREV / NEXT ───────────────────────────────────────────────────── */}
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
  );
}

export default CaseStudyDetail;
