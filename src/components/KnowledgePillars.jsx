import {
  ScrollText,
  Library,
  Lightbulb,
  Brain,
  BookMarked,
  Leaf,
  Activity,
  GraduationCap,
} from "lucide-react";

const pillars = [
  {
    icon: ScrollText,
    title: "The Four Vedas",
    slug: "vedas",
    content:
      "Rigveda, Yajurveda, Samveda, and Atharvaveda — the foundational texts that define knowledge, nature, and universal principles.",
  },
  {
    icon: Library,
    title: "Vedanga – The Science Behind the Vedas",
    slug: "vedanga",
    content:
      "Śikṣā (phonetics), Kalpa (ritual logic), Vyākaraṇa (grammar), Nirukta (etymology), Jyotiṣa (astronomy), and Chanda (meter) — the technical framework of Vedic knowledge.",
  },
  {
    icon: Lightbulb,
    title: "Upanishads – Philosophy of Truth",
    slug: "upanishads",
    content:
      "The principal Upanishads explore self-realization, monotheism, and the deeper understanding of existence and consciousness.",
  },
  {
    icon: Brain,
    title: "The Six Darshans – Rational Philosophy",
    slug: "darshans",
    content:
      "Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, and Vedanta — logical systems of inquiry focused on truth, reasoning, and reality.",
  },
  {
    icon: BookMarked,
    title: "Scriptures – Truth vs Interpretation",
    slug: "scriptures",
    content:
      "Analysis of texts like Manusmriti, Ramayana, Mahabharata, and Bhagavad Gita — understanding their logic beyond myths.",
  },
  {
    icon: Leaf,
    title: "Ayurvedic Lifestyle",
    slug: "ayurvedic-lifestyle",
    content:
      "Guidance from Charak, Sushrut, and Ashtanghridayam — covering diet, habits, and natural healing principles.",
  },
  {
    icon: Activity,
    title: "Yoga Therapy & Natural Healing",
    slug: "yoga-naturopathy",
    content:
      "Therapeutic use of asanas, pranayama, shatkarmas, and natural therapies like mud, hydro, and diet therapy.",
  },
  {
    icon: GraduationCap,
    title: "Vedic Value Education",
    slug: "vedic-education",
    content:
      "Stories and teachings designed to build strong values and logical thinking in children through Vedic wisdom.",
  },
];

function KnowledgePillars() {
  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] bg-white/80 dark:bg-stone-900/80 dark:border-stone-700 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">
            What We Explore
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Eight pillars of Vedic knowledge
          </h3>
        </div>
        <p className="max-w-xs text-sm leading-7 text-stone-500 dark:text-stone-400">
          Each pillar is a structured branch of the Vedic tradition — independent yet interconnected.
        </p>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.slug}
              className="rounded-[1.5rem] border border-[#f0e3d3] bg-[#ffffff] dark:bg-stone-800 dark:border-stone-700 p-5 transition hover:-translate-y-1 hover:border-[#f6d7b3] hover:shadow-[0_18px_40px_rgba(102,74,44,0.08)]"
            >
              <Icon className="mb-3 text-saffron" size={20} />
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 leading-6">
                {pillar.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
                {pillar.content}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default KnowledgePillars;
