// SanskritTerm renders a Sanskrit word correctly for each language:
//   English          → romanized term only  (e.g. "Vedāngas")
//   Devanagari langs → actual Sanskrit script (e.g. "वेदाङ्ग")
//   Other languages  → romanized term + translated meaning bracket
function SanskritTerm({ term, devanagari, meaning }) {
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
