"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

// Parses the ACF textarea. Each FAQ is written as:
//   Q: question text   or   Q1: question text
//   A: answer text     or   A1: answer text
// Answer can span multiple lines until the next Q.
function parseFAQs(raw) {
  if (!raw || typeof raw !== "string" || !raw.trim()) return [];
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const faqs = [];
  let question = null;
  let answerLines = [];
  let inAnswer = false;

  for (const line of lines) {
    const qMatch = line.match(/^Q\d*[:.]\s*(.+)/i);
    const aMatch = line.match(/^A\d*[:.]\s*(.+)/i);

    if (qMatch) {
      if (question && answerLines.length) {
        faqs.push({ question, answer: answerLines.join(" ") });
      }
      question = qMatch[1].trim();
      answerLines = [];
      inAnswer = false;
    } else if (aMatch && question) {
      answerLines = [aMatch[1].trim()];
      inAnswer = true;
    } else if (inAnswer) {
      answerLines.push(line);
    }
  }

  if (question && answerLines.length) {
    faqs.push({ question, answer: answerLines.join(" ") });
  }

  return faqs;
}

function PostFAQ({ raw }) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = parseFAQs(raw);

  if (!faqs.length) return null;

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)] mt-16">
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
                  openIndex === i ? "text-saffron" : "text-stone-800 dark:text-stone-100"
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

export default PostFAQ;
