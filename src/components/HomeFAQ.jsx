import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes this different from other Vedic content?",
    answer:
      "VedVidYoga focuses on evidence-based, logic-first Vedic commentary — without mythology worship or blind reverence. Every claim is traced back to primary Sanskrit sources and examined on its own reasoning.",
  },
  {
    question: "Do I need prior knowledge to read these articles?",
    answer:
      "No. Articles are written progressively, from accessible introductions to deeper analysis. You can start anywhere and follow the internal links to build your understanding over time.",
  },
  {
    question: "Where does the content come from?",
    answer:
      "Directly from primary Sanskrit sources — Vedas, Upanishads, classical commentaries — with modern contextual framing. Secondary sources are only used where they accurately represent the original texts.",
  },
  {
    question: "How are Sanskrit terms handled?",
    answer:
      "Each term is introduced in English, explained in context, and supported by the original script where meaningful. The goal is comprehension first, not performance of scholarship.",
  },
  {
    question: "How often is new content published?",
    answer:
      "New articles are published weekly across all eight knowledge categories. You can subscribe to the newsletter to receive one article per week directly in your inbox.",
  },
  {
    question: "Can I suggest topics or ask questions?",
    answer:
      "Yes. Use the Contact page to suggest topics or reach out directly. Thoughtful questions from readers often shape the next set of articles.",
  },
];

function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
          <HelpCircle size={18} />
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">FAQ</p>
        </div>
        <h3 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Frequently asked questions
        </h3>
      </div>

      <div className="divide-y divide-[#f0e3d3] dark:divide-stone-700">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={`text-sm font-semibold leading-6 transition-colors ${
                  openIndex === i
                    ? "text-saffron"
                    : "text-stone-800 dark:text-stone-100"
                }`}
              >
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-stone-400 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180 text-saffron" : ""
                }`}
              />
            </button>

            {openIndex === i && (
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400 pb-5">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeFAQ;
