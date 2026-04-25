"use client";
import { useState } from "react";
import { AlignLeft, ChevronDown } from "lucide-react";

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ");
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function extractHeadings(html) {
  const headings = [];
  let i = 0;
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, "").trim());
    if (!text) continue;
    headings.push({ level: parseInt(m[1]), text, id: `toc-${i++}-${slugify(text)}` });
  }
  return headings;
}

// Injects id attributes into h2/h3 tags so TOC anchor links work.
// Strips any existing id to avoid duplicates.
export function injectHeadingIds(html) {
  let i = 0;
  return html.replace(/<h([23])([^>]*?)>([\s\S]*?)<\/h[23]>/gi, (_, level, attrs, content) => {
    const text = decodeEntities(content.replace(/<[^>]+>/g, "").trim());
    const id = `toc-${i++}-${slugify(text)}`;
    const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, "");
    return `<h${level}${cleanAttrs} id="${id}">${content}</h${level}>`;
  });
}

function TableOfContents({ content }) {
  const [open, setOpen] = useState(true);
  const headings = extractHeadings(content);

  if (headings.length < 2) return null;

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Track h2 numbering separately; h3s are sub-items and don't increment the main count
  let h2Count = 0;

  return (
    <div className="rounded-[1.5rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-5 sm:p-6 mb-10 shadow-[0_4px_24px_rgba(102,74,44,0.06)]">

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <div className="inline-flex items-center gap-2 text-saffron-muted">
          <AlignLeft size={16} />
          <span className="text-sm font-semibold uppercase tracking-[0.24em]">Table of Contents</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ol className="mt-4 space-y-1">
          {headings.map((h) => {
            const isH2 = h.level === 2;
            if (isH2) h2Count++;
            return (
              <li key={h.id} className={isH2 ? "" : "pl-5"}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(h.id); }}
                  className="inline-flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-saffron dark:hover:text-saffron transition-colors py-0.5 leading-6"
                >
                  {isH2
                    ? <span className="shrink-0 font-semibold text-saffron-muted w-5">{h2Count}.</span>
                    : <span className="shrink-0 text-stone-300 dark:text-stone-600 w-5">—</span>
                  }
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default TableOfContents;
