import {
  ScrollText,
  Library,
  Lightbulb,
  Brain,
  BookMarked,
  Activity,
  GraduationCap,
  Flame,
  Users,
} from "lucide-react";

const pillars = [
  {
    icon: ScrollText,
    title: "Vedas",
    slug: "vedas",
    content:
      "The 4 Vedas are God’s infallible word, revealed at creation as the source of all true science. They provide the divine methodology for understanding knowledge, nature, and the universal laws of the cosmos.",
  },
  {
    icon: Library,
    title: "Vedangas (The 6 Limbs of Vedas)",
    slug: "vedanga",
    content:
      "Śikṣā – Phonetics & pronunciation; Vyākaraṇa – grammar & logic; Nirukta – etymology; Chanda – meter & prosody; Jyotiṣa – astronomy & time; Kalpa – rituals & methodology of conduct.",
  },
  {
    icon: Lightbulb,
    title: "Upvedas (Applied Vedic Sciences)",
    slug: "upvedas",
    content:
      "Āyurveda – life & medicine; Dhanurveda – warfare & defense; Gāndharvaveda – music & aesthetics; Arthaveda – economics & resources for society.",
  },
  {
    icon: Flame,
    title: "Upanishads (11 Ārsh Upanishads)",
    slug: "upanishads",
    content:
      "Īśa–Kena (God), Kaṭha–Praśna (life & prana), Muṇḍaka–Māṇḍūkya (knowledge & consciousness), Taittirīya–Aitareya (soul & existence), Chāndogya–Bṛhadāraṇyaka (reality), Śvetāśvatara (one supreme).",
  },
  {
    icon: Brain,
    title: "Darshanas (Six Systems of Philosophy)",
    slug: "darshanas",
    content:
      "Nyāya – logic; Vaiśeṣika – atoms & cosmology; Sānkhya – matter & spirit; Yoga – discipline; Mīmāṁsā – action & dharma; Vedānta – ultimate knowledge.",
  },
  {
    icon: Users,
    title: "The Rishi Legacy",
    slug: "rishi-legacy",
    content:
      "The pure 'Ārsh' knowledge passed by sages through sacrifice and realization. Includes Aarsh Vidya — the original discoveries of Vedic seers.",
  },
  {
    icon: BookMarked,
    title: "Scriptures – Truth vs Interpretation",
    slug: "scriptures",
    content:
      "Logical analysis of texts like Manusmriti, Ramayana, Mahabharata, and Bhagavad Gita. Understanding their true meaning beyond myths and distortions.",
  },
  {
    icon: GraduationCap,
    title: "Vedic Education",
    slug: "vedic-education",
    content:
      "Stories and teachings designed to build strong values and logical thinking. Helping children grow with clarity through authentic Vedic wisdom.",
  },
  {
    icon: Activity,
    title: "Yoga Therapy, Ayurveda & Naturopathy",
    slug: "yoga-naturopathy",
    content:
      "Integration of Aṣṭāṅga Yoga, Āyurveda, and Prakṛtika Cikitsā. Applying cosmic laws to restore physical balance and inner purity.",
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
            The system and dimensions of Vedic knowledge.
          </h3>
          <p className="max-w-3xl text-sm leading-7 text-stone-500 dark:text-stone-400">
            Discover the intersection of ancient logic and spiritual insight. We break down the organized systems and diverse dimensions that make Vedic knowledge relevant today.
          </p>
        </div>
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
