// Lookup table keyed by category/subcategory slug.
// When a category name is rendered, CategoryName checks here first.
// term       = romanized name shown in English
// devanagari = actual Sanskrit script shown in Hindi/Marathi/Nepali
// meaning    = English meaning shown in brackets for other languages

export const SANSKRIT_TERMS = {
  // ── Main categories ──────────────────────────────────────────────────────
  "vedas":       { term: "Vedas",       devanagari: "वेद",        meaning: "Sacred scriptures" },
  "upanishads":  { term: "Upanishads",  devanagari: "उपनिषद्",    meaning: "Vedic philosophical texts" },
  "ayurveda":    { term: "Ayurveda",    devanagari: "आयुर्वेद",   meaning: "Science of life" },
  "yoga":        { term: "Yoga",        devanagari: "योग",         meaning: "Union / discipline" },
  "darshans":    { term: "Darshans",    devanagari: "दर्शन",       meaning: "Spectacles / Philosophy" },
  "vedangas":    { term: "Vedāngas",    devanagari: "वेदाङ्ग",    meaning: "Vedic auxiliary sciences" },
  "scriptures":  { term: "Scriptures",  devanagari: "शास्त्र",    meaning: "Sacred texts" },

  // ── Vedas subcategories ──────────────────────────────────────────────────
  "rigveda":     { term: "Rigveda",     devanagari: "ऋग्वेद",     meaning: "Hymns of praise" },
  "yajurveda":   { term: "Yajurveda",   devanagari: "यजुर्वेद",   meaning: "Ritual formulas" },
  "samveda":     { term: "Samveda",     devanagari: "सामवेद",      meaning: "Melodic chants" },
  "atharvaveda": { term: "Atharvaveda", devanagari: "अथर्ववेद",   meaning: "Everyday wisdom" },

  // ── Upanishads subcategories ──────────────────────────────────────────────
  "isha-upanishad":    { term: "Isha Upanishad",    devanagari: "ईश उपनिषद्",     meaning: "On selfless action" },
  "kena-upanishad":    { term: "Kena Upanishad",    devanagari: "केन उपनिषद्",    meaning: "On the source of mind" },
  "katha-upanishad":   { term: "Katha Upanishad",   devanagari: "कठ उपनिषद्",    meaning: "On soul and liberation" },
  "mundaka-upanishad": { term: "Mundaka Upanishad", devanagari: "मुण्डक उपनिषद्", meaning: "Higher vs lower knowledge" },
  "prasna-upanishad":  { term: "Prasna Upanishad",  devanagari: "प्रश्न उपनिषद्", meaning: "Six questions on life" },
  "mandukya-upanishad":{ term: "Mandukya Upanishad",devanagari: "माण्डूक्य उपनिषद्","meaning": "On Om and consciousness" },
  "taittiriya-upanishad":{ term:"Taittiriya Upanishad",devanagari:"तैत्तिरीय उपनिषद्",meaning:"Layers of human existence"},
  "aitareya-upanishad":{ term: "Aitareya Upanishad",devanagari: "ऐतरेय उपनिषद्",  meaning: "On creation and soul" },
  "chandogya-upanishad":{ term:"Chandogya Upanishad",devanagari:"छान्दोग्य उपनिषद्",meaning:"On meditation and ethics"},
  "brihadaranyaka-upanishad":{ term:"Brihadaranyaka Upanishad",devanagari:"बृहदारण्यक उपनिषद्",meaning:"On reality and liberation"},
  "svetasvatara-upanishad":{ term:"Svetasvatara Upanishad",devanagari:"श्वेताश्वतर उपनिषद्",meaning:"On devotion to one God"},

  // ── Ayurveda subcategories ────────────────────────────────────────────────
  "dinacharya":  { term: "Dinacharya",  devanagari: "दिनचर्या",   meaning: "Daily routine" },
  "aahara":      { term: "Aahara",      devanagari: "आहार",        meaning: "Food / nourishment" },
  "ritucharya":  { term: "Ritucharya",  devanagari: "ऋतुचर्या",   meaning: "Seasonal living" },
  "dravyaguna":  { term: "Dravyaguna",  devanagari: "द्रव्यगुण",  meaning: "Herbal properties" },

  // ── Yoga subcategories ────────────────────────────────────────────────────
  "asana":        { term: "Asana",       devanagari: "आसन",         meaning: "Posture" },
  "pranayama":    { term: "Pranayama",   devanagari: "प्राणायाम",  meaning: "Breath control" },
  "yoga-sutras":  { term: "Yoga Sutras", devanagari: "योग सूत्र",  meaning: "Foundational philosophy" },

  // ── Darshans subcategories ────────────────────────────────────────────────
  "nyaya":        { term: "Nyāya",       devanagari: "न्याय",       meaning: "Logic & Reasoning" },
  "vaisheshika":  { term: "Vaiśeṣika",   devanagari: "वैशेषिक",    meaning: "Atomic Theory" },
  "sankhya":      { term: "Sāṅkhya",     devanagari: "सांख्य",      meaning: "Enumeration / Cosmology" },
  "mimamsa":      { term: "Mīmāṃsā",    devanagari: "मीमांसा",     meaning: "Ritual Inquiry" },
  "vedanta":      { term: "Vedānta",     devanagari: "वेदान्त",     meaning: "End of the Vedas" },

  // ── Vedangas subcategories ────────────────────────────────────────────────
  "shiksha":      { term: "Śikṣā",       devanagari: "शिक्षा",      meaning: "Phonetics & Pronunciation" },
  "chanda":       { term: "Chanda",      devanagari: "छन्द",         meaning: "Metre / Prosody" },
  "vyakarana":    { term: "Vyākaraṇa",   devanagari: "व्याकरण",     meaning: "Grammar" },
  "nirukta":      { term: "Nirukta",     devanagari: "निरुक्त",      meaning: "Etymology & Semantics" },
  "jyotisha":     { term: "Jyotiṣa",     devanagari: "ज्योतिष",     meaning: "Astronomy / Astrology" },
  "kalpa":        { term: "Kalpa",       devanagari: "कल्प",         meaning: "Ritual Procedures" },
};
