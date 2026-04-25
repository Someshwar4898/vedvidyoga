import { AlertCircle } from "lucide-react";

function PostDisclaimer({ content }) {
  if (!content || typeof content !== "string" || !content.trim()) return null;

  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)] mt-10">
      <div className="mb-4 inline-flex items-center gap-2 text-saffron-muted">
        <AlertCircle size={18} />
        <p className="text-sm font-semibold uppercase tracking-[0.24em]">Disclaimer</p>
      </div>
      <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
        {content}
      </p>
    </section>
  );
}

export default PostDisclaimer;
