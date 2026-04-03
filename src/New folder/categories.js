// Temporary static data — will be replaced with WordPress REST API call later
export const categories = [
  {
    name: "Vedas",
    slug: "vedas",
    description: "Ancient foundational scriptures with layered wisdom, hymns, rituals, and philosophical insight.",
    subcategories: [
      { name: "Rigveda", slug: "rigveda", description: "Sacred hymns and poetic invocations rooted in cosmic order." },
      { name: "Yajurveda", slug: "yajurveda", description: "Ritual formulas and ceremonial knowledge for sacred practice." },
      { name: "Samveda", slug: "samveda", description: "Melodic chants and liturgical recitations shaped through sound." },
      { name: "Atharvaveda", slug: "atharvaveda", description: "Everyday wisdom, healing traditions, and spiritual reflections." },
    ],
  },
  {
    name: "Upanishads",
    slug: "upanishads",
    description: "Reflective texts exploring self-knowledge, consciousness, and ultimate reality.",
    subcategories: [
      { name: "Isha Upanishad", slug: "isha-upanishad", description: "A concise meditation on renunciation, action, and unity." },
      { name: "Kena Upanishad", slug: "kena-upanishad", description: "Inquiry into the source behind mind, speech, and perception." },
      { name: "Katha Upanishad", slug: "katha-upanishad", description: "A philosophical dialogue on death, soul, and liberation." },
      { name: "Mundaka Upanishad", slug: "mundaka-upanishad", description: "A distinction between higher knowledge and worldly learning." },
    ],
  },
  {
    name: "Ayurveda",
    slug: "ayurveda",
    description: "Holistic well-being through balance, nourishment, seasonal rhythm, and mindful care.",
    subcategories: [
      { name: "Dinacharya", slug: "dinacharya", description: "Daily routines for steadiness, clarity, and natural health." },
      { name: "Aahara", slug: "aahara", description: "Food wisdom, digestion, and intentional nourishment." },
      { name: "Ritucharya", slug: "ritucharya", description: "Seasonal living practices aligned with nature's cycles." },
      { name: "Dravyaguna", slug: "dravyaguna", description: "Herbs, materials, and their qualities in traditional healing." },
    ],
  },
  {
    name: "Yoga",
    slug: "yoga",
    description: "A balanced path of movement, breath, discipline, and inner awareness.",
    subcategories: [
      { name: "Asana", slug: "asana", description: "Postural practice for stability, strength, and ease." },
      { name: "Pranayama", slug: "pranayama", description: "Breath-based techniques for focus, energy, and calm." },
      { name: "Meditation", slug: "meditation", description: "Stillness practices that cultivate presence and insight." },
      { name: "Yoga Sutras", slug: "yoga-sutras", description: "Foundational philosophy on mind, discipline, and liberation." },
    ],
  },
];
