"use client";

// SanskritTerm renders a Sanskrit word correctly for each language:
//   English          → romanized term only  (e.g. "Vedāngas")
//   Devanagari langs → actual Sanskrit script (e.g. "वेदाङ्ग")
//   Other languages  → romanized term + translated meaning bracket
//
// NOTE: Language detection via CSS :lang() requires browser context, which is
// unavailable during SSR. We defer rendering until after hydration to avoid
// hydration mismatches (React error #310).
import { useState, useEffect } from "react";

function SanskritTerm({ term, devanagari, meaning }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration: render a stable fallback that matches SSR output
  // SSR always renders all spans, so we do the same on initial client render
  if (!mounted) {
    return (
      <>
        <span className="sanskrit-romanized" translate="no" lang="sa">{term}</span>
        <span className="sanskrit-devanagari" translate="no" lang="sa">{devanagari}</span>
        <span className="sanskrit-translation text-stone-500 text-[0.88em]"> ({meaning})</span>
      </>
    );
  }

  // After hydration: language-aware rendering (browser can detect language via CSS :lang())
  return (
    <>
      {/* English + non-Devanagari languages: show the romanized term */}
      <span className="sanskrit-romanized" translate="no" lang="sa">{term}</span>

      {/* Devanagari languages (hi, mr, ne...): show actual Sanskrit script instead */}
      <span className="sanskrit-devanagari" translate="no" lang="sa">{devanagari}</span>

      {/* Non-English, non-Devanagari only: show the meaning in brackets (this text IS translatable) */}
      <span className="sanskrit-translation text-stone-500 text-[0.88em]"> ({meaning})</span>
    </>
  );
}

export default SanskritTerm;
